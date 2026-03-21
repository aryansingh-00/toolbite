import { useState, useRef, useCallback, useEffect } from 'react';

export function useRealtimeSession() {
  const [status, setStatus] = useState('idle'); // idle | connecting | listening | processing | speaking | ending | disconnected | error
  const [errorMessage, setErrorMessage] = useState('');
  const [transcript, setTranscript] = useState([]);
  const [language, setLanguage] = useState('English');
  const [voiceTone, setVoiceTone] = useState('alloy');
  const [aiVolume, setAiVolume] = useState(0); // Real-time voice reactivity
  
  const pcRef = useRef(null);
  const dcRef = useRef(null);
  const audioElRef = useRef(null);
  const streamRef = useRef(null);
  const analyserRef = useRef(null);
  const audioCtxRef = useRef(null);
  const rafRef = useRef(null);
  
  const connect = async () => {
    try {
      setStatus('connecting');
      setErrorMessage('');
      setTranscript([]);
      
      const r = await fetch("/api/session", { method: "POST" });
      if (!r.ok) {
         const errData = await r.json().catch(() => ({}));
         throw new Error(errData.error || "Backend route failed to initialize realtime session.");
      }
      const initData = await r.json();
      if (!initData.client_secret?.value) {
         throw new Error("Failed to get ephemeral token from API. Check server logs or API key.");
      }
      const token = initData.client_secret.value;
      
      const pc = new RTCPeerConnection();
      pcRef.current = pc;
      
      pc.onconnectionstatechange = () => {
         if (pc.connectionState === 'failed') {
            setStatus('error');
            setErrorMessage('WebRTC connection failed.');
         } else if (pc.connectionState === 'disconnected') {
            setStatus('disconnected');
         }
      };

      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioElRef.current = audioEl;
      
      pc.ontrack = (e) => {
         const stream = e.streams[0];
         audioEl.srcObject = stream;

         // Set up WebAudio Analyser for live visualizer
         const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
         audioCtxRef.current = audioCtx;
         const source = audioCtx.createMediaStreamSource(stream);
         const analyser = audioCtx.createAnalyser();
         analyser.fftSize = 256;
         source.connect(analyser);
         analyserRef.current = analyser;

         const dataArray = new Uint8Array(analyser.frequencyBinCount);
         const updateVolume = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for(let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
            }
            const avg = sum / dataArray.length;
            // Normalize volume 0-1
            setAiVolume(Math.min(avg / 100, 1));
            rafRef.current = requestAnimationFrame(updateVolume);
         };
         updateVolume();
      };
      
      let ms;
      try {
         ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch(err) {
         throw new Error("Microphone access denied or unavailable.");
      }
      streamRef.current = ms;
      pc.addTrack(ms.getTracks()[0]);
      
      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      
      dc.addEventListener('open', () => {
         const persona = `You are a warm, smart, professional, and friendly AI assistant. Keep replies conversational, natural, and very short (1-2 sentences max) for real-time voice. Ask natural follow-up questions when useful to keep the conversation flowing. Preserve context across this session. If audio is unclear or gibberish, politely ask the user to repeat. If the user changes language, adapt seamlessly. You must primarily understand and speak in ${language}.`;
         
         dc.send(JSON.stringify({
            type: "session.update",
            session: { 
              input_audio_transcription: { model: "whisper-1" },
              voice: voiceTone,
              turn_detection: {
                  type: "server_vad",
                  threshold: 0.5,
                  prefix_padding_ms: 300,
                  silence_duration_ms: 800
              },
              instructions: persona
            }
         }));

         // Trigger welcome greeting immediately
         dc.send(JSON.stringify({
            type: "response.create",
            response: {
               instructions: `Give me a very short, warm welcome greeting in ${language} to start our real-time conversation.`
            }
         }));
      });

      dc.addEventListener('message', (e) => {
         try {
            const ev = JSON.parse(e.data);
            handleRealtimeEvent(ev);
         } catch(err) { console.error('DataChannel parse error', err) }
      });
      
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      
      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
          method: "POST",
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/sdp"
          }
      });
      if (!sdpResponse.ok) throw new Error("SDP Answer from OpenAI failed.");
      
      const answer = { type: "answer", sdp: await sdpResponse.text() };
      await pc.setRemoteDescription(answer);
      
      setStatus('user-listening');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message);
    }
  };
  
  const disconnect = useCallback(() => {
    if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
    }
    if (audioElRef.current) {
        audioElRef.current.pause();
        audioElRef.current.srcObject = null;
    }
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(e => console.error(e));
        audioCtxRef.current = null;
    }
    analyserRef.current = null;
    setAiVolume(0);
    setStatus('disconnected');
  }, []);

  const endSession = useCallback(() => {
     if (status === 'disconnected' || status === 'idle') return;
     setStatus('ending');
     
     if (dcRef.current && dcRef.current.readyState === 'open') {
         // Ask for a polite closing before hanging up
         dcRef.current.send(JSON.stringify({
            type: "response.create",
            response: {
               instructions: `Give a very short, polite, warm goodbye to end our conversation in ${language}. Do not ask any questions.`
            }
         }));
         
         // Force disconnect after 6 seconds max if it takes too long
         setTimeout(() => { disconnect(); }, 6000);
     } else {
         disconnect();
     }
  }, [status, language, disconnect]);

  const forceDisconnect = () => disconnect();

  useEffect(() => {
    // Graceful cleanup on unmount or browser refresh
    const handleUnload = () => {
       if (pcRef.current) pcRef.current.close();
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
       window.removeEventListener('beforeunload', handleUnload);
       disconnect();
    };
  }, [disconnect]);

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        if (!audioTrack.enabled) setStatus('paused');
        else setStatus('user-listening');
        return !audioTrack.enabled;
      }
    }
    return false;
  }
  
  const changeLanguage = (newLang) => {
     setLanguage(newLang);
     if (dcRef.current && dcRef.current.readyState === 'open') {
         dcRef.current.send(JSON.stringify({
            type: "session.update",
            session: { instructions: `You are a warm, smart, professional, and friendly AI assistant. Keep replies conversational, natural, and very short (1-2 sentences max). Ask natural follow-up questions. You must strictly speak and respond in ${newLang}.` }
         }));
     }
  }

  const changeVoice = (newVoice) => {
     setVoiceTone(newVoice);
     if (dcRef.current && dcRef.current.readyState === 'open') {
         dcRef.current.send(JSON.stringify({
            type: "session.update",
            session: { voice: newVoice }
         }));
     }
  }

  const handleRealtimeEvent = (ev) => {
     if (ev.type === 'response.created') {
         setStatus('ai-thinking');
     }
     if (ev.type === 'response.audio_transcript.delta') {
         setStatus('ai-speaking');
         setTranscript(prev => {
             const newT = [...prev];
             const idx = newT.findIndex(t => t.id === ev.item_id);
             if (idx > -1) {
                 newT[idx].text += ev.delta;
             } else {
                 newT.push({ id: ev.item_id, text: ev.delta, by: 'AI' });
             }
             return newT;
         });
     }
     
     if (ev.type === 'response.audio_transcript.done' || ev.type === 'response.done') {
         setStatus(prev => prev === 'ending' ? 'disconnected' : 'user-listening');
         if (status === 'ending' || document.querySelector('.live__status-text')?.innerText.includes('Ending')) {
             setTimeout(() => disconnect(), 500); // Disconnect after goodbye finishes
         }
     }
     
     if (ev.type === 'conversation.item.input_audio_transcription.completed') {
         setStatus('ai-thinking');
         if (ev.transcript && ev.transcript.trim().length > 0) {
           setTranscript(prev => [...prev, { id: 'usr_'+Date.now(), text: ev.transcript, by: 'User' }]);
         }
     }
     
     if (ev.type === 'input_audio_buffer.speech_started') {
         setStatus('user-speaking');
     }

     if (ev.type === 'input_audio_buffer.speech_stopped') {
         setStatus('ai-thinking');
     }

     if (ev.type === 'error') {
         setStatus('error');
         setErrorMessage(ev.error?.message || "OpenAI socket error.");
     }
  };
  
  return { 
    status, errorMessage, connect, 
    endSession, forceDisconnect, 
    toggleMute, transcript, 
    language, changeLanguage,
    voiceTone, changeVoice,
    aiVolume
  };
}

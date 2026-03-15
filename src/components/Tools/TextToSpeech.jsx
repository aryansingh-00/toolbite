import React, { useState, useEffect, useRef } from 'react';
import './TextToSpeech.css';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState('');

  const synth = window.speechSynthesis;
  const utteranceRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        // Default to first English voice or first available
        const defaultVoice = availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
        setSelectedVoice(defaultVoice.name);
      }
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    return () => {
      synth.cancel();
    };
  }, [selectedVoice, synth]);

  const handlePlay = () => {
    if (!text.trim()) {
      setError('Please enter some text to speak.');
      return;
    }

    setError('');
    synth.cancel(); // Stop any current speech

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = (event) => {
      console.error('SpeechSynthesisUtterance error', event);
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
  };

  const handlePause = () => {
    if (synth.speaking && !synth.paused) {
      synth.pause();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (synth.paused) {
      synth.resume();
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    synth.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleClear = () => {
    setText('');
    handleStop();
  };

  if (!synth) {
    return (
      <div className="tts-container error">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <p>Your browser does not support the Web Speech API. Please try a modern browser like Chrome or Edge.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-to-speech-tool">
      <div className="tts-editor card">
        <textarea
          className="tts-textarea"
          placeholder="Enter the text you want to convert to speech..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        
        <div className="tts-controls">
          <div className="control-group">
            <label>Select Voice</label>
            <select 
              value={selectedVoice} 
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="tts-select"
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="sliders-grid">
            <div className="control-group">
              <label>Speed: {rate}x</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="tts-range"
              />
            </div>
            <div className="control-group">
              <label>Pitch: {pitch}</label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="tts-range"
              />
            </div>
          </div>

          {error && <p className="tts-error">{error}</p>}

          <div className="playback-actions">
            {!isSpeaking || isPaused ? (
              <button 
                className="btn btn-primary btn-icon" 
                onClick={isPaused ? handleResume : handlePlay}
              >
                <span>{isPaused ? '▶️ Resume' : '🔊 Play Speech'}</span>
              </button>
            ) : (
              <button className="btn btn-secondary btn-icon" onClick={handlePause}>
                <span>⏸️ Pause</span>
              </button>
            )}
            
            <button 
              className="btn btn-outline btn-icon" 
              onClick={handleStop}
              disabled={!isSpeaking}
            >
              <span>⏹️ Stop</span>
            </button>
            
            <button className="btn btn-danger btn-icon" onClick={handleClear} style={{ marginLeft: 'auto' }}>
              <span>🗑️ Clear</span>
            </button>
          </div>
        </div>
      </div>

      <div className="tts-info-card card">
        <h4>How it works</h4>
        <p>This tool uses the native Web Speech API provided by your browser. All audio processing happens locally on your device, ensuring complete privacy.</p>
        <ul className="info-list">
          <li>✨ <strong>Real-time Generation</strong>: Audio is generated as you play.</li>
          <li>🌍 <strong>Multilingual</strong>: Supports all voices installed on your system.</li>
          <li>🎚️ <strong>Customizable</strong>: Adjust the speed and pitch to your liking.</li>
        </ul>
      </div>
    </div>
  );
};

export default TextToSpeech;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRealtimeSession } from '../hooks/useRealtimeSession';
import LiveAvatar from '../components/LiveAvatar';
import './ConversationPage.css';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function ConversationPage() {
  const { 
    status, errorMessage, connect, 
    endSession, toggleMute, transcript, 
    language, changeLanguage, voiceTone, changeVoice,
    aiVolume
  } = useRealtimeSession();
  
  const [isMuted, setIsMuted] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const scrollRef = useRef(null);

  // Timer logic
  useEffect(() => {
    let interval;
    if (['user-listening', 'user-speaking', 'ai-thinking', 'ai-speaking', 'paused'].includes(status)) {
       interval = setInterval(() => setSessionTime(t => t + 1), 1000);
    } else {
       if (status === 'disconnected' || status === 'idle') setSessionTime(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  // Auto-scroll transcript
  useEffect(() => {
    if (scrollRef.current) {
       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const handleMute = () => setIsMuted(toggleMute());

  return (
    <div className="conv-page">
      {/* 1. Top Navigation */}
      <nav className="conv-nav">
        <Link to="/" className="conv-logo glass-card">
          <span className="logo-icon">tb.</span>
          ToolBite
        </Link>
        <div className="conv-nav-right">
           <div className={`conv-status-badge ${status}`}>
              <span className="pulse-dot" />
              {status === 'idle' && 'Ready to Connect'}
              {status === 'connecting' && 'Connecting...'}
              {status === 'user-listening' && 'Listening'}
              {status === 'user-speaking' && 'You are speaking'}
              {status === 'ai-thinking' && 'Processing...'}
              {status === 'ai-speaking' && 'AI Speaking'}
              {status === 'paused' && 'Microphone Paused'}
              {status === 'ending' && 'Saying Goodbye...'}
              {status === 'disconnected' && 'Session Ended'}
              {status === 'error' && 'Error'}
           </div>
           {sessionTime > 0 && <div className="conv-timer glass-card">{formatTime(sessionTime)}</div>}
        </div>
      </nav>

      {/* Main Video-Call Area */}
      <main className="conv-main">
         
         {/* AI Avatar Area */}
         <div className="conv-avatar-container">
            {status === 'idle' || status === 'disconnected' || status === 'error' ? (
                <div className="conv-hero-overlay">
                   <h1>Start Live <span className="gradient-text">Conversation</span></h1>
                   <p>Experience real-time AI conversation with ultra-low latency.</p>
                   {status === 'error' && <p className="conv-error-text">{errorMessage}</p>}
                   <button className="btn btn-primary conv-start-btn" onClick={connect}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                      Start Call
                   </button>
                </div>
            ) : (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="conv-3d-avatar-wrapper"
                >
                   <LiveAvatar aiVolume={aiVolume} status={status} />
                </motion.div>
            )}
         </div>

         {/* Live Transcript Overlay */}
         <AnimatePresence>
         {status !== 'idle' && status !== 'error' && (
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
             className="conv-transcript-overlay glass-card" 
             ref={scrollRef}
           >
             {transcript.length === 0 && (
                <div className="conv-transcript-empty">
                   Say hello to start the conversation!
                </div>
             )}
             <AnimatePresence>
               {transcript.map((msg, i) => (
                  <motion.div 
                     key={msg.id || i}
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     className={`conv-msg ${msg.by === 'AI' ? 'conv-msg-ai' : 'conv-msg-user'}`}
                  >
                     <span className="conv-msg-sender">{msg.by}</span>
                     <p className="conv-msg-text">{msg.text}</p>
                  </motion.div>
               ))}
             </AnimatePresence>
           </motion.div>
         )}
         </AnimatePresence>
      </main>

      {/* Controls Bar (Bottom Dock) */}
      <footer className="conv-controls-dock glass-card">
         <div className="conv-dock-left">
            <select className="conv-lang-select" value={voiceTone} onChange={(e) => changeVoice(e.target.value)} disabled={status === 'connecting'}>
               <option value="alloy">Alloy Voice</option>
               <option value="echo">Echo Voice</option>
               <option value="fable">Fable Voice</option>
               <option value="onyx">Onyx Voice</option>
               <option value="nova">Nova Voice</option>
               <option value="shimmer">Shimmer Voice</option>
            </select>
            <select className="conv-lang-select" value={language} onChange={(e) => changeLanguage(e.target.value)} disabled={status === 'connecting'}>
               <option value="English">English</option>
               <option value="Spanish">Spanish</option>
               <option value="French">French</option>
               <option value="Hindi">Hindi</option>
               <option value="Arabic">Arabic</option>
            </select>
         </div>

         <div className="conv-dock-center">
            {['idle', 'disconnected', 'error'].includes(status) ? (
               <button className="conv-dock-btn connect-btn" onClick={connect}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Connect
               </button>
            ) : (
               <>
                  <button className={`conv-dock-btn mute-btn ${isMuted ? 'muted' : ''}`} onClick={handleMute}>
                     {isMuted ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                     ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                     )}
                  </button>
                  <button className="conv-dock-btn end-btn" onClick={endSession} disabled={status === 'ending'}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line></svg>
                     {status === 'ending' ? 'Ending...' : 'End Call'}
                  </button>
               </>
            )}
         </div>
         
         <div className="conv-dock-right">
            <div className={`conv-mini-vis ${status === 'ai-speaking' || status === 'ending' ? 'ai-speaking' : ''}`}>
               {[1,2,3,4,5].map(i => <span key={i} />)}
            </div>
         </div>
      </footer>
    </div>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import './DemoPreview.css'

const CHAT_MESSAGES = [
  { from: 'user', text: 'Hola! ¿Puedes ayudarme con mi presentación de marketing?' },
  { from: 'ai', text: '¡Por supuesto! Cuéntame más sobre tu audiencia y los objetivos de la presentación.' },
  { from: 'user', text: 'It\'s for Q2 results — maybe 50 senior executives.' },
  { from: 'ai', text: 'Perfect. For a senior executive audience, lead with ROI data within the first 30 seconds. Want me to draft the opening slide structure?' },
]

export default function DemoPreview() {
  return (
    <section className="demo section" id="demo" aria-labelledby="demo-title">
      <div className="blob" style={{ width: 700, height: 700, background: 'rgba(6,182,212,0.07)', top: '-20%', right: '-20%' }} />
      <div className="container">
        <div className="demo__inner">
          {/* Left: content */}
          <motion.div
            className="demo__content"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="badge">Live Demo</span>
            <h2 id="demo-title" className="section-title">
              See the AI in <span className="gradient-text">Action</span>
            </h2>
            <p className="section-subtitle">
              Watch as ToolBite seamlessly switches languages mid-conversation, understanding context and intent without skipping a beat.
            </p>
            <ul className="demo__bullets">
              {[
                'Responds in under 200ms',
                'Switches languages on the fly',
                'Remembers conversation context',
                'Detects emotion and adapts tone',
              ].map(b => (
                <li key={b} className="demo__bullet">
                  <span className="demo__bullet-icon">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="btn btn-primary">Try It Free</a>
          </motion.div>

          {/* Right: chat UI mockup */}
          <motion.div
            className="demo__ui-wrap"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {/* Floating glow */}
            <div className="demo__ui-glow" />
            <div className="demo__ui glass-card">
              {/* Top bar */}
              <div className="demo__ui-bar">
                <div className="demo__ui-avatar">
                  <div className="demo__ui-avatar-pulse" />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4l3 3"/>
                  </svg>
                </div>
                <div className="demo__ui-agent-info">
                  <span className="demo__ui-agent-name">ToolBite AI</span>
                  <span className="demo__ui-status">
                    <span className="demo__status-dot" />
                    Online — Multilingual Mode
                  </span>
                </div>
                <div className="demo__ui-languages">
                  <span>ES</span> <span>/</span> <span>EN</span>
                </div>
              </div>

              {/* Chat */}
              <div className="demo__ui-chat">
                {CHAT_MESSAGES.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`demo__msg demo__msg--${msg.from}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  >
                    <div className="demo__msg-bubble">{msg.text}</div>
                    {msg.from === 'ai' && (
                      <div className="demo__msg-footer">
                        <span className="demo__typing-badge">● ToolBite AI</span>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <div className="demo__typing">
                  <span/><span/><span/>
                </div>
              </div>

              {/* Input */}
              <div className="demo__ui-input">
                <div className="demo__input-field">Type or speak in any language...</div>
                <button className="demo__mic-btn" aria-label="Voice input">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" y1="19" x2="12" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

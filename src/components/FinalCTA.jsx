import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './FinalCTA.css'

export default function FinalCTA() {
  const navigate = useNavigate()

  const handleStartFree = (e) => {
    e.preventDefault();
    navigate('/app');
  }

  return (
    <section className="cta section" id="waitlist" aria-labelledby="cta-title">
      <div className="container">
        <motion.div
          className="cta__inner glass-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated Glow Background */}
          <div className="cta__glow-wrapper">
             <div className="cta__glow cta__glow-1" />
             <div className="cta__glow cta__glow-2" />
          </div>

          <div className="cta__content">
            <h2 id="cta-title" className="cta__title">
              Ready to <span className="gradient-text">Talk?</span>
            </h2>
            <p className="cta__desc">
              Join leading innovative companies already using ToolBite. Claim your early access today and build your first fully conversational Virtual Human in minutes.
            </p>
            
            <form className="cta__form" onSubmit={handleStartFree}>
              <div className="cta__form-row">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="cta__input"
                  required
                />
                <button type="submit" className="btn btn-primary cta__btn">
                  Start Free
                </button>
              </div>
            </form>

            <div className="cta__secondary">
              <span className="cta__or">— or —</span>
              <button type="button" onClick={() => navigate('/app')} className="btn btn-secondary cta__demo-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
                Try Live Demo
              </button>
            </div>

            <p className="cta__trust">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Zero spam. End-to-end encryption. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

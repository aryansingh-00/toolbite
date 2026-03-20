import React from 'react'
import { motion } from 'framer-motion'
import './Multilingual.css'

const LANGUAGES = [
  { code: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'HI', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ZH', name: '中文', flag: '🇨🇳' },
  { code: 'AR', name: 'عربी', flag: '🇸🇦' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'PT', name: 'Português', flag: '🇧🇷' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'JA', name: '日本語', flag: '🇯🇵' },
  { code: 'KO', name: '한국어', flag: '🇰🇷' },
  { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'RU', name: 'Русский', flag: '🇷🇺' },
]

export default function Multilingual() {
  return (
    <section className="multilingual section" id="multilingual" aria-labelledby="multi-title">
      <div className="blob" style={{ width: 700, height: 700, background: 'rgba(99,102,241,0.08)', top: '0', left: '50%', transform: 'translateX(-50%)' }} />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="badge">Global AI</span>
          <h2 id="multi-title" className="section-title">
            One AI. <span className="gradient-text">Every Language.</span>
          </h2>
          <p className="section-subtitle">
            ToolBite speaks your user's language — natively, naturally, and without delay. Real-time translation built right into the conversation engine.
          </p>
        </motion.div>

        {/* Language bubbles */}
        <div className="multi__bubbles" aria-label="Supported languages">
          {LANGUAGES.map((lang, i) => (
            <motion.div
              key={lang.code}
              className="multi__bubble glass-card"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: -6 }}
            >
              <span className="multi__flag">{lang.flag}</span>
              <span className="multi__code">{lang.code}</span>
              <span className="multi__name">{lang.name}</span>
            </motion.div>
          ))}
        </div>

        {/* More count */}
        <motion.div
          className="multi__more"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          +50 more languages available
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="multi__stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {[
            { value: '50+', label: 'Languages Supported' },
            { value: '<200ms', label: 'Translation Latency' },
            { value: '99.2%', label: 'Translation Accuracy' },
            { value: '24/7', label: 'Always Available' },
          ].map(s => (
            <div key={s.value} className="multi__stat glass-card">
              <span className="multi__stat-value gradient-text">{s.value}</span>
              <span className="multi__stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

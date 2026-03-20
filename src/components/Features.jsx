import React from 'react'
import { motion } from 'framer-motion'
import './Features.css'

const FEATURES = [
  {
    icon: '🌐',
    title: 'Multilingual Intelligence',
    desc: 'Speak in English, Hindi, Spanish, French, Arabic, Mandarin, or 45+ more languages. Real-time switching with zero latency.',
    color: '#6366f1',
  },
  {
    icon: '❤️',
    title: 'Emotionally Aware AI',
    desc: "Our AI detects sentiment and adapts its tone — empathetic when you're stressed, enthusiastic when you're excited.",
    color: '#ec4899',
  },
  {
    icon: '⚡',
    title: 'Ultra-Low Latency',
    desc: 'Sub-200ms response time. The AI responds before you finish your thought, making conversations feel completely natural.',
    color: '#f59e0b',
  },
  {
    icon: '🧠',
    title: 'Long-Term Memory',
    desc: 'ToolBite remembers your preferences, history, and context across sessions — no need to repeat yourself.',
    color: '#8b5cf6',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    desc: 'End-to-end encrypted conversations. Your data is never sold, never shared. You own your conversations.',
    color: '#22c55e',
  },
  {
    icon: '🎭',
    title: 'Custom AI Personas',
    desc: 'Deploy your own branded AI human — custom name, personality, voice, and expertise for your business.',
    color: '#06b6d4',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Features() {
  return (
    <section className="features section" id="features" aria-labelledby="features-title">
      <div className="blob" style={{ width: 600, height: 600, background: 'rgba(99,102,241,0.07)', top: '20%', left: '-20%' }} />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="badge">Platform Features</span>
          <h2 id="features-title" className="section-title">
            Built for <span className="gradient-text">Real Conversation</span>
          </h2>
          <p className="section-subtitle">
            Our live AI conversation platform is designed to make interactions feel less like software and more like talking to a knowledgeable, human-like AI voice assistant.
          </p>
        </motion.div>

        <motion.div
          className="features__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {FEATURES.map((feat) => (
            <motion.article
              key={feat.title}
              className="feature-card glass-card"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="feature-card__icon" style={{ background: `${feat.color}18` }}>
                <span className="feature-card__emoji">{feat.icon}</span>
              </div>
              <div className="feature-card__glow" style={{ background: `radial-gradient(circle, ${feat.color}20 0%, transparent 70%)` }} />
              <h3 className="feature-card__title">{feat.title}</h3>
              <p className="feature-card__desc">{feat.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

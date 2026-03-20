import React from 'react'
import { motion } from 'framer-motion'
import './WhyUs.css'

const STATS = [
  { value: '10M+', label: 'Conversations', icon: '💬' },
  { value: '195', label: 'Countries', icon: '🌍' },
  { value: '4.9/5', label: 'User Rating', icon: '⭐' },
  { value: '97%', label: 'Satisfaction Rate', icon: '❤️' },
]

const DIFFERENTIATORS = [
  {
    title: 'Not a Chatbot. A Conversation.',
    desc: "Traditional chatbots follow scripts. ToolBite's AI understands context, asks follow-up questions, and handles nuance — exactly like a human would.",
    icon: '🤝',
  },
  {
    title: 'Real-Time, Zero Lag',
    desc: 'Engineered for speed. Our proprietary streaming architecture keeps response time under 200ms, so silence never kills the conversation.',
    icon: '⚡',
  },
  {
    title: 'Emotion-Aware by Design',
    desc: 'Built on top of multimodal models that detect vocal tone, sentiment, and urgency — then adapt the AI response accordingly.',
    icon: '🧠',
  },
  {
    title: 'White-Label Ready',
    desc: 'Deploy ToolBite under your brand. Custom voice, name, personality, and domain knowledge — all yours in days, not months.',
    icon: '🏢',
  },
]

export default function WhyUs() {
  return (
    <section className="whyus section" id="why-us" aria-labelledby="whyus-title">
      <div className="blob" style={{ width: 600, height: 600, background: 'rgba(6,182,212,0.06)', top: '50%', right: '-20%' }} />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="badge">Why ToolBite</span>
          <h2 id="whyus-title" className="section-title">
            The AI That Actually <span className="gradient-text">Feels Human</span>
          </h2>
          <p className="section-subtitle">
            We're not just another chatbot website. ToolBite is a premier voice AI assistant platform built from the ground up for authentic, human-quality AI avatar chat.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="whyus__stats">
          {STATS.map((s, i) => (
            <motion.div
              key={s.value}
              className="whyus__stat glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <span className="whyus__stat-icon">{s.icon}</span>
              <span className="whyus__stat-value gradient-text">{s.value}</span>
              <span className="whyus__stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Differentiators */}
        <div className="whyus__grid">
          {DIFFERENTIATORS.map((d, i) => (
            <motion.article
              key={d.title}
              className="whyus__card glass-card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <span className="whyus__card-icon">{d.icon}</span>
              <div>
                <h3 className="whyus__card-title">{d.title}</h3>
                <p className="whyus__card-desc">{d.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

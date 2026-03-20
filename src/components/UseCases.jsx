import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './UseCases.css'

const CASES = [
  {
    id: 'education',
    label: '🎓 Education',
    title: 'AI Tutors for Every Student',
    desc: 'Students get a patient, knowledgeable tutor who explains concepts in their native language, adapts to their learning pace, and is available 24/7.',
    benefits: ['Personalized learning paths', 'Any subject, any level', 'Available in 50+ languages', '24/7 availability'],
  },
  {
    id: 'customer',
    label: '💼 Customer Service',
    title: 'Support That Never Sleeps',
    desc: 'Replace your chatbot with a true AI human. Handle complex queries, de-escalate frustrated customers, and deliver resolutions in seconds.',
    benefits: ['Human-like empathy', '300x faster than email', 'Zero wait times', 'Consistent quality'],
  },
  {
    id: 'healthcare',
    label: '🏥 Healthcare',
    title: 'Compassionate AI Care',
    desc: 'Help patients navigate their health journey — answering questions, explaining diagnoses, and providing emotional support between appointments.',
    benefits: ['HIPAA-compliant design', 'Empathetic by default', 'Medical terminology fluent', 'Patient-first tone'],
  },
  {
    id: 'language',
    label: '🌍 Language Learning',
    title: 'Practice Any Language Live',
    desc: 'Immersive conversation practice with an AI native speaker. Learn by doing, get real-time corrections, and gain fluency faster than any app.',
    benefits: ['Native-level accuracy', 'Real-time corrections', 'Every major language', 'Cultural context included'],
  },
  {
    id: 'hr',
    label: '👥 HR & Recruiting',
    title: 'AI-Powered Interviews',
    desc: 'Conduct first-round interviews, onboard new hires, and answer policy questions — all handled by your branded AI human.',
    benefits: ['Zero scheduling needed', 'Consistent evaluations', 'Multi-language interviews', 'Branded experience'],
  },
]

export default function UseCases() {
  const [active, setActive] = useState('education')
  const current = CASES.find(c => c.id === active)

  return (
    <section className="usecases section" id="use-cases" aria-labelledby="usecases-title">
      <div className="blob" style={{ width: 600, height: 600, background: 'rgba(139,92,246,0.07)', bottom: '-10%', left: '-15%' }} />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="badge">Use Cases</span>
          <h2 id="usecases-title" className="section-title">
            Built for <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="section-subtitle">
            From enterprise to education, our AI virtual human solutions fit naturally wherever real-time AI conversation matters.
          </p>
        </motion.div>

        <div className="usecases__tabs">
          {CASES.map(c => (
            <button
              key={c.id}
              className={`usecases__tab${active === c.id ? ' active' : ''}`}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="usecases__panel glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="usecases__panel-content">
              <h3 className="usecases__panel-title">{current.title}</h3>
              <p className="usecases__panel-desc">{current.desc}</p>
              <ul className="usecases__benefits">
                {current.benefits.map(b => (
                  <li key={b} className="usecases__benefit">
                    <span className="usecases__benefit-check">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <a href="#waitlist" className="btn btn-primary">Get Started Free</a>
            </div>
            <div className="usecases__panel-visual" aria-hidden="true">
              <div className="usecases__visual-orb" />
              <div className="usecases__visual-text">{current.label.split(' ')[0]}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

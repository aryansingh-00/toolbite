import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './HowItWorks.css'

const FLOW_STEPS = [
  {
    id: '01',
    title: 'User Speaks',
    desc: 'You talk naturally into your microphone. No push-to-talk needed.',
    color: '#06b6d4',
    alignment: 'left',
    visual: () => (
      <div className="flow-visual__waveform">
        {[1,2,3,4,5].map(i => <motion.span key={i} animate={{ height: [10, 30, 10] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }} />)}
      </div>
    )
  },
  {
    id: '02',
    title: 'AI Understands',
    desc: 'Our engine instantly transcribes speech and detects sentiment.',
    color: '#8b5cf6',
    alignment: 'right',
    visual: () => (
      <div className="flow-visual__bubble flow-visual__bubble--user">
        "Can you explain quantum computing?"
      </div>
    )
  },
  {
    id: '03',
    title: 'Real-Time Processing',
    desc: 'The AI processes meaning, context, and emotional tone simultaneously.',
    color: '#ec4899',
    alignment: 'left',
    visual: () => (
      <div className="flow-visual__processing">
        <span className="flow-visual__node" />
        <span className="flow-visual__node" />
        <span className="flow-visual__node" />
      </div>
    )
  },
  {
    id: '04',
    title: 'Natural Reply',
    desc: 'A context-aware, highly accurate response is generated instantly.',
    color: '#f59e0b',
    alignment: 'right',
    visual: () => (
      <div className="flow-visual__bubble flow-visual__bubble--ai">
        "Imagine a coin spinning in mid-air..."
      </div>
    )
  },
  {
    id: '05',
    title: 'AI Speaks Back',
    desc: 'The virtual human responds in your chosen language with natural inflection.',
    color: '#22c55e',
    alignment: 'left',
    visual: () => (
      <div className="flow-visual__waveform flow-visual__waveform--green">
        {[1,2,3,4,5,6,7].map(i => <motion.span key={i} animate={{ height: [15, 40, 15] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }} />)}
      </div>
    )
  }
]

export default function HowItWorks() {
  const containerRef = useRef()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  // Grow the center SVG line based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="how section" id="how-it-works" aria-labelledby="how-title">
      <div className="blob" style={{ width: 800, height: 800, background: 'rgba(6,182,212,0.05)', top: '10%', right: '-20%' }} />
      <div className="container" ref={containerRef}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="badge">The Pipeline</span>
          <h2 id="how-title" className="section-title">
            How the <span className="gradient-text">Engine Works</span>
          </h2>
          <p className="section-subtitle">
            Sub-200ms latency from the moment you speak to the moment the AI replies. Here is the exact conversation flow.
          </p>
        </motion.div>

        <div className="how__timeline">
          {/* Animated Center Line */}
          <div className="how__timeline-line-track">
            <motion.div className="how__timeline-line-fill" style={{ height: lineHeight }} />
          </div>

          {FLOW_STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              className={`how__timeline-row ${step.alignment === 'left' ? 'how__row-left' : 'how__row-right'}`}
              initial={{ opacity: 0, y: 40, x: step.alignment === 'left' ? -30 : 30 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Center Dot */}
              <div className="how__timeline-dot" style={{ borderColor: step.color }}>
                <div className="how__timeline-dot-inner" style={{ background: step.color }} />
              </div>

              {/* Card */}
              <div className="how__card glass-card">
                <div className="how__card-header" style={{ color: step.color }}>
                  <span className="how__card-num">{step.id}</span>
                  <h3 className="how__card-title">{step.title}</h3>
                </div>
                <p className="how__card-desc">{step.desc}</p>
                
                {/* Visual UI Panel */}
                <div className="how__card-visual">
                  {step.visual()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

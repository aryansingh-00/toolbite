import React from 'react'
import { motion } from 'framer-motion'
import './Testimonials.css'

const TESTIMONIALS = [
  {
    quote: "I've tried every AI chatbot out there. ToolBite is the first one that actually made me forget I was talking to a machine. It remembered everything from our last session.",
    name: 'Priya Sharma',
    role: 'Product Manager, TechCorp',
    avatar: '👩🏽‍💼',
    rating: 5,
  },
  {
    quote: 'We replaced our entire customer service team for Tier-1 support with ToolBite. Response times went from 4 hours to 0.2 seconds. Customer satisfaction went up 40%.',
    name: 'Marcus Chen',
    role: 'CTO, RetailPulse',
    avatar: '👨🏻‍💻',
    rating: 5,
  },
  {
    quote: 'As a non-native English speaker, ToolBite was a revelation. It talked to me in Hindi, switched to English when needed, and never once felt awkward.',
    name: 'Kavita Mehta',
    role: 'Language Teacher, Delhi',
    avatar: '👩🏽‍🏫',
    rating: 5,
  },
  {
    quote: 'Our medical practice uses ToolBite for patient intake. The empathy is remarkable — patients genuinely feel heard before they even see a doctor.',
    name: 'Dr. James Otieno',
    role: 'Family Physician, Nairobi',
    avatar: '👨🏿‍⚕️',
    rating: 5,
  },
  {
    quote: "The white-label option is incredible value. We had our branded AI human live in 3 days. Our clients think we built custom AI — we didn't tell them otherwise.",
    name: 'Sofia Reyes',
    role: 'Founder, Conversio Agency',
    avatar: '👩🏻‍🦱',
    rating: 5,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials" aria-labelledby="testimonials-title">
      <div className="blob" style={{ width: 700, height: 700, background: 'rgba(99,102,241,0.06)', top: '20%', left: '50%', transform: 'translateX(-50%)' }} />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="badge">Testimonials</span>
          <h2 id="testimonials-title" className="section-title">
            Loved by <span className="gradient-text">Real People</span>
          </h2>
          <p className="section-subtitle">
            From startups to enterprises, here's what early users are saying about their ToolBite experience.
          </p>
        </motion.div>

        <motion.div
          className="testimonials__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={t.name}
              className={`testimonial-card glass-card${i === 2 ? ' testimonial-card--featured' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -6 }}
            >
              <div className="testimonial-card__rating" aria-label={`${t.rating} stars`}>
                {'★'.repeat(t.rating)}
              </div>
              <p className="testimonial-card__quote">&ldquo;{t.quote}&rdquo;</p>
              <footer className="testimonial-card__author">
                <span className="testimonial-card__avatar">{t.avatar}</span>
                <div>
                  <cite className="testimonial-card__name">{t.name}</cite>
                  <span className="testimonial-card__role">{t.role}</span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

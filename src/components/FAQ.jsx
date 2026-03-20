import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './FAQ.css'

const FAQS = [
  {
    q: 'What exactly is ToolBite?',
    a: "ToolBite is a platform that lets users have real-time, natural conversations with a virtual AI human. Unlike chatbots, our AI is emotionally aware, multilingual, and designed to feel genuinely human in every interaction.",
  },
  {
    q: 'How is ToolBite different from ChatGPT or other AI chatbots?',
    a: "ToolBite is purpose-built for live conversation. We focus on voice-first, emotionally intelligent, real-time interaction with sub-200ms latency. ChatGPT is a text tool. ToolBite is a conversation platform — the difference is enormous in practice.",
  },
  {
    q: 'Which languages does ToolBite support?',
    a: 'ToolBite supports 50+ languages including English, Spanish, Hindi, Arabic, Mandarin, French, Portuguese, German, Japanese, Korean, Russian, Italian, and many more. You can even switch languages mid-conversation.',
  },
  {
    q: 'Is my data safe and private?',
    a: 'Absolutely. All conversations are end-to-end encrypted. We never sell your data to third parties. You can delete your conversation history at any time. Enterprise plans include HIPAA-compliant infrastructure options.',
  },
  {
    q: 'Can I white-label ToolBite for my business?',
    a: "Yes! Our Enterprise plan includes full white-labeling — custom AI name, voice, personality, and domain knowledge. You can deploy a branded AI human under your company's identity in as little as 3 business days.",
  },
  {
    q: 'What is the response time / latency?',
    a: 'Our target is under 200ms for text responses and under 500ms for voice synthesis. In practice, most conversations feel instantaneous. We use distributed edge infrastructure to minimize latency globally.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes! Our Starter plan is free forever with 100 conversations per month and access to 5 languages. No credit card required to start. Upgrade to Pro or Enterprise when you need more.',
  },
  {
    q: 'How do I get early access?',
    a: "Click the 'Get Early Access' button at the top of the page and join our waitlist. We're onboarding users in batches. You'll receive a confirmation email and access link within 48 hours.",
  },
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`faq__item${isOpen ? ' open' : ''}`}>
      <button
        className="faq__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{faq.q}</span>
        <span className="faq__icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq__answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <p>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="faq section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="badge">FAQ</span>
          <h2 id="faq-title" className="section-title">
            Got <span className="gradient-text">Questions?</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about ToolBite. Can't find the answer? Chat with our AI — or us.
          </p>
        </motion.div>

        <motion.div
          className="faq__list"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

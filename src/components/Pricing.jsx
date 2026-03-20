import React from 'react'
import { motion } from 'framer-motion'
import './Pricing.css'

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    desc: 'Perfect for individuals exploring AI conversation.',
    features: [
      '100 conversations / month',
      '5 languages',
      'Standard AI model',
      'Web access',
      'Email support',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/ month',
    desc: 'For power users and growing teams who need more.',
    features: [
      'Unlimited conversations',
      '50+ languages',
      'Advanced AI model',
      'Voice & video mode',
      'Long-term memory',
      'Priority support',
      'Analytics dashboard',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    desc: 'For businesses that need a branded, custom-deployed AI human.',
    features: [
      'Everything in Pro',
      'White-label AI persona',
      'Custom voice & personality',
      'Dedicated infrastructure',
      'SLA + uptime guarantee',
      'API access',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section className="pricing section" id="pricing" aria-labelledby="pricing-title">
      <div className="blob" style={{ width: 600, height: 600, background: 'rgba(99,102,241,0.08)', bottom: '-10%', left: '-15%' }} />
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="badge">Pricing</span>
          <h2 id="pricing-title" className="section-title">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="section-subtitle">
            Start free. No credit card required. Upgrade when you're ready.
          </p>
        </motion.div>

        <div className="pricing__grid">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.name}
              className={`pricing__card glass-card${plan.highlighted ? ' pricing__card--highlighted' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              {plan.badge && <div className="pricing__badge">{plan.badge}</div>}
              <div className="pricing__card-top">
                <h3 className="pricing__name">{plan.name}</h3>
                <p className="pricing__desc">{plan.desc}</p>
                <div className="pricing__price">
                  <span className="pricing__amount">{plan.price}</span>
                  <span className="pricing__period">{plan.period}</span>
                </div>
              </div>
              <ul className="pricing__features">
                {plan.features.map(f => (
                  <li key={f} className="pricing__feature">
                    <span className="pricing__check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} pricing__cta`}
              >
                {plan.cta}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

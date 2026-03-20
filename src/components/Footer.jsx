import React from 'react'
import './Footer.css'

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Demo', href: '#demo' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Contact', href: 'mailto:hello.toolbite@gmail.com' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Data Processing', href: '#' },
  ],
  'Connect': [
    { label: 'Instagram', href: 'https://instagram.com/toolbite' },
    { label: 'Twitter / X', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top">
        <div className="container footer__inner">
          {/* Brand column */}
          <div className="footer__brand">
            <a href="#" className="footer__logo" aria-label="ToolBite Home">
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="url(#footerLogoGrad)"/>
                <path d="M10 16a6 6 0 0 1 12 0" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="2.5" fill="#fff"/>
                <circle cx="10" cy="16" r="2" fill="rgba(255,255,255,0.6)"/>
                <circle cx="22" cy="16" r="2" fill="rgba(255,255,255,0.6)"/>
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="32" y2="32">
                    <stop stopColor="#6366f1"/>
                    <stop offset="1" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
              </svg>
              <span>ToolBite</span>
            </a>
            <p className="footer__tagline">
              The world's most human AI conversation platform. Talk live with AI in any language, anytime.
            </p>
            <div className="footer__badge-row">
              <span className="badge">AI-Powered</span>
              <span className="badge">50+ Languages</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <nav key={group} className="footer__col" aria-label={`${group} links`}>
              <h3 className="footer__col-title">{group}</h3>
              <ul className="footer__links">
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="footer__link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} ToolBite. All rights reserved.
          </p>
          <p className="footer__copy">
            Built for the future of human-AI conversation.{' '}
            <a href="mailto:hello.toolbite@gmail.com" className="footer__email">hello.toolbite@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

import React, { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#" className="navbar__logo" aria-label="ToolBite Home">
          <span className="navbar__logo-icon">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="url(#logoGrad)"/>
              <path d="M10 16a6 6 0 0 1 12 0" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="16" cy="16" r="2.5" fill="#fff"/>
              <circle cx="10" cy="16" r="2" fill="rgba(255,255,255,0.6)"/>
              <circle cx="22" cy="16" r="2" fill="rgba(255,255,255,0.6)"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#6366f1"/>
                  <stop offset="1" stopColor="#06b6d4"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="navbar__logo-text">ToolBite</span>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="navbar__link">{link.label}</a>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <a href="#waitlist" className="btn btn-primary navbar__cta">
            Get Early Access
          </a>
          {/* Mobile hamburger */}
          <button
            className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="navbar__mobile" aria-label="Mobile navigation">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="navbar__mobile-link" onClick={handleLinkClick}>
              {link.label}
            </a>
          ))}
          <a href="#waitlist" className="btn btn-primary navbar__mobile-cta" onClick={handleLinkClick}>
            Get Early Access
          </a>
        </nav>
      )}
    </header>
  )
}

import React from 'react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-icon">咬</span>
              <span className="logo-text">Tool<span>Bite</span></span>
            </div>
            <p className="footer-desc">
              Fast, modern multi-tool website for students, creators, and general users.
            </p>
          </div>
          
          <div className="footer-links">
            <h4>Platform</h4>
            <ul>
              <li><a href="/tools">All Tools</a></li>
              <li><a href="/tools#text">Text Tools</a></li>
              <li><a href="/tools#utility">Utility Tools</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} ToolBite. All rights reserved.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/hello.toolbite" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="GitHub">󰊤</a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer

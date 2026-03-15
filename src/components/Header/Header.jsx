import React, { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigation = (e, path) => {
    e.preventDefault();
    setIsMenuOpen(false);
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo" onClick={(e) => handleNavigation(e, '/')} style={{cursor: 'pointer'}}>
          <span className="logo-icon">𝕋𝔹</span>
          <span className="logo-text">Tool<span>Bite</span></span>
        </div>
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="/" onClick={(e) => handleNavigation(e, '/')}>Home</a></li>
            <li><a href="/tools" onClick={(e) => handleNavigation(e, '/tools')}>Tools</a></li>
            <li><a href="/about" onClick={(e) => handleNavigation(e, '/about')}>About</a></li>
            <li><a href="/contact" onClick={(e) => handleNavigation(e, '/contact')}>Contact</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={(e) => handleNavigation(e, '/tools')}>Try Now</button>
        </div>
        <button 
          className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header

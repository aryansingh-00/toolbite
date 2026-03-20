import React from 'react'
import Button from '../components/Button/Button'
import './Home.css'

const Home = () => {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-content">
            <h1 id="hero-title">
              Free Online Tools by <span className="highlight">ToolBite</span>
            </h1>
            <p className="hero-subtitle">
              A curated collection of fast, simple, and free online tools designed for everyone.
            </p>
            <div className="cta-actions" style={{ marginTop: '2rem' }}>
              <Button size="lg" onClick={() => {
                window.history.pushState({}, '', '/tools');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}>Explore Tools</Button>
              <Button variant="secondary" size="lg" onClick={() => {
                window.history.pushState({}, '', '/about');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}>About Us</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose" aria-labelledby="why-title">
        <div className="container">
          <div className="why-choose-grid">
            <div className="why-choose-img" aria-hidden="true">
              <div className="placeholder-illustration">✨</div>
            </div>
            <div className="why-choose-content">
              <h2 id="why-title" className="section-title" style={{ textAlign: 'left' }}>Why Choose ToolBite?</h2>
              <p className="section-subtitle" style={{ textAlign: 'left', marginInline: '0' }}>
                We believe tools should be simple, accessible, and beautiful. No clutter, just functionality.
              </p>
              <ul className="features-list">
                <li>
                  <span className="feature-icon" aria-hidden="true">⚡</span>
                  <div>
                    <h4>Lightning Fast</h4>
                    <p>Optimized for speed so you can get your work done without waiting.</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon" aria-hidden="true">🛡️</span>
                  <div>
                    <h4>Privacy First</h4>
                    <p>All processing happens in your browser. Your data never leaves your device.</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon" aria-hidden="true">📱</span>
                  <div>
                    <h4>Responsive Design</h4>
                    <p>Use our tools on your phone, tablet, or desktop with ease.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" aria-labelledby="cta-title">
        <div className="container">
          <article className="cta-content card">
            <h2 id="cta-title">Ready to boost your productivity?</h2>
            <p>Join thousands of users who use ToolBite every day to simplify their workflow.</p>
            <div className="cta-actions">
              <Button size="lg" onClick={() => {
                window.history.pushState({}, '', '/tools');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}>Explore All Tools</Button>
              <Button variant="secondary" size="lg" onClick={() => {
                window.history.pushState({}, '', '/about');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}>About Us</Button>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Home

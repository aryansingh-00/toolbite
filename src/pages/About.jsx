import React from 'react'
import Button from '../components/Button/Button'
import './About.css'

const About = () => {
  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="container">
          <h1 id="about-title" className="section-title">Small Tools. Big Impact.</h1>
          <p className="section-subtitle">
            We're building the most efficient utility platform on the web, designed to solve your digital friction in just one bite.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>The ToolBite Mission</h2>
              <p>
                In a world of bloated software and complex setups, ToolBite stands for the <strong>essential</strong>. Our journey began with a simple question: why should simple tasks require heavy tools?
              </p>
              <p>
                We've curated a collection of micro-utilities that are always accessible, require no installation, and respect your privacy. Whether you're a developer formatting JSON or a creator generating QR codes, we're here to save you those vital seconds.
              </p>
              
              <div className="values-grid">
                <div className="value-item">
                  <div className="value-icon">⚡</div>
                  <h4>Extreme Speed</h4>
                  <p>Our architecture is optimized for sub-second responses and high-performance client-side logic.</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">✨</div>
                  <h4>Zero Clutter</h4>
                  <p>Experience tools without intrusive ads or unnecessary navigation. Just the utility you need.</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🔒</div>
                  <h4>Local Security</h4>
                  <p>We leverage modern browser APIs to process your sensitive data safely on your own machine.</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="placeholder-illustration card">
                <div className="bite-logo">Tool<span>Bite</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="cta-card card">
            <h3>Want to contribute?</h3>
            <p>ToolBite is shaped by its community. If you have an idea for a new tool or want to help us improve, we're always open to suggestions.</p>
            <div className="cta-buttons">
              <Button variant="primary" onClick={() => window.location.href = '/contact'}>Suggest a Tool</Button>
              <Button variant="outline" onClick={() => window.location.href = '/tools'}>Browse Directory</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About

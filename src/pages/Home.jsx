import React from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import ToolCard from '../components/ToolCard/ToolCard'
import Button from '../components/Button/Button'
import AdPlacement from '../components/AdPlacement'
import { tools, categories } from '../data/tools'

import './Home.css'

const Home = () => {
  const featuredTools = tools.slice(0, 6)

  const categoryHighlights = categories.slice(1, 6).map(cat => ({
    ...cat,
    count: tools.filter(t => t.category === cat.name).length
  }))

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-content">
            <h1 id="hero-title">All the tools you need, in <span className="highlight">one bite</span>.</h1>
            <p className="hero-subtitle">
              ToolBite offers a curated collection of fast, simple, and free online tools designed for students, creators, and developers.
            </p>
            <div className="hero-search" onClick={() => {
              window.history.pushState({}, '', '/tools');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }} style={{cursor: 'pointer'}}>
              <SearchBar />
            </div>
            <div className="hero-tags">
              <span>Popular:</span>
              <a href="/tools/text-to-speech">Text to Speech</a>
              <a href="/tools/json-formatter">JSON Formatter</a>
              <a href="/tools/resume-builder">Resume Builder</a>
            </div>
            
            <AdPlacement zone="hero" />
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="featured-section" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-header">
            <h2 id="featured-title" className="section-title">Featured Tools</h2>
            <p className="section-subtitle">Hand-picked tools to help you get things done faster.</p>
          </div>
          <div className="grid">
            {featuredTools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </div>
          <div className="section-footer">
            <Button variant="outline" size="lg" onClick={() => {
              window.history.pushState({}, '', '/tools');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}>View All Tools</Button>
          </div>

        </div>
      </section>

      <div className="container">
        <AdPlacement zone="inline" />
      </div>

      {/* Categories Section */}

      <section className="categories-section" aria-labelledby="categories-title">
        <div className="container">
          <div className="section-header">
            <h2 id="categories-title" className="section-title">Tool Categories</h2>
            <p className="section-subtitle">Explore our wide range of specialized tools across different categories.</p>
          </div>
          <div className="categories-grid">
            {categoryHighlights.map((cat, index) => (
              <div key={index} className="category-card card" onClick={() => {
                window.history.pushState({}, '', '/tools');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}>
                <div className="category-icon" aria-hidden="true">{cat.icon}</div>
                <h3>{cat.name}</h3>
                <p>{cat.count} tools</p>
              </div>
            ))}
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

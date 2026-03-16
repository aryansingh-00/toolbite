import React from 'react'
import Button from '../components/Button/Button'
import AdPlacement from '../components/AdPlacement'
import './ToolTemplate.css'


const ToolTemplate = ({ title, description, category, children }) => {
  return (
    <main className="tool-template">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a> / <a href="/tools">Tools</a> / <span>{title}</span>
        </nav>
        
        <header className="tool-header">
          <div className="tool-header-info">
            <span className="badge">{category}</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className="tool-actions">
            <Button variant="outline" size="sm">Share</Button>
            <Button variant="outline" size="sm">Favorite</Button>
          </div>
        </header>

        <div className="tool-layout">
          <article className="tool-main card">
            {/* Top banner above the tool interface */}
            <AdPlacement zone="toolTop" className="mb-6 tool-inline-ad" />
            
            {/* The actual tool component */}
            {children}

            {/* Inline ad below the tool interface */}
            <div className="mt-8">
              <AdPlacement zone="toolBottom" className="tool-inline-ad" />
            </div>
          </article>
          
          <aside className="tool-sidebar">
            <AdPlacement zone="sidebar" className="sidebar-ad" />

            <section className="sidebar-card card">

              <h4>How to use</h4>
              <ol className="usage-steps">
                <li>Paste or type your content in the input area.</li>
                <li>Wait for the tool to process or click an action button.</li>
                <li>Copy the result or download it as needed.</li>
              </ol>
            </section>
            
            {/* Ad before related tools section */}
            <AdPlacement zone="inline" className="sidebar-ad mt-6 mb-4" />

            <section className="sidebar-card card">
              <h4>Related Tools</h4>
              <ul className="related-list">
                <li><a href="/tools/word-counter">Word Counter</a></li>
                <li><a href="/tools/case-converter">Case Converter</a></li>
                <li><a href="/tools/qr-code-generator">QR Code Generator</a></li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>

  )
}

export default ToolTemplate

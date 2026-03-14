import React, { useState } from 'react'
import ToolCard from '../components/ToolCard/ToolCard'
import SearchBar from '../components/SearchBar/SearchBar'
import { tools, categories } from '../data/tools'
import './Tools.css'

const Tools = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="tools-page">
      <section className="tools-hero" aria-labelledby="tools-title">
        <div className="container">
          <h1 id="tools-title" className="section-title">All Tools</h1>
          <p className="section-subtitle">
            Browse our full collection of tools. Free, fast, and secure.
          </p>
          
          <div className="tools-search-container">
            <SearchBar onSearch={(query) => setSearchQuery(query)} />
          </div>

          <div className="category-filter" role="tablist">
            {categories.map(cat => (
              <button 
                key={cat.name} 
                className={`filter-btn ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.name)}
                role="tab"
                aria-selected={activeCategory === cat.name}
              >
                <span className="filter-icon" aria-hidden="true">{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="tools-list-section" aria-label="Tool Grid">
        <div className="container">
          {filteredTools.length > 0 ? (
            <div className="grid">
              {filteredTools.map((tool, index) => (
                <ToolCard key={index} {...tool} />
              ))}
            </div>
          ) : (
            <div className="empty-state card">
              <div className="empty-icon" aria-hidden="true">🔍</div>
              <h3>No tools found in this category</h3>
              <p>We're constantly adding new tools. Check back later!</p>
              <button 
                className="btn btn-outline" 
                onClick={() => setActiveCategory('All')}
                style={{ marginTop: '1.5rem' }}
              >
                View All Tools
              </button>
            </div>
          )}
        </div>
      </section>
    </main>

  )
}

export default Tools

import React from 'react'
import './ToolCard.css'

const ToolCard = ({ title, description, category, icon, link }) => {
  return (
    <a href={link} className="tool-card card">
      <div className="tool-card-category">{category}</div>
      <div className="tool-card-icon">{icon}</div>
      <h3 className="tool-card-title">{title}</h3>
      <p className="tool-card-desc">{description}</p>
      <div className="tool-card-action">
        Open Tool <span className="arrow">→</span>
      </div>
    </a>
  )
}

export default ToolCard

import React from 'react'
import './SearchBar.css'

const SearchBar = ({ placeholder = "Search for tools...", onSearch }) => {
  return (
    <div className="search-bar-container">
      <div className="search-icon">🔍</div>
      <input 
        type="text" 
        className="search-input" 
        placeholder={placeholder}
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
      <button className="search-button">Search</button>
    </div>
  )
}

export default SearchBar

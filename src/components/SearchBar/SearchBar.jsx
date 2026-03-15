import React from 'react'
import './SearchBar.css'

const SearchBar = ({ placeholder = "Search for tools...", onSearch }) => {
  return (
    <form className="search-bar-container" onSubmit={(e) => e.preventDefault()}>
      <div className="search-icon">🔍</div>
      <input 
        type="text" 
        className="search-input" 
        placeholder={placeholder}
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  )
}

export default SearchBar

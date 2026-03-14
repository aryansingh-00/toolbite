import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import './Header/Header.css'

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout

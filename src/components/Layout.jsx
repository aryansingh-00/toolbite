import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import AdPlacement from './AdPlacement'
import './Header/Header.css'

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <div className="footer-ad-wrapper">
        <AdPlacement zone="footer" />
      </div>
      <Footer />
    </div>
  )
}

export default Layout

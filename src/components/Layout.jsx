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
      <div className="container px-4 mt-8 mb-4 flex justify-center w-full">
        <AdPlacement zone="footer" className="w-full max-w-5xl" />
      </div>
      <Footer />
    </div>
  )
}

export default Layout

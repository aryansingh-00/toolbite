import React from 'react'
import './Legal.css'

const PolicyLayout = ({ title, lastUpdated, children }) => {
  return (
    <main className="policy-page">
      <div className="container policy-container">
        <header className="policy-header">
          <h1 className="policy-title">{title}</h1>
          <p className="policy-meta">Last Updated: {lastUpdated}</p>
        </header>
        <div className="policy-content">
          {children}
        </div>
        <footer className="policy-footer">
          <p>If you have any questions about these documents, please contact us at <strong>support@toolbite.com</strong></p>
        </footer>
      </div>
    </main>
  )
}

export const PrivacyPolicy = () => (
  <PolicyLayout title="Privacy Policy" lastUpdated="March 14, 2026">
    <section>
      <h2>1. Introduction</h2>
      <p>At ToolBite, your privacy is our top priority. This Privacy Policy outlines how we collect, use, and protect your information when you use our website and services.</p>
    </section>

    <section>
      <h2>2. Data Collection & Usage</h2>
      <p>ToolBite is designed to be a privacy-first platform. For the majority of our tools:</p>
      <ul>
        <li><strong>Local Processing:</strong> All data you input (text, URLs, files) is processed locally in your browser. We do not transmit or store this data on our servers.</li>
        <li><strong>No Personal Data Required:</strong> You can use all of our tools without creating an account or providing any personal identification.</li>
      </ul>
    </section>

    <section>
      <h2>3. Analytics & Cookies</h2>
      <p>To improve our service, we may use basic analytics and cookies in the future:</p>
      <ul>
        <li><strong>Analytics:</strong> We may use anonymous analytics services to understand how users interact with our platform. This data is aggregated and does not identify individual users.</li>
        <li><strong>Cookies:</strong> We may use essential cookies to remember your preferences (such as dark mode) and to ensure the security of our site.</li>
      </ul>
    </section>

    <section>
      <h2>4. Third-Party Services</h2>
      <p>We may occasionally use third-party services (such as APIs for QR generation or font hosting). These services have their own privacy policies. We encourage you to review them.</p>
    </section>
  </PolicyLayout>
)

export const TermsOfService = () => (
  <PolicyLayout title="Terms of Service" lastUpdated="March 14, 2026">
    <section>
      <h2>1. Agreement to Terms</h2>
      <p>By accessing or using ToolBite, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.</p>
    </section>

    <section>
      <h2>2. Acceptable Use</h2>
      <p>You agree to use ToolBite only for lawful purposes. You are prohibited from:</p>
      <ul>
        <li>Using the tools to generate or distribute malicious content.</li>
        <li>Attempting to disrupt or compromise the security of our platform.</li>
        <li>Automated scraping or mass-collection of tool outputs without permission.</li>
      </ul>
    </section>

    <section>
      <h2>3. Disclaimer of Warranty</h2>
      <p>ToolBite is provided on an "AS IS" and "AS AVAILABLE" basis. We do not guarantee that the service will be uninterrupted, timely, secure, or error-free.</p>
    </section>

    <section>
      <h2>4. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, ToolBite shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.</p>
    </section>
  </PolicyLayout>
)


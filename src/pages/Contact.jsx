import React, { useState } from 'react'
import Button from '../components/Button/Button'
import './Contact.css'

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="container">
          <h1 id="contact-title" className="section-title">Get in touch</h1>
          <p className="section-subtitle">
            Have a tool suggestion? Found a bug? Or just want to say hi? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card card">
                <div className="info-icon">📧</div>
                <div>
                  <h4>Email Us</h4>
                  <p>hello@toolbite.com</p>
                </div>
              </div>
              <div className="info-card card">
                <div className="info-icon">🐦</div>
                <div>
                  <h4>Follow Us</h4>
                  <p>@toolbite on Twitter</p>
                </div>
              </div>
              <div className="info-card card">
                <div className="info-icon">🛠️</div>
                <div>
                  <h4>Suggestions</h4>
                  <p>Suggest tools on our GitHub repository</p>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container card">
              {submitted ? (
                <div className="success-state">
                  <div className="success-icon">✅</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We've received your message and will get back to you soon.</p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" placeholder="John Doe" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" required>
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="suggestion">Tool Suggestion</option>
                      <option value="bug">Bug Report</option>
                      <option value="business">Business Partnership</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" rows="6" placeholder="How can we help?" required></textarea>
                  </div>
                  <Button type="submit" size="lg">Send Message</Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact

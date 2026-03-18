import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import Button from '../components/Button/Button'
import './Contact.css'

const Contact = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Get your EmailJS credentials from .env
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if keys are set
    if (!serviceId || serviceId === 'your_service_id' || !publicKey || publicKey === 'your_public_key') {
      console.error('EmailJS not properly configured in .env');
      setError('Email service is not configured correctly. Please check your .env file and restart the server.');
      setLoading(false);
      return;
    }

    // Initialize with public key
    emailjs.init(publicKey);

    emailjs.sendForm(
      serviceId,
      templateId,
      form.current
    )
    .then((result) => {
      console.log('Email sent successfully:', result.text);
      setSubmitted(true);
      setLoading(false);
    }, (err) => {
      console.error('Email sending failed detailed error:', err);
      setError(`Failed to send message: ${err.text || 'Unknown error'}. Please try again later.`);
      setLoading(false);
    });
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
                  <p><a href="mailto:hello.toolbite@gmail.com" className="contact-link">hello.toolbite@gmail.com</a></p>
                </div>
              </div>
              <div className="info-card card">
                <div className="info-icon">🐦</div>
                <div>
                  <h4>Follow Us</h4>
                  <p><a href="https://www.instagram.com/hello.toolbite" target="_blank" rel="noopener noreferrer" className="contact-link">@hello.toolbite</a></p>
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
                <form className="contact-form" ref={form} onSubmit={handleSubmit}>
                  {error && <div className="error-message" style={{ color: '#ff4d4d', marginBottom: '1rem', fontWeight: '500' }}>{error}</div>}
                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" name="from_name" placeholder="John Doe" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="from_email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" name="subject" required>
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="suggestion">Tool Suggestion</option>
                      <option value="bug">Bug Report</option>
                      <option value="business">Business Partnership</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="6" placeholder="How can we help?" required></textarea>
                  </div>
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
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

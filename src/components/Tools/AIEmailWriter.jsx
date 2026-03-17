import React, { useState } from 'react';
import Button from '../Button/Button';
import Skeleton from '../Skeleton/Skeleton';
import { generateEmail } from '../../utils/ai';
import './AITools.css';

// Simple session cache
const cache = new Map();

const AIEmailWriter = () => {
  const [purpose, setPurpose] = useState('');
  const [tone, setTone] = useState('Professional');
  const [recipient, setRecipient] = useState('');
  
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const MAX_CHARS = 500;

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    
    if (!purpose.trim()) {
      setError('Please provide the purpose of the email.');
      return;
    }

    // Check cache
    const cacheKey = `${purpose}-${tone}-${recipient}`;
    if (cache.has(cacheKey)) {
      setOutput(cache.get(cacheKey));
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');
    setOutput('');
    setCopied(false);

    try {
      const result = await generateEmail(purpose, tone, recipient);
      setOutput(result);
      cache.set(cacheKey, result);
    } catch (err) {
      setError(err.message || 'Failed to generate email. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setPurpose('');
    setRecipient('');
    setTone('Professional');
    setOutput('');
    setError('');
  };

  const applyExample = (ex) => {
    setPurpose(ex.purpose);
    setTone(ex.tone);
    setRecipient(ex.recipient);
    // Scroll to top of tool
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const examples = [
    {
      title: 'Job Interview Follow-up',
      purpose: 'Following up on a job interview I had last Tuesday for the Software Engineer position. I am still interested and enjoyed meeting the team.',
      tone: 'Professional',
      recipient: 'Hiring Manager'
    },
    {
      title: 'Meeting Reschedule',
      purpose: 'Need to reschedule our sync tomorrow because of a personal emergency. Suggest moving it to Friday at 10 AM.',
      tone: 'Friendly',
      recipient: 'Project Team'
    },
    {
      title: 'Cold Outreach',
      purpose: 'Introducing our new AI design services. We help startups automate their UI/UX workflow.',
      tone: 'Persuasive',
      recipient: 'Marketing Director'
    }
  ];

  return (
    <div className="ai-tool-container">
      <div className="ai-layout">
        <div className="ai-input-section card">
          <h3 className="section-heading">Email Details</h3>
          <form onSubmit={handleGenerate} className="ai-form">
            <div className="form-group">
              <label htmlFor="recipient">Recipient (Optional)</label>
              <input
                id="recipient"
                type="text"
                placeholder="e.g. Hiring Manager, John Doe, Marketing Team"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tone">Tone</label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                disabled={isLoading}
              >
                <option value="Professional">Professional</option>
                <option value="Formal">Formal</option>
                <option value="Casual">Casual</option>
                <option value="Friendly">Friendly</option>
                <option value="Persuasive">Persuasive</option>
                <option value="Apologetic">Apologetic</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="purpose">Purpose / Goal*</label>
              <textarea
                id="purpose"
                placeholder="What exactly should this email say? e.g. Following up on a job interview I had last Tuesday."
                value={purpose}
                onChange={(e) => setPurpose(e.target.value.substring(0, MAX_CHARS))}
                required
                rows={5}
                disabled={isLoading}
              />
              <span className={`char-counter ${purpose.length >= MAX_CHARS ? 'limit-reached' : ''}`}>
                {purpose.length}/{MAX_CHARS}
              </span>
            </div>

            <div className="ai-actions">
              <Button type="button" variant="outline" onClick={handleClear} disabled={isLoading}>
                Clear
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading || !purpose.trim()}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span> Generating...
                  </>
                ) : (
                  'Generate Email ✨'
                )}
              </Button>
            </div>
            
            {error && (
              <div className="ai-error-message">
                {error}
                <div className="retry-button">
                  <Button size="sm" variant="outline" onClick={handleGenerate}>Retry</Button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="ai-output-section card">
          <div className="output-header">
            <h3 className="section-heading">Generated Result</h3>
            {output && (
              <Button size="sm" variant="secondary" onClick={handleCopy}>
                {copied ? 'Copied! ✓' : 'Copy Text'}
              </Button>
            )}
          </div>
          
          <div className={`ai-output-container ${!output && !isLoading ? 'empty' : ''}`}>
            {isLoading ? (
              <div className="ai-output-content">
                <Skeleton lines={8} />
                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
                  AI is writing your email...
                </p>
              </div>
            ) : output ? (
              <div className="output-preview">{output}</div>
            ) : (
              <div className="placeholder-state">
                <span className="placeholder-icon">✉️</span>
                <p>Fill out the details on the left and click Generate to see your AI-written email here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ai-guide-section">
        <div className="guide-card card">
          <h3>How to use</h3>
          <ul>
            <li><strong>Recipient:</strong> Tell the AI who you are writing to for better context.</li>
            <li><strong>Tone:</strong> Choose a tone that fits your relationship with the recipient.</li>
            <li><strong>Goal:</strong> Be specific about what you want to achieve (e.g., "Schedule a meeting" or "Ask for a refund").</li>
            <li><strong>Refine:</strong> If the result isn't perfect, tweak your prompt and hit Generate again.</li>
          </ul>
        </div>
        <div className="guide-card card">
          <h3>Try these examples</h3>
          <div className="examples-grid">
            {examples.map((ex, i) => (
              <div key={i} className="example-card" onClick={() => applyExample(ex)}>
                <strong>{ex.title}</strong>
                <p>{ex.purpose.substring(0, 80)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEmailWriter;

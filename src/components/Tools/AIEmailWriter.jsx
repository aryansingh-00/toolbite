import React, { useState } from 'react';
import Button from '../Button/Button';
import { generateEmail } from '../../utils/ai';
import './AITools.css';

const AIEmailWriter = () => {
  const [purpose, setPurpose] = useState('');
  const [tone, setTone] = useState('Professional');
  const [recipient, setRecipient] = useState('');
  
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!purpose.trim()) {
      setError('Please provide the purpose of the email.');
      return;
    }

    setIsLoading(true);
    setError('');
    setOutput('');
    setCopied(false);

    try {
      const result = await generateEmail(purpose, tone, recipient);
      setOutput(result);
    } catch (err) {
      setError(err.message || 'Failed to generate email. Please check your API key.');
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
                onChange={(e) => setPurpose(e.target.value)}
                required
                rows={5}
                disabled={isLoading}
              />
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
            
            {error && <div className="ai-error-message">{error}</div>}
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
          
          <div className={`ai-output-container ${!output ? 'empty' : ''}`}>
            {isLoading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>AI is writing your email...</p>
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
    </div>
  );
};

export default AIEmailWriter;

import React, { useState } from 'react';
import Button from '../Button/Button';
import Skeleton from '../Skeleton/Skeleton';
import { rewriteParagraph } from '../../utils/ai';
import './AITools.css';

const cache = new Map();

const AIParagraphRewriter = () => {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const MAX_CHARS = 2000;

  const handleRewrite = async (e) => {
    if (e) e.preventDefault();
    if (!text.trim()) {
      setError('Please provide some text to rewrite.');
      return;
    }

    if (cache.has(text.trim())) {
      setOutput(cache.get(text.trim()));
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');
    setOutput('');
    setCopied(false);

    try {
      const result = await rewriteParagraph(text);
      setOutput(result);
      cache.set(text.trim(), result);
    } catch (err) {
      setError(err.message || 'Failed to rewrite text. Please check your connection.');
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
    setText('');
    setOutput('');
    setError('');
  };

  const examples = [
    {
      title: 'Improve Professionalism',
      text: "I want to say that I can't come to the meeting because I have some other stuff to do but I will look at the notes later on."
    },
    {
      title: 'Fix Grammar & Flow',
      text: "The product was very good and we liked it a lot but the price was bit high so we thinking about if we should buy it or not."
    },
    {
      title: 'Concise Summary',
      text: "In my opinion, it seems that there are many different factors that we need to take into consideration before we can make a final decision about which direction we want to go in for this particular project."
    }
  ];

  const applyExample = (ex) => {
    setText(ex.text);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="ai-tool-container">
      <div className="ai-layout">
        <div className="ai-input-section card">
          <h3 className="section-heading">Original Text</h3>
          <form onSubmit={handleRewrite} className="ai-form">
            <div className="form-group">
              <label htmlFor="text">Text to Rewrite*</label>
              <textarea
                id="text"
                placeholder="Paste your paragraph here..."
                value={text}
                onChange={(e) => setText(e.target.value.substring(0, MAX_CHARS))}
                required
                rows={10}
                disabled={isLoading}
              />
              <span className="char-counter">{text.length}/{MAX_CHARS}</span>
            </div>

            <div className="ai-actions">
              <Button type="button" variant="outline" onClick={handleClear} disabled={isLoading}>
                Clear
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading || !text.trim()}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span> Rewriting...
                  </>
                ) : (
                  'Improve Text ✨'
                )}
              </Button>
            </div>
            
            {error && (
              <div className="ai-error-message">
                {error}
                <div className="retry-button">
                  <Button size="sm" variant="outline" onClick={handleRewrite}>Retry</Button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="ai-output-section card">
          <div className="output-header">
            <h3 className="section-heading">Rewritten Text</h3>
            {output && (
              <Button size="sm" variant="secondary" onClick={handleCopy}>
                {copied ? 'Copied! ✓' : 'Copy Text'}
              </Button>
            )}
          </div>
          
          <div className={`ai-output-container ${!output && !isLoading ? 'empty' : ''}`}>
            {isLoading ? (
              <div className="ai-output-content">
                <Skeleton lines={10} />
                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
                  AI is polishing your writing...
                </p>
              </div>
            ) : output ? (
              <div className="output-preview">{output}</div>
            ) : (
              <div className="placeholder-state">
                <span className="placeholder-icon">✨</span>
                <p>Paste a paragraph or a few sentences on the left to see them rewritten for better clarity and flow.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ai-guide-section">
        <div className="guide-card card">
          <h3>When to use</h3>
          <ul>
            <li><strong>Polishing Emails:</strong> Turn rough notes into professional messages.</li>
            <li><strong>Simplifying:</strong> Break down complex sentences into clear, readable ones.</li>
            <li><strong>Grammar Fix:</strong> Instantly fix grammatical errors and awkward phrasing.</li>
            <li><strong>Tone Adjustment:</strong> Improve the overall sophistication of your writing.</li>
          </ul>
        </div>
        <div className="guide-card card">
          <h3>Try an example</h3>
          <div className="examples-grid">
            {examples.map((ex, i) => (
              <div key={i} className="example-card" onClick={() => applyExample(ex)}>
                <strong>{ex.title}</strong>
                <p>{ex.text.substring(0, 80)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIParagraphRewriter;

import React, { useState } from 'react';
import Button from '../Button/Button';
import { rewriteParagraph } from '../../utils/ai';
import './AITools.css';

const AIParagraphRewriter = () => {
  const [text, setText] = useState('');
  
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please provide some text to rewrite.');
      return;
    }

    setIsLoading(true);
    setError('');
    setOutput('');
    setCopied(false);

    try {
      const result = await rewriteParagraph(text);
      setOutput(result);
    } catch (err) {
      setError(err.message || 'Failed to rewrite text. Please check your API key.');
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

  return (
    <div className="ai-tool-container">
      <div className="ai-layout">
        <div className="ai-input-section card">
          <h3 className="section-heading">Original Text</h3>
          <form onSubmit={handleGenerate} className="ai-form">
            <div className="form-group">
              <label htmlFor="text" className="sr-only">Text to Rewrite</label>
              <textarea
                id="text"
                placeholder="Paste the paragraph or sentence you want to rewrite here... The AI will improve flow, grammar, and professionalism."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                rows={12}
                disabled={isLoading}
              />
            </div>

            <div className="ai-actions mt-4">
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
            
            {error && <div className="ai-error-message mt-4">{error}</div>}
          </form>
        </div>

        <div className="ai-output-section card">
          <div className="output-header">
            <h3 className="section-heading">Rewritten Result</h3>
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
                <p>AI is polishing your text...</p>
              </div>
            ) : output ? (
              <div className="output-preview">{output}</div>
            ) : (
              <div className="placeholder-state">
                <span className="placeholder-icon">✨</span>
                <p>Paste text on the left and click "Improve Text" to get a professionally rewritten version.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIParagraphRewriter;

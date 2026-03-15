import React, { useState } from 'react';
import './JSONFormatter.css';

const JSONFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(null);

  const processJSON = (mode) => {
    if (!input.trim()) {
      setError('Please enter some JSON data.');
      setIsValid(false);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setIsValid(true);
      setError('');

      if (mode === 'format') {
        setOutput(JSON.stringify(parsed, null, 2));
      } else if (mode === 'minify') {
        setOutput(JSON.stringify(parsed));
      } else if (mode === 'validate') {
        setOutput(JSON.stringify(parsed, null, 2));
      }
    } catch (err) {
      setIsValid(false);
      setError(`Invalid JSON: ${err.message}`);
      setOutput('');
    }
  };

  const [isCopied, setIsCopied] = useState(false);
  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setIsValid(null);
    setIsCopied(false);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="json-formatter-tool">
      <div className="json-tool-grid">
        <div className="json-input-section">
          <div className="section-label">
            <span>Input JSON</span>
            {isValid !== null && (
              <span className={`status-badge ${isValid ? 'valid' : 'invalid'}`}>
                {isValid ? 'Valid' : 'Invalid'}
              </span>
            )}
          </div>
          <textarea
            className="json-textarea"
            placeholder="Paste your JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>

        <div className="json-output-section">
          <div className="section-label">
            <span>Output</span>
            {output && (
              <button className="btn btn-sm btn-outline" onClick={handleCopy} style={{ padding: '2px 8px', fontSize: '0.75rem' }}>
                {isCopied ? '✓ Copied!' : 'Copy Output'}
              </button>
            )}
          </div>
          <div className={`json-pre-container ${error ? 'error' : ''} ${!output && !error ? 'placeholder' : ''}`}>
            {output ? (
              <pre>{output}</pre>
            ) : error ? (
              <div className="error-content">
                <strong>Error:</strong>
                <p>{error}</p>
              </div>
            ) : (
              "Formatted output will appear here..."
            )}
          </div>
        </div>
      </div>

      <div className="tool-actions">
        <button className="btn btn-primary" onClick={() => processJSON('format')}>Format JSON</button>
        <button className="btn btn-secondary" onClick={() => processJSON('minify')}>Minify JSON</button>
        <button className="btn btn-outline" onClick={() => processJSON('validate')}>Validate JSON</button>
        <button className="btn btn-danger" onClick={handleClear} style={{ marginLeft: 'auto' }}>Clear</button>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default JSONFormatter;

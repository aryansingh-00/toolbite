import React, { useState } from 'react';
import Button from '../Button/Button';
import { generateBlog } from '../../utils/ai';
import './AITools.css';

const AIBlogGenerator = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [length, setLength] = useState('medium');
  
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please provide a topic for the blog post.');
      return;
    }

    setIsLoading(true);
    setError('');
    setOutput('');
    setCopied(false);

    try {
      const result = await generateBlog(topic, keywords, length);
      setOutput(result);
    } catch (err) {
      setError(err.message || 'Failed to generate blog post. Please check your API key.');
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
    setTopic('');
    setKeywords('');
    setLength('medium');
    setOutput('');
    setError('');
  };

  return (
    <div className="ai-tool-container">
      <div className="ai-layout">
        <div className="ai-input-section card">
          <h3 className="section-heading">Blog Details</h3>
          <form onSubmit={handleGenerate} className="ai-form">
            <div className="form-group">
              <label htmlFor="topic">Topic / Title*</label>
              <input
                id="topic"
                type="text"
                placeholder="e.g. 10 Tips for Remote Work Productivity"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="keywords">Keywords / Focus Areas (Optional)</label>
              <input
                id="keywords"
                type="text"
                placeholder="e.g. time management, focus, work from home"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="length">Estimated Length</label>
              <select
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                disabled={isLoading}
              >
                <option value="short">Short (300-400 words)</option>
                <option value="medium">Medium (600-800 words)</option>
                <option value="long">Long (1000+ words)</option>
              </select>
            </div>

            <div className="ai-actions">
              <Button type="button" variant="outline" onClick={handleClear} disabled={isLoading}>
                Clear
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading || !topic.trim()}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span> Generating...
                  </>
                ) : (
                  'Write Blog ✨'
                )}
              </Button>
            </div>
            
            {error && <div className="ai-error-message">{error}</div>}
          </form>
        </div>

        <div className="ai-output-section card">
          <div className="output-header">
            <h3 className="section-heading">Generated Article</h3>
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
                <p>AI is writing your article...</p>
              </div>
            ) : output ? (
              <div className="output-preview markdown-content">{output}</div>
            ) : (
              <div className="placeholder-state">
                <span className="placeholder-icon">✍️</span>
                <p>Define your topic and keywords to let AI write a full, SEO-optimized blog article for you.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBlogGenerator;

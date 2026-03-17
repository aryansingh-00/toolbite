import React, { useState } from 'react';
import Button from '../Button/Button';
import Skeleton from '../Skeleton/Skeleton';
import { generateBlog } from '../../utils/ai';
import './AITools.css';

const cache = new Map();

const AIBlogGenerator = () => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [length, setLength] = useState('medium');
  
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const MAX_TOPIC_CHARS = 200;
  const MAX_KEYWORD_CHARS = 150;

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    
    if (!topic.trim()) {
      setError('Please provide a topic for the blog post.');
      return;
    }

    const cacheKey = `${topic}-${keywords}-${length}`;
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
      const result = await generateBlog(topic, keywords, length);
      setOutput(result);
      cache.set(cacheKey, result);
    } catch (err) {
      setError(err.message || 'Failed to generate blog post. Please check your internet connection.');
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

  const examples = [
    {
      title: 'Remote Work Tips',
      topic: '10 Proven Tips for Remote Work Productivity in 2024',
      keywords: 'time management, focus, work from home tools, routines',
      length: 'medium'
    },
    {
      title: 'Healthy Breakfasts',
      topic: 'Quick and Healthy Breakfast Ideas for Busy Professionals',
      keywords: 'nutrition, meal prep, energy, morning routine',
      length: 'short'
    },
    {
      title: 'Future of AI',
      topic: 'How Generative AI is Transforming Digital Marketing',
      keywords: 'content automation, SEO, efficiency, future trends',
      length: 'long'
    }
  ];

  const applyExample = (ex) => {
    setTopic(ex.topic);
    setKeywords(ex.keywords);
    setLength(ex.length);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                onChange={(e) => setTopic(e.target.value.substring(0, MAX_TOPIC_CHARS))}
                required
                disabled={isLoading}
              />
              <span className="char-counter">{topic.length}/{MAX_TOPIC_CHARS}</span>
            </div>

            <div className="form-group">
              <label htmlFor="keywords">Keywords / Focus Areas (Optional)</label>
              <input
                id="keywords"
                type="text"
                placeholder="e.g. time management, focus, work from home"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value.substring(0, MAX_KEYWORD_CHARS))}
                disabled={isLoading}
              />
              <span className="char-counter">{keywords.length}/{MAX_KEYWORD_CHARS}</span>
            </div>

            <div className="form-group">
              <label htmlFor="length">Estimated Length</label>
              <select
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                disabled={isLoading}
              >
                <option value="short">Short (~400 words)</option>
                <option value="medium">Medium (~700 words)</option>
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
            <h3 className="section-heading">Generated Article</h3>
            {output && (
              <Button size="sm" variant="secondary" onClick={handleCopy}>
                {copied ? 'Copied! ✓' : 'Copy Text'}
              </Button>
            )}
          </div>
          
          <div className={`ai-output-container ${!output && !isLoading ? 'empty' : ''}`}>
            {isLoading ? (
              <div className="ai-output-content">
                <Skeleton lines={12} />
                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>
                  AI is crafting your SEO-friendly article...
                </p>
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

      <div className="ai-guide-section">
        <div className="guide-card card">
          <h3>How to use</h3>
          <ul>
            <li><strong>Topic:</strong> Start with a clear, descriptive title or subject.</li>
            <li><strong>Keywords:</strong> List 3-5 keywords you want the AI to include naturally.</li>
            <li><strong>Length:</strong> Choose 'Short' for quick updates and 'Long' for deep dives.</li>
            <li><strong>Formatting:</strong> The result is in Markdown, making it easy to copy to most CMS platforms like WordPress or Medium.</li>
          </ul>
        </div>
        <div className="guide-card card">
          <h3>Example Topics</h3>
          <div className="examples-grid">
            {examples.map((ex, i) => (
              <div key={i} className="example-card" onClick={() => applyExample(ex)}>
                <strong>{ex.title}</strong>
                <p>{ex.topic}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBlogGenerator;

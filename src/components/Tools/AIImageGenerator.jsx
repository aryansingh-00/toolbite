import React, { useState } from 'react';
import Button from '../Button/Button';
import Skeleton from '../Skeleton/Skeleton';
import { generateImage } from '../../utils/imageAI';
import './AITools.css';
import './AIImageTools.css';

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('vivid');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const MAX_PROMPT_CHARS = 400;

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) {
      setError('Please provide a prompt for the image.');
      return;
    }

    if (isLoading) return; // Prevent multiple clicks

    setIsLoading(true);
    setError('');
    setOutput('');

    try {
      const finalPrompt = style === 'none' ? prompt : `${prompt}, ${style} style`;
      const result = await generateImage(finalPrompt);
      setOutput(result);
    } catch (err) {
      setError(err.message || 'Failed to generate image. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setOutput('');
    setError('');
  };

  const handleDownload = async () => {
    if (!output) return;
    try {
      const resp = await fetch(output);
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      window.open(output, '_blank');
    }
  };

  const examples = [
    {
      title: 'Futuristic City',
      prompt: 'A futuristic city with flying cars, neon lights, and towering skyscrapers at sunset.',
      style: 'cinematic'
    },
    {
      title: 'Cyberpunk Samurai',
      prompt: 'A high-tech samurai standing in a rainy cyberpunk street with glowing katanas.',
      style: 'digital art'
    },
    {
      title: 'Cozy Cabin',
      prompt: 'A small cozy wooden cabin in the snowy mountains with smoke coming from the chimney.',
      style: 'vivid'
    }
  ];

  const applyExample = (ex) => {
    setPrompt(ex.prompt);
    setStyle(ex.style);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="ai-tool-container">
      <div className="ai-layout">
        <div className="ai-input-section card">
          <h3 className="section-heading">Image Details</h3>
          <form onSubmit={handleGenerate} className="ai-form">
            <div className="form-group">
              <label htmlFor="prompt">Image Prompt*</label>
              <textarea
                id="prompt"
                placeholder="A futuristic city with flying cars at sunset..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value.substring(0, MAX_PROMPT_CHARS))}
                required
                disabled={isLoading}
                rows={5}
              />
              <span className="char-counter">{prompt.length}/{MAX_PROMPT_CHARS}</span>
            </div>

            <div className="form-group">
              <label htmlFor="style">Style Guidance</label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                disabled={isLoading}
              >
                <option value="none">None (Let AI Decide)</option>
                <option value="vivid">Vivid & Realistic</option>
                <option value="cinematic">Cinematic</option>
                <option value="digital art">Digital Art</option>
                <option value="oil painting">Oil Painting</option>
                <option value="anime">Anime</option>
              </select>
            </div>

            <div className="ai-actions">
              <Button type="button" variant="outline" onClick={handleClear} disabled={isLoading}>
                Clear
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading || !prompt.trim()}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span> Generating...
                  </>
                ) : (
                  'Generate Image 🎨'
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
            <h3 className="section-heading">Generated Image</h3>
            {output && (
              <Button size="sm" variant="secondary" onClick={handleDownload} disabled={isLoading}>
                Download PNG
              </Button>
            )}
          </div>
          
          <div className={`ai-output-container ${!output && !isLoading ? 'empty' : ''}`}>
            {isLoading ? (
              <div className="loading-state-overlay">
                <Skeleton type="image" />
                <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-tertiary)', fontWeight: '500' }}>
                  AI is painting your masterpiece...
                </p>
              </div>
            ) : output ? (
              <div className="image-preview-container">
                <img src={output} alt="Generated AI artwork" />
              </div>
            ) : (
              <div className="placeholder-state">
                <span className="placeholder-icon">🖼️</span>
                <p>Describe what you want to see, and AI will generate a beautiful image for you.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ai-guide-section">
        <div className="guide-card card">
          <h3>Pro Tips for Better Images</h3>
          <ul>
            <li><strong>Be Descriptive:</strong> Use adjectives like "vibrant", "moody", "detailed", or "minimalist".</li>
            <li><strong>Lighting Matters:</strong> Mention the time of day or lighting style (e.g., "golden hour", "neon lights", "soft studio lighting").</li>
            <li><strong>Artistic Styles:</strong> Specify a medium like "oil painting", "pencil sketch", or "3D render".</li>
            <li><strong>Composition:</strong> Mention perspectives like "wide angle", "close up", or "aerial view".</li>
          </ul>
        </div>
        <div className="guide-card card">
          <h3>Inspiration Gallery</h3>
          <div className="examples-grid">
            {examples.map((ex, i) => (
              <div key={i} className="example-card" onClick={() => applyExample(ex)}>
                <strong>{ex.title}</strong>
                <p>{ex.prompt.substring(0, 80)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImageGenerator;

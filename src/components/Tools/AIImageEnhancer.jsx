import React, { useState, useRef } from 'react';
import Button from '../Button/Button';
import Skeleton from '../Skeleton/Skeleton';
import { enhanceImage } from '../../utils/imageAI';
import './AITools.css';
import './AIImageTools.css';

const AIImageEnhancer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setOutput('');
      setError('');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleEnhance = async (e) => {
    if (e) e.preventDefault();
    if (!selectedFile) {
      setError('Please upload an image first.');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    setError('');
    setOutput('');

    try {
      const resultUrl = await enhanceImage(selectedFile);
      setOutput(resultUrl);
    } catch (err) {
      setError(err.message || 'Failed to enhance image. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setOutput('');
    setError('');
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleDownload = async () => {
    if (!output) return;
    try {
      const resp = await fetch(output);
      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `enhanced-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      window.open(output, '_blank');
    }
  };

  return (
    <div className="ai-tool-container">
      <div className="ai-layout">
        <div className="ai-input-section card">
          <h3 className="section-heading">Upload Image</h3>
          
          {!selectedFile ? (
            <div className="file-upload-zone" onClick={triggerFileInput}>
              <span className="upload-icon">📤</span>
              <p>Click to browse or drop an image</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/webp,image/jpg"
                className="file-input-hidden"
              />
            </div>
          ) : (
            <div className="form-group" style={{textAlign: 'center'}}>
                <img src={previewUrl} alt="Original uploaded image" className="preview-image-thumbnail" />
                <div className="replace-image-btn">
                     <Button type="button" variant="outline" size="sm" onClick={triggerFileInput} disabled={isLoading}>
                         Replace Image
                     </Button>
                     <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        className="file-input-hidden"
                     />
                </div>
            </div>
          )}

          <div className="ai-actions" style={{marginTop: '2rem'}}>
            <Button type="button" variant="outline" onClick={handleClear} disabled={isLoading || !selectedFile}>
              Clear
            </Button>
            <Button type="button" variant="primary" onClick={handleEnhance} disabled={isLoading || !selectedFile}>
              {isLoading ? (
                <>
                  <span className="spinner"></span> Enhancing...
                </>
              ) : (
                'Enhance Quality ✨'
              )}
            </Button>
          </div>
          
          {error && (
            <div className="ai-error-message" style={{ marginTop: '1.5rem' }}>
              {error}
              <div className="retry-button">
                <Button size="sm" variant="outline" onClick={handleEnhance}>Retry</Button>
              </div>
            </div>
          )}
        </div>

        <div className="ai-output-section card">
          <div className="output-header">
            <h3 className="section-heading">Enhanced Image</h3>
            {output && (
              <Button size="sm" variant="secondary" onClick={handleDownload} disabled={isLoading}>
                Download Image
              </Button>
            )}
          </div>
          
          <div className={`ai-output-container ${!output && !isLoading ? 'empty' : ''}`}>
            {isLoading ? (
              <div className="loading-state-overlay">
                <Skeleton type="image" />
                <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-tertiary)', fontWeight: '500' }}>
                  AI is upscaling and enhancing your image...
                </p>
              </div>
            ) : output ? (
              <div className="image-preview-container">
                <img src={output} alt="Enhanced" />
              </div>
            ) : (
              <div className="placeholder-state">
                <span className="placeholder-icon">🪄</span>
                <p>Upload a low-quality or blurry image to see AI magically enhance it.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ai-guide-section">
        <div className="guide-card card">
          <h3>Why use this tool?</h3>
          <ul>
            <li><strong>Upscaling:</strong> Increase the resolution of small images without losing clarity.</li>
            <li><strong>Sharpening:</strong> Fix blurry photos by enhancing edges and details.</li>
            <li><strong>Noise Reduction:</strong> Clean up grainy photos for a smoother look.</li>
            <li><strong>Face Restoration:</strong> Specifically tuned to improve facial details in low-res photos.</li>
          </ul>
        </div>
        <div className="guide-card card">
          <h3>How to get best results</h3>
          <ul>
            <li><strong>Original Quality:</strong> Avoid extremely pixelated images; the tool works best on "decent" but soft photos.</li>
            <li><strong>File Size:</strong> Keep uploads under 5MB for the fastest processing times.</li>
            <li><strong>Format:</strong> High-quality JPEGs or PNGs are recommended.</li>
            <li><strong>Retry:</strong> If the result isn't perfect, try refreshing and re-uploading.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIImageEnhancer;

import React, { useState, useRef } from 'react';
import Button from '../Button/Button';
import Skeleton from '../Skeleton/Skeleton';
import { removeBackground } from '../../utils/imageAI';
import './AITools.css';
import './AIImageTools.css';

const AIBackgroundRemover = () => {
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
        setError('Please upload a valid image file (JPG, PNG, WEBP).');
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

  const handleRemoveBg = async (e) => {
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
      const resultUrl = await removeBackground(selectedFile);
      setOutput(resultUrl);
    } catch (err) {
      setError(err.message || 'Failed to remove background. Please check your internet connection.');
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

  const handleDownload = () => {
    if (!output) return;
    const a = document.createElement('a');
    a.href = output;
    a.download = `bg-removed-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
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
            <Button type="button" variant="primary" onClick={handleRemoveBg} disabled={isLoading || !selectedFile}>
              {isLoading ? (
                <>
                  <span className="spinner"></span> Processing...
                </>
              ) : (
                'Remove Background ✂️'
              )}
            </Button>
          </div>
          
          {error && (
            <div className="ai-error-message" style={{ marginTop: '1.5rem' }}>
              {error}
              <div className="retry-button">
                <Button size="sm" variant="outline" onClick={handleRemoveBg}>Retry</Button>
              </div>
            </div>
          )}
        </div>

        <div className="ai-output-section card">
          <div className="output-header">
            <h3 className="section-heading">Result Image</h3>
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
                  AI is removing the background...
                </p>
              </div>
            ) : output ? (
              <div className="image-preview-container checkerboard">
                <img src={output} alt="Background removed" />
              </div>
            ) : (
              <div className="placeholder-state">
                <span className="placeholder-icon">🏁</span>
                <p>Upload an image and hit "Remove Background" to see the transparent result here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="ai-guide-section">
        <div className="guide-card card">
          <h3>About this tool</h3>
          <ul>
            <li><strong>Automatic Detection:</strong> Our AI automatically identifies the subject and removes the background in seconds.</li>
            <li><strong>High Quality:</strong> Download clear, transparent PNGs ready for design work or social media.</li>
            <li><strong>Privacy:</strong> Your images are processed securely and not stored permanently on our servers.</li>
            <li><strong>Best Results:</strong> Works best with clear subjects (people, products, animals) and high contrast backgrounds.</li>
          </ul>
        </div>
        <div className="guide-card card">
          <h3>How to use</h3>
          <ul>
            <li><strong>1. Upload:</strong> Drag & drop or click to select a JPG, PNG, or WEBP file.</li>
            <li><strong>2. Process:</strong> Click the "Remove Background" button to start the AI magic.</li>
            <li><strong>3. Preview:</strong> Inspect the resulting transparent image in the preview box.</li>
            <li><strong>4. Save:</strong> Download your transparent PNG instantly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIBackgroundRemover;

import React, { useState, useEffect } from 'react';
import './QRCodeGenerator.css';

const QRCodeGenerator = () => {
  const [input, setInput] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only handle debouncing if input is present
    if (!input.trim()) return;

    const timer = setTimeout(() => {
      setIsLoading(true);
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(input)}`;
      setQrUrl(url);
    }, 500);

    return () => clearTimeout(timer);
  }, [input, setQrUrl, setIsLoading]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    
    // Immediate reset for empty input to improve responsiveness and avoid lint issues
    if (!val.trim()) {
      setQrUrl('');
      setIsLoading(false);
    }
  };

  const [isCopied, setIsCopied] = useState(false);
  const [downloadState, setDownloadState] = useState('idle');

  const handleDownload = async () => {
    if (!qrUrl) return;
    
    setDownloadState('downloading');
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `toolbite-qr-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setDownloadState('success');
      setTimeout(() => setDownloadState('idle'), 2000);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadState('error');
      setTimeout(() => setDownloadState('idle'), 3000);
    }
  };

  const handleCopyInput = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setInput('');
    setQrUrl('');
    setIsLoading(false);
    setIsCopied(false);
    setDownloadState('idle');
  };

  return (
    <div className="qr-generator-tool">
      <div className="qr-layout">
        <div className="qr-input-section">
          <div className="input-group">
            <label>Enter Text or URL</label>
            <textarea
              className="qr-textarea"
              placeholder="https://example.com or your secret message..."
              value={input}
              onChange={handleInputChange}
            ></textarea>
          </div>
          
          <div className="qr-actions">
            <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
            <button className="btn btn-secondary" onClick={handleCopyInput} disabled={!input}>
              {isCopied ? '✓ Copied!' : 'Copy Input'}
            </button>
          </div>
        </div>

        <div className="qr-preview-section">
          <div className="qr-preview-card card">
            <div className={`qr-display ${isLoading ? 'loading' : ''}`}>
              {qrUrl ? (
                <img 
                  src={qrUrl} 
                  alt="QR Code" 
                  onLoad={() => setIsLoading(false)}
                  style={{ display: isLoading ? 'none' : 'block' }}
                />
              ) : (
                <div className="qr-placeholder">
                  <span>Your QR Code will appear here</span>
                </div>
              )}
              {isLoading && <div className="loader"></div>}
            </div>
            
            <button 
              className={`btn qr-download-btn ${downloadState === 'error' ? 'btn-danger' : 'btn-primary'}`} 
              onClick={handleDownload}
              disabled={!qrUrl || downloadState === 'downloading'}
            >
              {downloadState === 'downloading' ? 'Downloading...' :
               downloadState === 'success' ? '✓ Downloaded!' :
               downloadState === 'error' ? '❌ Download Failed' :
               'Download QR Code'}
            </button>
            <p className="qr-note">Scannable by any mobile device camera.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;

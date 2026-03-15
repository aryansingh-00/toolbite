import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button';
import './ImageCompressor.css';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [quality, setQuality] = useState(80);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState('');
  
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setError('');
    
    if (!file) return;

    if (!SUPPORTED_TYPES.includes(file.type)) {
      setError('Unsupported file format. Please upload JPG, PNG, or WEBP.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File is too large. Maximum size is 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage({
          file,
          url: event.target.result,
          imgRef: img,
          size: file.size,
          width: img.width,
          height: img.height,
          type: file.type
        });
        setCompressedImage(null);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleCompress = () => {
    if (!originalImage || !originalImage.imgRef) return;
    
    setIsCompressing(true);
    
    // Use setTimeout to allow UI to update to "Compressing..." state
    setTimeout(() => {
      try {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = originalImage.imgRef;

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        // For PNG, canvas compression doesn't work well with quality, so we export to WEBP or JPEG
        const outputType = originalImage.type === 'image/png' ? 'image/webp' : originalImage.type;
        const qualityRatio = quality / 100;
        
        const compressedDataUrl = canvas.toDataURL(outputType, qualityRatio);
        
        // Calculate new size approximately
        const base64str = compressedDataUrl.split(',')[1];
        const compressedSize = Math.round((base64str.length * 3) / 4);

        setCompressedImage({
          url: compressedDataUrl,
          size: compressedSize,
          type: outputType
        });
      } catch (err) {
        setError('Failed to compress image. Please try again.');
        console.error(err);
      } finally {
        setIsCompressing(false);
      }
    }, 50);
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    
    const link = document.createElement('a');
    link.href = compressedImage.url;
    
    // Generate filename
    const originalName = originalImage.file.name;
    const lastDotIndex = originalName.lastIndexOf('.');
    const nameWithoutExt = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
    const ext = compressedImage.type.split('/')[1];
    
    link.download = `${nameWithoutExt}-compressed.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetTool = () => {
    setOriginalImage(null);
    setCompressedImage(null);
    setQuality(80);
    setError('');
  };

  const calculateReduction = () => {
    if (!originalImage || !compressedImage) return 0;
    const reduction = ((originalImage.size - compressedImage.size) / originalImage.size) * 100;
    return reduction > 0 ? reduction.toFixed(1) : 0;
  };

  return (
    <div className="image-compressor">
      <div className="card upload-card">
        {!originalImage ? (
          <div className="upload-area">
            <input 
              type="file" 
              id="image-upload" 
              accept="image/jpeg, background/png, image/webp" 
              onChange={handleImageUpload}
              className="hidden-input"
            />
            <label htmlFor="image-upload" className="upload-label">
              <div className="upload-icon">📁</div>
              <h3>Upload an Image</h3>
              <p>Supports JPG, PNG, and WEBP (Max 10MB)</p>
              <Button as="span" variant="primary">Select File</Button>
            </label>
          </div>
        ) : (
          <div className="workspace">
            <div className="controls-panel card">
              <div className="control-group">
                <label htmlFor="quality-slider">
                  Compression Quality: <strong>{quality}%</strong>
                </label>
                <input 
                  type="range" 
                  id="quality-slider" 
                  min="1" 
                  max="100" 
                  value={quality} 
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="quality-slider"
                />
                <p className="slider-help">Lower quality = smaller file size</p>
              </div>
              
              <div className="action-buttons">
                <Button 
                  onClick={handleCompress} 
                  disabled={isCompressing}
                  className="full-width"
                >
                  {isCompressing ? 'Compressing...' : 'Compress Image'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetTool}
                  className="full-width"
                >
                  Start Over
                </Button>
              </div>
            </div>

            <div className="previews-container">
              <div className="preview-box original">
                <h4>Original Image</h4>
                <div className="image-container">
                  <img src={originalImage.url} alt="Original" />
                </div>
                <div className="stats">
                  <span>Size: <strong>{formatBytes(originalImage.size)}</strong></span>
                  <span>Dimensions: {originalImage.width}x{originalImage.height}</span>
                </div>
              </div>

              {compressedImage && (
                <div className="preview-box compressed">
                  <h4>Compressed Image</h4>
                  <div className="image-container">
                    <img src={compressedImage.url} alt="Compressed" />
                  </div>
                  <div className="stats">
                    <span className="success-text">New Size: <strong>{formatBytes(compressedImage.size)}</strong></span>
                    <span className="reduction-badge">-{calculateReduction()}%</span>
                  </div>
                  <Button onClick={handleDownload} className="download-btn full-width">
                    Download Image
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
      </div>
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default ImageCompressor;

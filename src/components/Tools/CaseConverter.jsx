import React, { useState } from 'react';
import './CaseConverter.css';

const CaseConverter = () => {
  const [text, setText] = useState('');

  const handleUpperCase = () => setText(text.toUpperCase());
  const handleLowerCase = () => setText(text.toLowerCase());
  
  const handleTitleCase = () => {
    const transformed = text.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
    setText(transformed);
  };

  const handleSentenceCase = () => {
    const transformed = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
    setText(transformed);
  };

  const handleCapitalizeEachWord = () => {
    const transformed = text.toLowerCase().replace(/(^\w|\s\w)/g, (c) => c.toUpperCase());
    setText(transformed);
  };

  const handleClear = () => setText('');
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="case-converter-tool">
      <div className="action-buttons-bar">
        <button className="btn btn-secondary btn-sm" onClick={handleUpperCase}>UPPERCASE</button>
        <button className="btn btn-secondary btn-sm" onClick={handleLowerCase}>lowercase</button>
        <button className="btn btn-secondary btn-sm" onClick={handleTitleCase}>Title Case</button>
        <button className="btn btn-secondary btn-sm" onClick={handleSentenceCase}>Sentence case</button>
        <button className="btn btn-secondary btn-sm" onClick={handleCapitalizeEachWord}>Capitalize Words</button>
      </div>

      <div className="editor-container">
        <textarea
          className="case-converter-textarea"
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        
        <div className="editor-actions">
          <button className="btn btn-secondary" onClick={handleClear}>Clear Text</button>
          <button className="btn btn-primary" onClick={handleCopy}>Copy Text</button>
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;

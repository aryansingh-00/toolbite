import React, { useState, useEffect } from 'react';
import './WordCounter.css';

const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    chars: 0,
    charsNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0,
  });

  useEffect(() => {
    const analyzeText = (val) => {
      const trimmedText = val.trim();
      
      // Words
      const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
      
      // Characters
      const chars = val.length;
      const charsNoSpaces = val.replace(/\s/g, '').length;
      
      // Sentences
      const sentences = trimmedText ? trimmedText.split(/[.!?]+/).filter(Boolean).length : 0;
      
      // Paragraphs
      const paragraphs = trimmedText ? trimmedText.split(/\n+/).filter(Boolean).length : 0;
      
      // Time estimations (Reading: 225 wpm, Speaking: 150 wpm)
      const readingTime = Math.ceil(words / 225);
      const speakingTime = Math.ceil(words / 150);

      setStats({
        words,
        chars,
        charsNoSpaces,
        sentences,
        paragraphs,
        readingTime,
        speakingTime,
      });
    };

    analyzeText(text);
  }, [text]);

  const handleClear = () => setText('');
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="word-counter-tool">
      <div className="stats-dashboard">
        <div className="stat-card">
          <span className="stat-value">{stats.words}</span>
          <span className="stat-label">Words</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.chars}</span>
          <span className="stat-label">Characters</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.charsNoSpaces}</span>
          <span className="stat-label">Chars (no spaces)</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.sentences}</span>
          <span className="stat-label">Sentences</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.paragraphs}</span>
          <span className="stat-label">Paragraphs</span>
        </div>
        <div className="stat-card accent">
          <span className="stat-value">{stats.readingTime} min</span>
          <span className="stat-label">Reading Time</span>
        </div>
        <div className="stat-card accent">
          <span className="stat-value">{stats.speakingTime} min</span>
          <span className="stat-label">Speaking Time</span>
        </div>
      </div>

      <div className="editor-container">
        <textarea
          className="word-counter-textarea"
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

export default WordCounter;

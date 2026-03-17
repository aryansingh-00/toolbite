import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type = 'text', lines = 3, width = '100%' }) => {
  if (type === 'image') {
    return (
      <div className="skeleton-container image" style={{ width }}>
        <div className="skeleton-image-box shimmer"></div>
      </div>
    );
  }

  return (
    <div className="skeleton-container text" style={{ width }}>
      {[...Array(lines)].map((_, i) => (
        <div 
          key={i} 
          className="skeleton-line shimmer" 
          style={{ width: i === lines - 1 && lines > 1 ? '60%' : '100%' }}
        ></div>
      ))}
    </div>
  );
};

export default Skeleton;

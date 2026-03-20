import React from 'react';
import './Maintenance.css';

const Maintenance = () => {
  return (
    <div className="maintenance-container">
      <div className="maintenance-content">
        <div className="maintenance-icon">🛠️</div>
        <h1 className="maintenance-title">Under Maintenance</h1>
        <p className="maintenance-message">
          We're currently performing some scheduled updates to improve your experience.
          ToolBite will be back online shortly with new features and a smoother performance.
        </p>
        <div className="maintenance-status">
          <span className="status-dot"></span>
          Scheduled Completion: Coming Soon
        </div>
        <div className="maintenance-footer">
          &copy; {new Date().getFullYear()} ToolBite. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Maintenance;

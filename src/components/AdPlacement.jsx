import React from 'react';
import './AdPlacement.css';

/**
 * AdPlacement Component
 * 
 * Reserves space for future AdSense or other ad providers.
 * Using fixed heights prevents "Layout Shift" which helps with SEO and UX.
 * 
 * @param {string} zone - The location of the ad (hero, sidebar, inline, footer)
 */
const AdPlacement = ({ zone = 'inline', className = '' }) => {
  // Map zones to specific placeholder behaviors/styles
  const zoneConfig = {
    hero: { label: 'Premium Sponsor', minHeight: '90px' },
    sidebar: { label: 'Advertisement', minHeight: '600px' },
    inline: { label: 'Advertisement', minHeight: '250px' },
    footer: { label: 'Advertisement', minHeight: '90px' }
  };

  const config = zoneConfig[zone] || zoneConfig.inline;

  return (
    <div 
      className={`ad-placement ad-zone-${zone} ${className}`}
      style={{ minHeight: config.minHeight }}
      aria-hidden="true"
    >
      <div className="ad-placeholder-content">
        <span className="ad-label">{config.label}</span>
        {/* Ad script or iframe would go here later */}
      </div>
    </div>
  );
};

export default AdPlacement;

import React from 'react';
import AdSenseAd from './Ads/AdSenseAd';
import './AdPlacement.css';

/**
 * AdPlacement Component
 * 
 * Wraps the Google AdSense ad with a fixed-height container
 * to prevent "Layout Shift" which helps with SEO and UX.
 * 
 * @param {string} zone - The location of the ad (hero, sidebar, inline, footer, toolTop, toolBottom)
 * @param {string} className - Additional CSS classes
 */
const AdPlacement = ({ zone = 'inline', className = '' }) => {
  // Define heights to prevent Layout Shift
  const zoneConfig = {
    hero: { minHeight: '100px' },
    sidebar: { minHeight: '250px' },
    inline: { minHeight: '250px' },
    toolTop: { minHeight: '100px' },
    toolBottom: { minHeight: '250px' },
    footer: { minHeight: '100px' }
  };

  const config = zoneConfig[zone] || zoneConfig.inline;

  return (
    <div 
      className={`ad-placement ad-zone-${zone} ${className}`}
      style={{ minHeight: config.minHeight }}
    >
      <AdSenseAd 
        slotType={zone}
      />
    </div>
  );
};

export default AdPlacement;

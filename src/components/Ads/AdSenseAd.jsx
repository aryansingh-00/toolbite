import React, { useEffect, useRef } from 'react';
import { adConfig } from '../../config/ads';

/**
 * AdSenseAd
 * Reusable component for displaying Google AdSense ads.
 * Handles initialization when mounted and cleans up to prevent errors.
 * 
 * Props:
 * - slotType (string): Key from adConfig (e.g. 'hero', 'inline'). Overrides individual props if provided.
 * - adSlot (string): The ad slot ID provided by AdSense.
 * - adFormat (string): The ad format (e.g., 'auto', 'fluid', 'horizontal'). Default is 'auto'.
 * - style (object): Custom inline styles. Responsive by default.
 * - className (string): Custom CSS classes.
 * - responsive (boolean): Whether the ad is responsive. Default is true.
 */
const AdSenseAd = ({
  slotType,
  adSlot,
  adFormat = 'auto',
  style = { display: 'block' },
  className = '',
  responsive = true
}) => {
  const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;
  const adRef = useRef(null);

  // Resolve configuration from slotType if provided
  const config = slotType && adConfig[slotType] ? adConfig[slotType] : null;
  const finalAdSlot = config?.adSlotId || adSlot;
  const finalAdFormat = config?.format || adFormat;
  const finalResponsive = config ? config.responsive : responsive;

  useEffect(() => {
    // Only attempt to initialize the ad if we have a publisher ID
    if (!publisherId || !adRef.current) return;

    // Use IntersectionObserver to wait until the ad is near the viewport
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (adRef.current && adRef.current.innerHTML === '') {
          try {
            // Initialize the ad block
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (error) {
            console.error('AdSenseAd: Failed to push ad context to window.', error);
          }
        }
        observer.disconnect(); // Stop observing once initialized
      }
    }, { rootMargin: '300px' }); // Start loading when within 300px of viewport

    observer.observe(adRef.current);

    return () => {
      observer.disconnect();
    };
  }, [publisherId]);

  // Don't render anything and prevent hydration errors if the ID is missing
  if (!publisherId) {
    // In development mode, show a placeholder so developers can see where ads will be
    if (import.meta.env.DEV) {
       return (
         <div className={`flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded p-4 text-gray-500 text-sm h-32 w-full ${className}`} style={style}>
           [Ad Placeholder] Set VITE_ADSENSE_PUBLISHER_ID to view ads natively
         </div>
       );
    }
    return null;
  }

  // Ensure adSlot is provided
  if (!finalAdSlot) {
    console.warn('AdSenseAd: Missing adSlot prop or valid slotType. Ad cannot be displayed.');
    if (import.meta.env.DEV) {
      return (
        <div className={`flex items-center justify-center bg-red-50 border border-dashed border-red-300 rounded p-4 text-red-500 text-sm h-32 w-full ${className}`} style={style}>
          [Ad Error] Missing adSlot property
        </div>
      );
    }
    return null;
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={publisherId}
      data-ad-slot={finalAdSlot}
      data-ad-format={finalAdFormat}
      data-full-width-responsive={finalResponsive ? 'true' : 'false'}
      ref={adRef}
    />
  );
};

export default AdSenseAd;

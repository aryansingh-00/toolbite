import React, { useEffect } from 'react';

/**
 * AdSenseScript
 * Loads the Google AdSense script globally, ensuring it only loads once.
 * Safely handles missing publisher IDs and avoids duplicate injections.
 */
const AdSenseScript = () => {
  useEffect(() => {
    const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;

    // Do not load the script if no publisher ID is provided
    if (!publisherId) {
      console.warn('AdSenseScript: Missing VITE_ADSENSE_PUBLISHER_ID environment variable. Ads will not be loaded.');
      return;
    }

    // Check if the script is already injected to prevent duplicates
    const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
    if (existingScript) {
      return;
    }

    // Create and inject the AdSense script globally, but defer it to prioritize page load speed
    const timer = setTimeout(() => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
      script.crossOrigin = 'anonymous';
      
      document.head.appendChild(script);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return null; // This component is functional only, no visible output
};

export default AdSenseScript;

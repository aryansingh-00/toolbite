import { useEffect } from 'react';

/**
 * Analytics Component
 * 
 * A central place to manage tracking scripts (GA4, etc.).
 * In production, this would initialize your analytics provider.
 */
const Analytics = ({ pageTitle }) => {
  useEffect(() => {
    // This is where you would initialize GA4 or other trackers
    // Example: gtag('config', 'GA_MEASUREMENT_ID', { 'page_title': pageTitle });
    
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Page View: ${pageTitle || document.title}`);
    }

  }, [pageTitle]);

  return null;
};

export default Analytics;

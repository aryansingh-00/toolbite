/**
 * Centralized AdSense Configuration
 * 
 * Manage all ad placements, formats, and slot IDs from this single file.
 * Ensure you replace the placeholder 'adSlotId' values with your actual AdSense unit IDs.
 */
export const adConfig = {
  hero: {
    adSlotId: 'your-hero-slot-id',
    format: 'auto',
    responsive: true,
  },
  inline: {
    adSlotId: 'your-inline-slot-id',
    format: 'auto',
    responsive: true,
  },
  toolTop: {
    adSlotId: 'your-toolTop-slot-id',
    format: 'auto',
    responsive: true,
  },
  toolBottom: {
    adSlotId: 'your-toolBottom-slot-id',
    format: 'auto',
    responsive: true,
  },
  sidebar: {
    adSlotId: 'your-sidebar-slot-id',
    format: 'vertical',
    responsive: true,
  },
  footer: {
    adSlotId: 'your-footer-slot-id',
    format: 'horizontal',
    responsive: true,
  }
};

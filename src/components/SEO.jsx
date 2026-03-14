import { useEffect } from 'react';

const SEO = ({ title, description, canonicalPath }) => {
  const siteName = 'ToolBite';
  const fullTitle = title ? `${title} | ${siteName}` : 'ToolBite - Fast, Modern Online Tools';
  const finalDescription = description || 'ToolBite offers a curated collection of fast, simple, and free online tools for students, creators, and developers.';
  const url = `https://toolbite.com${canonicalPath || ''}`;

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', finalDescription);

    // Update Open Graph Tags
    const ogTags = {
      'og:title': fullTitle,
      'og:description': finalDescription,
      'og:url': url,
      'og:type': 'website',
      'og:site_name': siteName,
    };

    Object.entries(ogTags).forEach(([key, value]) => {
      let tag = document.querySelector(`meta[property="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    });

    // Update Twitter Tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': fullTitle,
      'twitter:description': finalDescription,
    };

    Object.entries(twitterTags).forEach(([key, value]) => {
      let tag = document.querySelector(`meta[name="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    });

  }, [fullTitle, finalDescription, url]);

  return null;
};

export default SEO;

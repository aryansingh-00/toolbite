import React, { useState, useEffect, useMemo } from 'react'
import Layout from './components/Layout'

import Home from './pages/Home'
import Tools from './pages/Tools'
import About from './pages/About'
import Contact from './pages/Contact'
import { PrivacyPolicy, TermsOfService } from './pages/Legal'
import SEO from './components/SEO'
import Analytics from './components/Analytics'
import AdSenseScript from './components/Ads/AdSenseScript'
import Maintenance from './pages/Maintenance'
import './index.css'

const IS_MAINTENANCE = true; // Toggle this to false to bring site back online

const ROUTES = {
  '/': { component: Home, title: 'Home' },
  '/index.html': { component: Home, title: 'Home' },
  '/tools': {
    component: Tools,
    title: 'All Tools',
    description: 'Explore our new collection of tools.'
  },
  '/about': {
    component: About,
    title: 'About Us',
    description: 'Learn more about our mission.'
  },
  '/contact': {
    component: Contact,
    title: 'Contact',
    description: 'Get in touch.'
  },
  '/privacy': { component: PrivacyPolicy, title: 'Privacy Policy' },
  '/terms': { component: TermsOfService, title: 'Terms of Service' }
};

function App() {
  if (IS_MAINTENANCE) return <Maintenance />;

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);

    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (
        link &&
        link.href.startsWith(window.location.origin) &&
        !link.hasAttribute('download') &&
        link.target !== '_blank'
      ) {
        e.preventDefault();
        window.history.pushState({}, '', link.href);
        setPath(window.location.pathname);
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const routeResult = useMemo(() => {
    return ROUTES[path] || ROUTES['/'];
  }, [path]);

  const renderContent = () => {
    const { component: Component, title, description } = routeResult;
    return (
      <>
        <SEO title={title} description={description} canonicalPath={path} />
        <Analytics pageTitle={title} />
        <Component />
      </>
    );
  };

  return (
    <Layout>
      <AdSenseScript />
      <React.Suspense fallback={<div className="p-20 text-center"><span className="spinner"></span></div>}>
        {renderContent()}
      </React.Suspense>
    </Layout>
  );
}

export default App

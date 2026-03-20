import React, { useState, useEffect, useMemo } from 'react'
import Layout from './components/Layout'

import Home from './pages/Home'
import Tools from './pages/Tools'
import ToolTemplate from './pages/ToolTemplate'
import About from './pages/About'
import Contact from './pages/Contact'
import { PrivacyPolicy, TermsOfService } from './pages/Legal'
import SEO from './components/SEO'
import Analytics from './components/Analytics'
import ResumeLanding from './pages/ResumeLanding'
import Maintenance from './pages/Maintenance'

const IS_MAINTENANCE = true; // Toggle this to true to take site offline

// Lazy load tool components
const WordCounter = React.lazy(() => import('./components/Tools/WordCounter'));
const CaseConverter = React.lazy(() => import('./components/Tools/CaseConverter'));
const QRCodeGenerator = React.lazy(() => import('./components/Tools/QRCodeGenerator'));
const JSONFormatter = React.lazy(() => import('./components/Tools/JSONFormatter'));
const ResumeBuilder = React.lazy(() => import('./components/Tools/ResumeBuilder'));
const TextToSpeech = React.lazy(() => import('./components/Tools/TextToSpeech'));
const ImageCompressor = React.lazy(() => import('./components/Tools/ImageCompressor'));
const AIEmailWriter = React.lazy(() => import('./components/Tools/AIEmailWriter'));
const AIBlogGenerator = React.lazy(() => import('./components/Tools/AIBlogGenerator'));
const AIParagraphRewriter = React.lazy(() => import('./components/Tools/AIParagraphRewriter'));
const AIImageGenerator = React.lazy(() => import('./components/Tools/AIImageGenerator'));
const AIBackgroundRemover = React.lazy(() => import('./components/Tools/AIBackgroundRemover'));
const AIImageEnhancer = React.lazy(() => import('./components/Tools/AIImageEnhancer'));

import AdPlacement from './components/AdPlacement'
import AdSenseScript from './components/Ads/AdSenseScript'
import { tools } from './data/tools'
import './index.css'

/**
 * Route Configuration
 * Centralized mapping of paths to components and metadata.
 */

const ROUTES = {
  '/': { component: Home, title: 'Home' },
  '/index.html': { component: Home, title: 'Home' },
  '/tools': { 
    component: Tools, 
    title: 'All Tools', 
    description: 'Explore our full collection of free, fast, and secure online tools.' 
  },
  '/about': { 
    component: About, 
    title: 'About Us', 
    description: 'Learn more about ToolBite and our mission to simplify digital tools.' 
  },
  '/contact': { 
    component: Contact, 
    title: 'Contact', 
    description: 'Get in touch with the ToolBite team.' 
  },
  '/privacy': { component: PrivacyPolicy, title: 'Privacy Policy' },
  '/terms': { component: TermsOfService, title: 'Terms of Service' }
};

/**
 * Tool Content Mapping
 * Links tool IDs to their functional React components.
 */
const TOOL_COMPONENTS = {
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'qr-code-generator': QRCodeGenerator,
  'json-formatter': JSONFormatter,
  'resume-builder': ResumeBuilder,
  'text-to-speech': TextToSpeech,
  'image-compressor': ImageCompressor,
  'ai-email-writer': AIEmailWriter,
  'ai-blog-generator': AIBlogGenerator,
  'ai-paragraph-rewriter': AIParagraphRewriter,
  'ai-image-generator': AIImageGenerator,
  'ai-background-remover': AIBackgroundRemover,
  'ai-image-enhancer': AIImageEnhancer
};

function App() {
  const [path, setPath] = useState(window.location.pathname);

  // Handle browser back/forward buttons and SPA link interception
  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (link && 
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


  /**
   * Resolve current route
   */
  const routeResult = useMemo(() => {
    // 1. Check static routes
    if (ROUTES[path]) {
      return { type: 'static', config: ROUTES[path] };
    }

    // 2. Check dynamic tool routes
    const tool = tools.find(t => t.link === path);
    if (tool) {
      if (tool.id === 'resume-builder') {
        return { type: 'resume-hub', config: tool };
      }
      return { type: 'tool', config: tool };
    }

    // Special case for resume builder app sub-route
    if (path === '/tools/resume-builder/create') {
      const resumeTool = tools.find(t => t.id === 'resume-builder');
      return { type: 'tool', config: resumeTool };
    }

    // 3. Fallback to Home
    return { type: 'static', config: ROUTES['/'] };
  }, [path]);

  /**
   * Render helper for the resolved route
   */
  const renderContent = () => {
    const { type, config } = routeResult;

    if (type === 'resume-hub') {
      return (
        <>
          <SEO 
            title={config.metaTitle} 
            description={config.metaDescription} 
            canonicalPath={config.link} 
          />
          <Analytics pageTitle="Resume Hub" />
          <ResumeLanding />
        </>
      );
    }

    if (type === 'tool') {
      const ToolComponent = TOOL_COMPONENTS[config.id];
      return (
        <>
          <SEO 
            title={config.metaTitle} 
            description={config.metaDescription} 
            canonicalPath={config.link} 
          />
          <Analytics pageTitle={config.title} />
          <ToolTemplate 
            title={config.title} 
            category={config.category} 
            description={config.description}
          >
            {ToolComponent ? <ToolComponent /> : <div className="p-8 text-center">Tool coming soon...</div>}
          </ToolTemplate>
        </>
      );
    }

    const { component: Component, title, description } = config;
    return (
      <>
        <SEO title={title} description={description} canonicalPath={path} />
        <Analytics pageTitle={title} />
        <Component />
      </>
    );
  };

    if (IS_MAINTENANCE) {
      return (
        <>
          <SEO title="Maintenance | ToolBite" description="We'll be back soon!" />
          <Maintenance />
        </>
      );
    }

    return (
      <Layout>
        <AdSenseScript />
        <React.Suspense fallback={<div className="p-20 text-center"><span className="spinner"></span></div>}>
          {renderContent()}
        </React.Suspense>
      </Layout>
    )
}

export default App

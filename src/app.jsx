import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LandingDT from './pages/desktop/landingDT';
import HireMeDT from './pages/desktop/hiremeDT';
import LandingMB from './pages/mobile/landingMB';
import HireMeMB from './pages/mobile/hiremeMB';
import SfxMB from './pages/mobile/sfxMB';
import LinksMB from './pages/mobile/linksMB';
import Contact from './pages/cross-platform/contact';

// Helper function to detect mobile devices
const isMobileDevice = () => {
  return (typeof window !== "undefined" && 
    (window.innerWidth <= 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)));
};

// Helper component to handle mobile redirection
const MobileRedirect = () => {
  useEffect(() => {
    const checkAndRedirect = () => {
      const isMobile = isMobileDevice();
      const onMobilePath = window.location.pathname === '/mobile';
      const isSfxPath = window.location.pathname === '/sfx';
      const isLinksMobilePath = window.location.pathname === '/linksmobile';
      const isHireMeMobilePath = window.location.pathname === '/hirememobile';
      const isContactPath = window.location.pathname === '/contact';
      
      // Skip redirection for all mobile-specific paths
      if (isSfxPath || isHireMeMobilePath || isLinksMobilePath || isContactPath) return;
      
      if (isMobile && !onMobilePath) {
        window.location.href = `${window.location.origin}/mobile`;
      } else if (!isMobile && onMobilePath) {
        window.location.href = window.location.origin;
      }
    };

    // Check on mount
    checkAndRedirect();

    // Check on resize
    window.addEventListener('resize', checkAndRedirect);

    // Check on page visibility change
    document.addEventListener('visibilitychange', checkAndRedirect);

    return () => {
      window.removeEventListener('resize', checkAndRedirect);
      document.removeEventListener('visibilitychange', checkAndRedirect);
    };
  }, []);
  
  return null;
};

// Helper component to handle scroll to section when navigating
const ScrollToSection = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      // Wait a moment for the DOM to be ready
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          const yOffset = -120;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else if (location.pathname === '/') {
      // If navigating to root, scroll to top with smooth animation
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [location]);
  
  return null;
};

// Main redirect handler for clean URLs
const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Don't redirect if we're already on the mobile route
    if (location.pathname === '/mobile') return;

    // Handle section-based URLs without hash
    if (location.pathname === '/about') {
      navigate('/#about', { replace: true });
    } else if (location.pathname === '/achievements') {
      navigate('/#achievements', { replace: true });
    } else if (location.pathname === '/work') {
      navigate('/#work', { replace: true });
    }
    // Removed contact redirect to allow standalone contact page
  }, [location, navigate]);
  
  return null;
};

function App() {
  return (
    <Router>
      <MobileRedirect />
      <ScrollToSection />
      <RedirectHandler />
      <Routes>
        <Route path="/" element={<LandingDT />} />
        <Route path="/hireme" element={<HireMeDT />} />
        <Route path="/mobile" element={<LandingMB />} />
        <Route path="/hirememobile" element={<HireMeMB />} />
        <Route path="/sfx" element={<SfxMB />} />
        <Route path="/linksmobile" element={<LinksMB />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<LandingDT />} />
      </Routes>
    </Router>
  );
}

export default App;

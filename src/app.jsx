import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Landing from './pages/Landing';
import HireMe from './pages/hireme';
import Sfx from './pages/Sfx'; // Import the new Sfx page

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
    // Handle section-based URLs without hash
    if (location.pathname === '/about') {
      navigate('/#about', { replace: true });
    } else if (location.pathname === '/achievements') {
      navigate('/#achievements', { replace: true });
    } else if (location.pathname === '/work') {
      navigate('/#work', { replace: true });
    } else if (location.pathname === '/contact') {
      navigate('/#contact', { replace: true });
    }
  }, [location, navigate]);
  
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToSection />
      <RedirectHandler />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hireme" element={<HireMe />} />
        <Route path="/sfx" element={<Sfx />} /> {/* Add new route for SFX page */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;

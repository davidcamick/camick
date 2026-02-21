import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CoverVideo from './pages/CoverVideo';
import Resume from './pages/Resume';
import LinksMB from './pages/mobile/linksMB';
import Contact from './pages/cross-platform/contact';

// Helper component to handle scroll to top when navigating
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location]);
  
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video" element={<CoverVideo />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/sfx" element={<Navigate to="/" replace />} />
        <Route path="/links" element={<LinksMB />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

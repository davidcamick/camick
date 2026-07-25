import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import Home from './pages/Home';
import Events from './pages/Events';
import CoverVideo from './pages/CoverVideo';
import Resume from './pages/Resume';
import Links from './pages/Links';
import Contact from './pages/Contact';

/** Resets scroll between routes, and honours an incoming #hash deep link. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    /* Instant, not smooth — smooth-scrolling a brand new page reads as a
       glitch rather than a transition. */
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/video" element={<CoverVideo />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/links" element={<Links />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sfx" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

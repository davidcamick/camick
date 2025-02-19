import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import HireMe from './pages/hireme';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hireme" element={<HireMe />} />
      </Routes>
    </Router>
  );
}

export default App;

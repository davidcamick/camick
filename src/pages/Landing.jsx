import React from 'react';
import { NavBar } from '../components/nav';

function Landing() {
  return (
    <div 
      className="h-screen w-full"
      style={{ background: 'linear-gradient(45deg, #003049, #669BBC)' }}
    >
      <h1 className="text-white text-4xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        This is a Website
      </h1>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 pb-8 z-50">
        <NavBar tabs={['About Me', 'My Achievements', 'My Work', 'Contact']} />
      </div>
    </div>
  );
}

export default Landing;

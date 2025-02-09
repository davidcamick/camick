import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tl from-black to-blue-900 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center">
        Welcome to Camick.org
      </h1>
      <p className="text-lg md:text-xl text-white opacity-80 mb-8 text-center max-w-2xl">
        This site is currently under construction, please visit my other sites for more information or to view my products
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
        <a
          href="https://instagram.com/davidcamick"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black py-2 px-4 rounded"
        >
          Instagram
        </a>
        <a
          href="https://payhip.com/camick"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black py-2 px-4 rounded"
        >
          Shop
        </a>
        <a
          href="https://camstem.org"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black py-2 px-4 rounded"
        >
          CamStem
        </a>
        <a
          href="mailto:david@camick.org"
          className="bg-white text-black py-2 px-4 rounded"
        >
          Email
        </a>
      </div>
    </div>
  );
}

export default App;

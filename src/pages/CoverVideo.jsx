import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';

export default function CoverVideo() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    document.title = 'Cover Video | Camick Portfolio';
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.header-word',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      )
      .fromTo('.video-container',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=0.4"
      );
    }, containerRef);

    return () => {
      ctx.revert();
      document.title = 'Camick Portfolio';
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-[#0a0a0a] min-h-screen text-zinc-50 px-6 py-24 relative overflow-x-hidden flex flex-col items-center justify-center">
      
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-6 md:left-12 z-50 flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300"
      >
        <ArrowLeft size={18} />
        <span className="font-medium tracking-wide text-sm">BACK</span>
      </button>
      
      <div className="max-w-5xl w-full relative z-10">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter flex flex-wrap justify-center gap-x-4 gap-y-2">
            {['2025', 'COVER', 'VIDEO'].map((word, i) => (
              <span key={i} className={`header-word inline-block ${word === 'VIDEO' ? 'text-zinc-500' : ''}`}>
                {word}
              </span>
            ))}
          </h1>
        </div>

        <div className="video-container w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative">
          <iframe 
            src="https://player.vimeo.com/video/1050150111?h=1234567890&title=0&byline=0&portrait=0" 
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowFullScreen
            title="Cover Video"
          ></iframe>
        </div>

      </div>
    </main>
  );
}

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, Download } from 'lucide-react';

export default function Resume() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    document.title = 'Resume | Camick Portfolio';
    
    const ctx = gsap.context(() => {
      gsap.fromTo('.resume-anim',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      );
    }, containerRef);

    return () => {
      ctx.revert();
      document.title = 'Camick Portfolio';
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-[#0a0a0a] min-h-screen text-zinc-50 px-6 py-24 relative overflow-x-hidden flex flex-col items-center">
      
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-6 md:left-12 z-50 flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300"
      >
        <ArrowLeft size={18} />
        <span className="font-medium tracking-wide text-sm">BACK</span>
      </button>
      
      <div className="max-w-4xl w-full relative z-10 mt-12">
        
        <div className="text-center mb-12 resume-anim">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            MY <span className="text-zinc-500">RESUME</span>
          </h1>
        </div>

        <div className="resume-anim w-full aspect-[1/1.4] md:aspect-[16/9] bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden relative mb-12">
          <iframe 
            src="/assets/resume.pdf" 
            className="w-full h-full"
            title="Resume"
          ></iframe>
        </div>

        <div className="resume-anim text-center">
          <a 
            href="/assets/resume.pdf" 
            download
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform duration-300"
          >
            <Download size={20} />
            <span>Download PDF</span>
          </a>
        </div>

      </div>
    </main>
  );
}

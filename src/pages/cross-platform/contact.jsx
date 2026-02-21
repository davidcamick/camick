import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, Mail, Phone } from 'lucide-react';

export default function Contact() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#0a0a0a] min-h-screen text-zinc-50 px-6 py-24 relative">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-6 md:left-12 z-50 flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300"
      >
        <ArrowLeft size={18} />
        <span className="font-medium tracking-wide text-sm">BACK</span>
      </button>

      <div className="max-w-lg mx-auto pt-12">
        <div className="text-4xl md:text-6xl font-bold tracking-tighter text-center mb-16 contact-item">
          CONTACT <span className="text-zinc-500">ME</span>
        </div>

        <div className="space-y-6">
          <div className="contact-item bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <Mail className="text-zinc-400" size={24} />
              <h2 className="text-2xl font-bold tracking-tight">Email</h2>
            </div>
            <a href="mailto:david@camick.org" className="text-lg text-zinc-400 hover:text-white transition-colors">
              david@camick.org
            </a>
          </div>

          <div className="contact-item bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <Phone className="text-zinc-400" size={24} />
              <h2 className="text-2xl font-bold tracking-tight">Phone</h2>
            </div>
            <a href="tel:+14047717577" className="text-lg text-zinc-400 hover:text-white transition-colors">
              (404) 771-7577
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

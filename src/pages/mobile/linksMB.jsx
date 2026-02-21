import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, Camera, Video, Music, GraduationCap, Mail } from 'lucide-react';

export default function LinksMobile() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const links = [
    {
      title: "My Instagram",
      url: "https://instagram.com/davidcamick",
      icon: <Camera size={24} />
    },
    {
      title: "My Cover Video",
      url: "https://vimeo.com/1068645245/3cbbac1d8f",
      icon: <Video size={24} />
    },
    {
      title: "My SFX Pack",
      url: "https://camick.org/sfx",
      icon: <Music size={24} />
    },
    {
      title: "CamStem",
      url: "https://camstem.org",
      icon: <GraduationCap size={24} />
    },
    {
      title: "My Contact Info",
      url: "/contact",
      icon: <Mail size={24} />,
      internal: true
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.link-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
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
        <div className="text-4xl md:text-6xl font-bold tracking-tighter text-center mb-16 link-item">
          MY <span className="text-zinc-500">LINKS</span>
        </div>

        <div className="flex flex-col gap-4">
          {links.map((link, index) => (
            <div key={link.url} className="link-item">
              {link.internal ? (
                <button
                  onClick={() => navigate(link.url)}
                  className="w-full p-6 bg-zinc-900/50 backdrop-blur-sm rounded-2xl 
                    border border-zinc-800 flex items-center gap-6 hover:bg-zinc-800 
                    transition-all duration-300 group"
                >
                  <div className="text-zinc-400 group-hover:text-white transition-colors">{link.icon}</div>
                  <span className="text-xl font-medium tracking-tight">{link.title}</span>
                </button>
              ) : (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-6 bg-zinc-900/50 backdrop-blur-sm rounded-2xl 
                    border border-zinc-800 flex items-center gap-6 hover:bg-zinc-800 
                    transition-all duration-300 group"
                >
                  <div className="text-zinc-400 group-hover:text-white transition-colors">{link.icon}</div>
                  <span className="text-xl font-medium tracking-tight">{link.title}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

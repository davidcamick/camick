import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Instagram, ArrowRight, Play, FileText } from 'lucide-react';
import Experience from '../components/experience';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-text-1', 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
      )
      .fromTo('.hero-text-2', 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
        "-=1"
      )
      .fromTo('.hero-sub',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        "-=0.8"
      )
      .fromTo('.hero-btn',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
        "-=0.6"
      );

      // Scroll Animations
      // Stats Section
      gsap.fromTo('.stat-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 85%',
          }
        }
      );

      // Number counting animation
      const statNumbers = gsap.utils.toArray('.stat-number');
      statNumbers.forEach((el) => {
        const targetValue = parseFloat(el.getAttribute('data-value'));
        const suffix = el.getAttribute('data-suffix') || '';
        const isFloat = targetValue % 1 !== 0;
        
        gsap.fromTo(el, 
          { innerHTML: 0 },
          {
            innerHTML: targetValue,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.stats-section',
              start: 'top 85%',
            },
            onUpdate: function() {
              const val = Number(this.targets()[0].innerHTML);
              el.innerHTML = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
            }
          }
        );
      });

      // About Section
      gsap.fromTo('.about-content',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 1,
          }
        }
      );

      // Arsenal Section
      gsap.fromTo('.arsenal-content',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.arsenal-section',
            start: 'top 80%',
          }
        }
      );

      // Work Section Parallax
      const workItems = gsap.utils.toArray('.work-item');
      workItems.forEach((item, i) => {
        gsap.fromTo(item,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Contact Section
      gsap.fromTo('.contact-content',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main ref={containerRef} className="bg-[#0a0a0a] text-zinc-50 min-h-screen selection:bg-white/20 font-sans overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 mix-blend-difference">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-xl font-medium tracking-tighter">CAMICK</span>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            <button onClick={() => scrollTo(aboutRef)} className="hover:opacity-60 transition-opacity">ABOUT</button>
            <button onClick={() => scrollTo(workRef)} className="hover:opacity-60 transition-opacity">WORK</button>
            <button onClick={() => navigate('/resume')} className="hover:opacity-60 transition-opacity">RESUME</button>
            <button onClick={() => scrollTo(contactRef)} className="hover:opacity-60 transition-opacity">CONTACT</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex flex-col justify-center px-6 md:px-12">
        <div className="z-10 max-w-7xl mx-auto w-full">
          <div className="overflow-hidden">
            <h1 className="hero-text-1 text-[12vw] md:text-[8vw] leading-[0.85] font-bold tracking-tighter">
              DAVID
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-text-2 text-[12vw] md:text-[8vw] leading-[0.85] font-bold tracking-tighter text-zinc-500">
              CAMICK
            </h1>
          </div>
          
          <div className="mt-12 max-w-xl">
            <p className="hero-sub text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
              Cinematic Event Videography & Sports Coverage. 
              Capturing high-impact moments with precision and intent.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <button 
                onClick={() => navigate('/video')}
                className="hero-btn group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform duration-300"
              >
                <Play size={18} className="fill-black" />
                <span>Watch 2025 Reel</span>
              </button>
              <button 
                onClick={() => navigate('/resume')}
                className="hero-btn group flex items-center gap-3 bg-zinc-900 border border-zinc-800 text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors duration-300"
              >
                <FileText size={18} />
                <span>View Resume</span>
              </button>
            </div>
          </div>
        </div>

        {/* Background Video/Texture */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-black/20" /> {/* Extra darkening layer for text readability */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-24 px-6 md:px-12 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
            <div className="stat-item flex flex-col items-center text-center pt-8 md:pt-0">
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
                <span className="stat-number" data-value="2.7" data-suffix="m+">0</span>
              </h3>
              <p className="text-zinc-400 text-lg font-medium tracking-wide uppercase">Impressions</p>
            </div>
            <div className="stat-item flex flex-col items-center text-center pt-8 md:pt-0">
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
                <span className="stat-number" data-value="80" data-suffix="%">0</span>
              </h3>
              <p className="text-zinc-400 text-lg font-medium tracking-wide uppercase">Avg Retention Rate</p>
            </div>
            <div className="stat-item flex flex-col items-center text-center pt-8 md:pt-0">
              <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
                <span className="stat-number" data-value="8" data-suffix="hr">0</span>
              </h3>
              <p className="text-zinc-400 text-lg font-medium tracking-wide uppercase">Avg Turnaround</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="about-content grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
              HIGH IMPACT <br/>
              <span className="text-zinc-500">VISUALS.</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              I specialize in creating dynamic, cinematic content that elevates brands and athletes. 
              Using Sony Alpha Series cameras and premium glass, every frame is engineered for maximum impact.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              Currently, I work with <span className="text-white font-medium">Alabama Football</span>, producing high-energy gameday videos, recaps, and player highlights that capture the intensity of the sport.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed">
              From fast-paced sports coverage to elegant event videography, my approach is rooted in 
              storytelling through motion and light.
            </p>
          </div>
          <div className="aspect-[4/5] bg-zinc-900 rounded-2xl overflow-hidden relative group">
            {/* Placeholder for a portrait or action shot */}
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-900" />
            <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-medium tracking-widest">
              PORTRAIT
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Experience/Clients Section */}
      <Experience />

      {/* The Arsenal Section */}
      <section className="arsenal-section py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="arsenal-content grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              THE <span className="text-zinc-500">ARSENAL</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-12">
              Advanced workflows in Adobe Premiere Pro, After Effects, and Blender for 3D integration.
            </p>
            
            <div className="flex gap-6 items-center">
              {/* Premiere Pro Logo */}
              <div className="relative group">
                <div className="w-16 h-16 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300">
                  <img src="/assets/logos/premiere.png" alt="Premiere Pro" className="w-full h-full object-contain p-2" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-zinc-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                  Industry-standard video editing and timeline assembly.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
                </div>
              </div>
              
              {/* After Effects Logo */}
              <div className="relative group">
                <div className="w-16 h-16 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300">
                  <img src="/assets/logos/aftereffects.png" alt="After Effects" className="w-full h-full object-contain p-2" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-zinc-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                  Advanced motion graphics, VFX, and compositing.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
                </div>
              </div>
              
              {/* Blender Logo */}
              <div className="relative group">
                <div className="w-16 h-16 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 shadow-lg overflow-hidden hover:scale-110 transition-transform duration-300">
                  <img src="/assets/logos/blender.png" alt="Blender" className="w-full h-full object-contain p-2" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-zinc-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                  3D modeling, animation, and environment design.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 aspect-[5/4] bg-zinc-900 rounded-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800 to-zinc-900" />
            <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-medium tracking-widest">
              WORKSPACE
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section ref={workRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16">SELECTED WORK</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="work-item group cursor-pointer">
              <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden relative mb-4">
                <div className="absolute inset-0 bg-zinc-800 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                  <div className="bg-white text-black rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Play size={24} className="fill-black" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-medium">Project Title {item}</h3>
              <p className="text-zinc-500">Sports / Event</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-800">
        <div className="contact-content flex flex-col items-center text-center">
          <h2 className="text-[8vw] md:text-[6vw] font-bold tracking-tighter leading-none mb-8">
            LET'S CREATE.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <a 
              href="mailto:david@camick.org"
              className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform duration-300"
            >
              <Mail size={20} />
              <span>david@camick.org</span>
            </a>
            <a 
              href="https://instagram.com/davidcamick"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors duration-300"
            >
              <Instagram size={20} />
              <span>@davidcamick</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-zinc-600 text-sm">
        <p>© {new Date().getFullYear()} David Camick. All rights reserved.</p>
      </footer>

    </main>
  );
}

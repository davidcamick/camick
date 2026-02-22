import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Check, Plus, Clock, Plane, Car, Film, Star, Sparkles, Crown, Music, Users, Building2, Mail, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ── DATA ── */

const personalPackages = [
  {
    name: 'Spotlight Cut',
    price: '$350',
    tagline: 'Build hype. Stay active.',
    features: [
      '45–60 sec cinematic recap',
      'Crowd reactions + performance highlights',
      'Artist-focused storytelling',
      'Delivered in one format',
    ],
    icon: Film,
  },
  {
    name: 'Headliner Edit',
    price: '$600',
    tagline: 'Designed to feel larger than life.',
    popular: true,
    features: [
      '60–90 sec edit',
      'Enhanced sound design + bass emphasis',
      'Performance build-up sequence',
      'Crowd immersion shots',
      '1 teaser clip (15 sec)',
      'Delivered in one format',
    ],
    icon: Star,
  },
  {
    name: 'Icon Experience',
    price: '$950',
    tagline: 'The statement piece.',
    features: [
      '90–120 sec cinematic recap',
      'Advanced transitions + effects',
      'Full crowd immersion + artist branding',
      '2 social teaser clips',
      'Thumbnail frame export',
      'Delivered in one format',
    ],
    icon: Crown,
  },
];

const orgPackages = [
  {
    name: 'Social Recap',
    price: '$650',
    tagline: 'Consistent social content.',
    features: [
      '60 sec recap',
      'Crowd highlights + venue atmosphere',
      'Delivered in one format',
    ],
    icon: Users,
  },
  {
    name: 'Signature Event Film',
    price: '$1000',
    tagline: 'Define your biggest nights.',
    popular: true,
    features: [
      '75–120 sec recap',
      'Build-up + drop moments',
      'Crowd energy + house branding',
      '1 teaser clip',
      'Delivered in one format',
    ],
    icon: Sparkles,
  },
  {
    name: 'Legacy Production',
    price: '$2,000',
    tagline: 'Rush. Formals. Island parties.',
    features: [
      '2 min cinematic recap',
      'Advanced color grade + stylized effects',
      'Full crowd storytelling',
      '2 teaser clips',
      'Cover photo + thumbnail export',
      'Delivered in one format',
    ],
    icon: Building2,
  },
];

const addOns = [
  { label: 'Both vertical + horizontal formats', price: '+$150' },
  { label: '24-hour turnaround', price: '+$200' },
  { label: 'Extra event hours (after 5 hrs)', price: '+$100/hr' },
  { label: 'Travel beyond 15 mi from Tuscaloosa', price: '$1/mile' },
  { label: 'Flights for out-of-state', price: 'Client-covered' },
];

const included = [
  'Any format, any song',
  '1 week turnaround (latest)',
  'Full coverage — up to 5 hours',
  'Multiple revisions included',
  'Pro color grading + sound design',
  'Song approved before edit begins',
];

/* ── PACKAGE CARD (mobile-first) ── */

function PackageCard({ pkg, index, onInquire }) {
  return (
    <div
      className={`pkg-card relative flex flex-col bg-zinc-900/60 backdrop-blur-sm border rounded-2xl p-5 sm:p-7 transition-colors duration-500 ${pkg.popular ? 'border-white/20 ring-1 ring-white/10' : 'border-zinc-800'}`}
      style={{ animation: `cardFadeIn 0.5s ease-out ${index * 0.12}s both` }}
    >
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-white text-black text-[10px] font-bold tracking-widest uppercase rounded-full">
          Popular
        </div>
      )}

      {/* Header row: name + price side by side on mobile */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700 shrink-0">
            <pkg.icon size={16} className="text-zinc-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-white leading-tight">{pkg.name}</h3>
            <p className="text-zinc-500 text-xs mt-0.5 italic">{pkg.tagline}</p>
          </div>
        </div>
        <span className="text-2xl sm:text-3xl font-bold tracking-tighter text-white shrink-0">{pkg.price}</span>
      </div>

      {/* Features */}
      <ul className="space-y-2 flex-1">
        {pkg.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-zinc-300 text-[13px] leading-snug">
            <Check size={14} className="text-white mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onInquire}
        className="mt-5 w-full py-2.5 rounded-full font-medium text-[13px] tracking-wide text-center transition-all duration-300 border border-zinc-700 text-white active:bg-white active:text-black hover:bg-white hover:text-black"
      >
        Inquire
      </button>
    </div>
  );
}

/* ── MAIN COMPONENT ── */

export default function Events() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const packagesRef = useRef(null);
  const [activeTab, setActiveTab] = useState('org');
  const [cardKey, setCardKey] = useState(0);

  useEffect(() => {
    document.title = 'Event Packages | Camick';

    const ctx = gsap.context(() => {
      // Hero — snappy on mobile
      const tl = gsap.timeline();
      tl.fromTo('.events-hero-line-1',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 }
      )
      .fromTo('.events-hero-sub',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.events-hero-badge',
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo('.hero-scroll-hint',
        { y: -5, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );

      // Scroll-hint pulse
      gsap.to('.hero-scroll-hint', {
        y: 6, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut',
      });

      // Included pills
      gsap.fromTo('.included-pill',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: '.included-section', start: 'top 85%' },
        }
      );

      // Add-on rows
      gsap.fromTo('.addon-row',
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.addons-section', start: 'top 85%' },
        }
      );

      // Section headers
      gsap.utils.toArray('.section-header').forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );
      });

      // CTA
      gsap.fromTo('.cta-block',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-section', start: 'top 85%' },
        }
      );

    }, containerRef);

    return () => {
      ctx.revert();
      document.title = 'Camick Portfolio';
    };
  }, []);

  const handleTabSwitch = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setCardKey(prev => prev + 1); // force remount for fresh CSS animation
  };

  const packages = activeTab === 'personal' ? personalPackages : orgPackages;

  return (
    <main ref={containerRef} className="bg-[#0a0a0a] text-zinc-50 min-h-screen selection:bg-white/20 font-sans overflow-x-hidden">

      {/* Card fade-in keyframe */}
      <style>{`
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Back Button — smaller on mobile */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-4 md:left-12 z-50 flex items-center gap-1.5 px-4 py-2 bg-black/50 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300"
      >
        <ArrowLeft size={14} />
        <span className="font-medium tracking-wide text-xs">BACK</span>
      </button>

      {/* ─── HERO (shorter on mobile so content is immediately reachable) ─── */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex flex-col justify-center items-center px-5 text-center pt-16 pb-12">
        <div className="z-10 max-w-4xl">
          <div className="overflow-hidden">
            <h1 className="events-hero-line-1 text-[22vw] sm:text-[14vw] md:text-[10vw] leading-[0.88] font-bold tracking-tighter">
              EVENTS
            </h1>
          </div>
          <p className="events-hero-sub text-zinc-400 text-sm sm:text-base md:text-lg mt-6 max-w-lg mx-auto leading-relaxed font-light">
            Covering any and every type of event you wish you could live twice.
          </p>
          <div className="events-hero-badge mt-5 inline-flex items-center gap-2 px-4 py-2 border border-zinc-700/80 rounded-full text-xs sm:text-sm text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Tuscaloosa, AL — Travel Available
          </div>
          <div className="mt-8">
            <button
              onClick={() => packagesRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="events-hero-badge inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium text-sm active:scale-95 hover:scale-105 transition-transform duration-300"
            >
              <span>See Packages</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll-hint absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-zinc-600">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown size={14} />
        </div>

        {/* Background Video */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105">
            <source src="/assets/events.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED — compact pill layout ─── */}
      <section className="included-section py-12 sm:py-20 px-5 md:px-12 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-header text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-2 text-center">
            INCLUDED WITH <span className="text-zinc-500">EVERY PACKAGE</span>
          </h2>
          <p className="text-zinc-600 text-center text-xs sm:text-sm mb-8">
            No hidden fees. This is the baseline.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {included.map((item, i) => (
              <span key={i} className="included-pill inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/70 border border-zinc-800/60 rounded-full text-zinc-300 text-xs font-medium">
                <Check size={12} className="text-white shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES — tabbed ─── */}
      <section ref={packagesRef} className="packages-section relative py-12 sm:py-20 px-5 md:px-12 border-t border-zinc-900 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105">
            <source src="/assets/events_2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="section-header text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter mb-8 text-center">
            CHOOSE YOUR <span className="text-zinc-500">PACKAGE</span>
          </h2>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-zinc-900 border border-zinc-800 rounded-full p-1">
              <button
                onClick={() => handleTabSwitch('personal')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeTab === 'personal'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Music size={14} />
                <span>Personal</span>
              </button>
              <button
                onClick={() => handleTabSwitch('org')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeTab === 'org'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Building2 size={14} />
                <span>Organization</span>
              </button>
            </div>
          </div>

          {/* Tab description */}
          <p className="text-center text-zinc-500 text-xs mb-6">
            {activeTab === 'personal'
              ? 'For DJs, artists, hosts & performers'
              : 'For fraternities, venues & social events'}
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {packages.map((pkg, i) => (
              <PackageCard key={`${activeTab}-${cardKey}-${i}`} pkg={pkg} index={i} onInquire={() => navigate('/contact')} />
            ))}
          </div>

          {/* Retainer banner */}
          <div
            className="mt-5 w-full bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl px-5 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
            style={{ animation: 'cardFadeIn 0.5s ease-out 0.4s both' }}
          >
            <p className="text-zinc-300 text-sm sm:text-base font-medium leading-snug">
              Want to work with me long term? <span className="text-zinc-500">I offer discounts to retainer clients.</span>
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="shrink-0 px-6 py-2.5 bg-white text-black rounded-full font-medium text-xs sm:text-sm tracking-wide active:scale-95 hover:scale-105 transition-transform duration-300"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </section>

      {/* ─── ADD-ONS — compact rows ─── */}
      <section className="addons-section py-12 sm:py-20 px-5 md:px-12 border-t border-zinc-900">
        <div className="max-w-xl mx-auto">
          <h2 className="section-header text-2xl sm:text-3xl font-bold tracking-tighter mb-6 text-center">
            ADD-ONS
          </h2>

          <div className="space-y-2">
            {addOns.map((addon, i) => (
              <div key={i} className="addon-row flex items-center justify-between gap-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl px-4 py-3">
                <span className="text-zinc-300 text-xs sm:text-sm font-medium leading-snug">{addon.label}</span>
                <span className="text-white font-bold text-xs sm:text-sm whitespace-nowrap">{addon.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-zinc-900/40 border border-zinc-800/50 rounded-xl px-4 py-3">
            <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed text-center">
              <span className="text-zinc-400 font-medium">Note:</span> Song must be approved before editing begins. No changes once approved.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-section py-16 sm:py-24 px-5 md:px-12 border-t border-zinc-800">
        <div className="cta-block max-w-xl mx-auto text-center">
          <h2 className="text-[10vw] sm:text-[6vw] md:text-[4vw] font-bold tracking-tighter leading-none mb-4">
            LET'S BOOK IT.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-sm mx-auto mb-8 leading-relaxed">
            Ready to elevate your next event?
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-black rounded-full font-medium text-sm active:scale-95 hover:scale-105 transition-transform duration-300"
          >
            <Mail size={18} />
            <span>Get In Touch</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-zinc-600 text-xs">
        <p>© {new Date().getFullYear()} David Camick. All rights reserved.</p>
      </footer>
    </main>
  );
}

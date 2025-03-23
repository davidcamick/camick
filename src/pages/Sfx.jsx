import React, { useRef, useState, useEffect } from 'react';
import { Lights } from '../components/lights';
import { ScrollProgress } from '../components/scroll-progress';
import { AuroraText } from '../components/aurora-text';
import { TextGenerateEffect } from '../components/text-generate-effect';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const WordAnimation = ({ words, className = "" }) => {
  const wordsArray = typeof words === 'string' ? words.split(" ") : words;
  
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {wordsArray.map((word, i) => {
        if (React.isValidElement(word)) {
          return React.cloneElement(word, {
            key: i,
            style: {
              opacity: 0,
              y: 20,
              ...word.props.style
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              duration: 0.5,
              delay: i * 0.1
            }
          });
        }
        
        return (
          <motion.span
            key={i}
            className={`${className} inline-block`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};

// Feature card component for sound effect categories
const SfxFeatureCard = ({ title, description, icon }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-50/10 rounded-xl p-6 hover:border-zinc-50/20 hover:bg-zinc-800/60 transition-all duration-300"
    >
      <div className="text-[#51BBFE] mb-4 text-4xl">{icon}</div>
      <h3 className="text-[#EFF9F0] text-xl font-bold mb-2">{title}</h3>
      <p className="text-[#EFF9F0]/70">{description}</p>
    </motion.div>
  );
};

// Testimonial component for social proof
const Testimonial = ({ quote, author, role, instagramLink }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-50/10 rounded-xl p-6 italic relative"
    >
      <p className="text-[#EFF9F0]/80 mb-4">"{quote}"</p>
      <div className="text-[#EFF9F0] font-bold">{author}</div>
      <div className="text-[#EFF9F0]/60 text-sm">{role}</div>
      {instagramLink && (
        <a 
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 text-[#EFF9F0]/60 hover:text-[#EFF9F0] transition-colors"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `instagram://user?username=${instagramLink.split('/').pop()}`;
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      )}
    </motion.div>
  );
};

export default function Sfx() {
  const textContentRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const pricingRef = useRef(null);

  const { scrollY } = useScroll();
  
  // Transform values for Y axis
  const headingY = useTransform(scrollY, [0, 1000], [0, -100]);
  const descriptionY = useTransform(scrollY, [0, 1000], [0, -85]);
  const contentY = useTransform(scrollY, [0, 1000], [0, -70]);
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" });

  const [playingTrack, setPlayingTrack] = useState(null);
  const audioRef = useRef(null);

  const handlePlayTrack = (track) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (playingTrack === track.file) {
      setPlayingTrack(null);
    } else {
      const audio = new Audio(track.file);
      audioRef.current = audio;
      audio.play();
      setPlayingTrack(track.file);
      
      audio.onended = () => {
        setPlayingTrack(null);
      };
    }
  };

  // Fix the corrupted useEffect
  useEffect(() => {
    document.title = 'Camick SFX Pack';
    return () => {
      document.title = 'Camick Portfolio';
    };
  }, []);

  return (
    <main className="bg-black w-full min-h-screen relative">
      <ScrollProgress />
      <div className="w-full relative bg-grid-white px-4">
        <div className="relative z-[1] flex flex-col items-center">
          <motion.div 
            className="h-screen flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center px-4 mb-6"
            >
              <AuroraText className="text-5xl sm:text-6xl font-display font-bold [text-shadow:_0_0_30px_rgb(255_255_255_/_20%)]">
                Don't Strive to just Fit In.
              </AuroraText>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-[#EFF9F0]/90 text-2xl sm:text-3xl text-center px-4"
            >
              Because your Videos should Stand Out
            </motion.div>
          </motion.div>

          {/* Scroll Content Section */}
          <div className="mt-[-20vh] space-y-32">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-full max-w-3xl mx-auto text-center px-4 space-y-4"
            >
              <p className="text-2xl text-[#EFF9F0]/90">
                Introducing the
              </p>
              <AuroraText className="text-4xl sm:text-5xl font-display font-bold">
                Camick SFX Pack
              </AuroraText>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 mb-8"
              >
                <img 
                  src="https://camick.org/assets/sfxpack1.webp"
                  alt="Camick SFX Pack" 
                  className="w-full max-w-2xl mx-auto rounded-xl shadow-2xl"
                />
              </motion.div>

              <p className="text-xl sm:text-2xl leading-relaxed text-[#EFF9F0]/90 mt-8">
                The highest rated and most reccomended sfx pack in the Event Videography Space
              </p>
              <div className="mt-4">
                <a href="https://payhip.com/b/cMQWK" 
                   className="payhip-buy-button" 
                   data-theme="grey" 
                   data-product="cMQWK"
                >
                  Purchase Now
                </a>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-full max-w-4xl mx-auto text-center px-4"
            >
              <div className="flex flex-col items-center gap-4 text-[#EFF9F0]/90">
                <p className="text-xl sm:text-2xl">
                  the Camick SFX pack has over
                </p>
                <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  3,000+ SFX
                </span>
                <span className="text-xl">That's 3.5GB of Professional Audio</span>
                <span className="text-base opacity-75">All organized into folders and subfolders</span>
              </div>
            </motion.div>

            {/* George Lucas quote section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-full max-w-3xl mx-auto text-center px-4 space-y-8"
            >
              <div className="space-y-2">
                <p className="text-xl sm:text-2xl text-[#EFF9F0]/90">
                  George Lucas Said that
                </p>
                <p className="text-2xl sm:text-3xl text-[#EFF9F0] font-bold italic">
                  "Sound is half of the picture..."
                </p>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 mb-8"
              >
                <img 
                  src="https://camick.org/assets/sfxpack2.png"
                  alt="SFX Pack Preview" 
                  className="w-full max-w-2xl mx-auto rounded-xl shadow-2xl"
                />
              </motion.div>

              <p className="text-xl sm:text-2xl text-[#EFF9F0]/90">
                without sound you are only at half your potential
              </p>
            </motion.div>

            {/* Rest of the content remains unchanged */}
          </div>

          {/* Updated Features Section */}
          <motion.div 
            ref={featuresRef}
            style={{ translateY: contentY }}
            className="w-full mt-[20vh] px-4 relative z-10" // Added 20vh top margin
          >
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-display font-bold text-[#EFF9F0] text-center mb-16"
            >
              A Premium pack with Premium Features
            </motion.h2>

            {/* Updated Feature Cards */}
            <div className="grid grid-cols-1 gap-4">
              <SfxFeatureCard 
                title="Versatile Formats" 
                description="All files available in both .wav and .mp3 formats for maximum flexibility."
                icon="🎵"
              />
              <SfxFeatureCard 
                title="Fully Compatible" 
                description="Works seamlessly with Premiere Pro, After Effects, CapCut, Final Cut Pro, DaVinci Resolve, and more!"
                icon="🛠"
              />
              <SfxFeatureCard 
                title="Sports Collection" 
                description="Exclusive mic'd up audio from top-tier Football and Basketball games."
                icon="🏈"
              />
              <SfxFeatureCard 
                title="Pro Approved" 
                description="Highly praised by professional sports videographers worldwide."
                icon="⭐"
              />
            </div>
          </motion.div>

          {/* Updated CTA Section before Pricing */}
          <motion.div 
            style={{ translateY: contentY }}
            className="w-full mt-16 px-4 text-center"
          >
            <div className="max-w-2xl mx-auto">
              <TextGenerateEffect 
                words="But don't take my word for it. Hear some of the included sounds for yourself"
                className="text-xl leading-relaxed text-[#EFF9F0]/90"
                delay={0.3}
              />
            </div>
          </motion.div>

          {/* Audio Sample Demo Section - Mobile Optimized */}
          <motion.div 
            style={{ translateY: contentY }}
            className="w-full mt-16 px-4 relative z-10 bg-zinc-900/30 backdrop-blur-md border border-white/10 rounded-lg p-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display font-bold text-[#EFF9F0] mb-2">Listen to Samples</h2>
              <p className="text-[#EFF9F0]/60 text-sm">Tap to preview our premium effects</p>
            </div>
            
            {/* Mobile-optimized track list */}
            {[
              { name: 'Bang Bang Curry', duration: '0:14', file: 'https://camick.org/assets/demosfx/Bang Bang Curry.wav' },
              { name: 'Slam Dunk 4 - Crowd Reax', duration: '0:08', file: 'https://camick.org/assets/demosfx/Slam Dunk 4 - Crowd Reax.wav' },
              { name: 'Woosh for Big Hits', duration: '0:03', file: 'https://camick.org/assets/demosfx/Woosh for Big Hits.wav' }
            ].map((track, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handlePlayTrack(track)}
                className="flex items-center gap-3 mb-4 p-3 bg-black/30 rounded-lg border border-white/5 hover:border-white/20 transition-all active:scale-98 touch-manipulation cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm">
                  {playingTrack === track.file ? '■' : '▶'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#EFF9F0] font-medium text-sm truncate">{track.name}</div>
                  <div className="text-[#EFF9F0]/40 text-xs">{track.duration}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials - Single Column for Mobile */}
          <motion.div 
            ref={testimonialsRef}
            style={{ translateY: contentY }}
            className="w-full mt-16 px-4 relative z-10"
          >
            <div className="space-y-3 text-center mb-12">
              <motion.h2 
                className="text-2xl font-display font-bold text-[#EFF9F0]"
              >
                <WordAnimation words={"What Creators Say"} />
              </motion.h2>
            </div>
            
            {/* Single column grid with smaller gap */}
            <div className="grid grid-cols-1 gap-4">
              <Testimonial 
                quote="This pack is just absolutely amazing. It literally has everything you need for cinematic content, sports or outside of that. I really recommend this sfx pack, you will not be dissapointed."
                author="Xavier D."
                role="Verified Buyer"
                instagramLink="https://www.instagram.com/xcancreate/"
              />
              <Testimonial 
                quote="To all of my videographers and editors in this space, RUN to grab this SFX pack. You don't know how much SFX impact your work until you try to work without them again. David has put together a GREAT product."
                author="ClearCutShotz"
                role="Professional Videographer"
                instagramLink="https://www.instagram.com/clearcutshotz/"
              />
              <Testimonial 
                quote="Yeah, its pretty expensive but it really is an investment. Its crazy how much sounds can impact my videos and I don't even make sports videos and its super amazing still."
                author="Anonymous"
                role="Verified Buyer"
              />
              <Testimonial 
                quote="I don't have to spend hours on finding sounds on YouTube anymore… THIS SAVES TIMEEE"
                author="Arian"
                role="Content Creator"
              />
            </div>
          </motion.div>

          {/* Pricing Section - Mobile Optimized */}
          <motion.div 
            ref={pricingRef}
            style={{ translateY: contentY }}
            className="w-full mt-16 mb-24 px-4 relative z-10"
          >
            <div className="space-y-3 text-center mb-8">
              <motion.h2 
                className="text-3xl font-display font-bold text-[#EFF9F0]"
              >
                <AuroraText>Ready to Level Up Your Content?</AuroraText>
              </motion.h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={pricingInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 
                border border-white/20 rounded-lg overflow-hidden backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-[#51BBFE]/20 rounded-full text-[#51BBFE] font-medium text-xs mb-4">
                  ON SALE NOW
                </div>
                <h3 className="text-2xl font-bold text-[#EFF9F0] mb-2">Camick SFX Pack</h3>
                <ul className="space-y-2 text-left mb-6 text-sm">
                  <li className="flex items-center gap-2 text-[#EFF9F0]/80">
                    <span className="text-[#51BBFE]">✓</span> 3,000+ Professional Sound Effects
                  </li>
                  <li className="flex items-center gap-2 text-[#EFF9F0]/80">
                    <span className="text-[#51BBFE]">✓</span> 3.5GB of High-Quality Audio
                  </li>
                  <li className="flex items-center gap-2 text-[#EFF9F0]/80">
                    <span className="text-[#51BBFE]">✓</span> Compatible with All Major Editing Software
                  </li>
                  <li className="flex items-center gap-2 text-[#EFF9F0]/80">
                    <span className="text-[#51BBFE]">✓</span> Organized into Clear Categories
                  </li>
                  <li className="flex items-center gap-2 text-[#EFF9F0]/80">
                    <span className="text-[#51BBFE]">✓</span> Instant Digital Download
                  </li>
                </ul>
                <a 
                  href="https://payhip.com/b/cMQWK"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="block w-full px-6 py-4 bg-[#51BBFE] hover:bg-[#51BBFE]/90 text-black font-bold rounded-lg transition-all duration-300 shadow-lg shadow-[#51BBFE]/20 active:scale-98 touch-manipulation text-base text-center"
                >
                  Go To Product Page
                </a>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Background elements */}
      <div className={'absolute bottom-0 left-0 w-full h-full z-0 animate-appear opacity-0'}>
        <Lights />
      </div>
    </main>
  );
}

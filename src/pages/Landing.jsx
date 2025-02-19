import React, { useEffect, useRef } from 'react';
import { NavBar } from '../components/nav';
import { Lights } from '../components/lights';
import { ScrollProgress } from '../components/scroll-progress';
import { AuroraText } from '../components/aurora-text';
import { TextGenerateEffect } from '../components/text-generate-effect';
import { PortfolioCard } from '../components/portfolio-card';
import FeaturesGrid from '../components/features-grid';  // Changed from named import
import { motion, useScroll, useTransform } from 'framer-motion';
import DarkStats from "../components/dark-stats";
import { useNavigate } from 'react-router-dom';  // Replace next/router import

export default function Landing() {
  const navigate = useNavigate();  // Replace useRouter
  const textContentRef = useRef(null);
  const descriptionRef = useRef(null);

  const updateWidth = () => {
    if (textContentRef.current && descriptionRef.current) {
      const width = textContentRef.current.getBoundingClientRect().width - 4.47;
      descriptionRef.current.style.width = `${width}px`;
      descriptionRef.current.style.transform = `translateX(6.47px)`;
    }
  };

  useEffect(() => {
    // Initial update
    updateWidth();

    // Update after window loads
    window.addEventListener('load', updateWidth);

    // Update after fonts load
    document.fonts.ready.then(updateWidth);

    // Update after a short delay (backup)
    const timeoutId = setTimeout(updateWidth, 100);

    return () => {
      window.removeEventListener('load', updateWidth);
      clearTimeout(timeoutId);
    };
  }, []);

  const { scrollY } = useScroll();
  
  // Transform values for Y axis only - reduced parallax intensity
  const headingY = useTransform(scrollY, [0, 1000], [0, -100]);
  const welcomeY = useTransform(scrollY, [0, 1000], [0, -85]);
  const portfolioY = useTransform(scrollY, [0, 1000], [0, -50]);
  const contentY = useTransform(scrollY, [0, 1000], [0, -70]); // Added for content sections
  const impactY = useTransform(scrollY, [0, 1000], [0, -110]); // Reduced from -150
  
  // Opacity animation adjusted to align with scroll position
  const impactOpacity = useTransform(
    scrollY,
    [300, 400], // Tighter range for fade in
    [0, 1]
  );

  return (
    <main className="bg-black w-full min-h-screen relative">
      <ScrollProgress />
      <div className="w-full h-[4000px] relative bg-grid-white px-4"> {/* Fixed background class */}
        <div className="relative z-[1] mt-[30vh] flex flex-col items-center">
          <motion.h1 
            style={{ 
              translateY: headingY,
              translateX: '6.47px' // Lock X transform
            }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div ref={textContentRef} className="flex items-center gap-4">
              <span className="text-9xl font-display font-bold text-[#EFF9F0] opacity-0 animate-fade-in">
                Hi,
              </span>
              <AuroraText className="text-9xl font-display font-bold [text-shadow:_0_0_30px_rgb(255_255_255_/_20%)] opacity-0 animate-fade-in-delayed">
                I'm David
              </AuroraText>
            </div>
          </motion.h1>
          <motion.div 
            ref={descriptionRef} 
            style={{ 
              translateY: welcomeY,
              translateX: '6.47px' // Lock X transform
            }}
            className="text-left mb-64 relative" // added relative positioning
          >
            <div className="pr-[calc(190px+3rem)]"> {/* Increased padding from 1.5rem to 3rem */}
              <TextGenerateEffect 
                words="Welcome to My Portfolio! You can scroll down to learn more about me and see my work!"
                className="text-xl leading-relaxed"
                delay={1.4}
              />
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }} // increased delay to wait for text animation
              onClick={() => navigate('/hireme')}  // Replace router.push
              className="absolute right-0 top-0 px-6 py-3 
                bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 
                border border-white/20 rounded-lg text-[#EFF9F0] hover:bg-white/10 
                transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]
                animate-gradient-x bg-[length:200%_100%]"
            >
              Cover Video + Resume 2025
            </motion.button>
          </motion.div>
          <motion.div 
            style={{ translateY: portfolioY }}
            className="w-full flex items-center px-20 mt-32" // Added top margin to lower initial position
          >
            <motion.div 
              style={{ translateY: contentY }} 
              className="w-1/2 flex justify-end opacity-0 animate-fade-in-more-delayed pr-20"
            >
              <PortfolioCard />
            </motion.div>
            <motion.div 
              style={{ translateY: contentY }}
              className="w-1/2 flex flex-col opacity-0 animate-fade-in-more-delayed"
            >
              <span className="text-[#EFF9F0]/80 text-2xl mb-2">
                I specialize in
              </span>
              <motion.div
                style={{ 
                  translateY: impactY,
                  opacity: impactOpacity,
                }}
                className="relative z-10 mt-24 -mb-4" // Added negative margin bottom
              >
                <AuroraText className="text-[8.5rem] leading-[0.9] font-display font-bold"> {/* Reduced leading */}
                  High Impact
                </AuroraText>
              </motion.div>
              <span className="text-[#EFF9F0]/80 text-2xl mt-2">
                Sports Videography, using Sony Alpha Series cameras and glass.
              </span>
            </motion.div>
          </motion.div>
        </div>

        <DarkStats />

        {/* Updated Features Grid section */}
        <motion.div 
          style={{ translateY: contentY }}
          className="w-full mt-32 px-8 max-w-7xl mx-auto relative z-10" // Added z-index
        >
          <div className="space-y-4 text-center mb-24">
            <motion.h2 
              className="text-4xl font-display font-bold text-[#EFF9F0] flex items-center justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              See my <AuroraText>Impact</AuroraText> for yourself
            </motion.h2>
            <motion.p
              className="text-[#EFF9F0]/60 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Check out some of my favorite videos, along with my cover video for 2025
            </motion.p>
          </div>
          <FeaturesGrid />
        </motion.div>

        {/* Keep existing footer elements */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 pb-8 z-40"> {/* Changed from z-50 */}
          <NavBar tabs={['About Me', 'My Achievements', 'My Work', 'Contact']} />
        </div>
        <div className={'absolute bottom-0 left-0 w-full h-full z-0 animate-appear opacity-0'}>
          <Lights />
        </div>
      </div>
    </main>
  );
}

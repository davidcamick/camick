import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { NavBar } from '../components/nav';
import { Lights } from '../components/lights';
import { ScrollProgress } from '../components/scroll-progress';
import { AuroraText } from '../components/aurora-text';
import { TextGenerateEffect } from '../components/text-generate-effect';
import { PortfolioCard } from '../components/portfolio-card';
import FeaturesGrid from '../components/features-grid';  // Changed from named import
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import DarkStats from "../components/dark-stats";
import { useNavigate } from 'react-router-dom';  // Replace next/router import
// Remove the direct import of AnimatedTestimonials
const AnimatedTestimonials = lazy(() => import('../components/animated-testimonials'));

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
  const statsY = useTransform(scrollY, [0, 1000], [0, -150]); // Increased from -40 to -150
  
  // Opacity animation adjusted to align with scroll position
  const impactOpacity = useTransform(
    scrollY,
    [300, 400], // Tighter range for fade in
    [0, 1]
  );

  // Add this ref and hook near your other refs
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const testimonialsRef = useRef(null);
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });

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
              <div className="transition-transform duration-300 hover:scale-105">
                <PortfolioCard />
              </div>
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

        {/* Added extra margin-top here */}
        <div ref={statsRef} className="mt-[30vh]">
          <DarkStats titleInView={statsInView} transformY={statsY} />
        </div>

        {/* Updated Features Grid section */}
        <motion.div 
          style={{ translateY: contentY }}
          className="w-full mt-32 px-8 max-w-7xl mx-auto relative z-10" // Added z-index
        >
          <div className="space-y-4 text-center mb-24">
            <motion.h2 
              className="text-4xl font-display font-bold text-[#EFF9F0] flex items-center justify-center gap-3"
            >
              <WordAnimation words={["See", "my", <AuroraText>Impact</AuroraText>, "for", "yourself"]} />
            </motion.h2>
            <div className="text-[#EFF9F0]/60 text-lg">
              <WordAnimation 
                words="Check out some of my favorite videos, along with my cover video for 2025" 
              />
            </div>
          </div>
          <div className="transition-transform duration-300 hover:scale-[1.02]">
            <FeaturesGrid />
          </div>
        </motion.div>

        {/* After FeaturesGrid */}
        <motion.div 
          ref={testimonialsRef}
          style={{ translateY: contentY }}
          className="w-full mt-32 relative z-10"
        >
          <div className="space-y-4 text-center mb-12">
            <motion.h2 
              className="text-4xl font-display font-bold text-[#EFF9F0] flex items-center justify-center"
            >
              <WordAnimation 
                words={["My", "Clients", "Feel", "The", <AuroraText>Impact</AuroraText>, "Too"]} 
                className="mx-0.5"
              />
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="transition-transform duration-300 hover:scale-[1.02]"
          >
            <Suspense fallback={
              <div className="h-[600px] w-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <AnimatedTestimonials />
            </Suspense>
          </motion.div>
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

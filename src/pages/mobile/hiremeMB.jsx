import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuroraText } from '../../components/aurora-text';
import { useNavigate } from 'react-router-dom';
import { Lights } from '../../components/lights';
import { ScrollProgress } from '../../components/scroll-progress';

export default function HireMeMobile() {
  const navigate = useNavigate();
  
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  const videoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.8
      }
    }
  };

  useEffect(() => {
    document.title = 'Hire Me | Camick Portfolio';
    return () => {
      document.title = 'Camick Portfolio';
    };
  }, []);

  return (
    <main className="bg-black min-h-screen text-[#EFF9F0] px-4 py-16 relative">
      <ScrollProgress />
      <motion.button
        onClick={() => navigate('/mobile')}
        className="absolute top-8 left-4 px-4 py-2 
          bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 
          border border-white/20 rounded-lg text-[#EFF9F0] hover:bg-white/10 
          transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]
          animate-gradient-x bg-[length:200%_100%] z-50"
      >
        ← Back
      </motion.button>
      
      <div className={'absolute bottom-0 left-0 w-full h-full z-[-1] animate-appear opacity-0'}>
        <Lights />
      </div>
      
      <div className="max-w-lg mx-auto relative z-10 pt-16">
        {/* Animated Header - Vertically Stacked */}
        <div className="text-4xl font-display font-bold text-center mb-8">
          <AuroraText>Ready to make an Impact?</AuroraText>
        </div>

        {/* Video Section - Full Width */}
        <motion.div 
          variants={videoVariants}
          initial="hidden"
          animate="visible"
          className="w-full aspect-video bg-gray-900/50 rounded-lg mb-8 overflow-hidden"
        >
          <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
            <iframe 
              src="https://player.vimeo.com/video/1068645245?h=3cbbac1d8f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
              style={{position:'absolute', top:0, left:0, width:'100%', height:'100%', pointerEvents: 'auto'}} 
              title="Cover Video 2025"
            />
          </div>
        </motion.div>

        {/* Video Description - Below Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-display font-bold mb-4 [text-shadow:_0_0_30px_rgb(255_255_255_/_20%)]">
            Cover Video - 2025
          </h3>
          <div className="space-y-4 text-[#EFF9F0]/80 text-base leading-relaxed">
            <p className="font-medium">
              Filmed and Produced by David Camick
            </p>
            <p className="italic">
              Featuring: SPX Athletics, Overtime Elite, NCAA Athletes and more.
            </p>
          </div>
        </motion.div>

        {/* Resume Section - Full Width */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display [text-shadow:_0_0_30px_rgb(255_255_255_/_20%)]">
                Resume 2025
              </h2>
              <a 
                href="https://docs.google.com/document/d/e/2PACX-1vSAqS8y0QLL9VkIecYTDfw944WoXJRxc9p4vkqdShY5XhDKt578pBfwQ7fYPpmGm1GZ4HS5RVUxzRYS/pub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 bg-white/5 rounded text-sm hover:bg-white/10 
                  transition-all duration-200 backdrop-blur-sm border border-white/10"
              >
                Open in New Tab
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { AuroraText } from '../components/aurora-text';
import { NavBar } from '../components/nav';  // Add this import

export default function HireMe() {
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

  const impactVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.2 },// Much more dramatic scale
    visible: {
      opacity: 1,
      y: [50, -30, 0],
      scale: [0.2, 1.2, 1], // Much more dramatic scale
      rotateZ: [0, -10, 0], // Add slight rotation for more punch
      transition: {
        duration: 0.8,
        times: [0, 2.5, 1],
        delay: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 25 // Much bouncier
      }
    }
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
        delay: 0.8 // Start after text animation
      }
    }
  };

  const words = ['Ready', 'to', 'make', 'an', 'Impact', 'on', 'your', 'business?'];

  return (
    <main className="bg-black min-h-screen text-[#EFF9F0] px-4 py-16 relative"> {/* Added relative */}
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="text-6xl font-display font-bold text-center mb-12 flex flex-wrap justify-center gap-x-4">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={word === 'Impact' ? impactVariants : textVariants}
              initial="hidden"
              animate="visible"
              className={`inline-block [text-shadow:_0_0_30px_rgb(255_255_255_/_20%)] ${
                word === 'Impact' ? 'origin-center relative z-10 flex items-center justify-center' : ''
              }`}
              style={word === 'Impact' ? {
                transformOrigin: 'center center',
                display: 'inline-flex',
                alignItems: 'center'
              } : undefined}
            >
              {word === 'Impact' ? (
                <AuroraText className="inline-block font-bold" style={{ display: 'inline-flex' }}>
                  {word}
                </AuroraText>
              ) : word}
            </motion.span>
          ))}
        </div>

        {/* Animated Video Section with Description */}
        <div className="max-w-[90%] mx-auto flex items-start gap-12">
          <motion.div 
            variants={videoVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 aspect-video bg-gray-900/50 rounded-lg mb-16 overflow-hidden"
          >
            <div className="w-full h-full flex items-center justify-center border border-white/10">
              <span className="text-white/50 font-display text-xl">Cover Video Coming Soon</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="w-1/3 pt-4"
          >
            <h3 className="text-3xl font-display font-bold mb-4 [text-shadow:_0_0_30px_rgb(255_255_255_/_20%)]">
              Cover Video - 2025
            </h3>
            <div className="space-y-4 text-[#EFF9F0]/80 text-lg leading-relaxed">
              <p className="font-medium">
                Filmed and Produced by David Camick
              </p>
              <p className="italic">
                Featuring: SPX Athletics, Overtime Elite, NCAA Athletes and more.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Resume Section - Updated with Google Doc */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-display [text-shadow:_0_0_30px_rgb(255_255_255_/_20%)]">
                Resume 2025
              </h2>
              <a 
                href="https://docs.google.com/document/d/e/2PACX-1vSAqS8y0QLL9VkIecYTDfw944WoXJRxc9p4vkqdShY5XhDKt578pBfwQ7fYPpmGm1GZ4HS5RVUxzRYS/pub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/5 rounded hover:bg-white/10 
                  transition-all duration-200 backdrop-blur-sm border border-white/10"
              >
                Open in New Tab
              </a>
            </div>
            <div className="relative w-full aspect-[8.5/11] bg-black/20 rounded-lg overflow-hidden">
              <iframe
                src="https://docs.google.com/document/d/e/2PACX-1vSAqS8y0QLL9VkIecYTDfw944WoXJRxc9p4vkqdShY5XhDKt578pBfwQ7fYPpmGm1GZ4HS5RVUxzRYS/pub?embedded=true"
                className="w-full h-full absolute inset-0 border-none bg-white"
                title="Resume 2025"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Add NavBar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 pb-8 z-40">
        <NavBar tabs={['About Me', 'My Achievements', 'My Work', 'Contact']} />
      </div>
    </main>
  );
}

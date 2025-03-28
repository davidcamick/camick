import React from 'react';
import { motion } from 'framer-motion';
import { AuroraText } from '../components/aurora-text';

export default function Mobile() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex flex-col justify-center px-8 h-screen">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[5rem] leading-[0.8] font-display font-bold text-[#EFF9F0] mb-4"
        >
          Hi,
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <AuroraText className="text-5xl font-display font-bold [text-shadow:_0_0_30px_rgb(255_255_255_/_20%)] mb-12">
            I'm David
          </AuroraText>
        </motion.div>

        <div className="flex flex-col gap-2 mt-8 items-end text-right">
          <div className="flex flex-col gap-2">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-[#EFF9F0]/80 text-xl relative w-full"
            >
              I specialize in
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="relative w-full"
            >
              <AuroraText className="text-4xl font-display font-bold [text-shadow:_0_0_30px_rgb(255_255_255_/_20%)]">
                High Impact
              </AuroraText>
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="text-[#EFF9F0]/80 text-xl mb-8 relative w-full"
            >
              Sports Videography
            </motion.span>
          </div>

          <div className="relative w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1,
                y: 0,
                x: [0, 1000],
                transition: {
                  opacity: { duration: 0.5, delay: 0.5 },
                  y: { duration: 0.5, delay: 0.5 },
                  x: { duration: 1, delay: 2.5, ease: "easeInOut" }
                }
              }}
              className="w-full aspect-[2/3] bg-zinc-900 rounded-xl overflow-hidden"
            >
              <img 
                src="/assets/david_ote1.jpeg" 
                alt="Portfolio Preview"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -1000 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 1,
                  delay: 2.5,
                  ease: "easeInOut"
                }
              }}
              className="absolute top-0 left-0 w-full aspect-[2/3] flex flex-col items-center justify-center"
            >
              <motion.div className="w-[90%] h-[45%] mb-4 bg-zinc-900/60 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <button
                  className="w-full h-full text-[#EFF9F0] text-xl flex flex-col justify-center items-start px-8"
                  onClick={() => window.location.href = '/hireme'}
                >
                  <div className="flex items-center">
                    <span className="text-[#EFF9F0]/70">My</span>
                    <AuroraText className="text-4xl font-bold ml-2">Resume</AuroraText>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#EFF9F0]/70">and</span>
                    <AuroraText className="text-4xl font-bold ml-2">Cover&nbsp;Video</AuroraText>
                  </div>
                </button>
              </motion.div>
              
              <motion.div className="w-[90%] h-[45%] bg-zinc-900/60 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                <button
                  className="w-full h-full text-[#EFF9F0] text-2xl flex flex-col justify-center items-end px-8"
                  onClick={() => window.location.href = '/sfx'}
                >
                  <div className="flex items-center">
                    <span className="text-[#EFF9F0]/70">My</span>
                    <AuroraText className="text-4xl font-bold ml-2">Videos</AuroraText>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#EFF9F0]/70">and</span>
                    <AuroraText className="text-4xl font-bold ml-2">Shop</AuroraText>
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

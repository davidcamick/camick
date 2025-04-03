import React from 'react';
import { motion } from 'framer-motion';
import { AuroraText } from '../../components/aurora-text';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();

  return (
    <main className="bg-black min-h-screen text-[#EFF9F0] px-4 py-16 relative">
      <motion.button
        onClick={() => navigate('/linksmobile')}
        className="absolute top-8 left-4 px-4 py-2 
          bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 
          border border-white/20 rounded-lg text-[#EFF9F0] hover:bg-white/10 
          transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]
          animate-gradient-x bg-[length:200%_100%] z-50"
      >
        ← Back
      </motion.button>

      <div className="max-w-lg mx-auto pt-24">
        <div className="text-4xl font-display font-bold text-center mb-12">
          <AuroraText>Contact Me</AuroraText>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
          >
            <h2 className="text-2xl font-display mb-4">Email</h2>
            <a href="mailto:david@camick.org" className="text-[#EFF9F0]/80 hover:text-[#EFF9F0] transition-colors">
              david@camick.org
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
          >
            <h2 className="text-2xl font-display mb-4">Phone</h2>
            <a href="tel:+14047717577" className="text-[#EFF9F0]/80 hover:text-[#EFF9F0] transition-colors">
              (404) 771-7577
            </a>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

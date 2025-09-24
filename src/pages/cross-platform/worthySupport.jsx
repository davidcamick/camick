import React from 'react';
import { motion } from 'framer-motion';
import { AuroraText } from '../../components/aurora-text';

export default function WorthySupport() {
  return (
    <main className="bg-black min-h-screen text-[#EFF9F0] px-4 py-16 relative">
      <div className="max-w-2xl mx-auto pt-24">
        <div className="text-4xl font-display font-bold text-center mb-12">
          <AuroraText>Support</AuroraText>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 text-center"
          >
            <p className="text-[#EFF9F0]/80 text-lg mb-6">
              If assistance is needed or there are any questions about Worthy, please contact:
            </p>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-display mb-2">Email</h2>
                <a 
                  href="mailto:david@camick.org" 
                  className="text-[#EFF9F0] hover:text-blue-400 transition-colors text-xl underline"
                >
                  david@camick.org
                </a>
              </div>
              
              <p className="text-[#EFF9F0]/60 text-sm mt-6">
                Responses are typically provided within 48 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
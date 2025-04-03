import React from 'react';
import { motion } from 'framer-motion';
import { AuroraText } from '../../components/aurora-text';
import { useNavigate } from 'react-router-dom';

export default function LinksMobile() {
  const navigate = useNavigate();
  
  const links = [
    {
      title: "My Instagram",
      url: "https://instagram.com/davidcamick",
      icon: "📸"
    },
    {
      title: "My Cover Video",
      url: "https://vimeo.com/1068645245/3cbbac1d8f",
      icon: "🎥"
    },
    {
      title: "My SFX Pack",
      url: "https://camick.org/sfx",
      icon: "🎵"
    },
    {
      title: "CamStem",
      url: "https://camstem.org",
      icon: "🎓"
    },
    {
      title: "My Contact Info",
      url: "/contact",
      icon: "📬",
      internal: true
    }
  ];

  return (
    <main className="bg-black min-h-screen text-[#EFF9F0] px-4 py-16 relative">
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

      <div className="max-w-lg mx-auto pt-24">
        <div className="text-4xl font-display font-bold text-center mb-12">
          <AuroraText>My Links</AuroraText>
        </div>

        <div className="flex flex-col gap-4">
          {links.map((link, index) => (
            <motion.div
              key={link.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {link.internal ? (
                <button
                  onClick={() => navigate(link.url)}
                  className="w-full p-4 bg-white/5 backdrop-blur-sm rounded-lg 
                    border border-white/10 flex items-center gap-4 hover:bg-white/10 
                    transition-all duration-300"
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="text-lg font-medium">{link.title}</span>
                </button>
              ) : (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-4 bg-white/5 backdrop-blur-sm rounded-lg 
                    border border-white/10 flex items-center gap-4 hover:bg-white/10 
                    transition-all duration-300"
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="text-lg font-medium">{link.title}</span>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

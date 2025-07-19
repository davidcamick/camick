import { motion } from "framer-motion";
import { Play } from "lucide-react";

const FeaturesGrid = () => {
  const handleFishBowlClick = () => {
    // This will open the Google Drive folder for "The Fish Bowl" video
    window.open('https://drive.google.com/drive/folders/1-vkZCEr-ZBd11RWf00TZ2Ih93-DeYGiZ', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <motion.div
          whileHover={{ 
            y: -5,
            scale: 1.02
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFishBowlClick}
          className="relative overflow-hidden h-96 p-8 rounded-xl cursor-pointer
                     transition-all duration-300 bg-cover bg-center
                     bg-[url('/assets/footballend.jpg')]"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
          <div className="absolute inset-0 border border-zinc-50/10 hover:border-zinc-50/20 rounded-xl transition-colors" />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-[#51BBFE]">
                The Fish Bowl
              </h3>
              <p className="text-[#EFF9F0]/90 text-lg leading-relaxed max-w-2xl">
                A hype video made for the largest rivalry in Georgia, Narrated by a former player
              </p>
            </div>
            
            {/* Play button indicator */}
            <div className="flex items-center gap-3 text-[#EFF9F0]/80">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#EFF9F0]/30 bg-[#EFF9F0]/10 backdrop-blur-sm">
                <Play size={20} className="ml-1" />
              </div>
              <span className="text-sm">Click to view video</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturesGrid;

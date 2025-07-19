import { motion } from "framer-motion";

const FishBowlVideo = () => {
  const handleClick = () => {
    window.open('https://drive.google.com/drive/folders/1-vkZCEr-ZBd11RWf00TZ2Ih93-DeYGiZ', '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto mb-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#EFF9F0] mb-2">The Fish Bowl</h3>
        <p className="text-[#EFF9F0]/80">A hype video made for the largest rivalry in Georgia, Narrated by a former player</p>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden border border-zinc-50/10 shadow-2xl cursor-pointer group"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 group-hover:from-black/10 group-hover:to-black/40 transition-all duration-300" />
        <iframe 
          src="https://drive.google.com/file/d/1e3VIqVGylZ9uFqixnaT1X81UvzDLHOsd/preview" 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}} 
          title="The Fish Bowl Video"
          className="rounded-xl pointer-events-none"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="bg-[#51BBFE] text-[#222E50] px-6 py-3 rounded-full font-medium shadow-lg"
          >
            View Full Project
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FishBowlVideo;
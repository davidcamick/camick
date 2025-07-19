import { motion } from "framer-motion";

const CoverVideo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto mb-16"
    >
      <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden border border-zinc-50/10 shadow-2xl">
        <iframe 
          src="https://player.vimeo.com/video/1068645245?h=3cbbac1d8f&badge=0&autopause=0&player_id=0&app_id=58479&loop=1" 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}} 
          title="CAMICK - Cover Video 2025"
          className="rounded-xl"
        />
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </motion.div>
  );
};

export default CoverVideo;
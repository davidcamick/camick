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
          src="https://player.vimeo.com/video/1068645245?h=3cbbac1d8f&autoplay=1&loop=1&title=0&byline=0&portrait=0" 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}} 
          title="My Showreel - Cover Video"
          className="rounded-xl"
        />
      </div>
    </motion.div>
  );
};

export default CoverVideo;
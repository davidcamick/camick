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
          src="https://drive.google.com/file/d/1e3VIqVGylZ9uFqixnaT1X81UvzDLHOsd/preview" 
          frameBorder="0" 
          allow="autoplay; fullscreen; picture-in-picture" 
          style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}} 
          title="The Fish Bowl - Cover Video"
          className="rounded-xl"
        />
      </div>
    </motion.div>
  );
};

export default CoverVideo;
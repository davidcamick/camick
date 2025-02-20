import { motion } from 'framer-motion';
import { AuroraText } from './aurora-text';

export const AnimatedTitle = ({ text, inView }) => {
  return (
    <h2 className="text-4xl font-display font-bold text-[#EFF9F0] flex items-center justify-center gap-3 flex-wrap">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: index * 0.03,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className={char === ' ' ? 'mr-2' : ''}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.5,
          delay: 'And my Impact can be seen in numbers, too.'.length * 0.03
        }}
      >
        <AuroraText>Impact</AuroraText>
      </motion.span>
    </h2>
  );
};

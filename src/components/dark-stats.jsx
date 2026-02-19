'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useTransform } from 'framer-motion'
import { AuroraText } from '../components/aurora-text'

function DarkStats({ titleInView, transformY }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const words = ['And', 'my', 'Impact', 'can', 'be', 'seen', 'in', 'numbers', 'too.'];

  return (
    <motion.section 
      ref={ref} 
      style={{ 
        y: transformY,
        scale: useTransform(transformY, [-150, 0], [0.95, 1]) // Add subtle scale effect
      }}
      className="relative w-full min-w-7xl overflow-hidden px-4 py-24 sm:py-32 flex items-center justify-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div className="text-center mb-10 sm:mb-12 space-y-3 sm:space-y-4">
          <div className="text-6xl font-display font-bold text-center mb-12 flex flex-wrap justify-center gap-x-4">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
              >
                {word === 'Impact' ? (
                  <AuroraText>{word}</AuroraText>
                ) : (
                  <span className="text-[#EFF9F0]">{word}</span>
                )}
              </motion.span>
            ))}
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            My impact goes past the flashy effects and mind-bending animations, It can be seen in the raw stats that my work has produced
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 2, delay: 0.8 }}
          >
            <StatCard endValue={3400000} label="Impressions" prefix="+" triggerAnimation={isInView} duration={4000} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 2, delay: 1.0 }}
          >
            <StatCard endValue={80} label="Average Retention Rate" suffix="%" triggerAnimation={isInView} duration={4000} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 2, delay: 1.2 }}
          >
            <StatCard endValue={300} label="Happy Clients" prefix="+" triggerAnimation={isInView} duration={4000} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

function StatCard({ endValue, label, prefix = "", suffix = "", decimals = 0, triggerAnimation = false, duration = 4000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggerAnimation) return;
    
    let start = 0;
    const end = endValue;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [endValue, triggerAnimation, duration]);

  const formatNumber = (num) => {
    return num.toLocaleString('en-US', { maximumFractionDigits: decimals });
  };

  return (
    <motion.div 
      className="relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative flex flex-col items-center backdrop-blur-xl p-4 sm:p-6 transition duration-300">
        <motion.div 
          className="text-xl sm:text-xl lg:text-3xl font-bold bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text mb-2 sm:mb-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {prefix}{formatNumber(count)}{suffix}
        </motion.div>
        <div className="text-gray-400 text-xs sm:text-sm lg:text-base font-medium text-center">
          {label}
        </div>
      </div>
    </motion.div>
  )
}

export default DarkStats;
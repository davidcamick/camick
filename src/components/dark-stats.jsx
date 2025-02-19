'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AuroraText } from '../components/aurora-text'

function DarkStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative w-full min-w-7xl overflow-hidden px-4 py-24 sm:py-32 flex items-center justify-center"> {/* Increased padding-y */}
      <div className="max-w-6xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 2, delay: 0.5 }} // Increased duration
          className="text-center mb-10 sm:mb-12 space-y-3 sm:space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white flex items-center justify-center gap-3">
            And my <AuroraText>Impact</AuroraText> can be seen in numbers, too.
          </h2>
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
            <StatCard endValue={1500000} label="Impressions" prefix="+" triggerAnimation={isInView} duration={4000} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 2, delay: 1.0 }}
          >
            <StatCard endValue={75} label="Average Retention Rate" suffix="%" triggerAnimation={isInView} duration={4000} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 2, delay: 1.2 }}
          >
            <StatCard endValue={150} label="Happy Clients" prefix="+" triggerAnimation={isInView} duration={4000} />
          </motion.div>
        </div>
      </div>
    </section>
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
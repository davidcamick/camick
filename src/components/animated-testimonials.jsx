import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote: "David's ability to capture the raw emotion and intensity of sports is unmatched. His highlight reels have helped countless athletes in their recruiting journey.",
    name: "Coach Anderson",
    designation: "Head Football Coach, Central High",
    src: "https://images.unsplash.com/photo-1556784344-ad913c73cfc4?q=80&w=3269&auto=format&fit=crop",
  },
  {
    quote: "The quality of video coverage has transformed our athletic program. Parents and scouts alike praise the professional quality of our game footage.",
    name: "Sarah Martinez",
    designation: "Athletic Director, West Valley",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop",
  },
  {
    quote: "As a college recruiter, I can say that David's highlight reels stand out. He captures those crucial moments that really showcase an athlete's potential.",
    name: "Mike Thompson",
    designation: "NCAA D1 Recruiter",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop",
  },
  {
    quote: "His work has been instrumental in our scholarship program. The production quality gives our athletes a competitive edge in recruiting.",
    name: "Lisa Chen",
    designation: "Sports Development Director",
    src: "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?q=80&w=3540&auto=format&fit=crop",
  },
  {
    quote: "Working with David has elevated our game coverage to broadcast quality. His attention to detail and creative vision are exceptional.",
    name: "James Wilson",
    designation: "High School Athletics Coordinator",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop",
  },
];

const AnimatedTestimonials = ({
  autoplay = true
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom">
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="h-full w-full rounded-3xl object-cover object-center"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}>
            <h3 className="text-2xl font-bold text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-neutral-500">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg text-neutral-300 mt-8">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block">
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-neutral-800 flex items-center justify-center group/button">
              <IconArrowLeft
                className="h-5 w-5 text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300"
              />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-neutral-800 flex items-center justify-center group/button">
              <IconArrowRight
                className="h-5 w-5 text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;

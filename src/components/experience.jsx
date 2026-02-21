import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    id: "alabama",
    title: "ALABAMA FOOTBALL",
    subtitle: "Client",
    description: "Gameday videos, recaps, and player highlights.",
    image: "/assets/clients/ALABAMA.jpg",
    color: "from-red-500/20 to-rose-500/20"
  },
  {
    id: "nle",
    title: "NLE CHOPPA",
    subtitle: "Client",
    description: "High-energy concert recaps and behind-the-scenes coverage.",
    image: "/assets/clients/NLE.jpg",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: "overtime",
    title: "OVERTIME",
    subtitle: "Client",
    description: "Fast-paced sports highlights and viral social media content.",
    image: "/assets/clients/OVERTIME.jpg",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: "byx",
    title: "BYX FRATERNITY",
    subtitle: "Client",
    description: "High-energy party and rush videos.",
    image: "/assets/clients/BYX.jpg",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: "shipwrek",
    title: "SHIPWREK DJ",
    subtitle: "Client",
    description: "Festival recaps, tour visuals, and dynamic EDM content.",
    image: "/assets/clients/SHIPWREK.png",
    color: "from-yellow-500/20 to-orange-500/20"
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.exp-card');
      
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, rotation: Math.random() * 10 - 5 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          SELECTED <span className="text-zinc-500">CLIENTS</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          From viral social content to high-energy concert recaps. Here's some of my favorite clients.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {data.map((item, i) => (
          <div 
            key={item.id}
            className="exp-card group relative w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background Image */}
            <img 
              src={item.image} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${hoveredIndex === i ? 'opacity-100' : 'opacity-80'}`} />
            
            {/* Color Tint on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-300 font-medium tracking-widest text-xs uppercase">
                    {item.subtitle}
                  </span>
                  <ArrowUpRight 
                    size={20} 
                    className="text-white opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" 
                  />
                </div>
                
                <h3 className="text-3xl font-bold tracking-tighter text-white mb-4">
                  {item.title}
                </h3>
                
                <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
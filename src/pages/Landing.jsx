import React from 'react';
import { useNavigate } from 'react-router-dom';

// ------------------------------
// Particles Component
// ------------------------------
function Particles() {
  const [elapsed, setElapsed] = React.useState(0);
  const particlesRef = React.useRef([]);
  const mouseRef = React.useRef({ x: -1000, y: -1000 });
  const startTimeRef = React.useRef(Date.now());
  const numParticles = 100; // using 100 particles now

  // Initialize particles only once
  if (particlesRef.current.length === 0) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    particlesRef.current = Array.from({ length: numParticles }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 6 + 6, // size between 6 and 12px
      fadeDelay: Math.random() * 500 + 200, // delay between 200ms and 700ms
      phase: Math.random() * 2 * Math.PI, // random phase for ambient oscillation
    }));
  }

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;
    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      particlesRef.current.forEach((p) => {
        // Mouse repulsion with increased influence radius (200px)
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influenceRadius = 200;
        if (dist < influenceRadius) {
          const force = (influenceRadius - dist) / influenceRadius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.5;
          p.vy += Math.sin(angle) * force * 0.5;
        }
        // Apply friction and update position
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;
        // Wrap around screen edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });
      // Update elapsed time for ambient offset (sped up by 2x using /500)
      setElapsed(Date.now() - startTimeRef.current);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {particlesRef.current.map((p, i) => {
        // Ambient oscillation: using elapsed/500 for 2x speed
        const offsetX = 2 * Math.sin(elapsed / 500 + p.phase);
        const offsetY = 2 * Math.cos(elapsed / 500 + p.phase);
        const baseOpacity = 0.8;
        // Particle fade-in based on its assigned fadeDelay
        const particleOpacity =
          elapsed < p.fadeDelay ? (elapsed / p.fadeDelay) * baseOpacity : baseOpacity;
        return (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x + offsetX}px`,
              top: `${p.y + offsetY}px`,
              opacity: particleOpacity,
            }}
          />
        );
      })}
    </>
  );
}

// ------------------------------
// Landing Component
// ------------------------------
function Landing() {
  const navigate = useNavigate();
  const camickLetters = "CAMICK".split("");

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Gradient Background (z-0) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#669BBC] to-[#003049] z-0"></div>
      
      {/* Particle Layer (above gradient, z-[5]) */}
      <div className="absolute inset-0 z-[5]">
        <Particles />
      </div>
      
      {/* Glass Overlay (above particles, z-[10])
          On mobile, extend to full width */}
      <div
        className="absolute inset-y-4 left-0 right-0 sm:inset-8 bg-white/30 rounded-3xl backdrop-blur-[6px] animate-fadeUp z-[10]"
        style={{ opacity: 0, animationDelay: "0.2s" }}
      ></div>
      
      {/* Main Content (above overlay, z-[20]) */}
      <div className="relative z-[20] text-center px-4">
        {/* "DAVID" Title */}
        <div className="animate-fadeIn" style={{ opacity: 0, animationDelay: "0.3s" }}>
          <h1 className="text-white font-extrabold tracking-wider text-5xl sm:text-6xl md:text-7xl lg:text-[110px]">
            DAVID
          </h1>
        </div>

        {/* "CAMICK" Title with per-letter wrappers */}
        <div className="flex justify-center mt-2">
          {camickLetters.map((letter, index) => (
            <div
              key={index}
              className="animate-fadeSlideDown inline-block"
              style={{ opacity: 0, animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <span
                className="block text-white font-extrabold tracking-wider transition-transform duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-[80px] sm:text-5xl md:text-6xl lg:text-[300px]"
                style={{ fontFamily: 'Montserrat' }}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>

        {/* Category Labels (hidden on mobile) */}
        <div
          className="mt-8 hidden sm:flex justify-center gap-4 animate-slideDown"
          style={{ opacity: 0, animationDelay: "0.7s" }}
        >
          <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">VIDEOGRAPHY</span>
          <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">DEVELOPMENT</span>
          <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">VFX</span>
          <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">GRAPHIC DESIGN</span>
        </div>

        {/* Action Buttons with constant floating animation */}
        <div
          className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 animate-slideDown"
          style={{ opacity: 0, animationDelay: "0.9s" }}
        >
          <button
            onClick={() => navigate("/videography")}
            className="group animate-floating px-8 py-4 bg-white rounded-full text-gray-900 font-bold text-lg sm:text-xl transition transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          >
            <span className="transition-all duration-300">
              MY VIDEOGRAPHY WORK
            </span>
          </button>
          <button
            onClick={() => navigate("/software")}
            className="group animate-floating px-8 py-4 bg-white rounded-full text-gray-900 font-bold text-lg sm:text-xl transition transform duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          >
            <span className="transition-all duration-300">
              SOFTWARE I’VE DEVELOPED
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;

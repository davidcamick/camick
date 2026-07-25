import React, { useEffect, useState } from 'react';
import { useInView } from './useInView';

/**
 * Broadcast stat bug — the graphic that slides over the bottom of a live feed.
 * Counts up once, when it reaches the viewport.
 */
export default function StatBug({ stat, index = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [value, setValue] = useState(0);
  const isFloat = stat.value % 1 !== 0;

  useEffect(() => {
    if (!inView) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(stat.value);
      return undefined;
    }

    const duration = 1500;
    const start = performance.now();
    let frame = 0;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      /* easeOutExpo — fast off the line, long settle, like a counter
         landing on its final figure. */
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(stat.value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, stat.value]);

  return (
    <div
      ref={ref}
      className="hud-brackets relative border-l border-line/50 pl-4 sm:pl-6"
      style={{
        transform: inView ? 'translateX(0)' : 'translateX(-16px)',
        opacity: inView ? 1 : 0,
        transition: `transform 700ms cubic-bezier(0.16,1,0.3,1) ${index * 120}ms, opacity 700ms ease ${index * 120}ms`,
      }}
    >
      <div className="flex items-baseline gap-1">
        <span className="t-display text-[13vw] tabular-nums leading-none sm:text-[7vw] md:text-[4.5vw]">
          {isFloat ? value.toFixed(1) : Math.round(value)}
        </span>
        <span className="t-display text-[5vw] leading-none text-cue sm:text-[3vw] md:text-[1.8vw]">
          {stat.suffix}
        </span>
      </div>
      <p className="t-label mt-3 text-ink">{stat.label}</p>
      <p className="mt-1 text-xs text-muted">{stat.note}</p>
    </div>
  );
}

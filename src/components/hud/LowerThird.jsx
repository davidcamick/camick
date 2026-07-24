import React from 'react';
import { useInView } from './useInView';

/**
 * Broadcast lower-third used as the section header everywhere on the site:
 * a cue bar wipes in, then the track slug and title rise behind it.
 */
export default function LowerThird({ index, track, title, accent, sub, align = 'left' }) {
  const [ref, inView] = useInView();
  const centred = align === 'center';

  return (
    <header
      ref={ref}
      className={`relative ${centred ? 'text-center' : ''}`}
    >
      {/* Cue bar */}
      <div
        className={`mb-3 h-px w-full origin-left bg-cue/70 transition-transform duration-700 ease-hud ${
          inView ? 'scale-x-100' : 'scale-x-0'
        }`}
      />

      <div
        className={`flex items-center gap-3 ${centred ? 'justify-center' : ''}`}
        style={{
          transform: inView ? 'translateY(0)' : 'translateY(12px)',
          opacity: inView ? 1 : 0,
          transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1) 120ms, opacity 600ms ease 120ms',
        }}
      >
        {index != null && (
          <span className="t-mono text-[11px] text-cue">
            {String(index).padStart(3, '0')}
          </span>
        )}
        {track && <span className="t-label text-muted">{track}</span>}
      </div>

      <h2
        className="t-display mt-2 text-[13vw] leading-[0.88] sm:text-[8vw] md:text-[5.2vw]"
        style={{
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          opacity: inView ? 1 : 0,
          transition: 'transform 800ms cubic-bezier(0.16,1,0.3,1) 200ms, opacity 800ms ease 200ms',
        }}
      >
        {title}
        {accent && <span className="text-cue">{accent}</span>}
      </h2>

      {sub && (
        <p
          className={`mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base ${
            centred ? 'mx-auto' : ''
          }`}
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 700ms ease 380ms',
          }}
        >
          {sub}
        </p>
      )}
    </header>
  );
}

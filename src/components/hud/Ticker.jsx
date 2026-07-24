import React from 'react';

/**
 * The scrolling strap along the bottom of a broadcast. Content is duplicated
 * once and translated -50%, which makes the loop seamless at any width.
 */
export default function Ticker({ items, duration = 34, className = '' }) {
  const run = [...items, ...items];

  return (
    <div
      className={`relative flex overflow-hidden border-y border-line/50 bg-panel/40 py-2.5 ${className}`}
      style={{ '--ticker-duration': `${duration}s` }}
    >
      <div className="flex shrink-0 animate-ticker items-center whitespace-nowrap">
        {run.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <span className="t-label px-5 text-muted">{item}</span>
            <span aria-hidden className="h-1 w-1 rotate-45 bg-cue/70" />
          </span>
        ))}
      </div>
      {/* Feathered edges so items enter and leave instead of popping */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgb(var(--rgb-bg)) 0%, transparent 12%, transparent 88%, rgb(var(--rgb-bg)) 100%)',
        }}
      />
    </div>
  );
}

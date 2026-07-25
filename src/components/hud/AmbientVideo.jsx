import React, { useEffect, useRef, useState } from 'react';

/**
 * Background footage that never costs the first paint.
 *
 * The poster renders immediately; the video file is only requested once the
 * browser is idle, and only when the visitor is on a connection and motion
 * setting that warrants it. Mobile gets a much smaller cut than desktop —
 * this is the single biggest win for someone arriving from an Instagram link
 * on cellular.
 */
export default function AmbientVideo({
  mobileSrc,
  desktopSrc,
  poster,
  className = '',
  opacity = 0.35,
}) {
  const videoRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = navigator.connection;
    const frugal =
      conn?.saveData === true || /(^|-)2g$/.test(conn?.effectiveType || '');

    if (reduced || frugal) return undefined;

    const desktop = window.matchMedia('(min-width: 768px)').matches;
    const chosen = desktop ? desktopSrc || mobileSrc : mobileSrc || desktopSrc;
    if (!chosen) return undefined;

    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 400));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const handle = idle(() => setSrc(chosen));
    return () => cancel(handle);
  }, [mobileSrc, desktopSrc]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !src) return;
    /* Autoplay can still be refused (low power mode). The poster stays
       underneath either way, so a rejection is a non-event. */
    el.play().catch(() => {});
  }, [src]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-105 object-cover"
          style={{ opacity }}
        />
      )}
      {src && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          onCanPlay={() => setReady(true)}
          className="absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-1000"
          style={{ opacity: ready ? opacity : 0 }}
        />
      )}
    </div>
  );
}

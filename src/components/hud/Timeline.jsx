import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { formatTimecode, useTimeline } from './useTimeline';

/**
 * The signature interaction: a fixed bottom scrub bar that behaves like a
 * video timeline. Sections are clips; the playhead follows scroll; drag to
 * scrub; tap a clip to cut to it.
 *
 * Lives at the bottom on purpose — that is the thumb zone on a phone, which
 * is where most of this site's traffic lands from an Instagram bio link.
 */
export default function Timeline({ clips }) {
  const ids = useMemo(() => clips.map((c) => c.id), [clips]);
  const { segments, progress, activeIndex, scrubTo, jumpToClip } = useTimeline(ids);
  const trackRef = useRef(null);
  const [scrubbing, setScrubbing] = useState(false);
  const movedRef = useRef(false);

  /* Held back until the visitor actually starts scrolling, so the opening
     frame is just the hero. */
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const onScroll = () => setRevealed(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fractionFromEvent = useCallback((clientX) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || !rect.width) return 0;
    return (clientX - rect.left) / rect.width;
  }, []);

  const onPointerDown = (e) => {
    /* Only hijack the gesture for real drags. A clean tap still falls
       through to the per-clip buttons below. */
    trackRef.current?.setPointerCapture?.(e.pointerId);
    movedRef.current = false;
    setScrubbing(true);
  };

  const onPointerMove = (e) => {
    if (!scrubbing) return;
    movedRef.current = true;
    scrubTo(fractionFromEvent(e.clientX));
  };

  const onPointerUp = (e) => {
    if (!scrubbing) return;
    setScrubbing(false);
    trackRef.current?.releasePointerCapture?.(e.pointerId);
    if (movedRef.current) scrubTo(fractionFromEvent(e.clientX));
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      jumpToClip(Math.min(activeIndex + 1, clips.length - 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      jumpToClip(Math.max(activeIndex - 1, 0));
    }
  };

  const active = clips[activeIndex] || clips[0];

  return (
    <div
      aria-hidden={!revealed}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line/60 bg-bg/85 backdrop-blur-xl transition-[transform,opacity] duration-500 ease-hud ${
        revealed
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-full opacity-0'
      }`}
      style={{ paddingBottom: 'var(--sa-bottom)' }}
    >
      {/* ── Info row ── */}
      <div className="flex items-center justify-between gap-3 px-gutter pt-2 pb-1.5">
        <div className="flex items-center gap-2 shrink-0">
          <span className="anim-rec h-1.5 w-1.5 rounded-full bg-rec" />
          <span className="t-mono text-[11px] tabular-nums text-ink/90">
            {formatTimecode(progress)}
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <span className="t-label text-cue shrink-0">
            {String(activeIndex + 1).padStart(3, '0')}
          </span>
          <span className="t-label truncate text-muted">{active?.label}</span>
        </div>
      </div>

      {/* ── Scrub track ── */}
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label="Scrub through page sections"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-valuetext={active?.label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className="relative flex h-9 touch-none items-stretch gap-[2px] px-gutter pb-2.5 outline-none focus-visible:ring-1 focus-visible:ring-cue"
      >
        {clips.map((clip, i) => (
          <button
            key={clip.id}
            type="button"
            onClick={() => {
              if (!movedRef.current) jumpToClip(i);
            }}
            aria-label={`Go to ${clip.label}`}
            style={{ width: `${segments[i] || 100 / clips.length}%` }}
            className="group relative min-w-[6px] overflow-hidden rounded-hud"
          >
            <span
              className={`absolute inset-x-0 bottom-0 top-0 transition-colors duration-300 ${
                i === activeIndex
                  ? 'bg-cue/25'
                  : 'bg-line/25 group-hover:bg-line/45'
              }`}
            />
            {/* Clip number, only where there is room for it */}
            <span
              className={`t-mono relative hidden text-[9px] leading-9 transition-colors sm:block ${
                i === activeIndex ? 'text-cue' : 'text-muted/70'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          </button>
        ))}

        {/* Playhead */}
        <div
          className="pointer-events-none absolute bottom-2.5 top-0 z-10 w-[2px] bg-cue"
          style={{
            left: `calc(var(--hud-gutter) + (100% - var(--hud-gutter) * 2) * ${progress})`,
            boxShadow: '0 0 10px rgb(var(--rgb-cue) / 0.9)',
          }}
        >
          <span className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-cue" />
        </div>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';

const FPS = 24;
/* Nominal programme length the scroll maps onto, in seconds.
   Purely cosmetic — it makes the timecode read like a real edit. */
const PROGRAMME_SECONDS = 214;

export function formatTimecode(progress) {
  const totalFrames = Math.floor(
    Math.min(Math.max(progress, 0), 1) * PROGRAMME_SECONDS * FPS
  );
  const frames = totalFrames % FPS;
  const totalSeconds = Math.floor(totalFrames / FPS);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

const sameSegments = (a, b) =>
  a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) < 0.01);

/**
 * Measures the page's timeline sections and maps scroll position onto a
 * proportional track. Segment widths and the playhead share one coordinate
 * space, so the head can never drift out of the segment it reports as active.
 *
 * @param {string[]} clipIds element ids of the sections, in cut order
 */
export function useTimeline(clipIds) {
  const [segments, setSegments] = useState([]);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const metricsRef = useRef({ tops: [], heights: [], total: 1 });

  /* Hold the ids in a ref so `measure` can stay referentially stable.
     Without this, the caller's `clips.map(...)` produces a new array each
     render, which would invalidate the callback, re-fire the effect, set
     state, and loop forever. */
  const idsRef = useRef(clipIds);
  idsRef.current = clipIds;
  const idsKey = clipIds.join('|');

  /* ── Measure ────────────────────────────────────────────── */
  const measure = useCallback(() => {
    const tops = [];
    const heights = [];
    idsRef.current.forEach((id) => {
      const el = document.getElementById(id);
      tops.push(el ? el.offsetTop : 0);
      heights.push(el ? el.offsetHeight : 0);
    });
    const total = heights.reduce((a, b) => a + b, 0) || 1;
    metricsRef.current = { tops, heights, total };

    const next = heights.map((h) => (h / total) * 100);
    /* Bail when nothing moved — a ResizeObserver that always sets state
       would otherwise keep the component re-rendering. */
    setSegments((prev) => (sameSegments(prev, next) ? prev : next));
  }, []);

  useEffect(() => {
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('resize', measure);
    /* Images and webfonts land after first paint and change section
       heights, so re-measure once things have settled. */
    const settle = setTimeout(measure, 600);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(settle);
    };
  }, [measure, idsKey]);

  /* ── Track scroll ───────────────────────────────────────── */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const { tops, heights, total } = metricsRef.current;
      if (!heights.length) return;

      const pos = window.scrollY + window.innerHeight / 2;

      let index = 0;
      for (let i = 0; i < tops.length; i += 1) {
        if (pos >= tops[i]) index = i;
      }

      const within = heights[index]
        ? Math.min(Math.max((pos - tops[index]) / heights[index], 0), 1)
        : 0;
      const before = heights.slice(0, index).reduce((a, b) => a + b, 0);
      const next = Math.min(
        Math.max((before + within * heights[index]) / total, 0),
        1
      );

      setProgress((prev) => (Math.abs(prev - next) < 0.0005 ? prev : next));
      setActiveIndex((prev) => (prev === index ? prev : index));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* ── Scrub / jump ───────────────────────────────────────── */
  const scrubTo = useCallback((fraction, behavior = 'auto') => {
    const { tops, heights, total } = metricsRef.current;
    if (!heights.length) return;
    const target = Math.min(Math.max(fraction, 0), 1) * total;

    let index = 0;
    let acc = 0;
    for (let i = 0; i < heights.length; i += 1) {
      if (target >= acc) index = i;
      acc += heights[i];
    }
    const before = heights.slice(0, index).reduce((a, b) => a + b, 0);
    const within = heights[index] ? (target - before) / heights[index] : 0;
    const contentPos = tops[index] + within * heights[index];
    window.scrollTo({
      top: Math.max(contentPos - window.innerHeight / 2, 0),
      behavior,
    });
  }, []);

  const jumpToClip = useCallback((index) => {
    const el = document.getElementById(idsRef.current[index]);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  }, []);

  return { segments, progress, activeIndex, scrubTo, jumpToClip };
}

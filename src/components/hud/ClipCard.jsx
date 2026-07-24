import React from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { useInView } from './useInView';

/**
 * A piece of work presented as a clip on the timeline: film perforations,
 * an in-point timecode, runtime, and a scrub line that fills on hover.
 *
 * Nothing meaningful is hidden behind :hover — phones get the full card.
 */
export default function ClipCard({ clip, index = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <a
      ref={ref}
      href={clip.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-hud border border-line/50 bg-panel/60 transition-colors duration-500 hover:border-cue/50"
      style={{
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        opacity: inView ? 1 : 0,
        transition: `transform 700ms cubic-bezier(0.16,1,0.3,1) ${index * 90}ms, opacity 700ms ease ${index * 90}ms, border-color 400ms ease`,
      }}
    >
      {/* Film edge */}
      <div aria-hidden className="film-perf h-2 bg-line/30" />

      <div className="relative aspect-video overflow-hidden bg-bg">
        <img
          src={clip.img.sm}
          srcSet={`${clip.img.sm} 640w, ${clip.img.lg} 1280w`}
          sizes="(min-width: 768px) 33vw, 78vw"
          alt={`${clip.title} — ${clip.client}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-hud group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />

        {/* Corner metadata */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="t-mono rounded-hud bg-bg/80 px-1.5 py-1 text-[10px] text-cue backdrop-blur-sm">
            {clip.track}
          </span>
          {clip.isNew && (
            <span className="t-label rounded-hud bg-rec px-2 py-1 text-bg">NEW</span>
          )}
        </div>

        {/* Play affordance */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cue/60 bg-bg/60 opacity-0 backdrop-blur-sm transition-all duration-500 ease-hud group-hover:opacity-100 md:scale-90 md:group-hover:scale-100">
            <Play size={16} className="translate-x-[1px] fill-cue text-cue" />
          </span>
        </div>

        {/* Scrub line */}
        <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
          <div className="relative h-[3px] w-full bg-ink/20">
            <span className="absolute inset-y-0 left-0 w-[18%] bg-cue transition-[width] duration-[1400ms] ease-hud group-hover:w-full" />
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="t-mono text-[9px] text-ink/70">{clip.tc}</span>
            <span className="t-mono text-[9px] text-ink/70">{clip.runtime}</span>
          </div>
        </div>
      </div>

      <div aria-hidden className="film-perf h-2 bg-line/30" />

      {/* Slate */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="t-display text-2xl leading-none sm:text-3xl">
              {clip.title}
            </h3>
            <p className="t-label mt-2 text-cue">{clip.client}</p>
          </div>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-muted transition-all duration-500 ease-hud group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cue"
          />
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-muted">
          {clip.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="t-label rounded-hud border border-line/60 px-2 py-1 text-muted/80">
            {clip.year}
          </span>
          {clip.tags?.map((tag) => (
            <span
              key={tag}
              className="t-label rounded-hud border border-line/60 px-2 py-1 text-muted/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

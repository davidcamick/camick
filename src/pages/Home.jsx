import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, Mail, Play } from 'lucide-react';

import PageShell from '../components/hud/PageShell';
import AmbientVideo from '../components/hud/AmbientVideo';
import TitleSequence, { BEATS } from '../components/hud/TitleSequence';
import LowerThird from '../components/hud/LowerThird';
import ClipCard from '../components/hud/ClipCard';
import StatBug from '../components/hud/StatBug';
import Ticker from '../components/hud/Ticker';
import { useInView } from '../components/hud/useInView';
import {
  CLIENTS,
  CLIPS,
  CONTACT,
  SKILLS,
  STATS,
  TICKER,
  TRACKS,
} from '../data/site';

const CLIPS_NAV = [
  { id: 'slate', label: 'SLATE' },
  { id: 'work', label: 'SELECTED WORK' },
  { id: 'stats', label: 'NUMBERS' },
  { id: 'profile', label: 'PROFILE' },
  { id: 'roster', label: 'CLIENTS' },
  { id: 'skills', label: 'WHAT I KNOW' },
  { id: 'wrap', label: 'BOOK IT' },
];

/* ── Work laid out as two video tracks ─────────────────────── */
function Track({ track, clips }) {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <div ref={ref} className="mt-12 first:mt-0">
      {/* Track head */}
      <div className="mb-4 flex items-end justify-between gap-4 border-b border-line/50 pb-3">
        <div className="flex items-baseline gap-3">
          <span className="t-mono rounded-hud border border-cue/50 px-2 py-1 text-[11px] text-cue">
            {track.id}
          </span>
          <h3 className="t-display text-3xl sm:text-4xl">{track.label}</h3>
        </div>
        <p className="hidden text-right text-xs text-muted sm:block">
          {track.blurb}
        </p>
      </div>

      {/* Rail: the visual "clips on a track" summary */}
      <div aria-hidden className="mb-5 flex h-1.5 gap-[3px]">
        {clips.map((clip, i) => (
          <span
            key={clip.id}
            className="flex-1 origin-left bg-cue/40 transition-transform duration-700 ease-hud"
            style={{
              transform: inView ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: `${i * 120}ms`,
            }}
          />
        ))}
      </div>

      {/* Cards — a swipeable strip on a phone, a grid on desktop */}
      <div
        className="-mx-[var(--hud-gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-gutter pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0"
        style={{
          overscrollBehaviorX: 'contain',
          scrollbarWidth: 'none',
          /* Without this the snap port ignores padding-left and the browser
             immediately scrolls the first card flush to the screen edge. */
          scrollPaddingLeft: 'var(--hud-gutter)',
        }}
      >
        {clips.map((clip, i) => (
          <div
            key={clip.id}
            className="w-[78vw] shrink-0 snap-start sm:w-[60vw] md:w-auto md:shrink"
          >
            <ClipCard clip={clip} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Armed once when the module is evaluated, so the titles play on a fresh page
   load but not every time someone navigates back to the index. Refresh replays.
   Deliberately NOT spent inside the state initializer — StrictMode invokes
   initializers twice, and a mutating one would consume the flag on the first
   call and hand `false` back on the second, killing the sequence outright. */
let titlesArmed =
  typeof window !== 'undefined' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Home() {
  // Pure read: double-invoking this returns the same answer.
  const [intro] = useState(() => titlesArmed);

  // Spend it after mount, where a double-run is harmless.
  useEffect(() => {
    titlesArmed = false;
  }, []);

  /* Helpers so every beat hangs off the one clock in TitleSequence */
  const beat = () => (intro ? 'anim-fade' : '');
  const delay = (ms) => (intro ? { animationDelay: `${ms}ms` } : undefined);

  return (
    <PageShell label="INDEX" clips={CLIPS_NAV}>
      {/* ══ 001 SLATE ══════════════════════════════════════ */}
      <section
        id="slate"
        className="fx-vignette relative flex min-h-[92dvh] flex-col justify-end overflow-hidden"
      >
        {/* Plate. Wrapped so the settle can push in and come up from black
            without fighting AmbientVideo's own object-cover scaling. */}
        <div
          className="absolute inset-0"
          style={
            intro
              ? { animation: `intro-settle 2200ms cubic-bezier(0.16,1,0.3,1) ${BEATS.plate}ms both` }
              : undefined
          }
        >
          <AmbientVideo
            mobileSrc="/assets/hero-mobile.mp4"
            desktopSrc="/assets/hero-desktop.mp4"
            poster="/assets/hero-poster.jpg"
            opacity={0.55}
          />
        </div>

        {/* Dark where the type sits, open at the top so the footage reads */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/65 to-bg/25" />

        {intro && <TitleSequence />}

        <div className="relative z-10 px-gutter pb-10 pt-24">
          <div className="mx-auto max-w-6xl">
            <div className={beat(BEATS.slug)} style={delay(BEATS.slug)}>
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-rec anim-rec" />
                <span className="t-label text-cue">001 / SLATE</span>
              </div>
            </div>

            <h1 className="mt-5">
              <span className="block overflow-hidden">
                <span
                  className={`t-display block text-[18vw] md:text-[11vw] ${intro ? 'anim-rise' : ''}`}
                  style={delay(BEATS.lineOne)}
                >
                  David
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className={`t-display block text-[18vw] text-cue md:text-[11vw] ${intro ? 'anim-rise' : ''}`}
                  style={delay(BEATS.lineTwo)}
                >
                  Camick
                </span>
              </span>
            </h1>

            {/* Cue rule drawn under the name */}
            <span
              aria-hidden
              className="mt-5 block h-px w-full max-w-md origin-left bg-cue/60"
              style={
                intro
                  ? { animation: `cue-sweep 900ms cubic-bezier(0.16,1,0.3,1) ${BEATS.cue}ms both` }
                  : { opacity: 0.4 }
              }
            />

            <p
              className={`mt-6 max-w-md text-balance text-sm leading-relaxed text-ink/80 sm:text-base ${beat(BEATS.body)}`}
              style={delay(BEATS.body)}
            >
              Cinematic sports coverage and event aftermovies. Gameday, rush
              films and club nights — cut fast, cut hard, delivered while it
              still matters.
            </p>

            {/* CTAs — full width and thumb-height on a phone */}
            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Link
                to="/video"
                className={`group flex items-center justify-between gap-3 rounded-hud bg-cue px-5 py-4 text-bg transition-colors hover:bg-ink sm:justify-start ${beat(BEATS.ctaOne)}`}
                style={delay(BEATS.ctaOne)}
              >
                <span className="t-label">WATCH THE 2025 REEL</span>
                <Play size={15} className="fill-bg" />
              </Link>
              <Link
                to="/contact"
                className={`group flex items-center justify-between gap-3 rounded-hud border border-line/70 px-5 py-4 transition-colors hover:border-cue hover:text-cue sm:justify-start ${beat(BEATS.ctaTwo)}`}
                style={delay(BEATS.ctaTwo)}
              >
                <span className="t-label">GET IN CONTACT</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`relative z-10 flex justify-center pb-4 ${beat(BEATS.release)}`}
          style={delay(BEATS.release)}
        >
          <ChevronDown size={16} className="animate-bounce text-muted" />
        </div>
      </section>

      <Ticker items={TICKER} />

      {/* ══ 002 SELECTED WORK ══════════════════════════════ */}
      <section id="work" className="px-gutter py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <LowerThird
            index={2}
            track="TIMELINE / 2 TRACKS"
            title="Selected "
            accent="work"
            sub="Two tracks, one calendar. Swipe a track to move through the cuts."
          />

          <div className="mt-12">
            {TRACKS.map((track) => (
              <Track
                key={track.id}
                track={track}
                clips={CLIPS.filter((c) => c.track === track.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 003 NUMBERS ════════════════════════════════════ */}
      <section id="stats" className="border-t border-line/40 px-gutter py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <LowerThird
            index={3}
            track="TELEMETRY"
            title="The "
            accent="Numbers"
            sub="What the work actually does once it's out in the world."
          />
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            {STATS.map((stat, i) => (
              <StatBug key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 004 PROFILE ════════════════════════════════════ */}
      <section id="profile" className="border-t border-line/40 px-gutter py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <LowerThird
            index={4}
            track="INTERVIEW"
            title="High impact "
            accent="visuals."
          />

          <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
            <div className="space-y-5 text-sm leading-relaxed text-muted sm:text-base">
              <p>
                I make dynamic, cinematic content for brands, athletes and the
                people throwing the best nights of the year. Sony Alpha bodies
                and premium glass — every frame engineered for impact.
              </p>
              <p>
                I shoot{' '}
                <span className="text-ink">Alabama Football</span> — gameday
                videos, recaps and player highlights that carry the intensity of
                the sport. The other half of my calendar is events:{' '}
                <span className="text-ink">rush films</span>,{' '}
                <span className="text-ink">aftermovies</span> and{' '}
                <span className="text-ink">club recaps</span> that make a night
                worth reliving.
              </p>
              <p>
                Turnaround is the whole game. Content that lands eight hours
                after the whistle beats content that lands next week, every
                time.
              </p>

              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-hud border border-line/50 bg-line/40 pt-0 sm:max-w-md">
                {[
                  ['BODIES', 'Sony Alpha'],
                  ['DELIVERY', '8 hr average'],
                  ['COVERAGE', 'Sports + events'],
                  ['TRAVEL', 'Available'],
                ].map(([k, v]) => (
                  <div key={k} className="bg-bg px-3 py-3">
                    <p className="t-label text-muted/70">{k}</p>
                    <p className="t-mono mt-1.5 text-[11px] text-ink">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <figure className="hud-brackets relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-hud border border-line/50">
                <img
                  src="/assets/other assets/hero-me.jpg"
                  alt="David Camick on location"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                  <span className="t-label text-cue">CAM OP / EDITOR</span>
                  <span className="t-mono text-[10px] text-ink/70">f/1.8</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ══ 005 CLIENTS ════════════════════════════════════ */}
      <section id="roster" className="border-t border-line/40 px-gutter py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <LowerThird
            index={5}
            track="ROSTER"
            title="Selected "
            accent="clients"
          />

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            {CLIENTS.map((client, i) => (
              <ClientCard key={client.id} client={client} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 006 WHAT I KNOW ════════════════════════════════ */}
      <section id="skills" className="border-t border-line/40 px-gutter py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <LowerThird
            index={6}
            track="SOFTWARE"
            title="What I "
            accent="know"
            sub="Three programs, learned properly. Here's what I can actually do in each one."
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {SKILLS.map((tool, i) => (
              <div
                key={tool.name}
                className="hud-panel flex flex-col rounded-hud p-5 transition-colors duration-500 hover:border-cue/50"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={tool.image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-10 w-10 shrink-0 object-contain"
                  />
                  <p className="t-wide flex-1 text-sm text-ink">{tool.name}</p>
                  <span className="t-mono text-[10px] text-cue/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {tool.summary}
                </p>

                <div aria-hidden className="my-4 h-px w-full bg-line/50" />

                <ul className="space-y-2">
                  {tool.knows.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13px] leading-snug text-muted"
                    >
                      <Check size={13} className="mt-[3px] shrink-0 text-cue" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 007 WRAP ═══════════════════════════════════════ */}
      <section
        id="wrap"
        className="relative overflow-hidden border-t border-line/40 px-gutter py-24 sm:py-32"
      >
        <AmbientVideo
          mobileSrc="/assets/events2-lite.mp4"
          desktopSrc="/assets/events2-lite.mp4"
          poster="/assets/events2-poster.jpg"
          opacity={0.16}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <span className="t-label text-cue">007 / WRAP</span>
          <h2 className="t-display mt-5 text-[17vw] leading-[0.85] md:text-[8vw]">
            That&apos;s a<span className="text-cue"> wrap.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Got a game, a party or a night worth keeping? Let&apos;s get it on
            the calendar.
          </p>

          <div className="mx-auto mt-9 flex max-w-md flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              to="/events"
              className="flex items-center justify-center gap-2.5 rounded-hud bg-cue px-6 py-4 text-bg transition-colors hover:bg-ink"
            >
              <span className="t-label">EVENT COVERAGE</span>
              <ArrowRight size={15} />
            </Link>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center justify-center gap-2.5 rounded-hud border border-line/70 px-6 py-4 transition-colors hover:border-cue hover:text-cue"
            >
              <Mail size={15} />
              <span className="t-label">EMAIL ME</span>
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/* ── Client tile ───────────────────────────────────────────── */
function ClientCard({ client, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="group relative aspect-[4/5] overflow-hidden rounded-hud border border-line/50 transition-colors duration-500 hover:border-cue/50"
      style={{
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        opacity: inView ? 1 : 0,
        transition: `transform 600ms cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, opacity 600ms ease ${index * 80}ms, border-color 400ms ease`,
      }}
    >
      <img
        src={client.image}
        alt={client.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-hud group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="t-wide text-[11px] leading-tight text-ink">{client.name}</p>
        <p className="mt-1 text-[10px] leading-tight text-muted">{client.role}</p>
      </div>
      <span className="t-mono absolute right-2 top-2 text-[9px] text-cue/70">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  );
}

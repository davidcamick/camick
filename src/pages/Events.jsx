import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail, Plus } from 'lucide-react';

import PageShell from '../components/hud/PageShell';
import AmbientVideo from '../components/hud/AmbientVideo';
import LowerThird from '../components/hud/LowerThird';
import { useInView } from '../components/hud/useInView';
import { CONTACT, COVERAGE, EXTRAS, INCLUDED } from '../data/site';

const CLIPS_NAV = [
  { id: 'brief', label: 'THE BRIEF' },
  { id: 'coverage', label: 'WHAT I COVER' },
  { id: 'included', label: 'IN EVERY PROJECT' },
  { id: 'extras', label: 'EXTRAS' },
  { id: 'book', label: 'BOOK IT' },
];

/* ── Coverage tile ─────────────────────────────────────────── */
function CoverageCard({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <Link
      ref={ref}
      to="/contact"
      className="group relative flex flex-col rounded-hud border border-line/50 bg-panel/50 p-5 transition-colors duration-300 hover:border-cue/60 hover:bg-panel"
      style={{
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        opacity: inView ? 1 : 0,
        transition: `transform 600ms cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, opacity 600ms ease ${index * 80}ms, border-color 300ms ease, background-color 300ms ease`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="t-mono text-[10px] text-cue/70">
          {String(index + 1).padStart(2, '0')}
        </span>
        <ArrowRight
          size={15}
          className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cue"
        />
      </div>

      <h3 className="t-display mt-3 text-2xl leading-none sm:text-[26px]">
        {item.name}
      </h3>
      <p className="mt-3 text-[13px] leading-relaxed text-muted">{item.blurb}</p>
    </Link>
  );
}

/* ── Reveal row helper ─────────────────────────────────────── */
function RevealRow({ children, index, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <li
      ref={ref}
      className={className}
      style={{
        transform: inView ? 'translateY(0)' : 'translateY(12px)',
        opacity: inView ? 1 : 0,
        transition: `transform 500ms cubic-bezier(0.16,1,0.3,1) ${index * 55}ms, opacity 500ms ease ${index * 55}ms`,
      }}
    >
      {children}
    </li>
  );
}

export default function Events() {
  return (
    <PageShell label="COVERAGE" title="Event Coverage" clips={CLIPS_NAV}>
      {/* ══ 001 BRIEF ══════════════════════════════════════ */}
      <section
        id="brief"
        className="fx-vignette relative flex min-h-[72dvh] flex-col justify-end overflow-hidden px-gutter pb-12 pt-24"
      >
        <AmbientVideo
          mobileSrc="/assets/events-lite.mp4"
          desktopSrc="/assets/events-lite.mp4"
          poster="/assets/events-poster.jpg"
          opacity={0.34}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/30" />

        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-rec anim-rec" />
            <span className="t-label text-cue">001 / THE BRIEF</span>
          </div>

          <h1 className="t-display mt-5 text-[19vw] leading-[0.85] md:text-[11vw]">
            Events
          </h1>

          <p className="mt-5 max-w-md text-balance text-sm leading-relaxed text-ink/80 sm:text-base">
            Rush films, formals, island parties, club nights. Covering any and
            every event you wish you could live twice.
          </p>

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2.5 rounded-hud bg-cue px-6 py-4 text-bg transition-colors hover:bg-ink sm:justify-start"
            >
              <Mail size={15} />
              <span className="t-label">GET IN TOUCH</span>
            </Link>
            <a
              href="#coverage"
              className="flex items-center justify-center gap-2.5 rounded-hud border border-line/70 px-6 py-4 transition-colors hover:border-cue hover:text-cue sm:justify-start"
            >
              <span className="t-label">WHAT I COVER</span>
              <ArrowRight size={15} />
            </a>
          </div>

          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-hud border border-line/50 bg-line/40 sm:grid-cols-4">
            {[
              ['BASE', CONTACT.base],
              ['TRAVEL', 'Available'],
              ['COVERAGE', 'Up to 5 hrs'],
              ['DELIVERY', '1 week max'],
            ].map(([k, v]) => (
              <div key={k} className="bg-bg/85 px-3 py-2.5">
                <dt className="t-label text-muted/70">{k}</dt>
                <dd className="t-mono mt-1.5 text-[11px] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ══ 002 WHAT I COVER ═══════════════════════════════ */}
      <section
        id="coverage"
        className="relative overflow-hidden border-t border-line/40 px-gutter py-16 sm:py-24"
      >
        <AmbientVideo
          mobileSrc="/assets/events2-lite.mp4"
          desktopSrc="/assets/events2-lite.mp4"
          poster="/assets/events2-poster.jpg"
          opacity={0.12}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-bg/85 to-bg" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <LowerThird
            index={2}
            track="SCOPE"
            title="What I "
            accent="cover"
            sub="Every event gets scoped and quoted on its own — length, format and coverage all get built around the night. Tell me what you're throwing."
            align="center"
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {COVERAGE.map((item, i) => (
              <CoverageCard key={item.name} item={item} index={i} />
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center gap-4 rounded-hud border border-line/50 bg-panel/50 p-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm leading-snug text-ink">
              Something not on the list?{' '}
              <span className="text-muted">
                If it&apos;s worth filming, I&apos;ll cover it.
              </span>
            </p>
            <Link
              to="/contact"
              className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-hud border border-cue/60 px-5 text-cue transition-colors hover:bg-cue hover:text-bg"
            >
              <span className="t-label">ASK ME</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 003 IN EVERY PROJECT ═══════════════════════════ */}
      <section id="included" className="border-t border-line/40 px-gutter py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <LowerThird
            index={3}
            track="BASELINE"
            title="In every "
            accent="project"
            sub="No hidden extras. This is the floor, whatever the event."
            align="center"
          />

          <ul className="mt-10 grid gap-2 sm:grid-cols-2">
            {INCLUDED.map((item, i) => (
              <RevealRow
                key={item}
                index={i}
                className="flex items-center gap-3 rounded-hud border border-line/50 bg-panel/40 px-4 py-3"
              >
                <Check size={14} className="shrink-0 text-cue" />
                <span className="text-[13px] leading-snug text-muted">{item}</span>
              </RevealRow>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ 004 EXTRAS ═════════════════════════════════════ */}
      <section id="extras" className="border-t border-line/40 px-gutter py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <LowerThird
            index={4}
            track="OPTIONAL"
            title="On "
            accent="request"
            sub="Bolt any of these on — they get worked into the quote for your event."
            align="center"
          />

          <ul className="mt-10 grid gap-2 sm:grid-cols-2">
            {EXTRAS.map((item, i) => (
              <RevealRow
                key={item}
                index={i}
                className="flex items-center gap-3 rounded-hud border border-line/50 bg-panel/40 px-4 py-3"
              >
                <Plus size={14} className="shrink-0 text-amber" />
                <span className="text-[13px] leading-snug text-muted">{item}</span>
              </RevealRow>
            ))}
          </ul>

          <p className="mt-4 rounded-hud border border-line/50 bg-panel/30 px-4 py-3 text-center text-[11px] leading-relaxed text-muted">
            <span className="text-ink">Note:</span> song must be approved before
            editing begins — no changes once approved.
          </p>
        </div>
      </section>

      {/* ══ 005 BOOK IT ════════════════════════════════════ */}
      <section id="book" className="border-t border-line/40 px-gutter py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="t-label text-cue">005 / BOOK IT</span>
          <h2 className="t-display mt-5 text-[16vw] leading-[0.85] md:text-[7vw]">
            Let&apos;s<span className="text-cue"> talk.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-muted">
            Tell me what you&apos;re throwing, when it is and roughly how long
            you need covered — I&apos;ll take it from there.
          </p>

          <div className="mx-auto mt-9 flex max-w-md flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2.5 rounded-hud bg-cue px-6 py-4 text-bg transition-colors hover:bg-ink"
            >
              <Mail size={15} />
              <span className="t-label">GET IN TOUCH</span>
            </Link>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-hud border border-line/70 px-6 py-4 transition-colors hover:border-cue hover:text-cue"
            >
              <span className="t-label">DM ON INSTAGRAM</span>
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

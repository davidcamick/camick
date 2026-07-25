import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Mail, Phone } from 'lucide-react';

import PageShell from '../components/hud/PageShell';
import AmbientVideo from '../components/hud/AmbientVideo';
import { useInView } from '../components/hud/useInView';
import { CONTACT, LINKS } from '../data/site';

/**
 * The Instagram bio destination — built as a broadcast channel guide.
 *
 * This is the highest-traffic mobile entry point on the site, so it is a
 * single thumb-height column: no horizontal scroll, no hover-only affordances,
 * and every row is a 68px+ tap target.
 */
function ChannelRow({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  const style = {
    transform: inView ? 'translateY(0)' : 'translateY(14px)',
    opacity: inView ? 1 : 0,
    transition: `transform 500ms cubic-bezier(0.16,1,0.3,1) ${index * 60}ms, opacity 500ms ease ${index * 60}ms, border-color 300ms ease, background-color 300ms ease`,
  };

  const body = (
    <>
      <span
        className={`t-mono w-7 shrink-0 text-[11px] ${
          item.primary ? 'text-bg/70' : 'text-cue/70'
        }`}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`t-wide block truncate text-[13px] ${
            item.primary ? 'text-bg' : 'text-ink'
          }`}
        >
          {item.title}
        </span>
        <span
          className={`t-label mt-1.5 block truncate ${
            item.primary ? 'text-bg/70' : 'text-muted'
          }`}
        >
          {item.meta}
        </span>
      </span>
      <ArrowUpRight
        size={17}
        className={`shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
          item.primary ? 'text-bg' : 'text-muted group-hover:text-cue'
        }`}
      />
    </>
  );

  const className = `group flex min-h-[68px] w-full items-center gap-3 rounded-hud border px-4 py-3.5 text-left ${
    item.primary
      ? 'border-cue bg-cue hover:bg-ink hover:border-ink'
      : 'border-line/50 bg-panel/50 hover:border-cue/60 hover:bg-panel'
  }`;

  if (item.internal) {
    return (
      <Link ref={ref} to={item.to} className={className} style={style}>
        {body}
      </Link>
    );
  }

  return (
    <a
      ref={ref}
      href={item.to}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {body}
    </a>
  );
}

export default function Links() {
  return (
    <PageShell label="CH GUIDE" title="Links">
      <section className="fx-vignette relative overflow-hidden px-gutter pb-16 pt-10">
        <AmbientVideo
          mobileSrc="/assets/hero-mobile.mp4"
          desktopSrc="/assets/hero-mobile.mp4"
          poster="/assets/hero-poster.jpg"
          opacity={0.14}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/85 to-bg" />

        <div className="relative z-10 mx-auto max-w-md">
          {/* Ident */}
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-rec anim-rec" />
            <span className="t-label text-cue">ON AIR</span>
            <span aria-hidden className="h-px flex-1 bg-line/60" />
            <span className="t-label text-muted">{CONTACT.base}</span>
          </div>

          <h1 className="t-display mt-6 text-[15vw] leading-[0.86] sm:text-[64px]">
            David
            <br />
            <span className="text-cue">Camick</span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            Sports coverage and event aftermovies. Pick a channel.
          </p>

          {/* Quick actions */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[
              { icon: Mail, label: 'EMAIL', href: `mailto:${CONTACT.email}` },
              { icon: Phone, label: 'CALL', href: `tel:${CONTACT.phone}` },
              { icon: Instagram, label: 'IG', href: CONTACT.instagram },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex min-h-[56px] flex-col items-center justify-center gap-1.5 rounded-hud border border-line/50 bg-panel/50 transition-colors hover:border-cue/60 hover:text-cue"
              >
                <Icon size={16} />
                <span className="t-label">{label}</span>
              </a>
            ))}
          </div>

          {/* Channel list */}
          <div className="mt-3 flex flex-col gap-2">
            {LINKS.map((item, i) => (
              <ChannelRow key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

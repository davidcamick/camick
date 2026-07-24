import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Instagram, Mail, Phone } from 'lucide-react';

import PageShell from '../components/hud/PageShell';
import LowerThird from '../components/hud/LowerThird';
import { useInView } from '../components/hud/useInView';
import { CONTACT } from '../data/site';

const CHANNELS = [
  {
    icon: Mail,
    label: 'EMAIL',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: 'Best for bookings and quotes',
  },
  {
    icon: Phone,
    label: 'PHONE',
    value: CONTACT.phoneLabel,
    href: `tel:${CONTACT.phone}`,
    note: 'Call or text',
  },
  {
    icon: Instagram,
    label: 'INSTAGRAM',
    value: CONTACT.instagramHandle,
    href: CONTACT.instagram,
    note: 'DMs open — latest work here',
    external: true,
  },
];

function ChannelCard({ channel, index }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const { icon: Icon } = channel;

  return (
    <a
      ref={ref}
      href={channel.href}
      target={channel.external ? '_blank' : undefined}
      rel={channel.external ? 'noopener noreferrer' : undefined}
      className="group flex min-h-[92px] items-center gap-4 rounded-hud border border-line/50 bg-panel/50 p-5 transition-colors duration-300 hover:border-cue/60 hover:bg-panel"
      style={{
        transform: inView ? 'translateY(0)' : 'translateY(18px)',
        opacity: inView ? 1 : 0,
        transition: `transform 600ms cubic-bezier(0.16,1,0.3,1) ${index * 90}ms, opacity 600ms ease ${index * 90}ms, border-color 300ms ease, background-color 300ms ease`,
      }}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-hud border border-line/60 text-muted transition-colors group-hover:border-cue/60 group-hover:text-cue">
        <Icon size={18} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="t-label block text-cue">{channel.label}</span>
        <span className="t-mono mt-1.5 block truncate text-sm text-ink">
          {channel.value}
        </span>
        <span className="mt-1 block text-xs text-muted">{channel.note}</span>
      </span>

      <ArrowUpRight
        size={18}
        className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cue"
      />
    </a>
  );
}

export default function Contact() {
  return (
    <PageShell label="COMMS" title="Contact">
      <section className="px-gutter py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <LowerThird
            index={1}
            track="COMMS / OPEN"
            title="Get in "
            accent="touch"
            sub="Tuscaloosa based, travel available. Fastest reply is Instagram DMs; email is best for anything with a budget attached."
          />

          <div className="mt-10 flex flex-col gap-3">
            {CHANNELS.map((channel, i) => (
              <ChannelCard key={channel.label} channel={channel} index={i} />
            ))}
          </div>

          {/* Booking nudge */}
          <div className="mt-8 rounded-hud border border-cue/40 bg-cue/[0.06] p-5">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cue" />
              <span className="t-label text-cue">BOOKING AN EVENT?</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Every event is quoted on its own. Tell me what you&apos;re
              throwing, when it is and roughly how long you need covered, and
              I&apos;ll come back with a number.
            </p>
            <Link
              to="/events"
              className="mt-5 flex items-center justify-center gap-2.5 rounded-hud bg-cue px-5 py-3.5 text-bg transition-colors hover:bg-ink"
            >
              <span className="t-label">SEE WHAT I COVER</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-hud border border-line/50 bg-line/40">
            {[
              ['BASED', CONTACT.base],
              ['TRAVEL', 'Available'],
              ['TURNAROUND', '8 hr average'],
              ['STATUS', 'Taking bookings'],
            ].map(([k, v], i) => (
              <div key={k} className="bg-bg px-4 py-3">
                <dt className="t-label text-muted/70">{k}</dt>
                <dd
                  className={`t-mono mt-1.5 text-[11px] ${
                    i === 3 ? 'text-cue' : 'text-ink'
                  }`}
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </PageShell>
  );
}

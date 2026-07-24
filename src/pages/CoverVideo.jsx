import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

import PageShell from '../components/hud/PageShell';
import LowerThird from '../components/hud/LowerThird';
import { CONTACT } from '../data/site';

export default function CoverVideo() {
  return (
    <PageShell label="PLAYBACK" title="2025 Cover Video">
      <section className="px-gutter py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <LowerThird
            index={1}
            track="PLAYBACK / MASTER"
            title="2025 cover "
            accent="video"
            sub="The year in one cut — sports, events and everything in between."
          />

          {/* Player, framed like a monitor */}
          <div className="hud-brackets mt-10">
            <div className="rounded-hud border border-line/50 bg-panel/40 p-2 sm:p-3">
              {/* Monitor header */}
              <div className="mb-2 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rec anim-rec" />
                  <span className="t-label text-muted">SRC / VIMEO</span>
                </div>
                <span className="t-mono text-[10px] text-muted">1920×1080 · 24P</span>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-hud bg-bg">
                <iframe
                  src="https://player.vimeo.com/video/1068645245?h=3cbbac1d8f&title=0&byline=0&portrait=0"
                  className="absolute inset-0 h-full w-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="David Camick — 2025 Cover Video"
                />
              </div>

              {/* Transport strip */}
              <div className="mt-2 flex items-center justify-between px-1">
                <span className="t-mono text-[10px] text-cue">00:00:00:00</span>
                <div aria-hidden className="mx-3 h-[3px] flex-1 bg-line/40">
                  <span className="block h-full w-1/3 bg-cue/50" />
                </div>
                <span className="t-mono text-[10px] text-muted">MASTER</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
            <a
              href={CONTACT.reel}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-hud border border-line/70 px-6 py-4 transition-colors hover:border-cue hover:text-cue"
            >
              <ExternalLink size={15} />
              <span className="t-label">OPEN ON VIMEO</span>
            </a>
            <Link
              to="/events"
              className="flex items-center justify-center gap-2.5 rounded-hud bg-cue px-6 py-4 text-bg transition-colors hover:bg-ink"
            >
              <span className="t-label">BOOK AN EVENT</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

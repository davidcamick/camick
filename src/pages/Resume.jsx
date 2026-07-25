import React from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';

import PageShell from '../components/hud/PageShell';
import LowerThird from '../components/hud/LowerThird';
import { CONTACT } from '../data/site';

export default function Resume() {
  return (
    <PageShell label="DOCS" title="Resume">
      <section className="px-gutter py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <LowerThird
            index={1}
            track="DOCS / 2026"
            title="The "
            accent="resume"
            sub="Video production, sports media and event coverage."
          />

          {/* Actions first — on a phone this is what people actually want */}
          <div className="mt-10 flex flex-col gap-2.5 sm:flex-row">
            <a
              href={CONTACT.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-hud bg-cue px-6 py-4 text-bg transition-colors hover:bg-ink"
            >
              <ExternalLink size={15} />
              <span className="t-label">OPEN PDF</span>
            </a>
            <a
              href={CONTACT.resumePdf}
              download
              className="flex items-center justify-center gap-2.5 rounded-hud border border-line/70 px-6 py-4 transition-colors hover:border-cue hover:text-cue"
            >
              <Download size={15} />
              <span className="t-label">DOWNLOAD</span>
            </a>
          </div>

          {/* Inline preview only on desktop — mobile browsers render PDF
              iframes inconsistently, so they get the card instead. */}
          <div className="hud-brackets mt-8 hidden md:block">
            <div className="rounded-hud border border-line/50 bg-panel/40 p-3">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="t-label text-muted">PREVIEW</span>
                <span className="t-mono text-[10px] text-muted">PDF / 1 PAGE</span>
              </div>
              <div className="aspect-[16/10] overflow-hidden rounded-hud bg-bg">
                <iframe
                  src={CONTACT.resumePdf}
                  className="h-full w-full"
                  title="David Camick resume"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4 rounded-hud border border-line/50 bg-panel/50 p-5 md:hidden">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-hud border border-line/60 text-cue">
              <FileText size={18} />
            </span>
            <div className="min-w-0">
              <p className="t-wide text-[13px] text-ink">Resume 2026</p>
              <p className="mt-1 text-xs text-muted">
                Opens in your PDF viewer — tap Open PDF above.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

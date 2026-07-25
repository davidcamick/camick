import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HudChrome from './HudChrome';
import Timeline from './Timeline';
import { CONTACT } from '../../data/site';

/**
 * Wraps every route in the broadcast chrome: status strip, signal texture,
 * optional scrub timeline, and the sign-off footer.
 *
 * @param {{id: string, label: string}[]} [clips] sections to expose on the
 *        bottom timeline. Omit on pages that are a single screen.
 */
export default function PageShell({ label, title, clips, children }) {
  useEffect(() => {
    document.title = title
      ? `${title} — David Camick`
      : 'David Camick — Sports & Event Films';
  }, [title]);

  return (
    <div className="fx-grain fx-scanlines relative min-h-dscreen bg-bg">
      <HudChrome label={label} />

      {/* Only the footer clears the fixed timeline — padding main as well
          would open a dead gap between the last section and the footer. */}
      <main className="pt-11">{children}</main>

      <footer
        className={`border-t border-line/50 px-gutter py-8 ${clips ? 'pb-timeline' : ''}`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-rec anim-rec" />
            <span className="t-label text-muted">
              © {new Date().getFullYear()} David Camick
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={`mailto:${CONTACT.email}`}
              className="t-mono text-xs text-muted transition-colors hover:text-cue"
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono text-xs text-muted transition-colors hover:text-cue"
            >
              {CONTACT.instagramHandle}
            </a>
            <Link
              to="/links"
              className="t-label text-muted transition-colors hover:text-cue"
            >
              ALL LINKS
            </Link>
          </div>
        </div>
      </footer>

      {clips && <Timeline clips={clips} />}
    </div>
  );
}

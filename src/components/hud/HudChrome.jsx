import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CONTACT } from '../../data/site';

const ROUTES = [
  { label: 'Index', to: '/', meta: 'Home' },
  { label: 'Work', to: '/#work', meta: 'Sports + events' },
  { label: 'Events', to: '/events', meta: 'What I cover' },
  { label: 'Reel', to: '/video', meta: '2025 cover video' },
  { label: 'Resume', to: '/resume', meta: 'PDF' },
  { label: 'Contact', to: '/contact', meta: 'Email · phone · DM' },
];

/**
 * Persistent broadcast chrome: status strip, framing brackets, signal
 * texture, and the full-screen route menu.
 */
export default function HudChrome({ label = 'INDEX' }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  /* Lock the page behind the menu without the iOS scroll-jump that
     `position: fixed` on body causes. */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (to) => {
    setOpen(false);
    if (to.startsWith('/#')) {
      navigate('/');
      requestAnimationFrame(() => {
        setTimeout(() => {
          document
            .getElementById(to.slice(2))
            ?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      });
      return;
    }
    navigate(to);
  };

  return (
    <>
      {/* ── Framing brackets: the corner marks on a camera chart ── */}
      <div aria-hidden className="pointer-events-none fixed inset-3 z-40 hidden md:block">
        {[
          'left-0 top-0 border-l border-t',
          'right-0 top-0 border-r border-t',
          'left-0 bottom-0 border-l border-b',
          'right-0 bottom-0 border-r border-b',
        ].map((cls) => (
          <span key={cls} className={`absolute h-4 w-4 border-cue/40 ${cls}`} />
        ))}
      </div>

      {/* ── Status strip ── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/50 bg-bg/80 backdrop-blur-xl">
        <div className="flex h-11 items-center justify-between px-gutter">
          <Link to="/" className="flex items-baseline gap-2 group">
            <span className="t-wide text-[13px] text-ink transition-colors group-hover:text-cue">
              CAMICK
            </span>
            <span className="t-label hidden text-muted sm:block">
              SPORTS / EVENTS
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="t-label hidden text-cue sm:block">{label}</span>
            <span aria-hidden className="hidden h-3 w-px bg-line sm:block" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex items-center gap-2 border border-line/70 px-3 py-1.5 rounded-hud transition-colors hover:border-cue/60 hover:text-cue"
            >
              <span className="t-label">{open ? 'CLOSE' : 'MENU'}</span>
              <span className="flex h-2.5 w-3 flex-col justify-between">
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${
                    open ? 'translate-y-[5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-opacity duration-200 ${
                    open ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-300 ${
                    open ? '-translate-y-[5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Route menu ── */}
      <div
        className={`fixed inset-0 z-[55] bg-bg/97 backdrop-blur-2xl transition-all duration-500 ease-hud ${
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col justify-center px-gutter pt-14 pb-10">
          <ul>
            {ROUTES.map((route, i) => (
              <li key={route.to} className="border-b border-line/40 last:border-0">
                <button
                  type="button"
                  onClick={() => go(route.to)}
                  className="group flex w-full items-center gap-4 py-4 text-left transition-transform duration-500 ease-hud md:py-5"
                  style={{
                    transform: open ? 'translateY(0)' : 'translateY(18px)',
                    opacity: open ? 1 : 0,
                    transitionDelay: open ? `${80 + i * 45}ms` : '0ms',
                    transitionProperty: 'transform, opacity',
                  }}
                >
                  <span className="t-mono text-[11px] text-cue/70">
                    {String(i + 1).padStart(3, '0')}
                  </span>
                  <span className="t-display flex-1 text-[13vw] text-ink transition-colors group-hover:text-cue md:text-[6vw]">
                    {route.label}
                  </span>
                  <span className="t-label hidden text-muted md:block">
                    {route.meta}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
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
            <span className="t-label text-muted/60">{CONTACT.base}</span>
          </div>
        </nav>
      </div>
    </>
  );
}

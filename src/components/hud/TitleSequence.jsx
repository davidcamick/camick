import React from 'react';

/**
 * Screen-level furniture for the hero's opening title sequence: the letterbox
 * shutter, the viewfinder marks, and the flash frame.
 *
 * The content beats live in the hero itself — this owns only the parts that
 * act on the whole frame. Sits above the plate and above the copy on purpose:
 * a letterbox is supposed to crop what it covers.
 */

/* Beat sheet, ms from the start of the sequence. Exported so the hero can
   hang its own copy off the same clock instead of guessing at delays. */
export const BEATS = {
  shutter: 150,
  plate: 300,
  marks: 560,
  slug: 620,
  lineOne: 700,
  lineTwo: 820,
  /* Fires as the name settles, not while it is still travelling — the rise
     eases hard, so it is ~90% done a third of the way through. */
  flash: 1120,
  cue: 1180,
  body: 1280,
  ctaOne: 1400,
  ctaTwo: 1470,
  release: 1900,
};

export default function TitleSequence() {
  return (
    <>
      {/* Shutter */}
      {['top-0 origin-top', 'bottom-0 origin-bottom'].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 z-30 h-1/2 bg-bg ${pos}`}
          style={{
            animation: `letterbox 1900ms cubic-bezier(0.65, 0, 0.35, 1) ${BEATS.shutter}ms both`,
          }}
        />
      ))}

      {/* Viewfinder marks */}
      <div aria-hidden className="pointer-events-none absolute inset-6 z-20 md:inset-12">
        {[
          'left-0 top-0 border-l-2 border-t-2',
          'right-0 top-0 border-r-2 border-t-2',
          'left-0 bottom-0 border-l-2 border-b-2',
          'right-0 bottom-0 border-r-2 border-b-2',
        ].map((cls, i) => (
          <span
            key={cls}
            className={`absolute h-6 w-6 border-cue ${cls}`}
            style={{
              animation: `mark-snap 1200ms cubic-bezier(0.16, 1, 0.3, 1) ${BEATS.marks + i * 45}ms both`,
            }}
          />
        ))}
      </div>

      {/* Flash frame */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-ink"
        style={{
          animation: `title-flash 520ms linear ${BEATS.flash}ms both`,
        }}
      />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   Single source of truth for site content.
   Pages stay layout-only; edit copy and links here.
   ══════════════════════════════════════════════════════════════ */

export const CONTACT = {
  email: "david@camick.org",
  phone: "+14047250528",
  phoneLabel: "(404) 725-0528",
  instagram: "https://instagram.com/davidcamick",
  instagramHandle: "@davidcamick",
  base: "Tuscaloosa, AL",
  reel: "https://vimeo.com/1068645245/3cbbac1d8f",
  resumePdf: "/assets/other assets/David Camick - Resume 2026 (Video).pdf",
};

/* ── Work, cut onto two tracks like a real timeline ───────────
   V1 = SPORTS   ·   V2 = EVENTS                                */
export const TRACKS = [
  { id: "V1", label: "SPORTS", blurb: "Gameday, highlights, cinematic recaps." },
  { id: "V2", label: "EVENTS", blurb: "Aftermovies, rush films, club nights." },
];

export const CLIPS = [
  {
    id: "revenge",
    track: "V1",
    tc: "00:00:00:00",
    title: "Revenge",
    client: "Alabama vs Vanderbilt",
    year: "2025",
    runtime: "01:12",
    description:
      "Fan-experience recap from the week 5 game against Vanderbilt. Delivered 8 hours after the final whistle.",
    href: "https://drive.google.com/file/d/161jqiYb439pP4qnf8kUWEfzrjzxVbno6/view?usp=sharing",
    img: { sm: "/assets/selected-work/opt/revenge-640.jpg", lg: "/assets/selected-work/opt/revenge-1280.jpg" },
    tags: ["RECAP", "8HR TURNAROUND"],
  },
  {
    id: "bama-cinematic",
    track: "V1",
    tc: "00:01:12:00",
    title: "Cinematic Recap",
    client: "Alabama Football",
    year: "2025",
    runtime: "02:04",
    description:
      "Season cinematic for Alabama 2025. Sequence, sound design and initial color by me.",
    href: "https://drive.google.com/file/d/1JPU80gZaFEnmOituk-XxD1GGd_xtFuBe/view?usp=sharing",
    img: { sm: "/assets/selected-work/opt/bama-cinematic-640.jpg", lg: "/assets/selected-work/opt/bama-cinematic-1280.jpg" },
    tags: ["CINEMATIC", "SOUND DESIGN"],
  },
  {
    id: "liam-mullins",
    track: "V1",
    tc: "00:03:16:00",
    title: "Back to Business",
    client: "Liam Mullins",
    year: "2024",
    runtime: "00:58",
    description: "Player highlight reel for Liam Mullins. Shot and edited by me.",
    href: "https://www.instagram.com/reel/C6efITwoQpR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    img: { sm: "/assets/selected-work/opt/liam-mullins-640.jpg", lg: "/assets/selected-work/opt/liam-mullins-1280.jpg" },
    tags: ["HIGHLIGHT", "SHOT + CUT"],
  },
  {
    id: "neon",
    track: "V2",
    tc: "00:00:00:00",
    title: "NEON",
    client: "Beta Upsilon Chi",
    year: "2025",
    runtime: "01:06",
    description:
      "High-energy party aftermovie, delivered 4 hours after the event ended.",
    href: "https://www.instagram.com/reel/DT313FcD16W/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    img: { sm: "/assets/selected-work/opt/neon-640.jpg", lg: "/assets/selected-work/opt/neon-1280.jpg" },
    tags: ["AFTERMOVIE", "4HR TURNAROUND"],
  },
  {
    id: "byx-rush",
    track: "V2",
    tc: "00:01:06:00",
    title: "Rush 2026",
    client: "Beta Upsilon Chi",
    year: "2026",
    runtime: "01:30",
    description:
      "Rush film for BYX — the pitch reel a fraternity leads with. Brotherhood, chaos and the nights that sell the house.",
    href: "https://www.instagram.com/reel/DXXvpVVvbrk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    img: { sm: "/assets/selected-work/opt/byx-rush-640.jpg", lg: "/assets/selected-work/opt/byx-rush-1280.jpg" },
    tags: ["RUSH FILM", "GREEK LIFE"],
    isNew: true,
  },
  {
    id: "two-checks",
    track: "V2",
    tc: "00:02:36:00",
    title: "Friday Nights",
    client: "Two Checks",
    year: "2026",
    runtime: "01:14",
    description:
      "Friday night club recap — party-style cut built around the drop, the crowd and the lights.",
    href: "https://www.instagram.com/reel/DX2ZV0YJqB2/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    img: { sm: "/assets/selected-work/opt/two-checks-640.jpg", lg: "/assets/selected-work/opt/two-checks-1280.jpg" },
    tags: ["CLUB RECAP", "NIGHTLIFE"],
    isNew: true,
  },
];

export const CLIENTS = [
  {
    id: "alabama",
    name: "Alabama Football",
    role: "Gameday · Recaps · Highlights",
    image: "/assets/clients/ALABAMA.jpg",
  },
  {
    id: "nle",
    name: "NLE Choppa",
    role: "Concert recaps · BTS",
    image: "/assets/clients/NLE.jpg",
  },
  {
    id: "overtime",
    name: "Overtime",
    role: "Sports highlights · Social",
    image: "/assets/clients/OVERTIME.jpg",
  },
  {
    id: "byx",
    name: "BYX",
    role: "Rush films · Party aftermovies",
    image: "/assets/clients/BYX.jpg",
  },
  {
    id: "shipwrek",
    name: "Shipwrek",
    role: "Festival recaps · Tour visuals",
    image: "/assets/clients/SHIPWREK.png",
  },
];

export const STATS = [
  { value: 2.7, suffix: "M+", label: "Impressions", note: "Across delivered work" },
  { value: 80, suffix: "%", label: "Avg retention", note: "On short-form cuts" },
  { value: 8, suffix: "HR", label: "Avg turnaround", note: "Event to delivery" },
];

export const KIT = [
  {
    name: "Premiere Pro",
    image: "/assets/logos/premiere.png",
    role: "Timeline assembly + conform",
  },
  {
    name: "After Effects",
    image: "/assets/logos/aftereffects.png",
    role: "Motion graphics + compositing",
  },
  {
    name: "Blender",
    image: "/assets/logos/blender.png",
    role: "3D integration + environments",
  },
];

export const TICKER = [
  "SPORTS FILMS",
  "EVENT AFTERMOVIES",
  "RUSH VIDEOS",
  "CLUB RECAPS",
  "PLAYER HIGHLIGHTS",
  "GAMEDAY COVERAGE",
];

/* ── Links hub (the Instagram bio destination) ────────────── */
export const LINKS = [
  {
    title: "Book an event",
    meta: "What I cover",
    to: "/events",
    internal: true,
    primary: true,
  },
  { title: "2025 Cover Video", meta: "Full reel", to: "/video", internal: true },
  { title: "Selected work", meta: "Sports + events", to: "/#work", internal: true },
  { title: "Instagram", meta: CONTACT.instagramHandle, to: CONTACT.instagram },
  { title: "CamStem", meta: "camstem.org", to: "https://camstem.org" },
  { title: "Resume", meta: "PDF", to: "/resume", internal: true },
  { title: "Contact", meta: "Email · phone", to: "/contact", internal: true },
];

/* ── Event coverage ───────────────────────────────────────────
   Deliberately no rates anywhere on the site — every route into
   this work goes through the contact page.                     */
export const COVERAGE = [
  {
    name: "Rush films",
    blurb: "The pitch reel your house leads with. Brotherhood, chaos, and the nights that sell it.",
  },
  {
    name: "Party aftermovies",
    blurb: "Themed parties and blowouts, cut around the build-up and the drop.",
  },
  {
    name: "Club nights",
    blurb: "Friday-night recaps for venues, DJs and promoters — lights, crowd, energy.",
  },
  {
    name: "Formals & date parties",
    blurb: "The polished one. Slower, warmer, built to be rewatched years later.",
  },
  {
    name: "Concerts & festivals",
    blurb: "Sets, crowds and backstage. Artist-focused storytelling and tour visuals.",
  },
  {
    name: "Philanthropy & socials",
    blurb: "Chapter events that need to look as good as they felt.",
  },
];

/* ── In every project ─────────────────────────────────────── */
export const INCLUDED = [
  "Any format, any song",
  "1 week turnaround (latest)",
  "Full coverage — up to 5 hours",
  "Multiple revisions included",
  "Pro color grading + sound design",
  "Song approved before edit begins",
];

/* ── Optional extras, quoted per event ────────────────────── */
export const EXTRAS = [
  "Vertical and horizontal cuts",
  "Rush 24-hour turnaround",
  "Extended coverage past 5 hours",
  "Teaser clips for socials",
  "Cover photo + thumbnail exports",
  "Travel outside Tuscaloosa",
  "Out-of-state and fly-outs",
  "Long-term retainer work",
];

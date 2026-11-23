// Notes index. To publish a note:
//   1. write content/notes/<slug>.mdx (Markdown + the components in mdx-components.tsx)
//   2. add an entry below, newest first.
// The home page shows the 3 latest; nothing about notes appears there while the list is empty.

export type Note = {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-12-01" */
  date: string;
  tag: string;
  summary: string;
  /** Optional reading time in minutes. */
  minutes?: number;
  /** Optional cover image in /public, e.g. "/notes/my-note/cover.png". */
  cover?: string;
  /** Optional slug of the project this note is about. */
  project?: string;
};

export const notes: Note[] = [
  {
    slug: "rebuilding-my-portfolio",
    title: "Rebuilding my portfolio with Next.js and GSAP",
    date: "2026-11-22",
    tag: "Web",
    summary:
      "Moving a one-file site to Next.js without losing its animations: a hydration mismatch, a clipped font, a drifting ball and 159 MB of silent video.",
    minutes: 6,
    cover: "/projects/portfolio/poster.jpg",
    project: "portfolio",
  },
  {
    slug: "wearly-first-hardware",
    title: "Wearly: my first hardware product",
    date: "2026-11-19",
    tag: "Hardware",
    summary:
      "Smart hangers on an ESP32: two switches, one light, ESP-NOW to a hub, and what building it taught me about circuits and firmware.",
    minutes: 4,
    cover: "/projects/wearly/poster.jpg",
    project: "wearly",
  },
  {
    slug: "medmimic-trust-engine",
    title: "MedMimic: a patient who has to trust you first",
    date: "2026-11-08",
    tag: "Hackathon",
    summary:
      "Turning a psychiatric interview into rules: a trust score, unlockable disclosures, rewind and feedback that cites clinical guidelines.",
    minutes: 4,
    cover: "/projects/medmimic/poster.jpg",
    project: "medmimic",
  },
  {
    slug: "ecocart-reading-the-cart",
    title: "EcoCart: reading an Amazon cart for an AI",
    date: "2025-12-01",
    tag: "Hackathon",
    summary:
      "My part of a MakeUC 2025 winner: a Chrome extension that scrapes the cart, fills in missing product details and hands clean data to the AI.",
    minutes: 3,
    cover: "/projects/ecocart/poster.jpg",
    project: "ecocart",
  },
  {
    slug: "revolutionuc-organizer",
    title: "From hacker to organizer at RevolutionUC",
    date: "2025-05-01",
    tag: "Leadership",
    summary:
      "After hacking at RevolutionUC 2025, I joined its Web Team and rebuilt the website: clouds, a plane, new forms, and what organizing taught me about leadership.",
    minutes: 3,
  },
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}

const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export function formatNoteDate(iso: string) {
  return fmt.format(new Date(iso));
}

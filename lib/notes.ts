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
  // {
  //   slug: "building-medmimic",
  //   title: "Building MedMimic: rewinding a conversation with an AI patient",
  //   date: "2026-12-01",
  //   tag: "Hackathon",
  //   summary: "How the trust engine and rewind feature came together at MakeUC 2026.",
  //   minutes: 6,
  //   project: "medmimic",
  // },
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}

const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export function formatNoteDate(iso: string) {
  return fmt.format(new Date(iso));
}

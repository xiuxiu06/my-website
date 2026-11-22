import Link from "next/link";
import { NoteList } from "@/components/note-list";
import { notes } from "@/lib/notes";

/** Three latest notes on the home page; renders nothing until the first note exists. */
export function LatestNotes() {
  if (!notes.length) return null;

  return (
    <section aria-labelledby="notes-title" className="mx-auto max-w-[1200px] px-4 pb-28 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 id="notes-title" className="font-display text-[clamp(56px,7vw,76px)] leading-[0.9]">
          Notes
        </h2>
        <Link href="/notes" className="py-3 font-bold text-mint hover:text-mint-soft">
          All notes →
        </Link>
      </div>
      <NoteList notes={notes.slice(0, 3)} headingLevel={3} />
    </section>
  );
}

"use client";

import Link from "next/link";
import { useRef } from "react";
import { MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { type Note, formatNoteDate } from "@/lib/notes";

/** Rows of notes that rise in on scroll and nudge right on hover. */
export function NoteList({ notes, headingLevel = 2 }: { notes: Note[]; headingLevel?: 2 | 3 }) {
  const root = useRef<HTMLUListElement>(null);
  const Heading = `h${headingLevel}` as const;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        ScrollTrigger.batch("[data-note]", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.from(els, { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }),
        });
      });
    },
    { scope: root },
  );

  return (
    <ul ref={root} className="border-t border-line">
      {notes.map((n) => (
        <li key={n.slug} data-note className="border-b border-line">
          <Link
            href={`/notes/${n.slug}`}
            data-cursor="Read"
            className="group flex flex-wrap items-center gap-x-7 gap-y-2 py-6 transition-transform duration-300 hover:translate-x-2 motion-reduce:hover:translate-x-0"
          >
            <time dateTime={n.date} className="w-28 shrink-0 text-sm font-semibold text-dim">
              {formatNoteDate(n.date)}
            </time>
            <div className="flex min-w-0 flex-[999_1_380px] flex-col gap-1.5">
              <Heading className="text-[21px] leading-snug font-extrabold transition-colors group-hover:text-mint">
                {n.title}
              </Heading>
              <p className="text-[15px] leading-relaxed text-muted">
                {n.tag} · {n.summary}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="text-2xl font-bold text-mint opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-safe:-translate-x-2"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

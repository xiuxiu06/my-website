import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NoteList } from "@/components/note-list";
import { PageHeader } from "@/components/page-header";
import { formatNoteDate, notes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "What Tam Le learns from hackathons, research and building things.",
};

export default function NotesPage() {
  const [latest, ...rest] = notes;

  return (
    <div className="mx-auto max-w-[1000px] px-4 pt-18 pb-30 sm:px-6">
      <PageHeader title="Notes" intro="What I learn from hackathons, research and building things." />

      {!latest ? (
        <div className="flex flex-col items-start gap-5 rounded-3xl border-2 border-dashed border-line-strong p-10">
          <p className="text-[22px] font-extrabold">The first notes are on their way.</p>
          <p className="max-w-lg leading-relaxed text-muted">
            Write-ups about hackathons, research and building things will show up here. Meanwhile, the case studies
            tell the story behind each project.
          </p>
          <Link href="/projects" className="font-bold text-mint hover:text-mint-soft">
            Browse projects →
          </Link>
        </div>
      ) : (
        <>
          <Link
            href={`/notes/${latest.slug}`}
            data-cursor="Read"
            className="group mb-16 flex flex-wrap overflow-hidden rounded-[28px] border border-line bg-surface"
          >
            {latest.cover && (
              <div className="relative min-h-64 flex-[1_1_380px] overflow-hidden bg-[#0a0f0b]">
                <Image
                  src={latest.cover}
                  alt=""
                  fill
                  sizes="(min-width: 1000px) 500px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            )}
            <div className="flex flex-[1_1_340px] flex-col justify-center gap-3.5 p-9">
              <span className="text-xs font-extrabold tracking-[0.14em] text-dim uppercase">
                Latest · {latest.tag}
              </span>
              <h2 className="text-[clamp(26px,3vw,34px)] leading-tight font-extrabold">{latest.title}</h2>
              <p className="leading-relaxed text-muted">{latest.summary}</p>
              <span className="text-[15px] font-bold text-mint">
                <time dateTime={latest.date}>{formatNoteDate(latest.date)}</time> · Read note →
              </span>
            </div>
          </Link>

          {rest.length > 0 && (
            <>
              <h2 className="mb-2 text-[13px] font-extrabold tracking-[0.14em] text-dim uppercase">All notes</h2>
              <NoteList notes={rest} headingLevel={3} />
            </>
          )}
        </>
      )}
    </div>
  );
}

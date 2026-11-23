import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/reading-progress";
import { getProject } from "@/lib/content";
import { formatNoteDate, getNote, notes } from "@/lib/notes";

// Cache Components requires at least one param. Until the first note exists, a placeholder
// slug keeps the route buildable; it isn't in `notes`, so it renders the 404 page.
const PLACEHOLDER = "coming-soon";

export function generateStaticParams() {
  return notes.length ? notes.map((n) => ({ slug: n.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const n = getNote(slug);
  return n ? { title: n.title, description: n.summary } : {};
}

async function loadNote(slug: string) {
  try {
    return (await import(`@/content/notes/${slug}.mdx`)).default as React.ComponentType;
  } catch {
    return null;
  }
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = getNote(slug);
  const Body = note ? await loadNote(slug) : null;
  if (!note || !Body) notFound();

  const index = notes.indexOf(note);
  const newer = notes[index - 1];
  const older = notes[index + 1];
  const project = note.project ? getProject(note.project) : undefined;

  return (
    <article>
      <ReadingProgress />

      <header className="mx-auto flex max-w-[720px] flex-col gap-5 px-4 pt-14 pb-10 sm:px-6">
        <Link href="/notes" className="self-start py-2.5 font-semibold text-mint hover:text-mint-soft">
          ← All notes
        </Link>
        <p className="text-xs font-extrabold tracking-[0.14em] text-dim uppercase">
          {note.tag} · <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
          {note.minutes && <> · {note.minutes} min read</>}
        </p>
        <h1 className="text-[clamp(36px,5vw,54px)] leading-[1.12] font-extrabold tracking-tight">{note.title}</h1>
        <p className="text-xl leading-relaxed text-muted">{note.summary}</p>
      </header>

      {note.cover && (
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-surface">
            <Image src={note.cover} alt="" fill preload sizes="(min-width: 1000px) 952px, 100vw" className="object-cover" />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[720px] px-4 pt-12 pb-16 sm:px-6">
        <Body />

        {project && (
          <Link
            href={`/projects/${project.slug}`}
            data-cursor="View"
            className="mt-14 flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-line bg-surface px-7 py-6 transition-colors hover:border-mint"
          >
            <span className="flex flex-col gap-1">
              <span className="text-xs font-extrabold tracking-[0.14em] text-dim uppercase">Related project</span>
              <span className="text-[19px] font-extrabold">{project.title}</span>
            </span>
            <span className="font-bold text-mint">Read case study →</span>
          </Link>
        )}
      </div>

      {(newer || older) && (
        <nav aria-label="More notes" className="border-t border-line">
          <div className="mx-auto grid max-w-[1000px] gap-5 px-4 pt-10 pb-24 sm:grid-cols-2 sm:px-6">
            {older && (
              <Link href={`/notes/${older.slug}`} className="flex flex-col gap-1.5 rounded-[20px] border border-line p-6 transition-colors hover:border-mint">
                <span className="text-[13px] font-bold text-dim">← Older</span>
                <span className="text-lg font-extrabold">{older.title}</span>
              </Link>
            )}
            {newer && (
              <Link href={`/notes/${newer.slug}`} className="flex flex-col gap-1.5 rounded-[20px] border border-line p-6 text-right transition-colors hover:border-mint sm:col-start-2">
                <span className="text-[13px] font-bold text-dim">Newer →</span>
                <span className="text-lg font-extrabold">{newer.title}</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </article>
  );
}

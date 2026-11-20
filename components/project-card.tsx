import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

type Props = {
  project: Project;
  /** Label above the title, e.g. "01 · Hackathon". */
  eyebrow?: string;
  className?: string;
  sizes?: string;
};

const MAX_TAGS = 3;

export function ProjectCard({ project: p, eyebrow, className = "", sizes = "(min-width: 900px) 560px, 100vw" }: Props) {
  const extra = p.tech.length - MAX_TAGS;

  return (
    <Link
      href={`/projects/${p.slug}`}
      data-cursor="View"
      className={`group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-[translate,border-color] duration-300 hover:-translate-y-1.5 hover:border-mint ${className}`}
    >
      <div data-card-media className="relative aspect-[16/10] overflow-hidden bg-[#0a0f0b]">
        {p.poster ? (
          <Image
            data-card-img
            src={p.poster}
            alt=""
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex size-full items-center justify-center border-b border-line">
            <span className="font-display text-[clamp(48px,6vw,72px)] leading-none text-mint">{p.short}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-[13px] font-bold text-dim">{eyebrow ?? `${p.year} · ${p.kind}`}</span>
        <h3 className="text-[22px] leading-tight font-extrabold">{p.title}</h3>
        <p className="flex items-start gap-2 text-[15px] font-semibold">
          <svg aria-hidden="true" className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-mint)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
          {p.outcome}
        </p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Tech stack">
          {p.tech.slice(0, MAX_TAGS).map((t) => (
            <li key={t} className="rounded-full border border-line-strong px-2.5 py-1 text-xs font-semibold text-sand">
              {t}
            </li>
          ))}
          {extra > 0 && <li className="px-1 py-1 text-xs font-semibold text-dim">+{extra}</li>}
        </ul>
      </div>
    </Link>
  );
}

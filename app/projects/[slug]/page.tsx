import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/content";

// Every project is prerendered; unknown slugs hit notFound() below.
// (dynamicParams isn't allowed together with cacheComponents.)
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.title, description: p.blurb } : {};
}

/** The case study body is optional: content/projects/<slug>.mdx */
async function loadCaseStudy(slug: string) {
  try {
    return (await import(`@/content/projects/${slug}.mdx`)).default as React.ComponentType;
  } catch {
    return null;
  }
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const CaseStudy = await loadCaseStudy(slug);
  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];

  const links = [
    p.links.live && { href: p.links.live, label: "Live site" },
    p.links.repo && { href: p.links.repo, label: "GitHub" },
    p.links.devpost && { href: p.links.devpost, label: "Devpost" },
  ].filter(Boolean) as { href: string; label: string }[];

  const meta = [
    { term: "Role", value: p.role },
    { term: "Timeline", value: p.timeline ?? p.year },
    { term: "Team", value: p.team },
    { term: "Stack", value: p.tech.join(", ") },
  ].filter((m) => m.value);

  return (
    <article>
      <header className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 pt-10 pb-10 sm:px-6">
        <Link href="/projects" className="self-start py-2.5 font-semibold text-mint hover:text-mint-soft">
          ← All projects
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-4">
            <h1 className="font-display text-[clamp(64px,9vw,128px)] leading-[0.85]">{p.short}</h1>
            <p className="max-w-[680px] text-[22px] leading-normal font-semibold">{p.blurb}</p>
          </div>
          {links.length > 0 && (
            <div className="flex flex-[1_1_260px] flex-wrap gap-3">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    i === 0
                      ? "rounded-full bg-mint px-6 py-3.5 font-bold text-black transition-colors hover:bg-mint-soft"
                      : "rounded-full border-2 border-line-strong px-[22px] py-3 font-bold transition-colors hover:border-cream"
                  }
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        {p.awards && (
          <ul aria-label="Awards" className="flex flex-wrap gap-2.5">
            {p.awards.map((a) => (
              <li key={a} className="flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-bold">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
                </svg>
                {a}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* No media yet: skip the box rather than repeat the title in it. */}
        {(p.video || p.poster) && (
        <div className="relative aspect-video overflow-hidden rounded-[28px] border border-line bg-[#0a0f0b]">
          {p.video ? (
            <video
              controls
              playsInline
              preload="none"
              poster={p.poster}
              className="size-full object-cover"
              aria-label={`${p.short} demo video`}
            >
              <source src={p.video} type="video/mp4" />
            </video>
          ) : (
            <Image src={p.poster!} alt={`${p.short} screenshot`} fill preload sizes="(min-width: 1200px) 1152px, 100vw" className="object-cover" />
          )}
        </div>
        )}

        <dl className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-px overflow-hidden rounded-[20px] border border-line bg-line">
          {meta.map((m) => (
            <div key={m.term} className="flex flex-col gap-1.5 bg-ink px-6 py-5">
              <dt className="text-xs font-bold tracking-[0.12em] text-dim uppercase">{m.term}</dt>
              <dd className="font-bold">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto max-w-[760px] px-4 pt-18 pb-24 sm:px-6">
        {CaseStudy ? (
          <CaseStudy />
        ) : (
          <p className="text-lg leading-relaxed text-muted">A longer write-up for this project is on its way.</p>
        )}
      </div>

      <Link
        href={`/projects/${next.slug}`}
        data-cursor="Next"
        className="group block border-t border-line bg-surface transition-colors duration-300 hover:bg-mint hover:text-black"
      >
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-bold tracking-[0.12em] uppercase">Next project</span>
            <span className="font-display text-[clamp(44px,6vw,76px)] leading-[0.95]">{next.short}</span>
          </div>
          <span aria-hidden="true" className="text-[44px] font-bold transition-transform duration-300 group-hover:translate-x-3">
            →
          </span>
        </div>
      </Link>
    </article>
  );
}

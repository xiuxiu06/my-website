import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { PageHeader } from "@/components/page-header";
import { allAwards, education, experience, honors, skills } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "Research labs, internships and the communities Tam Le builds for.",
};

export default function ExperiencePage() {
  const awards = allAwards();

  return (
    <div className="mx-auto max-w-[1000px] px-4 pt-18 pb-30 sm:px-6">
      <PageHeader
        title="Experience"
        intro="Research labs, internships and the communities I build for."
        ring="software · AI · design · research ·"
      />

      <a
        href={site.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-16 inline-flex items-center gap-2.5 rounded-full bg-mint px-6 py-3.5 font-bold text-black transition-colors hover:bg-mint-soft"
      >
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
        </svg>
        Download resume
      </a>

      <ExperienceTimeline roles={experience} />

      <div className="mt-24 grid gap-5 md:grid-cols-2">
        <section aria-labelledby="edu-title" className="flex flex-col gap-2.5 rounded-3xl border border-line bg-surface p-8">
          <h2 id="edu-title" className="mb-1.5 text-[13px] font-extrabold tracking-[0.14em] text-dim uppercase">
            Education
          </h2>
          <p className="text-[22px] font-extrabold">{education.school}</p>
          <p className="font-semibold text-sand">
            {education.degree} · {education.minor}
          </p>
          <p className="text-[15px] font-semibold text-mint">{education.program}</p>
          <p className="text-[15px] text-muted">
            {education.graduation} · GPA <span className="font-bold text-cream">{education.gpa}</span>
          </p>
          <ul aria-label="Relevant coursework" className="mt-3 flex flex-wrap gap-2">
            {education.coursework.map((c) => (
              <li key={c} className="rounded-full border border-line-strong px-2.5 py-1 text-xs font-semibold text-sand">
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="awards-title" className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-8">
          <div className="flex items-end gap-4">
            <span aria-hidden="true" className="font-display text-[96px] leading-[0.8] text-mint">
              {awards.length + honors.length}
            </span>
            <h2 id="awards-title" className="pb-2 text-[13px] font-extrabold tracking-[0.14em] text-dim uppercase">
              Awards &amp; recognition
            </h2>
          </div>
          <ul className="flex flex-col gap-2 text-[15px] leading-snug font-bold">
            {awards.map(({ award, project }) => (
              <li key={award + project.slug}>
                {award}{" "}
                <Link href={`/projects/${project.slug}`} className="font-semibold text-mint hover:text-mint-soft">
                  ({project.short})
                </Link>
              </li>
            ))}
            {honors.map((h) => (
              <li key={h.title}>
                {h.title} <span className="font-semibold text-muted">· {h.org}, {h.date}</span>
                {h.detail && <span className="mt-1 block text-[14px] font-medium text-dim">{h.detail}</span>}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="skills-title" className="mt-5 rounded-3xl border border-line bg-surface p-8">
        <h2 id="skills-title" className="mb-5 text-[13px] font-extrabold tracking-[0.14em] text-dim uppercase">
          Skills
        </h2>
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-[140px_1fr]">
          {skills.map(({ group, items }) => (
            <div key={group} className="contents">
              <dt className="pt-1 font-extrabold">{group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <li key={s} className="rounded-full border border-line-strong px-2.5 py-1 text-xs font-semibold text-sand">
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

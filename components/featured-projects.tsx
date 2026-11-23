"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/content";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";

/**
 * Featured projects on /projects: one wide row each, image and text alternating sides.
 * Each row is a single link to the case study.
 */
export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.utils.toArray<HTMLElement>("[data-feature]").forEach((row) => {
          const media = row.querySelector("[data-feature-media]");
          const img = row.querySelector("[data-feature-img]");
          const text = row.querySelectorAll("[data-feature-text] > *");

          // Image opens up from a smaller rounded window, text rises in after it.
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 85%", once: true } })
            .fromTo(
              media,
              { clipPath: "inset(14% 10% 14% 10% round 24px)" },
              { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.1, ease: "power3.out", clearProps: "clipPath" },
            )
            .from(text, { y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.07, ease: "power3.out" }, 0.15);

          // Slow parallax inside the frame (component-level ScrollTrigger, not data-speed).
          gsap.fromTo(
            img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="flex flex-col gap-20 lg:gap-28">
      {projects.map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <li key={p.slug} data-feature>
            <Link
              href={`/projects/${p.slug}`}
              data-cursor="View"
              className="group grid items-center gap-8 rounded-3xl lg:grid-cols-12 lg:gap-12"
            >
              <div
                data-feature-media
                className={`relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-[#0a0f0b] transition-[border-color] duration-300 group-hover:border-mint lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
              >
                <div data-feature-img className="absolute inset-x-0 -inset-y-[6%]">
                  {p.poster ? (
                    <Image
                      src={p.poster}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 700px, 100vw"
                      preload={i === 0}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center">
                      <span className="font-display text-[clamp(56px,8vw,96px)] leading-none text-mint">{p.short}</span>
                    </div>
                  )}
                </div>
              </div>

              <div data-feature-text className="flex flex-col gap-4 lg:col-span-5">
                <span className="text-[13px] font-bold text-dim">
                  <span className="font-mono text-sand">{String(i + 1).padStart(2, "0")}</span>
                  {"  ·  "}
                  {p.year} · {p.kind}
                </span>
                <h2 className="text-[clamp(28px,3vw,40px)] leading-[1.1] font-extrabold text-balance">{p.title}</h2>
                <p className="text-base leading-relaxed text-sand">{p.blurb}</p>
                <p className="flex items-start gap-2 text-[15px] font-semibold">
                  <svg aria-hidden="true" className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-mint)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  {p.outcome}
                </p>
                <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                  {p.tech.map((t) => (
                    <li key={t} className="rounded-full border border-line-strong px-2.5 py-1 text-xs font-semibold text-sand">
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="mt-2 inline-flex items-center gap-2 text-[15px] font-bold text-mint">
                  Read case study
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

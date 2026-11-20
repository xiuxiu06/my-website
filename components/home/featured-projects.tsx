"use client";

import Link from "next/link";
import { useRef } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/content";
import { DESKTOP_MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

/**
 * Desktop: the section pins and the cards scroll sideways (the old horizontal scroller).
 * Mobile / reduced motion: a plain vertical list.
 */
export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MOTION, () => {
        const distance = () => track.current!.scrollWidth - track.current!.clientWidth;

        const scroller = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 1,
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((slide) => {
          gsap.from(slide, {
            y: 48,
            scale: 0.96,
            autoAlpha: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: slide,
              containerAnimation: scroller,
              start: "left 95%",
              end: "left 60%",
              scrub: 0.6,
            },
          });

          const img = slide.querySelector("[data-card-img]");
          if (img) {
            gsap.fromTo(
              img,
              { xPercent: -6, scale: 1.15 },
              {
                xPercent: 6,
                ease: "none",
                scrollTrigger: { trigger: slide, containerAnimation: scroller, start: "left right", end: "right left", scrub: true },
              },
            );
          }
        });
      });

      mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.batch("[data-slide]", {
          start: "top 88%",
          once: true,
          onEnter: (els) => gsap.from(els, { y: 40, autoAlpha: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" }),
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="featured-title"
      className="flex flex-col justify-center overflow-hidden py-24 min-[901px]:min-h-dvh min-[901px]:py-16"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 id="featured-title" className="font-display text-[clamp(56px,7vw,76px)] leading-[0.9]">
          Featured work
        </h2>
        <Link href="/projects" className="py-3 font-bold text-mint hover:text-mint-soft">
          View all projects →
        </Link>
      </div>

      <div
        ref={track}
        className="flex flex-col gap-6 min-[901px]:flex-row min-[901px]:overflow-visible"
      >
        {projects.map((p, i) => (
          <div key={p.slug} data-slide className="flex min-[901px]:w-[min(520px,40vw)] min-[901px]:shrink-0">
            <ProjectCard
              project={p}
              eyebrow={`${String(i + 1).padStart(2, "0")} · ${p.kind} · ${p.year}`}
              className="w-full"
            />
          </div>
        ))}

        <Link
          href="/projects"
          data-slide
          data-cursor="All"
          className="group flex min-h-48 items-center justify-center rounded-3xl border-2 border-dashed border-line-strong p-10 text-center transition-colors hover:border-mint min-[901px]:w-[min(360px,28vw)] min-[901px]:shrink-0"
        >
          <span className="font-display text-[clamp(44px,4.5vw,64px)] leading-[0.95] transition-colors group-hover:text-mint">
            See all
            <br />
            projects →
          </span>
        </Link>
      </div>
      </div>
    </section>
  );
}

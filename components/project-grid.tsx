"use client";

import { useRef, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { PROJECT_FILTERS, type Project, type ProjectFilter } from "@/lib/content";
import { Flip, MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

type Filter = "All" | ProjectFilter;

/**
 * Bento grid with filter chips. Every card stays in the DOM (hidden when filtered out),
 * so GSAP Flip can slide the remaining cards to their new spots and fade the others.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const prevHeight = useRef(0);
  const [filter, setFilter] = useState<Filter>("All");

  const filters = (["All", ...PROJECT_FILTERS] as Filter[])
    .map((label) => ({
      label,
      count: label === "All" ? projects.length : projects.filter((p) => p.tags.includes(label)).length,
    }))
    .filter((f) => f.count > 0);

  const choose = (next: Filter) => {
    if (next === filter) return;
    if (window.matchMedia(MOTION).matches) {
      flipState.current = Flip.getState("[data-flip-item]");
      prevHeight.current = grid.current!.offsetHeight;
    }
    setFilter(next);
  };

  // Entrance: cards rise in as they scroll into view.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        ScrollTrigger.batch("[data-flip-item]", {
          start: "top 92%",
          once: true,
          onEnter: (els) => gsap.from(els, { y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }),
        });
      });
    },
    { scope: root },
  );

  // After a filter change has rendered, animate from the previous layout.
  useGSAP(
    () => {
      const state = flipState.current;
      if (!state) return;
      flipState.current = null;
      // Ease the grid's height too, so the footer doesn't jump while cards move.
      gsap.fromTo(
        grid.current,
        { height: prevHeight.current },
        { height: "auto", duration: 0.55, ease: "power2.inOut", clearProps: "height" },
      );
      Flip.from(state, {
        targets: "[data-flip-item]",
        duration: 0.55,
        ease: "power2.inOut",
        scale: true,
        absolute: true,
        nested: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.45 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.92, duration: 0.3 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    },
    { scope: root, dependencies: [filter] },
  );

  return (
    <div ref={root}>
      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {filters.map(({ label, count }) => {
          const active = label === filter;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={active}
              onClick={() => choose(label)}
              className={`rounded-full border-2 px-[18px] py-2.5 text-sm transition-colors ${
                active
                  ? "border-cream bg-cream font-bold text-black"
                  : "border-line-strong font-semibold text-sand hover:border-cream"
              }`}
            >
              {label} <span className={active ? "text-black/60" : "text-dim"}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {filter === "All" ? `Showing all ${projects.length} projects` : `Showing ${filter} projects`}
      </p>

      <ul ref={grid} className="grid grid-flow-dense grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const visible = filter === "All" || p.tags.includes(filter);
          return (
            <li
              key={p.slug}
              data-flip-item
              data-flip-id={p.slug}
              className={`flex ${visible ? "" : "hidden"} ${p.big ? "md:col-span-2 lg:row-span-2" : ""}`}
            >
              <ProjectCard
                project={p}
                big={p.big}
                headingLevel={2}
                className="w-full"
                sizes={p.big ? "(min-width: 1024px) 800px, 100vw" : "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

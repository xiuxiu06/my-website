"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { type Role, formatRange, orgInitials, roleStatus } from "@/lib/content";
import { MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { useToday } from "@/lib/use-today";

const yearOf = (r: Role) => new Date(r.start).getUTCFullYear();

/**
 * Vertical timeline. On tablet/desktop a big year is pinned beside it and changes to the
 * year of the role you're reading, whose badge lights up. The line draws itself as you scroll.
 * (ScrollSmoother breaks CSS sticky, so the year is pinned with ScrollTrigger.)
 */
export function ExperienceTimeline({ roles }: { roles: Role[] }) {
  const root = useRef<HTMLDivElement>(null);
  const yearCol = useRef<HTMLDivElement>(null);
  const today = useToday();
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-role]");
      const mm = gsap.matchMedia();

      // Pinning isn't motion for its own sake, so it also runs with reduced motion.
      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: root.current,
          start: "top 30%",
          end: "bottom 50%",
          pin: yearCol.current,
          pinSpacing: false,
        });
        items.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      });

      mm.add(MOTION, () => {
        gsap.from("[data-timeline-line]", {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: { trigger: "[data-timeline]", start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        });
        ScrollTrigger.batch(items, {
          start: "top 85%",
          once: true,
          onEnter: (els) => {
            gsap.from(els, { x: -32, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" });
            gsap.from(
              els.map((el) => el.querySelector("[data-role-badge]")),
              { scale: 0.6, duration: 0.6, stagger: 0.12, ease: "back.out(2)" },
            );
          },
        });
      });
    },
    { scope: root },
  );

  const activeYear = yearOf(roles[active] ?? roles[0]);

  return (
    <div ref={root} className="flex gap-10">
      {/* Pinned year (tablet and up) */}
      <div className="hidden w-[200px] shrink-0 md:block" aria-hidden="true">
        {/* overflow-clip hides the year while it rolls in; pt leaves room for Modak's tall glyphs */}
        <div ref={yearCol} className="overflow-clip pt-3">
          <span
            key={activeYear}
            className="block font-display text-[84px] leading-[0.9] whitespace-nowrap text-mint motion-safe:animate-[year-in_450ms_cubic-bezier(.2,.8,.2,1)]"
          >
            {activeYear}
          </span>
          <span className="mt-2 block text-xs font-extrabold tracking-[0.14em] text-dim uppercase">
            {active + 1} / {roles.length}
          </span>
        </div>
      </div>

      <div data-timeline className="relative min-w-0 flex-1">
        {/* Runs through the centre of the 56px badges */}
        <div data-timeline-line aria-hidden="true" className="absolute top-7 bottom-7 left-[27px] w-0.5 bg-line-strong" />

        <ol className="relative flex flex-col gap-12">
          {roles.map((r, i) => {
            const status = today ? roleStatus(r, today) : null;
            const ring =
              status === "upcoming"
                ? "border-dashed border-mint"
                : status === "current"
                  ? "border-mint"
                  : "border-line-strong";
            const lit = i === active;

            return (
              <li key={r.role + r.org} data-role className="flex gap-5 sm:gap-7">
                <span
                  data-role-badge
                  aria-hidden="true"
                  className={`flex size-14 shrink-0 items-center justify-center rounded-full border-2 text-[15px] font-extrabold transition-[background-color,color,box-shadow] duration-300 ${ring} ${
                    lit ? "bg-mint text-black shadow-[0_0_0_6px_rgb(154_235_163/0.18)] md:border-mint" : "bg-surface"
                  }`}
                >
                  {orgInitials(r.org)}
                </span>

                <div className="flex min-w-0 flex-1 flex-col gap-2.5 pt-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
                    <h2 className="flex flex-wrap items-center gap-3 text-2xl leading-snug font-extrabold">
                      {r.role}
                      {status === "current" && (
                        <span className="rounded-md bg-mint px-2 py-1 text-[11px] font-extrabold tracking-widest text-black uppercase">
                          Now
                        </span>
                      )}
                      {status === "upcoming" && (
                        <span className="rounded-md border-[1.5px] border-dashed border-mint px-2 py-[3px] text-[11px] font-extrabold tracking-widest text-mint uppercase">
                          Upcoming
                        </span>
                      )}
                    </h2>
                    <span className="text-sm font-semibold text-dim">{formatRange(r, status)}</span>
                  </div>
                  <p className="font-semibold text-muted">
                    {r.org} · {r.place}
                  </p>
                  {r.points.length > 0 && (
                    <ul className="mt-1 flex list-disc flex-col gap-1.5 pl-5 leading-relaxed text-sand marker:text-mint">
                      {r.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  )}
                  {r.tech.length > 0 && (
                    <ul aria-label="Tools" className="flex flex-wrap gap-2 pt-1">
                      {r.tech.map((t) => (
                        <li key={t} className="rounded-full border border-line-strong px-2.5 py-1 text-xs font-semibold text-sand">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                  {r.note && (
                    <Link
                      href={`/notes/${r.note}`}
                      data-cursor="Read"
                      className="self-start pt-1 font-bold text-mint hover:text-mint-soft"
                    >
                      Read the story →
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { type Role, formatRange, orgInitials, roleStatus } from "@/lib/content";
import { MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { useToday } from "@/lib/use-today";

/** Vertical timeline: the line draws itself as you scroll, each role slides in. */
export function ExperienceTimeline({ roles }: { roles: Role[] }) {
  const root = useRef<HTMLDivElement>(null);
  const today = useToday();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from("[data-timeline-line]", {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        });
        ScrollTrigger.batch("[data-role]", {
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

  return (
    <div ref={root} className="relative">
      {/* Runs through the centre of the 56px badges */}
      <div data-timeline-line aria-hidden="true" className="absolute top-7 bottom-7 left-[27px] w-0.5 bg-line-strong" />

      <ol className="relative flex flex-col gap-12">
        {roles.map((r) => {
          const status = today ? roleStatus(r, today) : null;
          const ring =
            status === "upcoming" ? "border-dashed border-mint" : status === "current" ? "border-mint" : "border-line-strong";

          return (
            <li key={r.role + r.org} data-role className="flex gap-5 sm:gap-7">
              <span
                data-role-badge
                aria-hidden="true"
                className={`flex size-14 shrink-0 items-center justify-center rounded-full border-2 bg-surface text-[15px] font-extrabold ${ring}`}
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
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

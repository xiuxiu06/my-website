"use client";

import Link from "next/link";
import { useRef } from "react";
import { type Role, formatRange, roleStatus } from "@/lib/content";
import { MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { useToday } from "@/lib/use-today";

export function ExperienceSummary({ roles }: { roles: Role[] }) {
  const root = useRef<HTMLElement>(null);
  const today = useToday();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.set("[data-row-line]", { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.batch("[data-row]", {
          start: "top 88%",
          once: true,
          onEnter: (rows) => {
            gsap.from(rows, { x: -24, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" });
            gsap.to(
              rows.map((r) => r.querySelector("[data-row-line]")),
              { scaleX: 1, duration: 1, stagger: 0.12, ease: "power2.inOut" },
            );
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="exp-title" className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 id="exp-title" className="font-display text-[clamp(56px,7vw,76px)] leading-[0.9]">
          Experience
        </h2>
        <Link href="/experience" className="py-3 font-bold text-mint hover:text-mint-soft">
          Full experience →
        </Link>
      </div>

      <ol>
        {roles.map((r) => {
          // Before hydration we don't know today's date: no badge, neutral dates.
          const status = today ? roleStatus(r, today) : null;
          return (
            <li key={r.role + r.org} data-row className="relative flex flex-wrap items-center gap-x-8 gap-y-2 py-7">
              <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-1">
                <h3 className="flex flex-wrap items-center gap-3 text-[22px] font-extrabold">
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
                </h3>
                <p className="text-[15px] text-muted">{r.org}</p>
              </div>
              <span className="flex-none text-sm font-semibold text-dim">{formatRange(r, status)}</span>
              <span data-row-line aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-line" />
            </li>
          );
        })}
      </ol>
    </section>
  );
}

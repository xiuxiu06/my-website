"use client";

import { useRef } from "react";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";

const WORDS = ["Design", "Code", "Create"];
const TECH = ["React", "Next.js", "Python", "PyTorch", "TypeScript", "Gemini", "Figma"];

// Lines are ~4× the viewport wide, so shifting them by 25% never shows an edge.
const repeat = (items: string[], times: number) => Array.from({ length: times }, () => items).flat();

/** Two lines that slide in opposite directions while you scroll past. */
export function RunningBanner() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.set("[data-line-2]", { xPercent: -25 });
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "+=1400", scrub: true },
          })
          .to("[data-line-1]", { xPercent: -25, ease: "none" }, 0)
          .to("[data-line-2]", { xPercent: 0, ease: "none" }, 0);
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden="true" className="overflow-hidden bg-mint py-5 text-black">
      <div data-line-1 className="flex w-max gap-12 whitespace-nowrap font-display text-[clamp(44px,5vw,64px)] leading-none">
        {repeat(WORDS, 7).map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            {w} <span className="text-[0.5em]">✦</span>
          </span>
        ))}
      </div>
      <div data-line-2 className="mt-3 flex w-max gap-10 whitespace-nowrap text-xl font-extrabold tracking-wide uppercase">
        {repeat(TECH, 5).map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

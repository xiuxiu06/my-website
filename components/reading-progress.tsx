"use client";

import { useRef } from "react";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";

/** Thin mint bar at the very top that fills as you read the page. */
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
      );
    });
  });

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left scale-x-0 bg-mint motion-reduce:hidden"
    />
  );
}

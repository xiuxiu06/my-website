"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { MOTION, ScrollSmoother, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

/**
 * ScrollSmoother wrapper (smooth scrolling). Parallax lives in each section's own ScrollTriggers.
 * Fixed elements (header, cursor) must live outside this component.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MOTION} and (pointer: fine)`, () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapper.current!,
        content: wrapper.current!.firstElementChild as HTMLElement,
        smooth: 1.4,
        // No data-speed auto-scan: it edits page elements before React hydrates them.
        effects: false,
      });
      ScrollTrigger.refresh();
      return () => smoother.kill();
    });
  });

  // In-page anchors (#contact, …) have to go through the smoother.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || !ScrollSmoother.get()) return;
      const hash = a.getAttribute("href")!;
      if (!document.querySelector(hash)) return;
      e.preventDefault();
      history.pushState(null, "", hash);
      scrollToHash(hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}

/** On every route change: jump to the top (or the #hash) and re-measure ScrollTriggers. */
export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) scrollToHash(window.location.hash);
    else ScrollSmoother.get()?.scrollTop(0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}

function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(target, true, "top top");
  else target.scrollIntoView({ behavior: "smooth" });
}

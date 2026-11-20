"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

/** Fixed header that slides away when scrolling down and comes back when scrolling up. */
export function HideOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Plays forward to hide, reverses to show.
    const hideTween = gsap.to(ref.current, {
      yPercent: -110,
      duration: 0.3,
      ease: "power2.out",
      paused: true,
    });
    let hidden = false;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const hide = self.direction === 1 && self.scroll() > 120;
        if (hide === hidden) return;
        hidden = hide;
        if (hide) hideTween.play();
        else hideTween.reverse();
      },
    });
  });

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      {children}
    </header>
  );
}

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

    const setHidden = (hide: boolean) => {
      if (hide === hidden) return;
      hidden = hide;
      if (hide) hideTween.play();
      else hideTween.reverse();
    };

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setHidden(self.direction === 1 && self.scroll() > 120),
    });

    // Tabbing into the nav while it's tucked away brings it back.
    const onFocusIn = () => setHidden(false);
    ref.current!.addEventListener("focusin", onFocusIn);
    return () => ref.current?.removeEventListener("focusin", onFocusIn);
  });

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      {children}
    </header>
  );
}

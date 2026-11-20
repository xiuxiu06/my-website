"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const HOVERABLE = "a, button, input, textarea, [data-cursor]";

/** Dot + trailing ring cursor. Mouse only; touch devices keep the native cursor. */
export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const ripples = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [state, setState] = useState<"idle" | "hover" | "active">("idle");

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine)", () => {
      document.documentElement.classList.add("has-custom-cursor");
      const parts = gsap.utils.toArray<HTMLElement>("[data-cursor-part]", root.current);
      gsap.set(parts, { xPercent: -50, yPercent: -50 });
      const xTo = parts.map((el) => gsap.quickTo(el, "x", { duration: 0.25, ease: "power3" }));
      const yTo = parts.map((el) => gsap.quickTo(el, "y", { duration: 0.25, ease: "power3" }));

      const onMove = (e: PointerEvent) => {
        gsap.set(root.current, { autoAlpha: 1 });
        xTo.forEach((fn) => fn(e.clientX));
        yTo.forEach((fn) => fn(e.clientY));
      };
      const onOver = (e: PointerEvent) => {
        const el = (e.target as HTMLElement).closest<HTMLElement>(HOVERABLE);
        setState(el ? "hover" : "idle");
        setLabel(el?.dataset.cursor ?? "");
      };
      const onDown = (e: PointerEvent) => {
        setState("active");
        const r = document.createElement("div");
        r.className = "pointer-events-none absolute left-0 top-0 size-3 rounded-full bg-mint/20";
        ripples.current?.appendChild(r);
        gsap.fromTo(
          r,
          { xPercent: -50, yPercent: -50, x: e.clientX, y: e.clientY, scale: 0.2, opacity: 0.9 },
          { scale: 3, opacity: 0, duration: 0.55, ease: "power2.out", onComplete: () => r.remove() },
        );
      };
      const onUp = () => setState("hover");
      const onKey = (e: KeyboardEvent) => e.key === "Tab" && gsap.set(root.current, { autoAlpha: 0 });

      window.addEventListener("pointermove", onMove);
      document.addEventListener("pointerover", onOver);
      document.addEventListener("pointerdown", onDown);
      document.addEventListener("pointerup", onUp);
      window.addEventListener("keydown", onKey);
      return () => {
        document.documentElement.classList.remove("has-custom-cursor");
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerdown", onDown);
        document.removeEventListener("pointerup", onUp);
        window.removeEventListener("keydown", onKey);
      };
    });
  });

  const ringSize = label ? "size-20 bg-mint border-mint" : state === "hover" ? "size-14 border-cream" : "size-9 border-mint";

  return (
    // Blend mode keeps the plain cursor visible on both dark and mint backgrounds.
    <div
      ref={root}
      aria-hidden="true"
      className={`pointer-events-none invisible fixed inset-0 z-[9999] opacity-0 ${label ? "" : "mix-blend-difference"}`}
    >
      <div
        data-cursor-part
        className={`absolute left-0 top-0 flex items-center justify-center rounded-full border-2 transition-[width,height,background-color,border-color] duration-200 ${ringSize}`}
      >
        {label && <span className="text-xs font-extrabold uppercase tracking-wider text-black">{label}</span>}
      </div>
      <div
        data-cursor-part
        className={`absolute left-0 top-0 size-2 rounded-full transition-transform duration-150 ${
          label ? "opacity-0" : "bg-cream"
        } ${state === "active" ? "scale-50 bg-mint" : ""}`}
      />
      <div ref={ripples} />
    </div>
  );
}

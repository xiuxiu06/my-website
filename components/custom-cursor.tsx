"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const HOVERABLE = "a, button, input, textarea, select, [data-cursor]";

/**
 * Paper-plane cursor (same motif as the hero flight path). Its nose sits exactly on the
 * pointer and it points up-left like a normal arrow, so clicking stays precise. No lag.
 * Over links it turns mint and dips; over [data-cursor] elements it becomes a label pill.
 * Mouse only: touch devices keep the native cursor.
 */
export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [onLight, setOnLight] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine)", () => {
      document.documentElement.classList.add("has-custom-cursor");
      const setX = gsap.quickSetter(root.current, "x", "px");
      const setY = gsap.quickSetter(root.current, "y", "px");

      const onMove = (e: PointerEvent) => {
        gsap.set(root.current, { autoAlpha: 1 });
        setX(e.clientX);
        setY(e.clientY);
      };
      const onOver = (e: PointerEvent) => {
        const target = e.target as HTMLElement;
        const el = target.closest<HTMLElement>(HOVERABLE);
        setHover(!!el);
        setLabel(el?.dataset.cursor ?? "");
        setOnLight(isOnLightBackground(target));
      };
      const onDown = () => setPressed(true);
      const onUp = () => setPressed(false);
      const onLeave = () => gsap.set(root.current, { autoAlpha: 0 });
      const onKey = (e: KeyboardEvent) => e.key === "Tab" && onLeave();

      window.addEventListener("pointermove", onMove);
      document.addEventListener("pointerover", onOver);
      document.addEventListener("pointerdown", onDown);
      document.addEventListener("pointerup", onUp);
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("keydown", onKey);
      return () => {
        document.documentElement.classList.remove("has-custom-cursor");
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerdown", onDown);
        document.removeEventListener("pointerup", onUp);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("keydown", onKey);
      };
    });
  });

  // Dark plane on mint/cream areas, cream (mint when hovering a link) on the dark page.
  const color = onLight ? "text-ink" : hover ? "text-mint" : "text-cream";
  const plane = label
    ? "scale-0" // hidden behind the label pill
    : `${color} ${hover ? "-rotate-[18deg]" : ""} ${pressed ? "scale-[0.82]" : ""}`;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none invisible fixed top-0 left-0 z-[9999] opacity-0"
    >
      {/* Rotates/scales around the nose (top-left corner = the pointer). */}
      <div className={`origin-top-left transition-[rotate,scale,color] duration-200 ease-out motion-reduce:transition-none ${plane}`}>
        <svg width="30" height="30" viewBox="0 0 30 30" className="block overflow-visible">
          {/* Nose at 0,0 pointing up-left, like an arrow cursor */}
          <g transform="rotate(-135) scale(0.42)">
            {/* Same two tones as the hero plane; all dark on light backgrounds */}
            <path d="M0 0 L-64 -26 L-46 -1 Z" fill="currentColor" />
            <path d="M0 0 L-46 -1 L-58 20 Z" fill={onLight ? "currentColor" : "var(--color-mint)"} opacity={onLight ? 0.6 : 1} />
          </g>
        </svg>
      </div>

      {label && (
        <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-mint px-3.5 py-2 text-xs font-extrabold tracking-wider whitespace-nowrap text-black uppercase shadow-lg motion-safe:animate-[cursor-pop_180ms_ease-out]">
          {label} →
        </span>
      )}
    </div>
  );
}

/** True when the first opaque background behind `el` is light (mint buttons, the footer…). */
function isOnLightBackground(el: HTMLElement | null) {
  for (let node = el; node; node = node.parentElement) {
    const m = getComputedStyle(node).backgroundColor.match(/[\d.]+/g);
    if (!m) continue;
    const [r, g, b, a = "1"] = m;
    if (Number(a) < 0.5) continue;
    const luminance = (0.2126 * +r + 0.7152 * +g + 0.0722 * +b) / 255;
    return luminance > 0.6;
  }
  return false;
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/lib/content";
import { MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

/** Same query as the `hover-preview` variant in globals.css. */
const HOVER_PREVIEW = "(pointer: fine) and (min-width: 768px)";
const PREVIEW_WIDTH = 320;

/**
 * Compact list of the remaining projects. With a mouse on a wide screen, hovering a row shows
 * its poster floating next to the pointer; elsewhere each row has a small inline thumbnail.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  // Rows rise in as they scroll into view.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        ScrollTrigger.batch("[data-index-row]", {
          start: "top 92%",
          once: true,
          // clearProps: an inline opacity would block the hover dimming below.
          onEnter: (els) =>
            gsap.from(els, {
              y: 24,
              autoAlpha: 0,
              duration: 0.6,
              stagger: 0.06,
              ease: "power3.out",
              clearProps: "opacity,visibility,transform",
            }),
        });
      });
    },
    { scope: root },
  );

  // Floating preview that follows the pointer.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ preview: HOVER_PREVIEW, motion: MOTION }, (ctx) => {
        if (!ctx.conditions?.preview) return;
        const smooth = ctx.conditions.motion;
        const list = root.current!.querySelector<HTMLElement>("[data-index-list]")!;
        const el = preview.current!;
        const dur = smooth ? 0.45 : 0;
        const xTo = gsap.quickTo(el, "x", { duration: dur, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: dur, ease: "power3" });
        const rotTo = gsap.quickTo(el, "rotation", { duration: smooth ? 0.6 : 0, ease: "power3" });
        gsap.set(el, { yPercent: -50, autoAlpha: 0, scale: smooth ? 0.85 : 1 });
        let lastX = 0;

        // Position is relative to the wrapper: ScrollSmoother transforms the page, which
        // would break position: fixed.
        const place = (e: PointerEvent, instant = false) => {
          const box = root.current!.getBoundingClientRect();
          const x = Math.min(e.clientX - box.left + 28, box.width - PREVIEW_WIDTH);
          const y = e.clientY - box.top;
          if (instant) {
            gsap.set(el, { x, y });
          } else {
            xTo(x);
            yTo(y);
            // Lean a little in the direction of travel.
            if (smooth) rotTo(gsap.utils.clamp(-5, 5, (e.clientX - lastX) * 0.4));
          }
          lastX = e.clientX;
        };

        const onEnter = (e: PointerEvent) => {
          place(e, true);
          gsap.to(el, { autoAlpha: 1, scale: 1, duration: smooth ? 0.35 : 0, ease: "power2.out", overwrite: "auto" });
        };
        const onMove = (e: PointerEvent) => {
          place(e);
          const row = (e.target as HTMLElement).closest<HTMLElement>("[data-slug]");
          if (row) setActive(row.dataset.slug!);
        };
        const onLeave = () => {
          rotTo(0);
          gsap.to(el, { autoAlpha: 0, scale: smooth ? 0.85 : 1, duration: smooth ? 0.3 : 0, ease: "power2.in", overwrite: "auto" });
        };

        list.addEventListener("pointerenter", onEnter);
        list.addEventListener("pointermove", onMove);
        list.addEventListener("pointerleave", onLeave);
        return () => {
          list.removeEventListener("pointerenter", onEnter);
          list.removeEventListener("pointermove", onMove);
          list.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <ul data-index-list className="group/list border-b border-line">
        {projects.map((p) => (
          <li
            key={p.slug}
            data-index-row
            data-slug={p.slug}
            className="transition-opacity duration-300 hover-preview:group-hover/list:opacity-45 hover-preview:hover:opacity-100"
          >
            <Link
              href={`/projects/${p.slug}`}
              data-cursor="View"
              className="group flex items-center gap-4 border-t border-line py-5 md:gap-6 md:py-7"
            >
              {/* Inline thumbnail where there is no hover preview */}
              <div className="relative aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-lg border border-line bg-[#0a0f0b] hover-preview:hidden">
                {p.poster && <Image src={p.poster} alt="" fill sizes="80px" className="object-cover" />}
              </div>

              <span className="hidden w-16 shrink-0 font-mono text-sm text-dim hover-preview:block">{p.year}</span>

              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <h3 className="text-[clamp(18px,2.4vw,30px)] leading-tight font-extrabold transition-transform duration-300 hover-preview:group-hover:translate-x-2">
                  {p.title}
                </h3>
                <span className="text-[13px] font-semibold text-dim hover-preview:hidden">
                  {p.year} · {p.tags.join(" · ")}
                </span>
              </div>

              <span className="hidden w-56 shrink-0 text-right text-sm font-semibold text-sand hover-preview:block">
                {p.tags.join(" · ")}
              </span>

              <svg
                aria-hidden="true"
                className="shrink-0 -rotate-45 text-dim transition-[rotate,color] duration-300 group-hover:rotate-0 group-hover:text-mint group-focus-visible:rotate-0 group-focus-visible:text-mint"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>

      {/* Floating preview (wide screens with a mouse only) */}
      <div
        ref={preview}
        aria-hidden="true"
        style={{ width: PREVIEW_WIDTH }}
        className="pointer-events-none invisible absolute top-0 left-0 z-10 hidden aspect-[16/10] overflow-hidden rounded-2xl border border-line-strong bg-[#0a0f0b] opacity-0 shadow-2xl shadow-black/60 hover-preview:block"
      >
        {projects.map((p) =>
          p.poster ? (
            <Image
              key={p.slug}
              src={p.poster}
              alt=""
              fill
              sizes={`${PREVIEW_WIDTH}px`}
              className={`object-cover transition-opacity duration-300 ${active === p.slug ? "opacity-100" : "opacity-0"}`}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}

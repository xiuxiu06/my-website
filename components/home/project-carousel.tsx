"use client";

import Link from "next/link";
import { useRef } from "react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/content";
import { Draggable, MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

const DRIFT = 0.45; // px per frame of idle drift to the left
const SETS = 2; // the list is rendered twice so the loop never shows an edge

/**
 * Infinite, draggable project slider (after GSAP's "Infinite card slider" demo).
 * It drifts slowly, speeds up with page scroll, can be dragged/thrown with inertia
 * and snaps to a card. Clones are inert, so keyboard and screen readers only see one set.
 */
export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const proxy = useRef<HTMLDivElement>(null);
  const api = useRef<{ go: (dir: 1 | -1) => void; show: (index: number) => void } | null>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-slide]", track.current);
      const step = () => cards[1].offsetLeft - cards[0].offsetLeft; // card width + gap
      const setWidth = () => step() * projects.length;
      const setX = gsap.quickSetter(track.current, "x", "px");

      let x = 0; // unwrapped position; drawn wrapped into [-setWidth, 0)
      let hovering = false;
      let dragging = false;
      let boost = 0; // extra drift from page scroll velocity
      let tween: gsap.core.Tween | null = null;
      const pos = { x: 0 };

      const render = () => setX(gsap.utils.wrap(-setWidth(), 0, x));
      const motion = window.matchMedia(MOTION);

      // Animate to a position snapped to a whole card.
      const moveTo = (target: number) => {
        tween?.kill();
        pos.x = x;
        tween = gsap.to(pos, {
          x: Math.round(target / step()) * step(),
          duration: motion.matches ? 0.6 : 0,
          ease: "power3.out",
          onUpdate: () => {
            x = pos.x;
            render();
          },
        });
      };

      api.current = {
        go: (dir) => moveTo(x - dir * step()),
        // Bring card `index` of the real set to the left edge (keyboard focus).
        show: (index) => {
          const wrapped = gsap.utils.wrap(-setWidth(), 0, x);
          moveTo(x - wrapped - index * step());
        },
      };

      // Idle drift + scroll boost, only when motion is welcome.
      const tick = () => {
        if (!motion.matches || dragging || tween?.isActive()) return;
        boost *= 0.92;
        if (!hovering) x -= (DRIFT + boost) * gsap.ticker.deltaRatio();
        else x -= boost * gsap.ticker.deltaRatio();
        render();
      };
      gsap.ticker.add(tick);

      const scroll = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          boost = gsap.utils.clamp(-14, 14, self.getVelocity() / 120);
        },
      });

      let startX = 0;
      const [drag] = Draggable.create(proxy.current, {
        type: "x",
        trigger: viewport.current,
        inertia: true,
        dragClickables: true, // the cards are links
        minimumMovement: 6,
        allowContextMenu: true,
        onPress() {
          tween?.kill();
          startX = x;
          gsap.set(proxy.current, { x: 0 });
          this.update();
        },
        onDragStart: () => {
          dragging = true;
          viewport.current?.classList.add("cursor-grabbing");
        },
        onDrag() {
          x = startX + this.x;
          render();
        },
        onThrowUpdate() {
          x = startX + this.x;
          render();
        },
        onRelease: () => viewport.current?.classList.remove("cursor-grabbing"),
        onThrowComplete: () => {
          dragging = false;
        },
        snap: { x: (v: number) => Math.round((startX + v) / step()) * step() - startX },
      });

      const onEnter = () => (hovering = true);
      const onLeave = () => (hovering = false);
      viewport.current!.addEventListener("pointerenter", onEnter);
      viewport.current!.addEventListener("pointerleave", onLeave);

      render();
      return () => {
        gsap.ticker.remove(tick);
        scroll.kill();
        drag.kill();
        tween?.kill();
        viewport.current?.removeEventListener("pointerenter", onEnter);
        viewport.current?.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: root, dependencies: [projects.length] },
  );

  return (
    <section ref={root} aria-labelledby="featured-title" aria-roledescription="carousel" className="overflow-clip py-24">
      <div className="mx-auto mb-10 flex max-w-[1200px] flex-wrap items-end justify-between gap-4 px-4 sm:px-6">
        <div className="flex flex-col gap-2">
          <h2 id="featured-title" className="font-display text-[clamp(56px,7vw,76px)] leading-[0.9]">
            Selected work
          </h2>
          <p className="text-[15px] text-muted">Drag, swipe or use the arrows.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => api.current?.go(-1)}
            className="flex size-12 items-center justify-center rounded-full border-2 border-line-strong text-xl transition-colors hover:border-cream"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => api.current?.go(1)}
            className="flex size-12 items-center justify-center rounded-full border-2 border-line-strong text-xl transition-colors hover:border-cream"
          >
            →
          </button>
          <Link href="/projects" className="ml-2 py-3 font-bold text-mint hover:text-mint-soft">
            View all →
          </Link>
        </div>
      </div>

      {/* Draggable listens on this viewport; the invisible proxy only measures the drag. */}
      <div
        ref={viewport}
        className="cursor-grab touch-pan-y select-none"
        onDragStart={(e) => e.preventDefault()}
      >
        <div ref={proxy} aria-hidden="true" className="hidden" />
        <div ref={track} className="flex w-max gap-6 pl-4 will-change-transform sm:pl-6 min-[1248px]:pl-[calc((100vw-1200px)/2+24px)]">
          {Array.from({ length: SETS }, (_, set) =>
            projects.map((p, i) => (
              <div
                key={`${set}-${p.slug}`}
                data-slide
                aria-hidden={set > 0 || undefined}
                inert={set > 0}
                // Keyboard focus only: a mouse press also focuses the link and must not jump the track.
                onFocusCapture={
                  set === 0
                    ? (e) => (e.target as HTMLElement).matches(":focus-visible") && api.current?.show(i)
                    : undefined
                }
                className="flex w-[min(440px,82vw)] shrink-0"
              >
                <ProjectCard
                  project={p}
                  eyebrow={`${String(i + 1).padStart(2, "0")} · ${p.kind} · ${p.year}`}
                  className="w-full"
                  sizes="(min-width: 600px) 440px, 82vw"
                />
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  );
}

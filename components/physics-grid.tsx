"use client";

import { useEffect, useRef, useState } from "react";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";

const PULL_DISTANCE = 120;

/** Cell size + gap per breakpoint (matches the old contact grid). */
function cellMetrics(width: number) {
  if (width <= 480) return { size: 45, gap: 10 };
  if (width <= 768) return { size: 60, gap: 10 };
  return { size: 80, gap: 12 };
}

/**
 * Grid of dots that lean toward the pointer and explode when clicked.
 * Purely decorative: fills its positioned parent.
 */
export function PhysicsGrid() {
  const root = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ cols: 0, rows: 0, size: 80, gap: 12 });

  // Work out how many cells fit, and redo it when the area resizes.
  useEffect(() => {
    const el = root.current!;
    const measure = () => {
      const { size, gap } = cellMetrics(window.innerWidth);
      const padding = 40; // p-5 on both sides
      const cols = Math.max(1, Math.floor((el.clientWidth - padding + gap) / (size + gap)));
      const rows = Math.max(1, Math.floor((el.clientHeight - padding + gap) / (size + gap)));
      setGrid((g) => (g.cols === cols && g.rows === rows && g.size === size ? g : { cols, rows, size, gap }));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION} and (pointer: fine)`, () => {
        const cells = gsap.utils.toArray<HTMLElement>("[data-cell]");
        if (!cells.length) return;
        const pulled = new Set<HTMLElement>();
        let exploding = false;

        const onMove = (e: PointerEvent) => {
          if (exploding) return;
          const area = root.current!.getBoundingClientRect();
          const inside = e.clientY > area.top - PULL_DISTANCE && e.clientY < area.bottom + PULL_DISTANCE;
          if (!inside && !pulled.size) return;

          cells.forEach((cell) => {
            const r = cell.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            const dist = Math.hypot(dx, dy);
            if (inside && dist < PULL_DISTANCE) {
              const pull = (1 - dist / PULL_DISTANCE) * 0.95;
              pulled.add(cell);
              gsap.to(cell, { x: dx * pull, y: dy * pull, duration: 0.18, ease: "power2.out", overwrite: "auto" });
            } else if (pulled.has(cell)) {
              pulled.delete(cell);
              gsap.to(cell, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
            }
          });
        };

        const onClick = (index: number) => {
          if (exploding) return;
          exploding = true;
          gsap.to(cells, {
            duration: 1.6,
            physics2D: { velocity: "random(400, 1000)", angle: "random(250, 290)", gravity: 2000 },
            stagger: { amount: 0.3, from: index },
            onComplete() {
              this.timeScale(-1.3);
            },
            onReverseComplete() {
              exploding = false;
              pulled.clear();
              gsap.to(cells, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            },
          });
        };

        const clickHandlers = cells.map((cell, i) => {
          const fn = () => onClick(i);
          cell.addEventListener("pointerup", fn);
          return fn;
        });
        window.addEventListener("pointermove", onMove);
        return () => {
          window.removeEventListener("pointermove", onMove);
          cells.forEach((cell, i) => cell.removeEventListener("pointerup", clickHandlers[i]));
        };
      });
    },
    { scope: root, dependencies: [grid.cols, grid.rows], revertOnUpdate: true },
  );

  return (
    <div ref={root} aria-hidden="true" className="absolute inset-0 overflow-hidden p-5">
      <div
        className="grid size-full justify-center"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, ${grid.size}px)`,
          gridAutoRows: `${grid.size}px`,
          gap: grid.gap,
        }}
      >
        {Array.from({ length: grid.cols * grid.rows }, (_, i) => (
          <div key={i} data-cell className="flex items-center justify-center">
            <span className="size-2.5 rounded-full bg-black/25 md:size-3" />
          </div>
        ))}
      </div>
    </div>
  );
}

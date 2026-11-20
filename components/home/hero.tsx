"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { experience, roleStatus } from "@/lib/content";
import { DESKTOP_MOTION, MOTION, SplitText, gsap, useGSAP } from "@/lib/gsap";
import { useToday } from "@/lib/use-today";
import stickerCoding from "@/public/images/sticker-love-coding.png";
import stickerCreating from "@/public/images/sticker-love-creating.png";
import portrait from "@/public/images/tam.png";

// Decorative path from the old About section.
const LINE_PATH =
  "M34.5037 34.5034C296.004 209.003 376.004 43.5033 604.004 68.0034C832.004 92.5035 1326 317.503 1389.5 190.503C1453 63.5035 1210.18 9.93811 1130.5 85.0034C1016.77 192.16 1055.27 436.333 1447 444.503C2113.16 458.398 1584.05 955.496 2128.5 662.903";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const status = useStatusLine();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION, () => {
        const split = SplitText.create("[data-hero-title]", { type: "words,chars", mask: "words" });
        gsap.set("[data-reveal]", { autoAlpha: 1 });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-hero-status]", { y: 20, autoAlpha: 0, duration: 0.6 })
          .from(split.chars, { yPercent: 110, duration: 0.8, stagger: 0.035 }, 0.1)
          .from("[data-hero-photo]", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut" }, 0.2)
          .from("[data-hero-fade]", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.6);

        // Stickers spin as you scroll past the hero.
        gsap.utils.toArray<HTMLElement>("[data-spin]").forEach((el) => {
          gsap.to(el, {
            rotate: -360,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          });
        });
      });

      mm.add(DESKTOP_MOTION, () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: "[data-line-stage]", start: "top 70%", end: "bottom 20%", scrub: true },
          })
          .to("[data-line-ball]", { autoAlpha: 1, duration: 0.01 })
          .from("[data-line]", { drawSVG: 0, duration: 1 }, 0)
          .to(
            "[data-line-ball]",
            { duration: 1, motionPath: { path: "[data-line]", align: "[data-line]", alignOrigin: [0.5, 0.5] } },
            0,
          );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div data-spin className="pointer-events-none absolute top-24 left-0 z-10 hidden w-[clamp(110px,14vw,220px)] -translate-x-1/2 md:block" aria-hidden="true">
        <Image src={stickerCoding} alt="" />
      </div>
      <div data-spin className="pointer-events-none absolute top-[62%] right-0 z-10 w-[clamp(110px,14vw,220px)] translate-x-1/2" aria-hidden="true">
        <Image src={stickerCreating} alt="" />
      </div>

      <div className="relative z-[1] mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-4 pt-16 pb-24 sm:px-6 lg:pt-20 lg:pb-28">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-6">
          <p
            data-reveal
            data-hero-status
            className="flex items-center gap-2.5 self-start rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold"
          >
            <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-mint" />
            </span>
            <span>{status ?? " "}</span>
          </p>

          <h1
            id="hero-title"
            data-reveal
            data-hero-title
            className="font-display text-[clamp(76px,10vw,152px)] leading-[0.86]"
          >
            Hello, I&apos;m <span className="text-mint">Tam!</span>
          </h1>

          <p data-reveal data-hero-fade className="max-w-xl text-[22px] leading-snug font-bold">
            Computer Science student building software and AI, with a designer&apos;s eye.
          </p>

          <div data-reveal data-hero-fade className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-mint px-[26px] py-3.5 font-bold text-black transition-colors hover:bg-mint-soft"
            >
              See my work
            </Link>
            <Link
              href="/experience"
              className="rounded-full border-2 border-line-strong px-6 py-3 font-bold transition-colors hover:border-cream"
            >
              Experience
            </Link>
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_320px] justify-center" data-speed="0.92">
          <div
            data-reveal
            data-hero-photo
            className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-t-[220px] rounded-b-[32px] bg-surface"
          >
            <Image
              src={portrait}
              alt="Portrait of Tam"
              fill
              preload
              sizes="(min-width: 900px) 420px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div data-line-stage className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[60%] lg:block" aria-hidden="true">
        <svg viewBox="-50 0 1600 500" className="size-full overflow-visible" preserveAspectRatio="xMidYMax slice">
          <path data-line d={LINE_PATH} fill="none" stroke="var(--color-line)" strokeWidth="30" strokeLinecap="round" />
          <circle data-line-ball r="20" cx="0" cy="0" fill="var(--color-mint)" opacity="0" />
        </svg>
      </div>
    </section>
  );
}

/** "Incoming: …" before the next role starts, "Currently: …" while it runs. */
function useStatusLine() {
  const today = useToday();
  if (!today) return null;

  const upcoming = experience
    .filter((r) => roleStatus(r, today) === "upcoming")
    .sort((a, b) => a.start.localeCompare(b.start))[0];
  if (upcoming) {
    const month = new Date(upcoming.start).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
    return `Incoming: ${upcoming.shortRole ?? upcoming.role} @ ${upcoming.org}, ${month}`;
  }

  const current = experience
    .filter((r) => roleStatus(r, today) === "current")
    .sort((a, b) => b.start.localeCompare(a.start))[0];
  return current ? `Currently: ${current.shortRole ?? current.role} @ ${current.org}` : null;
}

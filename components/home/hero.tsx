"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { DESKTOP_MOTION, MOTION, SplitText, gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { CircleText } from "@/components/circle-text";
import portrait from "@/public/images/tam.png";

// Wave with a loop (same idea as the old About line), drawn in its own band under the hero.
const LINE_PATH =
  "M20 150C220 40 380 230 600 150C820 70 980 40 1140 120C1260 180 1330 80 1260 50C1190 20 1150 140 1260 170C1380 205 1480 150 1580 110";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION, () => {
        // Masks get the class "hero-word-mask"; globals.css pads them so Modak's tall
        // glyphs aren't clipped by the tight line-height.
        const split = SplitText.create("[data-hero-title]", {
          type: "words,chars",
          mask: "words",
          wordsClass: "hero-word",
        });
        gsap.set("[data-reveal]", { autoAlpha: 1 });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-hero-intro]", { y: 20, autoAlpha: 0, duration: 0.6 })
          .from(split.chars, {
            yPercent: 110,
            duration: 0.8,
            stagger: 0.035,
            // Back to plain text once revealed, so nothing can clip it afterwards.
            onComplete: () => split.revert(),
          }, 0.1)
          .from("[data-hero-photo]", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut" }, 0.2)
          .from("[data-hero-fade]", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1 }, 0.6);

        // Photo drifts up slightly slower than the page.
        gsap.to("[data-hero-parallax]", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

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
            // Starts with the page's first scroll, so it is always empty on load, whatever the screen height.
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 40%", scrub: 0.6 },
          })
          .to("[data-line-ball]", { autoAlpha: 1, duration: 0.01 })
          .from("[data-line]", { drawSVG: 0, duration: 1 }, 0)
          // Ball and path share the SVG's coordinates, so follow the path directly (no `align`,
          // which measures on screen and drifts while ScrollSmoother is moving the page).
          .to("[data-line-ball]", { duration: 1, motionPath: { path: "[data-line]" } }, 0);
      });
    },
    { scope: root },
  );

  return (
    // overflow-clip (not hidden): the half-offscreen stickers must never make the section scrollable.
    <section ref={root} aria-labelledby="hero-title" className="relative overflow-clip">
      <div data-spin className="pointer-events-none absolute top-24 left-0 z-10 hidden w-[clamp(110px,14vw,220px)] -translate-x-1/2 text-cream md:block">
        <CircleText text="I love coding!" />
      </div>
      <div data-spin className="pointer-events-none absolute top-[62%] right-0 z-10 w-[clamp(110px,14vw,220px)] translate-x-1/2 text-cream">
        <CircleText text="I love creating!" />
      </div>

      <div className="relative z-[1] mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-4 pt-16 pb-24 sm:px-6 min-[901px]:pb-6 lg:pt-20">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-6">
          <p
            data-reveal
            data-hero-intro
            className="flex items-center gap-2 self-start rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-mint)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {site.intro.school}
            <span className="hidden sm:inline">· {site.intro.city}</span>
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

        <div className="flex min-w-0 flex-[1_1_320px] justify-center" data-hero-parallax>
          <div
            data-reveal
            data-hero-photo
            // bg-mint matches the photo's own backdrop (#9AEBA3); its top ~15% is transparent.
            className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-t-[220px] rounded-b-[32px] bg-mint"
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

      {/* Own band below the content, so the line never runs through the text or the photo. */}
      <div data-line-stage className="pointer-events-none hidden pb-12 min-[901px]:block" aria-hidden="true">
        <svg viewBox="0 0 1600 240" className="h-auto w-full overflow-visible">
          {/* Faint track so the band isn't empty before you scroll */}
          <path d={LINE_PATH} fill="none" stroke="var(--color-line)" strokeWidth="24" strokeLinecap="round" />
          <path data-line d={LINE_PATH} fill="none" stroke="var(--color-line-strong)" strokeWidth="24" strokeLinecap="round" />
          <circle data-line-ball r="18" cx="0" cy="0" fill="var(--color-mint)" opacity="0" />
        </svg>
      </div>
    </section>
  );
}

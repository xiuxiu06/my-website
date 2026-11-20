"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  DrawSVGPlugin,
  MotionPathPlugin,
  Physics2DPlugin,
);

/** Media queries shared by every animation, for gsap.matchMedia(). */
export const MOTION = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";

export { gsap, ScrollSmoother, ScrollTrigger, SplitText, useGSAP };

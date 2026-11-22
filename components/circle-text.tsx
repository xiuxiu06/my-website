import { useId } from "react";

type Props = {
  /** Phrase to wrap around the circle; it is repeated `repeat` times. */
  text: string;
  repeat?: number;
  className?: string;
};

const R = 82; // radius in the 200×200 viewBox
const CIRCUMFERENCE = 2 * Math.PI * R;

/**
 * Text running around a circle (the "I love coding!" stickers), drawn as SVG.
 * `textLength` spreads the letters evenly over the full circle, so any phrase closes the loop.
 */
export function CircleText({ text, repeat = 2, className = "" }: Props) {
  const id = useId();
  const content = Array.from({ length: repeat }, () => text).join(" ");
  // SVG drops the trailing space, so leave roughly one character's slot free where
  // the end meets the start; otherwise "coding!I love" runs together at the seam.
  const textLength = (CIRCUMFERENCE * content.length) / (content.length + 1);

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={`overflow-visible ${className}`}>
      {/* Circle starting at the top, going clockwise */}
      <path id={id} d={`M100,${100 - R} a${R},${R} 0 1,1 0,${2 * R} a${R},${R} 0 1,1 0,${-2 * R}`} fill="none" />
      <text className="fill-current font-sans text-[18px] font-bold">
        <textPath href={`#${id}`} textLength={textLength} lengthAdjust="spacing">
          {content}
        </textPath>
      </text>
    </svg>
  );
}

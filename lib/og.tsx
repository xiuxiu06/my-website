import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Shared look for every Open Graph image (home + each project).
// next/og needs TTF/OTF fonts, so these live in assets/fonts (OFL licensed).

export const OG_SIZE = { width: 1200, height: 630 };

const INK = "#070b08";
const CREAM = "#f6efdd";
const MINT = "#9aeba3";
const DIM = "#8f8a7e";

const fonts = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Modak-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Montserrat-Bold.ttf")),
]);

type Props = {
  eyebrow: string;
  title: string;
  /** Second title line, drawn in mint. */
  accent?: string;
  subtitle: string;
};

export async function renderOgImage({ eyebrow, title, accent, subtitle }: Props) {
  const [modak, montserrat] = await fonts;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          background: INK,
          color: CREAM,
          fontFamily: "Montserrat",
        }}
      >
        {/* Paper plane and dashed trail, like the hero (pinned just above the band) */}
        <svg
          width="1200"
          height="120"
          viewBox="0 0 1200 120"
          style={{ position: "absolute", left: 0, bottom: 92 }}
        >
          <path
            d="M0 100 C240 30 420 120 640 70 S960 20 1060 50"
            fill="none"
            stroke={CREAM}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="14 14"
          />
          <g transform="translate(1090 42) rotate(-14) scale(1.2)">
            <path d="M34 0 L-30 -26 L-12 -1 Z" fill={CREAM} />
            <path d="M34 0 L-12 -1 L-24 20 Z" fill={MINT} />
          </g>
        </svg>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, padding: "56px 72px 0" }}>
          <div style={{ display: "flex", fontSize: 24, color: DIM, letterSpacing: 2, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Modak",
              fontSize: accent ? 120 : 140,
              lineHeight: 0.9,
            }}
          >
            <span>{title}</span>
            {accent && <span style={{ color: MINT }}>{accent}</span>}
          </div>
          <div style={{ display: "flex", fontSize: 28, maxWidth: 880, lineHeight: 1.35 }}>{subtitle}</div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 92,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 72px",
            background: MINT,
            color: "#000",
            fontSize: 28,
          }}
        >
          <span style={{ fontFamily: "Modak", fontSize: 44 }}>Tam</span>
          <span>tamle.site</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Modak", data: modak, style: "normal", weight: 400 },
        { name: "Montserrat", data: montserrat, style: "normal", weight: 700 },
      ],
    },
  );
}

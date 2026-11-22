import { OG_SIZE, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: software, AI and design portfolio`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: `${site.intro.school} · ${site.intro.city}`,
    title: "Hello, I'm",
    accent: "Tam!",
    subtitle: site.description,
  });
}

import { getProject, projects } from "@/lib/content";
import { OG_SIZE, renderOgImage } from "@/lib/og";

// Prerendered at build for every project (reading the font files at request time
// isn't allowed with Cache Components, so this route must stay fully static).
export const alt = "Project by Tam Le";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return renderOgImage({
    eyebrow: p ? `Project · ${p.outcome}` : "Project",
    title: p?.short ?? "Project",
    subtitle: p?.blurb ?? "",
  });
}

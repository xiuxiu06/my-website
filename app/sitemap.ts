import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { notes } from "@/lib/notes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/experience", "/notes"].map((path) => ({ url: `${site.url}${path}` }));
  return [
    ...pages,
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}` })),
    ...notes.map((n) => ({ url: `${site.url}/notes/${n.slug}`, lastModified: n.date })),
  ];
}

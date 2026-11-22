import type { Metadata } from "next";
import { FeaturedProjects } from "@/components/featured-projects";
import { PageHeader } from "@/components/page-header";
import { ProjectIndex } from "@/components/project-index";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Hackathon builds, research tools and side projects by Tam Le.",
};

const featured = projects.filter((p) => p.featured);
const rest = projects.filter((p) => !p.featured);

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-18 pb-30 sm:px-6">
      <PageHeader
        title="Projects"
        intro="Hackathon builds, research tools and side projects, each with a short case study."
        ring="code · build · ship · learn · create ·"
      />
      <FeaturedProjects projects={featured} />

      <section aria-labelledby="more-builds" className="mt-28 lg:mt-36">
        <h2 id="more-builds" className="mb-8 flex items-baseline gap-3 text-[clamp(26px,3vw,36px)] font-extrabold">
          More builds <span className="font-mono text-base font-semibold text-dim">{rest.length}</span>
        </h2>
        <ProjectIndex projects={rest} />
      </section>
    </div>
  );
}

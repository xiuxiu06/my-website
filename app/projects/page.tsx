import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectGrid } from "@/components/project-grid";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Hackathon builds, research tools and side projects by Tam Le.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-18 pb-30 sm:px-6">
      <PageHeader
        title="Projects"
        intro="Hackathon builds, research tools and side projects, each with a short case study."
        ring="code · build · ship · learn · create ·"
      />
      <ProjectGrid projects={projects} />
    </div>
  );
}

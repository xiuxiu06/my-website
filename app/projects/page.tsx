import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-18 pb-30 sm:px-6">
      <PageHeader
        title="Projects"
        intro="Hackathon builds, research tools and side projects, each with a short case study."
      />
      <p className="text-dim">Coming soon: project grid.</p>
    </div>
  );
}

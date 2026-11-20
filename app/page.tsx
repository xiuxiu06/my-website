import { ExperienceSummary } from "@/components/home/experience-summary";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { RunningBanner } from "@/components/home/running-banner";
import { experience, projects } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RunningBanner />
      <FeaturedProjects projects={projects.filter((p) => p.featured)} />
      <ExperienceSummary roles={experience} />
    </>
  );
}

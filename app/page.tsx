import { ExperienceSummary } from "@/components/home/experience-summary";
import { Hero } from "@/components/home/hero";
import { LatestNotes } from "@/components/home/latest-notes";
import { ProjectCarousel } from "@/components/home/project-carousel";
import { RunningBanner } from "@/components/home/running-banner";
import { experience, projects } from "@/lib/content";

export default function HomePage() {
  // Featured projects lead the loop; the rest follow.
  const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

  return (
    <>
      <Hero />
      <RunningBanner />
      <ProjectCarousel projects={ordered} />
      <ExperienceSummary roles={experience} />
      <LatestNotes />
    </>
  );
}

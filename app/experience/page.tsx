import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 pt-18 pb-30 sm:px-6">
      <PageHeader
        title="Experience"
        intro="Research labs, internships and the communities I build for."
        ring="software · AI · design · research ·"
      />
      <p className="text-dim">Coming soon: experience timeline.</p>
    </div>
  );
}

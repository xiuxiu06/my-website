import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Notes" };

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 pt-18 pb-30 sm:px-6">
      <PageHeader
        title="Notes"
        intro="What I learn from hackathons, research and building things."
      />
      <p className="text-dim">Coming soon: notes list.</p>
    </div>
  );
}

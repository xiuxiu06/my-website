import { site } from "@/lib/site";
import { PhysicsGrid } from "./physics-grid";

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-mint text-black">
      <PhysicsGrid />

      {/* Content lets clicks through to the grid, except on its own links. */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[70dvh] max-w-[1200px] flex-col justify-between gap-12 px-4 pt-24 pb-10 sm:px-6">
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-[clamp(64px,9vw,128px)] leading-[0.88]">
            Let&apos;s build
            <br />
            something!
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="pointer-events-auto self-start text-[clamp(18px,2vw,24px)] font-bold underline decoration-2 underline-offset-4 hover:decoration-4"
          >
            {site.email}
          </a>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="pointer-events-auto flex flex-wrap gap-3">
            {site.socials.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-black px-[22px] py-3.5 text-[15px] font-bold text-mint transition-colors hover:text-mint-soft"
              >
                {label}
              </a>
            ))}
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-black px-5 py-3 text-[15px] font-bold"
            >
              Resume
            </a>
          </div>
          <p className="text-sm font-semibold">
            {site.location} · © {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

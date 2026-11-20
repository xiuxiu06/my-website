import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-mint text-black">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-8 px-4 py-20 sm:px-6">
        <h2 className="font-display text-[clamp(56px,7vw,104px)] leading-[0.9]">
          Let&apos;s build something!
        </h2>
        <div className="flex flex-wrap gap-3">
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
      </div>
      <p className="mx-auto max-w-[1200px] px-4 pb-8 text-sm font-semibold sm:px-6">
        © {site.name}
      </p>
    </footer>
  );
}

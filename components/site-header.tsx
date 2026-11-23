import Link from "next/link";
import { Suspense } from "react";
import { site } from "@/lib/site";
import { HideOnScroll } from "./hide-on-scroll";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

export const HEADER_HEIGHT = "h-[70px]";

export function SiteHeader() {
  return (
    <HideOnScroll>
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6 ${HEADER_HEIGHT}`}
      >
        <Link
          href="/"
          aria-label={`${site.name} — Home`}
          className="pt-1.5 font-display text-[40px] leading-none text-mint"
        >
          Tam
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {/* usePathname needs a Suspense boundary with cacheComponents */}
          <Suspense fallback={<NavLinks pathname="" />}>
            <NavLinks />
          </Suspense>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-full border-2 border-line-strong px-[18px] py-2.5 text-[15px] font-bold transition-colors hover:border-cream"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="rounded-full bg-mint px-5 py-3 text-[15px] font-bold text-black transition-colors hover:bg-mint-soft"
          >
            Contact
          </a>
        </div>

        <Suspense fallback={null}>
          <MobileMenu />
        </Suspense>
      </nav>
    </HideOnScroll>
  );
}

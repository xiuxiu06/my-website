"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, site } from "@/lib/site";

type Props = {
  /** Pass a pathname to render without reading the router (Suspense fallback). */
  pathname?: string;
};

export function NavLinks({ pathname }: Props) {
  return pathname === undefined ? <ActiveLinks /> : <Links pathname={pathname} />;
}

function ActiveLinks() {
  return <Links pathname={usePathname()} />;
}

function Links({ pathname }: { pathname: string }) {
  return site.nav.map(({ href, label }) => {
    const active = isActivePath(pathname, href);
    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        className={`px-3.5 py-3 text-[15px] transition-colors hover:text-mint ${
          active
            ? "font-bold underline decoration-mint decoration-[3px] underline-offset-8"
            : "font-semibold"
        }`}
      >
        {label}
      </Link>
    );
  });
}

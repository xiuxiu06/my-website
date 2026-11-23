"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isActivePath, site } from "@/lib/site";

const links = [{ href: "/", label: "Home" }, ...site.nav];

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus(); // back to the ☰ button
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-full border-2 border-line-strong"
      >
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-50 flex h-dvh flex-col gap-2 overflow-y-auto border-t border-line bg-ink px-4 py-6"
        >
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : isActivePath(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                onClick={close}
                aria-current={active ? "page" : undefined}
                className={`border-b border-line py-4 font-display text-5xl leading-none ${
                  active ? "text-mint" : "text-cream"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="rounded-full border-2 border-line-strong px-6 py-3 font-bold"
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={close}
              className="rounded-full bg-mint px-6 py-3.5 font-bold text-black"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

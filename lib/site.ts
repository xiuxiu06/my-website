export const site = {
  name: "Tam Le",
  url: "https://tamle.site",
  description:
    "Computer Science student building software and AI, with a designer's eye.",
  resume: "/resume/Le_Tam_Resume_2026.pdf",
  email: "le3t6@mail.uc.edu",
  location: "Cincinnati, Ohio",
  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/notes", label: "Notes" },
  ],
  socials: [
    { href: "https://github.com/xiuxiu06", label: "GitHub" },
    { href: "https://www.linkedin.com/in/tamle06/", label: "LinkedIn" },
    { href: "https://www.behance.net/TamLe06", label: "Behance" },
  ],
} as const;

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

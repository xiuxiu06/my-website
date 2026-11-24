export const site = {
  name: "Tam Le",
  url: "https://tamle.site",
  description:
    "Computer Science student building software and AI, with a designer's eye.",
  resume: "/resume/Le_Tam_Resume_2026.pdf",
  email: "le3t6@mail.uc.edu",
  location: "Cincinnati, Ohio",
  /** Evergreen line above the hero title (city is hidden on small phones). */
  intro: { school: "CS @ University of Cincinnati", city: "Cincinnati, OH" },
  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/notes", label: "Notes" },
  ],
  socials: [
    { href: "https://github.com/xiuxiu06", label: "GitHub" },
    { href: "https://www.linkedin.com/in/tamle06/", label: "LinkedIn" },
  ],
} as const;

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

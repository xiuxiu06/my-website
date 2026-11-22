// Portfolio content. Card/meta data lives here; the long-form case study for a project
// is optional and lives in content/projects/<slug>.mdx.

export const PROJECT_FILTERS = ["AI / ML", "Hardware", "Competition", "Side project"] as const;
export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export type Project = {
  slug: string;
  title: string;
  /** Short name for image placeholders. */
  short: string;
  year: string;
  kind: "Hackathon" | "Competition" | "AI / ML" | "Web";
  outcome: string;
  blurb: string;
  tech: string[];
  poster?: string;
  video?: string;
  links: { live?: string; repo?: string; devpost?: string };
  /** Filter chips on /projects. */
  tags: ProjectFilter[];
  awards?: string[];
  role?: string;
  timeline?: string;
  team?: string;
  /** Shown on the home page. */
  featured?: boolean;
  /** Double-size tile in the /projects bento grid. */
  big?: boolean;
};

export const projects: Project[] = [
  {
    slug: "medmimic",
    title: "MedMimic – Clinical Interview Simulator",
    short: "MedMimic",
    year: "2026",
    kind: "Hackathon",
    outcome: "MLH Best Use of Gemini API, MakeUC 2026",
    blurb:
      "Healthcare students interview an AI psychiatric patient by voice, rewind key moments to try a better question, and get a scored debrief grounded in clinical guidelines.",
    tech: ["Next.js", "Gemini Live", "Supabase", "Auth0", "TypeScript"],
    links: { live: "https://www.medmimic.us", repo: "https://github.com/xiuxiu06/MedMimic" },
    tags: ["AI / ML", "Competition"],
    awards: ["MLH Best Use of Gemini API — MakeUC 2026"],
    role: "[Your role]",
    timeline: "MakeUC 2026 · [x] hrs",
    team: "[x] people",
    featured: true,
  },
  {
    slug: "ecocart",
    title: "EcoCart – AI Shopping Extension",
    short: "EcoCart",
    year: "2025",
    kind: "Hackathon",
    outcome: "3 awards at MakeUC 2025",
    blurb:
      "Chrome extension that suggests affordable, eco-friendly alternatives right from your shopping cart.",
    tech: ["React", "Node.js", "Gemini API", "Hugging Face", "Zilliz"],
    poster: "/projects/ecocart/poster.png",
    links: {
      devpost: "https://devpost.com/software/makeuc-2025-project",
      repo: "https://github.com/dabudke/makeuc-2025",
    },
    tags: ["AI / ML", "Competition"],
    awards: ["Second Place — MakeUC 2025", "Best Green Tech Hack", "MLH Best Use of Gemini API"],
    role: "[Your role]",
    timeline: "MakeUC 2025 · [x] hrs",
    team: "[x] people",
    big: true,
    featured: true,
  },
  {
    slug: "wearly",
    title: "Wearly – Smart Hangers",
    short: "Wearly",
    year: "2026",
    kind: "Competition",
    outcome: "Top 25% of projects, Innovation Challenge 2026",
    blurb:
      "ESP32 hangers that notice which clothes you actually wear, plus an app that plans outfits and nudges forgotten pieces.",
    tech: ["Next.js", "ESP32", "Supabase", "TypeScript"],
    links: { live: "https://wearly.fashion", repo: "https://github.com/xiuxiu06/wearly" },
    tags: ["Hardware", "Competition"],
    awards: ["Top 25% of projects — Innovation Challenge 2026"],
    role: "[Your role]",
    timeline: "Innovation Challenge 2026",
    team: "[x] people",
    featured: true,
  },
  {
    slug: "potato-ai",
    title: "Potato Disease AI Classifier",
    short: "Potato AI",
    year: "[Year]",
    kind: "AI / ML",
    outcome: "[Key result]",
    blurb:
      "Real-time potato leaf disease detection with confidence scores, from a TensorFlow model served through FastAPI.",
    tech: ["TensorFlow", "FastAPI", "React", "Material UI"],
    poster: "/projects/potato-ai/poster.png",
    video: "/projects/potato-ai/demo.mp4",
    links: {
      live: "https://xiuxiu06.github.io/potato-disease-app/",
      repo: "https://github.com/xiuxiu06/potato-disease-app",
    },
    tags: ["AI / ML", "Side project"],
  },
  {
    slug: "movie-app",
    title: "Movie Discovery App",
    short: "Movies",
    year: "[Year]",
    kind: "Web",
    outcome: "[Key result]",
    blurb: "Infinite scrolling, debounced search and trending picks powered by the TMDB API.",
    tech: ["React", "Tailwind", "TMDB API"],
    poster: "/projects/movie-app/poster.png",
    video: "/projects/movie-app/demo.mp4",
    links: { live: "https://xiuxiu06.github.io/movie-app/", repo: "https://github.com/xiuxiu06/movie-app" },
    tags: ["Side project"],
  },
  {
    slug: "leo-kitchen",
    title: "Leo Kitchen – Recipe Sharing",
    short: "Leo Kitchen",
    year: "[Year]",
    kind: "Hackathon",
    outcome: "[Key result]",
    blurb: "Recipe-sharing platform with an AI cooking chatbot, built during a hackathon.",
    tech: ["Streamlit", "OpenAI API", "SQLite"],
    poster: "/projects/leo-kitchen/poster.png",
    video: "/projects/leo-kitchen/demo.mp4",
    links: { repo: "https://github.com/xiuxiu06/Leo-Kitchen" },
    tags: ["AI / ML", "Competition"],
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    short: "Portfolio",
    year: "2026",
    kind: "Web",
    outcome: "Designed in Figma, animated with GSAP",
    blurb: "Smooth scrolling, a pinned horizontal project scroller and a physics contact grid, now on Next.js.",
    tech: ["Next.js", "GSAP", "Tailwind"],
    poster: "/projects/portfolio/poster.png",
    video: "/projects/portfolio/demo.mp4",
    links: { repo: "https://github.com/xiuxiu06/my-website" },
    tags: ["Side project"],
  },
];

export type Role = {
  role: string;
  org: string;
  place: string;
  /** ISO dates. No end = ongoing. */
  start: string;
  end?: string;
  points: string[];
  tech: string[];
};

export const experience: Role[] = [
  {
    role: "Research & Development Co-op",
    org: "Hy-Tek Intralogistics",
    place: "Erlanger, KY",
    start: "2027-01-11",
    points: [],
    tech: [],
  },
  {
    role: "AI Research Intern",
    org: "Data-Centric Intelligence Lab, with Valvoline",
    place: "Cincinnati, OH",
    start: "2026-05-01",
    end: "2026-08-31",
    points: [
      "Developed data quality assurance methods to improve AI model performance in industrial, data-driven systems.",
    ],
    tech: ["Python"],
  },
  {
    role: "Machine Learning Research Assistant",
    org: "Timme Lab – UC College of Medicine",
    place: "Reading, OH",
    start: "2026-01-01",
    end: "2026-05-31",
    points: [
      "Built end-to-end computer vision pipelines in Python and MATLAB for large-scale image analysis.",
      "Trained CNN-based regression and classification models with PyTorch.",
      "Integrated vision sensors and embedded hardware for automated behavioral analysis.",
    ],
    tech: ["Python", "MATLAB", "PyTorch", "Computer Vision"],
  },
  {
    role: "Web Developer",
    org: "RevolutionUC Hackathon",
    place: "Cincinnati, OH",
    start: "2025-09-01",
    end: "2026-03-31",
    points: [
      "Developed the official hackathon website with TypeScript and Next.js.",
      "Implemented responsive design and integrated RESTful APIs.",
    ],
    tech: ["TypeScript", "Next.js", "REST APIs"],
  },
];

export type RoleStatus = "upcoming" | "current" | "past";

export function roleStatus(r: Role, today: string): RoleStatus {
  if (today < r.start) return "upcoming";
  if (!r.end || today <= r.end) return "current";
  return "past";
}

const fmt = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

/** `status` is null while prerendering (today's date isn't known yet). */
export function formatRange(r: Role, status: RoleStatus | null) {
  const start = fmt.format(new Date(r.start));
  if (status === "upcoming") return `Starts ${start}`;
  if (r.end) return `${start} — ${fmt.format(new Date(r.end))}`;
  return status === "current" ? `${start} — Present` : start;
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

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
    blurb: "Practise clinical interviews with an AI patient by voice, rewind key moments and get a guideline-based debrief.",
    tech: ["Next.js", "Gemini Live", "Supabase", "Auth0", "TypeScript"],
    poster: "/projects/medmimic/poster.jpg",
    links: { live: "https://www.medmimic.us", repo: "https://github.com/xiuxiu06/MedMimic" },
    tags: ["AI / ML", "Competition"],
    awards: ["MLH Best Use of Gemini API — MakeUC 2026"],
    role: "Trust engine, UI, RAG debrief, auth and deploy",
    timeline: "MakeUC 2026 · 24 hrs",
    team: "2 people",
    featured: true,
  },
  {
    slug: "ecocart",
    title: "EcoCart – AI Shopping Extension",
    short: "EcoCart",
    year: "2025",
    kind: "Hackathon",
    outcome: "3 awards at MakeUC 2025",
    blurb: "Chrome extension that suggests affordable, eco-friendly alternatives right from your Amazon cart.",
    tech: ["React", "Node.js", "Gemini API", "Hugging Face", "Zilliz"],
    poster: "/projects/ecocart/poster.jpg",
    links: {
      devpost: "https://devpost.com/software/makeuc-2025-project",
      repo: "https://github.com/dabudke/makeuc-2025",
    },
    tags: ["AI / ML", "Competition"],
    awards: ["Second Place — MakeUC 2025", "Best Green Tech Hack", "MLH Best Use of Gemini API"],
    role: "Chrome extension frontend and product scraper",
    timeline: "MakeUC 2025 · 24 hrs",
    team: "4 people",
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
    blurb: "ESP32 smart hangers that notice which clothes you actually wear, plus an app that plans outfits around them.",
    tech: ["Next.js", "ESP32", "Supabase", "TypeScript"],
    poster: "/projects/wearly/poster.jpg",
    links: { live: "https://wearly.fashion", repo: "https://github.com/xiuxiu06/wearly" },
    tags: ["Hardware", "Competition"],
    awards: ["Top 25% of projects — Innovation Challenge 2026"],
    role: "Most of the web app, plus the hardware",
    timeline: "Innovation Challenge 2026",
    team: "3 people",
    featured: true,
  },
  {
    slug: "potato-ai",
    title: "Potato Disease AI Classifier",
    short: "Potato AI",
    year: "2025",
    kind: "AI / ML",
    outcome: "93% test accuracy on potato leaf images",
    blurb: "Upload a potato leaf photo and get early blight, late blight or healthy, with a confidence score.",
    tech: ["TensorFlow", "Keras", "FastAPI", "React", "Material UI", "Quarto"],
    poster: "/projects/potato-ai/poster.jpg",
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
    year: "2025",
    kind: "Web",
    outcome: "Live top-10 trending list built from what users search",
    blurb: "Movie search with infinite scroll and a live trending list ranked by what people search.",
    tech: ["React", "Tailwind", "TMDB API", "Appwrite", "GSAP", "Vite"],
    poster: "/projects/movie-app/poster.jpg",
    video: "/projects/movie-app/demo.mp4",
    links: { live: "https://xiuxiu06.github.io/movie-app/", repo: "https://github.com/xiuxiu06/movie-app" },
    tags: ["Side project"],
  },
  {
    slug: "leo-kitchen",
    title: "Leo Kitchen – Recipe Sharing",
    short: "Leo Kitchen",
    year: "2025",
    kind: "Hackathon",
    outcome: "Built at RevolutionUC 2025",
    blurb: "Recipe-sharing social app with a cooking chatbot, built at RevolutionUC 2025.",
    tech: ["Python", "Streamlit", "SQLite", "OpenAI API"],
    poster: "/projects/leo-kitchen/poster.jpg",
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
    blurb: "This site: smooth scrolling, a paper-plane cursor and a draggable project slider, built with Next.js and GSAP.",
    tech: ["Next.js", "GSAP", "Tailwind"],
    poster: "/projects/portfolio/poster.jpg",
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
      "Built a pipeline that turned 5,500+ manufacturing orders into 3,800+ structured datasets for analysis and training.",
      "Developed and evaluated graph neural network models for lubricant quality prediction and blend pass/fail classification.",
      "Built a Streamlit dashboard for process data, quality metrics, adjustment history and model outputs.",
      "Presented findings and model results to Valvoline engineers and university researchers.",
    ],
    tech: ["Python", "Graph Neural Networks", "Streamlit", "Data Pipelines"],
  },
  {
    role: "Machine Learning Research Assistant",
    org: "Timme Lab – UC College of Medicine",
    place: "Reading, OH",
    start: "2026-01-01",
    end: "2026-05-31",
    points: [
      "Developed a ResNet-50 computer vision pipeline to predict fluid volume from experimental images.",
      "Integrated an OpenMV camera, MATLAB and lab hardware for automated image acquisition and processing.",
      "Improved model performance through preprocessing, training, validation and error analysis.",
      "Documented workflows and results for reproducibility, and contributed to the research paper.",
    ],
    tech: ["Python", "PyTorch", "ResNet-50", "MATLAB", "OpenMV"],
  },
  {
    role: "Web Developer",
    org: "RevolutionUC Hackathon",
    place: "Cincinnati, OH",
    start: "2025-09-01",
    end: "2026-03-31",
    points: [
      "Developed and maintained the RevolutionUC website with Next.js and TypeScript.",
      "Built interactive UI components and animations with GSAP.",
      "Created an internal admin dashboard with Next.js and REST APIs to streamline organizer workflows.",
      "Coordinated with five departments to support a hackathon with 800+ registrants and 300+ attendees.",
    ],
    tech: ["Next.js", "TypeScript", "GSAP", "REST APIs"],
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

export const education = {
  school: "University of Cincinnati",
  degree: "B.S. Computer Science (Honors)",
  minor: "Minor in Information Technology",
  graduation: "Expected May 2029",
  gpa: "3.92",
  coursework: ["Data Structures", "Database Management", "System Administration", "Probability and Statistics"],
};

/** Recognition that isn't tied to a single project. */
export const honors = [
  { title: "Top Student Active in ACM/IEEE & Annual Hackathon Award", org: "UC Department of Computer Science", date: "Apr 2026" },
  { title: "Top 5 Finalist, Innovation Challenge (Fall 2025)", org: "UC Center for Entrepreneurship", date: "Nov 2025" },
  { title: "Dean's List", org: "University of Cincinnati", date: "Dec 2024 – Present" },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "SQL", "R", "C/C++", "JavaScript/TypeScript", "HTML/CSS", "MATLAB"] },
  { group: "Frameworks", items: ["React", "Next.js", "Node.js", "Express.js", "FastAPI"] },
  { group: "Libraries", items: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face", "Pandas", "NumPy", "GSAP"] },
  {
    group: "Tools",
    items: ["Git/GitHub", "AWS", "Linux", "Docker", "Streamlit", "PostgreSQL", "MongoDB", "REST APIs", "ETL/Data Pipelines"],
  },
];

/** Every award across projects, newest project first (projects are already in that order). */
export function allAwards() {
  return projects.flatMap((p) => (p.awards ?? []).map((award) => ({ award, project: p })));
}

/** Two-letter badge for a role's organisation until real logos exist. */
export function orgInitials(org: string) {
  return org
    .split(/[\s–-]+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

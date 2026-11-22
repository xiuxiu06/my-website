import type { MDXComponents } from "mdx/types";
import { Steps, TLDR } from "@/components/mdx";

// Long-form styles for case studies and notes: Montserrat headings (Modak is for big titles only).
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 mb-4 text-[30px] leading-tight font-extrabold first:mt-0" {...props} />,
  h3: (props) => <h3 className="mt-10 mb-3 text-[22px] leading-snug font-extrabold" {...props} />,
  p: (props) => <p className="my-5 text-lg leading-[1.8] text-sand" {...props} />,
  ul: (props) => <ul className="my-5 flex list-disc flex-col gap-2.5 pl-6 text-lg leading-relaxed text-sand marker:text-mint" {...props} />,
  ol: (props) => <ol className="my-5 flex list-decimal flex-col gap-2.5 pl-6 text-lg leading-relaxed text-sand marker:text-mint" {...props} />,
  a: (props) => <a className="font-semibold text-mint underline decoration-1 underline-offset-4 hover:text-mint-soft" {...props} />,
  strong: (props) => <strong className="font-bold text-cream" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-8 border-l-4 border-mint pl-6 text-[22px] leading-normal font-semibold text-cream [&_p]:m-0 [&_p]:text-inherit" {...props} />
  ),
  // No ligatures in code: readers should see (and copy) "=>" exactly as typed.
  code: (props) => (
    <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-cream [font-variant-ligatures:none]" {...props} />
  ),
  pre: (props) => (
    <pre className="my-6 overflow-x-auto rounded-2xl border border-line bg-surface p-5 font-mono text-[15px] leading-relaxed [&_code]:bg-transparent [&_code]:p-0" {...props} />
  ),
  hr: () => <hr className="my-12 border-line" />,
  TLDR,
  Steps,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

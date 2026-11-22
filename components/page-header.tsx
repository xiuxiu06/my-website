import { CircleText } from "./circle-text";

type Props = {
  title: string;
  intro?: string;
  /** Keywords for the slowly spinning text ring next to the title. */
  ring?: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, intro, ring, children }: Props) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-[clamp(72px,9vw,124px)] leading-[0.85]">
          {title}
        </h1>
        {intro && <p className="max-w-xl text-lg leading-relaxed text-muted">{intro}</p>}
      </div>
      {ring && (
        <div className="w-[clamp(120px,14vw,180px)] shrink-0 text-cream motion-safe:animate-[spin_30s_linear_infinite]">
          <CircleText text={ring} repeat={1} />
        </div>
      )}
      {children}
    </div>
  );
}

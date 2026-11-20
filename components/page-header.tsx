type Props = {
  title: string;
  intro?: string;
  children?: React.ReactNode;
};

export function PageHeader({ title, intro, children }: Props) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-[clamp(72px,9vw,124px)] leading-[0.85]">
          {title}
        </h1>
        {intro && <p className="max-w-xl text-lg leading-relaxed text-muted">{intro}</p>}
      </div>
      {children}
    </div>
  );
}

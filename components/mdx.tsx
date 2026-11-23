import Image from "next/image";

// Components available inside .mdx files (registered in mdx-components.tsx).

/** Short summary box at the top of a case study or note: <Overview>…</Overview> */
export function Overview({ title = "Overview", children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="mb-12 flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-7 [&_p]:my-0 [&_p]:text-cream">
      <h2 className="text-[13px] font-extrabold tracking-[0.14em] text-mint uppercase">{title}</h2>
      {children}
    </section>
  );
}

/** Numbered architecture / process steps: <Steps items={["…", "…"]} /> */
export function Steps({ items }: { items: string[] }) {
  return (
    <ol className="my-8 flex flex-wrap gap-3">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex min-w-[150px] flex-1 flex-col gap-1.5 rounded-[14px] border border-t-[3px] border-line border-t-mint p-[18px]"
        >
          <span className="text-xs font-bold text-dim">Step {i + 1}</span>
          <span className="text-[15px] font-bold">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** Image with an optional caption: <Figure src="/…" alt="…" width={1600} height={960} caption="…" /> */
export function Figure({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure className="my-10 flex flex-col gap-3">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 760px) 712px, 100vw"
        className="h-auto w-full rounded-[20px] border border-line"
      />
      {caption && <figcaption className="text-center text-sm text-dim">{caption}</figcaption>}
    </figure>
  );
}

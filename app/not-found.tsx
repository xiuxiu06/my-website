import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-[1200px] flex-col justify-center gap-6 px-4 py-24 sm:px-6">
      <p className="text-sm font-extrabold tracking-[0.14em] text-dim uppercase">Error 404</p>
      <h1 className="font-display text-[clamp(88px,14vw,200px)] leading-[0.85]">
        Off <span className="text-mint">course!</span>
      </h1>
      <p className="max-w-xl text-xl leading-relaxed text-muted">
        This page flew somewhere else, or never existed. Let&apos;s get you back on track.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="rounded-full bg-mint px-[26px] py-3.5 font-bold text-black transition-colors hover:bg-mint-soft">
          Back home
        </Link>
        <Link href="/projects" className="rounded-full border-2 border-line-strong px-6 py-3 font-bold transition-colors hover:border-cream">
          See projects
        </Link>
      </div>
    </section>
  );
}

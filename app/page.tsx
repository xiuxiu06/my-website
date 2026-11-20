import Link from "next/link";

// Placeholder: the real hero + GSAP animations are ported in step 4.
export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-24 sm:px-6">
      <h1 className="font-display text-[clamp(76px,10vw,152px)] leading-[0.86]">
        Hello, I&apos;m <span className="text-mint">Tam!</span>
      </h1>
      <p className="max-w-xl text-[22px] font-bold leading-snug">
        Computer Science student building software and AI, with a designer&apos;s eye.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="rounded-full bg-mint px-[26px] py-3.5 font-bold text-black transition-colors hover:bg-mint-soft"
        >
          See my work
        </Link>
        <Link
          href="/experience"
          className="rounded-full border-2 border-line-strong px-6 py-3 font-bold transition-colors hover:border-cream"
        >
          Experience
        </Link>
      </div>
    </section>
  );
}

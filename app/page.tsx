import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto grid w-[min(100%-2rem,60rem)] gap-10 py-14 md:grid-cols-[1.1fr_.9fr] md:items-center md:py-24">
      <div>
        <p className="eyebrow">Cedar Ridge Ward</p>
        <h1 className="mt-4 max-w-xl font-serif text-5xl font-medium leading-[.95] text-[var(--color-ink)] sm:text-7xl">A quiet place to prepare.</h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-muted)]">Keep the weekly record close at hand: people, hymns, prayers, and the moments that bring our ward together.</p>
        <Link className="mt-8 inline-flex bg-[var(--color-accent)] px-6 py-3 font-bold text-white transition hover:bg-[var(--color-accent-dark)]" href="/meetings">View meeting agendas <span aria-hidden="true" className="ml-3">-&gt;</span></Link>
      </div>
      <div className="border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-[12px_12px_0_var(--color-wash)]">
        <Image src="/meeting-house.svg" alt="Illustration of a meetinghouse at sunrise" width={640} height={480} priority className="h-auto w-full" />
      </div>
    </main>
  );
}
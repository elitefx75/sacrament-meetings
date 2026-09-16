import Link from "next/link";

export default function Header() {
    const currentDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
    }).format(new Date());

    return (
        <header className="border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-background)_92%,transparent)]">
            <div className="mx-auto flex min-h-19 w-[min(100%-2rem,60rem)] flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center sm:py-0">
                <div>
                    <Link className="font-serif text-[1.35rem] font-semibold" href="/">Cedar Ridge Ward</Link>
                    <div className="text-sm text-[var(--color-muted)]">{currentDate}</div>
                </div>
            </div>
        </header>
    );
}
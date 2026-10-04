import Link from "next/link";
import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function Header() {
    const currentDate = new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
    }).format(new Date());
    const session = await auth();

    return (
        <header className="border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-background)_92%,transparent)]">
            <div className="mx-auto flex min-h-19 w-[min(100%-2rem,60rem)] flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center sm:py-0">
                <div>
                    <Link className="font-serif text-[1.35rem] font-semibold" href="/">Cedar Ridge Ward</Link>
                    <div className="text-sm text-[var(--color-muted)]">{currentDate}</div>
                </div>
                <div className="flex items-center gap-3">
                    {session?.user ? (
                        <>
                            <span className="text-sm text-[var(--color-muted)]">{session.user.email}</span>
                            <SignOutButton />
                        </>
                    ) : (
                        <Link className="text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]" href="/login">Sign in</Link>
                    )}
                </div>
            </div>
        </header>
    );
}
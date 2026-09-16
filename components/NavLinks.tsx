"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
    const pathname = usePathname();
    const isMeetingsPage = pathname === "/meetings" || (pathname.startsWith("/meetings/") && pathname !== "/meetings/current");
    const isCurrentPage = pathname === "/meetings/current";
    return <nav className="flex gap-5 text-sm" aria-label="Meetings navigation"><Link className={isMeetingsPage ? "text-[var(--color-accent)]" : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"} href="/meetings" aria-current={isMeetingsPage ? "page" : undefined}>Meetings</Link><Link className={isCurrentPage ? "text-[var(--color-accent)]" : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"} href="/meetings/current" aria-current={isCurrentPage ? "page" : undefined}>Current</Link></nav>;
}
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);
    const pageCount = Math.max(1, totalPages);

    function createPageURL(page: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(page));
        return `${pathname}?${params.toString()}`;
    }

    return (
        <nav aria-label="Pagination" className="flex items-center justify-between border-t border-[var(--color-line)] pt-6">
            {currentPage > 1 ? (
                <Link
                    className="rounded border border-[var(--color-accent)] px-4 py-2 font-semibold text-[var(--color-accent-dark)] transition hover:bg-[var(--color-accent)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                    href={createPageURL(currentPage - 1)}
                >
                    Previous
                </Link>
            ) : (
                <span aria-hidden="true" />
            )}
            <span aria-live="polite" className="text-sm font-medium text-[var(--color-ink)]">
                Page {currentPage} of {pageCount}
            </span>
            {currentPage < pageCount ? (
                <Link
                    className="rounded border border-[var(--color-accent)] px-4 py-2 font-semibold text-[var(--color-accent-dark)] transition hover:bg-[var(--color-accent)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                    href={createPageURL(currentPage + 1)}
                >
                    Next
                </Link>
            ) : (
                <span aria-hidden="true" />
            )}
        </nav>
    );
}
'use client';

import type { FormEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function MeetingSearch() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const params = new URLSearchParams(searchParams.toString());
        const formData = new FormData(event.currentTarget);
        const trimmedQuery = String(formData.get('query') ?? '').trim();

        if (trimmedQuery) {
            params.set('query', trimmedQuery);
        } else {
            params.delete('query');
        }

        params.set('page', '1');
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <form className="mb-8 flex gap-3" onSubmit={handleSubmit} role="search">
            <label className="sr-only" htmlFor="meeting-search">
                Search meetings
            </label>
            <input
                aria-label="Search meetings"
                className="min-w-0 flex-1 rounded border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/30"
                id="meeting-search"
                key={searchParams.get('query') ?? ''}
                name="query"
                placeholder="Search by name or meeting type"
                type="search"
                defaultValue={searchParams.get('query') ?? ''}
            />
            <button
                className="rounded bg-[var(--color-accent)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--color-accent-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                type="submit"
            >
                Search
            </button>
        </form>
    );
}
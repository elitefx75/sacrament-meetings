'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <form action={formAction} className="mt-6 space-y-5" noValidate>
            <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-[var(--color-ink)]">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="border border-[var(--color-line)] bg-white px-3 py-2 text-[var(--color-ink)]"
                />
            </div>

            <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-semibold text-[var(--color-ink)]">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    minLength={6}
                    required
                    className="border border-[var(--color-line)] bg-white px-3 py-2 text-[var(--color-ink)]"
                />
            </div>

            {errorMessage ? (
                <p role="alert" className="text-sm font-medium text-[var(--color-accent-dark)]">
                    {errorMessage}
                </p>
            ) : null}

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[var(--color-accent)] px-4 py-3 font-bold text-white transition hover:bg-[var(--color-accent-dark)] disabled:cursor-wait disabled:opacity-70"
            >
                {isPending ? 'Signing in...' : 'Sign in'}
            </button>
        </form>
    );
}

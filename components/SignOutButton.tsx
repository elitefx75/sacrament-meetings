import { signOut } from '@/auth';

export default function SignOutButton() {
    return (
        <form
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
            }}
        >
            <button
                type="submit"
                className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
                Sign out
            </button>
        </form>
    );
}

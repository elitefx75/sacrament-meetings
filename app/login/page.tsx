import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
    return (
        <main className="mx-auto flex min-h-[60vh] w-[min(100%-2rem,28rem)] items-center justify-center py-16">
            <div className="w-full rounded border border-[var(--color-line)] bg-[var(--color-surface)] p-8 shadow-[10px_10px_0_var(--color-wash)]">
                <p className="eyebrow">Ward admin</p>
                <h1 className="mt-3 font-serif text-4xl font-medium text-[var(--color-ink)]">Sign in</h1>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                    Use the administrator account to manage sacrament meeting records.
                </p>
                <LoginForm />
            </div>
        </main>
    );
}

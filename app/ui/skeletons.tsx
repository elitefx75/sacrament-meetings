export default function DashboardSkeleton() {
    return (
        <main
            aria-label="Loading homepage"
            className="mx-auto grid w-[min(100%-2rem,60rem)] gap-10 py-14 md:grid-cols-[1.1fr_.9fr] md:items-center md:py-24"
        >
            <div>
                <div className="loading-line" style={{ height: ".72rem", maxWidth: "10rem" }} />
                <div className="loading-line" style={{ height: "4.5rem", marginTop: "1rem", maxWidth: "34rem" }} />
                <div className="loading-line" style={{ height: "4.5rem", marginTop: ".5rem", maxWidth: "28rem" }} />
                <div className="loading-line" style={{ height: "4.5rem", marginTop: "1.5rem", maxWidth: "30rem" }} />
                <div className="loading-line" style={{ height: "3rem", marginTop: "2rem", maxWidth: "12rem" }} />
            </div>
            <div className="border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-[12px_12px_0_var(--color-wash)]">
                <div aria-hidden="true" className="loading-line aspect-[4/3] h-auto" />
            </div>
        </main>
    );
}
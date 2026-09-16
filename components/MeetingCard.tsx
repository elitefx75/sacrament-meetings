import Link from "next/link";
import type { SacramentMeeting } from "../lib/types";

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
    const date = new Date(`${meeting.date}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    return <Link className="block border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]" href={`/meetings/${meeting.id}`}><div className="flex justify-between gap-4 text-xs font-bold uppercase tracking-[.09em] text-[var(--color-accent)]"><span>{date}</span><span>{meeting.meetingType} meeting</span></div><h2 className="mt-5 font-serif text-3xl font-medium">Sacrament Meeting</h2><p className="mt-2 text-[var(--color-muted)]">Presiding: {meeting.presiding} · Conducting: {meeting.conducting}</p><span className="mt-6 block font-bold text-[var(--color-accent)]">Read full agenda -&gt;</span></Link>;
}
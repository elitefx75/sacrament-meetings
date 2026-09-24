"use client";

import Link from "next/link";
import type { SacramentMeeting } from "../lib/types";

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
    const date = new Date(`${meeting.date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    return <>
        <header className="border-b border-[var(--color-line)] pb-8">
            <p className="eyebrow">{meeting.meetingType} sacrament meeting</p>
            <h1 className="mt-2 font-serif text-5xl font-medium leading-none text-[var(--color-ink)]">{date}</h1>
            <p className="mt-4 text-[var(--color-muted)]">Presiding: {meeting.presiding} · Conducting: {meeting.conducting}</p>
        </header>
        <div className="mt-8 grid">
            {meeting.announcements?.length ? <AgendaList label="Announcements" items={meeting.announcements} /> : null}
            <AgendaRow label="Opening hymn" value={`#${meeting.openingHymn.number} - ${meeting.openingHymn.title}`} />
            <AgendaRow label="Opening prayer" value={meeting.openingPrayer} />
            <AgendaList label="Ward business" items={meeting.wardBusiness.map((item) => item.description)} emptyLabel="No ward business" />
            <AgendaRow label="Stake business" value={meeting.stakeBusiness ? "Stake business included" : "None"} />
            <AgendaRow label="Sacrament hymn" value={`#${meeting.sacramentHymn.number} - ${meeting.sacramentHymn.title}`} />
            <SpeakerList speakers={meeting.speakers} />
            <AgendaRow label="Closing hymn" value={`#${meeting.closingHymn.number} - ${meeting.closingHymn.title}`} />
            <AgendaRow label="Closing prayer" value={meeting.closingPrayer} />
        </div>
        <div className="mt-8 flex justify-between gap-4 print-hidden">
            <Link className="font-bold text-[var(--color-accent)]" href="/meetings">&lt;- All meetings</Link>
            <button className="bg-[var(--color-accent)] px-5 py-3 font-bold text-white hover:bg-[var(--color-accent-dark)]" type="button" onClick={() => window.print()}>Print agenda</button>
        </div>
    </>;
}

function AgendaRow({ label, value }: { label: string; value: string }) {
    return <div className="grid gap-2 border-b border-[var(--color-line)] py-5 sm:grid-cols-[minmax(8rem,.7fr)_2fr] sm:gap-4"><div className="text-xs font-bold uppercase tracking-[.1em] text-[var(--color-accent)]">{label}</div><p className="m-0 leading-relaxed">{value}</p></div>;
}

function AgendaList({ label, items, emptyLabel = "None" }: { label: string; items: string[]; emptyLabel?: string }) {
    return <div className="grid gap-2 border-b border-[var(--color-line)] py-5 sm:grid-cols-[minmax(8rem,.7fr)_2fr] sm:gap-4"><div className="text-xs font-bold uppercase tracking-[.1em] text-[var(--color-accent)]">{label}</div>{items.length ? <ul className="m-0 list-disc space-y-2 pl-5 leading-relaxed">{items.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="m-0 leading-relaxed text-[var(--color-muted)]">{emptyLabel}</p>}</div>;
}

function SpeakerList({ speakers }: { speakers: SacramentMeeting["speakers"] }) {
    return <div className="grid gap-2 border-b border-[var(--color-line)] py-5 sm:grid-cols-[minmax(8rem,.7fr)_2fr] sm:gap-4"><div className="text-xs font-bold uppercase tracking-[.1em] text-[var(--color-accent)]">Speakers and musical numbers</div>{speakers.length ? <ul className="m-0 space-y-3 leading-relaxed">{speakers.map((speaker) => <li key={`${speaker.name}-${speaker.type}`}><span className="font-semibold">{speaker.name}</span>{speaker.topic ? <span className="text-[var(--color-muted)]"> - {speaker.topic}</span> : null}<span className="ml-2 text-xs uppercase tracking-wider text-[var(--color-accent)]">{speaker.type === "musical-number" ? "Music" : "Speaker"}</span></li>)}</ul> : <p className="m-0 leading-relaxed text-[var(--color-muted)]">Open testimony meeting</p>}</div>;
}
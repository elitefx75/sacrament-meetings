import MeetingCard from "../../components/MeetingCard";
import type { SacramentMeeting } from "../../lib/types";
import { headers } from "next/headers";

async function getApiUrl(path: string) {
    const requestHeaders = await headers();
    const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
    const host = requestHeaders.get("host") ?? "localhost:3000";
    return `${protocol}://${host}${path}`;
}

export default async function MeetingsPage() {
    const response = await fetch(await getApiUrl("/api/meetings"), { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load meetings");
    const meetings: SacramentMeeting[] = await response.json();

    return <><div className="page-heading"><div><p className="eyebrow">The weekly record</p><h1>Meeting agendas</h1></div><p className="section-note">A simple record of worship<br />and fellowship.</p></div><div className="meeting-list">{meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}</div></>;
}
import { notFound } from "next/navigation";
import MeetingDetail from "../../../components/MeetingDetail";
import type { SacramentMeeting } from "../../../lib/types";
import { headers } from "next/headers";

export default async function MeetingPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const requestHeaders = await headers();
    const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
    const host = requestHeaders.get("host") ?? "localhost:3000";
    const response = await fetch(`${protocol}://${host}/api/meetings/${encodeURIComponent(id)}`, { cache: "no-store" });
    if (response.status === 400 || response.status === 404) notFound();
    if (!response.ok) throw new Error("Unable to load meeting");
    const meeting: SacramentMeeting = await response.json();

    return <MeetingDetail meeting={meeting} />;
}
import MeetingCard from "../../components/MeetingCard";
import { getMeetings } from "../../lib/meetings-db";

export default async function MeetingsPage() {
    const meetings = getMeetings();

    return <><div className="page-heading"><div><p className="eyebrow">The weekly record</p><h1>Meeting agendas</h1></div><p className="section-note">A simple record of worship<br />and fellowship.</p></div><div className="meeting-list">{meetings.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />)}</div></>;
}
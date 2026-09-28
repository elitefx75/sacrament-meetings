import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: rawId } = await params;
    const id = Number(rawId);
    if (!Number.isSafeInteger(id) || id < 1) notFound();

    const meeting = await getMeetingById(id);
    if (!meeting) notFound();

    return <>
        <header className="page-heading">
            <div><p className="eyebrow">Meeting planner</p><h1>Edit meeting</h1></div>
        </header>
        <MeetingForm action={updateMeeting.bind(null, id)} meeting={meeting} />
    </>;
}
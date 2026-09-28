import { createMeeting } from '@/lib/actions';
import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
    return <>
        <header className="page-heading">
            <div><p className="eyebrow">Meeting planner</p><h1>New meeting</h1></div>
        </header>
        <MeetingForm action={createMeeting} />
    </>;
}
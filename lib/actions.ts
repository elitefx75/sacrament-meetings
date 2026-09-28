'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
    addMeeting,
    deleteMeeting as deleteMeetingRecord,
    updateMeeting as updateMeetingRecord,
} from './meetings-db';

const SpeakerSchema = z.object({
    name: z.string().trim().min(1),
    topic: z.string().trim(),
    type: z.enum(['speaker', 'musical-number']),
});

const MeetingFormSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
        const parsedDate = new Date(`${value}T00:00:00.000Z`);
        return !Number.isNaN(parsedDate.valueOf()) && parsedDate.toISOString().slice(0, 10) === value;
    }, 'Enter a valid date.'),
    meetingType: z.enum(['testimony', 'regular', 'stake', 'general']),
    presiding: z.string().trim().min(1),
    conducting: z.string().trim().min(1),
    announcements: z.string().transform((value) => value.split('\n').map((item) => item.trim()).filter(Boolean)),
    openingHymnNumber: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive()),
    openingHymnTitle: z.string().trim().min(1),
    openingPrayer: z.string().trim().min(1),
    wardBusiness: z.string().transform((value) => value.split('\n').map((description) => description.trim()).filter(Boolean).map((description) => ({ description }))),
    stakeBusiness: z.preprocess((value) => value === 'on', z.boolean()),
    sacramentHymnNumber: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive()),
    sacramentHymnTitle: z.string().trim().min(1),
    speakers: z.string().transform((value, context) => {
        const lines = value.split('\n').map((line) => line.trim()).filter(Boolean);
        const rows = lines.map((line) => {
            const [type, name, ...topicParts] = line.split('|').map((part) => part.trim());
            return { type, name, topic: topicParts.join('|').trim() };
        });
        const parsed = z.array(SpeakerSchema).safeParse(rows);
        if (!parsed.success) {
            context.addIssue({ code: 'custom', message: 'Enter speakers as type | name | topic.' });
            return z.NEVER;
        }
        return parsed.data;
    }),
    closingHymnNumber: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive()),
    closingHymnTitle: z.string().trim().min(1),
    closingPrayer: z.string().trim().min(1),
});

type MeetingField = keyof typeof MeetingFormSchema.shape;

export type MeetingActionState = {
    message: string;
    errors?: Partial<Record<MeetingField, string[]>>;
};

function getRawMeetingFormData(formData: FormData) {
    return {
        date: formData.get('date'),
        meetingType: formData.get('meetingType'),
        presiding: formData.get('presiding'),
        conducting: formData.get('conducting'),
        announcements: formData.get('announcements'),
        openingHymnNumber: formData.get('openingHymnNumber'),
        openingHymnTitle: formData.get('openingHymnTitle'),
        openingPrayer: formData.get('openingPrayer'),
        wardBusiness: formData.get('wardBusiness'),
        stakeBusiness: formData.get('stakeBusiness'),
        sacramentHymnNumber: formData.get('sacramentHymnNumber'),
        sacramentHymnTitle: formData.get('sacramentHymnTitle'),
        speakers: formData.get('speakers'),
        closingHymnNumber: formData.get('closingHymnNumber'),
        closingHymnTitle: formData.get('closingHymnTitle'),
        closingPrayer: formData.get('closingPrayer'),
    };
}

function toMeetingData(data: z.output<typeof MeetingFormSchema>) {
    return {
        date: data.date,
        meetingType: data.meetingType,
        presiding: data.presiding,
        conducting: data.conducting,
        announcements: data.announcements,
        openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
        openingPrayer: data.openingPrayer,
        wardBusiness: data.wardBusiness,
        stakeBusiness: data.stakeBusiness,
        sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
        speakers: data.speakers,
        closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
        closingPrayer: data.closingPrayer,
    };
}

export async function createMeeting(_prevState: MeetingActionState, formData: FormData): Promise<MeetingActionState> {
    const parsed = MeetingFormSchema.safeParse(getRawMeetingFormData(formData));
    if (!parsed.success) {
        return {
            message: 'Please correct the highlighted fields.',
            errors: parsed.error.flatten().fieldErrors as Partial<Record<MeetingField, string[]>>,
        };
    }

    await addMeeting(toMeetingData(parsed.data));
    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function updateMeeting(id: number, _prevState: MeetingActionState, formData: FormData): Promise<MeetingActionState> {
    const parsed = MeetingFormSchema.safeParse(getRawMeetingFormData(formData));
    if (!parsed.success) {
        return {
            message: 'Please correct the highlighted fields.',
            errors: parsed.error.flatten().fieldErrors as Partial<Record<MeetingField, string[]>>,
        };
    }

    const updated = await updateMeetingRecord(id, toMeetingData(parsed.data));
    if (!updated) return { message: 'Meeting not found.' };
    revalidatePath('/meetings');
    redirect('/meetings');
}

export async function deleteMeeting(formData: FormData) {
    const id = z.coerce.number().int().positive().safeParse(formData.get('id'));
    if (!id.success) throw new Error('Invalid meeting ID.');

    await deleteMeetingRecord(id.data);
    revalidatePath('/meetings');
}
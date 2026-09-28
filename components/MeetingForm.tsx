'use client';

import { useActionState, useState, type ChangeEvent } from 'react';
import type { MeetingActionState } from '../lib/actions';
import type { SacramentMeeting } from '../lib/types';

type MeetingFormProps = {
    action: (prevState: MeetingActionState, formData: FormData) => Promise<MeetingActionState>;
    meeting?: SacramentMeeting;
};

type MeetingField = keyof NonNullable<MeetingActionState['errors']>;

const initialState: MeetingActionState = { message: '', errors: {} };

export default function MeetingForm({ action, meeting }: MeetingFormProps) {
    const [state, formAction, isPending] = useActionState(action, initialState);
    const [values, setValues] = useState(() => ({
        date: meeting?.date ?? '',
        meetingType: meeting?.meetingType ?? 'regular',
        presiding: meeting?.presiding ?? '',
        conducting: meeting?.conducting ?? '',
        announcements: meeting?.announcements?.join('\n') ?? '',
        openingHymnNumber: meeting?.openingHymn.number.toString() ?? '',
        openingHymnTitle: meeting?.openingHymn.title ?? '',
        openingPrayer: meeting?.openingPrayer ?? '',
        wardBusiness: meeting?.wardBusiness.map((item) => item.description).join('\n') ?? '',
        stakeBusiness: meeting?.stakeBusiness ? 'on' : '',
        sacramentHymnNumber: meeting?.sacramentHymn.number.toString() ?? '',
        sacramentHymnTitle: meeting?.sacramentHymn.title ?? '',
        speakers: meeting?.speakers.map((speaker) => `${speaker.type} | ${speaker.name} | ${speaker.topic}`).join('\n') ?? '',
        closingHymnNumber: meeting?.closingHymn.number.toString() ?? '',
        closingHymnTitle: meeting?.closingHymn.title ?? '',
        closingPrayer: meeting?.closingPrayer ?? '',
    }));
    const errors = state.errors ?? {};

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = event.currentTarget;
        setValues((current) => ({ ...current, [name]: value }));
    }

    function fieldError(field: MeetingField) {
        return (
            <p id={`${field}-error`} aria-live="polite" className="min-h-5 text-sm font-normal text-[var(--color-accent-dark)]">
                {errors[field]?.join(' ')}
            </p>
        );
    }

    return (
        <form action={formAction} className="space-y-10" noValidate>
            <p aria-live="polite" className="text-sm font-semibold text-[var(--color-accent-dark)]">{state.message}</p>
            <section className="grid gap-5 border-b border-[var(--color-line)] pb-8 sm:grid-cols-2">
                <div className="grid gap-2">
                    <label htmlFor="date" className="text-sm font-semibold">Date</label>
                    <input id="date" aria-describedby="date-error" aria-invalid={Boolean(errors.date?.length)} className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2" type="date" name="date" value={values.date} onChange={handleChange} />
                    {fieldError('date')}
                </div>
                <div className="grid gap-2">
                    <label htmlFor="meetingType" className="text-sm font-semibold">Meeting type</label>
                    <select id="meetingType" aria-describedby="meetingType-error" aria-invalid={Boolean(errors.meetingType?.length)} className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2" name="meetingType" value={values.meetingType} onChange={handleChange}>
                        <option value="regular">Regular</option>
                        <option value="testimony">Testimony</option>
                        <option value="stake">Stake</option>
                        <option value="general">General</option>
                    </select>
                    {fieldError('meetingType')}
                </div>
                <div className="grid gap-2">
                    <label htmlFor="presiding" className="text-sm font-semibold">Presiding</label>
                    <input id="presiding" aria-describedby="presiding-error" aria-invalid={Boolean(errors.presiding?.length)} className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2" name="presiding" value={values.presiding} onChange={handleChange} />
                    {fieldError('presiding')}
                </div>
                <div className="grid gap-2">
                    <label htmlFor="conducting" className="text-sm font-semibold">Conducting</label>
                    <input id="conducting" aria-describedby="conducting-error" aria-invalid={Boolean(errors.conducting?.length)} className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2" name="conducting" value={values.conducting} onChange={handleChange} />
                    {fieldError('conducting')}
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <label htmlFor="announcements" className="text-sm font-semibold">Announcements</label>
                    <textarea id="announcements" aria-describedby="announcements-error" aria-invalid={Boolean(errors.announcements?.length)} className="min-h-24 border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 font-normal" name="announcements" value={values.announcements} onChange={handleChange} />
                    {fieldError('announcements')}
                </div>
            </section>

            <section className="grid gap-5 border-b border-[var(--color-line)] pb-8 sm:grid-cols-2">
                <h2 className="font-serif text-2xl sm:col-span-2">Opening</h2>
                <div className="grid gap-2">
                    <label htmlFor="openingHymnNumber" className="text-sm font-semibold">Opening hymn number</label>
                    <input id="openingHymnNumber" aria-describedby="openingHymnNumber-error" aria-invalid={Boolean(errors.openingHymnNumber?.length)} className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2" type="number" name="openingHymnNumber" value={values.openingHymnNumber} onChange={handleChange} />
                    {fieldError('openingHymnNumber')}
                </div>
                <div className="grid gap-2">
                    <label htmlFor="openingHymnTitle" className="text-sm font-semibold">Opening hymn title</label>
                    <input id="openingHymnTitle" aria-describedby="openingHymnTitle-error" aria-invalid={Boolean(errors.openingHymnTitle?.length)} className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2" name="openingHymnTitle" value={values.openingHymnTitle} onChange={handleChange} />
                    {fieldError('openingHymnTitle')}
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <label htmlFor="openingPrayer" className="text-sm font-semibold">Opening prayer</label>
                    <input id="openingPrayer" aria-describedby="openingPrayer-error" aria-invalid={Boolean(errors.openingPrayer?.length)} className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 font-normal" name="openingPrayer" value={values.openingPrayer} onChange={handleChange} />
                    {fieldError('openingPrayer')}
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <label htmlFor="wardBusiness" className="text-sm font-semibold">Ward business</label>
                    <textarea id="wardBusiness" aria-describedby="wardBusiness-error" aria-invalid={Boolean(errors.wardBusiness?.length)} className="min-h-24 border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 font-normal" name="wardBusiness" value={values.wardBusiness} onChange={handleChange} />
                    {fieldError('wardBusiness')}
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <div className="flex items-center gap-3 text-sm font-semibold">
                        <input id="stakeBusiness" aria-describedby="stakeBusiness-error" aria-invalid={Boolean(errors.stakeBusiness?.length)} className="size-4 accent-[var(--color-accent)]" type="checkbox" name="stakeBusiness" checked={values.stakeBusiness === 'on'} onChange={(event) => setValues((current) => ({ ...current, stakeBusiness: event.currentTarget.checked ? 'on' : '' }))} />
                        <label htmlFor="stakeBusiness">Include stake business</label>
                    </div>
                    {fieldError('stakeBusiness')}
                </div>
            </section>

            <section className="grid gap-5 border-b border-[var(--color-line)] pb-8 sm:grid-cols-2">
                <h2 className="font-serif text-2xl sm:col-span-2">Sacrament and closing</h2>
                <div className="grid gap-2">
                    <label htmlFor="sacramentHymnNumber" className="text-sm font-semibold">Sacrament hymn number</label>
                    <input id="sacramentHymnNumber" aria-describedby="sacramentHymnNumber-error" aria-invalid={Boolean(errors.sacramentHymnNumber?.length)} className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2" type="number" name="sacramentHymnNumber" value={values.sacramentHymnNumber} onChange={handleChange} />
                    {fieldError('sacramentHymnNumber')}
                </div>
                <div className="grid gap-2">
                    <label htmlFor="sacramentHymnTitle" className="text-sm font-semibold">Sacrament hymn title</label>
                    <input id="sacramentHymnTitle" aria-describedby="sacramentHymnTitle-error" aria-invalid={Boolean(errors.sacramentHymnTitle?.length)} className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2" name="sacramentHymnTitle" value={values.sacramentHymnTitle} onChange={handleChange} />
                    {fieldError('sacramentHymnTitle')}
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <label htmlFor="speakers" className="text-sm font-semibold">Speakers and musical numbers</label>
                    <textarea id="speakers" aria-describedby="speakers-error" aria-invalid={Boolean(errors.speakers?.length)} className="min-h-28 border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 font-mono text-sm font-normal" name="speakers" value={values.speakers} onChange={handleChange} />
                    {fieldError('speakers')}
                </div>
                <div className="grid gap-2">
                    <label htmlFor="closingHymnNumber" className="text-sm font-semibold">Closing hymn number</label>
                    <input id="closingHymnNumber" aria-describedby="closingHymnNumber-error" aria-invalid={Boolean(errors.closingHymnNumber?.length)} className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2" type="number" name="closingHymnNumber" value={values.closingHymnNumber} onChange={handleChange} />
                    {fieldError('closingHymnNumber')}
                </div>
                <div className="grid gap-2">
                    <label htmlFor="closingHymnTitle" className="text-sm font-semibold">Closing hymn title</label>
                    <input id="closingHymnTitle" aria-describedby="closingHymnTitle-error" aria-invalid={Boolean(errors.closingHymnTitle?.length)} className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2" name="closingHymnTitle" value={values.closingHymnTitle} onChange={handleChange} />
                    {fieldError('closingHymnTitle')}
                </div>
                <div className="grid gap-2 sm:col-span-2">
                    <label htmlFor="closingPrayer" className="text-sm font-semibold">Closing prayer</label>
                    <input id="closingPrayer" aria-describedby="closingPrayer-error" aria-invalid={Boolean(errors.closingPrayer?.length)} className="border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 font-normal" name="closingPrayer" value={values.closingPrayer} onChange={handleChange} />
                    {fieldError('closingPrayer')}
                </div>
            </section>

            <button className="bg-[var(--color-accent)] px-5 py-3 font-bold text-white hover:bg-[var(--color-accent-dark)] disabled:cursor-wait disabled:opacity-60" type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : meeting ? 'Save changes' : 'Create meeting'}
            </button>
        </form>
    );
}

import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
    {
        id: 1,
        date: '2026-09-13',
        meetingType: 'regular',
        presiding: 'Bishop Martinez',
        conducting: 'Brother Jones',
        openingHymn: { number: 2, title: 'The Spirit of God' },
        openingPrayer: 'Sister Williams',
        wardBusiness: [{ description: 'Sustaining of new Primary president' }],
        stakeBusiness: false,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
            { name: 'Youth Choir', topic: 'Come, Follow Me', type: 'musical-number' }
        ],
        closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
        closingPrayer: 'Brother Davis',
        announcements: ['Ward temple night: May 10']
    },
    {
        id: 2,
        date: '2026-09-06',
        meetingType: 'testimony',
        presiding: 'Bishop Martinez',
        conducting: 'Sister Patel',
        openingHymn: { number: 85, title: 'How Firm a Foundation' },
        openingPrayer: 'Brother Lee',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
        speakers: [],
        closingHymn: { number: 227, title: 'There Is Sunshine in My Soul Today' },
        closingPrayer: 'Sister Carter',
        announcements: ['Bishopric youth discussion at 6:00 p.m.']
    },
    {
        id: 3,
        date: '2026-08-30',
        meetingType: 'regular',
        presiding: 'Bishop Martinez',
        conducting: 'Brother Lee',
        openingHymn: { number: 219, title: 'Because I Have Been Given Much' },
        openingPrayer: 'Sister Carter',
        wardBusiness: [{ description: 'Primary program rehearsal after meetings' }],
        stakeBusiness: false,
        sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
        speakers: [
            { name: 'Brother Nguyen', topic: 'Service in the Covenant Path', type: 'speaker' },
            { name: 'Sister Garcia', topic: 'Finding Peace Through Prayer', type: 'speaker' }
        ],
        closingHymn: { number: 227, title: 'There Is Sunshine in My Soul Today' },
        closingPrayer: 'Brother Jones'
    },
    {
        id: 4,
        date: '2026-08-23',
        meetingType: 'stake',
        presiding: 'President Harris',
        conducting: 'Brother Okafor',
        openingHymn: { number: 1, title: 'The Morning Breaks' },
        openingPrayer: 'Sister Wilson',
        wardBusiness: [],
        stakeBusiness: true,
        sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
        speakers: [
            { name: 'President Harris', topic: 'Strengthening Our Families', type: 'speaker' },
            { name: 'Stake Choir', topic: 'Lead, Kindly Light', type: 'musical-number' }
        ],
        closingHymn: { number: 98, title: 'I Need Thee Every Hour' },
        closingPrayer: 'Brother Wilson'
    },
    {
        id: 5,
        date: '2026-08-16',
        meetingType: 'general',
        presiding: 'Bishop Martinez',
        conducting: 'Sister Patel',
        openingHymn: { number: 89, title: 'The Lord Is My Light' },
        openingPrayer: 'Brother Davis',
        wardBusiness: [{ description: 'Welcome to new ward members' }],
        stakeBusiness: false,
        sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
        speakers: [{ name: 'Sister Brown', topic: 'A Living Gospel', type: 'speaker' }],
        closingHymn: { number: 301, title: 'I Am a Child of God' },
        closingPrayer: 'Sister Williams',
        announcements: ['Food drive donations due next Sunday']
    }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
    if (date) return meetings.filter(m => m.date === date);
    return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
    return meetings.find(m => m.id === id) ?? null;
}
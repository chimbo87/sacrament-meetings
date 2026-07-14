import { SacramentMeeting } from './types';

// Sample data with at least 5 meetings
const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-07-06',
    meetingType: 'regular',
    presiding: 'President Smith',
    conducting: 'Brother Johnson',
    announcements: ['Ward temple trip next Saturday', 'Combined Relief Society and Priesthood meeting'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Davis',
    wardBusiness: [
      { description: 'Sustain new Sunday School teacher' },
      { description: 'Release and sustain new missionaries' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [
      { name: 'Brother Thompson', topic: 'Faith in Christ', type: 'speaker' },
      { name: 'Sister Martinez', topic: 'Service', type: 'speaker' }
    ],
    closingHymn: { number: 226, title: 'Improve the Shining Moments' },
    closingPrayer: 'Brother Williams'
  },
  {
    id: 2,
    date: '2026-07-13',
    meetingType: 'testimony',
    presiding: 'President Smith',
    conducting: 'Brother Johnson',
    announcements: ['Combined youth activity Friday', 'Bishop\'s youth interviews next week'],
    openingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    openingPrayer: 'Sister Anderson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 187, title: 'God Loved Us, So He Sent His Son' },
    speakers: [
      { name: 'Testimony Meeting', topic: 'Open testimony sharing', type: 'speaker' }
    ],
    closingHymn: { number: 165, title: 'Abide with Me; Tis Eventide' },
    closingPrayer: 'Brother Miller'
  },
  {
    id: 3,
    date: '2026-07-20',
    meetingType: 'stake',
    presiding: 'President Davis',
    conducting: 'President Davis',
    announcements: ['Stake conference next month', 'Stake youth dance this Saturday'],
    openingHymn: { number: 10, title: 'Come, Let Us Anew' },
    openingPrayer: 'Brother Roberts',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'Stake President Davis', topic: 'Temple Covenants', type: 'speaker' },
      { name: 'Area Seventy', topic: 'The Work of Salvation', type: 'speaker' }
    ],
    closingHymn: { number: 101, title: 'Guide Me to Thee' },
    closingPrayer: 'Sister Clark'
  },
  {
    id: 4,
    date: '2026-07-27',
    meetingType: 'regular',
    presiding: 'President Smith',
    conducting: 'Brother Thompson',
    announcements: ['Ward picnic August 1st', 'Primary program rehearsals start'],
    openingHymn: { number: 46, title: 'Lead, Kindly Light' },
    openingPrayer: 'Brother Peterson',
    wardBusiness: [
      { description: 'Approval of budget for ward activities' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 178, title: 'O Lamb of God' },
    speakers: [
      { name: 'Sister Nelson', topic: 'Faith and Families', type: 'speaker' },
      { name: 'Special Musical Number', topic: 'Children\'s Choir', type: 'musical-number' }
    ],
    closingHymn: { number: 229, title: 'Today, While the Sun Shines' },
    closingPrayer: 'Sister White'
  },
  {
    id: 5,
    date: '2026-08-03',
    meetingType: 'general',
    presiding: 'President Smith',
    conducting: 'Bishop Smith',
    announcements: ['General Conference review', 'New member welcoming'],
    openingHymn: { number: 15, title: 'I Know That My Redeemer Lives' },
    openingPrayer: 'Brother Adams',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: 'While of These Emblems' },
    speakers: [
      { name: 'Sister Evans', topic: 'General Conference Highlights', type: 'speaker' },
      { name: 'Brother Brown', topic: 'Applying Conference Teachings', type: 'speaker' }
    ],
    closingHymn: { number: 198, title: 'That Easter Morn' },
    closingPrayer: 'Sister Taylor'
  }
];

// Helper function to find most recent Sunday
function getMostRecentSunday(): string {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday
  const diff = day; // Days to subtract to get to Sunday
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - diff);
  return sunday.toISOString().split('T')[0];
}

export function getMeetings(): SacramentMeeting[] {
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find(meeting => meeting.id === id);
}

export function getCurrentSundayMeeting(): SacramentMeeting | undefined {
  const currentSunday = getMostRecentSunday();
  return meetings.find(meeting => meeting.date === currentSunday);
}

export function getMeetingsByDate(date: string): SacramentMeeting[] {
  return meetings.filter(meeting => meeting.date === date);
}
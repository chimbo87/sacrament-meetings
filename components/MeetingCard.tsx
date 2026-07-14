import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMeetingTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      testimony: 'Testimony Meeting',
      regular: 'Regular Sacrament Meeting',
      stake: 'Stake Conference',
      general: 'General Meeting'
    };
    return labels[type] || type;
  };

  return (
    <div className="meeting-card">
      <Link href={`/meetings/${meeting.id}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h3 className="text-xl font-semibold text-blue-700 hover:text-blue-900 transition-colors">
              {formatDate(meeting.date)}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Type:</span> {getMeetingTypeLabel(meeting.meetingType)}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Presiding:</span> {meeting.presiding}
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
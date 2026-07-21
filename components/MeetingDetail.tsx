'use client';

import { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
  isPrintMode?: boolean;
}

export default function MeetingDetail({ meeting, isPrintMode = false }: MeetingDetailProps) {
  const formatDate = (dateString: string) => {
    // Handle both 'YYYY-MM-DD' and ISO strings with timezone
    let dateStr = dateString;
    
    // If it's an ISO string with timezone, extract just the date part
    if (dateString.includes('T')) {
      dateStr = dateString.split('T')[0];
    }
    
    // Parse the date parts directly to avoid timezone issues
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1; // Month is 0-indexed
      const day = parseInt(parts[2]);
      const date = new Date(year, month, day);
      
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    // Fallback: try to parse the original string
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if all else fails
    }
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

  if (isPrintMode) {
    return (
      <div className="print-content">
        <h1 className="text-3xl font-bold text-center mb-2">Sacramento Ward</h1>
        <h2 className="text-2xl text-center text-gray-700 mb-1">
          Sacrament Meeting Program
        </h2>
        <p className="text-center text-gray-600 mb-6">{formatDate(meeting.date)}</p>
        
        <div className="space-y-4">
          <p><span className="font-semibold">Meeting Type:</span> {getMeetingTypeLabel(meeting.meetingType)}</p>
          <p><span className="font-semibold">Presiding:</span> {meeting.presiding}</p>
          <p><span className="font-semibold">Conducting:</span> {meeting.conducting}</p>
          
          {meeting.announcements && meeting.announcements.length > 0 && (
            <div>
              <h3 className="font-semibold">Announcements</h3>
              <ul className="list-disc pl-5">
                {meeting.announcements.map((announcement, index) => (
                  <li key={index}>{announcement}</li>
                ))}
              </ul>
            </div>
          )}
          
          <p><span className="font-semibold">Opening Hymn:</span> #{meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
          <p><span className="font-semibold">Opening Prayer:</span> {meeting.openingPrayer}</p>
          
          {meeting.wardBusiness.length > 0 && (
            <div>
              <h3 className="font-semibold">Ward Business</h3>
              <ul className="list-disc pl-5">
                {meeting.wardBusiness.map((business, index) => (
                  <li key={index}>{business.description}</li>
                ))}
              </ul>
            </div>
          )}
          
          {meeting.stakeBusiness && (
            <p><span className="font-semibold">Stake Business:</span> Yes</p>
          )}
          
          <p><span className="font-semibold">Sacrament Hymn:</span> #{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>
          
          <div>
            <h3 className="font-semibold">Speakers & Musical Numbers</h3>
            <ul className="list-disc pl-5">
              {meeting.speakers.map((speaker, index) => (
                <li key={index}>
                  <span className="font-medium">{speaker.type === 'musical-number' ? '🎵 Musical Number: ' : ''}</span>
                  {speaker.name} - {speaker.topic}
                </li>
              ))}
            </ul>
          </div>
          
          <p><span className="font-semibold">Closing Hymn:</span> #{meeting.closingHymn.number} - {meeting.closingHymn.title}</p>
          <p><span className="font-semibold">Closing Prayer:</span> {meeting.closingPrayer}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="meeting-detail-section max-w-4xl mx-auto">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-800">{formatDate(meeting.date)}</h1>
        <div className="flex flex-wrap gap-x-4 mt-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {getMeetingTypeLabel(meeting.meetingType)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Presiding</h3>
          <p className="text-gray-900">{meeting.presiding}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Conducting</h3>
          <p className="text-gray-900">{meeting.conducting}</p>
        </div>
      </div>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Announcements</h3>
          <ul className="list-disc pl-5 space-y-1">
            {meeting.announcements.map((announcement, index) => (
              <li key={index} className="text-gray-800">{announcement}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 border-t pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Opening Hymn</h3>
            <p className="text-gray-900">#{meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Opening Prayer</h3>
            <p className="text-gray-900">{meeting.openingPrayer}</p>
          </div>
        </div>
      </div>

      {(meeting.wardBusiness.length > 0 || meeting.stakeBusiness) && (
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Ward Business</h3>
          {meeting.wardBusiness.length > 0 && (
            <ul className="list-disc pl-5 space-y-1">
              {meeting.wardBusiness.map((business, index) => (
                <li key={index} className="text-gray-800">{business.description}</li>
              ))}
            </ul>
          )}
          {meeting.stakeBusiness && (
            <p className="text-gray-800 font-medium">Stake Business will be conducted</p>
          )}
        </div>
      )}

      <div className="mt-6 border-t pt-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Sacrament Hymn</h3>
          <p className="text-gray-900">#{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>
        </div>
      </div>

      <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Speakers & Musical Numbers</h3>
        <ul className="list-disc pl-5 space-y-2">
          {meeting.speakers.map((speaker, index) => (
            <li key={index} className="text-gray-800">
              <span className="font-medium">
                {speaker.type === 'musical-number' ? '🎵 Musical Number: ' : '📖 Speaker: '}
              </span>
              {speaker.name}
              {speaker.topic && ` - ${speaker.topic}`}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Closing Hymn</h3>
            <p className="text-gray-900">#{meeting.closingHymn.number} - {meeting.closingHymn.title}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Closing Prayer</h3>
            <p className="text-gray-900">{meeting.closingPrayer}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t pt-6">
        <button 
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          🖨️ Print Program
        </button>
      </div>
    </div>
  );
}
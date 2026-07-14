'use client';

import { useEffect, useState } from 'react';
import MeetingCard from '@/components/MeetingCard';
import { SacramentMeeting } from '@/lib/types';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/meetings')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch meetings');
        return res.json();
      })
      .then(data => {
        setMeetings(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>Error loading meetings: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
      {meetings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No meetings found.</p>
        </div>
      )}
    </div>
  );
}
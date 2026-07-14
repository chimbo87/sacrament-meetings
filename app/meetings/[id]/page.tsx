'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { SacramentMeeting } from '@/lib/types';

export default function MeetingDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define the fetch function inside the effect
    const fetchMeeting = async (meetingId: string) => {
      try {
        // Clean the ID
        const cleanId = meetingId.replace(/\/$/, '').trim();
        
        const response = await fetch(`/api/meetings/${cleanId}`);
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || `Failed to fetch meeting (${response.status})`);
        }
        
        const data = await response.json();
        setMeeting(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    // Only fetch if we have a valid id
    if (id) {
      fetchMeeting(id);
    } else {
      setError('No meeting ID provided');
      setLoading(false);
    }

    // Cleanup function (optional)
    return () => {
      // Any cleanup if needed
    };
  }, [id]); // Dependency array ensures effect runs when id changes

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-2xl mx-auto">
        <p className="font-semibold">Error:</p>
        <p>{error}</p>
        <button 
          onClick={() => window.location.href = '/meetings'}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Meetings
        </button>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Meeting not found.</p>
        <button 
          onClick={() => window.location.href = '/meetings'}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Meetings
        </button>
      </div>
    );
  }

  return <MeetingDetail meeting={meeting} />;
}
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import { SacramentMeeting } from '@/lib/types';

export default function MeetingsClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1');
  
  const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
  const [totalMeetings, setTotalMeetings] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const ITEMS_PER_PAGE = 5;

  // Fetch meetings function
  const fetchMeetings = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (query) params.set('query', query);
      params.set('page', page.toString());
      params.set('limit', ITEMS_PER_PAGE.toString());
      
      const response = await fetch(`/api/meetings?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch meetings');
      }
      const data = await response.json();
      
      if (Array.isArray(data)) {
        return { meetings: data, total: data.length, totalPages: Math.ceil(data.length / ITEMS_PER_PAGE) };
      } else {
        return { meetings: data.meetings || [], total: data.total || 0, totalPages: data.totalPages || 1 };
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'An error occurred');
    }
  }, [query, page, ITEMS_PER_PAGE]);

  // Effect to load data
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchMeetings();
        if (isMounted) {
          setMeetings(result.meetings);
          setTotalMeetings(result.total);
          setTotalPages(result.totalPages);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setLoading(false);
        }
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, [fetchMeetings, refreshKey]);

  const handleDelete = () => {
    setRefreshKey(prev => prev + 1);
  };

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
      <MeetingSearch />
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {meetings.length} of {totalMeetings} meetings
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} onDelete={handleDelete} />
        ))}
      </div>
      
      {meetings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No meetings found matching your search.</p>
        </div>
      )}
      
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={page} />
      )}
    </div>
  );
}
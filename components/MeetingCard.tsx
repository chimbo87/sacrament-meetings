'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SacramentMeeting } from '@/lib/types';
import { deleteMeeting } from '@/lib/actions';

interface MeetingCardProps {
  meeting: SacramentMeeting;
  onDelete?: () => void;
}

export default function MeetingCard({ meeting, onDelete }: MeetingCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    let dateStr = dateString;
    if (dateString.includes('T')) {
      dateStr = dateString.split('T')[0];
    }
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const day = parseInt(parts[2]);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
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

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteMeeting(meeting.id);
    if (result.error) {
      alert(result.error);
      setIsDeleting(false);
      return;
    }
    setIsDeleting(false);
    setShowConfirm(false);
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="meeting-card relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <Link href={`/meetings/${meeting.id}`} className="flex-1">
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
        </Link>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
          >
            Edit
          </Link>
          <Link
            href={`/meetings/${meeting.id}`}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
      
      {/* Delete Button */}
      <div className="absolute bottom-3 right-3">
        {showConfirm ? (
          <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-lg border border-gray-200">
            <span className="text-sm text-gray-700">Delete?</span>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isDeleting ? '...' : 'Yes'}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            aria-label="Delete meeting"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
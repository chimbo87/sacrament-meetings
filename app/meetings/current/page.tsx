'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CurrentMeetingPage() {
  const router = useRouter();

  useEffect(() => {
    // Get current date
    const today = new Date();
    const day = today.getDay();
    const diff = day;
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - diff);
    const currentSunday = sunday.toISOString().split('T')[0];

    // Find meeting with that date
    fetch(`/api/meetings?date=${currentSunday}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          router.push(`/meetings/${data[0].id}`);
        } else {
          // If no meeting found, redirect to meetings list
          router.push('/meetings');
        }
      })
      .catch(() => {
        router.push('/meetings');
      });
  }, [router]);

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
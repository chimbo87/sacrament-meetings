import { NextRequest, NextResponse } from 'next/server';
import { getMeetings, getMeetingsByDate } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '5');
    const offset = (page - 1) * limit;

    // If date parameter is provided, filter by date
    if (date) {
      // Validate date format
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return NextResponse.json(
          { error: 'Invalid date format. Use YYYY-MM-DD' },
          { status: 400 }
        );
      }
      const meetings = await getMeetingsByDate(date);
      return NextResponse.json(meetings);
    }

    // Get all meetings with search filter
    let allMeetings = await getMeetings();
    
    // Apply search filter if query is provided
    if (query) {
      const searchTerm = query.toLowerCase();
      allMeetings = allMeetings.filter(meeting => {
        // Search in presiding
        if (meeting.presiding.toLowerCase().includes(searchTerm)) return true;
        // Search in conducting
        if (meeting.conducting.toLowerCase().includes(searchTerm)) return true;
        // Search in meeting type
        if (meeting.meetingType.toLowerCase().includes(searchTerm)) return true;
        // Search in speakers
        if (meeting.speakers.some(speaker => 
          speaker.name.toLowerCase().includes(searchTerm) ||
          speaker.topic.toLowerCase().includes(searchTerm)
        )) return true;
        // Search in announcements
        if (meeting.announcements?.some(ann => 
          ann.toLowerCase().includes(searchTerm)
        )) return true;
        return false;
      });
    }

    // Get total count before pagination
    const total = allMeetings.length;

    // Apply pagination
    const paginatedMeetings = allMeetings.slice(offset, offset + limit);

    return NextResponse.json({
      meetings: paginatedMeetings,
      total: total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
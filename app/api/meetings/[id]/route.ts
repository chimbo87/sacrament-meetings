import { NextRequest, NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params Promise
    const { id: idParam } = await params;
    
    // Log the ID for debugging
    console.log('Received ID param:', idParam);
    
    // Try to parse as integer
    const id = Number(idParam);
    
    // Check if it's a valid number
    if (isNaN(id) || !isFinite(id)) {
      return NextResponse.json(
        { error: `Invalid meeting ID. '${idParam}' must be a valid number.` },
        { status: 400 }
      );
    }

    const meeting = getMeetingById(id);

    if (!meeting) {
      return NextResponse.json(
        { error: `Meeting with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(meeting);
  } catch (error) {
    console.error('Error fetching meeting:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { neon } from '@neondatabase/serverless';
import { SacramentMeeting, MeetingType, Hymn, SpeakerItem, WardBusinessItem } from './types';

// Get the database URL from environment variables
const sql = neon(process.env.DATABASE_URL!);

// Helper function to convert database row to SacramentMeeting type
function rowToMeeting(row: Record<string, unknown>): SacramentMeeting {
  return {
    id: row.id as number,
    date: row.date as string,
    meetingType: row.meeting_type as MeetingType,
    presiding: row.presiding as string,
    conducting: row.conducting as string,
    announcements: (row.announcements as string[]) || [],
    openingHymn: row.opening_hymn as Hymn,
    openingPrayer: row.opening_prayer as string,
    wardBusiness: (row.ward_business as WardBusinessItem[]) || [],
    stakeBusiness: row.stake_business as boolean,
    sacramentHymn: row.sacrament_hymn as Hymn,
    speakers: (row.speakers as SpeakerItem[]) || [],
    closingHymn: row.closing_hymn as Hymn,
    closingPrayer: row.closing_prayer as string
  };
}

// Get all meetings with optional date filter
export async function getMeetings(date?: string): Promise<SacramentMeeting[]> {
  try {
    let query = 'SELECT * FROM meetings';
    const params: (string | number)[] = [];
    
    if (date) {
      query += ' WHERE date = $1';
      params.push(date);
    }
    
    query += ' ORDER BY date DESC';
    
    const rows = await sql.query(query, params);
    return rows.map(rowToMeeting);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    throw new Error('Failed to fetch meetings from database');
  }
}

// Get a single meeting by ID
export async function getMeetingById(id: number): Promise<SacramentMeeting | undefined> {
  try {
    const rows = await sql.query('SELECT * FROM meetings WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return undefined;
    }
    
    return rowToMeeting(rows[0]);
  } catch (error) {
    console.error('Error fetching meeting by ID:', error);
    throw new Error('Failed to fetch meeting from database');
  }
}

// Get meetings by date (for the current meeting redirect)
export async function getMeetingsByDate(date: string): Promise<SacramentMeeting[]> {
  return getMeetings(date);
}

// Get the most recent Sunday
export function getMostRecentSunday(): string {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday
  const diff = day; // Days to subtract to get to Sunday
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - diff);
  return sunday.toISOString().split('T')[0];
}

// Get current Sunday's meeting
export async function getCurrentSundayMeeting(): Promise<SacramentMeeting | undefined> {
  const currentSunday = getMostRecentSunday();
  const meetings = await getMeetingsByDate(currentSunday);
  return meetings.length > 0 ? meetings[0] : undefined;
}

// --- MUTATION FUNCTIONS (now with live SQL) ---

// Add a new meeting
export async function addMeeting(
  meeting: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  try {
    const result = await sql`
      INSERT INTO meetings (
        date, meeting_type, presiding, conducting, announcements,
        opening_hymn, opening_prayer, ward_business, stake_business,
        sacrament_hymn, speakers, closing_hymn, closing_prayer
      ) VALUES (
        ${meeting.date}::date,
        ${meeting.meetingType},
        ${meeting.presiding},
        ${meeting.conducting},
        ${meeting.announcements || []},
        ${JSON.stringify(meeting.openingHymn)},
        ${meeting.openingPrayer},
        ${JSON.stringify(meeting.wardBusiness || [])},
        ${meeting.stakeBusiness},
        ${JSON.stringify(meeting.sacramentHymn)},
        ${JSON.stringify(meeting.speakers)},
        ${JSON.stringify(meeting.closingHymn)},
        ${meeting.closingPrayer}
      )
      RETURNING *
    `;

    return rowToMeeting(result[0]);
  } catch (error) {
    console.error('Error adding meeting:', error);
    throw new Error('Failed to add meeting to database');
  }
}

// Update an existing meeting
export async function updateMeeting(
  id: number,
  meeting: Partial<SacramentMeeting>
): Promise<SacramentMeeting> {
  try {
    // First, get the existing meeting
    const existing = await getMeetingById(id);
    if (!existing) {
      throw new Error(`Meeting with ID ${id} not found`);
    }

    // Merge existing data with updates
    const updated = { ...existing, ...meeting };

    const result = await sql`
      UPDATE meetings SET
        date = ${updated.date}::date,
        meeting_type = ${updated.meetingType},
        presiding = ${updated.presiding},
        conducting = ${updated.conducting},
        announcements = ${updated.announcements || []},
        opening_hymn = ${JSON.stringify(updated.openingHymn)},
        opening_prayer = ${updated.openingPrayer},
        ward_business = ${JSON.stringify(updated.wardBusiness || [])},
        stake_business = ${updated.stakeBusiness},
        sacrament_hymn = ${JSON.stringify(updated.sacramentHymn)},
        speakers = ${JSON.stringify(updated.speakers)},
        closing_hymn = ${JSON.stringify(updated.closingHymn)},
        closing_prayer = ${updated.closingPrayer}
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      throw new Error(`Meeting with ID ${id} not found`);
    }

    return rowToMeeting(result[0]);
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw new Error(`Failed to update meeting: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Delete a meeting
export async function deleteMeeting(id: number): Promise<void> {
  try {
    const result = await sql`
      DELETE FROM meetings WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      throw new Error(`Meeting with ID ${id} not found`);
    }
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error(`Failed to delete meeting: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
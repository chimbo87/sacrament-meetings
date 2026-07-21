import { neon } from "@neondatabase/serverless";
import {
  SacramentMeeting,
  MeetingType,
  Hymn,
  SpeakerItem,
  WardBusinessItem,
} from "./types";

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
    closingPrayer: row.closing_prayer as string,
  };
}

// Get all meetings with optional date filter
export async function getMeetings(date?: string): Promise<SacramentMeeting[]> {
  try {
    let query = "SELECT * FROM meetings";
    const params: (string | number)[] = [];

    if (date) {
      query += " WHERE date = $1";
      params.push(date);
    }

    query += " ORDER BY date DESC";

    const rows = await sql.query(query, params);
    return rows.map(rowToMeeting);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    throw new Error("Failed to fetch meetings from database");
  }
}

// Get a single meeting by ID
export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | undefined> {
  try {
    const rows = await sql.query("SELECT * FROM meetings WHERE id = $1", [id]);

    if (rows.length === 0) {
      return undefined;
    }

    return rowToMeeting(rows[0]);
  } catch (error) {
    console.error("Error fetching meeting by ID:", error);
    throw new Error("Failed to fetch meeting from database");
  }
}

// Get meetings by date (for the current meeting redirect)
export async function getMeetingsByDate(
  date: string
): Promise<SacramentMeeting[]> {
  return getMeetings(date);
}

// Get the most recent Sunday
export function getMostRecentSunday(): string {
  const today = new Date();
  const day = today.getDay(); // 0 = Sunday
  const diff = day; // Days to subtract to get to Sunday
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - diff);
  return sunday.toISOString().split("T")[0];
}

// Get current Sunday's meeting
export async function getCurrentSundayMeeting(): Promise<
  SacramentMeeting | undefined
> {
  const currentSunday = getMostRecentSunday();
  const meetings = await getMeetingsByDate(currentSunday);
  return meetings.length > 0 ? meetings[0] : undefined;
}

// --- MUTATION FUNCTIONS (stubs for Week 04) ---

export async function addMeeting(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  meeting: Omit<SacramentMeeting, "id">
): Promise<SacramentMeeting> {
  // This will be implemented in Week 04 when forms are built
  throw new Error("addMeeting not implemented yet");
}

export async function updateMeeting(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  meeting: Partial<SacramentMeeting>
): Promise<SacramentMeeting> {
  // This will be implemented in Week 04 when forms are built
  throw new Error("updateMeeting not implemented yet");
}

export async function deleteMeeting(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id: number
): Promise<void> {
  throw new Error("deleteMeeting not implemented yet");
}

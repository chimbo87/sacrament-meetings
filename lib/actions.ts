'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { neon } from '@neondatabase/serverless';
import { MeetingType } from './types';

// Initialize database connection
const sql = neon(process.env.DATABASE_URL!, {
  connectionTimeout: 30,
  idleTimeout: 30,
  max: 10,
});

// Zod schema for meeting validation
const MeetingFormSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special']),
  presiding: z.string().min(2, 'Presiding officer name is required'),
  conducting: z.string().min(2, 'Conducting officer name is required'),
  announcements: z.array(z.string()).optional(),
  openingHymnNumber: z.coerce.number().min(1, 'Hymn number must be at least 1'),
  openingHymnTitle: z.string().min(1, 'Hymn title is required'),
  openingPrayer: z.string().min(2, 'Opening prayer name is required'),
  wardBusiness: z.array(z.object({ description: z.string() })).optional(),
  stakeBusiness: z.boolean().default(false),
  sacramentHymnNumber: z.coerce.number().min(1, 'Hymn number must be at least 1'),
  sacramentHymnTitle: z.string().min(1, 'Hymn title is required'),
  speakers: z.array(z.object({
    name: z.string().min(2, 'Speaker name is required'),
    topic: z.string().min(2, 'Topic is required'),
    type: z.enum(['speaker', 'musical-number'])
  })).min(1, 'At least one speaker is required'),
  closingHymnNumber: z.coerce.number().min(1, 'Hymn number must be at least 1'),
  closingHymnTitle: z.string().min(1, 'Hymn title is required'),
  closingPrayer: z.string().min(2, 'Closing prayer name is required'),
});

// Type for the form state
export type MeetingFormState = {
  message?: string;
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    speakers?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
  };
};

// Helper function to convert form data to meeting object
function formDataToMeeting(data: FormData) {
  const speakers = [];
  const speakerNames = data.getAll('speakerName');
  const speakerTopics = data.getAll('speakerTopic');
  const speakerTypes = data.getAll('speakerType');
  
  for (let i = 0; i < speakerNames.length; i++) {
    speakers.push({
      name: speakerNames[i] as string,
      topic: speakerTopics[i] as string,
      type: speakerTypes[i] as 'speaker' | 'musical-number'
    });
  }

  const wardBusiness = [];
  const businessDescriptions = data.getAll('businessDescription');
  for (const description of businessDescriptions) {
    if (description) {
      wardBusiness.push({ description: description as string });
    }
  }

  return {
    date: data.get('date') as string,
    meetingType: data.get('meetingType') as MeetingType,
    presiding: data.get('presiding') as string,
    conducting: data.get('conducting') as string,
    announcements: data.getAll('announcement').filter(a => a) as string[],
    openingHymnNumber: Number(data.get('openingHymnNumber')),
    openingHymnTitle: data.get('openingHymnTitle') as string,
    openingPrayer: data.get('openingPrayer') as string,
    wardBusiness,
    stakeBusiness: data.get('stakeBusiness') === 'on',
    sacramentHymnNumber: Number(data.get('sacramentHymnNumber')),
    sacramentHymnTitle: data.get('sacramentHymnTitle') as string,
    speakers,
    closingHymnNumber: Number(data.get('closingHymnNumber')),
    closingHymnTitle: data.get('closingHymnTitle') as string,
    closingPrayer: data.get('closingPrayer') as string,
  };
}

// CREATE MEETING
export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  try {
    const rawData = formDataToMeeting(formData);
    
    // Validate with Zod
    const validated = MeetingFormSchema.safeParse(rawData);
    
    if (!validated.success) {
      return {
        message: 'Validation failed',
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const data = validated.data;

    // Insert into database
    await sql`
      INSERT INTO meetings (
        date, meeting_type, presiding, conducting, announcements,
        opening_hymn, opening_prayer, ward_business, stake_business,
        sacrament_hymn, speakers, closing_hymn, closing_prayer
      ) VALUES (
        ${data.date}::date,
        ${data.meetingType},
        ${data.presiding},
        ${data.conducting},
        ${data.announcements || []},
        ${JSON.stringify({ number: data.openingHymnNumber, title: data.openingHymnTitle })},
        ${data.openingPrayer},
        ${JSON.stringify(data.wardBusiness || [])},
        ${data.stakeBusiness},
        ${JSON.stringify({ number: data.sacramentHymnNumber, title: data.sacramentHymnTitle })},
        ${JSON.stringify(data.speakers)},
        ${JSON.stringify({ number: data.closingHymnNumber, title: data.closingHymnTitle })},
        ${data.closingPrayer}
      )
    `;

    revalidatePath('/meetings');
  } catch (error) {
    console.error('Error creating meeting:', error);
    
    // Check if it's a unique constraint violation (date already exists)
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      return {
        message: 'A meeting already exists on this date. Please choose a different date.',
        errors: {
          date: ['A meeting already exists on this date. Please choose a different date.'],
        },
      };
    }
    
    return {
      message: 'Failed to create meeting. Please try again.',
    };
  }
  
  // Redirect after successful creation
  redirect('/meetings');
}

// UPDATE MEETING
export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  try {
    const rawData = formDataToMeeting(formData);
    
    // Validate with Zod
    const validated = MeetingFormSchema.safeParse(rawData);
    
    if (!validated.success) {
      return {
        message: 'Validation failed',
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const data = validated.data;

    // Update in database
    await sql`
      UPDATE meetings SET
        date = ${data.date}::date,
        meeting_type = ${data.meetingType},
        presiding = ${data.presiding},
        conducting = ${data.conducting},
        announcements = ${data.announcements || []},
        opening_hymn = ${JSON.stringify({ number: data.openingHymnNumber, title: data.openingHymnTitle })},
        opening_prayer = ${data.openingPrayer},
        ward_business = ${JSON.stringify(data.wardBusiness || [])},
        stake_business = ${data.stakeBusiness},
        sacrament_hymn = ${JSON.stringify({ number: data.sacramentHymnNumber, title: data.sacramentHymnTitle })},
        speakers = ${JSON.stringify(data.speakers)},
        closing_hymn = ${JSON.stringify({ number: data.closingHymnNumber, title: data.closingHymnTitle })},
        closing_prayer = ${data.closingPrayer}
      WHERE id = ${id}
    `;

    revalidatePath('/meetings');
  } catch (error) {
    console.error('Error updating meeting:', error);
    
    // Check if it's a unique constraint violation (date already exists)
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      return {
        message: 'A meeting already exists on this date. Please choose a different date.',
        errors: {
          date: ['A meeting already exists on this date. Please choose a different date.'],
        },
      };
    }
    
    return {
      message: 'Failed to update meeting. Please try again.',
    };
  }
  
  // Redirect after successful update
  redirect('/meetings');
}

// DELETE MEETING
export async function deleteMeeting(
  id: number
): Promise<{ message?: string; error?: string }> {
  try {
    await sql`
      DELETE FROM meetings WHERE id = ${id}
    `;

    revalidatePath('/meetings');
    return { message: 'Meeting deleted successfully' };
  } catch (error) {
    console.error('Error deleting meeting:', error);
    return { error: 'Failed to delete meeting. Please try again.' };
  }
}
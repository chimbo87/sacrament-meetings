import { Metadata } from 'next';
import NewMeetingClient from './NewMeetingClient';

export const metadata: Metadata = {
  title: 'Create Meeting - Sacramento Ward',
  description: 'Create a new sacrament meeting agenda. Add speakers, hymns, prayers, and announcements.',
};

export default function NewMeetingPage() {
  return <NewMeetingClient />;
}
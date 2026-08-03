import { Metadata } from 'next';
import EditMeetingClient from './EditMeetingClient';

export const metadata: Metadata = {
  title: 'Edit Meeting - Sacramento Ward',
  description: 'Edit an existing sacrament meeting agenda. Update speakers, hymns, prayers, and announcements.',
};

export default function EditMeetingPage() {
  return <EditMeetingClient />;
}
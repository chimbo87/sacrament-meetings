import { Metadata } from 'next';
import MeetingsClient from './MeetingsClient';

export const metadata: Metadata = {
  title: 'Meetings - Sacramento Ward',
  description: 'View all sacrament meetings. Search, filter, and browse past and upcoming meetings.',
};

export default function MeetingsPage() {
  return <MeetingsClient />;
}
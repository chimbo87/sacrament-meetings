import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLinks from '@/components/NavLinks';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Sacramento Ward - Sacrament Meeting Planner',
    template: '%s | Sacramento Ward'
  },
  description: 'Plan and manage sacrament meeting agendas for Sacramento Ward.',
  openGraph: {
    title: 'Sacramento Ward - Sacrament Meeting Planner',
    description: 'Plan and manage sacrament meeting agendas for Sacramento Ward.',
    url: 'https://sacrament-meetings.vercel.app',
    siteName: 'Sacramento Ward Meeting Planner',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sacramento Ward - Sacrament Meeting Planner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <NavLinks />
        <main className="flex-grow container-custom py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
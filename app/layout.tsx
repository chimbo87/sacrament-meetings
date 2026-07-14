import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLinks from '@/components/NavLinks';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sacramento Ward - Sacrament Meeting Planner',
  description: 'Plan and manage sacrament meeting agendas',
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
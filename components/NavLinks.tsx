'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch session on mount and when route changes
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          setSession(data);
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error('Session check error:', error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [pathname]); // Re-fetch when route changes

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        setSession(null);
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const links = [
    { href: '/', label: 'Home' },
    { href: '/meetings', label: 'Meetings' },
    { href: '/meetings/current', label: 'Current Meeting' },
  ];

  const adminLinks = [
    { href: '/meetings/new', label: 'Create Meeting' },
  ];

  return (
    <nav className="bg-gray-100 border-b border-gray-200">
      <div className="container-custom">
        <div className="flex flex-wrap items-center space-x-4 py-3">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          {/* Admin links - only show when logged in */}
          {session && !loading && (
            <>
              {adminLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-green-600 text-white'
                        : 'text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
              >
                Sign Out
              </button>
            </>
          )}
          
          {/* Show Login link when not logged in */}
          {!session && !loading && (
            <Link
              href="/login"
              className="px-3 py-2 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
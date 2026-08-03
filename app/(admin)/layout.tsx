import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Protect all admin routes
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="admin-layout">
      <div className="mb-6 pb-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome, {session.user?.name || 'Admin'}!</p>
          <p className="text-sm text-gray-500">{session.user?.email}</p>
        </div>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
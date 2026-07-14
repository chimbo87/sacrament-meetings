import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to Sacramento Ward
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Sacrament Meeting Planner - Helping bishoprics and branch leaders efficiently plan and manage sacrament meetings
        </p>
      </section>

      <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
        <Image
          src="https://images.unsplash.com/photo-1438031773910-a036f5952133?w=1200&h=400&fit=crop"
          alt="Sacramento Temple at sunset"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Building Faith Through Worship</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">View Meetings</h3>
          <p className="text-gray-600 mb-4">Browse all sacrament meetings and their details</p>
          <Link href="/meetings" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            View All Meetings
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Current Meeting</h3>
          <p className="text-gray-600 mb-4">View this week&apos;s sacrament meeting program</p>
          <Link href="/meetings/current" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            View Current Meeting
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Meeting Planner</h3>
          <p className="text-gray-600 mb-4">Plan and manage meeting details</p>
          <Link href="/meetings" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Start Planning
          </Link>
        </div>
      </div>
    </div>
  );
}
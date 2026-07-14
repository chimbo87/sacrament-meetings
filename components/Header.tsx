import Link from 'next/link';

export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
      <div className="container-custom py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            Sacramento Ward
          </Link>
          <div className="text-sm md:text-base mt-2 md:mt-0">
            {currentDate}
          </div>
        </div>
      </div>
    </header>
  );
}
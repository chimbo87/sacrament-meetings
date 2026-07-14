export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container-custom py-6">
          <div className="text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Sacramento Ward - Sacrament Meeting Planner
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    );
  }
export default function MeetingsLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="meetings-layout">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Sacrament Meetings</h1>
          <p className="text-gray-600 mt-1">Manage and view sacrament meeting agendas</p>
        </div>
        {children}
      </div>
    );
  }
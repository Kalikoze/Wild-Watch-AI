import { DashboardNav } from '@/app/components/navigation/DashboardNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-primary">
      {/* Left Sidebar */}
      <aside className="fixed left-0 h-full w-64 bg-primary-light border-r border-neutral-light/10">
        {/* Add your sidebar navigation here */}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto pt-16 px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 
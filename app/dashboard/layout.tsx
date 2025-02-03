import { AppNav } from '@/app/components/navigation/AppNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-primary">
      <aside className="fixed left-0 h-full w-64 bg-primary-light border-r border-neutral-light/10">
      </aside>

      <div className="flex-1 flex flex-col ml-64">
        <AppNav />
        <main className="flex-1 overflow-y-auto pt-16 px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 
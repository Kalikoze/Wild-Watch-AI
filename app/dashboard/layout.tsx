import { AppNav } from '@/app/components/navigation/AppNav';
import { DashboardSidebar } from '@/app/components/navigation/DashboardSidebar';
import { createServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServer();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return redirect('/signup');
  }

  const isOrganization = user.email?.includes('@org') || false;

  return (
    <div className="flex h-screen bg-primary">
      <aside className="fixed left-0 h-full w-64 bg-primary-light border-r border-neutral-light/10">
        <DashboardSidebar
          userEmail={user.email || 'user@example.com'}
          isOrganization={isOrganization}
        />
      </aside>

      <div className="flex-1 flex flex-col ml-64">
        <AppNav />
        <main className="flex-1 overflow-y-auto pt-24 px-12 py-12">
          {children}
        </main>
      </div>
    </div>
  );
} 
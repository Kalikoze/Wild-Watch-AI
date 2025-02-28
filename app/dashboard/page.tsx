import { redirect } from 'next/navigation'
import { createServer } from '@/utils/supabase/server'
import { fetchDashboardData } from '@/lib/services/dashboard-service'
import { DashboardInfo } from './components/dashboard-info'
import { Suspense } from 'react'
import { ClientChartWrapper } from './components/ClientChartWrapper'
import { ClientVideosWrapper } from './components/ClientVideosWrapper'

// Loading state components
const ChartSkeleton = () => (
  <div className="bg-primary-light rounded-lg p-6 shadow-md w-full animate-pulse">
    <div className="h-[200px] bg-primary-dark rounded-md"></div>
  </div>
);

const VideoGridSkeleton = () => (
  <div className="bg-primary-light rounded-lg p-6 shadow-md w-full animate-pulse">
    <div className="h-8 bg-primary-dark rounded-md w-48 mb-4"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="bg-primary rounded-lg overflow-hidden">
          <div className="aspect-video bg-primary-dark"></div>
          <div className="p-3">
            <div className="h-4 bg-primary-dark rounded-md w-3/4 mb-2"></div>
            <div className="h-3 bg-primary-dark rounded-md w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Dashboard = async () => {
  const supabase = await createServer()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return redirect('/signup')
  }

  const dashboardData = await fetchDashboardData(user)

  if (!dashboardData?.profile) {
    return (
      <div className="min-h-screen bg-primary p-8">
        <h1 className="text-2xl text-neutral-light mb-4">Welcome to your Dashboard</h1>
        <p className="text-neutral-light">Unable to load your profile information. Please try again later.</p>
      </div>
    )
  }

  const { profile, organization } = dashboardData

  // For now, use mock video data - would be fetched from backend in production
  const mockVideoData = {
    totalVideos: 12,
    totalDuration: 375, // in minutes
    analyzedVideos: 8
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold text-neutral-light mb-6">Welcome to Wild Watch AI</h1>

      {/* Dashboard Info Section */}
      <DashboardInfo
        email={profile.email}
        subscriptionTier={organization?.subscription_tier}
        aiRequestsCount={profile.ai_requests_count}
        videoData={mockVideoData}
      />

      {/* Data Visualization Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <ClientChartWrapper
            chartType="wildlife"
            title="Wildlife Detected (Last 30 Days)"
          />
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>
          <ClientChartWrapper
            chartType="uploads"
            title="Video Uploads (Last 7 Days)"
          />
        </Suspense>
      </div>

      {/* Recent Videos Grid */}
      <div className="mt-6">
        <Suspense fallback={<VideoGridSkeleton />}>
          <ClientVideosWrapper />
        </Suspense>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-primary-light rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-neutral-light mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/dashboard/videos/upload"
            className="flex flex-col items-center justify-center p-4 bg-primary rounded-lg border border-neutral-light/10 hover:border-accent-green transition-colors"
          >
            <span className="text-accent-green text-3xl mb-2">🎥</span>
            <span className="text-neutral-light text-sm text-center">Upload Video</span>
          </a>

          <a
            href="/dashboard/analysis/new"
            className="flex flex-col items-center justify-center p-4 bg-primary rounded-lg border border-neutral-light/10 hover:border-accent-orange transition-colors"
          >
            <span className="text-accent-orange text-3xl mb-2">📊</span>
            <span className="text-neutral-light text-sm text-center">New Analysis</span>
          </a>

          <a
            href="/dashboard/analysis/reports"
            className="flex flex-col items-center justify-center p-4 bg-primary rounded-lg border border-neutral-light/10 hover:border-accent-gold transition-colors"
          >
            <span className="text-accent-gold text-3xl mb-2">📄</span>
            <span className="text-neutral-light text-sm text-center">View Reports</span>
          </a>

          <a
            href="/dashboard/settings"
            className="flex flex-col items-center justify-center p-4 bg-primary rounded-lg border border-neutral-light/10 hover:border-neutral transition-colors"
          >
            <span className="text-neutral text-3xl mb-2">⚙️</span>
            <span className="text-neutral-light text-sm text-center">Settings</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
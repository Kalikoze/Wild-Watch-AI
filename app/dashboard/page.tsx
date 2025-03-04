import React from 'react'
import { redirect } from 'next/navigation'
import { createServer } from '@/utils/supabase/server'
import { fetchDashboardData } from '@/lib/services/dashboard-service'
import { QuickInfo } from './components/QuickInfo'
import { QuickActions } from './components/QuickActions'
import { ClientVideosWrapper } from './components/ClientVideosWrapper'
import { RecentActivity } from './components/RecentActivity'
import { AnimalBehaviorChart } from './components/AnimalBehaviorChart'
import { mockActivity, mockBehaviorData, mockVideoData } from './data/mock-data'

const Dashboard = async () => {
  const supabase = await createServer()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return redirect('/signup')
  }

  const dashboardData = await fetchDashboardData(user)

  if (!dashboardData?.profile) {
    return (
      <>
        <h1 className="text-2xl text-neutral-light mb-4">Welcome to your Dashboard</h1>
        <p className="text-neutral-light">Unable to load your profile information. Please try again later.</p>
      </>
    )
  }

  const { profile, organization } = dashboardData

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-light">Wildlife Monitoring Dashboard</h1>
        <p className="text-neutral mt-3">
          Track animal behavior patterns, manage video analysis, and gain insights from your wildlife observations.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Top row: QuickInfo */}
        <div className="col-span-12">
          <QuickInfo
            subscriptionTier={organization?.subscription_tier}
            aiRequestsCount={profile.ai_requests_count}
            videoData={mockVideoData}
          />
        </div>

        {/* Middle row: Animal Behavior Chart and Actions/Recent Activity */}
        <div className="col-span-12 grid grid-cols-12 gap-6">
          <AnimalBehaviorChart
            data={mockBehaviorData}
            title="Animal Behavior Analysis"
          />

          <div className="col-span-12 md:col-span-6 lg:col-span-4 grid grid-cols-1 gap-6">
            <QuickActions />
            <RecentActivity activities={mockActivity} />
          </div>
        </div>

        {/* Bottom row: Video analysis grid */}
        <div className="col-span-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-neutral-light">Video Analysis</h2>
            <div className="text-sm text-neutral flex items-center">
              <span className="mr-2">● Recent Videos</span>
              <span>● Pending Analysis</span>
            </div>
          </div>
          <ClientVideosWrapper />
        </div>
      </div>
    </>
  )
}

export default Dashboard
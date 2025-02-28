'use client';

import { useState } from 'react';
import {
  RiVideoLine,
  RiFileChartLine,
  RiPulseLine,
  RiTimeLine,
  RiUploadCloud2Line,
  RiDownload2Line
} from 'react-icons/ri';
import Link from 'next/link';

type ActivityType = 'upload' | 'download' | 'analysis';

type Activity = {
  id: string;
  type: ActivityType;
  itemName: string;
  timestamp: string;
};

type DashboardInfoProps = {
  email: string;
  subscriptionTier?: string;
  aiRequestsCount: number;
  videoData?: {
    totalVideos: number;
    totalDuration: number;
    analyzedVideos: number;
  };
  recentActivity?: Activity[];
}

/**
 * Displays user dashboard information
 */
export const DashboardInfo = ({
  email,
  subscriptionTier = 'Free',
  aiRequestsCount = 0,
  videoData = {
    totalVideos: 0,
    totalDuration: 0,
    analyzedVideos: 0
  },
  recentActivity = []
}: DashboardInfoProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity'>('overview');

  // Generate mock data if not provided
  const mockActivity: Activity[] = recentActivity.length > 0 ? recentActivity : [
    { id: '1', type: 'upload', itemName: 'Yellowstone-Bears-May2023.mp4', timestamp: '2023-05-15T14:30:00Z' },
    { id: '2', type: 'analysis', itemName: 'Serengeti-Lions.mp4', timestamp: '2023-05-12T09:45:00Z' },
    { id: '3', type: 'download', itemName: 'Wildlife-Report-May2023.pdf', timestamp: '2023-05-10T16:20:00Z' },
  ];

  // Format timestamp to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate available AI credits based on subscription tier
  const getAiCredits = () => {
    const creditsMap: Record<string, number> = {
      'Free': 50,
      'Basic': 200,
      'Pro': 1000,
      'Enterprise': 5000,
      'Unlimited': Infinity
    };

    return creditsMap[subscriptionTier] || 50;
  };

  // Get icon for activity type
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'upload':
        return <RiUploadCloud2Line className="text-accent-green text-xl" />;
      case 'analysis':
        return <RiFileChartLine className="text-accent-orange text-xl" />;
      case 'download':
        return <RiDownload2Line className="text-accent-gold text-xl" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Account Overview Section */}
      <div className="bg-primary-light rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold text-neutral-light mb-4">Account Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary rounded-lg p-4 border border-neutral-light/10">
            <p className="text-neutral mb-1">Email</p>
            <p className="text-neutral-light font-medium truncate">{email}</p>
          </div>
          <div className="bg-primary rounded-lg p-4 border border-neutral-light/10">
            <p className="text-neutral mb-1">Subscription</p>
            <p className="text-accent-green font-medium">{subscriptionTier} Plan</p>
          </div>
          <div className="bg-primary rounded-lg p-4 border border-neutral-light/10">
            <p className="text-neutral mb-1">AI Credits</p>
            <div className="flex items-center">
              <div className="flex-1">
                <div className="h-2 bg-primary-dark rounded-full">
                  <div
                    className="h-2 bg-accent-green rounded-full"
                    style={{ width: `${Math.min(100, (aiRequestsCount / getAiCredits()) * 100)}%` }}
                  />
                </div>
              </div>
              <p className="text-neutral-light ml-3 whitespace-nowrap">
                {aiRequestsCount} / {getAiCredits() === Infinity ? '∞' : getAiCredits()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for different views */}
      <div className="bg-primary-light rounded-lg overflow-hidden shadow-md">
        <div className="flex border-b border-neutral-light/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 text-center transition-colors ${activeTab === 'overview'
              ? 'text-accent-green border-b-2 border-accent-green'
              : 'text-neutral hover:text-neutral-light'
              }`}
          >
            Data Overview
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 text-center transition-colors ${activeTab === 'activity'
              ? 'text-accent-green border-b-2 border-accent-green'
              : 'text-neutral hover:text-neutral-light'
              }`}
          >
            Recent Activity
          </button>
        </div>

        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-primary p-4 rounded-lg border border-neutral-light/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-neutral">Total Videos</h3>
                  <RiVideoLine className="text-accent-green text-xl" />
                </div>
                <p className="text-2xl text-neutral-light font-semibold">{videoData.totalVideos}</p>
              </div>

              <div className="bg-primary p-4 rounded-lg border border-neutral-light/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-neutral">Analyzed</h3>
                  <RiFileChartLine className="text-accent-orange text-xl" />
                </div>
                <p className="text-2xl text-neutral-light font-semibold">
                  {videoData.analyzedVideos}
                  <span className="text-sm text-neutral ml-2">
                    ({videoData.totalVideos > 0
                      ? Math.round((videoData.analyzedVideos / videoData.totalVideos) * 100)
                      : 0}%)
                  </span>
                </p>
              </div>

              <div className="bg-primary p-4 rounded-lg border border-neutral-light/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-neutral">Total Duration</h3>
                  <RiTimeLine className="text-accent-gold text-xl" />
                </div>
                <p className="text-2xl text-neutral-light font-semibold">
                  {Math.floor(videoData.totalDuration / 60)}h {videoData.totalDuration % 60}m
                </p>
              </div>

              <div className="bg-primary p-4 rounded-lg border border-neutral-light/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-neutral">Animal Sightings</h3>
                  <RiPulseLine className="text-accent-green-light text-xl" />
                </div>
                <p className="text-2xl text-neutral-light font-semibold">
                  {videoData.analyzedVideos * 5} {/* Mocked data - would be real in production */}
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/dashboard/videos/upload"
                className="inline-block bg-accent-green hover:bg-accent-green-light text-neutral-light py-2 px-4 rounded-md transition-colors"
              >
                Upload New Video
              </Link>
            </div>
          </div>
        )}

        {/* Activity Tab Content */}
        {activeTab === 'activity' && (
          <div className="p-4">
            <ul className="divide-y divide-neutral-light/10">
              {mockActivity.map(activity => (
                <li key={activity.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-neutral-light font-medium">{activity.itemName}</p>
                      <p className="text-neutral text-sm">
                        {activity.type === 'upload' && 'Uploaded video'}
                        {activity.type === 'analysis' && 'Analyzed video'}
                        {activity.type === 'download' && 'Downloaded report'}
                      </p>
                    </div>
                    <div className="text-neutral text-sm">
                      {formatDate(activity.timestamp)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 text-center">
              <Link
                href="/dashboard/activity"
                className="text-accent-green hover:text-accent-green-light text-sm"
              >
                View All Activity
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 
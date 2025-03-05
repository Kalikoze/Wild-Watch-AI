'use client';

import {
  RiVideoLine,
  RiFileChartLine,
  RiEyeLine,
  RiTimerLine,
  RiUploadCloud2Line,
  RiDownload2Line,
  RiBarChartBoxLine,
  RiAlertLine,
  RiInformationLine,
} from 'react-icons/ri';
import Button from '@/app/components/common/Button';
import Link from 'next/link';
import { Activity, ActivityType, DashboardInfoProps } from '../types/activity';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'detection':
      return <RiVideoLine className="text-accent-green text-xl" />;
    case 'analysis':
      return <RiFileChartLine className="text-accent-orange text-xl" />;
    case 'alert':
      return <RiAlertLine className="text-accent-gold text-xl" />;
    case 'upload':
      return <RiUploadCloud2Line className="text-accent-green text-xl" />;
    case 'download':
      return <RiDownload2Line className="text-accent-gold text-xl" />;
    case 'system':
    default:
      return <RiInformationLine className="text-neutral text-xl" />;
  }
};

export const DashboardInfo = ({
  subscriptionTier = 'Free',
  aiRequestsCount = 0,
  videoData = {
    totalVideos: 0,
    totalDuration: 0,
    analyzedVideos: 0,
    pendingAnalysis: 0
  },
  recentActivity = []
}: DashboardInfoProps) => {
  const mockActivity: Activity[] = recentActivity.length > 0 ? recentActivity : [
    { id: '1', type: 'upload', itemName: 'Yellowstone-Bears-May2023.mp4', timestamp: '2023-05-15T14:30:00Z' },
    { id: '2', type: 'analysis', itemName: 'Serengeti-Lions.mp4', timestamp: '2023-05-12T09:45:00Z' },
    { id: '3', type: 'download', itemName: 'Wildlife-Report-May2023.pdf', timestamp: '2023-05-10T16:20:00Z' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Button
          href="/dashboard/videos/upload"
          variant="primary"
          icon={RiUploadCloud2Line}
          iconPosition="left"
          fullWidth
        >
          Upload Video
        </Button>
        <Button
          href="/dashboard/analysis/new"
          variant="secondary"
          icon={RiBarChartBoxLine}
          iconPosition="left"
          fullWidth
        >
          New Analysis
        </Button>
        <Button
          href="/dashboard/analysis/reports"
          variant="neutral"
          icon={RiFileChartLine}
          iconPosition="left"
          fullWidth
        >
          View Reports
        </Button>
        <Button
          href="/dashboard/videos"
          variant="neutral"
          icon={RiVideoLine}
          iconPosition="left"
          fullWidth
        >
          Browse Videos
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-primary-light p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral">Total Videos</p>
              <p className="text-2xl font-semibold text-neutral-light mt-1">{videoData.totalVideos}</p>
            </div>
            <RiVideoLine className="text-accent-green text-2xl" />
          </div>
        </div>

        <div className="bg-primary-light p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral">Analysis Progress</p>
              <p className="text-2xl font-semibold text-neutral-light mt-1">
                {Math.round((videoData.analyzedVideos / videoData.totalVideos) * 100)}%
              </p>
            </div>
            <RiFileChartLine className="text-accent-orange text-2xl" />
          </div>
          <div className="mt-2 h-1 bg-primary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-orange transition-all duration-500"
              style={{ width: `${(videoData.analyzedVideos / videoData.totalVideos) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-primary-light p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral">AI Credits</p>
              <p className="text-2xl font-semibold text-neutral-light mt-1">{aiRequestsCount}</p>
            </div>
            <RiEyeLine className="text-accent-gold text-2xl" />
          </div>
          <p className="text-xs text-neutral mt-2">{subscriptionTier} Plan</p>
        </div>

        <div className="bg-primary-light p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral">Recent Activity</p>
              <p className="text-2xl font-semibold text-neutral-light mt-1">{mockActivity.length}</p>
            </div>
            <RiTimerLine className="text-accent-green-light text-2xl" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-primary-light rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-neutral-light">Latest Activity</h2>
          <Link href="/dashboard/activity" className="text-accent-green hover:text-accent-green-light text-sm">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {mockActivity.slice(0, 3).map(activity => (
            <div key={activity.id} className="flex items-center bg-primary rounded-lg p-3">
              {getActivityIcon(activity.type)}
              <div className="ml-3 flex-1">
                <p className="text-neutral-light text-sm font-medium truncate">{activity.itemName || activity.title}</p>
                <p className="text-neutral text-xs">
                  {activity.type === 'upload' && 'Video uploaded'}
                  {activity.type === 'analysis' && 'Analysis completed'}
                  {activity.type === 'download' && 'Report downloaded'}
                  {activity.description}
                </p>
              </div>
              <span className="text-neutral text-xs">{formatDate(activity.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 
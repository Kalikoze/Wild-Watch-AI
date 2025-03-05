'use client';

import Link from 'next/link';
import {
  RiUploadCloud2Line,
  RiFileChartLine,
  RiDownload2Line,
  RiEdit2Line,
  RiHistoryLine,
  RiArrowRightSLine,
  RiVideoLine,
  RiAlertLine,
  RiInformationLine
} from 'react-icons/ri';
import { ActivityType, RecentActivityProps } from '@/app/dashboard/types/activity';

const activityConfig: Record<ActivityType, {
  icon: typeof RiUploadCloud2Line;
  label: string;
  color: string;
  bgColor: string;
}> = {
  upload: {
    icon: RiUploadCloud2Line,
    label: 'Video uploaded',
    color: 'text-accent-green',
    bgColor: 'bg-accent-green/10'
  },
  analysis: {
    icon: RiFileChartLine,
    label: 'Analysis completed',
    color: 'text-accent-orange',
    bgColor: 'bg-accent-orange/10'
  },
  'behavior-edit': {
    icon: RiEdit2Line,
    label: 'Behavior edited',
    color: 'text-accent-gold',
    bgColor: 'bg-accent-gold/10'
  },
  download: {
    icon: RiDownload2Line,
    label: 'Report downloaded',
    color: 'text-accent-green-light',
    bgColor: 'bg-accent-green-light/10'
  },
  detection: {
    icon: RiVideoLine,
    label: 'Wildlife detected',
    color: 'text-accent-green',
    bgColor: 'bg-accent-green/10'
  },
  alert: {
    icon: RiAlertLine,
    label: 'Alert triggered',
    color: 'text-accent-gold',
    bgColor: 'bg-accent-gold/10'
  },
  system: {
    icon: RiInformationLine,
    label: 'System notification',
    color: 'text-neutral-light',
    bgColor: 'bg-neutral-light/10'
  }
} as const;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getRelativeTime = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return formatDate(dateString);
};

export function RecentActivity({ activities, maxDisplay = 5 }: RecentActivityProps) {
  return (
    <div className="bg-primary-light rounded-lg shadow-md border border-neutral-light/10 overflow-hidden h-full flex flex-col">
      <div className="px-5 py-4 border-b border-neutral-light/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <RiHistoryLine className="text-neutral-light" />
          <h2 className="text-lg font-semibold text-neutral-light">Recent Activity</h2>
        </div>
        <Link
          href="/dashboard/activity"
          className="text-accent-green hover:text-accent-green-light text-sm font-medium flex items-center"
        >
          View All
          <RiArrowRightSLine className="ml-1" />
        </Link>
      </div>

      <div className="overflow-auto p-3 flex-grow">
        <div className="space-y-3">
          {activities.slice(0, maxDisplay).map(activity => {
            const config = activityConfig[activity.type];
            const Icon = config.icon;
            const relativeTime = getRelativeTime(activity.timestamp);

            return (
              <div
                key={activity.id}
                className="bg-primary rounded-lg p-3 border border-neutral-light/10 hover:border-neutral-light/20 transition-colors group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`${config.bgColor} ${config.color} p-2 rounded-full flex-shrink-0`}>
                    <Icon className="text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-neutral-light text-sm font-medium truncate pr-2 group-hover:text-accent-green transition-colors">
                        {activity.title || activity.itemName || ''}
                      </p>
                      <div className="flex items-center">
                        <span className="text-neutral text-xs whitespace-nowrap">
                          {relativeTime}
                        </span>
                        <RiArrowRightSLine className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-light" />
                      </div>
                    </div>
                    <p className="text-neutral text-xs mt-1">
                      {activity.description || config.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-neutral">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
} 
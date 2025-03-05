/**
 * Types for activity-related components in the dashboard
 */

/**
 * Types of activities that can be displayed
 */
export type ActivityType = 'detection' | 'analysis' | 'alert' | 'system' | 'upload' | 'download' | 'behavior-edit';

/**
 * Structure for an activity item
 */
export type Activity = {
  id: string;
  type: ActivityType;
  title?: string;
  description?: string;
  itemName?: string;  // For backward compatibility
  timestamp: string;
  details?: {
    species?: string;
    confidence?: number;
    location?: string;
    [key: string]: any;
  };
};

/**
 * Props for the DashboardInfo component
 */
export type DashboardInfoProps = {
  subscriptionTier?: string;
  aiRequestsCount?: number;
  videoData?: {
    totalVideos: number;
    analyzedVideos: number;
    pendingAnalysis: number;
    totalDuration: number;
  };
  activities?: Activity[];
  recentActivity?: Activity[];  // For backward compatibility
};

/**
 * Props for the RecentActivity component
 */
export type RecentActivityProps = {
  activities: Activity[];
  maxDisplay?: number;
}; 
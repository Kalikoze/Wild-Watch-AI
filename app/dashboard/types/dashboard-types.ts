/**
 * Core dashboard activity and UI component types
 */

/**
 * Types of activities that can be displayed in the dashboard
 */
export type ActivityType = 'detection' | 'analysis' | 'alert' | 'system' | 'upload' | 'download' | 'behavior-edit';

/**
 * Structure for an activity item in the dashboard
 */
export type Activity = {
  id: string;
  type: ActivityType;
  title?: string;
  description?: string;
  timestamp: string;
  details?: {
    // Common fields
    species?: string;
    confidence?: number;
    location?: string;

    // For video processing
    videoId?: string;
    duration?: number;
    processedFrames?: number;

    // For alerts and system events
    severity?: 'low' | 'medium' | 'high';
    status?: 'success' | 'failed' | 'in-progress';
    message?: string;

    // For file operations
    fileName?: string;
    fileSize?: number;
    fileType?: string;

    // For behavior tracking
    animalId?: string;
    behaviorType?: string;
    previousValue?: string;
    newValue?: string;
  };
};

/**
 * Structure for video data summary used in dashboard
 */
export type VideoDataSummary = {
  totalVideos: number;
  analyzedVideos: number;
  pendingAnalysis: number;
  totalDuration?: number;
};

/**
 * Props for the DashboardInfo component
 */
export type DashboardInfoProps = {
  subscriptionTier?: string;
  aiRequestsCount?: number;
  videoData?: VideoDataSummary;
  activities?: Activity[];
};

/**
 * Props for the RecentActivity component
 */
export type RecentActivityProps = {
  activities: Activity[];
  maxDisplay?: number;
}; 
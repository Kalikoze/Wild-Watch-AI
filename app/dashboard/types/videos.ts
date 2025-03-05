/**
 * Types for video components in the dashboard
 */

/**
 * Data structure for a video item
 */
export type VideoItem = {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
  uploadDate: string;
  isAnalyzed: boolean;
  animalCount?: number;
};

/**
 * Props for the RecentVideosGrid component
 */
export type RecentVideosGridProps = {
  videos: VideoItem[];
  maxDisplay?: number;
};

/**
 * Aggregated video statistics
 */
export type VideoData = {
  totalVideos: number;
  analyzedVideos: number;
  pendingAnalysis: number;
  // Extended version used in dashboard-info.tsx
  totalDuration?: number;
}; 
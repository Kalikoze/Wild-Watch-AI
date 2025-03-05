/**
 * Types for video and media components in the dashboard
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
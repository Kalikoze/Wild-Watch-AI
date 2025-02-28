'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RiPlayCircleLine, RiTimeLine, RiFileChartLine, RiAlertLine } from 'react-icons/ri';
import { useState } from 'react';

export type VideoItem = {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: number; 
  uploadDate: string;
  isAnalyzed: boolean;
  animalCount?: number;
};

type RecentVideosGridProps = {
  videos: VideoItem[];
  maxDisplay?: number;
};

export const RecentVideosGrid = ({
  videos,
  maxDisplay = 4
}: RecentVideosGridProps) => {
  // State to track image load errors
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Function to format seconds to MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Handle image error
  const handleImageError = (videoId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [videoId]: true
    }));
  };

  return (
    <div className="bg-primary-light rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-neutral-light">Recent Videos</h2>
        <Link
          href="/dashboard/videos"
          className="text-accent-green hover:text-accent-green-light text-sm"
        >
          View All
        </Link>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-neutral mb-4">No videos uploaded yet</p>
          <Link
            href="/dashboard/videos/upload"
            className="inline-block bg-accent-green hover:bg-accent-green-light text-neutral-light py-2 px-4 rounded-md transition-colors"
          >
            Upload Your First Video
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {videos.slice(0, maxDisplay).map((video) => (
            <div
              key={video.id}
              className="bg-primary rounded-lg overflow-hidden border border-neutral-light/10 hover:border-accent-green/60 transition-colors"
            >
              <Link href={`/dashboard/videos/${video.id}`} className="block relative">
                <div className="aspect-video relative group">
                  {imageErrors[video.id] ? (
                    <div className="absolute inset-0 bg-primary-dark flex flex-col items-center justify-center text-neutral">
                      <RiAlertLine className="text-3xl mb-2" />
                      <span className="text-xs text-center px-2">Image unavailable</span>
                    </div>
                  ) : (
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      onError={() => handleImageError(video.id)}
                    />
                  )}
                  <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <RiPlayCircleLine className="text-neutral-light text-4xl" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-primary-dark/80 text-neutral-light text-xs px-2 py-1 rounded-md flex items-center">
                    <RiTimeLine className="mr-1" />
                    {formatDuration(video.duration)}
                  </div>
                  {video.isAnalyzed && (
                    <div className="absolute top-2 left-2 bg-accent-green/80 text-neutral-light text-xs px-2 py-1 rounded-md flex items-center">
                      <RiFileChartLine className="mr-1" />
                      Analyzed
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-3">
                <h3 className="text-neutral-light font-medium text-sm line-clamp-1">{video.title}</h3>
                <div className="flex justify-between items-center mt-2 text-xs text-neutral">
                  <span>{formatDate(video.uploadDate)}</span>
                  {video.animalCount !== undefined && (
                    <span>{video.animalCount} animals</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Generate mock data for demo purposes
export const generateMockVideos = (count = 6): VideoItem[] => {
  const animalTypes = ['Bears', 'Wolves', 'Deer', 'Birds', 'Foxes', 'Elephants', 'Lions'];
  const locations = ['Yellowstone', 'Serengeti', 'Amazon', 'Arctic', 'Borneo', 'Galapagos'];

  // More reliable placeholder image sources
  const placeholderImages = [
    'https://images.unsplash.com/photo-1545066836-77c58e1045c9?q=80&w=800', // Bear
    'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?q=80&w=800', // Wolf
    'https://images.unsplash.com/photo-1484406566174-9da000fda645?q=80&w=800', // Deer
    'https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=800', // Bird
    'https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=800', // Fox
    'https://images.unsplash.com/photo-1581852017103-68ac65513379?q=80&w=800', // Elephant 
    'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=800', // Lion
  ];

  return Array.from({ length: count }, (_, i) => {
    const animalIndex = Math.floor(Math.random() * animalTypes.length);
    const animalType = animalTypes[animalIndex];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const isAnalyzed = Math.random() > 0.3; // 70% chance to be analyzed

    // Subtract random days from current date (1-60 days)
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 60) - 1);

    return {
      id: `video-${i + 1}`,
      title: `${location} ${animalType} - Wildlife Study`,
      thumbnailUrl: placeholderImages[animalIndex], // Use pre-selected reliable images
      duration: Math.floor(Math.random() * 600) + 60, // 1-10 minutes
      uploadDate: date.toISOString(),
      isAnalyzed,
      animalCount: isAnalyzed ? Math.floor(Math.random() * 20) + 1 : undefined,
    };
  });
}; 
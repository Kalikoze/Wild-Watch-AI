'use client';

import { useState, useEffect } from 'react';
import { RecentVideosGrid, generateMockVideos } from '@/app/dashboard/components/RecentVideosGrid';
import { VideoItem } from '@/app/dashboard/types';
import { RiArrowRightLine } from 'react-icons/ri';

export const ClientVideosWrapper = () => {
  const [isClient, setIsClient] = useState(false);
  const [videoData, setVideoData] = useState<VideoItem[]>([]);

  useEffect(() => {
    setIsClient(true);
    setVideoData(generateMockVideos());
  }, []);

  if (!isClient) {
    return (
      <div className="bg-primary-light rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-light">Recent Videos</h2>
          <span className="text-accent-green text-sm flex items-center gap-1">
            View All <RiArrowRightLine />
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-primary rounded-lg overflow-hidden border border-neutral-light/10 h-full flex flex-col">
              <div className="aspect-video bg-primary-dark"></div>
              <div className="p-4">
                <div className="h-5 bg-primary-dark rounded-md w-3/4 mb-3"></div>
                <div className="mt-auto flex justify-between">
                  <div className="h-4 bg-primary-dark rounded-md w-1/3"></div>
                  <div className="h-4 bg-primary-dark rounded-md w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <RecentVideosGrid videos={videoData} />;
}; 
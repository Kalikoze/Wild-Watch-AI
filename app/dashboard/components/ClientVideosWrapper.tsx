'use client';

import { RecentVideosGrid, generateMockVideos } from './RecentVideosGrid';
import { useState, useEffect } from 'react';

export const ClientVideosWrapper = () => {
  // Start with empty videos array
  const [videos, setVideos] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This code only runs on the client after hydration
    setIsClient(true);
    setVideos(generateMockVideos());
  }, []);

  // Render empty/placeholder state before client hydration
  if (!isClient) {
    return (
      <div className="bg-primary-light rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-neutral-light">Recent Videos</h2>
          <span className="text-accent-green text-sm">View All</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-primary rounded-lg overflow-hidden border border-neutral-light/10">
              <div className="aspect-video bg-primary-dark"></div>
              <div className="p-3">
                <div className="h-4 bg-primary-dark rounded-md w-3/4 mb-2"></div>
                <div className="h-3 bg-primary-dark rounded-md w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Once on the client, render the actual videos
  return <RecentVideosGrid videos={videos} />;
}; 
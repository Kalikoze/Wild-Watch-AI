'use client';

import { VideoDataSummary } from '@/app/dashboard/types';
import {
  RiVideoLine,
  RiFileChartLine,
  RiEyeLine,
  RiInformationLine,
  RiVideoUploadLine,
  RiTimeLine
} from 'react-icons/ri';
import Tooltip from '@/app/components/common/Tooltip';

interface QuickInfoProps {
  subscriptionTier?: string;
  aiRequestsCount: number;
  videoData: VideoDataSummary;
}

const videoTooltip = "Your complete video collection ready for AI analysis. New uploads are automatically added to your library.";
const analysisTooltip = "Progress of AI behavior analysis across your video collection. Completed videos unlock detailed wildlife insights.";
const creditsTooltip = (tier: string) => `AI processing credits for behavior analysis. Your ${tier} plan includes a monthly allocation with premium features.`;

export const QuickInfo = ({
  subscriptionTier = 'Free',
  aiRequestsCount,
  videoData,
}: QuickInfoProps) => {
  return (
    <div className="bg-primary-light p-5 rounded-lg shadow-md border border-neutral-light/10">
      <h3 className="text-lg font-semibold text-neutral-light mb-4">Wildlife Monitoring Overview</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-primary rounded-lg p-4 relative border border-neutral-light/10">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-neutral font-medium">Video Library</p>
            <Tooltip content={videoTooltip}>
              <button
                className="text-neutral-light/70 hover:text-neutral-light p-1"
                aria-label="More information about Video Library"
              >
                <RiInformationLine />
              </button>
            </Tooltip>
          </div>
          <div className="flex justify-between items-end mt-2">
            <div className="flex items-center gap-2">
              <RiVideoLine className="text-accent-green text-xl" />
              <span className="text-xl font-bold text-neutral-light">{videoData.totalVideos}</span>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center text-xs text-neutral">
                <RiVideoUploadLine className="mr-1" />
                <span>New: {videoData.totalVideos - videoData.analyzedVideos}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary rounded-lg p-4 relative border border-neutral-light/10">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-neutral font-medium">Analysis Status</p>
            <Tooltip content={analysisTooltip}>
              <button
                className="text-neutral-light/70 hover:text-neutral-light p-1"
                aria-label="More information about Analysis Status"
              >
                <RiInformationLine />
              </button>
            </Tooltip>
          </div>
          <div className="flex flex-col mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-neutral">{videoData.analyzedVideos} processed</span>
              <span className="text-xs text-neutral">{videoData.pendingAnalysis} pending</span>
            </div>
            <div className="w-full bg-primary-dark rounded-full h-2 mb-2">
              <div
                className="bg-accent-orange h-2 rounded-full"
                style={{ width: `${Math.round((videoData.analyzedVideos / videoData.totalVideos) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <RiFileChartLine className="text-accent-orange text-lg" />
                <span className="text-lg font-bold text-neutral-light">
                  {Math.round((videoData.analyzedVideos / videoData.totalVideos) * 100)}%
                </span>
              </div>
              <div className="text-xs text-neutral flex items-center">
                <RiTimeLine className="mr-1" />
                <span>Est. completion: 2 hours</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary rounded-lg p-4 relative border border-neutral-light/10">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-neutral font-medium">AI Analysis Credits</p>
            <Tooltip content={creditsTooltip(subscriptionTier)}>
              <button
                className="text-neutral-light/70 hover:text-neutral-light p-1"
                aria-label="More information about AI Analysis Credits"
              >
                <RiInformationLine />
              </button>
            </Tooltip>
          </div>
          <div className="flex justify-between items-end mt-2">
            <div className="flex items-center gap-2">
              <RiEyeLine className="text-accent-gold text-xl" />
              <span className="text-xl font-bold text-neutral-light">{aiRequestsCount}</span>
            </div>
            <div className="bg-primary-dark/50 px-2 py-1 rounded text-xs text-neutral-light">
              {subscriptionTier} Plan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 
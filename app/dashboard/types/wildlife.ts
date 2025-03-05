export type BehaviorType = 'Playing' | 'Eating' | 'Resting' | 'Stressed' | 'Social';

export type ActivityType = 'upload' | 'analysis' | 'behavior-edit' | 'download';

export type AnimalType = 'Lion' | 'Tiger' | 'Elephant' | 'Giraffe' | 'Penguin';

export type BehaviorDataPoint = {
  timestamp: string;
  behavior: BehaviorType;
  count: number;
};

export type AnimalBehaviorDataPoint = {
  timestamp: string;
  animal: AnimalType;
  behavior: BehaviorType;
  count: number;
};

export type Activity = {
  id: string;
  type: ActivityType;
  title: string;
  timestamp: string;
};

export type VideoData = {
  totalVideos: number;
  analyzedVideos: number;
  pendingAnalysis: number;
}; 
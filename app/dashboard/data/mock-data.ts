import { Activity, AnimalBehaviorDataPoint } from '@/app/dashboard/types/wildlife';

// Animal-specific behavior data
export const mockBehaviorData: AnimalBehaviorDataPoint[] = [
  // Lions
  { timestamp: '2024-03-01', animal: 'Lion', behavior: 'Playing', count: 5 },
  { timestamp: '2024-03-01', animal: 'Lion', behavior: 'Eating', count: 8 },
  { timestamp: '2024-03-01', animal: 'Lion', behavior: 'Resting', count: 15 },
  { timestamp: '2024-03-01', animal: 'Lion', behavior: 'Social', count: 7 },
  { timestamp: '2024-03-01', animal: 'Lion', behavior: 'Stressed', count: 2 },

  // Tigers
  { timestamp: '2024-03-01', animal: 'Tiger', behavior: 'Playing', count: 3 },
  { timestamp: '2024-03-01', animal: 'Tiger', behavior: 'Eating', count: 7 },
  { timestamp: '2024-03-01', animal: 'Tiger', behavior: 'Resting', count: 18 },
  { timestamp: '2024-03-01', animal: 'Tiger', behavior: 'Social', count: 4 },
  { timestamp: '2024-03-01', animal: 'Tiger', behavior: 'Stressed', count: 3 },

  // Elephants
  { timestamp: '2024-03-01', animal: 'Elephant', behavior: 'Playing', count: 9 },
  { timestamp: '2024-03-01', animal: 'Elephant', behavior: 'Eating', count: 12 },
  { timestamp: '2024-03-01', animal: 'Elephant', behavior: 'Resting', count: 10 },
  { timestamp: '2024-03-01', animal: 'Elephant', behavior: 'Social', count: 14 },
  { timestamp: '2024-03-01', animal: 'Elephant', behavior: 'Stressed', count: 1 },

  // Giraffes
  { timestamp: '2024-03-01', animal: 'Giraffe', behavior: 'Playing', count: 2 },
  { timestamp: '2024-03-01', animal: 'Giraffe', behavior: 'Eating', count: 15 },
  { timestamp: '2024-03-01', animal: 'Giraffe', behavior: 'Resting', count: 8 },
  { timestamp: '2024-03-01', animal: 'Giraffe', behavior: 'Social', count: 5 },
  { timestamp: '2024-03-01', animal: 'Giraffe', behavior: 'Stressed', count: 2 },

  // Penguins
  { timestamp: '2024-03-01', animal: 'Penguin', behavior: 'Playing', count: 12 },
  { timestamp: '2024-03-01', animal: 'Penguin', behavior: 'Eating', count: 9 },
  { timestamp: '2024-03-01', animal: 'Penguin', behavior: 'Resting', count: 7 },
  { timestamp: '2024-03-01', animal: 'Penguin', behavior: 'Social', count: 16 },
  { timestamp: '2024-03-01', animal: 'Penguin', behavior: 'Stressed', count: 1 },
];

export const behaviorColors = {
  'Playing': '#28A745', // accent-green
  'Eating': '#FF5722',  // accent-orange
  'Resting': '#FFA000', // accent-gold
  'Stressed': '#B33810', // accent-orange-dark
  'Social': '#34CE57',   // accent-green-light
} as const;

export const mockVideoData = {
  totalVideos: 12,
  analyzedVideos: 8,
  pendingAnalysis: 4
};

export const mockActivity: Activity[] = [
  {
    id: '1',
    type: 'upload',
    itemName: 'Elephant Enclosure - Morning Routine.mp4',
    timestamp: '2024-03-15T14:30:00Z'
  },
  {
    id: '2',
    type: 'analysis',
    itemName: 'Lion Pride - Feeding Time.mp4',
    timestamp: '2024-03-14T09:45:00Z'
  },
  {
    id: '3',
    type: 'behavior-edit',
    itemName: 'Tiger Cubs - Play Session.mp4',
    timestamp: '2024-03-13T16:20:00Z'
  },
  {
    id: '4',
    type: 'upload',
    itemName: 'Giraffe Habitat - Afternoon.mp4',
    timestamp: '2024-03-12T11:15:00Z'
  },
  {
    id: '5',
    type: 'analysis',
    itemName: 'Penguin Colony - Feeding.mp4',
    timestamp: '2024-03-11T10:30:00Z'
  },
]; 
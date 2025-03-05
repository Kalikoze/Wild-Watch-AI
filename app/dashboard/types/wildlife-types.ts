/**
 * Wildlife tracking and behavior monitoring types
 */

/**
 * Types of animal behaviors that can be tracked
 */
export type BehaviorType = 'Playing' | 'Eating' | 'Resting' | 'Stressed' | 'Social';

/**
 * Types of animals that can be monitored
 * This should be expanded as needed based on your application requirements
 */
export type AnimalType = 'Lion' | 'Tiger' | 'Elephant' | 'Giraffe' | 'Penguin';

/**
 * Data point for behavior tracking
 */
export type BehaviorDataPoint = {
  timestamp: string;
  behavior: BehaviorType;
  count: number;
};

/**
 * Data point for animal-specific behavior tracking
 */
export type AnimalBehaviorDataPoint = {
  timestamp: string;
  animal: AnimalType;
  behavior: BehaviorType;
  count: number;
}; 
/**
 * Types for chart components in the dashboard
 */

import { TooltipProps } from 'recharts';
import { AnimalBehaviorDataPoint } from './wildlife-types';

/**
 * Data structure for wildlife data points in charts
 */
export type WildlifeDataPoint = {
  timestamp: string;
  species: string;
  count: number;
};

/**
 * Props for the WildlifeChart component
 */
export type WildlifeChartProps = {
  data: WildlifeDataPoint[];
  title: string;
};

/**
 * Processed data point structure for species data in charts
 */
export interface ProcessedDataPoint {
  timestamp: string;
  [species: string]: string | number;
}

/**
 * Data structure for animal activity visualization
 */
export type AnimalActivityData = {
  label: string;
  count: number;
  color: string;
};

/**
 * Props for the AnimalActivityChart component
 */
export type AnimalActivityChartProps = {
  data: AnimalActivityData[];
  title: string;
  height?: number;
};

/**
 * Generic chart data item
 */
export type ChartDataItem = {
  label: string;
  count: number;
  color: string;
};

/**
 * Props for the ClientChartWrapper component
 */
export type ClientChartWrapperProps = {
  chartType: 'wildlife' | 'uploads';
  title: string;
};

/**
 * Props for the AnimalBehaviorChart component
 */
export type AnimalBehaviorChartProps = {
  data: AnimalBehaviorDataPoint[];
  title: string;
};

/**
 * Props for custom tooltips in chart components
 * Uses Recharts TooltipProps generic type
 */
export type CustomTooltipProps = TooltipProps<number, string>; 
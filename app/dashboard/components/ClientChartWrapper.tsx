'use client';

import { useState, useEffect } from 'react';
import { ChartDataItem, ClientChartWrapperProps } from '@/app/dashboard/types/charts';
import { AnimalActivityChart, generateMockAnimalData } from '@/app/dashboard/components/AnimalActivityChart';

export const ClientChartWrapper = ({ chartType, title }: ClientChartWrapperProps) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const data = generateMockAnimalData()

    setChartData(data);
  }, [chartType]);

  if (!isClient) {
    return (
      <div className="bg-primary-light rounded-lg p-6 shadow-md w-full">
        <div className="h-[200px] bg-primary-dark rounded-md flex items-center justify-center">
          <span className="text-neutral">Loading chart data...</span>
        </div>
      </div>
    );
  }

  return (
    <AnimalActivityChart
      data={chartData}
      title={title}
    />
  );
}; 
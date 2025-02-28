'use client';

import { AnimalActivityChart, generateMockAnimalData } from './AnimalActivityChart';
import { useState, useEffect } from 'react';

type ClientChartWrapperProps = {
  chartType: 'wildlife' | 'uploads';
  title: string;
};

export const ClientChartWrapper = ({ chartType, title }: ClientChartWrapperProps) => {
  const [chartData, setChartData] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This code only runs on the client after hydration
    setIsClient(true);

    // Generate the appropriate data based on chart type
    const data = chartType === 'wildlife'
      ? generateMockAnimalData()
      : [
        { label: 'Mon', count: 8, color: '#28A745' },
        { label: 'Tue', count: 12, color: '#34CE57' },
        { label: 'Wed', count: 7, color: '#28A745' },
        { label: 'Thu', count: 14, color: '#34CE57' },
        { label: 'Fri', count: 10, color: '#28A745' },
        { label: 'Sat', count: 20, color: '#34CE57' },
        { label: 'Sun', count: 15, color: '#28A745' },
      ];

    setChartData(data);
  }, [chartType]);

  // Render placeholder before client hydration
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
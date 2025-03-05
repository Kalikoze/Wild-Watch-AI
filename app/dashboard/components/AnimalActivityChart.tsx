'use client';

import { AnimalActivityChartProps } from '@/app/dashboard/types';
import { useEffect, useRef } from 'react';

export const AnimalActivityChart = ({
  data,
  title,
  height = 300
}: AnimalActivityChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get max value for scaling
  const maxValue = Math.max(...data.map(item => item.count));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set dimensions based on device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;

    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${height}px`;

    // Drawing constants
    const padding = 40;
    const barWidth = (rect.width - padding * 2) / data.length - 10;
    const bottomPadding = 40;
    const chartHeight = height - bottomPadding - padding;

    // Draw title
    ctx.font = '14px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#A0A0A0'; // neutral
    ctx.textAlign = 'left';
    ctx.fillText(title, padding, 20);

    // Draw bars
    data.forEach((item, index) => {
      const barHeight = (item.count / maxValue) * chartHeight;
      const x = padding + index * (barWidth + 10);
      const y = height - bottomPadding - barHeight;

      // Draw bar
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 4);
      ctx.fill();

      // Draw value on top of bar
      ctx.fillStyle = '#F5F5F5'; // neutral-light
      ctx.textAlign = 'center';
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.fillText(
        item.count.toString(),
        x + barWidth / 2,
        y - 5
      );

      // Draw label below bar
      ctx.fillStyle = '#A0A0A0'; // neutral
      ctx.fillText(
        item.label,
        x + barWidth / 2,
        height - 15
      );
    });

    // Draw y-axis line
    ctx.strokeStyle = 'rgba(245, 245, 245, 0.1)'; // neutral-light with opacity
    ctx.beginPath();
    ctx.moveTo(padding - 10, padding);
    ctx.lineTo(padding - 10, height - bottomPadding);
    ctx.stroke();

    // Draw x-axis line
    ctx.beginPath();
    ctx.moveTo(padding - 10, height - bottomPadding);
    ctx.lineTo(rect.width - padding, height - bottomPadding);
    ctx.stroke();

  }, [data, height, title, maxValue]);

  return (
    <div className="bg-primary-light rounded-lg p-6 shadow-md w-full">
      <canvas
        ref={canvasRef}
        className="w-full"
        height={height}
      />
    </div>
  );
};

// Generate mock data for demo purposes
export const generateMockAnimalData = () => {
  return [
    { label: 'Bears', count: Math.floor(Math.random() * 20) + 5, color: '#28A745' },
    { label: 'Wolves', count: Math.floor(Math.random() * 15) + 3, color: '#1E7E34' },
    { label: 'Deer', count: Math.floor(Math.random() * 30) + 10, color: '#34CE57' },
    { label: 'Birds', count: Math.floor(Math.random() * 50) + 20, color: '#FF5722' },
    { label: 'Foxes', count: Math.floor(Math.random() * 12) + 2, color: '#FF7F50' },
    { label: 'Rabbits', count: Math.floor(Math.random() * 25) + 8, color: '#FFA000' },
  ];
}; 
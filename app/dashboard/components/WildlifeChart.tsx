'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

type WildlifeDataPoint = {
  timestamp: string;
  species: string;
  count: number;
};

type WildlifeChartProps = {
  data: WildlifeDataPoint[];
  title: string;
};

const speciesColors = {
  'Bears': '#28A745',
  'Wolves': '#1E7E34',
  'Deer': '#34CE57',
  'Birds': '#FF5722',
  'Foxes': '#FF7F50',
  'Rabbits': '#FFA000'
};

export const WildlifeChart = ({ data, title }: WildlifeChartProps) => {
  // Process data to group by species
  const processedData = data.reduce((acc: any[], curr) => {
    const existingPoint = acc.find(point => point.timestamp === curr.timestamp);
    if (existingPoint) {
      existingPoint[curr.species] = curr.count;
    } else {
      acc.push({
        timestamp: curr.timestamp,
        [curr.species]: curr.count
      });
    }
    return acc;
  }, []);

  const species = Array.from(new Set(data.map(d => d.species)));

  return (
    <div className="bg-primary-light rounded-lg p-6 shadow-md w-full">
      <h3 className="text-lg font-medium text-neutral-light mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={processedData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="timestamp"
              stroke="#A0A0A0"
              tick={{ fill: '#A0A0A0' }}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis
              stroke="#A0A0A0"
              tick={{ fill: '#A0A0A0' }}
              label={{ value: 'Sightings', angle: -90, position: 'insideLeft', fill: '#A0A0A0' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#F5F5F5' }}
              itemStyle={{ color: '#F5F5F5' }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: '20px'
              }}
            />
            {species.map((species) => (
              <Area
                key={species}
                type="monotone"
                dataKey={species}
                stackId="1"
                stroke={speciesColors[species as keyof typeof speciesColors]}
                fill={speciesColors[species as keyof typeof speciesColors]}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 
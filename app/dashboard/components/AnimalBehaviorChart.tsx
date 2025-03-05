'use client';

import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { AnimalType, BehaviorType } from '@/app/dashboard/types';
import { behaviorColors } from '@/app/dashboard/data/mock-data';
import {
  RiDropLine,
  RiPlayLine,
  RiRestaurantLine,
  RiMoonLine,
  RiGroupLine,
  RiAlarmWarningLine,
  RiInformationLine
} from 'react-icons/ri';
import Tooltip from '@/app/components/common/Tooltip';
import { AnimalBehaviorChartProps, CustomTooltipProps } from '@/app/dashboard/types';

const animalColors = {
  'Lion': '#FF5722',
  'Tiger': '#B33810',
  'Elephant': '#FFA000',
  'Giraffe': '#28A745',
  'Penguin': '#34CE57'
} as const;

const behaviorIcons = {
  'Playing': RiPlayLine,
  'Eating': RiRestaurantLine,
  'Resting': RiMoonLine,
  'Social': RiGroupLine,
  'Stressed': RiAlarmWarningLine
} as const;

const behaviorDescriptions = {
  'Playing': 'Playful activities including running, jumping, and object interaction.',
  'Eating': 'Consumption of food and drinking behaviors.',
  'Resting': 'Periods of inactivity, sleeping, or low-energy states.',
  'Social': 'Interaction with other animals, including grooming and communication.',
  'Stressed': 'Signs of distress, pacing, or abnormal behavior patterns.'
} as const;

export const AnimalBehaviorChart = ({ data, title }: AnimalBehaviorChartProps) => {
  const [selectedBehavior, setSelectedBehavior] = useState<BehaviorType | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType | null>(null);

  const animals = useMemo(() =>
    Array.from(new Set(data.map(d => d.animal))),
    [data]
  );

  const behaviors = useMemo(() =>
    Array.from(new Set(data.map(d => d.behavior))),
    [data]
  );

  const chartData = useMemo(() => {
    let filteredData = [...data];

    if (selectedBehavior) {
      filteredData = filteredData.filter(d => d.behavior === selectedBehavior);
    }

    if (selectedAnimal) {
      filteredData = filteredData.filter(d => d.animal === selectedAnimal);
    }

    if (selectedBehavior && !selectedAnimal) {
      return filteredData.map(d => ({
        name: d.animal,
        value: d.count,
        color: animalColors[d.animal as keyof typeof animalColors]
      }));
    } else if (selectedAnimal && !selectedBehavior) {
      return filteredData.map(d => ({
        name: d.behavior,
        value: d.count,
        color: behaviorColors[d.behavior as keyof typeof behaviorColors]
      }));
    } else if (selectedAnimal && selectedBehavior) {
      return filteredData.map(d => ({
        name: `${d.animal} - ${d.behavior}`,
        value: d.count,
        color: behaviorColors[d.behavior as keyof typeof behaviorColors]
      }));
    } else {
      const result: Record<string, { name: string; value: number; color: string }> = {};

      filteredData.forEach(d => {
        if (!result[d.behavior]) {
          result[d.behavior] = {
            name: d.behavior,
            value: 0,
            color: behaviorColors[d.behavior as keyof typeof behaviorColors]
          };
        }
        result[d.behavior].value += d.count;
      });

      return Object.values(result);
    }
  }, [data, selectedAnimal, selectedBehavior]);

  const handleResetFilters = () => {
    setSelectedAnimal(null);
    setSelectedBehavior(null);
  };

  const renderCustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary-dark/95 backdrop-blur-sm px-3 py-2 border border-neutral-light/10 shadow-lg rounded-md text-neutral-light">
          <p className="font-bold tracking-wide">{`${payload[0].name}`}</p>
          <p className="text-sm leading-relaxed mt-1">{`Observations: ${payload[0].value}`}</p>
          {selectedBehavior && (
            <p className="text-xs mt-1 max-w-[200px] leading-relaxed text-neutral-light/90">
              {behaviorDescriptions[selectedBehavior as keyof typeof behaviorDescriptions]}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-8 h-full bg-primary-light rounded-lg p-6 shadow-md border border-neutral-light/10">
      <div className="pb-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-neutral-light">{title}</h3>
            <p className="text-sm text-neutral">
              {selectedBehavior
                ? `Analyzing ${selectedBehavior} behavior`
                : selectedAnimal
                  ? `Behaviors for ${selectedAnimal}`
                  : "Track and compare behavior patterns across different animals"}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {(selectedBehavior || selectedAnimal) && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-1 text-xs bg-primary border border-neutral-light/20 text-neutral-light hover:border-neutral-light/40 rounded-md transition-colors"
              >
                Reset Filters
              </button>
            )}
            <Tooltip
              content={
                <div>
                  <p className="font-medium mb-1">About Animal Behavior Analysis:</p>
                  <p>This chart displays the frequency of behaviors observed across animals. Select any animal or behavior type to filter the data and explore patterns over time.</p>
                </div>
              }
            >
              <button className="p-1 text-neutral-light">
                <RiInformationLine className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <div className="mr-2">
            <span className="text-sm font-medium mr-2 text-neutral-light">Animals:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {animals.map(animal => {
                const isSelected = selectedAnimal === animal;
                return (
                  <span
                    key={animal}
                    className={`cursor-pointer inline-flex items-center px-2 py-1 rounded-full text-xs ${isSelected
                      ? 'bg-accent-green text-white'
                      : 'bg-primary border border-neutral-light/20 text-neutral-light hover:border-neutral-light/40'
                      }`}
                    onClick={() => setSelectedAnimal(isSelected ? null : animal as AnimalType)}
                  >
                    <RiDropLine className="h-3 w-3 mr-1" />
                    {animal}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <span className="text-sm font-medium mr-2 text-neutral-light">Behaviors:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {behaviors.map(behavior => {
                const isSelected = selectedBehavior === behavior;
                const Icon = behaviorIcons[behavior as keyof typeof behaviorIcons];
                const color = behaviorColors[behavior as keyof typeof behaviorColors];
                return (
                  <span
                    key={behavior}
                    className={`cursor-pointer inline-flex items-center px-2 py-1 rounded-full text-xs ${isSelected
                      ? 'text-white'
                      : 'bg-primary border border-neutral-light/20 text-neutral-light hover:border-neutral-light/40'
                      }`}
                    style={isSelected ? { backgroundColor: color } : {}}
                    onClick={() => setSelectedBehavior(isSelected ? null : behavior as BehaviorType)}
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {behavior}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {selectedBehavior && (
          <div className="bg-primary border border-neutral-light/20 p-3 rounded-md text-sm mt-1">
            <p className="font-medium text-neutral-light">{selectedBehavior}:</p>
            <p className="text-neutral">
              {behaviorDescriptions[selectedBehavior as keyof typeof behaviorDescriptions]}
            </p>
          </div>
        )}

        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#A0A0A0" tick={{ fill: '#A0A0A0' }} />
              <YAxis
                label={{
                  value: 'Observations',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#A0A0A0',
                  style: { textAnchor: 'middle' }
                }}
                stroke="#A0A0A0"
                tick={{ fill: '#A0A0A0' }}
              />
              <RechartsTooltip content={renderCustomTooltip} />
              <Legend wrapperStyle={{ color: '#A0A0A0' }} />
              <Bar dataKey="value" name={selectedAnimal || selectedBehavior || "Behavior Count"} radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}; 
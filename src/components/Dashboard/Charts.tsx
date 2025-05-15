
import React from 'react';
import { 
  Area, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart
} from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

interface ChartProps {
  data: any[];
  categories: string[];
  colors: string[];
  height?: number;
}

export const AreaChart = ({ data, categories, colors, height = 300 }: ChartProps) => {
  const config = categories.reduce((acc, category, index) => {
    acc[category] = {
      label: category.charAt(0).toUpperCase() + category.slice(1),
      color: colors[index] || "hsl(var(--primary))"
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer config={config}>
      <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          {categories.map((category, index) => (
            <linearGradient key={category} id={`color-${category}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors[index] || "hsl(var(--primary))"} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={colors[index] || "hsl(var(--primary))"} stopOpacity={0}/>
            </linearGradient>
          ))}
        </defs>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <ChartTooltip />
        {categories.map((category, index) => (
          <Area 
            key={category}
            type="monotone" 
            dataKey={category} 
            stroke={colors[index] || "hsl(var(--primary))"} 
            fillOpacity={1} 
            fill={`url(#color-${category})`} 
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
};

export const BarChart = ({ data, categories, colors, height = 300 }: ChartProps) => {
  const config = categories.reduce((acc, category, index) => {
    acc[category] = {
      label: category.charAt(0).toUpperCase() + category.slice(1),
      color: colors[index] || "hsl(var(--primary))"
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer config={config}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <ChartTooltip />
        {categories.map((category, index) => (
          <Bar 
            key={category}
            dataKey={category} 
            fill={colors[index] || "hsl(var(--primary))"} 
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};

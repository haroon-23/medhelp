
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  trend: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
}

const StatsCard = ({ title, value, description, trend, icon: Icon }: StatsCardProps) => {
  return (
    <div className="stats-card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 bg-primary/10 rounded">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="mt-4">
        <div
          className={cn(
            "inline-flex items-center text-xs font-medium",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}
        >
          {trend.isPositive ? (
            <ArrowUp className="h-3 w-3 mr-1" />
          ) : (
            <ArrowDown className="h-3 w-3 mr-1" />
          )}
          <span>{trend.value}%</span>
          <span className="text-muted-foreground ml-1">
            {trend.isPositive ? "increase" : "decrease"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;

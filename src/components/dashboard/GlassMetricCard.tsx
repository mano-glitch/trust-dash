import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { cn } from '@/lib/utils';

interface GlassMetricCardProps {
  title: string;
  value: number;
  change: number;
  changeLabel?: string;
  icon: ReactNode;
  chart: ReactNode;
  delay?: number;
}

export function GlassMetricCard({ 
  title, 
  value, 
  change, 
  changeLabel = 'this month',
  icon,
  chart,
  delay = 0
}: GlassMetricCardProps) {
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <div 
      className="glass-card group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, hsl(var(--glass-glow)), transparent 70%)',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <div className={cn(
            'metric-indicator',
            isPositive ? 'positive' : isNeutral ? 'neutral' : 'negative'
          )}>
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : isNeutral ? (
              <Minus className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            <span>{change > 0 ? '+' : ''}{change}%</span>
          </div>
        </div>

        {/* Value */}
        <div className="mb-1">
          <AnimatedCounter 
            value={value} 
            className="text-4xl font-bold text-foreground"
          />
        </div>

        {/* Title */}
        <p className="text-sm text-muted-foreground mb-4">{title}</p>

        {/* Chart */}
        <div className="h-16">
          {chart}
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground/70 mt-3">{changeLabel}</p>
      </div>
    </div>
  );
}

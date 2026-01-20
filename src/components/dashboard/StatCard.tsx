import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  chart?: ReactNode;
}

export function StatCard({ title, value, change, changeLabel, icon, chart }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="stat-card-value mt-1">{value}</p>
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      
      {chart && (
        <div className="h-12 mb-3">
          {chart}
        </div>
      )}
      
      {change !== undefined && (
        <div className="flex items-center gap-1.5">
          <div className={cn(
            'flex items-center gap-0.5 text-sm font-medium',
            isPositive ? 'text-success' : 'text-destructive'
          )}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
          {changeLabel && (
            <span className="text-sm text-muted-foreground">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}

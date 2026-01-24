import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useEffect, useState } from 'react';

interface AreaSparklineProps {
  data: { value: number }[];
  color?: string;
  height?: number;
}

export function AreaSparkline({ 
  data, 
  color = 'hsl(var(--chart-3))',
  height = 60 
}: AreaSparklineProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div 
      style={{ height, opacity: show ? 1 : 0 }} 
      className="transition-opacity duration-700"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

import { useEffect, useState } from 'react';

interface VerticalBarChartProps {
  data: number[];
  color?: string;
  height?: number;
}

export function VerticalBarChart({ 
  data, 
  color = 'hsl(var(--chart-2))',
  height = 60 
}: VerticalBarChartProps) {
  const [animated, setAnimated] = useState(false);
  const max = Math.max(...data);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-end justify-between gap-1" style={{ height }}>
      {data.map((value, index) => {
        const barHeight = (value / max) * height;
        return (
          <div
            key={index}
            className="flex-1 rounded-t-sm transition-all duration-700 ease-out"
            style={{
              height: animated ? barHeight : 0,
              background: `linear-gradient(to top, ${color}, ${color}88)`,
              boxShadow: `0 0 10px ${color}40`,
              transitionDelay: `${index * 50}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

import { cn } from '@/lib/utils';

type FilterPeriod = 'day' | 'month' | 'year';

interface FilterTabsProps {
  value: FilterPeriod;
  onChange: (value: FilterPeriod) => void;
}

export function FilterTabs({ value, onChange }: FilterTabsProps) {
  const options: { label: string; value: FilterPeriod }[] = [
    { label: 'Day', value: 'day' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
  ];

  return (
    <div className="inline-flex p-1 rounded-lg bg-muted">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
            value === option.value
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

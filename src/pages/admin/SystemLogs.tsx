import { useState } from 'react';
import { Search, Filter, AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogLevel = 'error' | 'warning' | 'info' | 'success';

interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  source: string;
  timestamp: string;
}

const mockLogs: LogEntry[] = [
  { id: '1', level: 'error', message: 'Database connection timeout', source: 'db-service', timestamp: '2026-01-20 14:32:15' },
  { id: '2', level: 'warning', message: 'High memory usage detected (85%)', source: 'monitoring', timestamp: '2026-01-20 14:30:00' },
  { id: '3', level: 'info', message: 'Scheduled backup completed', source: 'backup-service', timestamp: '2026-01-20 14:00:00' },
  { id: '4', level: 'success', message: 'SSL certificate renewed', source: 'security', timestamp: '2026-01-20 13:45:22' },
  { id: '5', level: 'info', message: 'New deployment started', source: 'ci-cd', timestamp: '2026-01-20 13:30:00' },
  { id: '6', level: 'warning', message: 'Rate limit approaching for API endpoint', source: 'api-gateway', timestamp: '2026-01-20 13:15:00' },
  { id: '7', level: 'error', message: 'Failed to send email notification', source: 'email-service', timestamp: '2026-01-20 12:55:30' },
  { id: '8', level: 'success', message: 'Cache cleared successfully', source: 'cache-service', timestamp: '2026-01-20 12:30:00' },
];

const levelConfig = {
  error: { icon: AlertCircle, className: 'text-destructive bg-destructive/10' },
  warning: { icon: AlertTriangle, className: 'text-warning bg-warning/10' },
  info: { icon: Info, className: 'text-chart-2 bg-chart-2/10' },
  success: { icon: CheckCircle, className: 'text-success bg-success/10' },
};

export default function SystemLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<LogLevel | 'all'>('all');

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterLevel === 'all' || log.level === filterLevel;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">System Logs</h1>
        <p className="text-muted-foreground mt-1">Monitor system events and errors</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as LogLevel | 'all')}
            className="form-input w-auto"
          >
            <option value="all">All Levels</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
          </select>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-2">
        {filteredLogs.map((log) => {
          const { icon: Icon, className } = levelConfig[log.level];
          return (
            <div key={log.id} className="stat-card flex items-start gap-4 p-4">
              <div className={cn('p-2 rounded-lg', className)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{log.message}</p>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="px-2 py-0.5 rounded bg-muted text-xs font-mono">{log.source}</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

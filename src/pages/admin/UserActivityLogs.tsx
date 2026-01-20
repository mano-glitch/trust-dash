import { useState } from 'react';
import { Search, User, LogIn, Upload, Download, Settings, Key } from 'lucide-react';

interface ActivityLog {
  id: string;
  user: string;
  email: string;
  action: string;
  actionType: 'login' | 'upload' | 'download' | 'settings' | 'password';
  details: string;
  ip: string;
  timestamp: string;
}

const mockActivityLogs: ActivityLog[] = [
  { id: '1', user: 'John Doe', email: 'john@example.com', action: 'Login', actionType: 'login', details: 'Successful login from Chrome/Windows', ip: '192.168.1.100', timestamp: '2026-01-20 14:32:15' },
  { id: '2', user: 'Jane Smith', email: 'jane@example.com', action: 'File Upload', actionType: 'upload', details: 'Uploaded report.pdf (2.3 MB)', ip: '192.168.1.101', timestamp: '2026-01-20 14:28:00' },
  { id: '3', user: 'Mike Johnson', email: 'mike@example.com', action: 'Download', actionType: 'download', details: 'Downloaded analytics_export.csv', ip: '192.168.1.102', timestamp: '2026-01-20 14:15:30' },
  { id: '4', user: 'Sarah Wilson', email: 'sarah@example.com', action: 'Settings Update', actionType: 'settings', details: 'Changed notification preferences', ip: '192.168.1.103', timestamp: '2026-01-20 13:55:00' },
  { id: '5', user: 'Tom Brown', email: 'tom@example.com', action: 'Password Change', actionType: 'password', details: 'Password successfully changed', ip: '192.168.1.104', timestamp: '2026-01-20 13:30:00' },
  { id: '6', user: 'John Doe', email: 'john@example.com', action: 'Login', actionType: 'login', details: 'Successful login from Safari/macOS', ip: '192.168.1.100', timestamp: '2026-01-20 12:00:00' },
];

const actionIcons = {
  login: LogIn,
  upload: Upload,
  download: Download,
  settings: Settings,
  password: Key,
};

export default function UserActivityLogs() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = mockActivityLogs.filter(log =>
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">User Activity Logs</h1>
        <p className="text-muted-foreground mt-1">Track user actions and interactions</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by user or action..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input pl-10"
        />
      </div>

      {/* Activity List */}
      <div className="stat-card p-0 overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
              <th>IP Address</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => {
              const Icon = actionIcons[log.actionType];
              return (
                <tr key={log.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{log.user}</p>
                        <p className="text-xs text-muted-foreground">{log.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span>{log.action}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground max-w-xs truncate">{log.details}</td>
                  <td className="font-mono text-xs text-muted-foreground">{log.ip}</td>
                  <td className="text-muted-foreground text-sm">{log.timestamp}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

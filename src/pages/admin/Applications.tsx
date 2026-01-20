import { useState } from 'react';
import { Search, Plus, ExternalLink, MoreHorizontal, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Application {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  users: number;
  requests: number;
  lastActivity: string;
}

const mockApps: Application[] = [
  { id: '1', name: 'Analytics Dashboard', description: 'Business intelligence and reporting', status: 'active', users: 245, requests: 12450, lastActivity: '2 min ago' },
  { id: '2', name: 'File Manager', description: 'Document storage and sharing', status: 'active', users: 189, requests: 8320, lastActivity: '5 min ago' },
  { id: '3', name: 'Email Service', description: 'Transactional email delivery', status: 'active', users: 156, requests: 45600, lastActivity: '1 min ago' },
  { id: '4', name: 'API Gateway', description: 'External API integrations', status: 'maintenance', users: 89, requests: 23100, lastActivity: '15 min ago' },
  { id: '5', name: 'Legacy Portal', description: 'Deprecated user portal', status: 'inactive', users: 12, requests: 45, lastActivity: '3 days ago' },
];

const statusStyles = {
  active: 'bg-success/10 text-success border-success/20',
  inactive: 'bg-muted text-muted-foreground border-muted',
  maintenance: 'bg-warning/10 text-warning border-warning/20',
};

export default function Applications() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = mockApps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Applications</h1>
          <p className="text-muted-foreground mt-1">Manage connected applications and integrations</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Application
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search applications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input pl-10"
        />
      </div>

      {/* Applications Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredApps.map((app) => (
          <div key={app.id} className="stat-card">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{app.name[0]}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <ExternalLink className="h-4 w-4" />
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <h3 className="font-semibold text-foreground">{app.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{app.description}</p>

            <div className="flex items-center gap-2 mt-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[app.status]}`}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
              <div>
                <p className="text-sm font-medium text-foreground">{app.users.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{app.requests.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Requests/day</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">Last activity: {app.lastActivity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Search, Shield, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuditLog {
  id: string;
  actor: string;
  actorRole: 'admin' | 'system';
  action: string;
  resource: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
  immutable: boolean;
}

const mockAuditLogs: AuditLog[] = [
  { id: '1', actor: 'Admin User', actorRole: 'admin', action: 'ROLE_CHANGE', resource: 'user:john@example.com', oldValue: 'user', newValue: 'admin', timestamp: '2026-01-20 14:32:15', immutable: true },
  { id: '2', actor: 'System', actorRole: 'system', action: 'PERMISSION_GRANT', resource: 'user:jane@example.com', newValue: 'file_upload', timestamp: '2026-01-20 14:00:00', immutable: true },
  { id: '3', actor: 'Admin User', actorRole: 'admin', action: 'USER_DELETE', resource: 'user:deleted@example.com', timestamp: '2026-01-20 13:45:00', immutable: true },
  { id: '4', actor: 'System', actorRole: 'system', action: 'CONFIG_CHANGE', resource: 'security:mfa_required', oldValue: 'false', newValue: 'true', timestamp: '2026-01-20 12:30:00', immutable: true },
  { id: '5', actor: 'Admin User', actorRole: 'admin', action: 'API_KEY_ROTATE', resource: 'api:production', timestamp: '2026-01-20 11:00:00', immutable: true },
  { id: '6', actor: 'System', actorRole: 'system', action: 'BACKUP_CREATE', resource: 'database:main', timestamp: '2026-01-20 06:00:00', immutable: true },
];

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = mockAuditLogs.filter(log =>
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.actor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Immutable security audit trail</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-sm">
          <Lock className="h-4 w-4" />
          <span>Immutable Records</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search audit logs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input pl-10"
        />
      </div>

      {/* Audit Log List */}
      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <div key={log.id} className="stat-card p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={cn(
                  'p-2 rounded-lg',
                  log.actorRole === 'admin' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                )}>
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium text-foreground">{log.action}</span>
                    <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                      {log.actorRole}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium">{log.actor}</span> on <span className="font-mono">{log.resource}</span>
                  </p>
                  {(log.oldValue || log.newValue) && (
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      {log.oldValue && (
                        <span className="px-2 py-1 rounded bg-destructive/10 text-destructive font-mono">
                          - {log.oldValue}
                        </span>
                      )}
                      {log.newValue && (
                        <span className="px-2 py-1 rounded bg-success/10 text-success font-mono">
                          + {log.newValue}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{log.timestamp}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Immutable</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Shield, Bell, Database, Key, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    mfaRequired: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    emailNotifications: true,
    securityAlerts: true,
    auditLogging: true,
    autoBackup: true,
    backupFrequency: 'daily',
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure system security and preferences</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Security Settings */}
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Security</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Require MFA</p>
                <p className="text-sm text-muted-foreground">Enforce multi-factor authentication for all users</p>
              </div>
              <Switch
                checked={settings.mfaRequired}
                onCheckedChange={(checked) => setSettings({ ...settings, mfaRequired: checked })}
              />
            </div>

            <div>
              <label className="form-label">Session Timeout (minutes)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                className="form-input"
                min={5}
                max={120}
              />
            </div>

            <div>
              <label className="form-label">Max Login Attempts</label>
              <input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) })}
                className="form-input"
                min={3}
                max={10}
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive system notifications via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Security Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified about security events</p>
              </div>
              <Switch
                checked={settings.securityAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, securityAlerts: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Audit Logging</p>
                <p className="text-sm text-muted-foreground">Log all administrative actions</p>
              </div>
              <Switch
                checked={settings.auditLogging}
                onCheckedChange={(checked) => setSettings({ ...settings, auditLogging: checked })}
              />
            </div>
          </div>
        </div>

        {/* Backup Settings */}
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Database className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Backup</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Automatic Backup</p>
                <p className="text-sm text-muted-foreground">Enable scheduled database backups</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
              />
            </div>

            <div>
              <label className="form-label">Backup Frequency</label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
                className="form-input"
                disabled={!settings.autoBackup}
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Key className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">API Configuration</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="form-label">API Key</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value="sk_live_xxxxxxxxxxxxxxxxxxxxxxxx"
                  readOnly
                  className="form-input font-mono text-sm"
                />
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              This API key has full access to your account. Keep it secure and never share it publicly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

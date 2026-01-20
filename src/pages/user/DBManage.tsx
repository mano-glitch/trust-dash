import { useState, FormEvent } from 'react';
import { Database, Eye, EyeOff, Save, Loader2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export default function DBManage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [errorMessage, setErrorMessage] = useState('');

  const [credentials, setCredentials] = useState({
    host: '',
    port: '5432',
    database: '',
    username: '',
    password: '',
  });

  const handleTestConnection = async () => {
    setIsTesting(true);
    setConnectionStatus('connecting');
    setErrorMessage('');

    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock success/failure
    if (credentials.host && credentials.database && credentials.username && credentials.password) {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('error');
      setErrorMessage('Please fill in all required fields');
    }
    setIsTesting(false);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMessage('');

    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (credentials.host && credentials.database && credentials.username && credentials.password) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setErrorMessage('Please fill in all required fields');
    }
    setIsSaving(false);
  };

  const statusConfig = {
    disconnected: { color: 'bg-muted', text: 'Not Connected', icon: Database },
    connecting: { color: 'bg-warning animate-pulse', text: 'Connecting...', icon: RefreshCw },
    connected: { color: 'bg-success', text: 'Connected', icon: CheckCircle },
    error: { color: 'bg-destructive', text: 'Connection Failed', icon: AlertCircle },
  };

  const status = statusConfig[connectionStatus];
  const StatusIcon = status.icon;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">DB Manage</h1>
        <p className="text-muted-foreground mt-1">Configure your database connection credentials</p>
      </div>

      <div className="max-w-2xl">
        {/* Connection Status */}
        <div className="stat-card mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn('w-3 h-3 rounded-full', status.color)} />
              <span className="font-medium text-foreground">{status.text}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="gap-2"
            >
              {isTesting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Test Connection
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 p-4 rounded-lg bg-success/10 border border-success/20 flex items-center gap-3 animate-fade-in">
            <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
            <p className="text-sm text-success">Credentials saved successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3 animate-fade-in">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{errorMessage}</p>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSave} className="stat-card space-y-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Database className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Database Credentials</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="host" className="form-label">
                Host <span className="text-destructive">*</span>
              </label>
              <input
                id="host"
                type="text"
                value={credentials.host}
                onChange={(e) => setCredentials({ ...credentials, host: e.target.value })}
                className="form-input"
                placeholder="localhost or db.example.com"
              />
            </div>

            <div>
              <label htmlFor="port" className="form-label">Port</label>
              <input
                id="port"
                type="text"
                value={credentials.port}
                onChange={(e) => setCredentials({ ...credentials, port: e.target.value })}
                className="form-input"
                placeholder="5432"
              />
            </div>

            <div>
              <label htmlFor="database" className="form-label">
                Database Name <span className="text-destructive">*</span>
              </label>
              <input
                id="database"
                type="text"
                value={credentials.database}
                onChange={(e) => setCredentials({ ...credentials, database: e.target.value })}
                className="form-input"
                placeholder="my_database"
              />
            </div>

            <div>
              <label htmlFor="username" className="form-label">
                Username <span className="text-destructive">*</span>
              </label>
              <input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="form-input"
                placeholder="db_user"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="form-input pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button type="submit" disabled={isSaving} className="gap-2">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Credentials
                </>
              )}
            </Button>
          </div>
        </form>

        <p className="text-sm text-muted-foreground mt-4">
          Your credentials are encrypted and stored securely. They will be used to connect to your database for processing operations.
        </p>
      </div>
    </div>
  );
}

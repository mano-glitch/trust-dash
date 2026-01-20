import { useState, FormEvent } from 'react';
import { User, Lock, Save, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function UserSettings() {
  const { user } = useAuth();
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleProfileSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
    setIsSavingProfile(false);
  };

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    if (passwords.new.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    
    if (passwords.new !== passwords.confirm) {
      setPasswordError('Passwords do not match');
      return;
    }

    setIsSavingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPasswordSuccess(true);
    setPasswords({ current: '', new: '', confirm: '' });
    setTimeout(() => setPasswordSuccess(false), 3000);
    setIsSavingPassword(false);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile and security settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <form onSubmit={handleProfileSave} className="stat-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
          </div>

          {profileSuccess && (
            <div className="mb-6 p-3 rounded-lg bg-success/10 border border-success/20 flex items-center gap-2 animate-fade-in">
              <CheckCircle className="h-4 w-4 text-success" />
              <p className="text-sm text-success">Profile updated successfully!</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="form-input"
              />
            </div>

            <Button type="submit" disabled={isSavingProfile} className="gap-2">
              {isSavingProfile ? (
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
        </form>

        {/* Password Change */}
        <form onSubmit={handlePasswordChange} className="stat-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Change Password</h2>
          </div>

          {passwordSuccess && (
            <div className="mb-6 p-3 rounded-lg bg-success/10 border border-success/20 flex items-center gap-2 animate-fade-in">
              <CheckCircle className="h-4 w-4 text-success" />
              <p className="text-sm text-success">Password changed successfully!</p>
            </div>
          )}

          {passwordError && (
            <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 animate-fade-in">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive">{passwordError}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="current-password" className="form-label">Current Password</label>
              <div className="relative">
                <input
                  id="current-password"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  className="form-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="new-password" className="form-label">New Password</label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  className="form-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label htmlFor="confirm-password" className="form-label">Confirm New Password</label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  className="form-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={isSavingPassword} className="gap-2">
              {isSavingPassword ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Change Password
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

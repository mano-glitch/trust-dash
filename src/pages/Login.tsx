import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Loader2, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated, user } = useAuth();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation state
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Caps lock detection
  const [capsLockOn, setCapsLockOn] = useState(false);
  
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.role === 'admin' ? '/admin' : '/user';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Validate email on blur
  const validateEmail = (value: string) => {
    if (!value.trim()) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validate password on blur
  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    const result = await login(email, password);
    
    if (result.success) {
      setShowSuccess(true);
      // Redirect is handled by useEffect
    } else {
      setFormError(result.error || 'An error occurred. Please try again.');
    }
  };

  // Handle caps lock detection
  const handleKeyDown = (e: React.KeyboardEvent) => {
    setCapsLockOn(e.getModifierState('CapsLock'));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary mb-4">
            <span className="text-primary-foreground font-bold text-2xl">E</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">EnterpriseSaaS</h1>
          <p className="text-muted-foreground mt-2">
            Secure enterprise management platform
          </p>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="trust-badge">
            <Shield className="h-4 w-4" />
            <span>Secure Login</span>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 rounded-lg bg-success/10 border border-success/20 flex items-center gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5 text-success-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-success">Login successful!</p>
              <p className="text-xs text-muted-foreground">Redirecting to dashboard...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {formError && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3 animate-fade-in">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{formError}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(email)}
              className={cn(
                'form-input',
                emailError && 'border-destructive focus:border-destructive focus:ring-destructive/20'
              )}
              placeholder="Enter your email"
              autoComplete="email"
              aria-describedby={emailError ? 'email-error' : undefined}
              aria-invalid={!!emailError}
              disabled={isLoading}
            />
            {emailError && (
              <p id="email-error" className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                {emailError}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) validatePassword(e.target.value);
                }}
                onBlur={() => validatePassword(password)}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyDown}
                className={cn(
                  'form-input pr-12',
                  passwordError && 'border-destructive focus:border-destructive focus:ring-destructive/20'
                )}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-describedby={passwordError ? 'password-error' : 'password-hint'}
                aria-invalid={!!passwordError}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {passwordError ? (
              <p id="password-error" className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                {passwordError}
              </p>
            ) : (
              <p id="password-hint" className="mt-1.5 text-xs text-muted-foreground">
                Minimum 6 characters required
              </p>
            )}
            {capsLockOn && (
              <p className="mt-1.5 text-sm text-warning flex items-center gap-1.5 animate-fade-in">
                <AlertCircle className="h-3.5 w-3.5" />
                Caps Lock is on
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                disabled={isLoading}
              />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-primary hover:underline focus:outline-none focus:underline"
              tabIndex={0}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || showSuccess}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : showSuccess ? (
              <>
                <Check className="h-5 w-5" />
                <span>Success</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p><span className="font-medium">Admin:</span> admin@test.com / admin123</p>
            <p><span className="font-medium">User:</span> user@test.com / user123</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            © 2026 EnterpriseSaaS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

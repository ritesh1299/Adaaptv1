import React, { useState } from 'react';
import { AdaaptLogo } from '../AdaabtLogo';

interface LoginScreenProps {
  onLogin: () => void;
  inviteToken?: string | null;
}

export function LoginScreen({ onLogin, inviteToken }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  const isInviteFlow = inviteToken && inviteToken.length > 10;

  return (
    <div className="root-background flex items-center justify-center px-6 py-8">
      <div className="container-auth">
        
        {/* Logo above card height 64; space to card top 24 */}
        <div className="mb-6">
          <AdaaptLogo size="lg" />
        </div>

        {/* AUTH CARD - Glass/Liquid/Strong panel, width 560, padding 32, radius 24 */}
        <div className="auth-card">
          
          {/* H2 20/600 */}
          <div className="text-center mb-8">
            <h1 className="text-h2 mb-2">
              {isInviteFlow ? 'Join Acme Analytics' : 'Welcome back'}
            </h1>
            <p className="text-meta text-muted">
              {isInviteFlow 
                ? 'Complete your account setup to get started' 
                : 'Sign in to your account to continue'
              }
            </p>
          </div>

          {showCode ? (
            /* Code Login Form */
            <form onSubmit={handleCodeSubmit} className="space-y-6">
              <div>
                <label htmlFor="code" className="text-label block mb-2">
                  Enter verification code
                </label>
                <input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  className="auth-input w-full"
                  required
                />
                <p className="text-meta text-muted mt-2">
                  Check your email for the 6-digit code
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !code.trim()}
                className="auth-button-primary w-full"
              >
                {isLoading ? 'Verifying...' : 'Verify & Sign In'}
              </button>

              <button
                type="button"
                onClick={() => setShowCode(false)}
                className="auth-button-primary w-full"
                style={{ background: 'rgba(52, 48, 190, 0.1)', color: 'var(--text-strong)' }}
              >
                Back to password
              </button>
            </form>
          ) : (
            /* Main Login Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Input - 44h, radius 12, border rgba(16,17,20,.12) */}
              <div>
                <label htmlFor="email" className="text-label block mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="auth-input w-full"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="text-label block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="auth-input w-full pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-meta text-muted hover:text-body"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* "Remember me" left; "Forgot password?" right */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-brand-accent border-gray-300 rounded focus:ring-brand-soft mr-2"
                  />
                  <span className="text-meta">Remember me</span>
                </label>
                
                <button
                  type="button"
                  onClick={() => setShowCode(true)}
                  className="text-meta text-brand-accent hover:text-brand-hover"
                >
                  Forgot password?
                </button>
              </div>

              {/* Primary button: 44h, radius 999, gradient, hover glow */}
              <button
                type="submit"
                disabled={isLoading || !email.trim() || !password.trim()}
                className="auth-button-primary w-full"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* SSO Button (optional) - full-width above providers */}
          {!showCode && (
            <div className="mt-6">
              <button
                type="button"
                onClick={onLogin}
                className="auth-button-primary w-full"
                style={{ background: 'rgba(52, 48, 190, 0.1)', color: 'var(--text-strong)' }}
              >
                Continue with SSO (SAML/Okta/Azure AD)
              </button>
            </div>
          )}

          {/* Divider row: "Or continue with" centered, hairline left/right */}
          {!showCode && (
            <div className="auth-divider">
              <span className="auth-divider-text">Or continue with</span>
            </div>
          )}

          {/* PROVIDER ROW - real providers: Google, Microsoft, Apple - 40×40 */}
          {!showCode && (
            <div className="flex justify-center space-x-4">
              {/* Google */}
              <button
                type="button"
                onClick={onLogin}
                className="provider-button"
                title="Continue with Google"
                aria-label="Continue with Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>

              {/* Microsoft */}
              <button
                type="button"
                onClick={onLogin}
                className="provider-button"
                title="Continue with Microsoft"
                aria-label="Continue with Microsoft"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#f25022" d="M1 1h10v10H1z"/>
                  <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                  <path fill="#7fba00" d="M1 13h10v10H1z"/>
                  <path fill="#ffb900" d="M13 13h10v10H13z"/>
                </svg>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={onLogin}
                className="provider-button"
                title="Continue with Apple"
                aria-label="Continue with Apple"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </button>
            </div>
          )}

          {/* LEGAL - 12px center: Terms • Privacy. Below: "Don't have an account? Sign up" */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted leading-relaxed">
              By signing in, you agree to our{' '}
              <a href="#" className="text-brand-accent hover:text-brand-hover">Terms of Service</a>{' '}
              •{' '}
              <a href="#" className="text-brand-accent hover:text-brand-hover">Privacy Policy</a>
            </p>
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-meta text-muted">
              Don't have an account?{' '}
              <button 
                className="text-brand-accent hover:text-brand-hover font-medium"
                onClick={() => {
                  const event = new CustomEvent('show-toast', { 
                    detail: { type: 'info', message: 'Sign up functionality coming soon!' } 
                  });
                  window.dispatchEvent(event);
                }}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
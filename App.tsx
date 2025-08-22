import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './components/DashboardLayout';
import { Dashboard } from './components/screens/Dashboard';
import { LoginScreen } from './components/screens/LoginScreen';
import { QuickStartScreen } from './components/screens/QuickStartScreen';
import { DatasetSelectScreen } from './components/screens/DatasetSelectScreen';
import { HomeAskAIScreen } from './components/screens/HomeAskAIScreen';
import { ResultsStoryboardScreen } from './components/screens/ResultsStoryboardScreen';
import { ShareExportModal } from './components/modals/ShareExportModal';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

// Onboarding Flow Types
type OnboardingStep = 'auth' | 'quickstart' | 'dataset-select' | 'home-ask-ai' | 'results-storyboard' | 'complete';
type Screen = 'dashboard' | 'discover' | 'insights' | 'data-sources' | 'alerts' | 'data-management' | 'settings';

// PROTOTYPE VARIABLES - EXACT SPECS
interface PrototypeVariables {
  current_dataset: string;
  query_text: string;
  selected_user: string;
  is_admin: boolean;
}

// Loading Component with Liquid Glass Effect
const LiquidGlassLoader = ({ message = 'Loading...' }: { message?: string }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
    
    {/* Loading Panel */}
    <div className="relative">
      <div className="glass-panel-strong p-8 flex flex-col items-center gap-6 min-w-80">
        {/* Animated Loading Ring */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-brand-soft/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-accent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-brand-soft animate-spin animate-reverse" style={{ animationDuration: '1.5s' }}></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center">
          <h3 className="text-h3 mb-2">{message}</h3>
          <p className="text-meta text-muted">Please wait a moment...</p>
        </div>
        
        {/* Ambient Dots */}
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced Screen Transition Wrapper
const ScreenTransition = ({ 
  children, 
  isVisible, 
  direction = 'right' 
}: { 
  children: React.ReactNode; 
  isVisible: boolean; 
  direction?: 'left' | 'right' | 'up' | 'down';
}) => {
  const getTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-100%)';
      case 'right': return 'translateX(100%)';
      case 'up': return 'translateY(-100%)';
      case 'down': return 'translateY(100%)';
      default: return 'translateX(100%)';
    }
  };

  return (
    <div 
      className={`transition-all duration-500 ease-in-out ${
        isVisible 
          ? 'opacity-100 transform translate-x-0 translate-y-0' 
          : 'opacity-0 transform'
      }`}
      style={{
        transform: isVisible ? 'translate(0, 0)' : getTransform()
      }}
    >
      {children}
    </div>
  );
};

// Floating Ambient Particles
const AmbientParticles = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-brand-soft/20 rounded-full animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${15 + Math.random() * 10}s`
        }}
      />
    ))}
    
    {[...Array(6)].map((_, i) => (
      <div
        key={`large-${i}`}
        className="absolute w-2 h-2 bg-brand-soft/10 rounded-full animate-float-slow"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 15}s`,
          animationDuration: `${20 + Math.random() * 10}s`
        }}
      />
    ))}
  </div>
);

// Enhanced CSS for animations
const ambientStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
    25% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
    50% { transform: translateY(-10px) scale(0.9); opacity: 0.8; }
    75% { transform: translateY(-30px) scale(1.05); opacity: 0.4; }
  }
  
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
    33% { transform: translateY(-40px) translateX(10px) scale(1.2); opacity: 0.5; }
    66% { transform: translateY(-20px) translateX(-10px) scale(0.8); opacity: 0.7; }
  }
  
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(52, 48, 190, 0.3); }
    50% { box-shadow: 0 0 40px rgba(52, 48, 190, 0.5), 0 0 60px rgba(52, 48, 190, 0.2); }
  }
  
  .animate-float {
    animation: float 15s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: float-slow 25s ease-in-out infinite;
  }
  
  .animate-glow {
    animation: glow-pulse 3s ease-in-out infinite;
  }
  
  .animate-reverse {
    animation-direction: reverse;
  }

  .glass-panel-strong {
    position: relative;
    background: var(--glass-strong-fill);
    backdrop-filter: blur(var(--glass-strong-blur)) saturate(1.2);
    -webkit-backdrop-filter: blur(var(--glass-strong-blur)) saturate(1.2);
    border-radius: var(--glass-strong-radius-panel);
    border: 1px solid var(--glass-strong-stroke);
    box-shadow: 
      var(--glass-strong-inner-highlight),
      var(--glass-strong-inner-well),
      var(--glass-strong-shadow);
    transition: all var(--motion-normal) var(--motion-ease);
  }

  .glass-panel-strong::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: var(--liquid-texture);
    background-blend-mode: overlay;
    border-radius: var(--glass-strong-radius-panel);
    pointer-events: none;
    opacity: 0.8;
  }
`;

export default function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  
  // Onboarding flow state
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('auth');
  const [previousStep, setPreviousStep] = useState<OnboardingStep>('auth');
  
  // Loading and transition states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');
  
  // PROTOTYPE VARIABLES - NORMALIZED SYSTEM
  const [prototypeVars, setPrototypeVars] = useState<PrototypeVariables>({
    current_dataset: '',
    query_text: '',
    selected_user: '',
    is_admin: true
  });

  // Regular app state
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [currentScope, setCurrentScope] = useState('Sales');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [inviteToken, setInviteToken] = useState<string | null>(null);

  // Inject ambient styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = ambientStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Check for invite token in URL on mount and setup toast listener
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('invite');
    if (token) {
      setInviteToken(token);
      const isValidInvite = token.length > 10;
      if (!isValidInvite) {
        console.log('Invalid or expired invite token');
      }
    }

    // Setup custom toast event listener
    const handleToastEvent = (event: any) => {
      const { type, message } = event.detail;
      if (type === 'success') {
        toast.success(message);
      } else if (type === 'error') {
        toast.error(message);
      } else {
        toast.info(message);
      }
    };

    window.addEventListener('show-toast', handleToastEvent);
    
    return () => {
      window.removeEventListener('show-toast', handleToastEvent);
    };
  }, []);

  // Enhanced step transition with loading
  const transitionToStep = (newStep: OnboardingStep, direction: 'left' | 'right' = 'right', message = 'Loading...') => {
    setIsLoading(true);
    setLoadingMessage(message);
    setTransitionDirection(direction);
    
    setTimeout(() => {
      setPreviousStep(onboardingStep);
      setOnboardingStep(newStep);
      setIsLoading(false);
    }, 800);
  };

  // Handle login and determine flow
  const handleLogin = () => {
    setIsLoading(true);
    setLoadingMessage('Signing you in...');
    
    setTimeout(() => {
      setIsAuthenticated(true);
      
      // Simulate audit logging
      const auditEvent = {
        event: inviteToken ? 'invite_accept' : 'auth_login_success',
        user: 'john.doe@company.com',
        workspace: inviteToken ? 'Acme Analytics' : 'Default',
        timestamp: new Date().toISOString(),
        ip: '192.168.1.1'
      };
      
      console.log('Audit Event:', auditEvent);
      
      if (inviteToken) {
        toast.success('Welcome to Acme Analytics! You\'ve successfully joined the workspace.');
      } else {
        toast.success('Welcome back to adaapt!');
      }
      
      // Clear invite token from URL
      if (inviteToken) {
        window.history.replaceState({}, '', window.location.pathname);
        setInviteToken(null);
      }

      // Determine next step based on admin status and first login
      if (prototypeVars.is_admin && isFirstLogin) {
        transitionToStep('quickstart', 'right', 'Setting up your workspace...');
      } else {
        transitionToStep('complete', 'right', 'Loading dashboard...');
      }
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setLoadingMessage('Signing you out...');
    
    setTimeout(() => {
      setIsAuthenticated(false);
      setOnboardingStep('auth');
      setIsFirstLogin(true);
      setPrototypeVars({
        current_dataset: '',
        query_text: '',
        selected_user: '',
        is_admin: true
      });
      setCurrentScreen('dashboard');
      setIsLoading(false);
      toast.success('You\'ve been signed out successfully.');
    }, 1000);
  };

  // Enhanced onboarding navigation handlers
  const handleQuickStartComplete = (choice: string, dataset?: string) => {
    if (choice === 'sample' && dataset) {
      setPrototypeVars(prev => ({
        ...prev,
        current_dataset: dataset
      }));
    }
    
    if (choice === 'skip') {
      transitionToStep('home-ask-ai', 'right', 'Preparing your workspace...');
    } else {
      transitionToStep('dataset-select', 'right', 'Loading datasets...');
    }
  };

  const handleDatasetSelectComplete = (dataset: string, user?: string) => {
    setPrototypeVars(prev => ({
      ...prev,
      current_dataset: dataset,
      selected_user: user || prev.selected_user
    }));
    transitionToStep('home-ask-ai', 'right', 'Setting up Ask AI...');
  };

  const handleDatasetSelectSkip = () => {
    setPrototypeVars(prev => ({
      ...prev,
      current_dataset: prev.current_dataset || 'Sales — Sample'
    }));
    transitionToStep('home-ask-ai', 'right', 'Preparing workspace...');
  };

  // Enhanced query handling with Smart Animate
  const handleAskAIQuery = (query: string) => {
    setPrototypeVars(prev => ({
      ...prev,
      query_text: query
    }));
    
    if (query.trim()) {
      setIsLoading(true);
      setLoadingMessage('Analyzing your query...');
      
      // Smart Animate 180ms + enhanced loading
      setTimeout(() => {
        transitionToStep('results-storyboard', 'right', 'Generating insights...');
      }, 180);
    } else {
      toast.error('Pick a suggested prompt or type a question.');
    }
  };

  const handleBackToHome = () => {
    transitionToStep('home-ask-ai', 'left', 'Returning to Ask AI...');
  };

  const handleCompleteOnboarding = () => {
    transitionToStep('complete', 'right', 'Finalizing setup...');
    setIsFirstLogin(false);
    
    setTimeout(() => {
      toast.success('Welcome to adaapt! Your workspace is ready.');
    }, 1000);
  };

  // Regular app navigation
  const screenMap: Record<string, Screen> = {
    'ask-ai': 'dashboard',
    'discover': 'discover',
    'insights': 'insights',
    'data-sources': 'data-sources',
    'alerts': 'alerts',
    'data-management': 'data-management',
    'settings': 'settings'
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  const handleNavItemClick = (navItem: string) => {
    const screen = screenMap[navItem] || 'dashboard';
    setCurrentScreen(screen);
    toast.success(`Navigated to ${navItem.replace('-', ' ')}`);
  };

  const handleScopeChange = (scope: string) => {
    setCurrentScope(scope);
    toast.success(`Switched to ${scope} scope`);
  };

  // Enhanced onboarding screen renderer with transitions
  if (!isAuthenticated || onboardingStep !== 'complete') {
    const renderOnboardingStep = () => {
      const stepIndex = ['auth', 'quickstart', 'dataset-select', 'home-ask-ai', 'results-storyboard'].indexOf(onboardingStep);
      const previousIndex = ['auth', 'quickstart', 'dataset-select', 'home-ask-ai', 'results-storyboard'].indexOf(previousStep);
      const direction = stepIndex > previousIndex ? 'right' : 'left';

      switch (onboardingStep) {
        case 'auth':
          return (
            <ScreenTransition isVisible={!isLoading} direction={direction}>
              <LoginScreen onLogin={handleLogin} inviteToken={inviteToken} />
            </ScreenTransition>
          );
        case 'quickstart':
          return (
            <ScreenTransition isVisible={!isLoading} direction={direction}>
              <QuickStartScreen 
                onComplete={handleQuickStartComplete}
                onSkip={() => transitionToStep('dataset-select', 'right', 'Loading datasets...')}
              />
            </ScreenTransition>
          );
        case 'dataset-select':
          return (
            <ScreenTransition isVisible={!isLoading} direction={direction}>
              <DatasetSelectScreen 
                preselectedDataset={prototypeVars.current_dataset}
                onComplete={handleDatasetSelectComplete}
                onSkip={handleDatasetSelectSkip}
              />
            </ScreenTransition>
          );
        case 'home-ask-ai':
          return (
            <ScreenTransition isVisible={!isLoading} direction={direction}>
              <HomeAskAIScreen 
                currentDataset={prototypeVars.current_dataset}
                queryText={prototypeVars.query_text}
                onQueryTextChange={(text) => setPrototypeVars(prev => ({ ...prev, query_text: text }))}
                onQuerySubmit={handleAskAIQuery}
                onComplete={handleCompleteOnboarding}
              />
            </ScreenTransition>
          );
        case 'results-storyboard':
          return (
            <ScreenTransition isVisible={!isLoading} direction={direction}>
              <ResultsStoryboardScreen 
                query={prototypeVars.query_text}
                dataset={prototypeVars.current_dataset}
                onBackToHome={handleBackToHome}
                onComplete={handleCompleteOnboarding}
              />
            </ScreenTransition>
          );
        default:
          return (
            <ScreenTransition isVisible={!isLoading} direction="right">
              <LoginScreen onLogin={handleLogin} inviteToken={inviteToken} />
            </ScreenTransition>
          );
      }
    };

    return (
      <div className="root-background relative">
        {/* Ambient Particles */}
        <AmbientParticles />
        
        {/* Main Content */}
        <div className="relative z-10">
          {renderOnboardingStep()}
        </div>
        
        {/* Loading Overlay */}
        {isLoading && <LiquidGlassLoader message={loadingMessage} />}
        
        {/* Enhanced Toaster */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--glass-strong-fill)',
              color: 'var(--text-strong)',
              border: '1px solid var(--glass-strong-stroke)',
              backdropFilter: 'blur(40px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
              borderRadius: '16px',
              boxShadow: 'var(--glass-strong-shadow)',
              padding: '16px 20px',
              fontSize: 'var(--font-meta-size)',
            },
          }}
        />
      </div>
    );
  }

  // Enhanced main application with ambient effects
  return (
    <div className="root-background relative">
      {/* Ambient Particles for main app */}
      <AmbientParticles />
      
      {/* Main Application */}
      <div className="relative z-10">
        <DashboardLayout
          activeNavItem={Object.keys(screenMap).find(key => screenMap[key] === currentScreen) || 'ask-ai'}
          currentScope={currentScope}
          isAdmin={prototypeVars.is_admin}
        >
          <div className="h-full relative">
            <ScreenTransition isVisible={!isLoading} direction="right">
              {renderScreen()}
            </ScreenTransition>
          </div>
        </DashboardLayout>
      </div>
      
      {/* Enhanced Modals with Liquid Glass */}
      <ShareExportModal
        open={shareModalOpen}
        onOpenChange={setShareModalOpen}
        title="Q4 Sales Analysis"
        type="share"
      />
      
      <ShareExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        title="Q4 Sales Analysis"
        type="export"
      />
      
      {/* Loading Overlay for main app */}
      {isLoading && <LiquidGlassLoader message={loadingMessage} />}
      
      {/* Enhanced Toaster for main app */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--glass-strong-fill)',
            color: 'var(--text-strong)',
            border: '1px solid var(--glass-strong-stroke)',
            backdropFilter: 'blur(40px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
            borderRadius: '16px',
            boxShadow: 'var(--glass-strong-shadow)',
            padding: '16px 20px',
            fontSize: 'var(--font-meta-size)',
          },
        }}
      />
    </div>
  );
}
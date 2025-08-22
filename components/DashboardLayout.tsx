import React, { useState } from 'react';
import { LeftNav } from './LeftNav';
import { TopBar } from './TopBar';
import { RightChatColumn } from './RightChatColumn';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeNavItem?: string;
  currentScope?: string;
  isAdmin?: boolean;
}

export function DashboardLayout({ 
  children, 
  activeNavItem = 'ask-ai',
  currentScope = 'Sales',
  isAdmin = false
}: DashboardLayoutProps) {
  const [rightColumnOpen, setRightColumnOpen] = useState(true);

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: 'var(--background)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Main Layout Grid */}
      <div className="grid grid-cols-12 min-h-screen relative">
        {/* Left Navigation */}
        <div className="col-span-2 relative">
          <div className="fixed top-0 left-0 h-full sidebar-glass z-30">
            <div className="w-72 h-full">
              <LeftNav 
                activeItem={activeNavItem}
                isAdmin={isAdmin}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`${rightColumnOpen ? 'col-span-7' : 'col-span-10'} flex flex-col transition-smooth`}>
          {/* Top Bar */}
          <div className="relative z-20">
            <div 
              className="glass-dialog sticky top-0"
              style={{ 
                height: 'var(--topbar-height)',
                borderBottom: '1px solid var(--glass-border-subtle)'
              }}
            >
              <TopBar 
                currentScope={currentScope}
                onToggleRightColumn={() => setRightColumnOpen(!rightColumnOpen)}
                rightColumnOpen={rightColumnOpen}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 relative">
            <div className="h-full p-8">
              <div className="max-w-none">
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* Right Chat Column */}
        {rightColumnOpen && (
          <div className="col-span-3 relative">
            <div className="fixed top-0 right-0 h-full z-20">
              <div 
                className="w-96 h-full sidebar-glass border-l"
                style={{ borderLeftColor: 'var(--glass-border-subtle)' }}
              >
                <RightChatColumn />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          className="w-16 h-16 rounded-full btn-primary-sharp shadow-xl flex items-center justify-center focus-visible:focus-visible"
          onClick={() => {
            console.log('Floating action clicked');
          }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
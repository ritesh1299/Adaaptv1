import React, { useState } from 'react';
import { AdaaptLogo } from '../AdaabtLogo';

interface QuickStartScreenProps {
  onComplete: (choice: string, dataset?: string) => void;
  onSkip: () => void;
}

export function QuickStartScreen({ onComplete, onSkip }: QuickStartScreenProps) {
  const [showConnectors, setShowConnectors] = useState(false);
  const [showInviteOverlay, setShowInviteOverlay] = useState(false);
  const [inviteEmails, setInviteEmails] = useState('');
  const [selectedRole, setSelectedRole] = useState('Viewer');

  // D3) Three option tiles using Solid tiles; minimal copy
  const quickStartOptions = [
    {
      id: 'sample',
      title: 'Start with sample',
      description: 'Explore with sample sales data',
      icon: '📊',
      dataset: 'Sales — Sample'
    },
    {
      id: 'connect',
      title: 'Connect source',
      description: 'Connect your data warehouse',
      icon: '🔗'
    },
    {
      id: 'invite',
      title: 'Invite teammates',
      description: 'Share access with your team',
      icon: '👥'
    }
  ];

  // Connector options for overlay
  const connectors = [
    { name: 'Snowflake', icon: '❄️', status: 'Available' },
    { name: 'BigQuery', icon: '🔍', status: 'Available' },
    { name: 'Postgres', icon: '🐘', status: 'Available' },
    { name: 'MySQL', icon: '🗄️', status: 'Available' },
    { name: 'MongoDB', icon: '🍃', status: 'Coming soon' },
    { name: 'Redshift', icon: '🚀', status: 'Coming soon' }
  ];

  const roles = ['Admin', 'Analyst', 'Viewer'];

  const handleOptionClick = (option: any) => {
    if (option.id === 'sample') {
      onComplete('sample', option.dataset);
    } else if (option.id === 'connect') {
      setShowConnectors(true);
    } else if (option.id === 'invite') {
      setShowInviteOverlay(true);
    }
  };

  const handleConnectorSelect = (connector: any) => {
    if (connector.status === 'Available') {
      const event = new CustomEvent('show-toast', { 
        detail: { type: 'info', message: `${connector.name} connection setup will be available soon!` } 
      });
      window.dispatchEvent(event);
      setShowConnectors(false);
      onComplete('connect');
    }
  };

  const handleInviteSubmit = () => {
    const emailCount = inviteEmails.split('\n').filter(email => email.trim()).length;
    if (emailCount > 0) {
      const event = new CustomEvent('show-toast', { 
        detail: { type: 'success', message: `Invitations sent to ${emailCount} teammate(s)!` } 
      });
      window.dispatchEvent(event);
      setShowInviteOverlay(false);
      onComplete('invite');
    }
  };

  return (
    <div className="root-background min-h-screen px-6 py-8">
      <div className="container-quickstart relative z-20">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="logo-48 flex items-center justify-center">
            <AdaaptLogo size="lg" />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-12">
          <h1 className="text-h1 mb-4">Let's get started</h1>
          <p className="text-body text-muted max-w-lg mx-auto">
            Choose how you'd like to begin exploring your data with adaapt.
          </p>
        </div>

        {/* Three Option Tiles - D3) using Solid tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-tile max-w-4xl mx-auto mb-12">
          {quickStartOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="tile-solid p-8 text-center cursor-pointer"
            >
              <div className="text-4xl mb-4">{option.icon}</div>
              <h3 className="text-h3 mb-2">{option.title}</h3>
              <p className="text-meta text-muted">{option.description}</p>
              {option.dataset && (
                <div className="mt-4">
                  <span className="chip-pill">{option.dataset}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Skip Button */}
        <div className="text-center">
          <button 
            onClick={onSkip}
            className="button-outline"
          >
            Skip setup for now
          </button>
        </div>
      </div>

      {/* "Connect source" opens grid overlay (connectors) */}
      {showConnectors && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="glass-panel-strong p-8 w-full max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-h2 mb-2">Connect your data source</h2>
              <p className="text-meta text-muted">
                Choose from our supported connectors
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {connectors.map((connector, index) => (
                <button
                  key={index}
                  onClick={() => handleConnectorSelect(connector)}
                  className={`tile-solid p-6 text-center transition-all ${
                    connector.status === 'Coming soon' 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'cursor-pointer hover:shadow-lg'
                  }`}
                  disabled={connector.status === 'Coming soon'}
                >
                  <div className="text-3xl mb-3">{connector.icon}</div>
                  <h4 className="text-h3 mb-1">{connector.name}</h4>
                  <p className={`text-xs ${
                    connector.status === 'Available' 
                      ? 'text-green-600' 
                      : 'text-muted'
                  }`}>
                    {connector.status}
                  </p>
                </button>
              ))}
            </div>

            <div className="text-center">
              <button 
                onClick={() => setShowConnectors(false)}
                className="button-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* "Invite teammates" overlay with email list + role */}
      {showInviteOverlay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="glass-panel-strong p-8 w-full max-w-lg">
            <div className="text-center mb-8">
              <h2 className="text-h2 mb-2">Invite teammates</h2>
              <p className="text-meta text-muted">
                Add team members to your workspace
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="emails" className="text-label block mb-2">
                  Email addresses (one per line)
                </label>
                <textarea
                  id="emails"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  placeholder="jane@company.com&#10;sam@company.com&#10;priya@company.com"
                  className="input-standard w-full h-32 p-3 text-body resize-none"
                  style={{ height: '120px' }}
                />
              </div>

              <div>
                <label htmlFor="role" className="text-label block mb-2">
                  Default role
                </label>
                <select
                  id="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="input-standard w-full text-body"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-meta">
                  💡 Invited members will receive setup instructions by email
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setShowInviteOverlay(false)}
                className="button-outline flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={handleInviteSubmit}
                disabled={!inviteEmails.trim()}
                className="button-primary flex-1"
              >
                Send invites
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
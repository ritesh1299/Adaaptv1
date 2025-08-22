import React, { useEffect, useRef } from 'react';
import { AdaaptLogo } from '../AdaabtLogo';

interface HomeAskAIScreenProps {
  currentDataset: string;
  queryText: string;
  onQueryTextChange: (text: string) => void;
  onQuerySubmit: (query: string) => void;
  onComplete: () => void;
}

export function HomeAskAIScreen({ 
  currentDataset, 
  queryText, 
  onQueryTextChange, 
  onQuerySubmit, 
  onComplete 
}: HomeAskAIScreenProps) {
  const askInputRef = useRef<HTMLInputElement>(null);

  // Keep your 6 prompts - EXACT SPECS
  const suggestedPrompts = [
    "How does the number of transactions this month compare to last month?",
    "What is the average transaction value this year?", 
    "What are the peak sales hours during weekdays?",
    "What are the top 5 products sold this month?",
    "Which sales region has shown the highest growth compared to last month?",
    "Which payment methods are used most frequently?"
  ];

  // INTERACTIONS - For each tile FRAME: On Click → Set variable query_text → Focus AskBar
  const handlePromptClick = (prompt: string) => {
    onQueryTextChange(prompt);
    // Focus AskBar text layer (or Scroll To AskBar)
    setTimeout(() => {
      if (askInputRef.current) {
        askInputRef.current.focus();
      }
    }, 100);
  };

  const handleSubmit = () => {
    if (queryText.trim()) {
      onQuerySubmit(queryText.trim());
    } else {
      // Tooltip "Pick a suggested prompt or type a question"
      const event = new CustomEvent('show-toast', { 
        detail: { type: 'error', message: 'Pick a suggested prompt or type a question.' } 
      });
      window.dispatchEvent(event);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Keyboard shortcuts 1–6 insert the 6 tile texts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 6 && suggestedPrompts[num - 1]) {
        e.preventDefault();
        handlePromptClick(suggestedPrompts[num - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Top bar solid (not glass), 64h; keep Global search and Scope pills; calm shadow
  const renderTopBar = () => (
    <div className="topbar-solid">
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center gap-4">
          <button className="text-lg hover:text-gray-700 transition-colors">☰</button>
          <span className="text-meta font-medium">Workspace</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="chip-soft px-3 py-1">
            <span className="text-meta text-sm">Global search ⌘K</span>
          </div>
          
          <div className="chip-soft px-3 py-1">
            <span className="text-meta text-sm font-medium">
              Scope: {currentDataset || 'Sales'}
            </span>
          </div>
          
          <button className="text-lg hover:text-gray-700 transition-colors">🔔</button>
          
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: 'var(--brand-accent)' }}
          >
            JD
          </div>
        </div>
      </div>
    </div>
  );

  // Sidebar width 248; item height 40; icons 20; selected item gets brand pill bg @12% + text strong
  const renderLeftNav = () => (
    <div className="nav-sidebar flex flex-col">
      <div className="p-6">
        <AdaaptLogo size="md" />
      </div>
      
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {[
            { name: 'Ask AI', icon: '🤖', active: true },
            { name: 'Discover', icon: '🔍' },
            { name: 'Insights', icon: '💡' },
            { name: 'Data sources', icon: '🔗' },
            { name: 'Alerts', icon: '🔔' },
            { name: 'Settings', icon: '⚙️' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`nav-item ${item.active ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="text-meta font-medium">{item.name}</span>
              {item.name === 'Ask AI' && <span className="text-xs text-muted ml-auto">(Home)</span>}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );

  return (
    <div className="root-background min-h-screen flex flex-col">
      {/* Top Bar */}
      {renderTopBar()}
      
      <div className="flex flex-1">
        {/* Left Navigation */}
        {renderLeftNav()}
        
        {/* Main Content - Content max width: 1120; center aligned */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="container-home">
            
            {/* STRUCTURE (hero) - H1: "What would you like to analyse today?" (36/600) */}
            <div className="text-center mb-12">
              <h1 className="text-h1-clean mb-12">What would you like to analyse today?</h1>
              
              {/* AskBar - separate frame, its own capsule, Glass/Liquid/Strong */}
              {/* Frame name: AskBar, Size: width 920 (fluid to 100%), height 64 */}
              <div className="askbar-capsule mx-auto mb-6">
                {/* Auto-layout horizontal, gap 12, padding 14×20 */}
                {/* Children (left→right): Search icon, Text layer, Divider, Dataset pill, Arrow button */}
                
                {/* 1) Search icon (24) @ text/muted */}
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                
                {/* 2) Text layer bound to variable query_text; placeholder "Ask a question about your data…", 16/400, color rgba(10,16,30,.72) */}
                <input
                  ref={askInputRef}
                  type="text"
                  value={queryText}
                  onChange={(e) => onQueryTextChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question about your data…"
                  className="askbar-input"
                />
                
                {/* 3) Divider 1px rgba(16,17,20,.10) */}
                <div className="askbar-divider"></div>
                
                {/* 4) Dataset pill (suffix inside the bar): "Dataset: {current_dataset or 'Sales — Sample'}", pill bg brand@12%, text 14; radius 999 */}
                <div className="askbar-dataset-pill">
                  Dataset: {currentDataset || 'Sales — Sample'}
                </div>
                
                {/* 5) Primary arrow button (40×40) with gradient #3430BE→#6A66FF; radius 999; hover glow */}
                <button
                  onClick={handleSubmit}
                  className="askbar-arrow"
                >
                  →
                </button>
              </div>
              
              {/* CHIPS ROW (separate frame BELOW AskBar) - Auto-layout horizontal; gap 12 */}
              {/* Soft chips: "Enter to run", "AI tips" — use Glass/Liquid/Soft, 28–32h, radius 999 */}
              {/* IMPORTANT: Chips are NOT inside AskBar. This prevents the long "sausage" glow */}
              <div className="chips-row mb-12">
                <div className="chip-soft">Enter to run</div>
                <div className="chip-soft">AI tips</div>
              </div>
            </div>

            {/* SUGGESTED PROMPTS GRID - 2×3 tiles, 24 gutters; each tile ~300×96, radius 12, SOLID surface */}
            <div className="space-y-6">
              <h3 className="text-h2 text-center">Suggested prompts</h3>
              
              {/* Each tile is a FRAME with non-zero Fill (white@2–4%) and Clip content = Off (to make the whole card clickable) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {suggestedPrompts.map((prompt, index) => (
                  <div
                    key={index}
                    className="prompt-tile-solid"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      {/* Left badge: ⚡ in a 32×32 rounded square (brand@16%) */}
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(52, 48, 190, 0.16)' }}
                      >
                        <span className="text-sm">⚡</span>
                      </div>
                      <p className="text-meta text-left flex-1">{prompt}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Keyboard hints */}
              <div className="text-center">
                <p className="text-xs text-muted">
                  Press 1-6 to quickly select a prompt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
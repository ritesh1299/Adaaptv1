import React, { useState } from 'react';

interface ResultsStoryboardScreenProps {
  query: string;
  dataset: string;
  onBackToHome: () => void;
  onComplete: () => void;
}

export function ResultsStoryboardScreen({ query, dataset, onBackToHome, onComplete }: ResultsStoryboardScreenProps) {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);
  const [isPredictiveExpanded, setIsPredictiveExpanded] = useState(false);

  // Keep existing data - EXACT SPECS
  const monthlyData = [54110, 59240];
  const dailyData = [1620,1775,1910,1860,2025,2105,1950,2010,1930,2060,2140,2080,1995,2210,2155,2050,2190,2260,2295,2240,2180,2310,2375,2430,2390,2465,2520,2480,2540,2595];

  const comparativeData = [
    { item: 'Electronics', units: '12.4k', revenue: '$1.2M', wow: '+5.2%', mom: '+12.1%', yoy: '+18.4%' },
    { item: 'Accessories', units: '8.7k', revenue: '$420k', wow: '+2.1%', mom: '+8.3%', yoy: '+15.2%' },
    { item: 'Home', units: '6.2k', revenue: '$890k', wow: '-1.2%', mom: '+4.7%', yoy: '+22.1%' },
    { item: 'Fashion', units: '9.1k', revenue: '$650k', wow: '+3.8%', mom: '+9.2%', yoy: '+11.8%' },
    { item: 'Sports', units: '5.9k', revenue: '$380k', wow: '+1.5%', mom: '+6.1%', yoy: '+8.9%' },
    { item: 'Beauty', units: '4.3k', revenue: '$290k', wow: '+4.2%', mom: '+11.3%', yoy: '+25.6%' }
  ];

  // Right Chat - 2×3 suggestion chips - EXACT SPECS
  const followUpSuggestions = [
    'Compare by region',
    'Add margin %',
    'Forecast next month',
    'See returns rate',
    'Top 5 by revenue',
    'Share as PDF'
  ];

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;
    
    setChatHistory(prev => [...prev, { type: 'user', message: chatInput.trim() }]);
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        message: `Based on your question "${chatInput.trim()}", I can help you dive deeper into the analysis.`
      }]);
    }, 1000);
    
    setChatInput('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setChatInput(suggestion);
  };

  return (
    <div className="root-background min-h-screen">
      
      {/* TOP BAR - Title on left, Meta group on right */}
      <div className="border-b border-gray-200/10 bg-white/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-[1120px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBackToHome}
                className="text-brand-accent hover:text-brand-hover font-medium text-sm"
              >
                ← Back to Home
              </button>
              <h1 className="text-xl font-semibold text-strong">{query}</h1>
            </div>
            
            {/* Meta group - compact 12px meta labels, align to baseline, 16px gaps */}
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted">Scope: {dataset || 'Sales'}</span>
              <span className="text-xs text-muted">Last refresh: Today 9:41 AM</span>
              <span className="text-xs text-muted">Version: v1.2</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100 border border-green-200">
                Diff +2.4%
              </span>
              <button className="text-xs text-brand-accent hover:text-brand-hover">Share</button>
              <button className="text-xs text-brand-accent hover:text-brand-hover">Export ▾</button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTAINER - 12-column grid, Left 8 cols, Right 4 cols */}
      <div className="max-w-[1120px] mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT CONTENT - span 8 cols */}
          <div className="col-span-8 space-y-6">
            
            {/* Keep "Back to Home" link with 24px margin below - already handled above */}

            {/* SECTION 1 — Charts - 2-up grid with ChartCard components */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Chart Card 1 - Transactions: This vs Last Month */}
              <div className="bg-white/98 border border-[rgba(16,17,20,0.10)] rounded-2xl shadow-[0_8px_24px_rgba(10,16,30,0.08)] hover:shadow-[0_8px_24px_rgba(10,16,30,0.12)] transition-shadow p-5">
                {/* Header row: icon (16), Title (16/600), meta chips */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 text-blue-600">📊</div>
                    <h3 className="text-base font-semibold text-strong">Transactions: This vs Last Month</h3>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-100">
                    MoM +9.5%
                  </span>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-[rgba(16,17,20,0.08)] mb-4"></div>
                
                {/* Chart area - 280-320h vector chart on light surface */}
                <div className="h-80 bg-white/96 rounded-lg p-4 mb-4">
                  <div className="h-full flex items-end justify-center gap-8">
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-16 rounded"
                        style={{ 
                          height: `${(monthlyData[0] / Math.max(...monthlyData)) * 200}px`,
                          backgroundColor: 'var(--brand-accent)'
                        }}
                      ></div>
                      <span className="text-xs text-muted mt-2">Last Month</span>
                      <span className="text-xs font-medium">{monthlyData[0].toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-16 rounded"
                        style={{ 
                          height: `${(monthlyData[1] / Math.max(...monthlyData)) * 200}px`,
                          backgroundColor: 'var(--adaapt-secondary)'
                        }}
                      ></div>
                      <span className="text-xs text-muted mt-2">This Month</span>
                      <span className="text-xs font-medium">{monthlyData[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Footer row */}
                <div className="flex justify-end gap-4 text-sm">
                  <button className="text-brand-accent hover:text-brand-hover">Save to dashboard</button>
                  <button className="text-brand-accent hover:text-brand-hover">View details →</button>
                </div>
              </div>

              {/* Chart Card 2 - Daily Transactions */}
              <div className="bg-white/98 border border-[rgba(16,17,20,0.10)] rounded-2xl shadow-[0_8px_24px_rgba(10,16,30,0.08)] hover:shadow-[0_8px_24px_rgba(10,16,30,0.12)] transition-shadow p-5">
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 text-green-600">📈</div>
                    <h3 className="text-base font-semibold text-strong">Daily Transactions (30 days)</h3>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
                    Trending up
                  </span>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-[rgba(16,17,20,0.08)] mb-4"></div>
                
                {/* Chart area */}
                <div className="h-80 bg-white/96 rounded-lg p-4 mb-4">
                  <svg viewBox="0 0 300 200" className="w-full h-full">
                    {/* Grid lines */}
                    {[40, 80, 120, 160].map(y => (
                      <line 
                        key={y} 
                        x1="20" 
                        y1={y} 
                        x2="280" 
                        y2={y} 
                        stroke="rgba(16,17,20,0.08)" 
                        strokeWidth="1"
                      />
                    ))}
                    
                    {/* Axes hairlines */}
                    <line x1="20" y1="20" x2="20" y2="180" stroke="rgba(16,17,20,0.18)" strokeWidth="1"/>
                    <line x1="20" y1="180" x2="280" y2="180" stroke="rgba(16,17,20,0.18)" strokeWidth="1"/>
                    
                    {/* Line chart - 2px stroke */}
                    <polyline
                      fill="none"
                      stroke="var(--brand-accent)"
                      strokeWidth="2"
                      points={dailyData.map((value, index) => 
                        `${20 + (index / (dailyData.length - 1)) * 260},${170 - ((value - Math.min(...dailyData)) / (Math.max(...dailyData) - Math.min(...dailyData))) * 140}`
                      ).join(' ')}
                    />
                    
                    {/* Labels - 12px */}
                    <text x="20" y="195" fontSize="12" fill="var(--text-muted)">30 days ago</text>
                    <text x="260" y="195" fontSize="12" fill="var(--text-muted)" textAnchor="end">Today</text>
                  </svg>
                </div>
                
                {/* Footer row */}
                <div className="flex justify-end gap-4 text-sm">
                  <button className="text-brand-accent hover:text-brand-hover">Save to dashboard</button>
                  <button className="text-brand-accent hover:text-brand-hover">View details →</button>
                </div>
              </div>
            </div>

            {/* SECTION 2 — Summary (card) */}
            <div className="bg-white/98 border border-[rgba(16,17,20,0.10)] rounded-2xl shadow-[0_8px_24px_rgba(10,16,30,0.08)] p-6">
              <h3 className="text-base font-semibold text-strong mb-2">Summary</h3>
              <p className="text-base text-body max-w-[78ch]">
                Transactions rose 9.5% MoM, driven by mid-month promos and stronger weekends. 
                The upward trend indicates successful promotional campaigns and improved customer engagement.
              </p>
            </div>

            {/* SECTION 3 — Key insights (card) */}
            <div className="bg-white/98 border border-[rgba(16,17,20,0.10)] rounded-2xl shadow-[0_8px_24px_rgba(10,16,30,0.08)] p-6">
              <h3 className="text-base font-semibold text-strong mb-2">Key insights</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-sm">✅</span>
                  <span className="text-base text-body flex-1">Month-over-month growth accelerated in the final two weeks</span>
                  <span className="text-xs text-muted bg-green-100 px-2 py-1 rounded">High impact</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sm">⚠️</span>
                  <span className="text-base text-body flex-1">Weekend performance significantly outpaced weekday averages</span>
                  <span className="text-xs text-muted bg-yellow-100 px-2 py-1 rounded">Trend</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sm">🔮</span>
                  <span className="text-base text-body flex-1">Promotional campaigns showed 23% higher conversion rates</span>
                  <span className="text-xs text-muted bg-blue-100 px-2 py-1 rounded">High impact</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sm">✅</span>
                  <span className="text-base text-body flex-1">Mobile transactions increased 34% compared to last month</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-sm">⚠️</span>
                  <span className="text-base text-body flex-1">Average order value decreased by 2.1% despite volume growth</span>
                </li>
              </ul>
            </div>

            {/* SECTION 4 — Comparative analysis (card) */}
            <div className="bg-white/98 border border-[rgba(16,17,20,0.10)] rounded-2xl shadow-[0_8px_24px_rgba(10,16,30,0.08)] p-6">
              <h3 className="text-base font-semibold text-strong mb-2">Comparative analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-[rgba(16,17,20,0.08)]">
                      <th className="text-left py-3 px-2 text-xs font-semibold text-strong uppercase tracking-wide">Item</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-strong uppercase tracking-wide">Units</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-strong uppercase tracking-wide">Revenue</th>
                      <th className="text-right py-3 px-2 text-xs font-semibold text-strong uppercase tracking-wide">WoW</th>
                      <th className="text-right py-3 px-2 text-xs font-semibold text-strong uppercase tracking-wide">MoM</th>
                      <th className="text-right py-3 px-2 text-xs font-semibold text-strong uppercase tracking-wide">YoY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparativeData.map((row, index) => (
                      <tr key={index} className={`border-b border-[rgba(16,17,20,0.08)] h-11 ${index % 2 === 1 ? 'bg-white/40' : ''}`}>
                        <td className="py-2 px-2 text-sm font-medium text-strong">{row.item}</td>
                        <td className="py-2 px-2 text-sm text-body">{row.units}</td>
                        <td className="py-2 px-2 text-sm font-medium text-strong">{row.revenue}</td>
                        <td className={`py-2 px-2 text-sm font-medium text-right ${row.wow.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {row.wow}
                        </td>
                        <td className={`py-2 px-2 text-sm font-medium text-right ${row.mom.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {row.mom}
                        </td>
                        <td className={`py-2 px-2 text-sm font-medium text-right ${row.yoy.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {row.yoy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 5 — Predictive analysis (card, collapsed by default) */}
            <div className="bg-white/98 border border-[rgba(16,17,20,0.10)] rounded-2xl shadow-[0_8px_24px_rgba(10,16,30,0.08)] p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-strong">Future predictive analysis</h3>
                <button 
                  onClick={() => setIsPredictiveExpanded(!isPredictiveExpanded)}
                  className="text-sm text-brand-accent hover:text-brand-hover font-medium"
                >
                  {isPredictiveExpanded ? 'Collapse' : 'Expand'}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-base text-body">
                  Exp. smoothing α = 0.3 → forecast <strong>61.5k ± 2.4k (95% CI)</strong> next month.
                </p>
                {/* Mini sparkline 120×32 */}
                <div className="w-30 h-8">
                  <svg viewBox="0 0 120 32" className="w-full h-full">
                    <polyline
                      fill="none"
                      stroke="var(--brand-accent)"
                      strokeWidth="2"
                      points="0,20 20,18 40,22 60,16 80,14 100,12 120,10"
                    />
                  </svg>
                </div>
              </div>
              
              {isPredictiveExpanded && (
                <div className="mt-4 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-xs font-semibold text-strong mb-2 uppercase tracking-wide">Assumptions:</h4>
                    <ul className="text-sm text-body space-y-1">
                      <li>• Seasonal patterns remain consistent</li>
                      <li>• No major market disruptions</li>
                      <li>• Current promotional strategy continues</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 6 — Actionable recommendations (card) */}
            <div className="bg-white/98 border border-[rgba(16,17,20,0.10)] rounded-2xl shadow-[0_8px_24px_rgba(10,16,30,0.08)] p-6">
              <h3 className="text-base font-semibold text-strong mb-2">Actionable recommendations</h3>
              <div className="space-y-3 mb-4">
                {[
                  { task: 'Optimize weekend staffing levels', owner: 'Sarah M.', due: 'This week' },
                  { task: 'A/B test mobile checkout flow', owner: 'Dev Team', due: 'Next sprint' },
                  { task: 'Review promotional pricing strategy', owner: 'Marketing', due: '2 weeks' },
                  { task: 'Analyze customer retention metrics', owner: 'Analytics', due: '1 week' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-sm text-body">{item.task}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted bg-blue-100 px-2 py-1 rounded">{item.owner}</span>
                      <span className="text-xs text-muted">{item.due}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Card footer with Create ticket button */}
              <div className="border-t border-[rgba(16,17,20,0.08)] pt-4">
                <button className="auth-button-primary">
                  Create ticket
                </button>
              </div>
            </div>

            {/* SECTION 7 — Risks & alerts (card) */}
            <div className="bg-white/98 border border-[rgba(16,17,20,0.10)] rounded-2xl shadow-[0_8px_24px_rgba(10,16,30,0.08)] p-6">
              <h3 className="text-base font-semibold text-strong mb-2">Risks & alerts</h3>
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-600">⚠️</span>
                    <div className="flex-1">
                      <p className="text-sm text-body">
                        Average order value decline may impact Q4 revenue targets (threshold: -5%).
                      </p>
                      <button className="text-brand-accent hover:text-brand-hover text-sm mt-1">
                        Open in Alerts →
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-red-600">🚨</span>
                    <div className="flex-1">
                      <p className="text-sm text-body">
                        Weekend staffing shortage detected (threshold: &lt;90% coverage).
                      </p>
                      <button className="text-brand-accent hover:text-brand-hover text-sm mt-1">
                        Open in Alerts →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Chat panel (span 4 cols, sticky) */}
          <div className="col-span-4">
            <div className="sticky top-24">
              <div className="bg-white/98 border border-[rgba(16,17,20,0.10)] rounded-2xl shadow-[0_8px_24px_rgba(10,16,30,0.08)] p-6 h-[600px] flex flex-col">
                
                {/* Header */}
                <h3 className="text-base font-semibold text-strong mb-4">Ask a follow-up</h3>
                
                {/* Input capsule - Glass/Liquid/Strong ONLY for this input */}
                <div className="mb-6">
                  <div className="h-11 bg-[rgba(255,255,255,0.08)] backdrop-blur-[38px] rounded-full border border-[rgba(255,255,255,0.12)] shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.24),0_8px_24px_rgba(10,16,30,0.12)] p-3 flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                    </svg>
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                      placeholder="Ask a follow-up…"
                      className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
                    />
                    <button
                      onClick={handleChatSubmit}
                      disabled={!chatInput.trim()}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--brand-accent)] to-[#6A66FF] text-white flex items-center justify-center text-sm hover:shadow-[0_0_0_6px_rgba(90,87,214,0.18)] transition-all disabled:opacity-50"
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Suggested follow-ups grid (2 × 3) - solid chips */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-strong uppercase tracking-wide mb-3">Suggested follow-ups</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {followUpSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="h-9 border border-[rgba(16,17,20,0.10)] rounded-xl px-3 text-xs text-body hover:bg-gray-50 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent history - neutral empty state */}
                <div className="flex-1">
                  <h4 className="text-xs font-semibold text-strong uppercase tracking-wide mb-3">Recent history</h4>
                  {chatHistory.length === 0 ? (
                    <div className="border border-[rgba(16,17,20,0.08)] rounded-xl p-4 text-center text-sm text-muted">
                      Chat history will appear here after your first question
                    </div>
                  ) : (
                    <div className="space-y-3 overflow-y-auto">
                      {chatHistory.map((message, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg text-sm ${
                            message.type === 'user' 
                              ? 'bg-blue-100/80 ml-2' 
                              : 'bg-gray-100 mr-2'
                          }`}
                        >
                          {message.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
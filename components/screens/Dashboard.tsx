import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PromptChipGroup, defaultPromptChips } from '../PromptChip';
import { KPIGrid } from '../KPICard';
import { ChartCard } from '../ChartCard';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';
import { 
  Search, 
  Sparkles, 
  TrendingUp,
  Users,
  DollarSign,
  Target,
  ArrowRight,
  Zap
} from 'lucide-react';

interface DashboardProps {
  className?: string;
}

export function Dashboard({ className }: DashboardProps) {
  const [askQuery, setAskQuery] = useState('');

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (askQuery.trim()) {
      console.log('Ask AI:', askQuery);
      // Navigate to results view
    }
  };

  const handlePromptClick = (promptTitle: string) => {
    setAskQuery(promptTitle);
    handleAskSubmit(new Event('submit') as any);
  };

  // Sample KPI data
  const kpiData = [
    {
      id: 'revenue',
      title: 'Monthly Revenue',
      value: 485000,
      format: 'currency' as const,
      delta: {
        value: 12.5,
        direction: 'up' as const,
        timeframe: 'MoM' as const
      },
      isPinned: true
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: 18.4,
      format: 'percentage' as const,
      delta: {
        value: 2.1,
        direction: 'up' as const,
        timeframe: 'WoW' as const
      },
      isPinned: true
    },
    {
      id: 'pipeline',
      title: 'Pipeline Value',
      value: 2400000,
      format: 'currency' as const,
      delta: {
        value: 8.7,
        direction: 'down' as const,
        timeframe: 'QoQ' as const
      },
      isPinned: false
    }
  ];

  // Group prompt chips by intent
  const trendChips = defaultPromptChips.filter(chip => chip.intent === 'trend');
  const compareChips = defaultPromptChips.filter(chip => chip.intent === 'compare');
  const diagnoseChips = defaultPromptChips.filter(chip => chip.intent === 'diagnose');
  const forecastChips = defaultPromptChips.filter(chip => chip.intent === 'forecast');
  const explainChips = defaultPromptChips.filter(chip => chip.intent === 'explain');
  const riskChips = defaultPromptChips.filter(chip => chip.intent === 'risk');

  return (
    <div className={cn("space-y-12", className)}>
      {/* Header */}
      <div className="space-y-3">
        <h1 
          className="display-28"
          style={{ color: 'var(--text-primary)' }}
        >
          What would you like to analyse today?
        </h1>
        <p 
          className="text-lg leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          Ask questions about your data or explore suggested insights below. 
          <span style={{ color: 'var(--brand-primary)' }}> Powered by adaapt AI.</span>
        </p>
      </div>

      {/* Ask AI Input */}
      <div 
        className="glass-effect rounded-xl p-8 shadow-lg"
      >
        <form onSubmit={handleAskSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Sparkles 
                className="w-5 h-5" 
                style={{ color: 'var(--brand-primary)' }}
              />
              <Zap 
                className="w-4 h-4 opacity-60" 
                style={{ color: 'var(--brand-soft)' }}
              />
            </div>
            <Input
              type="text"
              placeholder="Type your question here... (e.g., 'Show me sales trends for Q4')"
              value={askQuery}
              onChange={(e) => setAskQuery(e.target.value)}
              className="pl-16 pr-28 h-16 text-lg glass-effect rounded-lg transition-smooth font-normal"
              style={{
                borderColor: 'var(--glass-border)',
                backgroundColor: 'var(--glass-fill)'
              }}
            />
            <Button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 gap-2 h-10 transition-smooth text-white shadow-sm"
              style={{
                backgroundColor: 'var(--brand-primary)'
              }}
              disabled={!askQuery.trim()}
            >
              <span>Ask AI</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div 
            className="flex items-center gap-6 text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            <div className="flex items-center gap-2">
              <kbd 
                className="px-2 py-1 rounded border font-mono text-xs"
                style={{
                  backgroundColor: 'var(--glass-fill)',
                  borderColor: 'var(--glass-border)'
                }}
              >
                Enter
              </kbd>
              <span>to run</span>
            </div>
            <Badge 
              variant="outline" 
              className="text-xs glass-effect"
              style={{
                borderColor: 'var(--glass-border)'
              }}
            >
              💡 Tip: Be specific for better results
            </Badge>
            <Badge 
              variant="outline" 
              className="text-xs glass-effect"
              style={{
                color: 'var(--brand-primary)',
                borderColor: 'var(--brand-primary)'
              }}
            >
              ✨ AI-powered insights
            </Badge>
          </div>
        </form>
      </div>

      {/* Suggested Prompts */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 
              className="text-xl font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Suggested Analysis
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Get started with these AI-powered analysis templates
            </p>
          </div>
          <Badge 
            variant="outline" 
            className="glass-effect"
            style={{
              borderColor: 'var(--glass-border)'
            }}
          >
            6 categories
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {trendChips.length > 0 && (
            <PromptChipGroup
              title="Trend Analysis"
              chips={trendChips}
              onChipClick={handlePromptClick}
            />
          )}
          
          {compareChips.length > 0 && (
            <PromptChipGroup
              title="Comparisons"
              chips={compareChips}
              onChipClick={handlePromptClick}
            />
          )}
          
          {diagnoseChips.length > 0 && (
            <PromptChipGroup
              title="Diagnostics"
              chips={diagnoseChips}
              onChipClick={handlePromptClick}
            />
          )}
          
          {forecastChips.length > 0 && (
            <PromptChipGroup
              title="Forecasting"
              chips={forecastChips}
              onChipClick={handlePromptClick}
            />
          )}
          
          {explainChips.length > 0 && (
            <PromptChipGroup
              title="Explanations"
              chips={explainChips}
              onChipClick={handlePromptClick}
            />
          )}
          
          {riskChips.length > 0 && (
            <PromptChipGroup
              title="Risk Analysis"
              chips={riskChips}
              onChipClick={handlePromptClick}
            />
          )}
        </div>
      </div>

      {/* Quick Overview Tiles */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 
              className="text-xl font-semibold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Quick Overview
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Your pinned metrics and key insights
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 glass-effect transition-smooth"
            style={{
              borderColor: 'var(--glass-border)'
            }}
          >
            <Target className="w-4 h-4" />
            Customize dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* KPI Cards */}
          <div className="space-y-6">
            <h3 
              className="font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              My KPIs (Pinned)
            </h3>
            <KPIGrid
              kpis={kpiData.filter(kpi => kpi.isPinned)}
              onKPIClick={(kpiId) => console.log('KPI clicked:', kpiId)}
              onKPIPin={(kpiId) => console.log('KPI pinned:', kpiId)}
              columns={1}
            />
          </div>

          {/* Sales Overview Chart */}
          <ChartCard
            title="Sales Overview"
            subtitle="Revenue by month"
            type="bar"
            showLegend={true}
            filters={[
              { label: 'Last 6M', value: '6m', active: true },
              { label: 'YTD', value: 'ytd', active: false }
            ]}
            onSave={() => console.log('Save chart')}
            onViewAll={() => console.log('View all charts')}
          />

          {/* Pipeline by Stage */}
          <ChartCard
            title="Pipeline by Stage"
            subtitle="Opportunities distribution"
            type="pie"
            showLegend={true}
            onSave={() => console.log('Save chart')}
            onViewAll={() => console.log('View all charts')}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-effect rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle 
            className="flex items-center gap-3 text-lg"
            style={{ color: 'var(--text-primary)' }}
          >
            <TrendingUp 
              className="w-5 h-5" 
              style={{ color: 'var(--brand-primary)' }}
            />
            Recent Insights
            <Badge 
              variant="outline" 
              className="text-xs glass-effect"
              style={{
                borderColor: 'var(--glass-border)'
              }}
            >
              AI Generated
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                title: 'Conversion rates increased 12% in the last week',
                description: 'Marketing campaigns are showing positive results across all channels',
                time: '2 hours ago',
                type: 'positive',
                confidence: '94%'
              },
              {
                title: 'Pipeline velocity has slowed down',
                description: 'Average deal closure time increased by 15% - investigate Q4 bottlenecks',
                time: '1 day ago',
                type: 'warning',
                confidence: '87%'
              },
              {
                title: 'New customer acquisition up 8% this month',
                description: 'Strong performance in the enterprise segment, particularly SaaS solutions',
                time: '2 days ago',
                type: 'positive',
                confidence: '91%'
              }
            ].map((insight, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 glass-effect hover:shadow-md transition-smooth cursor-pointer rounded-lg"
              >
                <div 
                  className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                  style={{
                    backgroundColor: insight.type === 'positive' ? 'var(--success)' : 'var(--warning)'
                  }}
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 
                      className="font-medium leading-relaxed"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {insight.title}
                    </h4>
                    <Badge 
                      variant="outline" 
                      className="text-xs glass-effect"
                      style={{
                        color: 'var(--brand-primary)',
                        borderColor: 'var(--glass-border)'
                      }}
                    >
                      {insight.confidence} confident
                    </Badge>
                  </div>
                  <p 
                    className="leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {insight.description}
                  </p>
                  <div className="flex items-center gap-3">
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {insight.time}
                    </p>
                    <Badge variant="outline" className="text-xs">AI Insight</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </div>
  );
}
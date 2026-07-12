'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Sparkles, Search, TrendingUp, AlertTriangle, FileText, Target, Brain } from 'lucide-react';

type AIFeature = 'insights' | 'recommendations' | 'summarize' | 'forecast' | 'anomaly' | 'search';

export default function AIInsightsPage() {
  const [activeFeature, setActiveFeature] = useState<AIFeature>('insights');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mockESGData = `Company ESG Data (2024):
- Environmental Score: 85/100
  - Carbon Emissions: 50,000 tons (down 5% YoY)
  - Renewable Energy Usage: 35% (target 50% by 2026)
  - Water Usage: 1,200,000 m³
- Social Score: 78/100
  - Employee Diversity: 45% women in leadership
  - Community Investment: $2.5M
  - Safety Incidents: 12 (down 20% YoY)
- Governance Score: 90/100
  - Board Independence: 70%
  - Compliance Score: 95%
  - ESG Reporting: Third-party verified`;

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    setResult('');
    try {
      let prompt = input;
      if (activeFeature !== 'search') {
        prompt = `${input || 'Analyze the following data:'}\n\n${mockESGData}`;
      }

      const response = await fetch('/api/groq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, type: activeFeature }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError('An error occurred. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const features: { id: AIFeature; label: string; icon: any; description: string }[] = [
    { id: 'insights', label: 'ESG Insights', icon: Brain, description: 'Get AI-powered analysis of your ESG performance' },
    { id: 'recommendations', label: 'Carbon Reduction', icon: Target, description: 'Receive actionable recommendations' },
    { id: 'summarize', label: 'Report Summarization', icon: FileText, description: 'Summarize long ESG reports' },
    { id: 'forecast', label: 'Score Forecasting', icon: TrendingUp, description: 'Forecast future ESG scores' },
    { id: 'anomaly', label: 'Anomaly Detection', icon: AlertTriangle, description: 'Detect anomalies in your data' },
    { id: 'search', label: 'Natural Language Search', icon: Search, description: 'Search your reports using natural language' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="text-[#00D084]" />
          AI ESG Insights
        </h1>
        <p className="text-[#8B949E]">
          Leverage AI to enhance your ESG management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.id}
              onClick={() => {
                setActiveFeature(feature.id);
                setResult('');
                setError('');
              }}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                activeFeature === feature.id
                  ? 'border-[#00D084] bg-[#00D084]/10'
                  : 'border-[#30363D] bg-[#161B22] hover:border-[#58A6FF]'
              }`}
            >
              <Icon className="text-2xl mb-2" style={{ color: activeFeature === feature.id ? '#00D084' : '#8B949E' }} />
              <h3 className="text-lg font-semibold text-white">{feature.label}</h3>
              <p className="text-sm text-[#8B949E] mt-1">{feature.description}</p>
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {features.find((f) => f.id === activeFeature)?.label}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeFeature === 'search' ? (
            <div className="space-y-4">
              <Input
                label="Ask a question about your ESG reports"
                placeholder="e.g., What was our carbon emissions last year?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#8B949E] mb-2">
                  Context (Optional - uses sample data if empty)
                </label>
                <textarea
                  className="w-full min-h-[200px] p-4 bg-[#0D1117] border border-[#30363D] rounded-lg text-white placeholder-[#8B949E] focus:outline-none focus:ring-2 focus:ring-[#00D084]"
                  placeholder="Paste your ESG data or report here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              variant="success"
              size="md"
              leftIcon={<Sparkles size={18} />}
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              {isLoading ? 'Analyzing...' : 'Get AI Insights'}
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-[#F85149]/10 border border-[#F85149] rounded-lg">
              <p className="text-[#F85149]">{error}</p>
            </div>
          )}

          {result && (
            <div className="p-6 bg-[#0D1117] border border-[#30363D] rounded-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ ...props }) => <h1 className="text-2xl font-bold text-white mb-4" {...props} />,
                  h2: ({ ...props }) => <h2 className="text-xl font-semibold text-white mb-3" {...props} />,
                  h3: ({ ...props }) => <h3 className="text-lg font-semibold text-white mb-2" {...props} />,
                  p: ({ ...props }) => <p className="text-[#E8EAED] mb-2" {...props} />,
                  ul: ({ ...props }) => <ul className="list-disc list-inside text-[#E8EAED] mb-2 space-y-1" {...props} />,
                  ol: ({ ...props }) => <ol className="list-decimal list-inside text-[#E8EAED] mb-2 space-y-1" {...props} />,
                  li: ({ ...props }) => <li className="text-[#E8EAED]" {...props} />,
                  code: ({ className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return (
                      <code
                        className={`${className || ''} text-[#00D084] bg-[#161B22] px-1 py-0.5 rounded font-mono text-sm`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  pre: ({ ...props }) => (
                    <pre className="bg-[#161B22] p-4 rounded-lg overflow-x-auto mb-2" {...props} />
                  ),
                  blockquote: ({ ...props }) => (
                    <blockquote className="border-l-4 border-[#00D084] pl-4 italic text-[#8B949E] mb-2" {...props} />
                  ),
                  strong: ({ ...props }) => <strong className="text-white font-semibold" {...props} />,
                  em: ({ ...props }) => <em className="text-[#E8EAED] italic" {...props} />,
                  a: ({ ...props }) => (
                    <a className="text-[#58A6FF] underline hover:text-[#00D084]" target="_blank" rel="noopener noreferrer" {...props} />
                  ),
                }}
              >
                {result}
              </ReactMarkdown>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

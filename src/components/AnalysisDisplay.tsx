import { Check, AlertTriangle } from 'lucide-react';

interface AnalysisDisplayProps {
  analysis: {
    summary: string;
    credit_score: number;
    recommendations: string[];
    dispute_strategy: string;
    side_hustles: string[];
    credit_card_tips: string[];
  };
}

export function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return 'text-success-500';
    if (score >= 700) return 'text-primary-500';
    if (score >= 650) return 'text-warning-500';
    return 'text-error-500';
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-gray-900 p-6 border border-gray-800">
        <h3 className="text-xl font-semibold mb-4">Credit Analysis Summary</h3>
        <p className="text-gray-300 mb-4">{analysis.summary}</p>
        
        <div className="flex items-center justify-between border-t border-gray-800 mt-4 pt-4">
          <div>
            <h4 className="text-sm font-medium text-gray-400">Your Credit Score</h4>
            <p className={`text-2xl font-bold ${getCreditScoreColor(analysis.credit_score)}`}>
              {analysis.credit_score}
            </p>
          </div>
          <div className="h-16 w-16 rounded-full border-4 border-primary-500 flex items-center justify-center">
            <span className={`text-xl font-bold ${getCreditScoreColor(analysis.credit_score)}`}>
              {analysis.credit_score > 700 ? 'Good' : analysis.credit_score > 650 ? 'Fair' : 'Poor'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Check className="h-5 w-5 text-success-500 mr-2" />
            Recommendations
          </h3>
          <ul className="space-y-3">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success-500/20 text-success-500 mr-2">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-gray-300">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-warning-500 mr-2" />
            Dispute Strategy
          </h3>
          <p className="text-gray-300">{analysis.dispute_strategy}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 gradient-text">Side Hustle Recommendations</h3>
          <ul className="space-y-3">
            {analysis.side_hustles.map((hustle, index) => (
              <li key={index} className="pb-2 border-b border-gray-800">
                <p className="text-gray-300">{hustle}</p>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 gradient-text">Credit Card Tips</h3>
          <ul className="space-y-3">
            {analysis.credit_card_tips.map((tip, index) => (
              <li key={index} className="pb-2 border-b border-gray-800">
                <p className="text-gray-300">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
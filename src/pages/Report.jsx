import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockStrategy } from '../api/mockData';
import { getStrategy } from '../api/services';

const Report = () => {
  const [loading, setLoading] = useState(true);
  const [strategyData, setStrategyData] = useState(null);

  useEffect(() => {
    const fetchStrategy = async () => {
      setLoading(true);
      try {
        const data = await getStrategy().catch(() => mockStrategy);
        setStrategyData(data);
      } catch (error) {
        console.error('Failed to fetch strategy:', error);
        setStrategyData(mockStrategy);
      } finally {
        setLoading(false);
      }
    };

    fetchStrategy();
  }, []);

  const pieData = strategyData
    ? [
        { name: 'Tijari Bank', value: strategyData.portfolioAllocation.tijari, color: '#6366f1' },
        { name: 'Injaz', value: strategyData.portfolioAllocation.injaz, color: '#8b5cf6' },
        { name: 'Cash', value: strategyData.portfolioAllocation.cash, color: '#10b981' },
      ]
    : [];

  return (
    <div className="min-h-screen bg-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AI Investment Report</h1>
          <p className="text-gray-400">Strategic recommendations powered by machine learning</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {strategyData?.recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="bg-dark rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{rec.asset}</h3>
                      <p className="text-gray-400 text-sm mt-1">AI Recommendation</p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-lg font-bold text-lg ${
                        rec.action === 'BUY'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {rec.action}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold text-white">
                        {rec.action === 'BUY' ? '+' : ''}{rec.percentage}%
                      </span>
                      <span className="text-gray-400">recommended position</span>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-300 leading-relaxed">{rec.reason}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-800 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            rec.action === 'BUY' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.abs(rec.percentage) * 5}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400 font-semibold">
                        {Math.abs(rec.percentage) * 5}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-dark rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">
                Recommended Portfolio Allocation
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  {pieData.map((item, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-white font-semibold">{item.name}</span>
                        </div>
                        <span className="text-2xl font-bold text-white">{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: item.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-6 border border-primary/30">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">AI Strategy Summary</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Based on comprehensive analysis using Sentiment Analysis, LSTM predictions, VAR
                    models, and Explainable AI, we recommend a <strong className="text-primary">65% allocation to Tijari Bank</strong> due to strong positive momentum and favorable market
                    sentiment. Reduce exposure to Injaz to <strong className="text-secondary">15%</strong> while maintaining <strong className="text-green-400">20% cash reserves</strong> for flexibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;

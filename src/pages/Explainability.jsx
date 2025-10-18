import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockExplanation } from '../api/mockData';
import { getExplanation } from '../api/services';

const Explainability = () => {
  const [loading, setLoading] = useState(true);
  const [explanationData, setExplanationData] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState('tijari');

  useEffect(() => {
    const fetchExplanation = async () => {
      setLoading(true);
      try {
        const data = await getExplanation().catch(() => mockExplanation);
        setExplanationData(data);
      } catch (error) {
        console.error('Failed to fetch explanation:', error);
        setExplanationData(mockExplanation);
      } finally {
        setLoading(false);
      }
    };

    fetchExplanation();
  }, []);

  const currentData = explanationData?.[selectedAsset];

  const getBarColor = (value) => {
    return value >= 0 ? '#10b981' : '#ef4444';
  };

  return (
    <div className="min-h-screen bg-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AI Explainability</h1>
          <p className="text-gray-400">
            Understand how AI models make investment decisions using SHAP values and feature importance
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-6">
            <div className="bg-dark rounded-xl p-6 border border-gray-800">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-400 font-semibold">Select Asset:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedAsset('tijari')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      selectedAsset === 'tijari'
                        ? 'bg-primary text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    Tijari Bank
                  </button>
                  <button
                    onClick={() => setSelectedAsset('injaz')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      selectedAsset === 'injaz'
                        ? 'bg-secondary text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    Injaz
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Feature Importance</h3>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={currentData?.features}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis type="number" stroke="#9CA3AF" />
                        <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={120} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff',
                          }}
                        />
                        <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
                          {currentData?.features.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(entry.importance)} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Feature Details</h3>
                  <div className="space-y-3">
                    {currentData?.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-semibold">{feature.name}</span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-bold ${
                              feature.importance >= 0
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {feature.importance >= 0 ? '+' : ''}
                            {feature.importance.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Current Value:</span>
                          <span className="text-sm text-gray-300 font-semibold">
                            {feature.value}
                          </span>
                        </div>
                        <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              feature.importance >= 0 ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.abs(feature.importance) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-dark rounded-xl p-8 border border-gray-800">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">AI Decision Summary</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{currentData?.summary}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white">Positive Factors</h4>
                </div>
                <p className="text-green-400 text-sm">
                  {currentData?.features.filter((f) => f.importance > 0).length} features
                  contributing positively
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-xl p-6 border border-red-500/30">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
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
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white">Negative Factors</h4>
                </div>
                <p className="text-red-400 text-sm">
                  {currentData?.features.filter((f) => f.importance < 0).length} features
                  contributing negatively
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/30">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white">Total Features</h4>
                </div>
                <p className="text-primary text-sm">
                  {currentData?.features.length} features analyzed by AI
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explainability;

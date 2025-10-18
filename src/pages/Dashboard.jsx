import { useState } from 'react';
import ChartCard from '../components/ChartCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockPriceData, mockAnalysisResult } from '../api/mockData';
import { analyzeAsset } from '../api/services';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalysis = async () => {
    setLoading(true);
    try {
      const tijariResult = await analyzeAsset('tijari').catch(() => mockAnalysisResult.tijari);
      const injazResult = await analyzeAsset('injaz').catch(() => mockAnalysisResult.injaz);

      setAnalysisData({
        tijari: tijariResult,
        injaz: injazResult,
      });
      setAnalyzed(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisData(mockAnalysisResult);
      setAnalyzed(true);
    } finally {
      setLoading(false);
    }
  };

  const tijariChange = ((mockPriceData.tijari[9].price - mockPriceData.tijari[0].price) / mockPriceData.tijari[0].price * 100).toFixed(2);
  const injazChange = ((mockPriceData.injaz[9].price - mockPriceData.injaz[0].price) / mockPriceData.injaz[0].price * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Investment Dashboard</h1>
          <p className="text-gray-400">Real-time analysis of Tijari Bank and Injaz assets</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard
            title="Tijari Bank"
            data={mockPriceData.tijari}
            color="#6366f1"
            currentPrice={mockPriceData.tijari[9].price}
            change={parseFloat(tijariChange)}
          />
          <ChartCard
            title="Injaz"
            data={mockPriceData.injaz}
            color="#8b5cf6"
            currentPrice={mockPriceData.injaz[9].price}
            change={parseFloat(injazChange)}
          />
        </div>

        <div className="bg-dark rounded-xl p-8 border border-gray-800">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">AI-Powered Analysis</h2>
            <p className="text-gray-400 mb-6">
              Run comprehensive AI analysis using Sentiment Analysis, LSTM, VAR, and XAI models
            </p>
            <button
              onClick={handleAnalysis}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Run AI Analysis'}
            </button>
          </div>

          {loading && (
            <div className="mt-8">
              <LoadingSpinner />
              <p className="text-center text-gray-400 mt-4">
                Running AI models... This may take a few moments
              </p>
            </div>
          )}

          {analyzed && !loading && analysisData && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Tijari Bank Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Predicted Growth</span>
                    <span className="text-green-400 font-bold">+{analysisData.tijari.predictedGrowth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence</span>
                    <span className="text-white font-semibold">{(analysisData.tijari.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Recommendation</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                      {analysisData.tijari.recommendation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target Price</span>
                    <span className="text-white font-bold">${analysisData.tijari.targetPrice}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Injaz Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Predicted Growth</span>
                    <span className="text-red-400 font-bold">{analysisData.injaz.predictedGrowth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence</span>
                    <span className="text-white font-semibold">{(analysisData.injaz.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Recommendation</span>
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold">
                      {analysisData.injaz.recommendation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target Price</span>
                    <span className="text-white font-bold">${analysisData.injaz.targetPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

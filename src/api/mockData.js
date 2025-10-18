export const mockPriceData = {
  tijari: [
    { date: '2024-01', price: 85.2 },
    { date: '2024-02', price: 87.5 },
    { date: '2024-03', price: 89.1 },
    { date: '2024-04', price: 92.3 },
    { date: '2024-05', price: 94.8 },
    { date: '2024-06', price: 97.2 },
    { date: '2024-07', price: 99.5 },
    { date: '2024-08', price: 102.1 },
    { date: '2024-09', price: 105.3 },
    { date: '2024-10', price: 108.7 },
  ],
  injaz: [
    { date: '2024-01', price: 42.1 },
    { date: '2024-02', price: 41.3 },
    { date: '2024-03', price: 39.8 },
    { date: '2024-04', price: 38.2 },
    { date: '2024-05', price: 37.5 },
    { date: '2024-06', price: 36.1 },
    { date: '2024-07', price: 35.4 },
    { date: '2024-08', price: 34.2 },
    { date: '2024-09', price: 33.5 },
    { date: '2024-10', price: 32.8 },
  ],
};

export const mockAnalysisResult = {
  tijari: {
    predictedGrowth: 20.5,
    confidence: 0.87,
    recommendation: 'STRONG BUY',
    targetPrice: 130.4,
  },
  injaz: {
    predictedGrowth: -10.2,
    confidence: 0.82,
    recommendation: 'SELL',
    targetPrice: 29.5,
  },
};

export const mockStrategy = {
  recommendations: [
    {
      asset: 'Tijari Bank',
      action: 'BUY',
      percentage: 20,
      reason: 'Strong positive sentiment and technical indicators',
    },
    {
      asset: 'Injaz',
      action: 'SELL',
      percentage: 10,
      reason: 'Declining momentum and negative market sentiment',
    },
  ],
  portfolioAllocation: {
    tijari: 65,
    injaz: 15,
    cash: 20,
  },
};

export const mockExplanation = {
  tijari: {
    features: [
      { name: 'Sentiment Score', importance: 0.62, value: 'Positive' },
      { name: 'RSI', importance: 0.31, value: 68.5 },
      { name: 'Volume Trend', importance: 0.18, value: 'Increasing' },
      { name: 'MACD', importance: 0.15, value: 'Bullish' },
      { name: 'Moving Average', importance: -0.08, value: 'Above 50MA' },
    ],
    summary: 'The model decided to buy Tijari Bank mainly because sentiment analysis shows strong positive signals (+0.62) and RSI indicates good momentum (+0.31). The combination of positive sentiment and technical indicators suggests a strong upward trend.',
  },
  injaz: {
    features: [
      { name: 'Sentiment Score', importance: -0.55, value: 'Negative' },
      { name: 'Volume Trend', importance: -0.42, value: 'Decreasing' },
      { name: 'RSI', importance: -0.28, value: 32.1 },
      { name: 'MACD', importance: -0.19, value: 'Bearish' },
      { name: 'Moving Average', importance: 0.12, value: 'Below 50MA' },
    ],
    summary: 'The model recommends selling Injaz due to strong negative sentiment (-0.55) and declining volume (-0.42). Technical indicators including low RSI and bearish MACD confirm the downward trend.',
  },
};

export const mockTokenomics = {
  tokens: [
    {
      name: 'TijariToken',
      symbol: 'TJAR',
      totalSupply: 1000000,
      currentPrice: 108.7,
      ownership: 0,
      marketCap: 108700000,
      description: 'Digital token representing shares in Tijari Bank',
    },
    {
      name: 'InjazToken',
      symbol: 'INJZ',
      totalSupply: 500000,
      currentPrice: 32.8,
      ownership: 0,
      marketCap: 16400000,
      description: 'Digital token representing shares in Injaz',
    },
  ],
  blockchain: {
    network: 'Ethereum',
    standard: 'ERC-20',
    smartContract: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  },
};

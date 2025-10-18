import { useState, useEffect } from 'react';
import TokenCard from '../components/TokenCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockTokenomics } from '../api/mockData';
import { getTokenomics } from '../api/services';

const Tokenomics = () => {
  const [loading, setLoading] = useState(true);
  const [tokenomicsData, setTokenomicsData] = useState(null);

  useEffect(() => {
    const fetchTokenomics = async () => {
      setLoading(true);
      try {
        const data = await getTokenomics().catch(() => mockTokenomics);
        setTokenomicsData(data);
      } catch (error) {
        console.error('Failed to fetch tokenomics:', error);
        setTokenomicsData(mockTokenomics);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenomics();
  }, []);

  return (
    <div className="min-h-screen bg-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Tokenomics</h1>
          <p className="text-gray-400">
            Blockchain-based tokenization of financial assets
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-8 border border-primary/30">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Asset Tokenization Overview
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    AI-WealthX introduces blockchain-based tokenization of traditional financial
                    assets. Each token represents fractional ownership in Tijari Bank and Injaz,
                    enabling transparent, secure, and liquid investment opportunities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-dark/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Blockchain Network</p>
                      <p className="text-white font-bold text-lg">
                        {tokenomicsData?.blockchain.network}
                      </p>
                    </div>
                    <div className="bg-dark/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Token Standard</p>
                      <p className="text-white font-bold text-lg">
                        {tokenomicsData?.blockchain.standard}
                      </p>
                    </div>
                    <div className="bg-dark/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Smart Contract</p>
                      <p className="text-white font-bold text-xs break-all">
                        {tokenomicsData?.blockchain.smartContract}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tokenomicsData?.tokens.map((token, idx) => (
                <TokenCard key={idx} token={token} />
              ))}
            </div>

            <div className="bg-dark rounded-xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Token Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
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
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Secure & Transparent</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      All transactions are recorded on the blockchain, ensuring complete
                      transparency and immutability of ownership records.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Instant Settlement</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Smart contracts enable instant transaction settlement without
                      intermediaries, reducing costs and processing time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
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
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Fractional Ownership</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Purchase any amount of tokens, enabling smaller investors to access
                      premium financial assets previously out of reach.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
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
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">24/7 Liquidity</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Trade tokens anytime, anywhere. The blockchain never sleeps, providing
                      continuous market access and liquidity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-dark rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Total Market Cap</h3>
                <div className="space-y-3">
                  {tokenomicsData?.tokens.map((token, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-gray-400">{token.symbol}</span>
                      <span className="text-white font-bold text-lg">
                        ${(token.marketCap / 1000000).toFixed(2)}M
                      </span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-primary font-bold text-2xl">
                      $
                      {(
                        tokenomicsData?.tokens.reduce((sum, t) => sum + t.marketCap, 0) / 1000000
                      ).toFixed(2)}
                      M
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-dark rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Token Distribution</h3>
                <div className="space-y-4">
                  {tokenomicsData?.tokens.map((token, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">{token.name}</span>
                        <span className="text-white font-semibold">
                          {token.totalSupply.toLocaleString()} {token.symbol}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            idx === 0 ? 'bg-primary' : 'bg-secondary'
                          }`}
                          style={{
                            width: `${
                              (token.totalSupply /
                                tokenomicsData.tokens.reduce((sum, t) => sum + t.totalSupply, 0)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tokenomics;

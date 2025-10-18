import { useState } from 'react';

const TokenCard = ({ token }) => {
  const [amount, setAmount] = useState(0);
  const [purchased, setPurchased] = useState(false);

  const handlePurchase = () => {
    if (amount > 0) {
      setPurchased(true);
      setTimeout(() => setPurchased(false), 3000);
    }
  };

  const totalValue = (amount * token.currentPrice).toFixed(2);

  return (
    <div className="bg-dark rounded-xl p-6 border border-gray-800 hover:border-primary transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">{token.name}</h3>
          <p className="text-gray-400 text-sm mt-1">{token.symbol}</p>
        </div>
        <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {token.symbol.charAt(0)}
          </span>
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-6">{token.description}</p>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Current Price</span>
          <span className="text-white font-bold text-lg">${token.currentPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Supply</span>
          <span className="text-white font-semibold">
            {token.totalSupply.toLocaleString()} {token.symbol}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Market Cap</span>
          <span className="text-white font-semibold">
            ${(token.marketCap / 1000000).toFixed(2)}M
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Your Ownership</span>
          <span className="text-primary font-bold">{token.ownership}%</span>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6">
        <label className="block text-gray-400 text-sm mb-2">Purchase Amount</label>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition-all"
          placeholder="Enter token amount"
        />
        {amount > 0 && (
          <p className="text-sm text-gray-400 mt-2">
            Total Value: <span className="text-primary font-bold">${totalValue}</span>
          </p>
        )}
      </div>

      <button
        onClick={handlePurchase}
        disabled={amount <= 0}
        className={`w-full mt-4 py-3 rounded-lg font-semibold transition-all ${
          amount > 0
            ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
        }`}
      >
        {purchased ? '✓ Purchase Simulated' : 'Simulate Purchase'}
      </button>
    </div>
  );
};

export default TokenCard;

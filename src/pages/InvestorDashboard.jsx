import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChartCard from '../components/ChartCard';
import { mockPriceData } from '../api/mockData';

const InvestorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState({
    tijari: 0,
    injaz: 0,
    cash: 10000,
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleBuyToken = (asset, amount) => {
    const price = asset === 'tijari' ? 108.7 : 32.8;
    const cost = amount * price;

    if (cost > portfolio.cash) {
      alert('Fonds insuffisants!');
      return;
    }

    setPortfolio({
      ...portfolio,
      [asset]: portfolio[asset] + amount,
      cash: portfolio.cash - cost,
    });
  };

  const tijariChange = ((mockPriceData.tijari[9].price - mockPriceData.tijari[0].price) / mockPriceData.tijari[0].price * 100).toFixed(2);
  const injazChange = ((mockPriceData.injaz[9].price - mockPriceData.injaz[0].price) / mockPriceData.injaz[0].price * 100).toFixed(2);

  const totalValue = portfolio.tijari * 108.7 + portfolio.injaz * 32.8 + portfolio.cash;

  return (
    <div className="min-h-screen bg-darker">
      {/* Header */}
      <div className="bg-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Dashboard Investisseur</h1>
                <p className="text-sm text-gray-400">Bienvenue, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-all"
              >
                Dashboard Public
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl p-6">
            <p className="text-blue-100 text-sm mb-2">Valeur Totale</p>
            <p className="text-3xl font-bold text-white">${totalValue.toFixed(2)}</p>
            <p className="text-blue-100 text-sm mt-2">Portfolio</p>
          </div>
          <div className="bg-dark rounded-xl p-6 border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">Tijari Bank</p>
            <p className="text-2xl font-bold text-white">{portfolio.tijari} tokens</p>
            <p className="text-green-400 text-sm mt-2">${(portfolio.tijari * 108.7).toFixed(2)}</p>
          </div>
          <div className="bg-dark rounded-xl p-6 border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">Injaz</p>
            <p className="text-2xl font-bold text-white">{portfolio.injaz} tokens</p>
            <p className="text-green-400 text-sm mt-2">${(portfolio.injaz * 32.8).toFixed(2)}</p>
          </div>
          <div className="bg-dark rounded-xl p-6 border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">Cash Disponible</p>
            <p className="text-2xl font-bold text-white">${portfolio.cash.toFixed(2)}</p>
            <p className="text-gray-400 text-sm mt-2">Liquidités</p>
          </div>
        </div>

        {/* Charts */}
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

        {/* Quick Buy Section */}
        <div className="bg-dark rounded-xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Achat Rapide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuickBuyCard
              title="Tijari Bank"
              symbol="TJAR"
              price={108.7}
              color="primary"
              onBuy={(amount) => handleBuyToken('tijari', amount)}
            />
            <QuickBuyCard
              title="Injaz"
              symbol="INJZ"
              price={32.8}
              color="secondary"
              onBuy={(amount) => handleBuyToken('injaz', amount)}
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-6 border border-primary/30">
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
              <h3 className="text-lg font-bold text-white mb-2">Recommandations AI</h3>
              <p className="text-gray-300 leading-relaxed">
                Basé sur l'analyse AI: <strong className="text-primary">Tijari Bank</strong> montre une tendance haussière (+27.58%) avec une recommandation <strong className="text-green-400">STRONG BUY</strong>. Injaz est en baisse (-22.08%) avec une recommandation <strong className="text-red-400">SELL</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickBuyCard = ({ title, symbol, price, color, onBuy }) => {
  const [amount, setAmount] = useState(0);

  const handleBuy = () => {
    if (amount > 0) {
      onBuy(amount);
      setAmount(0);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-400 text-sm">{symbol}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">${price}</p>
          <p className="text-gray-400 text-sm">par token</p>
        </div>
      </div>
      <div className="space-y-3">
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition-all"
          placeholder="Nombre de tokens"
        />
        {amount > 0 && (
          <p className="text-sm text-gray-400">
            Total: <span className={`text-${color} font-bold`}>${(amount * price).toFixed(2)}</span>
          </p>
        )}
        <button
          onClick={handleBuy}
          disabled={amount <= 0}
          className={`w-full py-3 bg-gradient-to-r ${
            color === 'primary' ? 'from-primary to-blue-600' : 'from-secondary to-purple-600'
          } text-white font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Acheter
        </button>
      </div>
    </div>
  );
};

export default InvestorDashboard;

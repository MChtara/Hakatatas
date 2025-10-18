import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ShareholderDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Données financières des entreprises
  const tijariData = {
    name: 'Tijari Bank',
    shares: 1500,
    currentPrice: 108.7,
    totalValue: 163050,
    yearlyGrowth: 27.58,
    dividends: 8500,
    quarterlyRevenue: [
      { quarter: 'Q1', revenue: 45000 },
      { quarter: 'Q2', revenue: 52000 },
      { quarter: 'Q3', revenue: 58000 },
      { quarter: 'Q4', revenue: 63000 },
    ],
  };

  const injazData = {
    name: 'Injaz',
    shares: 2000,
    currentPrice: 32.8,
    totalValue: 65600,
    yearlyGrowth: -22.08,
    dividends: 2400,
    quarterlyRevenue: [
      { quarter: 'Q1', revenue: 28000 },
      { quarter: 'Q2', revenue: 25000 },
      { quarter: 'Q3', revenue: 22000 },
      { quarter: 'Q4', revenue: 19000 },
    ],
  };

  const totalShares = tijariData.shares + injazData.shares;
  const totalValue = tijariData.totalValue + injazData.totalValue;
  const totalDividends = tijariData.dividends + injazData.dividends;

  const performanceData = [
    { month: 'Jan', tijari: 85, injaz: 42 },
    { month: 'Fev', tijari: 87, injaz: 41 },
    { month: 'Mar', tijari: 89, injaz: 40 },
    { month: 'Avr', tijari: 92, injaz: 38 },
    { month: 'Mai', tijari: 95, injaz: 37 },
    { month: 'Juin', tijari: 97, injaz: 36 },
    { month: 'Juil', tijari: 100, injaz: 35 },
    { month: 'Aout', tijari: 102, injaz: 34 },
    { month: 'Sep', tijari: 105, injaz: 33 },
    { month: 'Oct', tijari: 109, injaz: 33 },
  ];

  return (
    <div className="min-h-screen bg-darker">
      {/* Header */}
      <div className="bg-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Dashboard Actionneur</h1>
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
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-secondary to-purple-600 rounded-xl p-6">
            <p className="text-purple-100 text-sm mb-2">Valeur Totale Actions</p>
            <p className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</p>
            <p className="text-purple-100 text-sm mt-2">Portfolio</p>
          </div>
          <div className="bg-dark rounded-xl p-6 border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">Nombre d'Actions</p>
            <p className="text-2xl font-bold text-white">{totalShares.toLocaleString()}</p>
            <p className="text-gray-400 text-sm mt-2">Total</p>
          </div>
          <div className="bg-dark rounded-xl p-6 border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">Dividendes Annuels</p>
            <p className="text-2xl font-bold text-white">${totalDividends.toLocaleString()}</p>
            <p className="text-green-400 text-sm mt-2">Revenus passifs</p>
          </div>
          <div className="bg-dark rounded-xl p-6 border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">ROI Moyen</p>
            <p className="text-2xl font-bold text-white">
              {((tijariData.yearlyGrowth + injazData.yearlyGrowth) / 2).toFixed(2)}%
            </p>
            <p className="text-gray-400 text-sm mt-2">Cette année</p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-dark rounded-xl p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Performance des Actions</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="tijari"
                  stroke="#6366f1"
                  strokeWidth={3}
                  name="Tijari Bank"
                />
                <Line
                  type="monotone"
                  dataKey="injaz"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  name="Injaz"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Company Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CompanyCard data={tijariData} color="primary" />
          <CompanyCard data={injazData} color="secondary" />
        </div>

        {/* Quarterly Revenue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueCard title="Tijari Bank - Revenus Trimestriels" data={tijariData.quarterlyRevenue} color="#6366f1" />
          <RevenueCard title="Injaz - Revenus Trimestriels" data={injazData.quarterlyRevenue} color="#8b5cf6" />
        </div>
      </div>
    </div>
  );
};

const CompanyCard = ({ data, color }) => {
  const isPositive = data.yearlyGrowth >= 0;

  return (
    <div className="bg-dark rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">{data.name}</h3>
        <div className={`px-4 py-2 rounded-lg ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {isPositive ? '+' : ''}{data.yearlyGrowth}%
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Actions détenues</span>
          <span className="text-white font-bold">{data.shares.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Prix par action</span>
          <span className="text-white font-bold">${data.currentPrice}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Valeur totale</span>
          <span className={`text-${color} font-bold text-lg`}>${data.totalValue.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <span className="text-gray-400">Dividendes annuels</span>
          <span className="text-green-400 font-bold">${data.dividends.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

const RevenueCard = ({ title, data, color }) => {
  return (
    <div className="bg-dark rounded-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="quarter" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey="revenue" fill={color} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ShareholderDashboard;

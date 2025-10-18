import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation simple
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    // Simulation d'authentification (en production, appelez votre API ici)
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      role: selectedRole,
      name: formData.email.split('@')[0],
    };

    login(userData);

    // Redirection selon le rôle
    if (selectedRole === 'investor') {
      navigate('/investor-dashboard');
    } else {
      navigate('/shareholder-dashboard');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-darker flex items-center justify-center px-4">
      <div className="max-w-6xl w-full">
        {!selectedRole ? (
          // Sélection du rôle
          <div className="text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">AI</span>
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white mb-3">AI-WealthX</h1>
              <p className="text-gray-400 text-lg">
                Plateforme d'investissement intelligente
              </p>
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">Connexion</h2>
            <p className="text-gray-400 mb-12">
              Choisissez votre type de compte pour continuer
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Carte Investisseur */}
              <div
                onClick={() => handleRoleSelect('investor')}
                className="bg-dark rounded-2xl p-8 border-2 border-gray-800 hover:border-primary transition-all cursor-pointer group transform hover:scale-105"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-white"
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
                <h3 className="text-2xl font-bold text-white mb-3">Investisseur</h3>
                <p className="text-gray-400 mb-6">
                  Accédez aux analyses AI, recommandations d'investissement et
                  tokenomics
                </p>
                <ul className="text-left text-gray-400 space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Dashboard d'analyse
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Recommandations AI
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Achat de tokens
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">✓</span> Suivi de portefeuille
                  </li>
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all">
                  Se connecter comme Investisseur
                </button>
              </div>

              {/* Carte Actionneur */}
              <div
                onClick={() => handleRoleSelect('shareholder')}
                className="bg-dark rounded-2xl p-8 border-2 border-gray-800 hover:border-secondary transition-all cursor-pointer group transform hover:scale-105"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-secondary to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-white"
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
                <h3 className="text-2xl font-bold text-white mb-3">Actionneur</h3>
                <p className="text-gray-400 mb-6">
                  Gérez vos actions, suivez les performances et prenez des
                  décisions stratégiques
                </p>
                <ul className="text-left text-gray-400 space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Vue d'ensemble
                    entreprise
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Performance des
                    actions
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Rapports financiers
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Analyse détaillée
                  </li>
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-secondary to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all">
                  Se connecter comme Actionneur
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Formulaire de connexion
          <div className="max-w-md mx-auto">
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Retour
            </button>

            <div className="bg-dark rounded-2xl p-8 border border-gray-800">
              <div className="text-center mb-8">
                <div
                  className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${
                    selectedRole === 'investor'
                      ? 'from-primary to-blue-600'
                      : 'from-secondary to-purple-600'
                  } rounded-xl flex items-center justify-center`}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {selectedRole === 'investor' ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    )}
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Connexion {selectedRole === 'investor' ? 'Investisseur' : 'Actionneur'}
                </h2>
                <p className="text-gray-400">
                  Entrez vos identifiants pour continuer
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm font-semibold mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-3 bg-gradient-to-r ${
                    selectedRole === 'investor'
                      ? 'from-primary to-blue-600'
                      : 'from-secondary to-purple-600'
                  } text-white font-semibold rounded-lg hover:opacity-90 transition-all`}
                >
                  Se connecter
                </button>

                <div className="text-center">
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Mot de passe oublié?
                  </a>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-800 text-center">
                <p className="text-gray-400 text-sm">
                  Pas encore de compte?{' '}
                  <a href="#" className="text-primary hover:text-blue-400 font-semibold transition-colors">
                    Créer un compte
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

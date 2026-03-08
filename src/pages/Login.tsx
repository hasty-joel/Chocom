import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (token: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        onLogin(data.token);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center bg-[#FDFBF7]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/20">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Admin Login</h1>
          <p className="text-gray-500 mt-2">Enter your credentials to access the panel.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Username</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="brain"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl"
            >
              <AlertCircle size={16} /> {error}
            </motion.div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full py-5 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-2xl shadow-purple-500/20 hover:shadow-blue-500/40 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}

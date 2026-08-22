import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../services/api';
import { ForgotPasswordModal } from '../../components/common/ForgotPasswordModal';
import { School, LogIn, Key, Mail, Shield, UserCheck, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login({ email, password });
      login(response.data.token, response.data.user);
      setLoading(false);
      
      if (response.data.user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-7 glass-card p-8 sm:p-10 relative z-10 glow-box-indigo">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 bg-gradient-to-tr from-indigo-600 via-blue-600 to-violet-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4 transform hover:rotate-6 transition-transform">
            <School className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Sign in to access your campus lost & found account.
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl space-y-2.5">
          <p className="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Fast Demo Login Buttons:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('student@college.edu', 'student123')}
              className="text-xs bg-white dark:bg-slate-800 hover:bg-indigo-100/60 text-indigo-900 dark:text-indigo-200 font-bold py-2 px-3 rounded-xl border border-indigo-200/80 dark:border-indigo-700/80 shadow-xs flex items-center justify-center gap-1 transition-all"
            >
              <span>Student Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('jegan@gmail.com', 'jegan123')}
              className="text-xs bg-amber-100/80 dark:bg-amber-950/60 hover:bg-amber-200/80 text-amber-950 dark:text-amber-300 font-extrabold py-2 px-3 rounded-xl border border-amber-300/80 dark:border-amber-700/80 shadow-xs flex items-center justify-center gap-1 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold rounded-xl animate-fade-in">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu"
                className="pl-10 w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Key className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 text-sm font-bold shadow-lg shadow-indigo-600/30 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <LogIn className="w-4 h-4 ml-1" />
          </button>
        </form>

        <div className="text-center pt-3 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline">
              Create Student Account
            </Link>
          </p>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        onSuccess={(resetEmail) => {
          setEmail(resetEmail);
          setPassword('');
        }}
      />
    </div>
  );
};

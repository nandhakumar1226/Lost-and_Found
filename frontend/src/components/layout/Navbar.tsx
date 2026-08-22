import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  Compass,
  PlusCircle,
  Clock,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Search,
  School,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <Compass className="w-4 h-4" /> },
    { name: 'Find Items', path: '/items', icon: <Search className="w-4 h-4" /> },
    { name: 'Report Lost', path: '/report-lost', icon: <PlusCircle className="w-4 h-4 text-rose-500" /> },
    { name: 'Report Found', path: '/report-found', icon: <PlusCircle className="w-4 h-4 text-emerald-500" /> },
    { name: 'My Activity', path: '/my-activity', icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 text-white rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              <School className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-black text-slate-900 dark:text-white text-lg tracking-tight block leading-none">
                CAMPUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-sky-300">LOST & FOUND</span>
              </span>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mt-0.5">
                Official College Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-1 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-md">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 dark:text-amber-300 border border-amber-300/50 dark:border-amber-700/50 hover:bg-amber-500/30 transition-all ml-1"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Admin
                </Link>
              )}
            </nav>
          )}

          {/* Desktop User Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-700">
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-xs px-4 py-2">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary text-xs px-4 py-2">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && user && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-1 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                isActive(link.path)
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin Dashboard
            </Link>
          )}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              <UserIcon className="w-4 h-4 text-indigo-500" />
              Profile ({user.name})
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

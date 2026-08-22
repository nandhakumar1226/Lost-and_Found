import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { itemsApi } from '../../services/api';
import { Item } from '../../types';
import { ItemCard } from '../../components/common/ItemCard';
import { SkeletonCard } from '../../components/common/LoadingSpinner';
import {
  School,
  Search,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  PackageCheck,
  ArrowRight,
  CheckCircle,
  Users,
  Compass,
  Zap,
  Lock,
  ChevronRight,
  Shield,
  Layers
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [recentItems, setRecentItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentItems();
  }, []);

  const fetchRecentItems = async () => {
    try {
      const response = await itemsApi.getAllItems();
      const activeItems = response.data
        .filter((item) => item.status === 'ACTIVE')
        .slice(0, 4);
      setRecentItems(activeItems);
    } catch (err) {
      console.error('Failed to fetch recent items for landing page:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* ULTRA-PREMIUM HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-8 sm:p-14 lg:p-20 shadow-2xl border border-slate-800/80">
        
        {/* Ambient Gradient Mesh Background */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-pink-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/30 via-teal-500/20 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-8">
          
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-xs font-bold text-indigo-200 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span className="tracking-wide">Official Campus Lost & Found Network</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/60" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none font-display">
            Lost Something <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300">
              on Campus?
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl leading-relaxed font-normal">
            Report lost items, list found property, and leverage automated smart token matching to re-connect lost belongings with student owners safely.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/items"
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-indigo-500 via-blue-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4 text-white" />
              Browse Campus Directory
            </Link>

            <Link
              to="/report-lost"
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-rose-600/90 hover:bg-rose-600 text-white font-extrabold text-sm rounded-2xl backdrop-blur-md border border-rose-500/50 shadow-lg shadow-rose-600/20 transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              Report Lost Item
            </Link>

            <Link
              to="/report-found"
              className="inline-flex items-center gap-2.5 px-6 py-4 bg-emerald-600/90 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-2xl backdrop-blur-md border border-emerald-500/50 shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              Report Found Item
            </Link>
          </div>
        </div>
      </section>

      {/* BENTO GRID STATS SECTION */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: <PackageCheck className="w-6 h-6 text-indigo-500" />, count: '250+', label: 'Items Processed', desc: 'Active records handled' },
          { icon: <Zap className="w-6 h-6 text-amber-400" />, count: '92%', label: 'Smart Match Accuracy', desc: 'Token similarity precision' },
          { icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />, count: '100%', label: 'Admin Verified', desc: 'Secure claim authorization' },
          { icon: <Users className="w-6 h-6 text-sky-400" />, count: '1,200+', label: 'Active Students', desc: 'Campus community users' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card p-7 space-y-3 relative group hover:border-indigo-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display">{stat.count}</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">{stat.label}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{stat.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="glass-card p-8 sm:p-14 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            <Compass className="w-4 h-4" />
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display">How Campus Recovery Works</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Designed specifically for fast, verified campus property returns.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Report Your Item',
              description: 'Fill out a quick report for what you lost or found with campus location, date, and description.',
              color: 'from-rose-500 to-pink-500 text-rose-500',
            },
            {
              step: '02',
              title: 'Automated Smart Match',
              description: 'Jaccard token similarity engine calculates matching percentage across category and description.',
              color: 'from-indigo-500 to-blue-500 text-indigo-500',
            },
            {
              step: '03',
              title: 'Claim & Verification',
              description: 'Submit proof note. Campus administrators verify authenticity before approving safe item release.',
              color: 'from-emerald-500 to-teal-500 text-emerald-500',
            },
          ].map((item) => (
            <div key={item.step} className="p-7 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-4 relative group hover:-translate-y-1 transition-all duration-300">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white font-black text-base flex items-center justify-center shadow-md font-display`}>
                {item.step}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-xl font-display">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT REPORTS PREVIEW */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display">Recent Campus Reports</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Check out the latest lost and found items reported by students across campus.
            </p>
          </div>
          <Link to="/items" className="btn-secondary text-xs flex items-center gap-2">
            View All Reports <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : recentItems.length === 0 ? (
          <div className="p-10 glass-card text-center text-slate-500 dark:text-slate-400 text-sm">
            No active reports found. Be the first to submit a report!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentItems.map((item) => (
              <ItemCard key={item.itemId} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-indigo-900/50">
        <div className="space-y-3 max-w-xl text-center md:text-left z-10">
          <h3 className="text-3xl font-black font-display tracking-tight">Ready to locate your missing item?</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Sign in with your student account or create a new account to report property and track claims.
          </p>
        </div>

        <div className="flex gap-4 shrink-0 z-10">
          <Link to="/login" className="btn-secondary text-sm px-6 py-3.5 bg-slate-800 text-white hover:bg-slate-700 border-slate-700 shadow-md">
            Sign In
          </Link>
          <Link to="/register" className="btn-primary text-sm px-6 py-3.5 shadow-xl shadow-indigo-600/30">
            Create Account
          </Link>
        </div>
      </section>

    </div>
  );
};

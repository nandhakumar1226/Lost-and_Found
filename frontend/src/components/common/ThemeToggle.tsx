import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeMode } from '../../context/ThemeContext';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { themeMode, setThemeMode } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Bright / Light', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { mode: 'dark', label: 'Dark Mode', icon: <Moon className="w-4 h-4 text-indigo-400" /> },
    { mode: 'system', label: 'System Default', icon: <Monitor className="w-4 h-4 text-slate-400" /> },
  ];

  const currentOption = options.find((o) => o.mode === themeMode) || options[2];

  return (
    <div ref={menuRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        title="Change Theme Mode"
      >
        {currentOption.icon}
        <span className="hidden sm:inline">{currentOption.label}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50 animate-fade-in">
          {options.map((opt) => (
            <button
              key={opt.mode}
              type="button"
              onClick={() => {
                setThemeMode(opt.mode);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors ${
                themeMode === opt.mode
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

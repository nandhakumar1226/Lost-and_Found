import React from 'react';

interface BadgeProps {
  status: string;
  type?: 'type' | 'status';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, type = 'status', className = '' }) => {
  let colorStyle = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';

  if (type === 'type') {
    if (status === 'LOST') {
      colorStyle = 'bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold shadow-sm shadow-rose-500/30 border-transparent';
    } else if (status === 'FOUND') {
      colorStyle = 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold shadow-sm shadow-emerald-500/30 border-transparent';
    }
  } else {
    switch (status) {
      case 'ACTIVE':
        colorStyle = 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 font-bold';
        break;
      case 'CLAIMED':
        colorStyle = 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 font-bold';
        break;
      case 'RETURNED':
        colorStyle = 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 font-bold';
        break;
      case 'PENDING':
        colorStyle = 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 font-bold';
        break;
      case 'APPROVED':
        colorStyle = 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 font-bold';
        break;
      case 'REJECTED':
        colorStyle = 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800 font-bold';
        break;
      case 'CLOSED':
        colorStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
        break;
      default:
        colorStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider border ${colorStyle} ${className}`}>
      {status}
    </span>
  );
};

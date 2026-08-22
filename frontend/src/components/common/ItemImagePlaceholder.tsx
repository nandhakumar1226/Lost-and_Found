import React from 'react';
import { Package, Laptop, BookOpen, Key, Shield, Shirt, HelpCircle, FileText, Sparkles } from 'lucide-react';

interface ItemImagePlaceholderProps {
  imageUrl?: string;
  name: string;
  category?: string;
  type?: 'LOST' | 'FOUND';
  className?: string;
}

export const ItemImagePlaceholder: React.FC<ItemImagePlaceholderProps> = ({
  imageUrl,
  name,
  category,
  type = 'LOST',
  className = 'w-full h-full',
}) => {
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [imageUrl]);

  const getCategoryDetails = (cat?: string) => {
    const lower = (cat || '').toLowerCase();
    if (lower.includes('electronic') || lower.includes('laptop') || lower.includes('phone')) {
      return { icon: <Laptop className="w-9 h-9" />, label: 'Electronics', gradient: 'from-blue-500/20 via-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400' };
    }
    if (lower.includes('book') || lower.includes('document')) {
      return { icon: <BookOpen className="w-9 h-9" />, label: 'Books & Docs', gradient: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400' };
    }
    if (lower.includes('key')) {
      return { icon: <Key className="w-9 h-9" />, label: 'Keys & Access', gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20 text-emerald-600 dark:text-emerald-400' };
    }
    if (lower.includes('accessory') || lower.includes('wallet')) {
      return { icon: <Shield className="w-9 h-9" />, label: 'Personal Items', gradient: 'from-violet-500/20 via-purple-500/20 to-pink-500/20 text-violet-600 dark:text-violet-400' };
    }
    if (lower.includes('clothing')) {
      return { icon: <Shirt className="w-9 h-9" />, label: 'Apparel', gradient: 'from-pink-500/20 via-rose-500/20 to-red-500/20 text-rose-600 dark:text-rose-400' };
    }
    return { icon: <Package className="w-9 h-9" />, label: category || 'Campus Property', gradient: 'from-indigo-500/20 via-sky-500/20 to-blue-500/20 text-blue-600 dark:text-blue-400' };
  };

  if (imageUrl && !imgError) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${className} object-cover`}
        onError={() => setImgError(true)}
      />
    );
  }

  const details = getCategoryDetails(category);
  const isLost = type === 'LOST';

  return (
    <div className={`${className} relative overflow-hidden bg-gradient-to-br ${details.gradient} flex flex-col items-center justify-center p-6 text-center select-none group/placeholder`}>
      {/* Ambient background glow orb */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/20 dark:bg-white/5 rounded-full blur-2xl pointer-events-none group-hover/placeholder:scale-125 transition-transform duration-500" />
      
      {/* Icon Badge with subtle pulse */}
      <div className="relative mb-3 p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-md backdrop-blur-md border border-white/60 dark:border-slate-700/60 transform group-hover/placeholder:scale-110 transition-transform duration-300">
        {details.icon}
        <div className="absolute -top-1 -right-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        </div>
      </div>

      <span className="text-[11px] font-extrabold tracking-widest uppercase text-slate-800 dark:text-slate-200 font-display">
        No Photo Attached
      </span>

      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 mt-0.5 opacity-90 max-w-[160px] truncate">
        {details.label}
      </span>
    </div>
  );
};

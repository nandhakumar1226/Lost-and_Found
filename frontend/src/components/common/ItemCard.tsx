import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../../types';
import { Badge } from './Badge';
import { ItemImagePlaceholder } from './ItemImagePlaceholder';
import { MapPin, Calendar, ArrowRight, Tag, Clock } from 'lucide-react';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="college-card flex flex-col group hover:-translate-y-1.5 transition-all duration-300">
      
      {/* Top Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <ItemImagePlaceholder
          imageUrl={item.imageUrl}
          name={item.name}
          category={item.category}
          type={item.type}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />
        
        {/* Status Badges Overlay */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          <Badge status={item.type} type="type" />
          <Badge status={item.status} type="status" />
        </div>

        {/* Category Pill */}
        <div className="absolute top-3 right-3 z-10 bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-white/10">
          <Tag className="w-3 h-3 text-indigo-400" />
          {item.category}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 font-display">
            {item.name}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed font-normal">
            {item.description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate font-medium">{item.location}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center text-[11px] font-mono text-slate-400 dark:text-slate-500 gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{item.reportedDate}</span>
            </div>

            <Link
              to={`/items/${item.itemId}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group/link"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

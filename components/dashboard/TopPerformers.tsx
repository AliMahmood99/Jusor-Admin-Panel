/**
 * TopPerformers Component
 * Displays top performing influencers and businesses
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';

interface Influencer {
  name: string;
  handle: string;
  campaigns: number;
  earnings: number;
  rating: number;
}

interface Business {
  name: string;
  campaigns: number;
  spent: number;
  rating: number;
}

interface TopPerformersProps {
  type: 'influencers' | 'businesses';
  data: Influencer[] | Business[];
  onViewAll?: () => void;
}

export default function TopPerformers({ type, data, onViewAll }: TopPerformersProps) {
  const title = type === 'influencers' ? 'Top Influencers' : 'Top Businesses';
  const gradientColor = type === 'influencers' ? 'from-violet-500 to-violet-600' : 'from-blue-500 to-blue-600';
  const shadowColor = type === 'influencers' ? 'shadow-violet-500/25' : 'shadow-blue-500/25';

  const getInitials = (name: string, maxChars = 2) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, maxChars)
      .join('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <button
          onClick={onViewAll}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          View All <Icons.arrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="space-y-3">
        {type === 'influencers'
          ? (data as Influencer[]).map((inf, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white font-semibold text-sm shadow-lg ${shadowColor}`}
                >
                  {getInitials(inf.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{inf.name}</p>
                  <p className="text-xs text-slate-500">{inf.handle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    SAR {(inf.earnings / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-slate-500">{inf.campaigns} campaigns</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50">
                  <Icons.star className="w-3 h-3 text-amber-500" />
                  <span className="text-xs font-medium text-amber-700">{inf.rating}</span>
                </div>
              </div>
            ))
          : (data as Business[]).map((biz, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center text-white font-semibold text-sm shadow-lg ${shadowColor}`}
                >
                  {getInitials(biz.name, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{biz.name}</p>
                  <p className="text-xs text-slate-500">{biz.campaigns} campaigns</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    SAR {(biz.spent / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-slate-500">Total spent</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50">
                  <Icons.star className="w-3 h-3 text-amber-500" />
                  <span className="text-xs font-medium text-amber-700">{biz.rating}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

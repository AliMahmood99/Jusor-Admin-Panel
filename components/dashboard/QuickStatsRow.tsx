/**
 * Quick Stats Row Component
 * Displays quick statistics in a row
 */

import React from 'react';
import { Icons } from '@/components/common/Icons';
import { QUICK_STATS } from '@/lib/constants';

export default function QuickStatsRow() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {QUICK_STATS.map((stat, i) => {
        const IconComp = Icons[stat.icon as keyof typeof Icons];
        return (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              {IconComp && <IconComp className="w-4 h-4 text-gray-400" />}
              <span className={`text-xs font-medium ${stat.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}

/**
 * MetricCard Component
 * Displays key performance metrics with trend indicators
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';

interface MetricCardProps {
  icon: keyof typeof Icons;
  label: string;
  value: number | string;
  change: number;
  changeLabel?: string;
  prefix?: string;
  color?: 'blue' | 'emerald' | 'amber' | 'violet';
}

export default function MetricCard({
  icon,
  label,
  value,
  change,
  changeLabel,
  prefix = '',
  color = 'blue'
}: MetricCardProps) {
  const Icon = Icons[icon];
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? Icons.trendingUp : Icons.trendingDown;

  const colorClasses = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', ring: 'ring-blue-100' },
    emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', ring: 'ring-emerald-100' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', ring: 'ring-amber-100' },
    violet: { bg: 'bg-violet-50', icon: 'text-violet-600', ring: 'ring-violet-100' },
  };
  const c = colorClasses[color];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${c.bg} ring-4 ${c.ring} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
          isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
        }`}>
          <TrendIcon className="w-3 h-3" />
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
      {changeLabel && <p className="text-xs text-slate-400 mt-0.5">{changeLabel}</p>}
    </div>
  );
}

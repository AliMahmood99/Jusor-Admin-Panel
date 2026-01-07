/**
 * PendingActionCard Component
 * Displays pending actions that require admin attention
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';

interface PendingActionCardProps {
  icon: keyof typeof Icons;
  title: string;
  count: number;
  urgent: number;
  subtitle: string;
  buttonText: string;
  color: 'violet' | 'rose' | 'blue' | 'amber';
  onClick: () => void;
}

export default function PendingActionCard({
  icon,
  title,
  count,
  urgent,
  subtitle,
  buttonText,
  color,
  onClick
}: PendingActionCardProps) {
  const Icon = Icons[icon];

  const colorClasses = {
    violet: {
      bg: 'bg-violet-500',
      light: 'bg-violet-50',
      text: 'text-violet-600',
      border: 'border-violet-200',
      hover: 'hover:bg-violet-600',
      shadow: 'shadow-violet-500/25'
    },
    rose: {
      bg: 'bg-rose-500',
      light: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-200',
      hover: 'hover:bg-rose-600',
      shadow: 'shadow-rose-500/25'
    },
    blue: {
      bg: 'bg-blue-500',
      light: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      hover: 'hover:bg-blue-600',
      shadow: 'shadow-blue-500/25'
    },
    amber: {
      bg: 'bg-amber-500',
      light: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-200',
      hover: 'hover:bg-amber-600',
      shadow: 'shadow-amber-500/25'
    },
  };
  const c = colorClasses[color];

  return (
    <div className={`bg-white rounded-2xl border ${c.border} p-5 hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${c.light} flex items-center justify-center shrink-0`}>
          <Icon className={`w-6 h-6 ${c.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            {urgent > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold">
                {urgent} URGENT
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-slate-900">{count}</p>
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className={`w-full mt-4 h-10 rounded-xl ${c.bg} ${c.hover} text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-lg ${c.shadow}`}
      >
        {buttonText}
        <Icons.arrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

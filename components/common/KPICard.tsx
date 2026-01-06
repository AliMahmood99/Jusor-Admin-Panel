/**
 * KPI Card Component
 * Reusable card for displaying key performance indicators
 */

import React from 'react';
import { Icons } from './Icons';
import type { KPICardProps } from '@/types';

export default function KPICard({
  title,
  value,
  change,
  changeType,
  icon,
  iconBg,
  subtitle,
}: KPICardProps) {
  const IconComponent = Icons[icon as keyof typeof Icons];
  const isPositive = changeType === 'positive';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
          {IconComponent && <IconComponent className="w-5 h-5 text-white" />}
        </div>
        {change && (
          <div className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isPositive ? (
              <Icons.arrowUp className="w-3 h-3" />
            ) : (
              <Icons.arrowDown className="w-3 h-3" />
            )}
            {change}
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{title}</p>
        {subtitle && <p className="text-[10px] text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

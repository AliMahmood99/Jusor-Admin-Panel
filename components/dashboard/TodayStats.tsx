/**
 * TodayStats Component
 * Displays today's activity statistics
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';

interface TodayStatsProps {
  data: {
    newUsers: { influencers: number; businesses: number };
    campaignsStarted: number;
    campaignsCompleted: number;
    paymentsReleased: { count: number; amount: number };
    disputesResolved: number;
  };
}

export default function TodayStats({ data }: TodayStatsProps) {
  const stats = [
    {
      label: 'New Users',
      value: data.newUsers.influencers + data.newUsers.businesses,
      detail: `${data.newUsers.influencers} influencers, ${data.newUsers.businesses} businesses`,
      icon: 'userPlus' as keyof typeof Icons,
      color: 'blue' as const
    },
    {
      label: 'Campaigns Started',
      value: data.campaignsStarted,
      detail: `${data.campaignsCompleted} completed`,
      icon: 'play' as keyof typeof Icons,
      color: 'emerald' as const
    },
    {
      label: 'Payments Released',
      value: `SAR ${(data.paymentsReleased.amount / 1000).toFixed(0)}K`,
      detail: `${data.paymentsReleased.count} transactions`,
      icon: 'dollarSign' as keyof typeof Icons,
      color: 'emerald' as const
    },
    {
      label: 'Disputes Resolved',
      value: data.disputesResolved,
      detail: 'Today',
      icon: 'checkCircle' as keyof typeof Icons,
      color: 'violet' as const
    },
  ];

  const colorClasses: Record<'blue' | 'emerald' | 'violet', string> = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    violet: 'bg-violet-50 text-violet-600',
  };

  const formatDate = () => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Today's Activity</h3>
        <span className="text-xs text-slate-400">{formatDate()}</span>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = Icons[stat.icon];
          return (
            <div key={i} className="text-center">
              <div className={`w-10 h-10 rounded-xl ${colorClasses[stat.color]} flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              <p className="text-[10px] text-slate-400">{stat.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

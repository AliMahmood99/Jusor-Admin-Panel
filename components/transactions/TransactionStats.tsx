/**
 * Transaction Stats Component
 * Displays key financial metrics at the top of transactions page
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';
import { formatCurrency } from '@/lib/transactionUtils';
import type { TransactionStats as StatsType } from '@/lib/mockTransactionData';

interface TransactionStatsProps {
  stats: StatsType;
}

export default function TransactionStats({ stats }: TransactionStatsProps) {
  const statsConfig = [
    {
      label: 'Total Volume (MTD)',
      value: `SAR ${formatCurrency(stats.totalVolume)}`,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Icons.dollarSign,
      color: 'blue' as const,
    },
    {
      label: "Today's Volume",
      value: `SAR ${formatCurrency(stats.todayVolume)}`,
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Icons.trendingUp,
      color: 'emerald' as const,
    },
    {
      label: 'Pending Transactions',
      value: `SAR ${formatCurrency(stats.pendingAmount)}`,
      count: '12 txns',
      icon: Icons.clock,
      color: 'amber' as const,
    },
    {
      label: 'Platform Revenue (MTD)',
      value: `SAR ${formatCurrency(stats.monthlyRevenue)}`,
      change: '+18.4%',
      changeType: 'positive' as const,
      icon: Icons.receipt,
      color: 'purple' as const,
    },
  ];

  const colorClasses = {
    blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', text: 'text-blue-600' },
    emerald: { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', text: 'text-emerald-600' },
    amber: { bg: 'bg-amber-50', iconBg: 'bg-amber-100', text: 'text-amber-600' },
    purple: { bg: 'bg-purple-50', iconBg: 'bg-purple-100', text: 'text-purple-600' },
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {statsConfig.map((stat, index) => {
        const colors = colorClasses[stat.color];
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.iconBg} group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              {stat.change && (
                <span className={`text-xs font-medium flex items-center gap-1 ${stat.changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.changeType === 'positive' ? <Icons.trendingUp className="w-3 h-3" /> : <Icons.trendingDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              )}
              {stat.count && (
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                  {stat.count}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}

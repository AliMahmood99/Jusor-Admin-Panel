/**
 * PayoutStats Component
 * Display key statistics for payout management
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';

interface PayoutStatsProps {
  pendingCount: number;
  todayProcessed: number;
  todayAmount: number;
  totalPendingAmount: number;
  oldestWaitingHours: number;
}

const formatCurrency = (amount: number) => `SAR ${amount.toLocaleString()}`;

export default function PayoutStats({
  pendingCount,
  todayProcessed,
  todayAmount,
  totalPendingAmount,
  oldestWaitingHours
}: PayoutStatsProps) {
  const isUrgent = oldestWaitingHours >= 72;

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {/* Pending Payouts */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
            <Icons.clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Pending</p>
            <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
          </div>
        </div>
        <p className="text-xs text-slate-400">payouts waiting</p>
      </div>

      {/* Today Processed */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Icons.checkCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Today</p>
            <p className="text-2xl font-bold text-slate-900">{todayProcessed}</p>
          </div>
        </div>
        <p className="text-xs text-emerald-600 font-medium">{formatCurrency(todayAmount)} processed</p>
      </div>

      {/* Total Pending Amount */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
            <Icons.wallet className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Pending</p>
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalPendingAmount)}</p>
          </div>
        </div>
        <p className="text-xs text-slate-400">to be transferred</p>
      </div>

      {/* Oldest Waiting */}
      <div className={`bg-white rounded-2xl border p-5 hover:shadow-lg transition-all ${
        isUrgent ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
            isUrgent ? 'bg-rose-100' : 'bg-slate-100'
          }`}>
            <Icons.alertTriangle className={`w-5 h-5 ${
              isUrgent ? 'text-rose-600' : 'text-slate-500'
            }`} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Oldest</p>
            <p className={`text-2xl font-bold ${
              isUrgent ? 'text-rose-600' : 'text-slate-900'
            }`}>
              {oldestWaitingHours < 24 ? `${oldestWaitingHours}h` : `${Math.floor(oldestWaitingHours / 24)}d ${oldestWaitingHours % 24}h`}
            </p>
          </div>
        </div>
        <p className={`text-xs font-medium ${
          isUrgent ? 'text-rose-600' : 'text-slate-400'
        }`}>
          {isUrgent ? '⚠️ Requires immediate attention' : 'waiting time'}
        </p>
      </div>
    </div>
  );
}

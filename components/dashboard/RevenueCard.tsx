/**
 * Revenue Card Component
 * Displays total revenue with trend chart
 */

import React from 'react';
import { Icons } from '@/components/common/Icons';
import MiniChart from './MiniChart';
import { REVENUE_CHART_DATA } from '@/lib/constants';

export default function RevenueCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 col-span-2">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">SAR 1,247,850</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600">
              <Icons.arrowUp className="w-3 h-3" />
              +18.2%
            </span>
            <span className="text-xs text-gray-400">vs last period</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-400">Commission Earned</p>
            <p className="text-sm font-semibold text-gray-700">SAR 74,871</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Icons.trendingUp className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-24">
        <MiniChart data={REVENUE_CHART_DATA} color="#10B981" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-gray-500">Platform (6%): SAR 74,871</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-500">In Escrow: SAR 234,500</span>
          </div>
        </div>
        <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
          View Report →
        </button>
      </div>
    </div>
  );
}

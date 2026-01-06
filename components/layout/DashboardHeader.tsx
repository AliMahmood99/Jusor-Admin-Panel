/**
 * Dashboard Header Component
 * Top header with controls and actions
 */

'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/common/Icons';
import { DATE_RANGES } from '@/lib/constants';

export default function DashboardHeader() {
  const [dateRange, setDateRange] = useState<typeof DATE_RANGES[number]>('7d');

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 sticky top-0 z-10">
      <div>
        <h1 className="text-base font-semibold text-gray-900">Dashboard</h1>
        <p className="text-xs text-gray-500">Welcome back, Ahmed. Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Date Range Selector */}
        <div className="flex items-center h-8 rounded-lg border border-gray-200 bg-gray-50 p-0.5">
          {DATE_RANGES.map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`h-7 px-3 rounded-md text-xs font-medium transition-colors
                ${dateRange === range ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Export Button */}
        <button className="h-8 px-3 rounded-lg border border-gray-200 flex items-center gap-1.5 hover:bg-gray-50 text-xs font-medium text-gray-600">
          <Icons.download className="w-3.5 h-3.5" /> Export
        </button>

        {/* Refresh Button */}
        <button className="h-8 px-3 rounded-lg border border-gray-200 flex items-center gap-1.5 hover:bg-gray-50 text-xs font-medium text-gray-600">
          <Icons.refresh className="w-3.5 h-3.5" /> Refresh
        </button>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
          <Icons.bell className="w-4 h-4 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>
      </div>
    </header>
  );
}

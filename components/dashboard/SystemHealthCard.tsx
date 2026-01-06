/**
 * System Health Card Component
 * Displays system health metrics
 */

import React from 'react';
import { SYSTEM_HEALTH } from '@/lib/constants';

export default function SystemHealthCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">System Health</h3>
        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          All Systems Operational
        </span>
      </div>

      <div className="space-y-3">
        {SYSTEM_HEALTH.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${item.status === 'good' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

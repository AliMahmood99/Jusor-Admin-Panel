/**
 * Campaign Status Card Component
 * Shows campaign distribution by status
 */

import React from 'react';
import { CAMPAIGN_STATUSES } from '@/lib/constants';

export default function CampaignStatusCard() {
  const totalCampaigns = CAMPAIGN_STATUSES.reduce((sum, status) => sum + status.count, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Campaign Status</h3>
        <span className="text-xs text-gray-400">{totalCampaigns} total</span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 rounded-full bg-gray-100 flex overflow-hidden mb-4">
        {CAMPAIGN_STATUSES.map((status, i) => (
          <div
            key={i}
            className={`${status.color} ${i === 0 ? 'rounded-l-full' : ''} ${i === CAMPAIGN_STATUSES.length - 1 ? 'rounded-r-full' : ''}`}
            style={{ width: status.width }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {CAMPAIGN_STATUSES.map((status, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${status.color}`}></div>
              <span className="text-xs text-gray-600">{status.label}</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">{status.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

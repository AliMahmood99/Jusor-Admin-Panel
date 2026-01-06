/**
 * Top Performers Card Component
 * Shows top influencers by earnings
 */

import React from 'react';
import { TOP_PERFORMERS } from '@/lib/constants';

export default function TopPerformersCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Top Influencers</h3>
        <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {TOP_PERFORMERS.map((performer, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 w-4">#{i + 1}</span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold text-xs">{performer.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{performer.name}</p>
              <p className="text-xs text-gray-400">{performer.handle}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{performer.earnings}</p>
              <p className="text-xs text-gray-400">{performer.campaigns} campaigns</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

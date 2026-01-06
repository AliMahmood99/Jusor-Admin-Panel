/**
 * User Growth Card Component
 * Displays user growth statistics
 */

import React from 'react';
import { Icons } from '@/components/common/Icons';
import { USER_GROWTH_DATA } from '@/lib/constants';

export default function UserGrowthCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">User Growth</h3>
        <span className="text-xs text-gray-400">Last 30 days</span>
      </div>

      <div className="space-y-4">
        {/* Influencers */}
        <div className="p-3 rounded-lg bg-gradient-to-r from-violet-50 to-violet-100/50 border border-violet-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center">
                <Icons.user className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Influencers</span>
            </div>
            <span className="text-xs font-medium text-emerald-600">
              {USER_GROWTH_DATA.influencers.growth}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {USER_GROWTH_DATA.influencers.total.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">
              +{USER_GROWTH_DATA.influencers.new} new
            </span>
          </div>
        </div>

        {/* Businesses */}
        <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <Icons.building className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Businesses</span>
            </div>
            <span className="text-xs font-medium text-emerald-600">
              {USER_GROWTH_DATA.businesses.growth}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {USER_GROWTH_DATA.businesses.total.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">
              +{USER_GROWTH_DATA.businesses.new} new
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

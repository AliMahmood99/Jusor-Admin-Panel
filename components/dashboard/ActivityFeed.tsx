/**
 * Activity Feed Component
 * Shows recent platform activities
 */

import React from 'react';
import { Icons } from '@/components/common/Icons';
import { RECENT_ACTIVITIES } from '@/lib/constants';

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {RECENT_ACTIVITIES.map((activity, i) => {
          const IconComp = Icons[activity.icon as keyof typeof Icons];
          return (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center shrink-0`}>
                {IconComp && <IconComp className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{activity.user}</span>
                  {' '}
                  {activity.action}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

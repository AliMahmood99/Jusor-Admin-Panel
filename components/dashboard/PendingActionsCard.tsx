/**
 * Pending Actions Card Component
 * Displays items requiring admin attention
 */

import React from 'react';
import { Icons } from '@/components/common/Icons';
import { PENDING_ACTIONS } from '@/lib/constants';

export default function PendingActionsCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Pending Actions</h3>
        <span className="text-xs text-gray-400">Requires attention</span>
      </div>

      <div className="space-y-2.5">
        {PENDING_ACTIONS.map((action, i) => {
          const IconComp = Icons[action.icon as keyof typeof Icons];
          return (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                  {IconComp && <IconComp className="w-4 h-4 text-white" />}
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`min-w-[24px] h-6 px-2 rounded-full text-xs font-semibold flex items-center justify-center text-white ${action.color}`}>
                  {action.count}
                </span>
                {action.urgent && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

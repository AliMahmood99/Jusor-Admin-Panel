/**
 * Dispute Priority Badge Component
 * Displays dispute priority with appropriate styling
 */

import React from 'react';
import type { DisputePriority } from '@/types';

interface DisputePriorityBadgeProps {
  priority: DisputePriority;
}

export default function DisputePriorityBadge({ priority }: DisputePriorityBadgeProps) {
  const priorityConfig = {
    low: { label: 'Low', color: 'text-slate-500', bg: 'bg-slate-50', dot: 'bg-slate-400' },
    medium: { label: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50', dot: 'bg-amber-500' },
    high: { label: 'High', color: 'text-rose-600', bg: 'bg-rose-50', dot: 'bg-rose-500' },
    critical: { label: 'Critical', color: 'text-purple-600', bg: 'bg-purple-50', dot: 'bg-purple-500' },
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${config.bg} ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </div>
  );
}

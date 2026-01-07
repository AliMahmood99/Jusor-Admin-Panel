/**
 * Campaign Status Badge Component
 * Displays campaign main status with appropriate styling
 */

'use client';

import React from 'react';
import type { CampaignMainStatus } from '@/types';

interface CampaignStatusBadgeProps {
  status: CampaignMainStatus;
}

const CampaignStatusBadge = React.memo(({ status }: CampaignStatusBadgeProps) => {
  const configs = {
    draft: {
      label: 'Draft',
      bg: 'bg-gray-500',
      text: 'text-white',
    },
    active: {
      label: 'Active',
      bg: 'bg-emerald-500',
      text: 'text-white',
    },
    paused: {
      label: 'Paused',
      bg: 'bg-amber-500',
      text: 'text-white',
    },
    completed: {
      label: 'Completed',
      bg: 'bg-slate-500',
      text: 'text-white',
    },
    cancelled: {
      label: 'Cancelled',
      bg: 'bg-slate-400',
      text: 'text-white',
    },
  };

  const config = configs[status] || configs.active;

  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
});

CampaignStatusBadge.displayName = 'CampaignStatusBadge';

export default CampaignStatusBadge;

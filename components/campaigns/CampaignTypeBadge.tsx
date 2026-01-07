/**
 * Campaign Type Badge Component
 * Displays campaign type (public/invite/hybrid) with icons
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';
import type { CampaignType } from '@/types';

interface CampaignTypeBadgeProps {
  type: CampaignType;
}

const CampaignTypeBadge = React.memo(({ type }: CampaignTypeBadgeProps) => {
  const configs = {
    public: {
      label: 'Public',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      icon: Icons.globe,
    },
    invite: {
      label: 'Invite Only',
      bg: 'bg-violet-50',
      text: 'text-violet-600',
      icon: Icons.lock,
    },
    hybrid: {
      label: 'Hybrid',
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      icon: Icons.unlock,
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
});

CampaignTypeBadge.displayName = 'CampaignTypeBadge';

export default CampaignTypeBadge;

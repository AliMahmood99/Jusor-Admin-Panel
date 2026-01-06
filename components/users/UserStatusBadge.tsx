/**
 * User Status Badge Component
 * Displays user status with appropriate styling
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';
import type { UserStatus } from '@/types';

interface UserStatusBadgeProps {
  status: UserStatus;
}

export default function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const configs = {
    verified: {
      label: 'Verified',
      bg: 'bg-emerald-500',
      text: 'text-white',
      icon: Icons.shieldCheck,
    },
    pending: {
      label: 'Pending',
      bg: 'bg-amber-500',
      text: 'text-white',
      icon: Icons.clock,
    },
    suspended: {
      label: 'Suspended',
      bg: 'bg-rose-500',
      text: 'text-white',
      icon: Icons.ban,
    },
    banned: {
      label: 'Banned',
      bg: 'bg-gray-700',
      text: 'text-white',
      icon: Icons.shieldX,
    },
  };

  const config = configs[status] || configs.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${config.bg} ${config.text}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

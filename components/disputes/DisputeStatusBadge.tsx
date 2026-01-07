/**
 * Dispute Status Badge Component
 * Displays dispute status with appropriate styling
 */

import React from 'react';
import type { DisputeStatus } from '@/types';

interface DisputeStatusBadgeProps {
  status: DisputeStatus;
}

const DisputeStatusBadge = React.memo(({ status }: DisputeStatusBadgeProps) => {
  const statusConfig = {
    open: { label: 'Open', bg: 'bg-rose-500', text: 'text-white' },
    in_review: { label: 'In Review', bg: 'bg-blue-500', text: 'text-white' },
    resolved: { label: 'Resolved', bg: 'bg-emerald-500', text: 'text-white' },
    closed: { label: 'Closed', bg: 'bg-gray-500', text: 'text-white' },
  };

  const config = statusConfig[status] || statusConfig.open;

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
});

DisputeStatusBadge.displayName = 'DisputeStatusBadge';

export default DisputeStatusBadge;

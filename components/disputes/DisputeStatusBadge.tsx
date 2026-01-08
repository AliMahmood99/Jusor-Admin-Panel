/**
 * Dispute Status Badge Component
 * Displays dispute status with appropriate styling
 */

import React from 'react';
import type { DisputeStatus } from '@/types';
import { getStatusConfig } from '@/lib/disputeUtils';

interface DisputeStatusBadgeProps {
  status: DisputeStatus;
}

const DisputeStatusBadge = React.memo(({ status }: DisputeStatusBadgeProps) => {
  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold border ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
      {config.label}
    </span>
  );
});

DisputeStatusBadge.displayName = 'DisputeStatusBadge';

export default DisputeStatusBadge;

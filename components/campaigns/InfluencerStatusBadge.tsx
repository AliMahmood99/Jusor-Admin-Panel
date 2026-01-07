/**
 * Influencer Campaign Status Badge Component
 * Displays influencer status in campaign with appropriate styling
 */

'use client';

import React from 'react';
import type { InfluencerCampaignStatus } from '@/types';

interface InfluencerStatusBadgeProps {
  status: InfluencerCampaignStatus;
}

const InfluencerStatusBadge = React.memo(({ status }: InfluencerStatusBadgeProps) => {
  const configs = {
    applied: { label: 'Applied', bg: 'bg-slate-100', text: 'text-slate-600' },
    invited: { label: 'Invited', bg: 'bg-slate-100', text: 'text-slate-600' },
    accepted: { label: 'Accepted', bg: 'bg-blue-100', text: 'text-blue-700' },
    rejected: { label: 'Rejected', bg: 'bg-slate-100', text: 'text-slate-500' },
    awaiting_signature: { label: 'Awaiting Signature', bg: 'bg-amber-100', text: 'text-amber-700' },
    signature_expired: { label: 'Signature Expired', bg: 'bg-rose-100', text: 'text-rose-600' },
    signed: { label: 'Signed', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    creating_content: { label: 'Creating Content', bg: 'bg-blue-100', text: 'text-blue-700' },
    content_submitted: { label: 'Content Submitted', bg: 'bg-amber-100', text: 'text-amber-700' },
    content_revision: { label: 'Revision Requested', bg: 'bg-orange-100', text: 'text-orange-700' },
    content_approved: { label: 'Content Approved', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    completed: { label: 'Completed', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    disputed: { label: 'Disputed', bg: 'bg-rose-100', text: 'text-rose-600' },
  };

  const config = configs[status] || configs.applied;

  return (
    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
});

InfluencerStatusBadge.displayName = 'InfluencerStatusBadge';

export default InfluencerStatusBadge;

/**
 * ActivityItem Component
 * Displays recent activity in the system
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';

export interface Activity {
  id: number;
  type: 'verification_approved' | 'payment_released' | 'dispute_opened' | 'dispute_resolved' |
        'campaign_started' | 'withdrawal_processed' | 'content_approved' | 'user_registered';
  time: string;
  user?: string;
  userType?: string;
  campaign?: string;
  amount?: number;
  influencer?: string;
  disputeId?: string;
  business?: string;
  budget?: number;
  admin?: string;
  resolution?: string;
}

interface ActivityItemProps {
  activity: Activity;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  const typeConfig: Record<Activity['type'], { icon: keyof typeof Icons; bg: string; color: string }> = {
    verification_approved: { icon: 'shieldCheck', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    payment_released: { icon: 'dollarSign', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    dispute_opened: { icon: 'scale', bg: 'bg-rose-50', color: 'text-rose-600' },
    dispute_resolved: { icon: 'checkCircle', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    campaign_started: { icon: 'play', bg: 'bg-blue-50', color: 'text-blue-600' },
    withdrawal_processed: { icon: 'wallet', bg: 'bg-violet-50', color: 'text-violet-600' },
    content_approved: { icon: 'image', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    user_registered: { icon: 'userPlus', bg: 'bg-blue-50', color: 'text-blue-600' },
  };

  const config = typeConfig[activity.type] || { icon: 'activity' as keyof typeof Icons, bg: 'bg-slate-100', color: 'text-slate-600' };
  const Icon = Icons[config.icon];

  const getDescription = () => {
    switch (activity.type) {
      case 'verification_approved':
        return (
          <>
            <span className="font-medium text-slate-900">{activity.user}</span> verified as {activity.userType}
          </>
        );
      case 'payment_released':
        return (
          <>
            SAR {activity.amount?.toLocaleString()} released to{' '}
            <span className="font-medium text-slate-900">{activity.influencer}</span>
          </>
        );
      case 'dispute_opened':
        return (
          <>
            New dispute <span className="font-medium text-rose-600">{activity.disputeId}</span> • SAR{' '}
            {activity.amount?.toLocaleString()}
          </>
        );
      case 'dispute_resolved':
        return (
          <>
            <span className="font-medium text-slate-900">{activity.disputeId}</span> resolved •{' '}
            {activity.resolution}
          </>
        );
      case 'campaign_started':
        return (
          <>
            <span className="font-medium text-slate-900">{activity.campaign}</span> by {activity.business}
          </>
        );
      case 'withdrawal_processed':
        return (
          <>
            SAR {activity.amount?.toLocaleString()} sent to{' '}
            <span className="font-medium text-slate-900">{activity.user}</span>
          </>
        );
      case 'content_approved':
        return (
          <>
            Content from <span className="font-medium text-slate-900">{activity.influencer}</span> approved
          </>
        );
      case 'user_registered':
        return (
          <>
            <span className="font-medium text-slate-900">{activity.user}</span> joined as {activity.userType}
          </>
        );
      default:
        return 'Activity';
    }
  };

  return (
    <div className="flex items-start gap-3 py-3">
      <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-600 leading-relaxed">{getDescription()}</p>
        <p className="text-xs text-slate-400 mt-0.5">
          {activity.time}
          {activity.admin && ` • by ${activity.admin}`}
        </p>
      </div>
    </div>
  );
}

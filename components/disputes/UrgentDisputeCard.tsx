/**
 * Urgent Dispute Card Component
 * Displays high-priority disputes that need immediate attention
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';
import type { Dispute } from '@/types';
import { formatDeadline, getPriorityColor } from '@/lib/disputeUtils';

interface UrgentDisputeCardProps {
  dispute: Dispute;
  onSelect: () => void;
}

export default function UrgentDisputeCard({ dispute, onSelect }: UrgentDisputeCardProps) {
  const priorityColor = getPriorityColor(dispute.priority);
  const isUrgent = dispute.hoursRemaining < 48;

  return (
    <div
      onClick={onSelect}
      className="relative bg-white rounded-2xl border-2 border-rose-200 p-6 hover:border-rose-300 hover:shadow-lg transition-all cursor-pointer group"
    >
      {/* Priority Badge with Pulse */}
      <div className="absolute top-4 right-4">
        <span className={`relative inline-flex px-3 py-1.5 rounded-full text-xs font-bold bg-${priorityColor}-500 text-white uppercase`}>
          {isUrgent && (
            <span className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-75"></span>
          )}
          <span className="relative">{dispute.priority}</span>
        </span>
      </div>

      {/* Header */}
      <div className="pr-24">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
            <Icons.alert className="w-5 h-5 text-rose-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900 mb-1">{dispute.title}</h3>
            <p className="text-xs text-slate-500 font-mono">{dispute.id}</p>
          </div>
        </div>

        {/* Reason Preview */}
        <p className="text-sm text-slate-600 line-clamp-2 mb-4">
          {dispute.reason}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">Amount</p>
            <p className="text-sm font-semibold text-slate-900">
              SAR {dispute.amountInDispute.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Time Remaining</p>
            <p className={`text-sm font-semibold ${isUrgent ? 'text-rose-600' : 'text-slate-900'}`}>
              {formatDeadline(dispute.deadline, dispute.hoursRemaining)}
            </p>
          </div>
        </div>

        {/* Campaign */}
        <div className="flex items-center gap-2 mb-4">
          <Icons.megaphone className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-600">{dispute.campaign.name}</span>
        </div>
      </div>

      {/* Action Button - Hover Reveal */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <button className="w-full py-2.5 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all">
          Review Now
          <Icons.arrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

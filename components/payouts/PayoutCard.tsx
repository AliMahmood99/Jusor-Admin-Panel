/**
 * PayoutCard Component
 * Displays individual payout information with actions
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';

interface PayoutCardProps {
  payout: any;
  onMarkAsPaid: (payout: any) => void;
  onCopyIBAN: (id: string, iban: string) => void;
  onViewCampaign: (campaignId: string) => void;
  copiedId: string | null;
}

// Helper functions
const formatCurrency = (amount: number) => `SAR ${amount.toLocaleString()}`;

const formatIBAN = (iban: string) => iban.replace(/(.{4})/g, '$1 ').trim();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
};

const getHoursWaiting = (date: string) => {
  const now = new Date();
  const submitted = new Date(date);
  const diff = Math.floor((now.getTime() - submitted.getTime()) / (1000 * 60 * 60));
  return diff;
};

const formatWaitingTime = (hours: number) => {
  if (hours < 24) {
    return `${hours}h waiting`;
  } else {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    if (remainingHours === 0) {
      return `${days}d waiting`;
    }
    return `${days}d ${remainingHours}h waiting`;
  }
};

export default function PayoutCard({
  payout,
  onMarkAsPaid,
  onCopyIBAN,
  onViewCampaign,
  copiedId
}: PayoutCardProps) {
  const hoursWaiting = getHoursWaiting(payout.contentApprovedAt);
  const isUrgent = hoursWaiting >= 72; // 3 days = 72 hours
  const isHighValue = payout.amount >= 20000;
  const isCopied = copiedId === payout.id;

  const platformColors: any = {
    instagram: 'from-pink-500 to-purple-500',
    tiktok: 'from-slate-800 to-slate-900',
    snapchat: 'from-yellow-400 to-yellow-500',
    youtube: 'from-red-500 to-red-600',
  };

  const statusConfig: any = {
    pending: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', label: 'Pending' },
    completed: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', label: 'Completed' },
  };

  const status = statusConfig[payout.status];

  return (
    <div className={`bg-white rounded-2xl border-2 transition-all hover:shadow-lg ${
      isUrgent && payout.status === 'pending' ? 'border-rose-300 shadow-rose-100' :
      'border-slate-200 hover:border-slate-300'
    }`}>
      {/* Urgent Banner */}
      {isUrgent && payout.status === 'pending' && (
        <div className="bg-rose-500 text-white text-xs font-semibold px-4 py-1.5 rounded-t-xl flex items-center gap-2">
          <Icons.alertTriangle className="w-3.5 h-3.5" />
          Waiting {formatWaitingTime(hoursWaiting)} - Urgent!
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platformColors[payout.influencer.platform] || 'from-blue-500 to-blue-600'} flex items-center justify-center text-white font-bold shadow-lg`}>
              {payout.influencer.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900">{payout.influencer.name}</h3>
                {payout.influencer.verified && (
                  <Icons.checkCircle className="w-4 h-4 text-blue-500" />
                )}
                {isHighValue && (
                  <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold">
                    HIGH VALUE
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500">{payout.influencer.handle} • {payout.influencer.followers}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(payout.amount)}</p>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium ${status.bg} ${status.text}`}>
              {payout.status === 'completed' && <Icons.check className="w-3 h-3" />}
              {status.label}
            </span>
          </div>
        </div>

        {/* Campaign Info - Clickable */}
        <button
          onClick={() => onViewCampaign(payout.campaign.id)}
          className="w-full flex items-center gap-2 mb-4 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group text-left"
        >
          <Icons.fileText className="w-4 h-4 text-slate-400" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 truncate group-hover:text-blue-600 transition-colors">{payout.campaign.name}</p>
            <p className="text-xs text-slate-500">{payout.campaign.business}</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">{payout.campaign.id}</span>
          <Icons.externalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
        </button>

        {/* IBAN Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">IBAN</span>
            {payout.status !== 'completed' && (
              <button
                onClick={() => onCopyIBAN(payout.id, payout.iban)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isCopied
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isCopied ? (
                  <>
                    <Icons.check className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Icons.copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
          <div className="font-mono text-sm text-slate-700 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
            {formatIBAN(payout.iban)}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Icons.calendar className="w-3.5 h-3.5" />
              Approved: {formatDate(payout.contentApprovedAt)}
            </span>
            {payout.status === 'pending' && (
              <span className={`flex items-center gap-1 ${isUrgent ? 'text-rose-600 font-semibold' : ''}`}>
                <Icons.clock className="w-3.5 h-3.5" />
                {formatWaitingTime(hoursWaiting)}
              </span>
            )}
            {payout.status === 'completed' && payout.paidAt && (
              <span className="flex items-center gap-1 text-emerald-600">
                <Icons.check className="w-3.5 h-3.5" />
                Paid: {formatDate(payout.paidAt)}
              </span>
            )}
          </div>

          {payout.status === 'pending' && (
            <button
              onClick={() => onMarkAsPaid(payout)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-all shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40"
            >
              <Icons.check className="w-4 h-4" />
              Mark as Paid
            </button>
          )}

          {payout.status === 'completed' && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                {payout.referenceNumber}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

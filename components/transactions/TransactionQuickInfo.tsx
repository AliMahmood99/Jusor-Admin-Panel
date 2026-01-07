/**
 * Transaction Quick Info Component
 * Sidebar component showing essential transaction information
 */

'use client';

import React from 'react';
import { formatDateTime, getStatusConfig } from '@/lib/transactionUtils';
import type { Transaction } from '@/lib/mockTransactionData';

interface TransactionQuickInfoProps {
  transaction: Transaction;
}

export default function TransactionQuickInfo({ transaction }: TransactionQuickInfoProps) {
  const statusConfig = getStatusConfig(transaction.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Info</h3>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-slate-500 mb-2">Status</p>
          <span className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
            <StatusIcon className="w-4 h-4" />
            {statusConfig.label}
          </span>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500 mb-1">Created</p>
          <p className="text-sm font-medium text-slate-900">{formatDateTime(transaction.createdAt)}</p>
        </div>

        {transaction.completedAt && (
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-1">Completed</p>
            <p className="text-sm font-medium text-emerald-600">{formatDateTime(transaction.completedAt)}</p>
          </div>
        )}

        {transaction.failureReason && (
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-1">Failure Reason</p>
            <p className="text-sm font-medium text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">{transaction.failureReason}</p>
          </div>
        )}
      </div>
    </div>
  );
}

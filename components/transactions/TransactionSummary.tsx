/**
 * Transaction Summary Component
 * Displays detailed breakdown of transaction amounts
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';
import { formatCurrency, getTransactionTypeConfig } from '@/lib/transactionUtils';
import type { Transaction } from '@/lib/mockTransactionData';

interface TransactionSummaryProps {
  transaction: Transaction;
}

export default function TransactionSummary({ transaction }: TransactionSummaryProps) {
  const typeConfig = getTransactionTypeConfig(transaction.type);
  const TypeIcon = typeConfig.icon;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Transaction Summary</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${typeConfig.iconBg}`}>
              <TypeIcon className={`w-6 h-6 ${typeConfig.textColor}`} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Type</p>
              <p className={`font-semibold ${typeConfig.textColor}`}>{typeConfig.label}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Gross Amount</span>
              <span className="font-semibold text-slate-900">SAR {formatCurrency(transaction.amount)}</span>
            </div>
            {transaction.commission > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Platform Fee (6%)</span>
                <span className="font-medium text-purple-600">- SAR {formatCurrency(transaction.commission)}</span>
              </div>
            )}
            <div className="border-t-2 border-slate-200 pt-3 flex justify-between">
              <span className="text-slate-700 font-medium">Net Amount</span>
              <span className="font-bold text-xl text-emerald-600">SAR {formatCurrency(transaction.netAmount)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {transaction.campaign && (
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-600 mb-1">Campaign</p>
              <button className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold">
                {transaction.campaign.name}
                <Icons.externalLink className="w-4 h-4" />
              </button>
              <p className="text-xs text-blue-500 mt-1">{transaction.campaign.id}</p>
            </div>
          )}
          {transaction.transferRef && (
            <div>
              <p className="text-sm text-slate-500 mb-2">Transfer Reference</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-slate-100 px-4 py-2.5 rounded-xl text-sm font-mono text-slate-700">
                  {transaction.transferRef}
                </code>
                <button
                  onClick={() => handleCopy(transaction.transferRef!)}
                  className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <Icons.copy className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          )}
          {transaction.paymentMethod && (
            <div>
              <p className="text-sm text-slate-500 mb-1">Payment Method</p>
              <p className="font-medium text-slate-900 capitalize">{transaction.paymentMethod.replace('_', ' ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Transactions Table Component
 * Professional table displaying transaction list with comprehensive data
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';
import { formatCurrency, formatDate, formatTime, getTransactionTypeConfig, getStatusConfig } from '@/lib/transactionUtils';
import type { Transaction } from '@/lib/mockTransactionData';

interface TransactionsTableProps {
  transactions: Transaction[];
  onSelectTransaction: (transaction: Transaction) => void;
}

export default function TransactionsTable({ transactions, onSelectTransaction }: TransactionsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 w-12">#</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Transaction ID</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Type</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">From → To</th>
            <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Amount</th>
            <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Commission</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Date</th>
            <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3">Status</th>
            <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 w-16">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {transactions.map((txn, index) => {
            const typeConfig = getTransactionTypeConfig(txn.type);
            const statusConfig = getStatusConfig(txn.status);
            const TypeIcon = typeConfig.icon;
            const StatusIcon = statusConfig.icon;

            return (
              <tr
                key={txn.id}
                className="hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => onSelectTransaction(txn)}
              >
                {/* Row Number */}
                <td className="px-4 py-4">
                  <span className="text-xs font-medium text-slate-400">{index + 1}</span>
                </td>

                {/* Transaction ID */}
                <td className="px-4 py-4">
                  <p className="text-sm font-mono font-medium text-slate-900">{txn.id}</p>
                  {txn.campaign && (
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Icons.megaphone className="w-3 h-3" />
                      {txn.campaign.name}
                    </p>
                  )}
                </td>

                {/* Type */}
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${typeConfig.bgColor} ${typeConfig.textColor}`}>
                    <TypeIcon className="w-3.5 h-3.5" />
                    {typeConfig.label}
                  </span>
                </td>

                {/* From → To */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {txn.from.type === 'business' ? (
                        <Icons.building className="w-4 h-4 text-blue-500" />
                      ) : txn.from.type === 'influencer' ? (
                        <Icons.user className="w-4 h-4 text-purple-500" />
                      ) : (
                        <Icons.banknote className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-sm text-slate-700 max-w-[100px] truncate">{txn.from.name}</span>
                    </div>
                    <Icons.arrowRight className="w-4 h-4 text-slate-300" />
                    <div className="flex items-center gap-1.5">
                      {txn.to.type === 'business' ? (
                        <Icons.building className="w-4 h-4 text-blue-500" />
                      ) : txn.to.type === 'influencer' ? (
                        <Icons.user className="w-4 h-4 text-purple-500" />
                      ) : txn.to.type === 'escrow' ? (
                        <Icons.wallet className="w-4 h-4 text-amber-500" />
                      ) : txn.to.type === 'platform' ? (
                        <Icons.receipt className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Icons.creditCard className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-sm text-slate-700 max-w-[100px] truncate">{txn.to.name}</span>
                    </div>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-4 py-4 text-right">
                  <p className="text-sm font-semibold text-slate-900">SAR {formatCurrency(txn.amount)}</p>
                  {txn.netAmount !== txn.amount && (
                    <p className="text-xs text-emerald-600">Net: SAR {formatCurrency(txn.netAmount)}</p>
                  )}
                </td>

                {/* Commission */}
                <td className="px-4 py-4 text-right">
                  {txn.commission > 0 ? (
                    <p className="text-sm text-purple-600 font-medium">
                      SAR {formatCurrency(txn.commission)}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400">-</p>
                  )}
                </td>

                {/* Date */}
                <td className="px-4 py-4">
                  <p className="text-sm text-slate-900">{formatDate(txn.createdAt)}</p>
                  <p className="text-xs text-slate-500">{formatTime(txn.createdAt)}</p>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {statusConfig.label}
                  </span>
                </td>

                {/* Action */}
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTransaction(txn);
                    }}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Icons.eye className="w-4 h-4 text-slate-500" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-700">1-{transactions.length}</span> of <span className="font-medium text-slate-700">147</span> transactions
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-slate-200 hover:bg-white transition-colors disabled:opacity-50" disabled>
            <Icons.arrowLeft className="w-4 h-4 text-slate-500" />
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium">1</button>
          <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-sm text-slate-600">2</button>
          <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-sm text-slate-600">3</button>
          <span className="text-slate-400">...</span>
          <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-sm text-slate-600">15</button>
          <button className="p-2 rounded-lg border border-slate-200 hover:bg-white transition-colors">
            <Icons.arrowRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Transaction Related Links Component
 * Displays links to related entities (campaign, users, disputes)
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';
import type { Transaction } from '@/lib/mockTransactionData';

interface TransactionRelatedLinksProps {
  transaction: Transaction;
}

export default function TransactionRelatedLinks({ transaction }: TransactionRelatedLinksProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Related Links</h3>

      <div className="space-y-2">
        {transaction.campaign && (
          <button className="w-full text-left p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 group-hover:text-blue-800">View Campaign</p>
                <p className="text-xs text-blue-500">{transaction.campaign.id}</p>
              </div>
              <Icons.externalLink className="w-4 h-4 text-blue-400" />
            </div>
          </button>
        )}
        {transaction.from.id && (
          <button className="w-full text-left p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">View {transaction.from.type === 'business' ? 'Business' : 'Influencer'}</p>
                <p className="text-xs text-slate-500">{transaction.from.id}</p>
              </div>
              <Icons.externalLink className="w-4 h-4 text-slate-400" />
            </div>
          </button>
        )}
        {transaction.to.id && (
          <button className="w-full text-left p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">View {transaction.to.type === 'business' ? 'Business' : 'Influencer'}</p>
                <p className="text-xs text-slate-500">{transaction.to.id}</p>
              </div>
              <Icons.externalLink className="w-4 h-4 text-slate-400" />
            </div>
          </button>
        )}
        {transaction.relatedDispute && (
          <button className="w-full text-left p-4 rounded-xl bg-rose-50 hover:bg-rose-100 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-rose-700">View Related Dispute</p>
                <p className="text-xs text-rose-500">{transaction.relatedDispute}</p>
              </div>
              <Icons.externalLink className="w-4 h-4 text-rose-400" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

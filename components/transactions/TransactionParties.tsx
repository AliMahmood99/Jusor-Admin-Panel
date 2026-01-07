/**
 * Transaction Parties Component
 * Displays from/to parties with visual flow indicator
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';
import type { Transaction } from '@/lib/mockTransactionData';

interface TransactionPartiesProps {
  transaction: Transaction;
}

export default function TransactionParties({ transaction }: TransactionPartiesProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Parties Involved</h2>

      <div className="flex items-center gap-6">
        {/* From */}
        <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">From</p>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-sm ${
              transaction.from.type === 'business' ? 'bg-blue-500 text-white' :
              transaction.from.type === 'influencer' ? 'bg-purple-500 text-white' :
              'bg-slate-300 text-slate-600'
            }`}>
              {transaction.from.type === 'business' ? <Icons.building className="w-7 h-7" /> :
               transaction.from.type === 'influencer' ? <Icons.user className="w-7 h-7" /> :
               <Icons.banknote className="w-7 h-7" />}
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-lg">{transaction.from.name}</p>
              <p className="text-sm text-slate-500 capitalize">{transaction.from.type.replace('_', ' ')}</p>
            </div>
          </div>
          {transaction.from.id && (
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 bg-white px-3 py-2 rounded-lg shadow-sm">
              View Profile <Icons.externalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Icons.arrowRight className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* To */}
        <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">To</p>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-sm ${
              transaction.to.type === 'business' ? 'bg-blue-500 text-white' :
              transaction.to.type === 'influencer' ? 'bg-purple-500 text-white' :
              transaction.to.type === 'escrow' ? 'bg-amber-500 text-white' :
              transaction.to.type === 'platform' ? 'bg-emerald-500 text-white' :
              'bg-slate-300 text-slate-600'
            }`}>
              {transaction.to.type === 'business' ? <Icons.building className="w-7 h-7" /> :
               transaction.to.type === 'influencer' ? <Icons.user className="w-7 h-7" /> :
               transaction.to.type === 'escrow' ? <Icons.wallet className="w-7 h-7" /> :
               transaction.to.type === 'platform' ? <Icons.receipt className="w-7 h-7" /> :
               <Icons.creditCard className="w-7 h-7" />}
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-lg">{transaction.to.name}</p>
              <p className="text-sm text-slate-500 capitalize">{transaction.to.type.replace('_', ' ')}</p>
            </div>
          </div>
          {transaction.to.id && (
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 bg-white px-3 py-2 rounded-lg shadow-sm">
              View Profile <Icons.externalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

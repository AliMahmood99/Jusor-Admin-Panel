/**
 * Transaction Detail Page
 * Comprehensive view of individual transaction
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { Icons } from '@/components/common/Icons';
import TransactionSummary from '@/components/transactions/TransactionSummary';
import TransactionParties from '@/components/transactions/TransactionParties';
import TransactionQuickInfo from '@/components/transactions/TransactionQuickInfo';
import TransactionRelatedLinks from '@/components/transactions/TransactionRelatedLinks';
import { mockTransactions } from '@/lib/mockTransactionData';
import { formatDateTime, getStatusConfig } from '@/lib/transactionUtils';

interface TransactionDetailPageProps {
  params: {
    id: string;
  };
}

export default function TransactionDetailPage({ params }: TransactionDetailPageProps) {
  const router = useRouter();
  const [activePage, setActivePage] = useState('transactions');
  const [copied, setCopied] = useState(false);
  const [adminNote, setAdminNote] = useState('');

  // Find transaction by ID
  const transaction = mockTransactions.find(txn => txn.id === params.id);

  if (!transaction) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-slate-900">Transaction not found</p>
          <button
            onClick={() => router.push('/transactions')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Transactions
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(transaction.status);
  const StatusIcon = statusConfig.icon;

  // Timeline events
  const timeline = [
    {
      time: transaction.completedAt || transaction.createdAt,
      event: transaction.status === 'completed' ? 'Transaction completed successfully' :
             transaction.status === 'pending' ? 'Awaiting processing' : 'Transaction failed',
      type: transaction.status,
    },
    ...(transaction.transferRef ? [{
      time: transaction.createdAt,
      event: `Transfer reference generated: ${transaction.transferRef}`,
      type: 'info' as const,
    }] : []),
    {
      time: new Date(new Date(transaction.createdAt).getTime() - 60000).toISOString(),
      event: transaction.description,
      type: 'action' as const,
    },
    ...(transaction.campaign ? [{
      time: new Date(new Date(transaction.createdAt).getTime() - 3600000).toISOString(),
      event: `Related campaign: ${transaction.campaign.name}`,
      type: 'info' as const,
    }] : []),
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNote = () => {
    alert('Note saved successfully!');
    setAdminNote('');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar active={activePage} setActive={setActivePage} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/transactions')}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <Icons.arrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-bold text-slate-900 font-mono">{transaction.id}</h1>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                  <StatusIcon className="w-4 h-4" />
                  {statusConfig.label}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{transaction.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
              <Icons.printer className="w-4 h-4" />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
              <Icons.download className="w-4 h-4" />
              Export PDF
            </button>
            <button
              onClick={() => handleCopy(transaction.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              <Icons.copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy ID'}
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Main Content - 2 columns */}
            <div className="col-span-2 space-y-6">
              <TransactionSummary transaction={transaction} />
              <TransactionParties transaction={transaction} />

              {/* Timeline */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Timeline</h2>

                <div className="space-y-1">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          item.type === 'completed' ? 'bg-emerald-500 border-emerald-500' :
                          item.type === 'pending' ? 'bg-amber-500 border-amber-500' :
                          item.type === 'failed' ? 'bg-rose-500 border-rose-500' :
                          'bg-white border-slate-300'
                        }`} />
                        {index < timeline.length - 1 && (
                          <div className="w-0.5 flex-1 bg-slate-200 my-1" style={{ minHeight: '40px' }} />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="text-sm font-medium text-slate-900">{item.event}</p>
                        <p className="text-xs text-slate-500 mt-1">{formatDateTime(item.time)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Admin Notes</h2>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Add internal note for audit trail..."
                  className="w-full h-28 px-4 py-3 rounded-xl border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs text-slate-400">Notes are internal and not visible to users</p>
                  <button
                    disabled={!adminNote.trim()}
                    onClick={handleSaveNote}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Icons.send className="w-4 h-4" />
                    Save Note
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              <TransactionQuickInfo transaction={transaction} />
              <TransactionRelatedLinks transaction={transaction} />

              {/* Documents */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Documents</h3>

                {transaction.status === 'completed' ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                          <Icons.fileText className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-700">Transfer Receipt</span>
                          <p className="text-xs text-slate-400">PDF • 45 KB</p>
                        </div>
                      </div>
                      <button className="p-2 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icons.download className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <Icons.fileText className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-700">Bank Confirmation</span>
                          <p className="text-xs text-slate-400">PDF • 32 KB</p>
                        </div>
                      </div>
                      <button className="p-2 rounded-lg bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icons.download className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icons.fileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">No documents available</p>
                    <p className="text-xs text-slate-400 mt-1">Documents will appear after completion</p>
                  </div>
                )}
              </div>

              {/* Actions for pending/failed transactions */}
              {transaction.status === 'pending' && (
                <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
                  <h3 className="text-sm font-semibold text-amber-800 mb-3">Pending Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full py-3 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                      <Icons.checkCircle className="w-4 h-4" />
                      Retry Transfer
                    </button>
                    <button className="w-full py-3 rounded-xl bg-white border border-amber-300 text-amber-700 text-sm font-medium hover:bg-amber-50 transition-colors">
                      Cancel Transaction
                    </button>
                  </div>
                </div>
              )}

              {transaction.status === 'failed' && (
                <div className="bg-rose-50 rounded-2xl border border-rose-200 p-6">
                  <h3 className="text-sm font-semibold text-rose-800 mb-3">Failed Transaction</h3>
                  <p className="text-sm text-rose-600 mb-4">This transaction failed and requires attention.</p>
                  <div className="space-y-2">
                    <button className="w-full py-3 rounded-xl bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition-colors flex items-center justify-center gap-2">
                      <Icons.arrowLeftRight className="w-4 h-4" />
                      Retry with New IBAN
                    </button>
                    <button className="w-full py-3 rounded-xl bg-white border border-rose-300 text-rose-700 text-sm font-medium hover:bg-rose-50 transition-colors">
                      Refund to Wallet
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

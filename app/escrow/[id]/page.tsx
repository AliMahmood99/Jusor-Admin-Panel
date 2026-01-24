/**
 * Escrow Transaction Detail Page
 * Detailed view with full transaction information and actions
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import AdminDropdown from '@/components/layout/AdminDropdown';
import { Icons } from '@/components/common/Icons';
import {
  ESCROW_TRANSACTIONS_DB,
  ESCROW_AUDIT_LOGS_DB,
} from '@/lib/data';
import type { EscrowTransaction, EscrowStatus, EscrowAuditLog } from '@/lib/types';

// ============================================
// UTILITY FUNCTIONS
// ============================================

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusColor = (status: EscrowStatus) => {
  const colors = {
    held: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
    pending_release: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    pending_refund: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500' },
    released: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    refunded: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-500' },
  };
  return colors[status];
};

const getStatusLabel = (status: EscrowStatus) => {
  const labels = {
    held: 'Held in Escrow',
    pending_release: 'Pending Release to Influencer',
    pending_refund: 'Pending Refund to Business',
    released: 'Released to Influencer',
    refunded: 'Refunded to Business',
  };
  return labels[status];
};

// ============================================
// INFO CARD COMPONENT
// ============================================

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const InfoCard = ({ title, children, icon }: InfoCardProps) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-6">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
    </div>
    {children}
  </div>
);

// ============================================
// INFO ROW COMPONENT
// ============================================

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}

const InfoRow = ({ label, value, highlight }: InfoRowProps) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
    <span className="text-sm text-slate-600">{label}</span>
    <span className={`text-sm font-medium ${highlight ? 'text-blue-600' : 'text-slate-900'}`}>
      {value}
    </span>
  </div>
);

// ============================================
// TIMELINE COMPONENT
// ============================================

interface TimelineItemProps {
  log: EscrowAuditLog;
  isLast: boolean;
}

const TimelineItem = ({ log, isLast }: TimelineItemProps) => {
  const statusColor = getStatusColor(log.newStatus);

  return (
    <div className="relative pb-8">
      {!isLast && (
        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
      )}
      <div className="relative flex items-start space-x-3">
        <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${statusColor.bg} ${statusColor.border} border-2`}>
          <span className={`h-2 w-2 rounded-full ${statusColor.dot}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div>
            <div className="text-sm font-medium text-slate-900">{log.action}</div>
            <p className="text-sm text-slate-600 mt-0.5">by {log.performedBy}</p>
          </div>
          <div className="mt-2 text-sm text-slate-700">
            {log.bankReference && (
              <p className="text-xs text-slate-500 bg-slate-50 inline-block px-2 py-1 rounded">
                Ref: {log.bankReference}
              </p>
            )}
            {log.notes && (
              <p className="mt-2 text-sm text-slate-600 italic">&quot;{log.notes}&quot;</p>
            )}
          </div>
          <div className="mt-2 text-xs text-slate-500">{formatDate(log.timestamp)}</div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// ACTION BUTTONS COMPONENT
// ============================================

interface ActionButtonsProps {
  transaction: EscrowTransaction;
  onMarkAsTransferred: () => void;
  onMarkAsRefunded: () => void;
}

const ActionButtons = ({ transaction, onMarkAsTransferred, onMarkAsRefunded }: ActionButtonsProps) => {
  if (transaction.status === 'pending_release') {
    return (
      <button
        onClick={onMarkAsTransferred}
        className="h-11 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/30"
      >
        <Icons.checkCircle className="w-5 h-5" />
        Mark as Transferred
      </button>
    );
  }

  if (transaction.status === 'pending_refund') {
    return (
      <button
        onClick={onMarkAsRefunded}
        className="h-11 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-semibold flex items-center gap-2 transition-all shadow-lg shadow-violet-500/30"
      >
        <Icons.trendingDown className="w-5 h-5" />
        Mark as Refunded
      </button>
    );
  }

  return null;
};

// ============================================
// MARK AS TRANSFERRED MODAL
// ============================================

interface MarkAsTransferredModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: EscrowTransaction;
  onConfirm: (bankRef: string, notes: string) => void;
}

const MarkAsTransferredModal = ({ isOpen, onClose, transaction, onConfirm }: MarkAsTransferredModalProps) => {
  const [bankRef, setBankRef] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (bankRef.trim()) {
      onConfirm(bankRef, notes);
      setBankRef('');
      setNotes('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Mark as Transferred</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Icons.x className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Transaction Summary */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icons.alertCircle className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-900">Payment Details</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-emerald-700">Influencer:</span>
                <span className="font-medium text-emerald-900">{transaction.influencerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700">IBAN:</span>
                <span className="font-mono text-emerald-900">{transaction.influencerIBAN}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700">Bank:</span>
                <span className="font-medium text-emerald-900">{transaction.influencerBank}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-emerald-200">
                <span className="text-emerald-700 font-semibold">Amount to Transfer:</span>
                <span className="font-bold text-emerald-900 text-lg">SAR {formatCurrency(transaction.netAmount)}</span>
              </div>
            </div>
          </div>

          {/* Bank Reference */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Bank Reference Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={bankRef}
              onChange={(e) => setBankRef(e.target.value)}
              placeholder="Enter bank transfer reference number"
              className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="h-11 px-6 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!bankRef.trim()}
            className="h-11 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MARK AS REFUNDED MODAL
// ============================================

interface MarkAsRefundedModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: EscrowTransaction;
  onConfirm: (bankRef: string, notes: string) => void;
}

const MarkAsRefundedModal = ({ isOpen, onClose, transaction, onConfirm }: MarkAsRefundedModalProps) => {
  const [bankRef, setBankRef] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (bankRef.trim()) {
      onConfirm(bankRef, notes);
      setBankRef('');
      setNotes('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Mark as Refunded</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Icons.x className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Refund Summary */}
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icons.alertCircle className="w-5 h-5 text-violet-600" />
              <h3 className="font-semibold text-violet-900">Refund Details</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-violet-700">Business:</span>
                <span className="font-medium text-violet-900">{transaction.businessName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-violet-700">Payment Method:</span>
                <span className="font-medium text-violet-900">
                  {transaction.paymentMethod === 'card'
                    ? `Card ending in ${transaction.cardLast4}`
                    : 'Bank Transfer'
                  }
                </span>
              </div>
              {transaction.sourceIBAN && (
                <div className="flex justify-between">
                  <span className="text-violet-700">IBAN:</span>
                  <span className="font-mono text-violet-900">{transaction.sourceIBAN}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-violet-700">Reason:</span>
                <span className="font-medium text-violet-900">{transaction.refundReasonText}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-violet-200">
                <span className="text-violet-700 font-semibold">Amount to Refund:</span>
                <span className="font-bold text-violet-900 text-lg">SAR {formatCurrency(transaction.amount)}</span>
              </div>
            </div>
          </div>

          {/* Bank Reference */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Bank Reference Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={bankRef}
              onChange={(e) => setBankRef(e.target.value)}
              placeholder="Enter bank transfer reference number"
              className="w-full h-11 px-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="h-11 px-6 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!bankRef.trim()}
            className="h-11 px-6 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Refund
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EscrowDetailPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const [activeSidebar, setActiveSidebar] = useState('escrow');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  // Find transaction
  const transaction = ESCROW_TRANSACTIONS_DB.find(t => t.id === resolvedParams.id);

  if (!transaction) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Transaction Not Found</h1>
          <button
            onClick={() => router.push('/escrow')}
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to Escrow Monitoring
          </button>
        </div>
      </div>
    );
  }

  // Get audit logs for this transaction
  const auditLogs = ESCROW_AUDIT_LOGS_DB.filter(log => log.escrowId === transaction.id);

  const statusColor = getStatusColor(transaction.status);

  const handleMarkAsTransferred = (bankRef: string, notes: string) => {
    console.log('Marked as transferred:', { bankRef, notes });
    setShowTransferModal(false);
    // TODO: Update transaction status
    router.push('/escrow');
  };

  const handleMarkAsRefunded = (bankRef: string, notes: string) => {
    console.log('Marked as refunded:', { bankRef, notes });
    setShowRefundModal(false);
    // TODO: Update transaction status
    router.push('/escrow');
  };

  return (
    <>
      <Sidebar active={activeSidebar} setActive={setActiveSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 ml-60">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/escrow')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Icons.arrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Transaction Details</h1>
              <p className="text-sm text-gray-500">{transaction.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ActionButtons
              transaction={transaction}
              onMarkAsTransferred={() => setShowTransferModal(true)}
              onMarkAsRefunded={() => setShowRefundModal(true)}
            />
            <div className="w-px h-8 bg-gray-200" />
            <AdminDropdown />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Status Banner */}
          <div className={`rounded-2xl border ${statusColor.border} ${statusColor.bg} p-6 mb-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${statusColor.bg} border-2 ${statusColor.border} flex items-center justify-center`}>
                  <span className={`w-3 h-3 rounded-full ${statusColor.dot}`} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${statusColor.text}`}>
                    {getStatusLabel(transaction.status)}
                  </h2>
                  {transaction.daysWaiting && transaction.daysWaiting > 0 && (
                    <p className={`text-sm ${statusColor.text} mt-1`}>
                      Waiting for {transaction.daysWaiting} {transaction.daysWaiting === 1 ? 'day' : 'days'}
                    </p>
                  )}
                </div>
              </div>
              {transaction.status === 'pending_release' || transaction.status === 'pending_refund' ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg">
                  <Icons.alertCircle className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-900">Action Required</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Transaction Details */}
            <div className="col-span-2 space-y-6">
              {/* Campaign Info */}
              <InfoCard
                title="Campaign Information"
                icon={<Icons.megaphone className="w-5 h-5 text-blue-600" />}
              >
                <InfoRow label="Campaign Name" value={transaction.campaignName} highlight />
                <InfoRow label="Campaign ID" value={transaction.campaignId} />
                <InfoRow label="Created Date" value={formatDate(transaction.createdAt)} />
                {transaction.approvedAt && (
                  <InfoRow label="Approved Date" value={formatDate(transaction.approvedAt)} />
                )}
                {transaction.completedAt && (
                  <InfoRow label="Completed Date" value={formatDate(transaction.completedAt)} />
                )}
              </InfoCard>

              {/* Financial Breakdown */}
              <InfoCard
                title="Financial Breakdown"
                icon={<Icons.dollarSign className="w-5 h-5 text-emerald-600" />}
              >
                <InfoRow label="Campaign Amount" value={`SAR ${formatCurrency(transaction.amount)}`} />
                <InfoRow
                  label="Platform Commission (3%)"
                  value={<span className="text-rose-600">-SAR {formatCurrency(transaction.commission)}</span>}
                />
                <InfoRow
                  label="Gateway Fee"
                  value={<span className="text-rose-600">-SAR {formatCurrency(transaction.gatewayFee)}</span>}
                />
                <div className="pt-3 border-t-2 border-slate-200 mt-3">
                  <InfoRow
                    label="Net Amount"
                    value={<span className="text-emerald-600 text-lg font-bold">SAR {formatCurrency(transaction.netAmount)}</span>}
                  />
                </div>
              </InfoCard>

              {/* Payment Information */}
              <InfoCard
                title="Payment Information"
                icon={<Icons.creditCard className="w-5 h-5 text-violet-600" />}
              >
                <InfoRow label="Payment Method" value={transaction.paymentMethod === 'card' ? 'Credit/Debit Card' : 'Bank Transfer'} />
                {transaction.cardLast4 && (
                  <>
                    <InfoRow label="Card Number" value={`**** **** **** ${transaction.cardLast4}`} />
                    <InfoRow label="Card Brand" value={transaction.cardBrand} />
                  </>
                )}
                {transaction.sourceIBAN && (
                  <>
                    <InfoRow label="Source IBAN" value={<span className="font-mono text-xs">{transaction.sourceIBAN}</span>} />
                    <InfoRow label="Bank Name" value={transaction.sourceBankName} />
                  </>
                )}
                <InfoRow label="Payment Reference" value={transaction.paymentReference} />
                {transaction.bankReference && (
                  <InfoRow label="Bank Reference" value={transaction.bankReference} highlight />
                )}
              </InfoCard>

              {/* Refund Reason (if applicable) */}
              {transaction.refundReason && (
                <InfoCard
                  title="Refund Information"
                  icon={<Icons.alertCircle className="w-5 h-5 text-rose-600" />}
                >
                  <InfoRow label="Refund Reason" value={transaction.refundReasonText} />
                  {transaction.processedBy && (
                    <InfoRow label="Processed By" value={transaction.processedBy} />
                  )}
                </InfoCard>
              )}
            </div>

            {/* Right Column - Parties & Timeline */}
            <div className="space-y-6">
              {/* Business Info */}
              <InfoCard
                title="Business"
                icon={<Icons.building className="w-5 h-5 text-blue-600" />}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Icons.building className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{transaction.businessName}</p>
                    <p className="text-sm text-slate-500">{transaction.businessId}</p>
                  </div>
                </div>
              </InfoCard>

              {/* Influencer Info */}
              <InfoCard
                title="Influencer"
                icon={<Icons.user className="w-5 h-5 text-violet-600" />}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {transaction.influencerName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{transaction.influencerName}</p>
                    <p className="text-sm text-slate-500">{transaction.influencerUsername}</p>
                  </div>
                </div>
                {transaction.status === 'pending_release' || transaction.status === 'released' ? (
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">IBAN</span>
                      <span className="font-mono text-slate-900">{transaction.influencerIBAN}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Bank</span>
                      <span className="text-slate-900">{transaction.influencerBank}</span>
                    </div>
                  </div>
                ) : null}
              </InfoCard>

              {/* Timeline */}
              {auditLogs.length > 0 && (
                <InfoCard
                  title="Activity Timeline"
                  icon={<Icons.clock className="w-5 h-5 text-slate-600" />}
                >
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {auditLogs.map((log, idx) => (
                        <li key={log.id}>
                          <TimelineItem log={log} isLast={idx === auditLogs.length - 1} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </InfoCard>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <MarkAsTransferredModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        transaction={transaction}
        onConfirm={handleMarkAsTransferred}
      />

      <MarkAsRefundedModal
        isOpen={showRefundModal}
        onClose={() => setShowRefundModal(false)}
        transaction={transaction}
        onConfirm={handleMarkAsRefunded}
      />
    </>
  );
}

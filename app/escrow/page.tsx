/**
 * Escrow Monitoring Page
 * Monitor and manage all escrow transactions, releases, and refunds
 */

'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import AdminDropdown from '@/components/layout/AdminDropdown';
import { Icons, IconProps } from '@/components/common/Icons';
import {
  ESCROW_TRANSACTIONS_DB,
  getEscrowSummary,
  getPendingReleases,
  getPendingRefunds,
} from '@/lib/data';
import type { EscrowTransaction, EscrowStatus } from '@/lib/types';

// ============================================
// TYPES
// ============================================

type TabView = 'action_required' | 'all_transactions' | 'completed';

interface FilterState {
  search: string;
  status: EscrowStatus | 'all';
  dateFrom: string;
  dateTo: string;
}

interface StatusConfig {
  label: string;
  icon: (props: IconProps) => React.JSX.Element;
  bgColor: string;
  textColor: string;
  dotColor: string;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const getStatusConfig = (status: EscrowStatus): StatusConfig => {
  const configs: Record<EscrowStatus, StatusConfig> = {
    held: {
      label: 'Held',
      icon: Icons.wallet,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      dotColor: 'bg-blue-500',
    },
    pending_release: {
      label: 'Pending Release',
      icon: Icons.clock,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      dotColor: 'bg-amber-500',
    },
    pending_refund: {
      label: 'Pending Refund',
      icon: Icons.alertCircle,
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      dotColor: 'bg-rose-500',
    },
    released: {
      label: 'Released',
      icon: Icons.checkCircle,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      dotColor: 'bg-emerald-500',
    },
    refunded: {
      label: 'Refunded',
      icon: Icons.trendingDown,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      dotColor: 'bg-purple-500',
    },
  };
  return configs[status];
};

// ============================================
// TRANSACTIONS TABLE COMPONENT
// ============================================

interface TransactionsTableProps {
  transactions: EscrowTransaction[];
  onViewDetails: (transaction: EscrowTransaction) => void;
}

const TransactionsTable = ({ transactions, onViewDetails }: TransactionsTableProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Escrow ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Campaign</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Business</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Influencer</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {transactions.map((txn, index) => {
            const statusConfig = getStatusConfig(txn.status);
            const isHighPriority = txn.daysWaiting && txn.daysWaiting > 3;
            const isLargeAmount = txn.amount > 30000;

            return (
              <tr
                key={txn.id}
                className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                  isHighPriority ? 'bg-amber-50/30' : ''
                }`}
                onClick={() => onViewDetails(txn)}
              >
                {/* Index */}
                <td className="px-4 py-4">
                  <span className="text-sm text-slate-400 font-medium">{index + 1}</span>
                </td>

                {/* Escrow ID */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900">{txn.id}</p>
                    {isHighPriority && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">
                        <Icons.alertCircle className="w-3 h-3" />
                        {txn.daysWaiting}d
                      </span>
                    )}
                    {isLargeAmount && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-violet-100 text-violet-700">
                        <Icons.trendingUp className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{txn.paymentReference}</p>
                </td>

                {/* Campaign */}
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900 max-w-[180px] truncate">
                      {txn.campaignName}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{txn.campaignId}</p>
                  </div>
                </td>

                {/* Business */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Icons.building className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 max-w-[140px] truncate">
                        {txn.businessName}
                      </p>
                      <p className="text-xs text-slate-500">{txn.businessId}</p>
                    </div>
                  </div>
                </td>

                {/* Influencer */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {txn.influencerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{txn.influencerName}</p>
                      <p className="text-xs text-slate-500">{txn.influencerUsername}</p>
                    </div>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-4 py-4 text-right">
                  <p className="text-sm font-semibold text-slate-900">
                    SAR {formatCurrency(txn.amount)}
                  </p>
                  {txn.netAmount !== txn.amount && (
                    <p className="text-xs text-emerald-600 mt-0.5">
                      Net: SAR {formatCurrency(txn.netAmount)}
                    </p>
                  )}
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`} />
                    {statusConfig.label}
                  </span>
                </td>

                {/* Date */}
                <td className="px-4 py-4">
                  <p className="text-sm text-slate-900">{formatDate(txn.createdAt)}</p>
                  <p className="text-xs text-slate-500">{formatTime(txn.createdAt)}</p>
                </td>

                {/* Action */}
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(txn);
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
          Showing <span className="font-medium text-slate-700">1-{transactions.length}</span> of{' '}
          <span className="font-medium text-slate-700">{ESCROW_TRANSACTIONS_DB.length}</span> transactions
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-slate-200 hover:bg-white transition-colors disabled:opacity-50" disabled>
            <Icons.arrowLeft className="w-4 h-4 text-slate-500" />
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium">1</button>
          <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-sm text-slate-600">2</button>
          <button className="px-3 py-1.5 rounded-lg hover:bg-slate-100 text-sm text-slate-600">3</button>
          <button className="p-2 rounded-lg border border-slate-200 hover:bg-white transition-colors">
            <Icons.arrowRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// FILTERS COMPONENT
// ============================================

interface FiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

const Filters = ({ filters, setFilters }: FiltersProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, campaign, business, or influencer..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-3 ml-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as EscrowStatus | 'all' })}
            className="h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="held">Held</option>
            <option value="pending_release">Pending Release</option>
            <option value="pending_refund">Pending Refund</option>
            <option value="released">Released</option>
            <option value="refunded">Refunded</option>
          </select>

          {/* Date Filters */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="From"
            />
            <span className="text-slate-400">→</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="To"
            />
          </div>

          {/* Export Button */}
          <button className="h-10 px-4 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 flex items-center gap-2 transition-colors">
            <Icons.download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function EscrowMonitoringPage() {
  const [activeSidebar, setActiveSidebar] = useState('escrow');
  const [activeTab, setActiveTab] = useState<TabView>('action_required');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    dateFrom: '',
    dateTo: '',
  });
  const router = useRouter();

  // Get summary data
  const summary = getEscrowSummary();

  // Get transactions based on active tab
  const transactions = useMemo(() => {
    let data: EscrowTransaction[] = [];

    if (activeTab === 'action_required') {
      data = [...getPendingReleases(), ...getPendingRefunds()];
    } else if (activeTab === 'completed') {
      data = ESCROW_TRANSACTIONS_DB.filter((t) => ['released', 'refunded'].includes(t.status));
    } else {
      data = ESCROW_TRANSACTIONS_DB;
    }

    // Apply filters
    if (filters.status !== 'all') {
      data = data.filter((t) => t.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      data = data.filter(
        (t) =>
          t.id.toLowerCase().includes(searchLower) ||
          t.campaignName.toLowerCase().includes(searchLower) ||
          t.businessName.toLowerCase().includes(searchLower) ||
          t.influencerName.toLowerCase().includes(searchLower)
      );
    }

    return data;
  }, [activeTab, filters]);

  const handleViewDetails = (transaction: EscrowTransaction) => {
    router.push(`/escrow/${transaction.id}`);
  };

  return (
    <>
      <Sidebar active={activeSidebar} setActive={setActiveSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 ml-60">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Escrow Monitoring</h1>
            <p className="text-sm text-gray-500">Monitor and manage all escrow transactions</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-600 flex items-center gap-2 transition-colors">
              <Icons.refresh className="w-4 h-4" />
              Refresh
            </button>
            <div className="w-px h-8 bg-gray-200" />
            <AdminDropdown />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {/* Total Held */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                  <Icons.wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
                  In Escrow
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">SAR {formatCurrency(summary.totalHeld)}</p>
              <p className="text-xs text-gray-600 mt-1">Total funds held</p>
            </div>

            {/* Pending Releases */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl border border-amber-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                  <Icons.clock className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded-lg">
                  {summary.pendingReleasesCount} txns
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">SAR {formatCurrency(summary.pendingReleases)}</p>
              <p className="text-xs text-gray-600 mt-1">Pending releases</p>
            </div>

            {/* Pending Refunds */}
            <div className="bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-2xl border border-rose-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center">
                  <Icons.trendingDown className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-rose-600 bg-rose-100 px-2 py-1 rounded-lg">
                  {summary.pendingRefundsCount} txns
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">SAR {formatCurrency(summary.pendingRefunds)}</p>
              <p className="text-xs text-gray-600 mt-1">Pending refunds</p>
            </div>

            {/* Platform Revenue */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                  <Icons.dollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg">
                  +12.5%
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">SAR {formatCurrency(summary.platformRevenue)}</p>
              <p className="text-xs text-gray-600 mt-1">Platform revenue</p>
            </div>

            {/* Action Required */}
            <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-2xl border border-violet-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center">
                  <Icons.alertCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-violet-600 bg-violet-100 px-2 py-1 rounded-lg">
                  Urgent
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{summary.actionRequired}</p>
              <p className="text-xs text-gray-600 mt-1">Actions required</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-1 mb-6 inline-flex">
            <button
              onClick={() => setActiveTab('action_required')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'action_required'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>Action Required</span>
                {summary.actionRequired > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold bg-white text-blue-600">
                    {summary.actionRequired}
                  </span>
                )}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('all_transactions')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'all_transactions'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              All Transactions
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Completed
            </button>
          </div>

          {/* Filters */}
          <Filters filters={filters} setFilters={setFilters} />

          {/* Transactions Table */}
          <div className="mt-6">
            <TransactionsTable transactions={transactions} onViewDetails={handleViewDetails} />
          </div>
        </main>
      </div>
    </>
  );
}

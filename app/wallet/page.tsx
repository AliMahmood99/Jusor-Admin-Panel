/**
 * Wallet Operations Page
 * Monitor and manage wallet deposits and withdrawals
 */

'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import AdminDropdown from '@/components/layout/AdminDropdown';
import { Icons, IconProps } from '@/components/common/Icons';

// ============================================
// TYPES
// ============================================

type TransactionType = 'wallet_deposit' | 'wallet_withdrawal';
type TransactionStatus = 'completed' | 'pending' | 'processing' | 'failed';
type PartyType = 'business' | 'influencer' | 'external' | 'bank_account';

interface TransactionParty {
  id: string | null;
  name: string;
  type: PartyType;
  handle?: string;
}

interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  from: TransactionParty;
  to: TransactionParty;
  transferRef?: string;
  paymentMethod?: string;
  createdAt: string;
  completedAt?: string;
  description: string;
  failureReason?: string;
}

interface FilterState {
  search: string;
  status: TransactionStatus | 'all';
  type: TransactionType | 'all';
  dateFrom: string;
  dateTo: string;
}

interface StatusConfig {
  label: string;
  icon: (props: IconProps) => React.JSX.Element;
  bgColor: string;
  textColor: string;
}

interface TransactionTypeConfig {
  label: string;
  icon: (props: IconProps) => React.JSX.Element;
  bgColor: string;
  textColor: string;
  iconBg: string;
}

// ============================================
// MOCK DATA
// ============================================

const mockTransactions: Transaction[] = [
  {
    id: 'TXN-2026-000146',
    type: 'wallet_deposit',
    status: 'completed',
    amount: 50000,
    currency: 'SAR',
    from: { id: null, name: 'Bank Transfer', type: 'external' },
    to: { id: 'BUS-5678', name: 'TechStart Inc', type: 'business' },
    transferRef: 'BNK-REF-445566',
    paymentMethod: 'Bank Transfer',
    createdAt: '2026-01-07T09:15:00',
    completedAt: '2026-01-07T09:18:00',
    description: 'Wallet deposit from bank account',
  },
  {
    id: 'TXN-2026-000142',
    type: 'wallet_withdrawal',
    status: 'completed',
    amount: 25000,
    currency: 'SAR',
    from: { id: 'BUS-7890', name: 'Luxury Brands SA', type: 'business' },
    to: { id: null, name: 'SA55 1000 **** **** 5432', type: 'bank_account' },
    transferRef: 'WTH-2026-0089',
    paymentMethod: 'Bank Transfer',
    createdAt: '2026-01-06T14:22:00',
    completedAt: '2026-01-06T14:25:00',
    description: 'Withdrawal to business bank account',
  },
];

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

const getStatusConfig = (status: TransactionStatus): StatusConfig => {
  const configs: Record<TransactionStatus, StatusConfig> = {
    completed: { label: 'Completed', icon: Icons.checkCircle, bgColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
    pending: { label: 'Pending', icon: Icons.clock, bgColor: 'bg-amber-50', textColor: 'text-amber-700' },
    processing: { label: 'Processing', icon: Icons.loader, bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    failed: { label: 'Failed', icon: Icons.alertCircle, bgColor: 'bg-red-50', textColor: 'text-red-700' },
  };
  return configs[status];
};

const getTypeConfig = (type: TransactionType): TransactionTypeConfig => {
  const configs: Record<TransactionType, TransactionTypeConfig> = {
    wallet_deposit: {
      label: 'Wallet Deposit',
      icon: Icons.plus,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      iconBg: 'bg-emerald-100'
    },
    wallet_withdrawal: {
      label: 'Wallet Withdrawal',
      icon: Icons.minus,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-100'
    },
  };
  return configs[type];
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
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-3 ml-4">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value as TransactionType | 'all' })}
            className="h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Types</option>
            <option value="wallet_deposit">Deposits</option>
            <option value="wallet_withdrawal">Withdrawals</option>
          </select>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as TransactionStatus | 'all' })}
            className="h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
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
// TRANSACTIONS TABLE COMPONENT
// ============================================

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Transaction ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">From → To</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {transactions.map((txn, index) => {
            const statusConfig = getStatusConfig(txn.status);
            const typeConfig = getTypeConfig(txn.type);

            return (
              <tr key={txn.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                {/* Index */}
                <td className="px-4 py-4">
                  <span className="text-sm text-slate-400 font-medium">{index + 1}</span>
                </td>

                {/* Transaction ID */}
                <td className="px-4 py-4">
                  <p className="text-sm font-medium text-slate-900">{txn.id}</p>
                  {txn.transferRef && (
                    <p className="text-xs text-slate-500 mt-0.5">Ref: {txn.transferRef}</p>
                  )}
                </td>

                {/* Type */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${typeConfig.iconBg} flex items-center justify-center`}>
                      <typeConfig.icon className={`w-4 h-4 ${typeConfig.textColor}`} />
                    </div>
                    <span className="text-sm font-medium text-slate-900">{typeConfig.label}</span>
                  </div>
                </td>

                {/* From -> To */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {txn.from.type === 'business' ? (
                        <Icons.building className="w-4 h-4 text-blue-500" />
                      ) : txn.from.type === 'influencer' ? (
                        <Icons.user className="w-4 h-4 text-purple-500" />
                      ) : txn.from.type === 'bank_account' ? (
                        <Icons.creditCard className="w-4 h-4 text-slate-400" />
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
                      ) : txn.to.type === 'bank_account' ? (
                        <Icons.creditCard className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Icons.banknote className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-sm text-slate-700 max-w-[100px] truncate">{txn.to.name}</span>
                    </div>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-4 py-4 text-right">
                  <p className="text-sm font-semibold text-slate-900">SAR {formatCurrency(txn.amount)}</p>
                  {txn.paymentMethod && (
                    <p className="text-xs text-slate-500 mt-0.5">{txn.paymentMethod}</p>
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
                    <statusConfig.icon className="w-3.5 h-3.5" />
                    {statusConfig.label}
                  </span>
                </td>

                {/* Action */}
                <td className="px-4 py-4 text-center">
                  <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
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
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function WalletOperationsPage() {
  const [activeSidebar, setActiveSidebar] = useState('wallet');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'all',
    type: 'all',
    dateFrom: '',
    dateTo: '',
  });

  // Filter transactions
  const filteredTransactions = mockTransactions.filter((txn) => {
    if (filters.type !== 'all' && txn.type !== filters.type) return false;
    if (filters.status !== 'all' && txn.status !== filters.status) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesId = txn.id.toLowerCase().includes(searchLower);
      const matchesFrom = txn.from.name.toLowerCase().includes(searchLower);
      const matchesTo = txn.to.name.toLowerCase().includes(searchLower);
      if (!matchesId && !matchesFrom && !matchesTo) return false;
    }
    return true;
  });

  // Calculate stats
  const totalDeposits = mockTransactions
    .filter(t => t.type === 'wallet_deposit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = mockTransactions
    .filter(t => t.type === 'wallet_withdrawal' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = mockTransactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <>
      <Sidebar active={activeSidebar} setActive={setActiveSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 ml-60">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Wallet Operations</h1>
            <p className="text-sm text-gray-500">Monitor all wallet deposits and withdrawals</p>
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
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                  <Icons.dollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
                  Total Volume
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">SAR {formatCurrency(totalDeposits + totalWithdrawals)}</p>
              <p className="text-xs text-gray-600 mt-1">All transactions (MTD)</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                  <Icons.trendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg">
                  +8.2%
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">SAR {formatCurrency(totalDeposits)}</p>
              <p className="text-xs text-gray-600 mt-1">Total Deposits</p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-2xl border border-rose-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center">
                  <Icons.trendingDown className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-rose-600 bg-rose-100 px-2 py-1 rounded-lg">
                  Withdrawals
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">SAR {formatCurrency(totalWithdrawals)}</p>
              <p className="text-xs text-gray-600 mt-1">Total Withdrawn</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl border border-amber-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                  <Icons.clock className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded-lg">
                  12 txns
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">SAR {formatCurrency(pendingAmount)}</p>
              <p className="text-xs text-gray-600 mt-1">Pending Transactions</p>
            </div>
          </div>

          {/* Filters */}
          <Filters filters={filters} setFilters={setFilters} />

          {/* Transactions Table */}
          <div className="mt-6">
            <TransactionsTable transactions={filteredTransactions} />
          </div>
        </main>
      </div>
    </>
  );
}

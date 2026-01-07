/**
 * Transaction Filters Component
 * Advanced filtering options for transactions list
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';

export interface TransactionFilterState {
  category: string;
  status: string;
  search: string;
  dateFrom: string;
  dateTo: string;
}

interface TransactionFiltersProps {
  filters: TransactionFilterState;
  setFilters: (filters: TransactionFilterState) => void;
  onExport?: () => void;
}

export default function TransactionFilters({ filters, setFilters, onExport }: TransactionFiltersProps) {
  const categories = [
    { id: 'all', label: 'All Transactions' },
    { id: 'campaign_payment', label: 'Campaign Payments' },
    { id: 'wallet_ops', label: 'Wallet Operations' },
    { id: 'commission', label: 'Commissions' },
    { id: 'refund', label: 'Refunds' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters({ ...filters, category: cat.id })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.category === cat.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right Side Filters */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-64 h-10 pl-10 pr-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="h-10 px-4 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* Date Range */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200">
            <Icons.calendar className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="text-sm text-slate-600 border-none focus:outline-none w-28"
            />
            <span className="text-slate-400">→</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="text-sm text-slate-600 border-none focus:outline-none w-28"
            />
          </div>

          {/* Export */}
          <button
            onClick={onExport}
            className="h-10 px-4 rounded-xl bg-slate-900 text-white text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors"
          >
            <Icons.download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

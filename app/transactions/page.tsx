/**
 * Transactions List Page
 * Professional transaction management interface
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { Icons } from '@/components/common/Icons';
import TransactionStats from '@/components/transactions/TransactionStats';
import TransactionFilters, { type TransactionFilterState } from '@/components/transactions/TransactionFilters';
import TransactionsTable from '@/components/transactions/TransactionsTable';
import { mockTransactions, transactionStats } from '@/lib/mockTransactionData';
import type { Transaction } from '@/lib/mockTransactionData';

export default function TransactionsPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState('transactions');
  const [filters, setFilters] = useState<TransactionFilterState>({
    category: 'all',
    status: 'all',
    search: '',
    dateFrom: '',
    dateTo: '',
  });

  // Filter transactions
  const filteredTransactions = mockTransactions.filter((txn) => {
    if (filters.category !== 'all' && txn.category !== filters.category) return false;
    if (filters.status !== 'all' && txn.status !== filters.status) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesId = txn.id.toLowerCase().includes(searchLower);
      const matchesFrom = txn.from.name.toLowerCase().includes(searchLower);
      const matchesTo = txn.to.name.toLowerCase().includes(searchLower);
      const matchesCampaign = txn.campaign?.name.toLowerCase().includes(searchLower);
      if (!matchesId && !matchesFrom && !matchesTo && !matchesCampaign) return false;
    }
    return true;
  });

  const handleSelectTransaction = (transaction: Transaction) => {
    router.push(`/transactions/${transaction.id}`);
  };

  const handleExport = () => {
    alert('Export functionality - would generate CSV/PDF of transactions');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar active={activePage} setActive={setActivePage} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Transactions</h1>
            <p className="text-sm text-slate-500">Monitor all platform financial transactions</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
              <Icons.refresh className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <TransactionStats stats={transactionStats} />
          <TransactionFilters filters={filters} setFilters={setFilters} onExport={handleExport} />
          <TransactionsTable
            transactions={filteredTransactions}
            onSelectTransaction={handleSelectTransaction}
          />
        </div>
      </div>
    </div>
  );
}

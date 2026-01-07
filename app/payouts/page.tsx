/**
 * Payouts Management Page
 * Process and manage influencer payments
 */

'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import PayoutCard from '@/components/payouts/PayoutCard';
import PayoutStats from '@/components/payouts/PayoutStats';
import ConfirmPaymentModal from '@/components/payouts/ConfirmPaymentModal';
import { Icons } from '@/components/common/Icons';
import { mockPayouts } from '@/lib/mockPayoutData';

// Helper functions
const getHoursWaiting = (date: string) => {
  const now = new Date();
  const submitted = new Date(date);
  const diff = Math.floor((now.getTime() - submitted.getTime()) / (1000 * 60 * 60));
  return diff;
};

export default function PayoutsPage() {
  const [activePage, setActivePage] = useState('payouts');
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayout, setSelectedPayout] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [payouts, setPayouts] = useState(mockPayouts);

  // Filter payouts by status
  const pendingPayouts = payouts
    .filter((p) => p.status === 'pending')
    .sort((a, b) => new Date(a.contentApprovedAt).getTime() - new Date(b.contentApprovedAt).getTime());

  const completedTodayPayouts = payouts.filter((p) => {
    if (p.status !== 'completed') return false;
    const today = new Date().toDateString();
    return new Date(p.paidAt || '').toDateString() === today;
  });

  const allCompletedPayouts = payouts.filter((p) => p.status === 'completed');

  // Search filter
  const filterPayouts = (list: any[]) => {
    if (!searchQuery) return list;
    const query = searchQuery.toLowerCase();
    return list.filter(
      (p) =>
        p.influencer.name.toLowerCase().includes(query) ||
        p.influencer.handle.toLowerCase().includes(query) ||
        p.campaign.name.toLowerCase().includes(query) ||
        p.iban.includes(query)
    );
  };

  // Get current list based on active tab
  const getCurrentList = () => {
    switch (activeTab) {
      case 'pending':
        return filterPayouts(pendingPayouts);
      case 'today':
        return filterPayouts(completedTodayPayouts);
      case 'history':
        return filterPayouts(allCompletedPayouts);
      default:
        return [];
    }
  };

  // Copy IBAN handler
  const handleCopyIBAN = (id: string, iban: string) => {
    navigator.clipboard.writeText(iban);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Mark as paid handler
  const handleMarkAsPaid = (payout: any) => {
    setSelectedPayout(payout);
  };

  // View campaign handler
  const handleViewCampaign = (campaignId: string) => {
    // Navigate to Campaign Oversight with this campaign
    alert(`Navigating to Campaign: ${campaignId}`);
    // In real app: router.push(`/campaigns/${campaignId}`)
  };

  // Confirm payment handler
  const handleConfirmPayment = (payoutData: any) => {
    setPayouts((prev) =>
      prev.map((p) =>
        p.id === payoutData.id
          ? {
              ...p,
              status: 'completed',
              paidAt: new Date().toISOString(),
              referenceNumber: payoutData.referenceNumber,
            }
          : p
      )
    );
    setSelectedPayout(null);
  };

  // Export handler
  const handleExport = () => {
    alert('Exporting pending payouts as Excel file...');
  };

  // Stats calculations
  const totalPendingAmount = pendingPayouts.reduce((sum, p) => sum + p.amount, 0);
  const todayProcessed = completedTodayPayouts.length;
  const todayAmount = completedTodayPayouts.reduce((sum, p) => sum + p.amount, 0);
  const oldestWaitingHours =
    pendingPayouts.length > 0 ? getHoursWaiting(pendingPayouts[0].contentApprovedAt) : 0;

  const tabs = [
    { id: 'pending', label: 'Pending', count: pendingPayouts.length, color: 'amber' },
    { id: 'today', label: 'Completed Today', count: completedTodayPayouts.length, color: 'emerald' },
    { id: 'history', label: 'All History', count: allCompletedPayouts.length, color: 'slate' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans antialiased">
      {/* Sidebar */}
      <Sidebar active={activePage} setActive={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-bold text-slate-900">Payout Management</h1>
              <p className="text-sm text-slate-500">Process influencer payments</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-600 flex items-center gap-2 transition-colors"
            >
              <Icons.download className="w-4 h-4" />
              Export Pending
            </button>
            <button className="h-10 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-600 flex items-center gap-2 transition-colors">
              <Icons.refresh className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <PayoutStats
            pendingCount={pendingPayouts.length}
            todayProcessed={todayProcessed}
            todayAmount={todayAmount}
            totalPendingAmount={totalPendingAmount}
            oldestWaitingHours={oldestWaitingHours}
          />

          {/* Tabs & Search */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              {/* Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`min-w-[22px] h-5 px-1.5 rounded-lg text-xs font-semibold flex items-center justify-center ${
                        activeTab === tab.id
                          ? tab.color === 'amber'
                            ? 'bg-amber-500 text-white'
                            : tab.color === 'blue'
                            ? 'bg-blue-500 text-white'
                            : tab.color === 'emerald'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-500 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-72">
                <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search influencer, campaign, IBAN..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Payouts List */}
            <div className="p-4">
              {getCurrentList().length === 0 ? (
                <div className="py-16 text-center">
                  <Icons.checkCircle className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {activeTab === 'pending' ? 'All caught up!' : 'No payouts found'}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {activeTab === 'pending'
                      ? 'No pending payouts to process'
                      : searchQuery
                      ? 'Try adjusting your search'
                      : 'Payouts will appear here'}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {getCurrentList().map((payout) => (
                    <PayoutCard
                      key={payout.id}
                      payout={payout}
                      onMarkAsPaid={handleMarkAsPaid}
                      onCopyIBAN={handleCopyIBAN}
                      onViewCampaign={handleViewCampaign}
                      copiedId={copiedId}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Confirm Payment Modal */}
      {selectedPayout && (
        <ConfirmPaymentModal
          payout={selectedPayout}
          onClose={() => setSelectedPayout(null)}
          onConfirm={handleConfirmPayment}
        />
      )}
    </div>
  );
}

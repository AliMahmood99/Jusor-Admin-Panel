/**
 * Disputes Page - Dispute Resolution Management
 * Professional dispute management interface
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { Icons } from '@/components/common/Icons';
import DisputeStatusBadge from '@/components/disputes/DisputeStatusBadge';
import DisputePriorityBadge from '@/components/disputes/DisputePriorityBadge';
import UrgentDisputeCard from '@/components/disputes/UrgentDisputeCard';
import { MOCK_DISPUTES } from '@/lib/constants';
import { getDisputeStats, getUrgentDisputes } from '@/lib/disputeUtils';
import type { Dispute, DisputeStatus, DisputePriority } from '@/types';

export default function DisputesPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState('disputes');
  const [statusFilter, setStatusFilter] = useState<DisputeStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<DisputePriority | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter disputes
  const filteredDisputes = MOCK_DISPUTES.filter((dispute) => {
    if (statusFilter !== 'all' && dispute.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && dispute.priority !== priorityFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        dispute.id.toLowerCase().includes(query) ||
        dispute.title.toLowerCase().includes(query) ||
        dispute.business.name.toLowerCase().includes(query) ||
        dispute.influencer.name.toLowerCase().includes(query) ||
        (dispute.campaign?.name || '').toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Calculate stats
  const stats = getDisputeStats(MOCK_DISPUTES);
  const urgentDisputes = getUrgentDisputes(MOCK_DISPUTES);

  const statusCounts = {
    all: MOCK_DISPUTES.length,
    new: MOCK_DISPUTES.filter(d => d.status === 'new').length,
    evidence: MOCK_DISPUTES.filter(d => d.status === 'evidence').length,
    review: MOCK_DISPUTES.filter(d => d.status === 'review').length,
    resolved: MOCK_DISPUTES.filter(d => d.status === 'resolved').length,
    escalated: MOCK_DISPUTES.filter(d => d.status === 'escalated').length,
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased">
      {/* Sidebar */}
      <Sidebar active={activePage} setActive={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 sticky top-0 z-10">
          <div>
            <h1 className="text-base font-semibold text-gray-900">Dispute Resolution</h1>
            <p className="text-xs text-gray-500">Manage and resolve platform disputes</p>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-600 transition-colors">
              <Icons.refresh className="w-4 h-4" />
              Refresh
            </button>
            <button className="relative h-9 w-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors">
              <Icons.bell className="w-4 h-4 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Total Open', value: stats.totalOpen, icon: 'scale', color: 'blue', change: `${urgentDisputes.length} urgent` },
              { label: 'Awaiting Evidence', value: stats.awaitingEvidence, icon: 'fileText', color: 'amber', change: 'Pending' },
              { label: 'Decision Due', value: stats.decisionDue, icon: 'clock', color: 'rose', change: '< 72h' },
              { label: 'Value at Stake', value: `SAR ${(stats.valueAtStake / 1000).toFixed(0)}K`, icon: 'dollarSign', color: 'violet', change: `${stats.totalOpen} cases` },
            ].map((stat, i) => {
              const IconComp = Icons[stat.icon as keyof typeof Icons];
              return (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-11 h-11 rounded-xl bg-${stat.color}-50 flex items-center justify-center`}>
                      {IconComp && <IconComp className={`w-5 h-5 text-${stat.color}-600`} />}
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between gap-4">
              {/* Status Tabs */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'new', label: 'New', color: 'rose' },
                  { id: 'evidence', label: 'Evidence', color: 'amber' },
                  { id: 'review', label: 'Review', color: 'blue' },
                  { id: 'resolved', label: 'Resolved', color: 'emerald' },
                  { id: 'escalated', label: 'Escalated', color: 'purple' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id as typeof statusFilter)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${statusFilter === tab.id
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {tab.label}
                    <span className={`min-w-[22px] h-[22px] px-1.5 rounded-md text-xs font-semibold flex items-center justify-center
                      ${statusFilter === tab.id
                        ? `bg-${tab.color || 'gray'}-100 text-${tab.color || 'gray'}-600`
                        : 'bg-gray-200 text-gray-500'}`}>
                      {statusCounts[tab.id as keyof typeof statusCounts]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search & Priority Filter */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search disputes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 h-10 pl-10 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as typeof priorityFilter)}
                  className="h-10 px-4 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
          </div>

          {/* Urgent Disputes Section */}
          {statusFilter === 'all' && urgentDisputes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icons.alert className="w-5 h-5 text-rose-600" />
                  <h2 className="text-lg font-bold text-slate-900">Urgent Disputes</h2>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
                    Requires Immediate Attention
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {urgentDisputes.map((dispute) => (
                  <UrgentDisputeCard
                    key={dispute.id}
                    dispute={dispute}
                    onSelect={() => router.push(`/disputes/${dispute.id}`)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Disputes Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Dispute</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Parties</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Amount</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Priority</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Campaign</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredDisputes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <Icons.scale className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">No disputes found</h3>
                      <p className="text-sm text-gray-500">Try adjusting your filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredDisputes.map((dispute) => (
                    <tr
                      key={dispute.id}
                      onClick={() => router.push(`/disputes/${dispute.id}`)}
                      className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      {/* Dispute Info */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Icons.scale className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{dispute.id}</p>
                            <p className="text-xs text-gray-500 truncate max-w-[200px]">{dispute.title}</p>
                          </div>
                        </div>
                      </td>

                      {/* Parties */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-semibold ring-2 ring-white">
                              {dispute.influencer.avatar || 'I'}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold ring-2 ring-white">
                              {dispute.business.avatar || 'B'}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            <span className="text-violet-600">{dispute.influencer.name.split(' ')[0]}</span>
                            <span className="mx-1">vs</span>
                            <span className="text-blue-600">{dispute.business.name.split(' ')[0]}</span>
                          </div>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-gray-900">
                          SAR {(dispute.amountInDispute || 0).toLocaleString()}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <DisputeStatusBadge status={dispute.status} />
                      </td>

                      {/* Priority */}
                      <td className="px-5 py-4">
                        <DisputePriorityBadge priority={dispute.priority} />
                      </td>

                      {/* Campaign */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-600 truncate max-w-[150px]">{dispute.campaignName}</p>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-right">
                        <button className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-blue-600/25">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {filteredDisputes.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {filteredDisputes.length} of {MOCK_DISPUTES.length} disputes
                </p>
                <div className="flex items-center gap-1">
                  <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <Icons.arrowLeft className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-blue-600 text-white text-sm font-medium">1</button>
                  <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <Icons.arrowRight className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

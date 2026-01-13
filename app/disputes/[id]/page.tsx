/**
 * Dispute Details Page
 * Complete dispute information and resolution interface
 */

'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { Icons } from '@/components/common/Icons';
import DisputeStatusBadge from '@/components/disputes/DisputeStatusBadge';
import DisputePriorityBadge from '@/components/disputes/DisputePriorityBadge';
import DisputePartyCard from '@/components/disputes/DisputePartyCard';
import EvidenceSection from '@/components/disputes/EvidenceSection';
import TimelineSection from '@/components/disputes/TimelineSection';
import DecisionModal from '@/components/disputes/DecisionModal';
import { MOCK_DISPUTES } from '@/lib/constants';
import type { DisputeResolution } from '@/types';

export default function DisputeDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [activePage, setActivePage] = useState('disputes');
  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'timeline'>('overview');
  const [showDecisionModal, setShowDecisionModal] = useState(false);

  // Get id from params
  const id = params.id;

  // Find dispute by ID
  const dispute = MOCK_DISPUTES.find((d) => d.id === id);

  if (!dispute) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Icons.scale className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Dispute Not Found</h2>
          <p className="text-gray-500 mb-4">The dispute you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/disputes')}
            className="h-10 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Disputes
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'evidence', label: 'Evidence', count: dispute.evidence.length },
    { id: 'timeline', label: 'Timeline' },
  ];

  const handleDecisionSubmit = (decision: { type: string; percentage: number; reasoning: string }) => {
    console.log('Decision submitted:', decision);
    setShowDecisionModal(false);
    router.push('/disputes');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased">
      {/* Sidebar */}
      <Sidebar active={activePage} setActive={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 overflow-y-auto ml-60">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/disputes')}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Icons.arrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-base font-semibold text-gray-900">{dispute.id}</h1>
              <DisputeStatusBadge status={dispute.status} />
              {dispute.priority === 'high' || dispute.priority === 'critical' ? (
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-50 text-rose-600 text-xs font-medium">
                  <Icons.zap className="w-3 h-3" /> {dispute.priority === 'critical' ? 'Critical' : 'High'} Priority
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Assigned to: <span className="font-medium text-gray-700">{dispute.assignedAdmin}</span>
            </span>
            <button className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm text-gray-600">
              Reassign
            </button>
          </div>
        </header>

        {/* Quick Info Bar */}
        <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center gap-8">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Amount at Stake</p>
            <p className="text-xl font-bold text-gray-900">SAR {(dispute.amountInDispute || 0).toLocaleString()}</p>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Campaign</p>
            <p className="text-sm font-medium text-gray-900">{dispute.campaignName}</p>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Created</p>
            <p className="text-sm font-medium text-gray-900">
              {new Date(dispute.openedAt || dispute.createdAt || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Type</p>
            <p className="text-sm font-medium text-gray-900 capitalize">{dispute.type}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* Tabs */}
            <div className="flex items-center gap-1 mb-5 bg-gray-100 p-1 rounded-xl w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <span
                      className={`min-w-[20px] h-5 px-1.5 rounded-md text-xs font-semibold flex items-center justify-center ${
                        activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-5">
                {/* Parties */}
                <div className="grid grid-cols-2 gap-5">
                  <DisputePartyCard party={dispute.business} role="Business" />
                  <DisputePartyCard party={dispute.influencer} role="Influencer" />
                </div>

                {/* Dispute Details */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Icons.alertCircle className="w-4 h-4 text-rose-500" />
                    Dispute Reason
                    <span className="text-xs font-normal text-gray-400">by {dispute.initiator?.name || dispute.business.name}</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{dispute.description}</p>
                  <p className="text-xs text-gray-400">
                    Submitted:{' '}
                    {new Date(dispute.openedAt || dispute.createdAt || new Date()).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                {/* Resolution (if resolved) */}
                {dispute.status === 'resolved' && dispute.resolutionNote && (
                  <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Icons.checkCircle className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-base font-semibold text-emerald-800">Resolution</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{dispute.resolutionNote}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'evidence' && (
              <div className="grid grid-cols-2 gap-5">
                <EvidenceSection
                  evidence={dispute.evidence.filter((e) => e.uploadedBy === dispute.business.id)}
                  partyName={dispute.business.name}
                  partyType={dispute.business.type}
                />
                <EvidenceSection
                  evidence={dispute.evidence.filter((e) => e.uploadedBy === dispute.influencer.id)}
                  partyName={dispute.influencer.name}
                  partyType={dispute.influencer.type}
                />
              </div>
            )}

            {activeTab === 'timeline' && <TimelineSection dispute={dispute} />}
          </div>

          {/* Action Sidebar */}
          {dispute.status !== 'resolved' && (
            <div className="w-80 bg-white border-l border-gray-200 p-6 shrink-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <button
                  onClick={() => setShowDecisionModal(true)}
                  className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/25"
                >
                  <Icons.gavel className="w-5 h-5" />
                  Issue Decision
                </button>

                <button className="w-full h-11 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium flex items-center justify-center gap-2 transition-colors">
                  <Icons.bell className="w-4 h-4" />
                  Send Reminder
                </button>

                <button className="w-full h-11 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium flex items-center justify-center gap-2 transition-colors">
                  <Icons.externalLink className="w-4 h-4" />
                  View Campaign
                </button>
              </div>

              {/* Admin Notes */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Admin Notes</h4>
                <textarea
                  placeholder="Add internal notes..."
                  className="w-full h-28 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decision Modal */}
      {showDecisionModal && (
        <DecisionModal dispute={dispute} onClose={() => setShowDecisionModal(false)} onSubmit={handleDecisionSubmit} />
      )}
    </div>
  );
}

/**
 * Dashboard Page - Main Admin Dashboard
 * Professional, action-focused dashboard with clean component structure
 */

'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Icons } from '@/components/common/Icons';
import MetricCard from '@/components/dashboard/MetricCard';
import PendingActionCard from '@/components/dashboard/PendingActionCard';
import AlertItem, { type Alert } from '@/components/dashboard/AlertItem';
import ActivityItem from '@/components/dashboard/ActivityItem';
import TodayStats from '@/components/dashboard/TodayStats';
import TopPerformers from '@/components/dashboard/TopPerformers';
import { mockDashboardData } from '@/lib/mockDashboardData';

export default function DashboardPage() {
  const [activePage, setActivePage] = useState('dashboard');
  const data = mockDashboardData;

  const handlePendingAction = (type: string) => {
    alert(`Navigate to ${type} queue\n\nIn production, this would navigate to the relevant management screen.`);
  };

  const handleAlert = (alert: Alert) => {
    window.alert(`Navigate to: ${alert.link}\n\nAction: ${alert.action}`);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar active={activePage} setActive={setActivePage} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome back, Ahmed. Here's what needs your attention.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative h-9 w-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors">
              <Icons.bell className="w-4 h-4 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                4
              </span>
            </button>
            <button className="h-9 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center gap-2 text-sm text-slate-600 transition-colors">
              <Icons.refresh className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <MetricCard
                icon="banknote"
                label="Platform Volume (GMV)"
                value={data.metrics.totalVolume}
                prefix="SAR "
                change={data.metrics.volumeChange}
                changeLabel="vs last month"
                color="blue"
              />
              <MetricCard
                icon="receipt"
                label="Commission Earned"
                value={data.metrics.commissionEarned}
                prefix="SAR "
                change={data.metrics.commissionChange}
                changeLabel="Platform revenue"
                color="emerald"
              />
              <MetricCard
                icon="wallet"
                label="Active Escrow"
                value={data.metrics.activeEscrow}
                prefix="SAR "
                change={data.metrics.escrowChange}
                changeLabel="Currently held"
                color="amber"
              />
              <MetricCard
                icon="megaphone"
                label="Active Campaigns"
                value={data.metrics.activeCampaigns}
                change={data.metrics.campaignsChange}
                changeLabel="In progress"
                color="violet"
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - Pending Actions */}
              <div className="col-span-8 space-y-6">
                {/* Pending Actions Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">Action Required</h2>
                    <p className="text-sm text-slate-500">Items waiting for your review</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Icons.clock className="w-4 h-4" />
                    <span>
                      Total pending:{' '}
                      {data.pendingActions.verifications.count + data.pendingActions.disputes.count}
                    </span>
                  </div>
                </div>

                {/* Pending Action Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <PendingActionCard
                    icon="shield"
                    title="Verifications"
                    count={data.pendingActions.verifications.count}
                    urgent={data.pendingActions.verifications.urgent}
                    subtitle={`Avg wait: ${data.pendingActions.verifications.avgWait}`}
                    buttonText="Review Next"
                    color="violet"
                    onClick={() => handlePendingAction('verification')}
                  />
                  <PendingActionCard
                    icon="scale"
                    title="Disputes"
                    count={data.pendingActions.disputes.count}
                    urgent={data.pendingActions.disputes.urgent}
                    subtitle={`Avg wait: ${data.pendingActions.disputes.avgWait}`}
                    buttonText="Handle Next"
                    color="rose"
                    onClick={() => handlePendingAction('disputes')}
                  />
                </div>

                {/* Today's Stats */}
                <TodayStats data={data.todayActivity} />

                {/* Alerts Section */}
                {data.alerts.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Icons.alertTriangle className="w-5 h-5 text-amber-500" />
                        <h3 className="text-sm font-semibold text-slate-900">Needs Attention</h3>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                          {data.alerts.length}
                        </span>
                      </div>
                      <button className="text-xs text-slate-500 hover:text-slate-700">View All</button>
                    </div>
                    <div className="space-y-3">
                      {data.alerts.map((alert) => (
                        <AlertItem key={alert.id} alert={alert} onAction={handleAlert} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Activity Feed */}
              <div className="col-span-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto -mx-2 px-2">
                    {data.recentActivity.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-2 gap-6">
              {/* Top Influencers */}
              <TopPerformers
                type="influencers"
                data={data.topPerformers.influencers}
                onViewAll={() => alert('Navigate to influencers page')}
              />

              {/* Top Businesses */}
              <TopPerformers
                type="businesses"
                data={data.topPerformers.businesses}
                onViewAll={() => alert('Navigate to businesses page')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

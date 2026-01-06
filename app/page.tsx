/**
 * Dashboard Page - Main Admin Dashboard
 * Professional, modular, and well-organized structure
 */

'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';
import KPICard from '@/components/common/KPICard';
import RevenueCard from '@/components/dashboard/RevenueCard';
import PendingActionsCard from '@/components/dashboard/PendingActionsCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import CampaignStatusCard from '@/components/dashboard/CampaignStatusCard';
import UserGrowthCard from '@/components/dashboard/UserGrowthCard';
import TopPerformersCard from '@/components/dashboard/TopPerformersCard';
import QuickStatsRow from '@/components/dashboard/QuickStatsRow';
import SystemHealthCard from '@/components/dashboard/SystemHealthCard';

export default function DashboardPage() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar active={activePage} setActive={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        {/* Header */}
        <DashboardHeader />

        {/* Dashboard Content */}
        <div className="p-5 space-y-5">
          {/* Top KPIs Row */}
          <div className="grid grid-cols-4 gap-4">
            <KPICard
              title="Total Users"
              value="2,270"
              change="+6.8%"
              changeType="positive"
              icon="users"
              iconBg="bg-blue-500"
              subtitle="1,847 Influencers • 423 Businesses"
            />
            <KPICard
              title="Active Campaigns"
              value="47"
              change="+12.3%"
              changeType="positive"
              icon="megaphone"
              iconBg="bg-violet-500"
              subtitle="23 Public • 15 Hybrid • 9 Invite Only"
            />
            <KPICard
              title="Escrow Balance"
              value="SAR 234,500"
              change="+24.5%"
              changeType="positive"
              icon="wallet"
              iconBg="bg-emerald-500"
              subtitle="Funds held in escrow"
            />
            <KPICard
              title="Pending Payouts"
              value="SAR 89,200"
              change="-8.2%"
              changeType="negative"
              icon="banknote"
              iconBg="bg-amber-500"
              subtitle="8 withdrawal requests"
            />
          </div>

          {/* Revenue & Pending Actions Row */}
          <div className="grid grid-cols-3 gap-4">
            <RevenueCard />
            <PendingActionsCard />
          </div>

          {/* Quick Stats Row */}
          <QuickStatsRow />

          {/* Middle Row - Campaign Status, User Growth, Top Performers */}
          <div className="grid grid-cols-3 gap-4">
            <CampaignStatusCard />
            <UserGrowthCard />
            <TopPerformersCard />
          </div>

          {/* Bottom Row - Activity Feed & System Health */}
          <div className="grid grid-cols-2 gap-4">
            <ActivityFeed />
            <SystemHealthCard />
          </div>
        </div>
      </div>
    </div>
  );
}

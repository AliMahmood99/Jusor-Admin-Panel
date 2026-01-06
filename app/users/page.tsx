/**
 * Users Page - User Management Interface
 * Complete user management with list and detail views
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { Icons } from '@/components/common/Icons';
import UserStatusBadge from '@/components/users/UserStatusBadge';
import UserRoleBadge from '@/components/users/UserRoleBadge';
import { MOCK_USERS, MOCK_USER_ACTIVITY } from '@/lib/constants';
import type { User, UserStatus } from '@/types';

export default function UsersPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState('users');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filters, setFilters] = useState({
    type: 'all' as 'all' | 'influencer' | 'business',
    status: 'all' as 'all' | UserStatus,
    search: '',
  });

  // Count by type
  const typeCounts = {
    all: MOCK_USERS.length,
    influencer: MOCK_USERS.filter(u => u.type === 'influencer').length,
    business: MOCK_USERS.filter(u => u.type === 'business').length,
  };

  // Count by status
  const statusCounts = {
    all: MOCK_USERS.length,
    verified: MOCK_USERS.filter(u => u.status === 'verified').length,
    pending: MOCK_USERS.filter(u => u.status === 'pending').length,
    suspended: MOCK_USERS.filter(u => u.status === 'suspended').length,
  };

  // Filter users
  const filteredUsers = MOCK_USERS.filter(u => {
    if (filters.type !== 'all' && u.type !== filters.type) return false;
    if (filters.status !== 'all' && u.status !== filters.status) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        (u.handle && u.handle.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Sort: most recent first
  const sortedUsers = [...filteredUsers].sort((a, b) =>
    new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
  );

  // Format follower count
  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  // Total followers
  const getTotalFollowers = (followers: any): number => {
    if (!followers) return 0;
    return Object.values(followers).reduce((a: number, b: any) => a + (b as number), 0);
  };

  if (selectedUser) {
    return (
      <div className="flex h-screen bg-gray-100 font-sans antialiased">
        <Sidebar active={activePage} setActive={setActivePage} />
        <UserDetailView user={selectedUser} onBack={() => setSelectedUser(null)} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans antialiased">
      <Sidebar active={activePage} setActive={setActivePage} />

      <div className="flex-1 bg-gray-50 overflow-y-auto">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 sticky top-0 z-10">
          <div>
            <h1 className="text-base font-semibold text-gray-900">User Management</h1>
            <p className="text-xs text-gray-500">Manage platform users and accounts</p>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-600 transition-colors">
              <Icons.download className="w-4 h-4" />
              Export
            </button>
            <button className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-600 transition-colors">
              <Icons.refresh className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: MOCK_USERS.length, icon: 'users', color: 'blue', change: '+12 this week' },
              { label: 'Influencers', value: typeCounts.influencer, icon: 'user', color: 'violet', change: `${statusCounts.verified} verified` },
              { label: 'Businesses', value: typeCounts.business, icon: 'building', color: 'emerald', change: `${MOCK_USERS.filter(u => u.type === 'business' && u.status === 'verified').length} verified` },
              { label: 'Pending Review', value: statusCounts.pending, icon: 'clock', color: 'amber', change: 'SLA: 1-2 days' },
            ].map((stat, i) => {
              const Icon = Icons[stat.icon as keyof typeof Icons];
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-xl bg-${stat.color}-50 flex items-center justify-center`}>
                      {Icon && <Icon className={`w-5 h-5 text-${stat.color}-600`} />}
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-4">{stat.value.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="flex items-center justify-between gap-4">
              {/* Type Tabs */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                {[
                  { id: 'all', label: 'All Users', icon: 'users' },
                  { id: 'influencer', label: 'Influencers', icon: 'user', color: 'violet' },
                  { id: 'business', label: 'Businesses', icon: 'building', color: 'blue' },
                ].map((tab) => {
                  const Icon = Icons[tab.icon as keyof typeof Icons];
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setFilters({ ...filters, type: tab.id as typeof filters.type })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${filters.type === tab.id
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {tab.label}
                      <span className={`min-w-[22px] h-[22px] px-1.5 rounded-md text-xs font-semibold flex items-center justify-center
                        ${filters.type === tab.id
                          ? `bg-${tab.color || 'gray'}-100 text-${tab.color || 'gray'}-600`
                          : 'bg-gray-200 text-gray-500'}`}>
                        {typeCounts[tab.id as keyof typeof typeCounts]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search & Status Filter */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, ID..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="w-72 h-10 pl-10 pr-4 rounded-xl bg-gray-50 border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value as typeof filters.status })}
                  className="h-10 px-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="verified">✅ Verified</option>
                  <option value="pending">🕐 Pending</option>
                  <option value="suspended">🚫 Suspended</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">User</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Type</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Category</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">
                    {filters.type === 'business' ? 'Total Spent' : 'Followers'}
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Campaigns</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Rating</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <Icons.users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">No users found</h3>
                      <p className="text-sm text-gray-500">Try adjusting your filters</p>
                    </td>
                  </tr>
                ) : (
                  sortedUsers.map((user) => {
                    const isInfluencer = user.type === 'influencer';
                    return (
                      <tr
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className="hover:bg-gray-50 transition-colors cursor-pointer group"
                      >
                        {/* User Info */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg ${
                              isInfluencer
                                ? 'bg-gradient-to-br from-violet-500 to-violet-600 shadow-violet-500/25'
                                : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/25'
                            }`}>
                              {user.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-500">
                                {isInfluencer ? user.handle : user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="px-5 py-4">
                          <UserRoleBadge type={user.type} />
                        </td>

                        {/* Category */}
                        <td className="px-5 py-4">
                          <p className="text-sm text-gray-600">{user.category}</p>
                          <p className="text-xs text-gray-400">{user.location}</p>
                        </td>

                        {/* Followers / Spent */}
                        <td className="px-5 py-4">
                          {isInfluencer ? (
                            <p className="text-sm font-semibold text-gray-900">
                              {formatFollowers(getTotalFollowers(user.followers))}
                            </p>
                          ) : (
                            <p className="text-sm font-semibold text-gray-900">
                              SAR {(user.totalSpent || 0).toLocaleString()}
                            </p>
                          )}
                        </td>

                        {/* Campaigns */}
                        <td className="px-5 py-4">
                          <p className="text-sm text-gray-900">{user.totalCampaigns}</p>
                          {user.activeCampaigns > 0 && (
                            <p className="text-xs text-emerald-600">{user.activeCampaigns} active</p>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <UserStatusBadge status={user.status} />
                        </td>

                        {/* Rating */}
                        <td className="px-5 py-4">
                          {user.rating > 0 ? (
                            <div className="flex items-center gap-1.5">
                              <Icons.star className="w-4 h-4 text-amber-400" />
                              <span className="text-sm font-medium text-gray-900">{user.rating}</span>
                              <span className="text-xs text-gray-400">({user.reviewCount})</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">No reviews</span>
                          )}
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4 text-right">
                          <button className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-blue-600/25">
                            View Profile
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {sortedUsers.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {sortedUsers.length} of {MOCK_USERS.length} users
                </p>
                <div className="flex items-center gap-1">
                  <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                    <Icons.arrowLeft className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-blue-600 text-white text-sm font-medium">1</button>
                  <button className="w-9 h-9 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">2</button>
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

// User Detail View Component
function UserDetailView({ user, onBack }: { user: User; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');
  const isInfluencer = user.type === 'influencer';

  const tabs = isInfluencer
    ? [
        { id: 'overview', label: 'Overview' },
        { id: 'social', label: 'Social Accounts' },
        { id: 'campaigns', label: 'Campaigns', count: user.totalCampaigns },
        { id: 'financial', label: 'Financial' },
        { id: 'activity', label: 'Activity Log' },
      ]
    : [
        { id: 'overview', label: 'Overview' },
        { id: 'campaigns', label: 'Campaigns', count: user.totalCampaigns },
        { id: 'financial', label: 'Financial' },
        { id: 'activity', label: 'Activity Log' },
      ];

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  const getTotalFollowers = (followers: any): number => {
    if (!followers) return 0;
    return Object.values(followers).reduce((a: number, b: any) => a + (b as number), 0);
  };

  const socialPlatforms = [
    { key: 'instagram', label: 'Instagram', icon: 'instagram', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { key: 'tiktok', label: 'TikTok', icon: 'tiktok', color: 'bg-black' },
    { key: 'youtube', label: 'YouTube', icon: 'youtube', color: 'bg-red-600' },
    { key: 'snapchat', label: 'Snapchat', icon: 'snapchat', color: 'bg-yellow-400' },
    { key: 'twitter', label: 'X (Twitter)', icon: 'twitter', color: 'bg-black' },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Icons.arrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
              isInfluencer
                ? 'bg-gradient-to-br from-violet-500 to-violet-600 shadow-violet-500/25'
                : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/25'
            }`}>
              {user.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-gray-900">{user.name}</h1>
                <UserStatusBadge status={user.status} />
              </div>
              <p className="text-xs text-gray-500">{user.id} • {isInfluencer ? user.handle : user.crNumber || user.flNumber}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-600 transition-colors">
            <Icons.message className="w-4 h-4" />
            Send Message
          </button>
          <button className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-600 transition-colors">
            <Icons.edit className="w-4 h-4" />
            Edit
          </button>
          <button className="relative h-9 w-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors">
            <Icons.more className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Quick Info Bar */}
      <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center gap-8">
        {isInfluencer ? (
          <>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Followers</p>
              <p className="text-xl font-bold text-gray-900">{formatFollowers(getTotalFollowers(user.followers))}</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Engagement Rate</p>
              <p className="text-xl font-bold text-emerald-600">{user.engagementRate}%</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Earnings</p>
              <p className="text-xl font-bold text-gray-900">SAR {(user.totalEarnings || 0).toLocaleString()}</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Pending Balance</p>
              <p className="text-xl font-bold text-amber-600">SAR {(user.pendingBalance || 0).toLocaleString()}</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dispute Rate</p>
              <p className={`text-xl font-bold ${user.disputeRate > 10 ? 'text-rose-600' : 'text-gray-900'}`}>
                {user.disputeRate}%
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Spent</p>
              <p className="text-xl font-bold text-gray-900">SAR {(user.totalSpent || 0).toLocaleString()}</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current Escrow</p>
              <p className="text-xl font-bold text-amber-600">SAR {(user.currentEscrow || 0).toLocaleString()}</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Avg Campaign</p>
              <p className="text-xl font-bold text-gray-900">SAR {(user.avgCampaignBudget || 0).toLocaleString()}</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Campaigns</p>
              <p className="text-xl font-bold text-gray-900">{user.totalCampaigns}</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dispute Rate</p>
              <p className={`text-xl font-bold ${user.disputeRate > 10 ? 'text-rose-600' : 'text-gray-900'}`}>
                {user.disputeRate}%
              </p>
            </div>
          </>
        )}
      </div>

      {/* Content Area - Continued in next message due to length */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5">
          {/* Tabs */}
          <div className="flex items-center gap-1 mb-5 bg-gray-100 p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`min-w-[20px] h-5 px-1.5 rounded-md text-xs font-semibold flex items-center justify-center
                    ${activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content Placeholder */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <Icons.user className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">User Profile</h3>
            <p className="text-sm text-gray-500">Complete user details for {user.name}</p>
            <p className="text-xs text-gray-400 mt-2">Active tab: {activeTab}</p>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-5 shrink-0">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h3>

          <div className="space-y-3">
            {user.status === 'pending' && (
              <>
                <button className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/25">
                  <Icons.checkCircle className="w-5 h-5" />
                  Approve Account
                </button>
                <button className="w-full h-11 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium flex items-center justify-center gap-2 transition-colors">
                  <Icons.xCircle className="w-5 h-5" />
                  Reject Application
                </button>
              </>
            )}

            {user.status === 'verified' && (
              <>
                <button className="w-full h-11 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium flex items-center justify-center gap-2 transition-colors">
                  <Icons.alertCircle className="w-5 h-5" />
                  Suspend Account
                </button>
                <button className="w-full h-11 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium flex items-center justify-center gap-2 transition-colors">
                  <Icons.ban className="w-5 h-5" />
                  Ban Account
                </button>
              </>
            )}

            {user.status === 'suspended' && (
              <>
                <button className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/25">
                  <Icons.checkCircle className="w-5 h-5" />
                  Reinstate Account
                </button>
                <button className="w-full h-11 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium flex items-center justify-center gap-2 transition-colors">
                  <Icons.ban className="w-5 h-5" />
                  Upgrade to Ban
                </button>
              </>
            )}

            <button className="w-full h-11 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium flex items-center justify-center gap-2 transition-colors">
              <Icons.message className="w-4 h-4" />
              Send Notification
            </button>

            <button className="w-full h-11 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium flex items-center justify-center gap-2 transition-colors">
              <Icons.shield className="w-4 h-4" />
              Override Verification
            </button>

            <button className="w-full h-11 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium flex items-center justify-center gap-2 transition-colors">
              <Icons.externalLink className="w-4 h-4" />
              View in App
            </button>
          </div>

          {/* Admin Notes */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Admin Notes</h4>
            <textarea
              placeholder="Add internal notes about this user..."
              className="w-full h-28 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="mt-2 h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors">
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

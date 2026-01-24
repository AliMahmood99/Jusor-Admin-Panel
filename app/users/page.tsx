/**
 * Users Page - User Management Interface
 * Complete user management with list and detail views
 */

'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import AdminDropdown from '@/components/layout/AdminDropdown';
import { Icons } from '@/components/common/Icons';
import UserStatusBadge from '@/components/users/UserStatusBadge';
import { UserListSkeleton } from '@/components/common/LoadingSkeleton';
import { MOCK_USERS } from '@/lib/constants';
import { statCardColors, formatFollowers, getTotalFollowers, avatarGradients, colorVariants } from '@/lib/designSystem';
import {
  MOCK_INFLUENCER_ACTIVITY_LOG,
  MOCK_BUSINESS_ACTIVITY_LOG,
  MOCK_INFLUENCER_CAMPAIGNS,
  MOCK_BUSINESS_CAMPAIGNS,
  MOCK_INFLUENCER_TRANSACTIONS,
  MOCK_BUSINESS_TRANSACTIONS,
  MOCK_USER_REVIEWS,
  MOCK_ADMIN_NOTES,
  type UserReview,
  type AdminNote,
} from '@/lib/mockUserData';
import type { User, UserStatus, InfluencerUser, BusinessUser } from '@/types';

function UsersPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState('users');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Initialize filters from URL params
  const [filters, setFilters] = useState({
    type: (searchParams.get('type') as 'all' | 'influencer' | 'business') || 'influencer',
    status: (searchParams.get('status') as 'all' | UserStatus) || 'all',
    search: searchParams.get('search') || '',
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.type && filters.type !== 'influencer') {
      params.set('type', filters.type);
    }

    if (filters.status && filters.status !== 'all') {
      params.set('status', filters.status);
    }

    if (filters.search) {
      params.set('search', filters.search);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    // Only push if URL actually changed
    if (window.location.pathname + window.location.search !== newUrl) {
      router.push(newUrl, { scroll: false });
    }
  }, [filters, pathname, router]);

  // Count by type (memoized - static data)
  const typeCounts = useMemo(() => ({
    all: MOCK_USERS.length,
    influencer: MOCK_USERS.filter(u => u.type === 'influencer').length,
    business: MOCK_USERS.filter(u => u.type === 'business').length,
  }), []);

  // Count by status (memoized - static data)
  const statusCounts = useMemo(() => ({
    all: MOCK_USERS.length,
    verified: MOCK_USERS.filter(u => u.status === 'verified').length,
    pending: MOCK_USERS.filter(u => u.status === 'pending').length,
    suspended: MOCK_USERS.filter(u => u.status === 'suspended').length,
  }), []);

  // Filter users (memoized - depends on filters)
  const filteredUsers = useMemo(() => MOCK_USERS.filter(u => {
    if (filters.type !== 'all' && u.type !== filters.type) return false;
    if (filters.status !== 'all' && u.status !== filters.status) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        (u.type === 'influencer' && u.handle && u.handle.toLowerCase().includes(q))
      );
    }
    return true;
  }), [filters]);

  // Sort: most recent first (memoized - depends on filteredUsers)
  const sortedUsers = useMemo(() => [...filteredUsers].sort((a, b) =>
    new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
  ), [filteredUsers]);

  // Note: formatFollowers and getTotalFollowers are now imported from designSystem

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

      <div className="flex-1 bg-gray-50 overflow-y-auto ml-60">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-500">Manage platform users and accounts</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-600 transition-colors">
              <Icons.download className="w-4 h-4" />
              Export
            </button>
            <button className="h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-600 transition-colors">
              <Icons.refresh className="w-4 h-4" />
              Refresh
            </button>
            <div className="w-px h-8 bg-gray-200" />
            <AdminDropdown />
          </div>
        </header>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: MOCK_USERS.length, icon: 'users' as const, color: 'blue' as const, change: '+12 this week' },
              { label: 'Influencers', value: typeCounts.influencer, icon: 'user' as const, color: 'violet' as const, change: `${statusCounts.verified} verified` },
              { label: 'Businesses', value: typeCounts.business, icon: 'building' as const, color: 'emerald' as const, change: `${MOCK_USERS.filter(u => u.type === 'business' && u.status === 'verified').length} verified` },
              { label: 'Pending Review', value: statusCounts.pending, icon: 'clock' as const, color: 'amber' as const, change: 'SLA: 1-2 days' },
            ].map((stat) => {
              const Icon = Icons[stat.icon];
              const colors = statCardColors[stat.color];
              return (
                <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-xl ${colors.iconBg} flex items-center justify-center`}>
                      {Icon && <Icon className={`w-5 h-5 ${colors.iconText}`} />}
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
                  { id: 'influencer' as const, label: 'Influencers', icon: 'user' as const, activeBadge: 'bg-violet-100 text-violet-600' },
                  { id: 'business' as const, label: 'Businesses', icon: 'building' as const, activeBadge: 'bg-blue-100 text-blue-600' },
                ].map((tab) => {
                  const Icon = Icons[tab.icon];
                  const isActive = filters.type === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setFilters({ ...filters, type: tab.id })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${isActive
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {tab.label}
                      <span className={`min-w-[22px] h-[22px] px-1.5 rounded-md text-xs font-semibold flex items-center justify-center
                        ${isActive ? tab.activeBadge : 'bg-gray-200 text-gray-500'}`}>
                        {typeCounts[tab.id]}
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
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 w-14">#</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 w-[22%]">User</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 w-[14%]">Category</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 w-[12%]">
                    {filters.type === 'business' ? 'Total Spent' : 'Followers'}
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 w-[12%]">Campaigns</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 w-[10%]">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 w-[12%]">Rating</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 w-[12%]">Action</th>
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
                  sortedUsers.map((user, index) => {
                    const isInfluencer = user.type === 'influencer';
                    return (
                      <tr
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className="hover:bg-gray-50 transition-colors cursor-pointer group"
                      >
                        {/* Row Number */}
                        <td className="px-5 py-4">
                          <span className="text-sm text-gray-400 font-medium">{index + 1}</span>
                        </td>
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

// ============================================
// VERIFICATION COMPONENTS
// ============================================

// Editable Verification Field Component
function EditableVerificationField({
  label,
  value,
  verified,
  icon: IconComponent,
  onEdit,
  onVerify,
  onUnverify,
  placeholder = 'Not provided',
  copyable = false,
}: {
  label: string;
  value: string | null;
  verified: boolean;
  icon: (props: IconProps) => React.JSX.Element;
  onEdit: (newValue: string) => void;
  onVerify: () => void;
  onUnverify: () => void;
  placeholder?: string;
  copyable?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');

  const handleSave = () => {
    onEdit(editValue.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value || '');
    setIsEditing(false);
  };

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
    }
  };

  return (
    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all group">
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${verified ? 'bg-emerald-100' : 'bg-gray-200'}`}>
          <IconComponent className={`w-5 h-5 ${verified ? 'text-emerald-600' : 'text-gray-400'}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            {!isEditing && (
              <div className="flex items-center gap-1.5">
                {value && copyable && (
                  <button
                    onClick={handleCopy}
                    className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy"
                  >
                    <Icons.copy className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                  title="Edit"
                >
                  <Icons.edit className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder={placeholder}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 text-xs font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500 break-all">
              {value || placeholder}
            </p>
          )}
        </div>

        {!isEditing && (
          <div className="shrink-0">
            {verified ? (
              <div className="flex flex-col items-end gap-1.5">
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <Icons.checkCircle className="w-4 h-4" /> Verified
                </span>
                <button
                  onClick={onUnverify}
                  className="text-[10px] text-gray-400 hover:text-rose-600 hover:underline transition-colors"
                >
                  Unverify
                </button>
              </div>
            ) : value ? (
              <button
                onClick={onVerify}
                className="px-2.5 py-1 text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                Verify
              </button>
            ) : (
              <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
                <Icons.clock className="w-4 h-4" /> Not Provided
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Verification Card Component
function VerificationCard({ user, isInfluencer }: { user: User; isInfluencer: boolean }) {
  const handleEdit = (field: string, value: string) => {
    console.log(`Editing ${field} to:`, value);
    // TODO: API call to update field
  };

  const handleVerify = (field: string) => {
    console.log(`Verifying ${field}`);
    // TODO: API call to verify field
  };

  const handleUnverify = (field: string) => {
    console.log(`Unverifying ${field}`);
    // TODO: API call to unverify field
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Icons.shieldCheck className="w-4 h-4 text-emerald-500" />
        Verification & Licenses
      </h3>

      <div className="space-y-3">
        {isInfluencer && 'mawthooqId' in user ? (
          <>
            {/* Mawthooq OR FAL - Only one should be filled */}
            <div className="mb-3 pb-3 border-b border-gray-100">
              <p className="text-xs text-gray-500 mb-3">
                License Type: <span className="font-medium text-gray-700">Mawthooq or FAL</span> (one required)
              </p>
            </div>

            <EditableVerificationField
              label="Mawthooq ID"
              value={user.mawthooqId}
              verified={user.mawthooqVerified || false}
              icon={Icons.fileText}
              onEdit={(val) => handleEdit('mawthooqId', val)}
              onVerify={() => handleVerify('mawthooqId')}
              onUnverify={() => handleUnverify('mawthooqId')}
              placeholder="Enter Mawthooq ID"
              copyable
            />

            <EditableVerificationField
              label="FAL Number (Free Agent License)"
              value={user.falNumber}
              verified={user.falVerified || false}
              icon={Icons.fileText}
              onEdit={(val) => handleEdit('falNumber', val)}
              onVerify={() => handleVerify('falNumber')}
              onUnverify={() => handleUnverify('falNumber')}
              placeholder="Enter FAL Number"
              copyable
            />

            {/* IBAN */}
            <div className="pt-2">
              <EditableVerificationField
                label="IBAN (Bank Account)"
                value={user.iban}
                verified={user.ibanVerified}
                icon={Icons.wallet}
                onEdit={(val) => handleEdit('iban', val)}
                onVerify={() => handleVerify('iban')}
                onUnverify={() => handleUnverify('iban')}
                placeholder="SA00 0000 0000 0000 0000 0000"
                copyable
              />
            </div>
          </>
        ) : 'crNumber' in user ? (
          <>
            {/* CR OR FL - Only one should be filled */}
            <div className="mb-3 pb-3 border-b border-gray-100">
              <p className="text-xs text-gray-500 mb-3">
                License Type: <span className="font-medium text-gray-700">CR or FL</span> (one required)
              </p>
            </div>

            <EditableVerificationField
              label="CR Number (Commercial Registration)"
              value={user.crNumber}
              verified={user.crVerified || false}
              icon={Icons.building}
              onEdit={(val) => handleEdit('crNumber', val)}
              onVerify={() => handleVerify('crNumber')}
              onUnverify={() => handleUnverify('crNumber')}
              placeholder="Enter CR Number"
              copyable
            />

            <EditableVerificationField
              label="FL Number (Freelance License)"
              value={user.flNumber}
              verified={user.flVerified || false}
              icon={Icons.fileText}
              onEdit={(val) => handleEdit('flNumber', val)}
              onVerify={() => handleVerify('flNumber')}
              onUnverify={() => handleUnverify('flNumber')}
              placeholder="Enter FL Number"
              copyable
            />
          </>
        ) : null}

        {user.verificationDate && (
          <p className="text-xs text-gray-400 text-center pt-3 mt-3 border-t border-gray-100">
            Last verified on {new Date(user.verificationDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

// ============================================
// TAB COMPONENTS
// ============================================

// Overview Tab Component
function OverviewTab({ user, isInfluencer }: { user: User; isInfluencer: boolean }) {
  const getStatusConfig = (status: UserStatus) => {
    const configs = {
      verified: { label: 'Verified', bg: 'bg-emerald-500', text: 'text-white' },
      pending: { label: 'Pending Verification', bg: 'bg-amber-500', text: 'text-white' },
      suspended: { label: 'Suspended', bg: 'bg-rose-500', text: 'text-white' },
      banned: { label: 'Banned', bg: 'bg-slate-700', text: 'text-white' },
    };
    return configs[status] || configs.pending;
  };

  return (
    <div className="space-y-6">
      {/* Suspension Notice */}
      {user.status === 'suspended' && 'suspensionReason' in user && user.suspensionReason && (
        <div className="bg-rose-50 rounded-2xl border border-rose-200 p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
              <Icons.ban className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-rose-800">Account Suspended</h3>
              <p className="text-sm text-rose-700 mt-1">{user.suspensionReason}</p>
              {'suspendedAt' in user && user.suspendedAt && (
                <p className="text-xs text-rose-500 mt-2">
                  Suspended on {new Date(user.suspendedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Basic Info & Verification */}
      <div className="grid grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Icons.user className="w-4 h-4 text-gray-400" />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icons.mail className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icons.phone className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium text-gray-900">{user.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icons.mapPin className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium text-gray-900">{user.location}, Saudi Arabia</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icons.calendar className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Joined</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            {!isInfluencer && 'contactPerson' in user && user.contactPerson && (
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Icons.user className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Contact Person</p>
                  <p className="text-sm font-medium text-gray-900">{user.contactPerson}</p>
                  {'contactRole' in user && user.contactRole && (
                    <p className="text-xs text-gray-500">{user.contactRole}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Verification Status */}
        <VerificationCard user={user} isInfluencer={isInfluencer} />
      </div>

      {/* Ratings & Reviews */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Icons.star className="w-4 h-4 text-amber-400" />
          Ratings & Reviews
        </h3>
        {user.rating > 0 ? (
          <>
            <div className="flex items-center gap-8 mb-6 pb-6 border-b border-gray-100">
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900">{user.rating}</p>
                <div className="flex items-center gap-1 justify-center mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Icons.star
                      key={i}
                      className={`w-4 h-4 ${i <= Math.round(user.rating) ? 'text-amber-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">{MOCK_USER_REVIEWS.length} reviews</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = MOCK_USER_REVIEWS.filter(r => r.rating === stars).length;
                  const percentage = (count / MOCK_USER_REVIEWS.length) * 100;
                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-3">{stars}</span>
                      <Icons.star className="w-3 h-3 text-amber-400" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {MOCK_USER_REVIEWS.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <Icons.starOutline className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No reviews yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Review Card Component
function ReviewCard({ review }: { review: UserReview }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    // In real implementation, this would call an API
    console.log('Deleting review:', review.id);
    setShowDeleteConfirm(false);
  };

  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (showDeleteConfirm) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Icons.alertCircle className="w-5 h-5 text-rose-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-rose-900 mb-1">Delete Review</h4>
            <p className="text-sm text-rose-700 mb-3">
              Are you sure you want to delete this review? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="px-3 py-1.5 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1">
          {/* Reviewer Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            {review.reviewerName.charAt(0)}
          </div>

          {/* Reviewer Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-sm font-semibold text-gray-900 truncate">{review.reviewerName}</h4>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{getRelativeTime(review.timestamp)}</span>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icons.star
                  key={star}
                  className={`w-4 h-4 ${star <= review.rating ? 'text-amber-400' : 'text-gray-300'}`}
                />
              ))}
            </div>

            {/* Campaign Badge */}
            {review.campaignName && (
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md mb-2">
                <Icons.megaphone className="w-3 h-3" />
                {review.campaignName}
              </div>
            )}
          </div>
        </div>

        {/* Delete Button Only */}
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0"
          title="Delete review"
        >
          <Icons.trash className="w-4 h-4" />
        </button>
      </div>

      {/* Review Comment */}
      <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
    </div>
  );
}

// Social Accounts Tab Component
function SocialAccountsTab({ user }: { user: InfluencerUser }) {
  // Note: formatFollowers is imported from designSystem

  const socialPlatforms = [
    { key: 'instagram' as const, label: 'Instagram', icon: 'instagram' as const, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { key: 'tiktok' as const, label: 'TikTok', icon: 'tiktok' as const, color: 'bg-black' },
    { key: 'youtube' as const, label: 'YouTube', icon: 'youtube' as const, color: 'bg-red-600' },
    { key: 'snapchat' as const, label: 'Snapchat', icon: 'snapchat' as const, color: 'bg-yellow-400' },
    { key: 'twitter' as const, label: 'X (Twitter)', icon: 'twitter' as const, color: 'bg-black' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {socialPlatforms.map((platform) => {
          const count = user.followers[platform.key];
          if (!count) return null;
          const Icon = Icons[platform.icon];
          return (
            <div key={platform.key} className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${platform.color} flex items-center justify-center`}>
                  {Icon && <Icon className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">{platform.label}</h4>
                  <p className="text-sm text-gray-500">{user.handle}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{formatFollowers(count)}</p>
                <p className="text-xs text-gray-500 mt-1">Followers</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <button className="flex-1 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Icons.externalLink className="w-4 h-4" />
                  View Profile
                </button>
                <button className="flex-1 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Icons.refresh className="w-4 h-4" />
                  Refresh Stats
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Campaigns Tab Component
function CampaignsTab({ user, isInfluencer }: { user: User; isInfluencer: boolean }) {
  const campaigns = isInfluencer ? MOCK_INFLUENCER_CAMPAIGNS : MOCK_BUSINESS_CAMPAIGNS;

  return (
    <div className="space-y-6">
      {/* Campaign Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-1">Total Campaigns</p>
          <p className="text-2xl font-bold text-gray-900">{user.totalCampaigns}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-1">Completed</p>
          <p className="text-2xl font-bold text-emerald-600">{user.completedCampaigns}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-1">Active</p>
          <p className="text-2xl font-bold text-blue-600">{user.activeCampaigns}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-1">Dispute Rate</p>
          <p className={`text-2xl font-bold ${user.disputeRate > 10 ? 'text-rose-600' : 'text-gray-900'}`}>{user.disputeRate}%</p>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Campaign History</h3>
        </div>

        <table className="w-full table-fixed">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-14">#</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[18%]">Campaign</th>
              {isInfluencer ? (
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[14%]">Business</th>
              ) : (
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[14%]">Progress</th>
              )}
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[10%]">Type</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[12%]">{isInfluencer ? 'Payment' : 'Budget'}</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[10%]">Status</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[12%]">Date</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-14"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns.map((campaign, index) => (
              <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-400 font-medium">{index + 1}</span>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-xs text-gray-500">{campaign.id}</p>
                </td>
                {isInfluencer && 'business' in campaign ? (
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-600">{campaign.business}</p>
                  </td>
                ) : !isInfluencer && 'influencers' in campaign ? (
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: campaign.influencers > 0 ? `${(campaign.completedInfluencers / campaign.influencers) * 100}%` : '0%' }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{campaign.completedInfluencers}/{campaign.influencers}</span>
                    </div>
                  </td>
                ) : <td></td>}
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                    campaign.type === 'public' ? 'bg-emerald-50 text-emerald-700' :
                    campaign.type === 'invite' ? 'bg-blue-50 text-blue-700' :
                    'bg-purple-50 text-purple-700'
                  }`}>
                    {campaign.type === 'public' ? 'Public' : campaign.type === 'invite' ? 'Invite' : 'Hybrid'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-gray-900">
                    SAR {(isInfluencer && 'payment' in campaign ? campaign.payment : 'budget' in campaign ? campaign.budget : 0).toLocaleString()}
                  </p>
                  {isInfluencer && 'paymentStatus' in campaign && (
                    <p className={`text-xs ${
                      campaign.paymentStatus === 'released' ? 'text-emerald-600' :
                      campaign.paymentStatus === 'in_escrow' ? 'text-amber-600' :
                      'text-rose-600'
                    }`}>
                      {campaign.paymentStatus === 'released' ? 'Released' :
                       campaign.paymentStatus === 'in_escrow' ? 'In Escrow' :
                       'Held'}
                    </p>
                  )}
                  {!isInfluencer && 'spent' in campaign && campaign.spent > 0 && (
                    <p className="text-xs text-gray-500">Spent: SAR {campaign.spent.toLocaleString()}</p>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-blue-50 text-blue-700' :
                    campaign.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                    campaign.status === 'cancelled' ? 'bg-gray-100 text-gray-600' :
                    'bg-rose-50 text-rose-700'
                  }`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm text-gray-600">
                    {new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="text-xs text-gray-400">
                    → {new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="h-8 w-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors ml-auto">
                    <Icons.arrowUpRight className="w-4 h-4 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Financial Tab Component
function FinancialTab({ user, isInfluencer }: { user: User; isInfluencer: boolean }) {
  const transactions = isInfluencer ? MOCK_INFLUENCER_TRANSACTIONS : MOCK_BUSINESS_TRANSACTIONS;

  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div className="grid grid-cols-4 gap-4">
        {isInfluencer && 'totalEarnings' in user ? (
          <>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Icons.checkCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-sm text-gray-500">Total Received</p>
              </div>
              <p className="text-2xl font-bold text-emerald-600">SAR {user.totalEarnings.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Transferred to your IBAN</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Icons.clock className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-sm text-gray-500">Pending Approval</p>
              </div>
              <p className="text-2xl font-bold text-amber-600">SAR {user.pendingBalance.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Awaiting business approval</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                  <Icons.alertCircle className="w-5 h-5 text-rose-600" />
                </div>
                <p className="text-sm text-gray-500">Held (Disputes)</p>
              </div>
              <p className="text-2xl font-bold text-rose-600">SAR {(user.heldAmount || 0).toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Under investigation</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Icons.receipt className="w-5 h-5 text-violet-600" />
                </div>
                <p className="text-sm text-gray-500">Commission Deducted</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">SAR {Math.round(user.totalEarnings * 0.031).toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">3% platform fee</p>
            </div>
          </>
        ) : 'walletBalance' in user ? (
          <>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icons.wallet className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm text-gray-500">Wallet Balance</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">SAR {user.walletBalance.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Available funds</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Icons.clock className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-sm text-gray-500">In Escrow</p>
              </div>
              <p className="text-2xl font-bold text-amber-600">SAR {user.currentEscrow.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Reserved for campaigns</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Icons.checkCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-sm text-gray-500">Total Released</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">SAR {user.totalSpent.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Paid to influencers</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Icons.receipt className="w-5 h-5 text-violet-600" />
                </div>
                <p className="text-sm text-gray-500">Commission Paid</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">SAR {Math.round(user.totalSpent * 0.031).toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">3% platform fee</p>
            </div>
          </>
        ) : null}
      </div>

      {/* IBAN Information - Influencer Only */}
      {isInfluencer && 'iban' in user && user.iban && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Bank Account (IBAN)</p>
              <p className="text-lg font-mono text-gray-600">{user.iban}</p>
            </div>
            <div className="flex items-center gap-3">
              {'ibanVerified' in user && user.ibanVerified ? (
                <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium flex items-center gap-2">
                  <Icons.checkCircle className="w-4 h-4" />
                  Verified
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-sm font-medium">
                  Pending Verification
                </span>
              )}
              <button className="h-9 px-4 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                <Icons.copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Transaction History</h3>
        </div>

        <table className="w-full table-fixed">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-14">#</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[16%]">Transaction</th>
              {isInfluencer ? (
                <>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[20%]">Campaign / Business</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[10%]">Gross</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[10%]">Commission</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[12%]">Net to IBAN</th>
                </>
              ) : (
                <>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[28%]">Details</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[14%]">Amount</th>
                </>
              )}
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[10%]">Date</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-[10%]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((txn, index) => {
              const typeConfig: Record<string, { icon: keyof typeof Icons; bg: string; color: string; label: string }> = {
                // Influencer types
                paid: { icon: 'checkCircle', bg: 'bg-emerald-50', color: 'text-emerald-600', label: 'Payment Received' },
                pending_approval: { icon: 'clock', bg: 'bg-amber-50', color: 'text-amber-600', label: 'Pending Approval' },
                pending_content: { icon: 'clock', bg: 'bg-blue-50', color: 'text-blue-600', label: 'In Review' },
                in_review: { icon: 'eye', bg: 'bg-blue-50', color: 'text-blue-600', label: 'In Review' },
                held: { icon: 'alertCircle', bg: 'bg-rose-50', color: 'text-rose-600', label: 'Held' },
                dispute_resolved: { icon: 'scale', bg: 'bg-violet-50', color: 'text-violet-600', label: 'Dispute Resolved' },
                // Business types
                wallet_deposit: { icon: 'plus', bg: 'bg-emerald-50', color: 'text-emerald-600', label: 'Wallet Deposit' },
                wallet_withdrawal: { icon: 'minus', bg: 'bg-blue-50', color: 'text-blue-600', label: 'Wallet Withdrawal' },
                escrow_deposit: { icon: 'dollarSign', bg: 'bg-amber-50', color: 'text-amber-600', label: 'Escrow Reserved' },
                payment_released: { icon: 'checkCircle', bg: 'bg-emerald-50', color: 'text-emerald-600', label: 'Payment Released' },
                refund: { icon: 'trendingUp', bg: 'bg-emerald-50', color: 'text-emerald-600', label: 'Refund' },
              };
              const config = typeConfig[txn.type] || { icon: 'dollarSign' as const, bg: 'bg-gray-100', color: 'text-gray-500', label: txn.type };
              const Icon = Icons[config.icon];

              const isWalletOp = txn.type === 'wallet_deposit' || txn.type === 'wallet_withdrawal';

              return (
                <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-400 font-medium">{index + 1}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${config.bg}`}>
                        {Icon && <Icon className={`w-4 h-4 ${config.color}`} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{txn.id}</p>
                        <p className="text-xs text-gray-500">{config.label}</p>
                      </div>
                    </div>
                  </td>
                  {isInfluencer ? (
                    <>
                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm text-gray-900">{txn.description}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {'campaign' in txn && txn.campaign && <span className="text-xs text-blue-600 font-medium">{txn.campaign}</span>}
                            {'business' in txn && txn.business && <span className="text-xs text-gray-400">• {txn.business}</span>}
                          </div>
                          {'transferRef' in txn && txn.transferRef && txn.type === 'paid' && (
                            <p className="text-xs text-emerald-600 mt-1">Transfer Ref: {txn.transferRef}</p>
                          )}
                          {'disputeId' in txn && txn.disputeId && (
                            <p className="text-xs text-violet-600 mt-1">Dispute: {txn.disputeId}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        {'grossAmount' in txn && txn.grossAmount ? (
                          <p className="text-sm text-gray-600">SAR {txn.grossAmount.toLocaleString()}</p>
                        ) : (
                          <p className="text-sm text-gray-300">—</p>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        {'commission' in txn && txn.commission ? (
                          <p className="text-sm text-rose-500">-SAR {txn.commission.toLocaleString()}</p>
                        ) : (
                          <p className="text-sm text-gray-300">—</p>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <p className={`text-sm font-semibold ${
                          txn.type === 'paid' || txn.type === 'dispute_resolved' ? 'text-emerald-600' :
                          txn.type === 'pending_approval' || txn.type === 'pending_content' || txn.type === 'in_review' ? 'text-amber-600' :
                          txn.type === 'held' ? 'text-rose-600' :
                          'text-gray-900'
                        }`}>
                          {txn.amount > 0 ? '+' : ''}SAR {Math.abs(txn.amount).toLocaleString()}
                        </p>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-4">
                        {isWalletOp ? (
                          <div>
                            <p className="text-sm text-gray-900">{txn.description}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {'paymentMethod' in txn && txn.paymentMethod && (
                                <span className="text-xs text-gray-500">via {txn.paymentMethod}</span>
                              )}
                              {'iban' in txn && txn.iban && (
                                <span className="text-xs text-gray-500">to {txn.iban}</span>
                              )}
                            </div>
                            {'reference' in txn && txn.reference && (
                              <p className="text-xs text-gray-400 mt-0.5">Ref: {txn.reference}</p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm text-gray-900">{txn.description}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {'campaign' in txn && txn.campaign && <span className="text-xs text-blue-600 font-medium">{txn.campaign}</span>}
                              {'campaignName' in txn && txn.campaignName && <span className="text-xs text-gray-400">• {txn.campaignName}</span>}
                              {'influencer' in txn && txn.influencer && <span className="text-xs text-violet-600">• {txn.influencer}</span>}
                            </div>
                            {'netToInfluencer' in txn && txn.netToInfluencer && (
                              <p className="text-xs text-gray-400 mt-0.5">Net to influencer: SAR {txn.netToInfluencer.toLocaleString()}</p>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <p className={`text-sm font-semibold ${
                          txn.amount > 0 ? 'text-emerald-600' : 'text-gray-900'
                        }`}>
                          {txn.amount > 0 ? '+' : ''}SAR {Math.abs(txn.amount).toLocaleString()}
                        </p>
                      </td>
                    </>
                  )}
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-600">
                      {new Date(txn.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(txn.date).getFullYear()}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${
                      txn.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                      txn.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                      txn.status === 'held' ? 'bg-rose-50 text-rose-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Activity Log Tab Component
function ActivityLogTab({ user, isInfluencer }: { user: User; isInfluencer: boolean }) {
  const activities = isInfluencer ? MOCK_INFLUENCER_ACTIVITY_LOG : MOCK_BUSINESS_ACTIVITY_LOG;

  const iconConfig: Record<string, { icon: keyof typeof Icons; bg: string; color: string }> = {
    content_approved: { icon: 'checkCircle', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    payment_received: { icon: 'dollarSign', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    content_submitted: { icon: 'image', bg: 'bg-blue-50', color: 'text-blue-600' },
    contract_signed: { icon: 'fileCheck', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    campaign_accepted: { icon: 'check', bg: 'bg-blue-50', color: 'text-blue-600' },
    revision_requested: { icon: 'edit', bg: 'bg-amber-50', color: 'text-amber-600' },
    withdrawal: { icon: 'wallet', bg: 'bg-violet-50', color: 'text-violet-600' },
    dispute_opened: { icon: 'alertCircle', bg: 'bg-rose-50', color: 'text-rose-600' },
    dispute_resolved: { icon: 'checkCircle', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    verification_approved: { icon: 'shieldCheck', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    campaign_created: { icon: 'megaphone', bg: 'bg-blue-50', color: 'text-blue-600' },
    payment_escrowed: { icon: 'dollarSign', bg: 'bg-amber-50', color: 'text-amber-600' },
    influencer_invited: { icon: 'users', bg: 'bg-blue-50', color: 'text-blue-600' },
    campaign_completed: { icon: 'checkCircle', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    refund_received: { icon: 'dollarSign', bg: 'bg-emerald-50', color: 'text-emerald-600' },
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Activity Log</h3>
        <span className="text-xs text-gray-400">Recent activity</span>
      </div>
      <div className="divide-y divide-gray-100">
        {activities.map((activity) => {
          const config = iconConfig[activity.action] || { icon: 'activity' as const, bg: 'bg-gray-100', color: 'text-gray-500' };
          const Icon = Icons[config.icon];

          return (
            <div key={activity.id} className="px-5 py-4 flex items-start gap-4 hover:bg-gray-50">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.bg} shrink-0`}>
                {Icon && <Icon className={`w-5 h-5 ${config.color}`} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.details}</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-gray-400">
                    {new Date(activity.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {' • '}
                    {new Date(activity.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {'campaign' in activity && activity.campaign && (
                    <span className="text-xs text-blue-600 font-medium">{activity.campaign}</span>
                  )}
                  {'disputeId' in activity && activity.disputeId && (
                    <span className="text-xs text-rose-600 font-medium">{activity.disputeId}</span>
                  )}
                </div>
              </div>
              {'amount' in activity && activity.amount && (
                <span className={`text-sm font-semibold ${activity.amount > 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {activity.amount > 0 ? '+' : '-'}SAR {Math.abs(activity.amount).toLocaleString()}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Admin Notes Section Component
function AdminNotesSection({ userId }: { userId: string }) {
  const [notes, setNotes] = useState(MOCK_ADMIN_NOTES);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteType, setNewNoteType] = useState<AdminNote['noteType']>('general');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAddNote = () => {
    if (!newNoteContent.trim()) return;

    const note: AdminNote = {
      id: `NOTE-${Date.now()}`,
      userId,
      adminName: 'Admin', // In real app, get from auth
      noteType: newNoteType,
      content: newNoteContent,
      timestamp: new Date().toISOString()
    };

    setNotes([note, ...notes]);
    setNewNoteContent('');
    setNewNoteType('general');
    setShowAddNote(false);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(n => n.id !== noteId));
  };

  const handleEditNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (note) {
      setEditingNoteId(noteId);
      setEditContent(note.content);
    }
  };

  const handleSaveEdit = () => {
    if (!editContent.trim() || !editingNoteId) return;

    setNotes(notes.map(n =>
      n.id === editingNoteId
        ? { ...n, content: editContent }
        : n
    ));
    setEditingNoteId(null);
    setEditContent('');
  };

  const getNoteTypeColor = (type: AdminNote['noteType']) => {
    const colors = {
      general: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      verification: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
      payment: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
      content: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
      warning: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
    };
    return colors[type];
  };

  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900">Admin Notes</h4>
        <button
          onClick={() => setShowAddNote(!showAddNote)}
          className="h-7 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Icons.plus className="w-3.5 h-3.5" />
          Add Note
        </button>
      </div>

      {/* Add Note Form */}
      {showAddNote && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
          <select
            value={newNoteType}
            onChange={(e) => setNewNoteType(e.target.value as AdminNote['noteType'])}
            className="w-full mb-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="general">General Note</option>
            <option value="verification">Verification Issue</option>
            <option value="payment">Payment Issue</option>
            <option value="content">Content Issue</option>
            <option value="warning">Warning</option>
          </select>
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder="Type your note here..."
            className="w-full h-20 px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddNote}
              className="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors"
            >
              Save Note
            </button>
            <button
              onClick={() => {
                setShowAddNote(false);
                setNewNoteContent('');
                setNewNoteType('general');
              }}
              className="h-8 px-3 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes Timeline */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="py-8 text-center">
            <Icons.fileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No notes yet</p>
          </div>
        ) : (
          notes.map((note) => {
            const colors = getNoteTypeColor(note.noteType);
            const isEditing = editingNoteId === note.id;

            return (
              <div
                key={note.id}
                className={`p-3 rounded-lg border ${colors.border} ${colors.bg}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold ${colors.text} uppercase tracking-wide`}>
                        {note.noteType.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{note.adminName}</span>
                    </div>
                    <p className="text-xs text-gray-400">{getRelativeTime(note.timestamp)}</p>
                  </div>
                  {!isEditing && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditNote(note.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                        title="Edit note"
                      >
                        <Icons.edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1 text-gray-400 hover:text-rose-600 rounded transition-colors"
                        title="Delete note"
                      >
                        <Icons.trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full h-16 px-2 py-2 rounded-lg bg-white border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="h-7 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingNoteId(null);
                          setEditContent('');
                        }}
                        className="h-7 px-3 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 leading-relaxed">{note.content}</p>
                )}
              </div>
            );
          })
        )}
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

  // Note: formatFollowers and getTotalFollowers are imported from designSystem

  const socialPlatforms = [
    { key: 'instagram', label: 'Instagram', icon: 'instagram', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { key: 'tiktok', label: 'TikTok', icon: 'tiktok', color: 'bg-black' },
    { key: 'youtube', label: 'YouTube', icon: 'youtube', color: 'bg-red-600' },
    { key: 'snapchat', label: 'Snapchat', icon: 'snapchat', color: 'bg-yellow-400' },
    { key: 'twitter', label: 'X (Twitter)', icon: 'twitter', color: 'bg-black' },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 ml-60">
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

          {/* Tab Content */}
          {activeTab === 'overview' && <OverviewTab user={user} isInfluencer={isInfluencer} />}
          {activeTab === 'social' && isInfluencer && <SocialAccountsTab user={user} />}
          {activeTab === 'campaigns' && <CampaignsTab user={user} isInfluencer={isInfluencer} />}
          {activeTab === 'financial' && <FinancialTab user={user} isInfluencer={isInfluencer} />}
          {activeTab === 'activity' && <ActivityLogTab user={user} isInfluencer={isInfluencer} />}
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
          </div>

          {/* Admin Notes */}
          <AdminNotesSection userId={user.id} />
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<div className="flex h-screen bg-gray-100"><Sidebar active="users" setActive={() => {}} /><div className="flex-1 p-5"><UserListSkeleton /></div></div>}>
      <UsersPageContent />
    </Suspense>
  );
}

/**
 * Admin Dropdown Component
 * Profile dropdown menu in the header
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/common/Icons';

export default function AdminDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    router.push('/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
      >
        {/* Avatar */}
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">AA</span>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
        </div>

        {/* Name & Role */}
        <div className="text-left hidden sm:block">
          <p className="text-sm font-semibold text-gray-900">Ahmed Al-Qahtani</p>
          <p className="text-xs text-gray-500">Super Admin</p>
        </div>

        {/* Chevron */}
        <Icons.chevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">
          {/* Header */}
          <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">AA</span>
              </div>
              <div>
                <p className="text-white font-semibold">Ahmed Al-Qahtani</p>
                <p className="text-slate-400 text-sm">ahmed@jusor.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="px-2 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-semibold">
                Super Admin
              </span>
              <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Online
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icons.user className="w-4 h-4 text-gray-600" />
              </div>
              <span>My Profile</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icons.settings className="w-4 h-4 text-gray-600" />
              </div>
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icons.bell className="w-4 h-4 text-gray-600" />
              </div>
              <span>Notifications</span>
              <span className="ml-auto px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-xs font-semibold">3</span>
            </button>
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                <Icons.logout className="w-4 h-4 text-rose-600" />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Sidebar Component
 * Main navigation sidebar for the admin panel
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/common/Icons';
import { SIDEBAR_GROUPS } from '@/lib/constants';

interface SidebarProps {
  active: string;
  setActive: (id: string) => void;
}

export default function Sidebar({ active, setActive }: SidebarProps) {
  const router = useRouter();

  const handleNavClick = (id: string) => {
    // Route to specific pages
    if (id === 'disputes') {
      router.push('/disputes');
    } else if (id === 'users') {
      router.push('/users');
    } else if (id === 'dashboard') {
      router.push('/');
    } else {
      // For now, just update active state
      setActive(id);
    }
  };

  return (
    <div className="w-60 bg-slate-900 flex flex-col h-screen shrink-0">
      {/* Logo Header */}
      <div className="h-14 flex items-center px-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <span className="text-white font-semibold">JUSOR</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
            Admin
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2.5 py-3 overflow-y-auto">
        {SIDEBAR_GROUPS.map((group, i) => (
          <div key={i} className="mb-4">
            <p className="px-2.5 mb-1.5 text-[10px] font-semibold text-slate-500 tracking-wider">
              {group.label}
            </p>
            {group.items.map((item) => {
              const IconComp = Icons[item.icon as keyof typeof Icons];
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium mb-0.5 transition-colors
                    ${isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                >
                  {IconComp && <IconComp className="w-4 h-4" />}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count && (
                    <span className={`min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold flex items-center justify-center text-white ${item.color}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-2.5 border-t border-slate-800">
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/50">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-semibold text-xs">AA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Ahmed Al-Qahtani</p>
            <p className="text-[10px] text-slate-500">Super Admin</p>
          </div>
          <Icons.more className="w-4 h-4 text-slate-500" />
        </div>
      </div>
    </div>
  );
}

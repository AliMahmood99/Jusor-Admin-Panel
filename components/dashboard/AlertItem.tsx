/**
 * AlertItem Component
 * Displays system alerts that need admin attention
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';

export interface Alert {
  id: number;
  type: 'overdue' | 'dispute' | 'expiring' | 'risk';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
  link: string;
}

interface AlertItemProps {
  alert: Alert;
  onAction: (alert: Alert) => void;
}

export default function AlertItem({ alert, onAction }: AlertItemProps) {
  const severityConfig = {
    high: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      icon: 'bg-rose-100',
      iconColor: 'text-rose-600',
      badge: 'bg-rose-100 text-rose-700'
    },
    medium: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      icon: 'bg-amber-100',
      iconColor: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-700'
    },
    low: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'bg-blue-100',
      iconColor: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-700'
    },
  };
  const config = severityConfig[alert.severity];

  const typeIcons: Record<Alert['type'], keyof typeof Icons> = {
    overdue: 'clock',
    dispute: 'scale',
    expiring: 'calendar',
    risk: 'alertTriangle',
  };
  const Icon = Icons[typeIcons[alert.type]] || Icons.alertCircle;

  return (
    <div className={`${config.bg} rounded-xl border ${config.border} p-4`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg ${config.icon} flex items-center justify-center shrink-0`}>
          <Icon className={`w-4 h-4 ${config.iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold text-slate-900">{alert.title}</p>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${config.badge}`}>
              {alert.severity}
            </span>
          </div>
          <p className="text-xs text-slate-600">{alert.description}</p>
        </div>
        <button
          onClick={() => onAction(alert)}
          className="shrink-0 h-8 px-3 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
        >
          {alert.action}
          <Icons.arrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

/**
 * Contract Requirements Component
 * Displays contract requirement checklist with progress
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';
import type { ContractRequirement } from '@/types';
import { requirementsMet } from '@/lib/disputeUtils';

interface ContractRequirementsProps {
  requirements: ContractRequirement[];
}

export default function ContractRequirements({ requirements }: ContractRequirementsProps) {
  if (!requirements || requirements.length === 0) {
    return null;
  }

  const percentage = requirementsMet(requirements);
  const metCount = requirements.filter(r => r.met).length;
  const totalCount = requirements.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Contract Requirements</h3>
        <span className="text-sm font-medium text-slate-600">
          {metCount} / {totalCount} Met
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-600">Completion</span>
          <span className="text-xs font-bold text-slate-900">{percentage}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage === 100 ? 'bg-emerald-500' :
              percentage >= 70 ? 'bg-blue-500' :
              percentage >= 40 ? 'bg-amber-500' :
              'bg-rose-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-2.5">
        {requirements.map((requirement, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              requirement.met ? 'bg-emerald-50' : 'bg-rose-50'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
              requirement.met ? 'bg-emerald-500' : 'bg-rose-500'
            }`}>
              {requirement.met ? (
                <Icons.check className="w-3 h-3 text-white" />
              ) : (
                <Icons.x className="w-3 h-3 text-white" />
              )}
            </div>
            <span className={`text-sm font-medium ${
              requirement.met ? 'text-emerald-900' : 'text-rose-900'
            }`}>
              {requirement.label}
            </span>
          </div>
        ))}
      </div>

      {/* Summary */}
      {percentage < 100 && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-2">
            <Icons.alertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-800">
              {totalCount - metCount} requirement{totalCount - metCount !== 1 ? 's' : ''} not met.
              This may affect the dispute resolution.
            </p>
          </div>
        </div>
      )}

      {percentage === 100 && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-start gap-2">
            <Icons.checkCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-emerald-800">
              All contract requirements have been met.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Contract Requirements Component
 * Professional contract requirement checklist with circular progress
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
  const notMetCount = totalCount - metCount;

  // Circular progress calculation
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Progress color based on percentage
  const getProgressColor = () => {
    if (percentage === 100) return { stroke: '#10B981', bg: 'bg-emerald-50', text: 'text-emerald-600' };
    if (percentage >= 70) return { stroke: '#3B82F6', bg: 'bg-blue-50', text: 'text-blue-600' };
    if (percentage >= 40) return { stroke: '#F59E0B', bg: 'bg-amber-50', text: 'text-amber-600' };
    return { stroke: '#EF4444', bg: 'bg-rose-50', text: 'text-rose-600' };
  };

  const progressColor = getProgressColor();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
            <Icons.fileCheck className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Contract Requirements</h3>
            <p className="text-xs text-gray-500">Deliverables verification checklist</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Row */}
        <div className="flex items-center gap-6 mb-6">
          {/* Circular Progress */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-24 h-24 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="none"
                stroke={progressColor.stroke}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Complete</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Icons.check className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-medium text-emerald-700">Completed</span>
              </div>
              <p className="text-2xl font-bold text-emerald-900">{metCount}</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-3.5 border border-rose-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center">
                  <Icons.x className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-medium text-rose-700">Not Met</span>
              </div>
              <p className="text-2xl font-bold text-rose-900">{notMetCount}</p>
            </div>
          </div>
        </div>

        {/* Requirements List */}
        <div className="space-y-2">
          {requirements.map((requirement, index) => (
            <div
              key={index}
              className={`group flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
                requirement.met
                  ? 'bg-white border-emerald-200 hover:border-emerald-300 hover:shadow-sm'
                  : 'bg-white border-rose-200 hover:border-rose-300 hover:shadow-sm'
              }`}
            >
              {/* Status Icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
                requirement.met ? 'bg-emerald-100' : 'bg-rose-100'
              }`}>
                {requirement.met ? (
                  <Icons.checkCircle className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Icons.xCircle className="w-5 h-5 text-rose-600" />
                )}
              </div>

              {/* Requirement Text */}
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium ${
                  requirement.met ? 'text-gray-700' : 'text-gray-700'
                }`}>
                  {requirement.label}
                </span>
              </div>

              {/* Status Badge */}
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ${
                requirement.met
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-700'
              }`}>
                {requirement.met ? 'Verified' : 'Failed'}
              </span>
            </div>
          ))}
        </div>

        {/* Summary Alert */}
        {percentage < 100 && (
          <div className="mt-5 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Icons.alertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-900">
                  {notMetCount} Requirement{notMetCount !== 1 ? 's' : ''} Not Met
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  This may affect the dispute resolution outcome
                </p>
              </div>
            </div>
          </div>
        )}

        {percentage === 100 && (
          <div className="mt-5 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Icons.shieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-900">
                  All Requirements Verified
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Contract deliverables have been successfully completed
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

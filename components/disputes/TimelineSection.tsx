/**
 * Timeline Section Component
 * Shows dispute progression timeline
 */

import React from 'react';
import { Icons } from '@/components/common/Icons';
import type { Dispute } from '@/types';

interface TimelineSectionProps {
  dispute: Dispute;
}

export default function TimelineSection({ dispute }: TimelineSectionProps) {
  const timelineSteps = [
    {
      label: 'Dispute opened',
      time: dispute.createdAt,
      status: 'completed',
      icon: Icons.alertCircle,
    },
    {
      label: 'Parties notified',
      time: dispute.createdAt,
      status: 'completed',
      icon: Icons.send,
    },
    {
      label: 'Evidence collection',
      time: dispute.evidence.length > 0 ? dispute.updatedAt : null,
      status: dispute.evidence.length > 0 ? 'completed' : 'current',
      icon: Icons.paperclip,
    },
    {
      label: 'Admin review',
      time: dispute.status === 'in_review' ? dispute.updatedAt : null,
      status: dispute.status === 'in_review' ? 'current' : dispute.status === 'resolved' ? 'completed' : 'pending',
      icon: Icons.gavel,
    },
    {
      label: 'Decision issued',
      time: dispute.resolvedAt,
      status: dispute.status === 'resolved' ? 'completed' : 'pending',
      icon: Icons.checkCircle,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-6">Timeline</h3>
      <div className="space-y-6">
        {timelineSteps.map((step, i) => {
          const StepIcon = step.icon;
          return (
            <div key={i} className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                step.status === 'completed' ? 'bg-emerald-100' :
                step.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                {step.status === 'completed' ? (
                  <Icons.check className="w-4 h-4 text-emerald-600" />
                ) : step.status === 'current' ? (
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                )}
              </div>
              <div className={`flex-1 pb-6 ${i < timelineSteps.length - 1 ? 'border-l-2 border-gray-100' : ''} -ml-4 pl-8`}>
                <p className={`font-medium ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                  {step.label}
                </p>
                {step.time && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {new Date(step.time).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

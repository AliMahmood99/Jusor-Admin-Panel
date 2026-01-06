/**
 * Dispute Party Card Component
 * Displays information about a party in the dispute
 */

import React from 'react';
import { Icons } from '@/components/common/Icons';
import type { DisputeParty } from '@/types';

interface DisputePartyCardProps {
  party: DisputeParty;
  role: 'Initiator' | 'Respondent';
}

export default function DisputePartyCard({ party, role }: DisputePartyCardProps) {
  const isInfluencer = party.type === 'influencer';
  const color = isInfluencer ? 'violet' : 'blue';
  const Icon = isInfluencer ? Icons.user : Icons.building;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        <div className={`w-5 h-5 rounded bg-${color}-100 flex items-center justify-center`}>
          <Icon className={`w-3 h-3 text-${color}-600`} />
        </div>
        {role} • {isInfluencer ? 'Influencer' : 'Business'}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${color}-500 to-${color}-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-${color}-500/25`}>
          {party.avatar || party.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <h4 className="text-base font-semibold text-gray-900">{party.name}</h4>
          <p className={`text-sm text-${color}-600`}>ID: {party.id}</p>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <button className="flex-1 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          View Profile
        </button>
        <button className={`flex-1 h-9 rounded-lg bg-${color}-600 text-white text-sm font-medium hover:bg-${color}-700 transition-colors`}>
          Message
        </button>
      </div>
    </div>
  );
}

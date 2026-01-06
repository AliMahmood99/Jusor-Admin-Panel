/**
 * Evidence Section Component
 * Displays uploaded evidence from both parties
 */

import React from 'react';
import { Icons } from '@/components/common/Icons';
import type { DisputeEvidence } from '@/types';

interface EvidenceSectionProps {
  evidence: DisputeEvidence[];
  partyName: string;
  partyType: 'influencer' | 'business';
}

export default function EvidenceSection({ evidence, partyName, partyType }: EvidenceSectionProps) {
  const color = partyType === 'influencer' ? 'violet' : 'blue';
  const Icon = partyType === 'influencer' ? Icons.user : Icons.building;

  // Mock evidence files for display
  const mockFiles = [
    { type: 'image', name: 'Screenshot_Content.png', size: '2.4 MB' },
    { type: 'document', name: 'Contract_Agreement.pdf', size: '856 KB' },
    { type: 'video', name: 'Original_Recording.mp4', size: '124 MB' },
  ];

  const displayFiles = evidence.length > 0 ? evidence : mockFiles.slice(0, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <div className={`w-5 h-5 rounded bg-${color}-100 flex items-center justify-center`}>
            <Icon className={`w-3 h-3 text-${color}-600`} />
          </div>
          {partyName}&apos;s Evidence
        </h3>
        <span className="text-xs text-gray-400">{evidence.length} files</span>
      </div>

      {evidence.length === 0 ? (
        <div className="py-12 text-center">
          <Icons.paperclip className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No evidence uploaded yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {evidence.map((file, i) => {
            const fileIcon = file.type === 'image' ? Icons.image :
                           file.type === 'video' ? Icons.video :
                           Icons.fileText;
            const FileIcon = fileIcon;
            const iconColor = file.type === 'image' ? 'blue' :
                            file.type === 'video' ? 'violet' : 'rose';

            return (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${iconColor}-100`}>
                  <FileIcon className={`w-5 h-5 text-${iconColor}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.description || `Evidence_${i + 1}`}
                  </p>
                  <p className="text-xs text-gray-500">{file.uploadedAt}</p>
                </div>
                <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-all">
                  <Icons.download className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

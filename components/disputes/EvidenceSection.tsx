/**
 * Evidence Section Component
 * Displays uploaded evidence from both parties
 */

import React from 'react';
import { Icons } from '@/components/common/Icons';
import { colorVariants } from '@/lib/designSystem';
import type { DisputeEvidence } from '@/types';

// File type icon styles (static Tailwind classes)
const fileTypeStyles = {
  image: { bg: 'bg-blue-100', text: 'text-blue-600' },
  video: { bg: 'bg-violet-100', text: 'text-violet-600' },
  document: { bg: 'bg-rose-100', text: 'text-rose-600' },
  screenshot: { bg: 'bg-blue-100', text: 'text-blue-600' },
  pdf: { bg: 'bg-rose-100', text: 'text-rose-600' },
} as const;

interface EvidenceSectionProps {
  evidence: DisputeEvidence[];
  partyName: string;
  partyType: 'influencer' | 'business';
}

export default function EvidenceSection({ evidence, partyName, partyType }: EvidenceSectionProps) {
  const colors = partyType === 'influencer' ? colorVariants.violet : colorVariants.blue;
  const Icon = partyType === 'influencer' ? Icons.user : Icons.building;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <div className={`w-5 h-5 rounded ${colors.bg} flex items-center justify-center`}>
            <Icon className={`w-3 h-3 ${colors.text}`} />
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
            const fileIcon = file.type === 'image' || file.type === 'screenshot' ? Icons.image :
                           file.type === 'video' ? Icons.video :
                           Icons.fileText;
            const FileIcon = fileIcon;
            const fileStyle = fileTypeStyles[file.type] || fileTypeStyles.document;

            return (
              <div key={file.id || i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${fileStyle.bg}`}>
                  <FileIcon className={`w-5 h-5 ${fileStyle.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.description || file.fileName || `Evidence_${i + 1}`}
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

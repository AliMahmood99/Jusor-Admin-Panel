/**
 * Decision Modal Component
 * Step-by-step wizard for issuing dispute decisions
 */

'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/common/Icons';
import type { Dispute } from '@/types';

// Decision option styles (static Tailwind classes)
const decisionStyles = {
  influencer: {
    border: 'border-violet-500',
    bgActive: 'bg-violet-50',
    iconBg: 'bg-violet-100',
    iconText: 'text-violet-600',
    radioBg: 'border-violet-500 bg-violet-500',
  },
  split: {
    border: 'border-blue-500',
    bgActive: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-600',
    radioBg: 'border-blue-500 bg-blue-500',
  },
  business: {
    border: 'border-rose-500',
    bgActive: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    iconText: 'text-rose-600',
    radioBg: 'border-rose-500 bg-rose-500',
  },
} as const;

interface DecisionModalProps {
  dispute: Dispute;
  onClose: () => void;
  onSubmit: (decision: DecisionData) => void;
}

interface DecisionData {
  type: 'influencer' | 'split' | 'business';
  percentage: number;
  reasoning: string;
  reviewed: boolean;
  understand: boolean;
}

export default function DecisionModal({ dispute, onClose, onSubmit }: DecisionModalProps) {
  const [step, setStep] = useState(1);
  const [decision, setDecision] = useState<DecisionData>({
    type: 'split',
    percentage: 50,
    reasoning: '',
    reviewed: false,
    understand: false,
  });

  const influencerAmount =
    decision.type === 'influencer'
      ? dispute.amountInDispute || 0
      : decision.type === 'business'
      ? 0
      : Math.round(((dispute.amountInDispute || 0) * decision.percentage) / 100);

  const businessAmount = (dispute.amountInDispute || 0) - influencerAmount;

  const canProceed =
    step === 1 ? true : step === 2 ? decision.reasoning.length >= 30 : decision.reviewed && decision.understand;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Icons.gavel className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Issue Decision</h2>
                <p className="text-blue-100">
                  {dispute.id} • SAR {(dispute.amountInDispute || 0).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Icons.x className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    step >= s ? 'bg-white text-blue-600' : 'bg-white/20 text-white/60'
                  }`}
                >
                  {step > s ? <Icons.check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && <div className={`flex-1 h-1 rounded-full ${step > s ? 'bg-white' : 'bg-white/20'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 px-1">
            <span className="text-xs text-blue-100">Select Resolution</span>
            <span className="text-xs text-blue-100">Add Reasoning</span>
            <span className="text-xs text-blue-100">Confirm</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Step 1: Select Resolution */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Resolution Type</h3>

              {[
                {
                  id: 'influencer' as const,
                  label: 'Full to Influencer',
                  desc: `Release SAR ${(dispute.amountInDispute || 0).toLocaleString()} to ${dispute.influencer.name}`,
                  icon: 'user' as const,
                },
                {
                  id: 'split' as const,
                  label: 'Partial Split',
                  desc: 'Divide the amount between both parties',
                  icon: 'dollarSign' as const,
                },
                {
                  id: 'business' as const,
                  label: 'Full Refund',
                  desc: `Return SAR ${(dispute.amountInDispute || 0).toLocaleString()} to ${dispute.business.name}`,
                  icon: 'building' as const,
                },
              ].map((opt) => {
                const Icon = Icons[opt.icon];
                const styles = decisionStyles[opt.id];
                const isSelected = decision.type === opt.id;

                return (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? `${styles.border} ${styles.bgActive}`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="decision"
                      checked={isSelected}
                      onChange={() => setDecision({ ...decision, type: opt.id })}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isSelected ? styles.iconBg : 'bg-gray-100'
                      }`}
                    >
                      {Icon && (
                        <Icon
                          className={`w-6 h-6 ${isSelected ? styles.iconText : 'text-gray-400'}`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{opt.label}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{opt.desc}</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? styles.radioBg : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <Icons.check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </label>
                );
              })}

              {/* Split Slider */}
              {decision.type === 'split' && (
                <div className="mt-6 p-5 bg-gray-50 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">Adjust Split</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {decision.percentage}% / {100 - decision.percentage}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={decision.percentage}
                    onChange={(e) => setDecision({ ...decision, percentage: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-violet-100 rounded-xl p-4 text-center">
                      <p className="text-xs text-violet-600 font-medium uppercase">Influencer</p>
                      <p className="text-xl font-bold text-violet-700 mt-1">SAR {influencerAmount.toLocaleString()}</p>
                    </div>
                    <div className="bg-blue-100 rounded-xl p-4 text-center">
                      <p className="text-xs text-blue-600 font-medium uppercase">Business</p>
                      <p className="text-xl font-bold text-blue-700 mt-1">SAR {businessAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Add Reasoning */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Decision Reasoning</h3>
              <p className="text-sm text-gray-500 mb-4">
                Explain your decision based on the evidence reviewed. This will be shared with both parties.
              </p>

              <textarea
                value={decision.reasoning}
                onChange={(e) => setDecision({ ...decision, reasoning: e.target.value })}
                placeholder="Based on the evidence provided, I have determined that..."
                className="w-full h-40 px-4 py-3 rounded-xl border border-gray-200 text-sm placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between mt-2">
                <span className={`text-xs ${decision.reasoning.length < 30 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {decision.reasoning.length < 30
                    ? `${30 - decision.reasoning.length} more characters needed`
                    : '✓ Minimum met'}
                </span>
                <span className="text-xs text-gray-400">{decision.reasoning.length}/500</span>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Decision</h3>

              {/* Summary */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Influencer Receives</p>
                    <p className="text-2xl font-bold text-violet-600">SAR {influencerAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Business Receives</p>
                    <p className="text-2xl font-bold text-blue-600">SAR {businessAmount.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{decision.reasoning}</p>
              </div>

              {/* Confirmations */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={decision.reviewed}
                    onChange={(e) => setDecision({ ...decision, reviewed: e.target.checked })}
                    className="mt-0.5 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">I have reviewed all evidence from both parties</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={decision.understand}
                    onChange={(e) => setDecision({ ...decision, understand: e.target.checked })}
                    className="mt-0.5 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I understand this decision is binding and will be executed immediately
                  </span>
                </label>
              </div>

              {/* Appeal Notice */}
              <div className="flex items-center gap-3 mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <Icons.alertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-sm text-amber-700">Both parties will have 5 days to appeal this decision</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-8 py-5 flex items-center justify-between">
          <button
            onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
            className="h-11 px-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-medium transition-colors"
          >
            {step > 1 ? 'Back' : 'Cancel'}
          </button>
          <button
            onClick={() => (step < 3 ? setStep(step + 1) : onSubmit(decision))}
            disabled={!canProceed}
            className={`h-11 px-8 rounded-xl font-medium transition-all flex items-center gap-2 ${
              canProceed
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {step < 3 ? (
              <>
                Continue <Icons.arrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Icons.gavel className="w-4 h-4" />
                Issue Decision
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

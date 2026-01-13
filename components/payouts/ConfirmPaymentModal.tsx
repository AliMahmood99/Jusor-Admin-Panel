/**
 * ConfirmPaymentModal Component
 * Modal for confirming payout with reference number and receipt
 */

'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/common/Icons';
import type { Payout } from '@/types';

interface PayoutConfirmData {
  id: string;
  referenceNumber: string;
  receipt?: File;
}

interface FormErrors {
  referenceNumber?: string | null;
  receipt?: string | null;
}

interface ConfirmPaymentModalProps {
  payout: Payout;
  onClose: () => void;
  onConfirm: (data: PayoutConfirmData) => void;
}

const formatCurrency = (amount: number) => `SAR ${amount.toLocaleString()}`;
const formatIBAN = (iban: string) => iban.replace(/(.{4})/g, '$1 ').trim();

export default function ConfirmPaymentModal({
  payout,
  onClose,
  onConfirm
}: ConfirmPaymentModalProps) {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!referenceNumber.trim()) {
      newErrors.referenceNumber = 'Reference number is required';
    }
    if (!receipt) {
      newErrors.receipt = 'Transfer receipt is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm({ id: payout.id, referenceNumber, receipt: receipt ?? undefined });
      setIsSubmitting(false);
    }, 1000);
  };

  if (!payout) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Icons.checkCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Confirm Payout</h2>
                <p className="text-emerald-100 text-sm">Verify transfer details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <Icons.x className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Payout Summary */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {payout.influencer.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{payout.influencer.name}</p>
                <p className="text-sm text-slate-500">{payout.influencer.handle}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-emerald-600">{formatCurrency(payout.amount)}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">IBAN</span>
                <span className="font-mono text-slate-700">{formatIBAN(payout.iban).slice(0, 20)}...</span>
              </div>
            </div>
          </div>

          {/* Reference Number */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Transfer Reference Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={referenceNumber}
              onChange={(e) => {
                setReferenceNumber(e.target.value);
                if (errors.referenceNumber) setErrors((prev) => ({ ...prev, referenceNumber: null }));
              }}
              placeholder="e.g., TRF-2026010712345"
              className={`w-full h-12 px-4 rounded-xl bg-slate-50 border-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 font-mono transition-all ${
                errors.referenceNumber ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-emerald-500'
              }`}
            />
            {errors.referenceNumber && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                <Icons.alertTriangle className="w-3 h-3" />
                {errors.referenceNumber}
              </p>
            )}
          </div>

          {/* Upload Receipt - MANDATORY */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Transfer Receipt <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              {receipt ? (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-200">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Icons.image className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-emerald-700 truncate">{receipt.name}</p>
                    <p className="text-xs text-emerald-600">{(receipt.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button
                    onClick={() => setReceipt(null)}
                    className="w-8 h-8 rounded-lg bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center transition-colors"
                  >
                    <Icons.x className="w-4 h-4 text-emerald-600" />
                  </button>
                </div>
              ) : (
                <label className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                  errors.receipt
                    ? 'border-rose-300 bg-rose-50 hover:bg-rose-100'
                    : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
                }`}>
                  <Icons.upload className={`w-8 h-8 mb-2 ${errors.receipt ? 'text-rose-400' : 'text-slate-400'}`} />
                  <p className={`text-sm font-medium ${errors.receipt ? 'text-rose-600' : 'text-slate-600'}`}>
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, PDF up to 5MB</p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setReceipt(file);
                        if (errors.receipt) setErrors((prev) => ({ ...prev, receipt: null }));
                      }
                    }}
                  />
                </label>
              )}
              {errors.receipt && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                  <Icons.alertTriangle className="w-3 h-3" />
                  {errors.receipt}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="h-11 px-5 rounded-xl border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/25"
          >
            {isSubmitting ? (
              <>
                <Icons.loader className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Icons.check className="w-4 h-4" />
                Confirm Payment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

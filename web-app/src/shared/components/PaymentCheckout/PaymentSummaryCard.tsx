import React, { useState } from 'react'
import type { PaymentBreakdown } from './payment.types'
import { formatCurrency } from '@shared/utils'

interface PaymentSummaryCardProps {
  breakdown: PaymentBreakdown
  serviceTitle?: string
  applicationRef?: string
  applicantName?: string
  isProcessing: boolean
  enablePromoCode?: boolean
  showTrustBadges?: boolean
  onApplyPromo?: (code: string) => void
  onPay: () => void
}

export const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({
  breakdown,
  serviceTitle = 'Service Filing',
  applicationRef,
  applicantName,
  isProcessing,
  enablePromoCode = true,
  showTrustBadges = true,
  onApplyPromo,
  onPay,
}) => {
  const [promoInput, setPromoInput] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!promoInput.trim()) return
    onApplyPromo?.(promoInput.trim().toUpperCase())
    setPromoApplied(true)
  }

  return (
    <aside className="payment-summary-card" data-testid="payment-summary-card">
      <div className="payment-summary-header">
        <h3 className="payment-summary-title">Fee Summary</h3>
        {applicationRef && <span className="payment-summary-ref">{applicationRef}</span>}
      </div>

      <div className="payment-summary-details">
        <div className="payment-summary-service">
          <span className="payment-summary-label">Service</span>
          <span className="payment-summary-val">{serviceTitle}</span>
        </div>
        {applicantName && (
          <div className="payment-summary-service">
            <span className="payment-summary-label">Applicant</span>
            <span className="payment-summary-val">{applicantName}</span>
          </div>
        )}
      </div>

      <div className="payment-summary-divider" />

      <div className="payment-breakdown-rows">
        <div className="payment-breakdown-row">
          <span>Professional Fee</span>
          <strong>{formatCurrency(breakdown.baseAmount)}</strong>
        </div>
        <div className="payment-breakdown-row">
          <span>GST @ 18%</span>
          <strong>{formatCurrency(breakdown.gstAmount)}</strong>
        </div>
        {breakdown.discountAmount > 0 && (
          <div className="payment-breakdown-row payment-breakdown-row--discount">
            <span>Special Discount</span>
            <strong>-{formatCurrency(breakdown.discountAmount)}</strong>
          </div>
        )}
      </div>

      {enablePromoCode && !promoApplied && (
        <form className="payment-promo-form" onSubmit={handleApply}>
          <input
            type="text"
            className="payment-promo-input"
            placeholder="Coupon / Promo code"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
          />
          <button type="submit" className="payment-promo-btn" disabled={!promoInput.trim()}>
            Apply
          </button>
        </form>
      )}

      {promoApplied && breakdown.discountAmount > 0 && (
        <div className="payment-promo-success">
          <span>Promo applied! You saved {formatCurrency(breakdown.discountAmount)}.</span>
        </div>
      )}

      <div className="payment-summary-total">
        <div className="payment-total-label">Total Payable</div>
        <div className="payment-total-val" data-testid="payment-total-amount">
          {formatCurrency(breakdown.totalAmount)}
        </div>
      </div>

      <button
        type="button"
        className="payment-pay-btn"
        onClick={onPay}
        disabled={isProcessing}
        data-testid="payment-pay-now-btn"
      >
        {isProcessing ? (
          <>
            <span className="payment-btn-spinner" aria-hidden="true" />
            <span>Processing securely...</span>
          </>
        ) : (
          <>
            <span>Pay {formatCurrency(breakdown.totalAmount)}</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>

      {showTrustBadges && (
        <div className="payment-security-box">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#16a34a" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>256-Bit SSL Encrypted • RBI &amp; PCI-DSS Compliant</span>
        </div>
      )}
    </aside>
  )
}

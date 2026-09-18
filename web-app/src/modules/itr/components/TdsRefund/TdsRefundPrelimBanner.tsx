import React from 'react'
import { TdsIcons } from './tdsRefund.constants'

export interface TdsRefundPrelimBannerProps {
  assessmentYear?: string
  refundAmount: string
}

export const TdsRefundPrelimBanner: React.FC<TdsRefundPrelimBannerProps> = ({
  assessmentYear = 'AY 2026-27',
  refundAmount,
}) => {
  return (
    <section className="tds-prelim-card">
      <div className="tds-prelim-left">
        <div className="tds-prelim-tag-row">
          <span className="tds-prelim-tag">PRELIMINARY ESTIMATED REFUND</span>
          <span className="tds-prelim-ay">{assessmentYear}</span>
        </div>
        <div className="tds-prelim-amount" data-testid="prelim-refund-amount">
          {refundAmount}
        </div>
        <p className="tds-prelim-desc">
          Estimated from verified Form 26AS, AIS, and advance TDS deduction records.
        </p>
      </div>
      <div className="tds-prelim-badge-box">
        <div className="tds-prelim-badge-item">
          <TdsIcons.Checkmark />
          <span>ITD Pre-reconciled</span>
        </div>
        <div className="tds-prelim-badge-item">
          <TdsIcons.Shield />
          <span>100% Audit Protected</span>
        </div>
      </div>
    </section>
  )
}

import type { FC } from 'react'
import { DocChecklistIcon } from '../GSTStepDocuments/GSTDocIcons'
import './GSTPaymentSummaryCard.css'

interface GSTPaymentSummaryCardProps {
  applicantName?: string
  serviceFee?: string
  taxAmount?: string
  totalAmount?: string
}

export const GSTPaymentSummaryCard: FC<GSTPaymentSummaryCardProps> = ({
  applicantName = 'Sagarika',
  serviceFee = '₹1,270.34',
  taxAmount = '₹228.66',
  totalAmount = '₹1,499',
}) => {
  return (
    <div className="gst-payment-summary-card">
      <div className="gst-payment-summary-card__top">
        <div className="gst-payment-summary-card__service-badge">
          <DocChecklistIcon width={16} height={16} />
          <span>GST REGISTRATION</span>
        </div>
        <span className="gst-payment-summary-card__applicant">{applicantName}</span>
      </div>

      <div className="gst-payment-summary-card__rows">
        <div className="gst-payment-summary-card__row">
          <span className="gst-payment-summary-card__label">GST Registration Service</span>
          <span className="gst-payment-summary-card__value">{serviceFee}</span>
        </div>

        <div className="gst-payment-summary-card__row">
          <span className="gst-payment-summary-card__label">Applicable Taxes (18% GST)</span>
          <span className="gst-payment-summary-card__value">{taxAmount}</span>
        </div>
      </div>

      <div className="gst-payment-summary-card__divider" />

      <div className="gst-payment-summary-card__total-row">
        <div className="gst-payment-summary-card__total-left">
          <span className="gst-payment-summary-card__total-label">Total Amount</span>
          <span className="gst-payment-summary-card__total-sub">
            Includes all taxes &amp; CA review
          </span>
        </div>
        <div className="gst-payment-summary-card__total-amount">{totalAmount}</div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { formatCurrency } from '@shared/utils'
import { GSTFilingStepper } from '../GSTFilingPeriod/GSTFilingStepper'
import type { PaymentResult } from '../../registration/GSTStepPayment/GSTStepPayment'
import './GSTFilingSuccess.css'

interface GSTFilingSuccessProps {
  details: PaymentResult
  onViewReceipt: () => void
  onTrackApplication: () => void
  onBackToDashboard: () => void
}

export const GSTFilingSuccess = ({
  details,
  onViewReceipt,
  onTrackApplication,
  onBackToDashboard,
}: GSTFilingSuccessProps) => {
  const [copiedTxn, setCopiedTxn] = useState(false)
  const [copiedRcpt, setCopiedRcpt] = useState(false)

  const copyToClipboard = (text: string, type: 'txn' | 'rcpt') => {
    navigator.clipboard.writeText(text)
    if (type === 'txn') {
      setCopiedTxn(true)
      setTimeout(() => setCopiedTxn(false), 2000)
    } else {
      setCopiedRcpt(true)
      setTimeout(() => setCopiedRcpt(false), 2000)
    }
  }

  const isCard = details.method.toLowerCase().includes('card')

  return (
    <div className="gst-success-wrapper">

      {/* 1. Confetti & Checkmark Hero Header */}
      <div className="gst-success-hero">
        <div className="gst-success-confetti-container" aria-hidden="true">
          <span className="gst-confetti-dot gst-confetti-1" />
          <span className="gst-confetti-dot gst-confetti-2" />
          <span className="gst-confetti-dot gst-confetti-3" />
          <span className="gst-confetti-dot gst-confetti-4" />
          <span className="gst-confetti-dot gst-confetti-5" />
          <span className="gst-confetti-dot gst-confetti-6" />
          <span className="gst-confetti-dot gst-confetti-7" />
          <span className="gst-confetti-dot gst-confetti-8" />
        </div>


      <div className="gst-filing-success-stepper-wrap" style={{ width: '100%', maxWidth: 740, margin: '0 auto 1.5rem auto' }}>
        <GSTFilingStepper currentStep={5} />
      </div>
      <div className="gst-success-card">

        <div className="gst-success-ring">
          <svg viewBox="0 0 24 24" className="gst-success-check-svg">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="gst-success-title">Payment Successful!</h1>
        <p className="gst-success-subtitle">
          {formatCurrency(details.amount)} received. Your GST Filing application is now active and Rohit Kulkarni has been notified.
        </p>
      </div>

      {/* 2. Main Details Card */}
      <div className="gst-success-card">
        {/* Card Header */}
        <div className="gst-success-card__header">
          <div className="gst-success-card__header-left">
            <div className="gst-success-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <div>
              <h3 className="gst-success-card__title">Payment Details</h3>
              <p className="gst-success-card__subdesc">Here are your transaction details</p>
            </div>
          </div>
          <span className="gst-success-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Payment Completed
          </span>
        </div>

        {/* Rows */}
        <div className="gst-success-rows-list">
          {/* Transaction ID */}
          <div className="gst-success-row">
            <span className="gst-success-label">Transaction ID</span>
            <div className="gst-success-value-wrap">
              <span className="gst-success-value">{details.transactionId}</span>
              <button
                type="button"
                className="gst-success-copy-btn"
                title="Copy Transaction ID"
                onClick={() => copyToClipboard(details.transactionId, 'txn')}
              >
                {copiedTxn ? '✓' : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Receipt Number */}
          <div className="gst-success-row">
            <span className="gst-success-label">Receipt number</span>
            <div className="gst-success-value-wrap">
              <span className="gst-success-value">{details.receiptNumber}</span>
              <button
                type="button"
                className="gst-success-copy-btn"
                title="Copy Receipt Number"
                onClick={() => copyToClipboard(details.receiptNumber, 'rcpt')}
              >
                {copiedRcpt ? '✓' : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="gst-success-row">
            <span className="gst-success-label">Payment method</span>
            <div className="gst-success-method-val">
              {isCard ? (
                <div className="gst-success-method-stack">
                  <span className="gst-success-method-inline">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gst-success-card-ic">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    Card Payment
                  </span>
                  <span className="gst-success-card-digits">•••• •••• •••• 3241</span>
                </div>
              ) : (
                <span className="gst-success-value">{details.method}</span>
              )}
            </div>
          </div>

          {/* Date & Time */}
          <div className="gst-success-row">
            <span className="gst-success-label">Date &amp; time</span>
            <span className="gst-success-value">{details.dateText}</span>
          </div>

          {/* Application */}
          <div className="gst-success-row">
            <span className="gst-success-label">Application</span>
            <span className="gst-success-value">{details.applicationRef}</span>
          </div>

          {/* Amount Paid Highlight Banner */}
          <div className="gst-success-amount-banner">
            <span className="gst-success-amount-label">Amount paid</span>
            <span className="gst-success-amount-val">{formatCurrency(details.amount)}</span>
          </div>
        </div>
      </div>

      {/* 3. Action Buttons Row */}
      <div className="gst-success-actions-row">
        <button type="button" className="gst-success-btn-orange" onClick={onViewReceipt}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>View receipt</span>
        </button>

        <button type="button" className="gst-success-btn-white" onClick={onTrackApplication}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <span>Track application</span>
        </button>

        <button type="button" className="gst-success-btn-white" onClick={onBackToDashboard}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Back to dashboard</span>
        </button>
      </div>

      {/* 4. Bottom Green Email Notice Card */}
      <div className="gst-success-email-notice">
        <div className="gst-success-email-icon-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <div className="gst-success-email-text-wrap">
          <h4 className="gst-success-email-title">A confirmation receipt has been sent to your registered email address.</h4>
          <p className="gst-success-email-desc">If you don't see it, please check your spam folder.</p>
        </div>
      </div>
    </div>
  )
}

export default GSTFilingSuccess

import React, { useState } from 'react'
import { GSTFilingStepper } from '../GSTFilingPeriod/GSTFilingStepper'
import type { FilingPeriodData } from '../GSTFilingPeriod/GSTFilingPeriod'
import {
  GSTReviewFilingDetailsCard,
  GSTReviewDocumentsSummaryCard,
} from './GSTReviewFilingDetails'
import {
  GSTReviewTaxComputationCard,
  GSTReviewFilingFeeCard,
} from './GSTReviewComputation'
import {
  GSTReviewNextStepsCard,
  GSTReviewAssuranceBox,
} from './GSTReviewNextSteps'
import { GSTRequestChangesModal } from './GSTRequestChangesModal'
import {
  getResolvedReviewDetails,
  DEFAULT_TAX_COMPUTATION,
  NET_TAX_LIABILITY,
  DEFAULT_FILING_FEES,
  TOTAL_PAYABLE_FEE,
  DEFAULT_DOC_SUMMARY,
} from './gstReviewData'
import './GSTFilingReview.css'

export interface GSTFilingReviewProps {
  selectedMonth?: string
  baseFee?: number
  filingData?: Partial<FilingPeriodData>
  onBack: () => void
  onRequestChange?: () => void
  onApprove: () => void
}

export const GSTFilingReview: React.FC<GSTFilingReviewProps> = ({
  selectedMonth,
  filingData,
  onBack,
  onRequestChange,
  onApprove,
}) => {
  const [showRequestModal, setShowRequestModal] = useState(false)

  const details = getResolvedReviewDetails({
    ...filingData,
    selectedMonth: selectedMonth || filingData?.selectedMonth,
  })

  // Format return type and period labels for the top-right badge
  const returnTypeDisplay = details.returnForm || 'gstr1_3b_monthly'
  const periodDisplay = details.filingPeriod || 'December 2025'

  return (
    <div className="gst-review-page">
      {/* Stepper and Top-Right Meta Badge */}
      <div className="gst-review-top-bar">
        <div className="gst-review-stepper-wrap">
          <GSTFilingStepper currentStep={4} />
        </div>
        <div className="gst-review-top-meta">
          <span className="gst-review-top-meta__label">GST Return</span>
          <span className="gst-review-top-meta__return-type">{returnTypeDisplay}</span>
          <span className="gst-review-top-meta__period">{periodDisplay}</span>
        </div>
      </div>

      {/* Main Page Header */}
      <header className="gst-review-header">
        <h1 className="gst-review-title">Filing Review & Computation</h1>
        <p className="gst-review-subtitle">
          Review your details, check the computed tax figures and proceed to file your GST return.
        </p>
      </header>

      {/* Dark Navy "Ready for Review" Banner */}
      <div className="gst-review-ready-banner" role="status">
        <div className="gst-review-ready-banner__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="gst-review-ready-banner__content">
          <h2 className="gst-review-ready-banner__title">Ready for Review</h2>
          <p className="gst-review-ready-banner__subtitle">
            TaxEdge CA has prepared return computation based on your verified business records.
          </p>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="gst-review-layout-grid">
        {/* Left Column */}
        <div className="gst-review-col-left">
          <GSTReviewFilingDetailsCard details={details} />
          <GSTReviewTaxComputationCard
            items={DEFAULT_TAX_COMPUTATION}
            netLiability={NET_TAX_LIABILITY}
          />
          <GSTReviewFilingFeeCard
            items={DEFAULT_FILING_FEES}
            totalFee={TOTAL_PAYABLE_FEE}
          />
        </div>

        {/* Right Column */}
        <div className="gst-review-col-right">
          <GSTReviewDocumentsSummaryCard summaryItems={DEFAULT_DOC_SUMMARY} />
          <GSTReviewNextStepsCard />
          <GSTReviewAssuranceBox />
        </div>
      </div>

      {/* Bottom Divider & Action Bar */}
      <hr className="gst-review-divider" />

      <footer className="gst-review-actions">
        <button
          type="button"
          className="gst-review-btn-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="gst-review-actions__right">
          <button
            type="button"
            className="gst-review-btn-request"
            onClick={() => setShowRequestModal(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Request Changes / Recalculate</span>
          </button>

          <button
            type="button"
            className="gst-review-btn-approve"
            onClick={onApprove}
          >
            <span>Proceed to Payment →</span>
          </button>
        </div>
      </footer>

      {/* Confirmation Modal */}
      <GSTRequestChangesModal
        isOpen={showRequestModal}
        onClose={() => {
          setShowRequestModal(false)
          if (onRequestChange) {
            // keep user on page or allow further actions
          }
        }}
      />
    </div>
  )
}

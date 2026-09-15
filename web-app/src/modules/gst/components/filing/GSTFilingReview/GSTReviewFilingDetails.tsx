import React from 'react'
import type { ReviewDetailsData, DocumentSummaryItem } from './gstReviewData'
import './GSTReviewFilingDetails.css'

interface GSTReviewFilingDetailsProps {
  details: ReviewDetailsData
}

interface GSTReviewDocumentsSummaryProps {
  summaryItems: DocumentSummaryItem[]
}

export const GSTReviewFilingDetailsCard: React.FC<GSTReviewFilingDetailsProps> = ({ details }) => {
  return (
    <div className="gst-review-card">
      <div className="gst-review-card__header">
        <div className="gst-review-card__icon-wrap gst-review-card__icon-wrap--orange">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <h3 className="gst-review-card__title">Filing Details</h3>
      </div>

      <div className="gst-review-details-grid">
        {/* Column 1 */}
        <div className="gst-review-field">
          <span className="gst-review-field__label">GSTIN</span>
          <span className="gst-review-field__value">{details.gstin}</span>
        </div>
        <div className="gst-review-field">
          <span className="gst-review-field__label">Financial Year</span>
          <span className="gst-review-field__value">{details.financialYear}</span>
        </div>

        <div className="gst-review-field">
          <span className="gst-review-field__label">Business Entity</span>
          <span className="gst-review-field__value">{details.businessName}</span>
        </div>
        <div className="gst-review-field">
          <span className="gst-review-field__label">Filing Period</span>
          <span className="gst-review-field__value">{details.filingPeriod}</span>
        </div>

        <div className="gst-review-field">
          <span className="gst-review-field__label">Taxpayer Scheme</span>
          <span className="gst-review-field__value">{details.scheme}</span>
        </div>
        <div className="gst-review-field">
          <span className="gst-review-field__label">Filing Frequency</span>
          <span className="gst-review-field__value">{details.frequency}</span>
        </div>

        <div className="gst-review-field">
          <span className="gst-review-field__label">Filing Type</span>
          <span className="gst-review-field__value">{details.filingType}</span>
        </div>
        <div className="gst-review-field">
          <span className="gst-review-field__label">Return Form</span>
          <span className="gst-review-field__value">{details.returnForm}</span>
        </div>

        <div className="gst-review-field" style={{ gridColumn: '2' }}>
          <span className="gst-review-field__label">Attached Documents</span>
          <span className="gst-review-field__value">{details.attachedDocsCount} Files Verified</span>
        </div>
      </div>
    </div>
  )
}

export const GSTReviewDocumentsSummaryCard: React.FC<GSTReviewDocumentsSummaryProps> = ({ summaryItems }) => {
  const totalCompleted = summaryItems.reduce((acc, item) => acc + item.completed, 0)
  const totalRequired = summaryItems.reduce((acc, item) => acc + item.total, 0)
  const displayCount = `${totalCompleted}/${totalRequired || 12}`

  return (
    <div className="gst-review-card">
      <div className="gst-review-card__header gst-review-card__header--split">
        <div className="gst-review-card__header-left">
          <div className="gst-review-card__icon-wrap gst-review-card__icon-wrap--blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h3 className="gst-review-card__title">Documents Summary</h3>
        </div>
        <span className="gst-review-doc-overall-badge">
          <svg viewBox="0 0 20 20" fill="currentColor" className="gst-review-doc-overall-icon">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Documents: {displayCount} Verified
        </span>
      </div>

      {/* Overall Status Banner */}
      <div className="gst-review-doc-overall-banner">
        <div className="gst-review-doc-overall-content">
          <span className="gst-review-doc-overall-label">Verification Status</span>
          <span className="gst-review-doc-overall-text">All necessary tax records reconciled</span>
        </div>
        <div className="gst-review-doc-overall-pill">
          <svg viewBox="0 0 20 20" fill="currentColor" className="gst-review-doc-overall-pill-icon">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{displayCount} Verified</span>
        </div>
      </div>

      <div className="gst-review-doc-summary-list">
        {summaryItems.map((item) => {
          const isComplete = item.completed > 0
          return (
            <div key={item.id} className="gst-review-doc-item">
              <div className="gst-review-doc-item__left">
                {isComplete ? (
                  <span className="gst-review-doc-item__icon-check" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                ) : (
                  <span className="gst-review-doc-item__icon-empty" aria-hidden="true" />
                )}
                <span>{item.label}</span>
              </div>
              <span className="gst-review-doc-item__count">
                {item.completed} / {item.total}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

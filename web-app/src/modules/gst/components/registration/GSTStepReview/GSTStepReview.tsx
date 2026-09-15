import { useState } from 'react'
import type { GstBusinessFormData } from '../GSTStepBusiness/GSTStepBusiness'
import './GSTStepReview.css'

interface GSTStepReviewProps {
  businessData: GstBusinessFormData
  onEdit: () => void
  onBack: () => void
  onProceed: () => void
}

const ATTACHED_DOCS = [
  'PAN of business / proprietor',
  'Aadhaar of proprietor',
  'Proof of place of business',
  'Cancelled cheque / Bank statement',
]

export const GSTStepReview = ({
  businessData,
  onEdit,
  onBack,
  onProceed,
}: GSTStepReviewProps) => {
  const [decl1, setDecl1] = useState(true)
  const [decl2, setDecl2] = useState(true)

  const canProceed = decl1 && decl2

  const businessFields = [
    { label: 'Legal Name (as per PAN)', value: businessData.legalName || 'Shree Enterprises' },
    { label: 'Trade Name', value: businessData.tradeName || 'Shree Enterprises' },
    { label: 'Constitution of Business', value: businessData.constitution || 'Proprietorship' },
    { label: 'Nature of Business', value: businessData.natureOfBusiness || 'Retail Business' },
    { label: 'Date of Commencement', value: businessData.commencementDate || '2024-04-01' },
    { label: 'Reason for Registration', value: businessData.registrationReason || 'Crossing the Threshold Limit' },
    { label: 'Composition Scheme', value: businessData.compositionScheme || 'No' },
    { label: 'Place of business', value: businessData.placeOfBusiness || 'Owned' },
    {
      label: 'Business address',
      value: [
        businessData.businessAddress || 'Shop 14, Laxmi Complex, FC Road',
        businessData.city || 'Pune',
        businessData.district,
        businessData.state ? `${businessData.state} - ${businessData.pinCode || '411004'}` : '',
      ]
        .filter(Boolean)
        .join(', '),
    },
    { label: 'Primary HSN / SAC Code', value: businessData.hsnSacCode || '998311' },
  ]

  const bankFields = [
    { label: 'Account Holder Name', value: businessData.accountHolderName || 'Sagarika Sharma' },
    {
      label: 'Bank & Account Number',
      value: `${businessData.bankName || 'HDFC Bank'} · A/C: ${businessData.accountNumber || '••••••••5678'}`,
    },
    {
      label: 'IFSC & Branch',
      value: `${businessData.ifscCode || 'HDFC0000412'} · ${businessData.branch || 'Madurai Main'}`,
    },
    { label: 'Account Type', value: businessData.accountType || 'Current' },
  ]

  const signatoryFields = [
    {
      label: 'Signatory Name & Designation',
      value: `${businessData.signatoryName || 'Sagarika Sharma'} (${businessData.designation || 'Proprietor'})`,
    },
    {
      label: 'PAN & Date of Birth',
      value: `PAN: ${businessData.signatoryPan || 'ABCDE1234F'} · DOB: ${businessData.dob || '1995-05-12'}`,
    },
    {
      label: 'Contact Details',
      value: `${businessData.signatoryMobile || '9876543210'} · ${businessData.signatoryEmail || 'sagarika@example.com'}`,
    },
    {
      label: 'Aadhaar e-KYC',
      value: businessData.aadhaarConsent ? 'Consent Confirmed (e-KYC Enabled)' : 'Pending',
    },
  ]

  return (
    <div className="gst-step-review">
      {/* 1. Business Details Card */}
      <section className="gst-review-card">
        <div className="gst-review-card__header">
          <div>
            <h2 className="gst-review-card__title">Review your application</h2>
            <p className="gst-review-card__subtitle">
              Check all fields carefully. After submission, corrections require an amendment application.
            </p>
          </div>
          <button
            type="button"
            className="gst-btn-edit"
            onClick={onEdit}
            aria-label="Edit application fields"
          >
            Edit Details
          </button>
        </div>

        <div className="gst-review-section-title">Business Details</div>
        <div className="gst-review-grid">
          {businessFields.map((field) => (
            <div key={field.label} className="gst-review-row">
              <span className="gst-review-label">{field.label}</span>
              <span className="gst-review-value">{field.value}</span>
            </div>
          ))}
        </div>

        <div className="gst-review-section-title">Bank Details</div>
        <div className="gst-review-grid">
          {bankFields.map((field) => (
            <div key={field.label} className="gst-review-row">
              <span className="gst-review-label">{field.label}</span>
              <span className="gst-review-value">{field.value}</span>
            </div>
          ))}
        </div>

        <div className="gst-review-section-title">Authorised Signatory</div>
        <div className="gst-review-grid">
          {signatoryFields.map((field) => (
            <div key={field.label} className="gst-review-row">
              <span className="gst-review-label">{field.label}</span>
              <span className="gst-review-value">{field.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Documents Attached Card */}
      <section className="gst-review-card">
        <h3 className="gst-review-card__section-title">Documents attached</h3>
        <ul className="gst-review-docs-list">
          {ATTACHED_DOCS.map((doc) => (
            <li key={doc} className="gst-review-doc-item">
              <span className="gst-review-doc-check">✓</span>
              <span className="gst-review-doc-name">{doc}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Declaration Card */}
      <section className="gst-review-card">
        <h3 className="gst-review-card__section-title">Declaration</h3>
        <div className="gst-review-declarations">
          <label className="gst-decl-label">
            <input
              type="checkbox"
              checked={decl1}
              onChange={(e) => setDecl1(e.target.checked)}
              className="gst-decl-checkbox"
            />
            <span className="gst-decl-text">
              I hereby solemnly affirm that the information provided is correct to the best of my
              knowledge, and no material fact has been concealed.
            </span>
          </label>
          <label className="gst-decl-label">
            <input
              type="checkbox"
              checked={decl2}
              onChange={(e) => setDecl2(e.target.checked)}
              className="gst-decl-checkbox"
            />
            <span className="gst-decl-text">
              I authorize TaxEdge to submit the registration application and act on our behalf with
              the GST department.
            </span>
          </label>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="gst-review-actions">
        <button type="button" className="gst-btn-secondary" onClick={onBack}>
          ← Back to Documents
        </button>
        <button
          type="button"
          className="gst-btn-primary"
          onClick={onProceed}
          disabled={!canProceed}
        >
          Proceed to Payment →
        </button>
      </div>
    </div>
  )
}

export default GSTStepReview


import React, { useState, useEffect, useRef, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import { GSTComplianceSubmitted } from './GSTComplianceSubmitted'
import { GSTComplianceUploadFields } from './GSTComplianceUploadFields'
import { GSTComplianceConfirmModal } from './GSTComplianceConfirmModal'

import React from 'react'
import { routePaths } from '@core/config'
import { GSTComplianceSubmitted } from './GSTComplianceSubmitted'
import { ComplianceDocPreviewModal } from './GSTComplianceDocPreviewModal'
import { ChevronIcon, FieldRow } from './GSTComplianceFileDropzone'
import { GSTComplianceReconFields } from './GSTComplianceReconFields'
import { GSTComplianceNoticeFields } from './GSTComplianceNoticeFields'
import { useGSTComplianceForm } from './useGSTComplianceForm'

import './GSTComplianceCard.css'

export interface ComplianceFormData {
  gstin: string
  financialYear: string

  requestType: string
}

export interface GSTComplianceCardProps {
  onAllForms?: () => void
  onSubmit?: (data: ComplianceFormData) => void
}

const FINANCIAL_YEARS = ['2026-27', '2025-26', '2024-25', '2023-24']

export const GSTComplianceCard: React.FC<GSTComplianceCardProps> = ({
  onAllForms,
  onSubmit,
}) => {
  const navigate = useNavigate()

  const [gstin, setGstin] = useState('')
  const [financialYear, setFinancialYear] = useState('')
  const [requestType, setRequestType] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    const cleanGstin = gstin.trim().toUpperCase()
    if (!cleanGstin) {
      newErrors.gstin = 'Please enter 15-character GSTIN.'
    } else if (cleanGstin.length !== 15) {
      newErrors.gstin = 'GSTIN must be 15 characters.'
    }

    if (!financialYear) newErrors.financialYear = 'Please select Financial Year.'
    if (!requestType) newErrors.requestType = 'Please select Request Type.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsConfirmModalOpen(true)
  }

  const handleConfirmSubmit = () => {
    setIsConfirmModalOpen(false)
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      onSubmit?.({
        gstin: gstin.trim().toUpperCase(),
        financialYear,
        requestType,
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 600)
  }

  requestType: 'Reconciliation Support' | 'Notice Response'
  purchaseDoc: File | null
  salesDoc: File | null
  gstr2bRef: string
  gstr2bDoc?: File | null
  noticeNumber?: string
  noticeDoc?: File | null
  dueDate?: string
  replyDraft: string
}

export interface GSTComplianceCardProps {
  title?: string
  subtitle?: string
  initialGstin?: string
  initialFinancialYear?: string
  initialRequestType?: 'Reconciliation Support' | 'Notice Response'
  onAllForms?: () => void
  onSubmit?: (d: ComplianceFormData) => void
}

export const GSTComplianceCard: React.FC<GSTComplianceCardProps> = ({
  title = 'GST Compliance Form',
  subtitle = 'Live screen — numbered to match the field spec.',
  initialGstin = '27AXTPD4419K1ZP',
  initialFinancialYear = 'FY 2026-27',
  initialRequestType = 'Reconciliation Support',
  onAllForms,
  onSubmit,
}) => {
  const {
    navigate,
    gstin,
    financialYear,
    setFinancialYear,
    requestType,
    setRequestType,
    purchaseFile,
    setPurchaseFile,
    salesFile,
    setSalesFile,
    gstr2bRef,
    setGstr2bRef,
    gstr2bFile,
    setGstr2bFile,
    noticeNumber,
    setNoticeNumber,
    noticeFile,
    setNoticeFile,
    dueDate,
    setDueDate,
    replyDraft,
    setReplyDraft,
    previewDoc,
    setPreviewDoc,
    errors,
    isSubmitting,
    isSubmitted,
    applicationId,
    clearErr,
    handleGstinChange,
    handleSubmit,
  } = useGSTComplianceForm({
    initialGstin,
    initialFinancialYear,
    initialRequestType,
    onSubmit,
  })


  if (isSubmitted) {
    return (
      <GSTComplianceSubmitted

        applicationId="GSTC-2026-680427"
        gstin={gstin || '29AAAAA0000A1Z5'}
        requestType={requestType || 'Reconciliation Support'}
        onBackToForm={() => setIsSubmitted(false)}

        applicationId={applicationId}
        gstin={gstin}
        requestType={requestType}
        fieldsCount={requestType === 'Reconciliation Support' ? 7 : 10}
        onBackToForm={() => navigate(routePaths.gst.compliance, { replace: true })}

        onAllForms={onAllForms ?? (() => navigate(routePaths.gst.root))}
      />
    )
  }

  return (

    <div className="gst-comp-container">
      {/* Page Title */}
      <div className="gst-comp-header">
        <h1 className="gst-comp-title">GST Compliance</h1>
      </div>

      <form onSubmit={handleSubmitForm} noValidate>
        {/* Top Info Banner Box */}
        <div className="gst-comp-info-banner">
          <div className="gst-comp-info-icon">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
          </div>
          <span className="gst-comp-info-text">
            Need help with GST compliance? Select your request type and upload the required documents. Our CA team will review and contact you.
          </span>
        </div>

        {/* Main Card: Business & Filing Details */}
        <div className="gst-comp-card-box">
          <div className="gst-comp-card-header">
            <span className="gst-comp-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#083b75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />

    <div className="gst-compliance-spec-card">
      <div className="compliance-spec-header">
        <div className="compliance-spec-header__left">
          <h2 className="compliance-spec-title">{title}</h2>
          <p className="compliance-spec-subtitle">{subtitle}</p>
        </div>
        <div className="compliance-spec-badge">
          {requestType === 'Reconciliation Support' ? '7' : '10'} of 10 shown
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="compliance-spec-form">
        <FieldRow
          num={1}
          label="GSTIN / PAN"
          hint="15-character GSTIN or 10-character PAN. Letters auto-capitalize to uppercase."
          error={errors.gstin}
          badge={
            <span className="compliance-autofill-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="compliance-check-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />

              </svg>
            </span>
            <h3 className="gst-comp-card-title">Business & Filing Details</h3>
          </div>

          {/* Row 1: Full-Width GSTIN */}
          <div className="gst-comp-field-group">
            <label htmlFor="gst-comp-gstin-input" className="gst-comp-label">
              Enter 15-character GSTIN <span className="gst-comp-star">*</span>
            </label>
            <input
              id="gst-comp-gstin-input"
              type="text"
              maxLength={15}
              placeholder="e.g. 29AAAAA0000A1Z5"
              value={gstin}

              onChange={(e) => {
                setGstin(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))
                if (errors.gstin) setErrors((prev) => ({ ...prev, gstin: '' }))
              }}
              className={`gst-comp-input ${errors.gstin ? 'has-error' : ''}`}

              onChange={(e) => handleGstinChange(e.target.value)}
              className={`compliance-gstin-input ${errors.gstin ? 'has-error' : ''}`}

            />
            {errors.gstin && <span className="gst-comp-error-msg">{errors.gstin}</span>}
          </div>


          {/* Row 2: 2-Column Row for Financial Year & Request Type */}
          <div className="gst-comp-grid-row">
            {/* Field 2: Financial Year */}
            <div className="gst-comp-field-group">
              <label htmlFor="gst-comp-fy-select" className="gst-comp-label">
                Financial Year <span className="gst-comp-star">*</span>
              </label>
              <div className="gst-comp-select-wrapper">
                <select
                  id="gst-comp-fy-select"
                  value={financialYear}
                  onChange={(e) => {
                    setFinancialYear(e.target.value)
                    if (errors.financialYear) setErrors((prev) => ({ ...prev, financialYear: '' }))
                  }}
                  className={`gst-comp-select ${errors.financialYear ? 'has-error' : ''}`}
                >
                  <option value="">Select Financial Year</option>
                  {FINANCIAL_YEARS.map((fy) => (
                    <option key={fy} value={fy}>{fy}</option>
                  ))}
                </select>
                <span className="gst-comp-chevron">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
              {errors.financialYear && <span className="gst-comp-error-msg">{errors.financialYear}</span>}
            </div>

            {/* Field 3: Request Type Custom Dropdown Popover */}
            <div className="gst-comp-field-group" ref={dropdownRef}>
              <label className="gst-comp-label">
                Request Type <span className="gst-comp-star">*</span>
              </label>

              <div className="gst-comp-dropdown-wrapper">
                <div
                  className={`gst-comp-custom-select ${isDropdownOpen ? 'is-open' : ''} ${errors.requestType ? 'has-error' : ''}`}
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  role="button"
                  tabIndex={0}
                >
                  <span className={`gst-comp-select-placeholder ${requestType ? 'has-value' : ''}`}>
                    {requestType || 'Select Request Type'}
                  </span>
                  <span className="gst-comp-chevron">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      {isDropdownOpen ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
                    </svg>
                  </span>
                </div>

                {isDropdownOpen && (
                  <div className="gst-comp-dropdown-menu">
                    {/* Option 1: Reconciliation Support */}
                    <div
                      className={`gst-comp-dropdown-item ${requestType === 'Reconciliation Support' ? 'is-selected' : ''}`}
                      onClick={() => {
                        setRequestType('Reconciliation Support')
                        setIsDropdownOpen(false)
                        if (errors.requestType) setErrors((prev) => ({ ...prev, requestType: '' }))
                      }}
                    >
                      <div className="gst-comp-item-icon bg-blue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                        </svg>
                      </div>
                      <div className="gst-comp-item-content">
                        <span className="gst-comp-item-title">Reconciliation Support</span>
                        <span className="gst-comp-item-desc">Reconcile Purchase &amp; Sales registers against GSTR-2B</span>
                      </div>
                    </div>

                    <div className="gst-comp-dropdown-divider" />

                    {/* Option 2: Notice Response */}
                    <div
                      className={`gst-comp-dropdown-item ${requestType === 'Notice Response' ? 'is-selected' : ''}`}
                      onClick={() => {
                        setRequestType('Notice Response')
                        setIsDropdownOpen(false)
                        if (errors.requestType) setErrors((prev) => ({ ...prev, requestType: '' }))
                      }}
                    >
                      <div className="gst-comp-item-icon bg-orange">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                      </div>
                      <div className="gst-comp-item-content">
                        <span className="gst-comp-item-title">Notice Response</span>
                        <span className="gst-comp-item-desc">Expert CA response drafting for GST department notices</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {errors.requestType && <span className="gst-comp-error-msg">{errors.requestType}</span>}
            </div>
          </div>
        </div>

        {/* Dynamic Supporting Documents Card */}
        <GSTComplianceUploadFields requestType={requestType} />

        {/* Bottom Action Bar */}
        <div className="gst-comp-actions-row">

        </FieldRow>

        <FieldRow
          num={2}
          label="Period / Financial Year"
          required
          hint="Which month or year the check covers"
        >
          <div className="compliance-select-wrapper">
            <select
              id="compliance-fy"
              name="financialYear"
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              className="compliance-select"
            >
              {['FY 2026-27', 'FY 2025-26', 'FY 2024-25', 'FY 2023-24'].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </div>
        </FieldRow>

        <FieldRow
          num={3}
          label="Type of Request"
          required
          hint="Reconciliation Support or Notice Response"
        >
          <div className="compliance-select-wrapper">
            <select
              id="compliance-request-type"
              name="requestType"
              value={requestType}
              onChange={(e) =>
                setRequestType(
                  e.target.value as 'Reconciliation Support' | 'Notice Response'
                )
              }
              className="compliance-select"
            >
              {['Reconciliation Support', 'Notice Response'].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </div>
        </FieldRow>

        {requestType === 'Reconciliation Support' ? (
          <GSTComplianceReconFields
            purchaseFile={purchaseFile}
            setPurchaseFile={setPurchaseFile}
            salesFile={salesFile}
            setSalesFile={setSalesFile}
            gstr2bRef={gstr2bRef}
            setGstr2bRef={setGstr2bRef}
            gstr2bFile={gstr2bFile}
            setGstr2bFile={setGstr2bFile}
            errors={errors}
            clearErr={clearErr}
            setPreviewDoc={setPreviewDoc}
          />
        ) : (
          <>
            <GSTComplianceNoticeFields
              noticeNumber={noticeNumber}
              setNoticeNumber={setNoticeNumber}
              noticeFile={noticeFile}
              setNoticeFile={setNoticeFile}
              dueDate={dueDate}
              setDueDate={setDueDate}
              errors={errors}
              clearErr={clearErr}
              setPreviewDoc={setPreviewDoc}
            />
          </>
        )}

        <FieldRow
          num={requestType === 'Reconciliation Support' ? 7 : 10}
          label="Reply / Response Draft"
          hint="Optional — can be filled in by staff instead"
        >
          <textarea
            id="compliance-reply-draft"
            name="replyDraft"
            rows={4}
            placeholder="Optional. Leave blank and your GST executive will draft the reply for you."
            value={replyDraft}
            onChange={(e) => setReplyDraft(e.target.value)}
            className="compliance-textarea"
          />
        </FieldRow>

        <div className="compliance-actions-row">

          <button
            type="button"
            className="gst-comp-back-btn"
            onClick={onAllForms ?? (() => navigate(routePaths.gst.root))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>


          <button type="submit" disabled={isSubmitting} className="gst-comp-submit-btn">
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>

          <button
            type="submit"
            disabled={isSubmitting}
            className="compliance-btn-primary"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                Submit GST Compliance <span aria-hidden="true">→</span>
              </>
            )}

          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <GSTComplianceConfirmModal
        isOpen={isConfirmModalOpen}
        gstin={gstin || '29AAAAA0000A1Z5'}
        requestType={requestType || 'Reconciliation Support'}
        onConfirm={handleConfirmSubmit}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  )
}


export default GSTComplianceCard



export default GSTComplianceCard
   

import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import GSTAmendmentProofUpload from '../../amendment/GSTAmendmentDetailForm/GSTAmendmentProofUpload'
import { GSTCancellationSubmitted } from './GSTCancellationSubmitted'
import { GSTCancellationSidebar } from './GSTCancellationSidebar'
import { GSTCancellationFields } from './GSTCancellationFields'
import { GSTCancellationReview } from './GSTCancellationReview'
import './GSTCancellationCard.css'

export interface CancellationFormData {
  gstin: string
  reason: string
  cancellationDate: string
  pendingLiabilities?: string
  lastGstr3bFiled?: string
  closingStockDetails: string
  file?: File | null
  finalReturnDeclaration: boolean
}

export interface GSTCancellationCardProps {
  onAllForms?: () => void
  onSubmit?: (data: CancellationFormData) => void
}

export const GSTCancellationCard: React.FC<GSTCancellationCardProps> = ({
  onAllForms,
  onSubmit,
}) => {
  const navigate = useNavigate()

  const [gstin, setGstin] = useState('')
  const [reason, setReason] = useState('')
  const [cancellationDate, setCancellationDate] = useState('')
  const [pendingLiabilities, setPendingLiabilities] = useState('')
  const [lastGstr3bFiled, setLastGstr3bFiled] = useState('')
  const [closingStockDetails, setClosingStockDetails] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [finalReturnDeclaration, setFinalReturnDeclaration] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isReviewing, setIsReviewing] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[field]
        return copy
      })
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: 'File size must be under 10 MB.' }))
        return
      }
      setSelectedFile(file)
      clearError('file')
    }
  }

  const handleReviewProceed = (e: FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    const cleanGstin = gstin.trim().toUpperCase()

    if (!cleanGstin) {
      newErrors.gstin = 'Please enter GSTIN.'
    } else if (cleanGstin.length !== 15) {
      newErrors.gstin = 'GSTIN must be 15 characters.'
    }

    if (!reason) newErrors.reason = 'Please select reason for cancellation.'
    if (!cancellationDate) newErrors.cancellationDate = 'Please select cancellation date.'
    if (!lastGstr3bFiled.trim()) newErrors.lastGstr3bFiled = 'Please enter last GSTR-3B filed ARN/Period.'
    if (!closingStockDetails.trim()) newErrors.closingStockDetails = 'Please enter closing stock details.'
    if (!finalReturnDeclaration) {
      newErrors.finalReturnDeclaration = 'You must confirm the final return declaration before proceeding.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsReviewing(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFinalSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      onSubmit?.({
        gstin: gstin.trim().toUpperCase(),
        reason,
        cancellationDate,
        pendingLiabilities: pendingLiabilities.trim(),
        lastGstr3bFiled: lastGstr3bFiled.trim(),
        closingStockDetails: closingStockDetails.trim(),
        file: selectedFile,
        finalReturnDeclaration,
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 600)
  }

  if (isSubmitted) {
    return (
      <GSTCancellationSubmitted
        applicationId="AA290926430313"
        gstin={gstin || '29AAAAA0000A1Z6'}
        cancellationDate={cancellationDate}
        onBackToForm={() => setIsSubmitted(false)}
        onAllForms={onAllForms ?? (() => navigate(routePaths.gst.root))}
      />
    )
  }

  if (isReviewing) {
    return (
      <GSTCancellationReview
        formData={{
          gstin: gstin.trim().toUpperCase(),
          reason,
          cancellationDate,
          pendingLiabilities: pendingLiabilities.trim(),
          lastGstr3bFiled: lastGstr3bFiled.trim(),
          closingStockDetails: closingStockDetails.trim(),
          file: selectedFile,
          finalReturnDeclaration,
        }}
        isSubmitting={isSubmitting}
        onBack={() => setIsReviewing(false)}
        onSubmit={handleFinalSubmit}
      />
    )
  }

  return (
    <div className="gst-canc-container">
      <div className="gst-canc-header">
        <h1 className="gst-canc-title">GST Cancellation</h1>
        <p className="gst-canc-subtitle">
          Formally surrender and cancel your GST registration via Form REG-16
        </p>
      </div>

      <form onSubmit={handleReviewProceed} noValidate>
        <div className="gst-canc-info-banner">
          <div className="gst-canc-info-banner-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </div>
          <span className="gst-canc-info-banner-text">
            Formally surrender and cancel your GST registration via Form REG-16
          </span>
        </div>

        <GSTCancellationFields
          gstin={gstin} setGstin={setGstin}
          reason={reason} setReason={setReason}
          cancellationDate={cancellationDate} setCancellationDate={setCancellationDate}
          pendingLiabilities={pendingLiabilities} setPendingLiabilities={setPendingLiabilities}
          lastGstr3bFiled={lastGstr3bFiled} setLastGstr3bFiled={setLastGstr3bFiled}
          closingStockDetails={closingStockDetails} setClosingStockDetails={setClosingStockDetails}
          errors={errors} clearError={clearError}
        />

        <div className="gst-canc-proof-grid">
          <div className="gst-canc-proof-left">
            <GSTAmendmentProofUpload
              selectedFile={selectedFile}
              error={errors.file}
              onFileChange={handleFileChange}
              onRemoveFile={(e: React.MouseEvent) => {
                e.stopPropagation()
                setSelectedFile(null)
              }}
            />
          </div>

          <GSTCancellationSidebar />
        </div>

        <div
          className={`gst-canc-declaration-card ${errors.finalReturnDeclaration ? 'has-error' : ''}`}
          onClick={() => {
            setFinalReturnDeclaration(!finalReturnDeclaration)
            clearError('finalReturnDeclaration')
          }}
        >
          <input
            type="checkbox"
            id="gst-canc-final-declaration"
            checked={finalReturnDeclaration}
            onChange={(e) => {
              setFinalReturnDeclaration(e.target.checked)
              clearError('finalReturnDeclaration')
            }}
            className="gst-canc-checkbox"
          />
          <div className="gst-canc-declaration-text">
            <span className="gst-canc-declaration-title">
              Final Return Declaration (GSTR-10) <span className="gst-canc-star">*</span>
            </span>
            <p className="gst-canc-declaration-desc">
              I confirm all outward tax dues are settled and will file final return GSTR-10 within 3 months of cancellation order.
            </p>
          </div>
        </div>
        {errors.finalReturnDeclaration && (
          <span className="gst-canc-error-msg" style={{ display: 'block', marginTop: '0.25rem' }}>
            {errors.finalReturnDeclaration}
          </span>
        )}

        <div className="gst-canc-actions-row">
          <button
            type="button"
            onClick={onAllForms ?? (() => navigate(routePaths.gst.root))}
            className="gst-canc-back-pill-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="gst-canc-submit-orange-btn"
          >
            {isSubmitting ? 'Submitting...' : 'Review Cancellation'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

export default GSTCancellationCard

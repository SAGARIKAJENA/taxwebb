import { useState, type FormEvent, type ChangeEvent } from 'react'
import {
  validatePan,
  validateIfsc,
  validatePincode,
  validateEmail,
  isValidBankAccNumber,
  isValidHsnSac,
} from '@shared/utils'
import { GSTBusinessDetails } from '../GSTBusinessDetails/GSTBusinessDetails'
import { GSTBankDetails } from '../GSTBankDetails/GSTBankDetails'
import { GSTAuthorisedSignatory } from '../GSTAuthorisedSignatory/GSTAuthorisedSignatory'
import './GSTStepBusiness.css'

export interface GstBusinessFormData {
  // Business Details (matching mobile fields in exact order)
  legalName: string
  tradeName: string
  constitution: string
  natureOfBusiness: string
  commencementDate: string
  registrationReason: string
  compositionScheme: string
  placeOfBusiness: string
  businessAddress: string
  city: string
  district: string
  state: string
  pinCode: string
  hsnSacCode: string

  // Bank Details (matching mobile fields in exact order)
  accountHolderName: string
  accountNumber: string
  confirmAccountNumber: string
  ifscCode: string
  bankName: string
  branch: string
  accountType: string

  // Authorised Signatory
  signatoryName: string
  signatoryPan: string
  dob: string
  designation: string
  signatoryMobile: string
  signatoryEmail: string

  // Aadhaar Consent
  aadhaarConsent: boolean
}

// Backward compatibility alias
export type BusinessFormData = GstBusinessFormData

interface GSTStepBusinessProps {
  data: GstBusinessFormData
  onChange: <K extends keyof GstBusinessFormData>(field: K, value: GstBusinessFormData[K]) => void
  onNext: () => void
  onCancel?: () => void
}

export const GSTStepBusiness = ({
  data,
  onChange,
  onNext,
  onCancel,
}: GSTStepBusinessProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const clearErr = (k: string) => {
    setErrors((prev) => {
      if (!prev[k]) return prev
      const { [k]: _, ...rest } = prev
      return rest
    })
  }

  const handleConsentChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange('aadhaarConsent', e.target.checked)
    clearErr('aadhaarConsent')
  }



  const validate = (): boolean => {
    const errs: Record<string, string> = {}

    // 1. Business Details
    if (!data.legalName.trim()) {
      errs.legalName = 'Legal name of business is required'
    } else if (data.legalName.trim().length < 2) {
      errs.legalName = 'Legal name must be at least 2 characters'
    }

    if (!data.tradeName.trim()) {
      errs.tradeName = 'Trade / brand name is required'
    } else if (data.tradeName.trim().length < 2) {
      errs.tradeName = 'Trade name must be at least 2 characters'
    }

    if (!data.constitution) {
      errs.constitution = 'Please select constitution of business'
    }

    if (!data.natureOfBusiness) {
      errs.natureOfBusiness = 'Please select nature of business'
    }

    if (!data.commencementDate) {
      errs.commencementDate = 'Date of commencement is required'
    }

    if (!data.registrationReason) {
      errs.registrationReason = 'Please select reason for registration'
    }

    if (!data.compositionScheme) {
      errs.compositionScheme = 'Please select Yes or No for composition scheme'
    }

    if (!data.placeOfBusiness) {
      errs.placeOfBusiness = 'Please select place of business type'
    }

    if (!data.businessAddress.trim()) {
      errs.businessAddress = 'Business address is required'
    } else if (data.businessAddress.trim().length < 5) {
      errs.businessAddress = 'Please enter a complete address (minimum 5 characters)'
    }

    if (!data.city.trim()) {
      errs.city = 'City is required'
    }

    if (!data.district.trim()) {
      errs.district = 'District is required'
    }

    if (!data.state) {
      errs.state = 'Please select state / UT'
    }

    const pinErr = validatePincode(data.pinCode)
    if (pinErr) {
      errs.pinCode = pinErr
    }

    if (!data.hsnSacCode.trim()) {
      errs.hsnSacCode = 'Primary HSN / SAC code is required'
    } else if (!isValidHsnSac(data.hsnSacCode)) {
      errs.hsnSacCode = 'Enter a valid 2 to 8 digit HSN/SAC code'
    }

    // 2. Bank Details
    if (!data.accountHolderName.trim()) {
      errs.accountHolderName = 'Account holder name is required'
    } else if (data.accountHolderName.trim().length < 2) {
      errs.accountHolderName = 'Account holder name must be at least 2 characters'
    }

    if (!data.accountNumber.trim()) {
      errs.accountNumber = 'Bank account number is required'
    } else if (!isValidBankAccNumber(data.accountNumber)) {
      errs.accountNumber = 'Account number must be between 9 and 18 digits'
    }

    if (!data.confirmAccountNumber.trim()) {
      errs.confirmAccountNumber = 'Please confirm bank account number'
    } else if (data.accountNumber !== data.confirmAccountNumber) {
      errs.confirmAccountNumber = 'Account numbers do not match'
    }

    const ifscErr = validateIfsc(data.ifscCode)
    if (ifscErr) {
      errs.ifscCode = ifscErr
    }

    if (!data.bankName.trim()) {
      errs.bankName = 'Bank name is required'
    }

    if (!data.branch.trim()) {
      errs.branch = 'Branch name is required'
    }

    if (!data.accountType) {
      errs.accountType = 'Please select account type'
    }

    // 3. Authorised Signatory
    if (!data.signatoryName.trim()) {
      errs.signatoryName = 'Authorised signatory name is required'
    } else if (data.signatoryName.trim().length < 2) {
      errs.signatoryName = 'Signatory name must be at least 2 characters'
    }

    const panErr = validatePan(data.signatoryPan)
    if (panErr) {
      errs.signatoryPan = panErr
    }

    if (!data.dob) {
      errs.dob = 'Date of birth is required'
    }

    if (!data.designation.trim()) {
      errs.designation = 'Signatory designation is required'
    }

    const cleanedMobile = data.signatoryMobile.replace(/\D/g, '').trim()
    if (!cleanedMobile) {
      errs.signatoryMobile = 'Mobile number is required'
    } else if (cleanedMobile.length !== 10) {
      errs.signatoryMobile = 'Mobile number must be exactly 10 digits'
    }

    const emailErr = validateEmail(data.signatoryEmail)
    if (emailErr) {
      errs.signatoryEmail = emailErr
    }

    // 4. Aadhaar Consent
    if (!data.aadhaarConsent) {
      errs.aadhaarConsent = 'Please check the box to grant consent for Aadhaar e-KYC authentication'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      setTimeout(() => {
        const firstErrorEl = document.querySelector('.gst-field-error, .gst-input--error')
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
          if (firstErrorEl instanceof HTMLInputElement || firstErrorEl instanceof HTMLSelectElement) {
            firstErrorEl.focus()
          } else {
            const inputInside = firstErrorEl.closest('.gst-form-group')?.querySelector('input, select') as HTMLElement | null
            inputInside?.focus()
          }
        }
      }, 60)
      return
    }
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="gst-step-business-container">
      {/* 1. Business Details Sub-Component */}
      <GSTBusinessDetails
        data={data}
        onChange={onChange}
        errors={errors}
        onClearError={clearErr}
      />

      {/* 2. Bank Details Sub-Component */}
      <GSTBankDetails
        data={data}
        onChange={onChange}
        errors={errors}
        onClearError={clearErr}
      />

      {/* 3. Authorised Signatory Sub-Component */}
      <GSTAuthorisedSignatory
        data={data}
        onChange={onChange}
        errors={errors}
        onClearError={clearErr}
      />

      {/* Aadhaar Consent */}
      <div className="gst-consent-section">
        <label className="gst-consent-checkbox-wrapper">
          <input
            type="checkbox"
            className="gst-consent-checkbox"
            checked={data.aadhaarConsent}
            onChange={handleConsentChange}
          />
          <span className="gst-consent-text">
            I consent to Aadhaar authentication (e-KYC) for this GST registration.
          </span>
        </label>
        {errors.aadhaarConsent && (
          <div className="gst-consent-error">
            <span className="gst-field-error">{errors.aadhaarConsent}</span>
          </div>
        )}
      </div>

      {/* Action Buttons Row (Back on left, Continue on right in one row) */}
      <div className="gst-form-actions">
        <button
          type="button"
          className="gst-btn-back"
          onClick={onCancel || (() => window.history.back())}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gst-btn-back-arrow"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </button>

        <button
          type="submit"
          className="gst-btn-continue"
        >
          <span>Continue to Documents</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="gst-btn-continue__icon">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default GSTStepBusiness

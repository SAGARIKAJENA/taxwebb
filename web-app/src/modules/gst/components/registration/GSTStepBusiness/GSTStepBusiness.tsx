import { useState, type FormEvent, type ChangeEvent } from 'react'
import { StepActionBar } from '@shared/components'
import { GSTBusinessDetails } from '../GSTBusinessDetails/GSTBusinessDetails'
import { GSTBankDetails } from '../GSTBankDetails/GSTBankDetails'
import { GSTAuthorisedSignatory } from '../GSTAuthorisedSignatory/GSTAuthorisedSignatory'
import { validateGstBusinessForm } from './gstStepBusiness.validator'
import './GSTStepBusiness.css'

import { type GstBusinessFormData, type BusinessFormData } from './gstBusiness.types'
export type { GstBusinessFormData, BusinessFormData }

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

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    const errs = validateGstBusinessForm(data)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstErrorField = Object.keys(errs)[0]
      const el = document.querySelector(`[name="${firstErrorField}"], #${firstErrorField}`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    onNext()
  }

  return (
    <form className="gst-step-business" onSubmit={handleSubmit} noValidate>
      {/* 1. Business Details Section */}
      <GSTBusinessDetails
        data={data}
        onChange={onChange}
        errors={errors}
        onClearError={clearErr}
      />

      {/* 2. Bank Account Details Section */}
      <GSTBankDetails
        data={data}
        onChange={onChange}
        errors={errors}
        onClearError={clearErr}
      />

      {/* 3. Authorised Signatory Details Section */}
      <GSTAuthorisedSignatory
        data={data}
        onChange={onChange}
        errors={errors}
        onClearError={clearErr}
      />

      {/* 4. Aadhaar Authentication Consent Section */}
      <div className="gst-step-business__section gst-step-business__consent-section">
        <h3 className="gst-step-business__section-title">
          4. Aadhaar Authentication Consent
        </h3>
        <p className="gst-step-business__section-desc">
          Mandatory consent for biometric / OTP-based Aadhaar verification as per GST Rules
        </p>

        <label
          className={`gst-step-business__checkbox-label ${
            errors.aadhaarConsent ? 'has-error' : ''
          }`}
        >
          <input
            id="gst-step-business-aadhaar-consent"
            type="checkbox"
            checked={data.aadhaarConsent}
            onChange={handleConsentChange}
            className="gst-step-business__checkbox"
          />
          <span className="gst-step-business__checkbox-text">
            I hereby give consent to use my Aadhaar details for GST registration authentication and OTP verification with UIDAI. *
          </span>
        </label>
        {errors.aadhaarConsent && (
          <span className="gst-step-business__field-error">{errors.aadhaarConsent}</span>
        )}
      </div>

      {/* Action Buttons */}
      <StepActionBar
        onBack={onCancel}
        onNext={handleSubmit}
        nextLabel="Continue to Documents"
      />
    </form>
  )
}

export default GSTStepBusiness

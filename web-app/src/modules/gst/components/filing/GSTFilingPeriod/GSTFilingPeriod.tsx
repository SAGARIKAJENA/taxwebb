import React, { useState } from 'react'
import { GSTFilingStepper } from './GSTFilingStepper'
import { GSTCalculationMethod } from './GSTCalculationMethod'
import { GSTFilingFrequency } from './GSTFilingFrequency'
import { GSTFilingTypeSelector } from './GSTFilingTypeSelector'
import { GSTVerifiedBusinessCard } from './GSTVerifiedBusinessCard'
import {
  FINANCIAL_YEAR_OPTIONS,
  MONTHLY_PERIOD_OPTIONS,
  QUARTERLY_PERIOD_OPTIONS,
  ANNUAL_PERIOD_OPTIONS,
  RETURN_PERIOD_OPTIONS,
  RETURN_TYPE_OPTIONS,
  type SelectOption,
} from './gstPeriodOptions'
import './GSTFilingPeriod.css'

export interface FilingPeriodData {
  gstin: string
  businessName: string
  financialYear: string
  frequency: string
  selectedMonth: string
  returnType: 'combo' | 'gstr1' | 'nil' | ''
  baseFee: number
  filingType?: 'regular' | 'nil' | ''
  calculationMethod?: 'ca_calculate' | 'estimated_figures' | ''
}

interface GSTFilingPeriodProps {
  initialData?: Partial<FilingPeriodData>
  onContinue: (data: FilingPeriodData) => void
  onCancel: () => void
}

const ChevronDown: React.FC = () => (
  <svg className="gst-filing-period__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export const GSTFilingPeriod: React.FC<GSTFilingPeriodProps> = ({
  initialData,
  onContinue,
  onCancel,
}) => {
  const [financialYear, setFinancialYear] = useState(initialData?.financialYear || '')
  const [frequency, setFrequency] = useState(initialData?.frequency || '')
  const [returnPeriod, setReturnPeriod] = useState(initialData?.selectedMonth || '')
  const [gstin, setGstin] = useState(initialData?.gstin || '')
  const [returnType, setReturnType] = useState<string>(initialData?.returnType || '')
  const [filingType, setFilingType] = useState<'regular' | 'nil' | ''>(initialData?.filingType || '')
  const [calculationMethod, setCalculationMethod] = useState<'ca_calculate' | 'estimated_figures' | ''>(
    initialData?.calculationMethod || ''
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleClearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  const periodOptions: SelectOption[] =
    frequency === 'Quarterly'
      ? QUARTERLY_PERIOD_OPTIONS
      : frequency === 'Annual'
        ? ANNUAL_PERIOD_OPTIONS
        : frequency === 'Monthly'
          ? MONTHLY_PERIOD_OPTIONS
          : RETURN_PERIOD_OPTIONS

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}
    if (!frequency) newErrors.frequency = 'Please select a filing frequency'
    if (!financialYear) newErrors.financialYear = 'Please select a financial year'
    if (!returnPeriod) newErrors.returnPeriod = 'Please select a return period'
    if (!gstin.trim()) newErrors.gstin = 'Please enter a valid 15-character GSTIN'
    if (!returnType && filingType !== 'nil') {
      newErrors.returnType = 'Please select a return type'
    }
    if (filingType === 'regular' && !calculationMethod) {
      newErrors.calculationMethod = 'Please select a tax calculation method'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const calculatedBaseFee = filingType === 'nil' ? 500 : returnType === 'gstr1' ? 1500 : 2500

    onContinue({
      gstin: gstin.toUpperCase().trim(),
      businessName: initialData?.businessName || 'Shree Deshmukh Traders',
      financialYear,
      frequency,
      selectedMonth: returnPeriod,
      returnType: (filingType === 'nil' ? 'nil' : (returnType as any)) || 'combo',
      baseFee: calculatedBaseFee,
      filingType,
      calculationMethod,
    })
  }

  return (
    <div className="gst-filing-period-container">
      {/* 4-Step Progress Stepper */}
      <GSTFilingStepper currentStep={2} />

      {/* Main Page Title and Subtitle */}
      <header className="gst-filing-period__header">
        <h1 className="gst-filing-period__title">GST Filing Period</h1>
        <p className="gst-filing-period__subtitle">
          Provide the filing details to proceed with your GST return.
        </p>
      </header>

      {/* Main Content Form */}
      <div className="gst-filing-period__card">
        <form className="gst-filing-period__form" onSubmit={handleSubmit} noValidate>
          <div className="gst-filing-period__grid">
            {/* Filing Frequency Section */}
            <GSTFilingFrequency
              value={frequency}
              onChange={(newFreq) => {
                setFrequency(newFreq)
                handleClearError('frequency')
                setReturnPeriod('')
              }}
              error={errors.frequency}
            />

            {/* Financial Year */}
            <div className="gst-filing-period__field">
              <label htmlFor="gst-fy" className="gst-filing-period__label">
                Financial Year *
              </label>
              <div className="gst-filing-period__select-wrap">
                <select
                  id="gst-fy"
                  className={`gst-filing-period__select ${!financialYear ? 'gst-filing-period__select--placeholder' : ''}`}
                  value={financialYear}
                  onChange={(e) => {
                    setFinancialYear(e.target.value)
                    handleClearError('financialYear')
                  }}
                >
                  <option value="">Select Financial Year</option>
                  {FINANCIAL_YEAR_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>
              {errors.financialYear && (
                <span className="gst-filing-period__error-text">{errors.financialYear}</span>
              )}
            </div>

            {/* Filing Period / Return Period */}
            <div className="gst-filing-period__field">
              <label htmlFor="gst-return-period" className="gst-filing-period__label">
                Filing Period / Return Period *
              </label>
              <div className="gst-filing-period__select-wrap">
                <input
                  id="gst-return-period"
                  type="text"
                  list="gst-period-options"
                  className="gst-filing-period__input"
                  placeholder="e.g. August 2026 (select or type)"
                  value={returnPeriod}
                  onChange={(e) => {
                    setReturnPeriod(e.target.value)
                    handleClearError('returnPeriod')
                  }}
                />
                <datalist id="gst-period-options">
                  {periodOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} />
                  ))}
                </datalist>
                <ChevronDown />
              </div>
              {errors.returnPeriod && (
                <span className="gst-filing-period__error-text">{errors.returnPeriod}</span>
              )}
            </div>

            {/* GSTIN (15-Character) */}
            <div className="gst-filing-period__field">
              <label htmlFor="gst-gstin" className="gst-filing-period__label">
                GSTIN (15-Character) *
              </label>
              <input
                id="gst-gstin"
                type="text"
                maxLength={15}
                className="gst-filing-period__input"
                placeholder="e.g. 29AAAAA0000A1Z5"
                value={gstin}
                onChange={(e) => {
                  setGstin(e.target.value.toUpperCase())
                  handleClearError('gstin')
                }}
              />
              {errors.gstin && (
                <span className="gst-filing-period__error-text">{errors.gstin}</span>
              )}

              {/* Verified Business Card appears when user enters GST number */}
              {gstin.trim().length >= 3 && (
                <GSTVerifiedBusinessCard
                  gstin={gstin}
                  tradeName="Shree Deshmukh Traders"
                  legalName="Shree Deshmukh Enterprises Private Limited"
                  scheme={filingType === 'nil' ? 'Nil Return' : 'Regular Scheme'}
                />
              )}
            </div>

            {/* Filing Return Type */}
            <div className="gst-filing-period__field">
              <label htmlFor="gst-return-type" className="gst-filing-period__label">
                Filing Return Type *
              </label>
              <div className="gst-filing-period__select-wrap">
                <select
                  id="gst-return-type"
                  className={`gst-filing-period__select ${!returnType ? 'gst-filing-period__select--placeholder' : ''}`}
                  value={returnType}
                  onChange={(e) => {
                    setReturnType(e.target.value)
                    handleClearError('returnType')
                  }}
                >
                  <option value="">Select return type</option>
                  {RETURN_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>
              {errors.returnType && (
                <span className="gst-filing-period__error-text">{errors.returnType}</span>
              )}
            </div>

            {/* Filing Type Selection Cards */}
            <GSTFilingTypeSelector
              value={filingType}
              onChange={(type) => {
                setFilingType(type)
                handleClearError('filingType')
              }}
            />

            {/* Tax Calculation Method (shown dynamically when Regular Return is clicked) */}
            {filingType === 'regular' && (
              <GSTCalculationMethod
                value={calculationMethod}
                onChange={(method) => {
                  setCalculationMethod(method)
                  handleClearError('calculationMethod')
                }}
                error={errors.calculationMethod}
              />
            )}
          </div>

          <hr className="gst-filing-period__divider" />

          {/* Action Navigation Footer */}
          <div className="gst-filing-period__actions">
            <button
              type="button"
              className="gst-filing-period__btn-back"
              onClick={onCancel}
            >
              ← Back
            </button>
            <button type="submit" className="gst-filing-period__btn-continue">
              Continue to Documents →
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

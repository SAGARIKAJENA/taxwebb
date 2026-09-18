import React, { useState } from 'react'
import { DEFAULT_TDS_TAXPAYER } from './tdsRefund.constants'
import { StepActionBar } from '@shared/components'
import { TdsRefundPersonalInfoSection } from './TdsRefundPersonalInfoSection'
import { TdsRefundBankSection, type TdsBankDetails } from './TdsRefundBankSection'
import { TdsRefundTaxDetailsSection, type TdsIncomeTaxData } from './TdsRefundTaxDetailsSection'
import { TdsRefundPrelimBanner } from './TdsRefundPrelimBanner'
import { TdsRefundProgressionSidebar } from './TdsRefundProgressionSidebar'
import { TdsRefundStepTracker } from './TdsRefundStepTracker'
import './TdsRefundCustomerIncome.css'

export interface TdsRefundCustomerIncomeProps {
  onBack: () => void
  onNext: () => void
  onSaveDraft?: () => void
  currentStep?: number
  initialProfile?: typeof DEFAULT_TDS_TAXPAYER
  onProfileChange?: (profile: typeof DEFAULT_TDS_TAXPAYER) => void
  initialBankDetails?: TdsBankDetails
  onBankChange?: (details: TdsBankDetails) => void
  initialTaxData?: TdsIncomeTaxData
  onTaxChange?: (data: TdsIncomeTaxData) => void
}

export type TdsRefundStepCustomerIncomeProps = TdsRefundCustomerIncomeProps

export const TdsRefundCustomerIncome: React.FC<TdsRefundCustomerIncomeProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  currentStep = 1,
  initialProfile,
  onProfileChange,
  initialBankDetails,
  onBankChange,
  initialTaxData,
  onTaxChange,
}) => {
  const [profile, setProfile] = useState(initialProfile || DEFAULT_TDS_TAXPAYER)
  const [error, setError] = useState<string | null>(null)

  const [bankDetails, setBankDetails] = useState<TdsBankDetails>(
    initialBankDetails || {
      accountHolder: '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifsc: '',
      bankName: '',
      branch: '',
      accountType: null,
    }
  )

  const [taxData, setTaxData] = useState<TdsIncomeTaxData>(
    initialTaxData || {
      taxRegime: null,
      salaryIncome: '',
      otherIncome: '',
      interestIncome: '',
      rentalIncome: null,
      capitalGains: null,
      businessIncome: null,
      homeLoanInterest: null,
      taxDeductions: null,
      annualRent: '',
      propertyTaxes: '',
      stcg: '',
      ltcg: '',
      turnover: '',
      netProfit: '',
      homeLoanInterestAmount: '',
      deduction80C: '',
      deduction80D: '',
      totalTdsDeducted: '',
      tcsAmount: '',
      advanceTax: '',
      selfAssessmentTax: '',
    }
  )

  const handleProfileChange = (updated: Partial<typeof DEFAULT_TDS_TAXPAYER>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated }
      onProfileChange?.(next)
      return next
    })
  }

  const handleBankChange = (updated: Partial<TdsBankDetails>) => {
    setBankDetails((prev) => {
      const next = { ...prev, ...updated }
      onBankChange?.(next)
      return next
    })
  }

  const handleTaxChange = (updated: Partial<TdsIncomeTaxData>) => {
    setTaxData((prev) => {
      const next = { ...prev, ...updated }
      onTaxChange?.(next)
      return next
    })
  }

  const handleContinue = (e?: React.FormEvent) => {
    if (e && 'preventDefault' in e) e.preventDefault()
    if (!profile.fullName?.trim()) {
      setError('Please provide your full name.')
      return
    }
    if (!profile.pan?.trim()) {
      setError('Please provide your PAN number.')
      return
    }
    if (!bankDetails.accountHolder?.trim()) {
      setError('Please provide account holder name.')
      return
    }
    if (!bankDetails.accountNumber || !bankDetails.confirmAccountNumber) {
      setError('Please provide your bank account number.')
      return
    }
    if (bankDetails.accountNumber !== bankDetails.confirmAccountNumber) {
      setError('Bank account numbers do not match.')
      return
    }
    if (!bankDetails.ifsc || bankDetails.ifsc.trim().length !== 11) {
      setError('Please enter a valid 11-character IFSC code.')
      return
    }
    if (!taxData.totalTdsDeducted || Number(taxData.totalTdsDeducted.replace(/[^0-9.]/g, '')) <= 0) {
      setError('Please enter total TDS deducted amount.')
      return
    }
    setError(null)
    onNext()
  }

  const isProfileValid = Boolean(profile.fullName?.trim() && profile.pan?.trim())

  const computedRefundTotal = (() => {
    const tds = Number((taxData.totalTdsDeducted || '').replace(/[^0-9.]/g, '')) || 0
    const tcs = Number((taxData.tcsAmount || '').replace(/[^0-9.]/g, '')) || 0
    const adv = Number((taxData.advanceTax || '').replace(/[^0-9.]/g, '')) || 0
    const self = Number((taxData.selfAssessmentTax || '').replace(/[^0-9.]/g, '')) || 0
    const total = tds + tcs + adv + self
    return total > 0 ? `₹${total.toLocaleString('en-IN')}` : '₹0'
  })()

  const isStep1Valid = Boolean(
    profile.fullName?.trim() &&
    profile.pan?.trim() &&
    bankDetails.accountHolder?.trim() &&
    bankDetails.accountNumber?.trim() &&
    bankDetails.confirmAccountNumber?.trim() &&
    bankDetails.accountNumber.trim() === bankDetails.confirmAccountNumber.trim() &&
    bankDetails.ifsc?.trim() &&
    bankDetails.ifsc.trim().length === 11 &&
    taxData.totalTdsDeducted?.trim() &&
    Number(taxData.totalTdsDeducted.replace(/[^0-9.]/g, '')) > 0
  )

  return (
    <div className="tds-step1-page">
      <TdsRefundStepTracker currentStep={currentStep} />

      <TdsRefundPrelimBanner
        assessmentYear={profile.assessmentYear || 'AY 2026-27'}
        refundAmount={computedRefundTotal}
      />

      <div className="tds-step1-layout">
        <form className="tds-step1-main" onSubmit={handleContinue}>
          <TdsRefundPersonalInfoSection
            profile={profile}
            onChange={handleProfileChange}
            isValid={isProfileValid}
          />

          <TdsRefundBankSection
            bankDetails={bankDetails}
            onChange={handleBankChange}
            error={error}
          />

          <TdsRefundTaxDetailsSection
            data={taxData}
            onChange={handleTaxChange}
          />
        </form>

        <TdsRefundProgressionSidebar />
      </div>

      <StepActionBar
        onBack={onBack}
        onNext={handleContinue}
        nextLabel="Continue"
        nextDisabled={!isStep1Valid}
        extraActions={
          onSaveDraft ? (
            <button
              type="button"
              className="step-action-bar__btn step-action-bar__btn--save-draft"
              onClick={onSaveDraft}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              <span>Save Draft &amp; Exit</span>
            </button>
          ) : undefined
        }
      />
    </div>
  )
}

export const TdsRefundStepCustomerIncome = TdsRefundCustomerIncome
export default TdsRefundCustomerIncome

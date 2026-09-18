import React, { useState } from 'react'
import { useAuthStore } from '@store/index'
import {
  getStoredTaxpayerProfile,
  type AssessmentYearOption,
  type ResidentialStatusOption,
  type FilingTypeOption,
  type FilingBankAccount,
  type PreviousItrInfo,
} from './itrCategories.constants'
import { StepActionBar } from '@shared/components'
import './ItrPersonalInfo.css'
import { ItrTaxpayerProfileCard } from './ItrTaxpayerProfileCard'
import { ItrFilingOptionsCard } from './ItrFilingOptionsCard'
import { ItrRefundBankSection } from './ItrRefundBankSection'
import { ItrPreviousItrSection } from './ItrPreviousItrSection'

export interface ItrStepPersonalInfoViewProps {
  onBack: () => void
  onNext: () => void
  onSaveDraft?: () => void
  initialAssessmentYear?: AssessmentYearOption
  onAssessmentYearChange?: (ay: AssessmentYearOption) => void
  initialResidentialStatus?: ResidentialStatusOption
  onResidentialStatusChange?: (status: ResidentialStatusOption) => void
  initialFilingType?: FilingTypeOption
  onFilingTypeChange?: (ft: FilingTypeOption) => void
  initialBankAccounts?: FilingBankAccount[]
  onBankAccountsChange?: (accounts: FilingBankAccount[]) => void
  initialSelectedBankId?: string
  onSelectedBankIdChange?: (id: string) => void
  initialPreviousItr?: PreviousItrInfo
  onPreviousItrChange?: (info: PreviousItrInfo) => void
}

const ITR_STEPS = [
  { id: 1, label: 'Personal & Filing' },
  { id: 2, label: 'Income Sources' },
  { id: 3, label: 'Regime & Deductions' },
  { id: 4, label: 'Document Checklist' },
  { id: 5, label: 'Review & File' },
]

export const ItrStepPersonalInfoView: React.FC<ItrStepPersonalInfoViewProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  initialAssessmentYear,
  onAssessmentYearChange,
  initialResidentialStatus,
  onResidentialStatusChange,
  initialFilingType,
  onFilingTypeChange,
  initialBankAccounts,
  onBankAccountsChange,
  initialSelectedBankId,
  onSelectedBankIdChange,
  initialPreviousItr,
  onPreviousItrChange,
}) => {
  const authUser = useAuthStore((state) => state.user)
  const taxpayerProfile = getStoredTaxpayerProfile(authUser)

  const [assessmentYear, setAssessmentYear] = useState<AssessmentYearOption>(
    initialAssessmentYear || ''
  )
  const [residentialStatus, setResidentialStatus] = useState<ResidentialStatusOption>(
    initialResidentialStatus || ''
  )
  const [filingType, setFilingType] = useState<FilingTypeOption>(
    initialFilingType || ''
  )

  const [bankAccounts, setBankAccounts] = useState<FilingBankAccount[]>(
    initialBankAccounts || []
  )
  const [selectedBankId, setSelectedBankId] = useState<string>(
    initialSelectedBankId || ''
  )

  const [previousItr, setPreviousItr] = useState<PreviousItrInfo>(
    initialPreviousItr || {
      hasPreviousReturn: false,
      previousAy: '',
      ackNumber: '',
      filingDate: '',
      hasCarryForwardLoss: false,
      lossAmount: '',
    }
  )

  const handleAyChange = (ay: AssessmentYearOption) => {
    setAssessmentYear(ay)
    onAssessmentYearChange?.(ay)
  }

  const handleResChange = (status: ResidentialStatusOption) => {
    setResidentialStatus(status)
    onResidentialStatusChange?.(status)
  }

  const handleFilingTypeChange = (ft: FilingTypeOption) => {
    setFilingType(ft)
    onFilingTypeChange?.(ft)
  }

  const handleBankAccountsChange = (accs: FilingBankAccount[]) => {
    setBankAccounts(accs)
    onBankAccountsChange?.(accs)
  }

  const handleSelectedBankIdChange = (id: string) => {
    setSelectedBankId(id)
    onSelectedBankIdChange?.(id)
  }

  const handlePrevItrChange = (info: PreviousItrInfo) => {
    setPreviousItr(info)
    onPreviousItrChange?.(info)
  }

  const isStep1Valid = Boolean(
    assessmentYear &&
    residentialStatus &&
    filingType &&
    selectedBankId &&
    bankAccounts.some((b) => b.id === selectedBankId)
  )

  return (
    <div className="itr-personal-view-container">
      {/* Step Header with 5 Connected Steps */}
      <div className="itr-personal-header">
        <div className="itr-personal-title-group">
          <h1 className="itr-personal-title">ITR Filing</h1>
        </div>

        <div className="itr-stepper-track" aria-label="Step progress">
          {ITR_STEPS.map((s, idx) => {
            const isDotCompleted = s.id < 1
            const isDotActive = s.id === 1
            const dotClass = isDotCompleted
              ? 'itr-stepper-dot itr-stepper-dot--completed'
              : isDotActive
              ? 'itr-stepper-dot itr-stepper-dot--active'
              : 'itr-stepper-dot itr-stepper-dot--inactive'
            const lineClass = isDotCompleted
              ? 'itr-stepper-line itr-stepper-line--completed'
              : 'itr-stepper-line'
            return (
              <React.Fragment key={s.id}>
                <div className="itr-stepper-step-item">
                  <div className={dotClass} title={`Step ${s.id}: ${s.label}`}>
                    {isDotCompleted ? (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      s.id
                    )}
                  </div>
                  <span className={`itr-stepper-label ${isDotActive ? 'itr-stepper-label--active' : ''}`}>
                    {s.label}
                  </span>
                </div>
                {idx < ITR_STEPS.length - 1 && <div className={lineClass} />}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Desktop 2-Column Responsive Layout */}
      <div className="itr-personal-layout">
        {/* Left Column: Taxpayer Identity, AY, Residential Status */}
        <aside className="itr-personal-sidebar">
          <ItrTaxpayerProfileCard taxpayerProfile={taxpayerProfile} />
          <ItrFilingOptionsCard
            assessmentYear={assessmentYear}
            onAssessmentYearChange={handleAyChange}
            residentialStatus={residentialStatus}
            onResidentialStatusChange={handleResChange}
            filingType={filingType}
            onFilingTypeChange={handleFilingTypeChange}
          />
        </aside>

        {/* Right Column: Refund Bank */}
        <div className="itr-personal-main">
          <ItrRefundBankSection
            bankAccounts={bankAccounts}
            onBankAccountsChange={handleBankAccountsChange}
            selectedBankId={selectedBankId}
            onSelectedBankIdChange={handleSelectedBankIdChange}
          />
        </div>
      </div>

      {/* Full-Width Section: Previous ITR Data */}
      <ItrPreviousItrSection
        previousItr={previousItr}
        onPreviousItrChange={handlePrevItrChange}
      />

      {/* Navigation */}
      <StepActionBar
        onBack={onBack}
        onNext={onNext}
        backLabel="Back"
        nextLabel="Continue"
        nextDisabled={!isStep1Valid}
        extraActions={
          onSaveDraft ? (
            <button
              type="button"
              className="step-action-bar__btn step-action-bar__btn--save-draft"
              onClick={onSaveDraft}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

export default ItrStepPersonalInfoView

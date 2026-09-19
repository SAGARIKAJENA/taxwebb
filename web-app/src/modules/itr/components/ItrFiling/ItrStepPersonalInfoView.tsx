import React, { useState } from 'react'
import { useAuthStore } from '@store/index'
import {
  getStoredTaxpayerProfile,
  UserCategoryIcon,
  ShieldCategoryIcon,
  CalendarIcon,
  GlobeIcon,
  DocumentCategoryIcon,
  type AssessmentYearOption,
  type ResidentialStatusOption,
  type FilingTypeOption,
  type FilingBankAccount,
  type PreviousItrInfo,
  type TaxpayerProfile,
} from './itrFiling.constants'
import { StepActionBar } from '@shared/components'
import './ItrStepPersonalInfoView.css'
import { ItrStepHeaderStepper } from './ItrStepHeaderStepper'
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

const AY_OPTIONS: { ay: AssessmentYearOption; fy: string }[] = [
  { ay: 'AY 2026-27', fy: 'FY 2025-2026' },
  { ay: 'AY 2027-28', fy: 'FY 2026-2027' },
  { ay: 'AY 2025-26', fy: 'FY 2024-2025' },
]

const RESIDENTIAL_OPTIONS: {
  id: ResidentialStatusOption
  label: string
  desc: string
}[] = [
  {
    id: 'resident',
    label: 'Resident',
    desc: 'Applicable to individuals residing primarily in India during the financial year.',
  },
  {
    id: 'nri',
    label: 'Non-Resident (NRI)',
    desc: 'Applicable to individuals residing outside India during the financial year.',
  },
  {
    id: 'rnor',
    label: 'Resident but NOR',
    desc: 'Applicable to individuals who are resident in India but Not Ordinarily Resident.',
  },
]

const FILING_OPTIONS: {
  id: FilingTypeOption
  label: string
  subtext: string
}[] = [
  {
    id: 'original',
    label: 'Original Return (u/s 139(1))',
    subtext: 'Filing on or before statutory due date.',
  },
  {
    id: 'belated',
    label: 'Belated Return (u/s 139(4))',
    subtext: 'Filing after statutory due date with applicable late fees.',
  },
  {
    id: 'revised',
    label: 'Revised Return (u/s 139(5))',
    subtext: 'Correct omission or error in previously filed return.',
  },
  {
    id: 'updated',
    label: 'Updated Return (ITR-U) (u/s 139(8A))',
    subtext: 'Filing within 24 months from the end of relevant AY.',
  },
]

const ItrTaxpayerProfileCard: React.FC<{ taxpayerProfile: TaxpayerProfile }> = ({
  taxpayerProfile,
}) => (
  <section className="itr-info-card" aria-labelledby="taxpayer-identity-heading">
    <div className="itr-info-card__top">
      <div className="itr-info-card__title-row">
        <div className="itr-info-card__icon-wrap">
          <UserCategoryIcon size={20} />
        </div>
        <h2 id="taxpayer-identity-heading" className="itr-info-card__title">
          Taxpayer Identity
        </h2>
      </div>
      <span className="itr-badge-verified">
        <ShieldCategoryIcon size={13} />
        <span>Auto-Verified</span>
      </span>
    </div>

    <p className="itr-info-card__desc">
      Auto-filled from your TaxEdge profile. Verified with Income Tax Department PAN Master.
    </p>

    <div className="itr-taxpayer-details-box">
      <div className="itr-detail-row">
        <span className="itr-detail-label">PAN Number</span>
        <strong className="itr-detail-val itr-detail-val--mono">{taxpayerProfile.panNumber}</strong>
      </div>
      <div className="itr-detail-row">
        <span className="itr-detail-label">Aadhaar Number</span>
        <strong className="itr-detail-val itr-detail-val--mono">{taxpayerProfile.aadhaarNumber}</strong>
      </div>
      <div className="itr-detail-row">
        <span className="itr-detail-label">Full Legal Name</span>
        <strong className="itr-detail-val">{taxpayerProfile.fullName}</strong>
      </div>
      <div className="itr-detail-row">
        <span className="itr-detail-label">Date of Birth</span>
        <strong className="itr-detail-val">{taxpayerProfile.dob}</strong>
      </div>
      <div className="itr-detail-row">
        <span className="itr-detail-label">Mobile Number</span>
        <strong className="itr-detail-val">{taxpayerProfile.mobileNumber}</strong>
      </div>
      <div className="itr-detail-row">
        <span className="itr-detail-label">Email Address</span>
        <strong className="itr-detail-val">{taxpayerProfile.emailAddress}</strong>
      </div>
      <div className="itr-detail-row">
        <span className="itr-detail-label">Registered Address</span>
        <strong className="itr-detail-val">{taxpayerProfile.registeredAddress}</strong>
      </div>
    </div>
  </section>
)

const ItrFilingOptionsCard: React.FC<{
  assessmentYear: AssessmentYearOption
  onAssessmentYearChange: (ay: AssessmentYearOption) => void
  residentialStatus: ResidentialStatusOption
  onResidentialStatusChange: (status: ResidentialStatusOption) => void
}> = ({
  assessmentYear,
  onAssessmentYearChange,
  residentialStatus,
  onResidentialStatusChange,
}) => {
  const activeResidentialOption =
    RESIDENTIAL_OPTIONS.find((r) => r.id === residentialStatus) || null

  return (
    <>
      <section className="itr-info-card" aria-labelledby="ay-heading">
        <div className="itr-info-card__title-row">
          <div className="itr-info-card__icon-wrap">
            <CalendarIcon size={20} />
          </div>
          <h2 id="ay-heading" className="itr-info-card__title">
            Assessment Year (AY)
          </h2>
        </div>

        <p className="itr-info-card__desc">
          Select the assessment year for which you are filing this income tax return.
        </p>

        <div className="itr-ay-buttons-grid">
          {AY_OPTIONS.map((opt) => (
            <button
              key={opt.ay}
              type="button"
              className={`itr-ay-btn ${assessmentYear === opt.ay ? 'itr-ay-btn--active' : ''}`}
              onClick={() => onAssessmentYearChange(opt.ay)}
            >
              <span className="itr-ay-main">{opt.ay}</span>
              <span className="itr-ay-sub">{opt.fy}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="itr-info-card" aria-labelledby="res-heading">
        <div className="itr-info-card__title-row">
          <div className="itr-info-card__icon-wrap">
            <GlobeIcon size={20} />
          </div>
          <h2 id="res-heading" className="itr-info-card__title">
            Residential Status
          </h2>
        </div>

        <p className="itr-info-card__desc">
          Select your residential status in India for the selected financial year.
        </p>

        <div className="itr-status-group">
          <div className="itr-status-buttons">
            {RESIDENTIAL_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`itr-status-btn ${residentialStatus === opt.id ? 'itr-status-btn--active' : ''}`}
                onClick={() => onResidentialStatusChange(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {activeResidentialOption ? (
            <div className="itr-info-callout">
              <span className="itr-info-callout__text">
                Selected Status: <strong>{activeResidentialOption.label}</strong> – {activeResidentialOption.desc}
              </span>
            </div>
          ) : (
            <div className="itr-info-callout">
              <span className="itr-info-callout__text" style={{ fontStyle: 'italic', color: '#64748b' }}>
                Please select your residential status above.
              </span>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

const ItrFilingTypeCard: React.FC<{
  filingType: FilingTypeOption
  onFilingTypeChange: (ft: FilingTypeOption) => void
}> = ({ filingType, onFilingTypeChange }) => (
  <section className="itr-info-card" aria-labelledby="filing-type-heading">
    <div className="itr-info-card__title-row">
      <div className="itr-info-card__icon-wrap">
        <DocumentCategoryIcon size={20} />
      </div>
      <h2 id="filing-type-heading" className="itr-info-card__title">
        Filing Type
      </h2>
    </div>

    <p className="itr-info-card__desc">
      Select your return filing type according to the Income Tax Act, 1961.
    </p>

    <div className="itr-filing-options-list">
      {FILING_OPTIONS.map((f) => {
        const isSelected = filingType === f.id
        return (
          <label
            key={f.id}
            className={`itr-filing-option-card ${isSelected ? 'itr-filing-option-card--active' : ''}`}
          >
            <div className="itr-radio-outer">
              <input
                type="radio"
                name="filingType"
                value={f.id}
                checked={isSelected}
                onChange={() => onFilingTypeChange(f.id)}
                className="itr-filing-radio-input"
              />
              <span className={`itr-custom-radio ${isSelected ? 'itr-custom-radio--checked' : ''}`} />
            </div>
            <div className="itr-filing-option-text">
              <span className="itr-filing-option-title">{f.label}</span>
              <span className="itr-filing-option-desc">{f.subtext}</span>
            </div>
          </label>
        )
      })}
    </div>
  </section>
)

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
      <ItrStepHeaderStepper currentStepId={1} />

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
          />
        </aside>

        {/* Right Column: Filing Type above Refund Bank Account */}
        <div className="itr-personal-main">
          <ItrFilingTypeCard
            filingType={filingType}
            onFilingTypeChange={handleFilingTypeChange}
          />
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

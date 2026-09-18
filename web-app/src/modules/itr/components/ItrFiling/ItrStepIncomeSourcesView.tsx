import React from 'react'
import { StepActionBar } from '@shared/components'
import './ItrFilingSteps.css'
import './ItrPersonalInfo.css'
import {
  ALL_SOURCES,
  ITR_STEPS,
  type SalaryDetails,
  type HousePropertyDetails,
  type BusinessDetails,
  type CapitalGainsDetails,
  type OtherSourcesDetails,
} from './itrIncomeSources.constants'
import { ItrSalaryIncomeCard } from './ItrSalaryIncomeCard'
import { ItrHousePropertyCard } from './ItrHousePropertyCard'
import { ItrBusinessIncomeCard } from './ItrBusinessIncomeCard'
import { ItrCapitalGainsCard } from './ItrCapitalGainsCard'
import { ItrOtherSourcesCard } from './ItrOtherSourcesCard'

export * from './itrIncomeSources.constants'

export interface ItrStepIncomeSourcesViewProps {
  onBack: () => void
  onNext: () => void
  onSaveDraft?: () => void
  salaryDetails: SalaryDetails
  onSalaryDetailsChange: (details: SalaryDetails) => void
  housePropertyDetails: HousePropertyDetails
  onHousePropertyDetailsChange: (details: HousePropertyDetails) => void
  businessDetails: BusinessDetails
  onBusinessDetailsChange: (details: BusinessDetails) => void
  capitalGainsDetails: CapitalGainsDetails
  onCapitalGainsDetailsChange: (details: CapitalGainsDetails) => void
  otherSourcesDetails: OtherSourcesDetails
  onOtherSourcesDetailsChange: (details: OtherSourcesDetails) => void
  selectedSources: string[]
  onSourcesChange: (sources: string[]) => void
}

export const ItrStepIncomeSourcesView: React.FC<ItrStepIncomeSourcesViewProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  salaryDetails,
  onSalaryDetailsChange,
  housePropertyDetails,
  onHousePropertyDetailsChange,
  businessDetails,
  onBusinessDetailsChange,
  capitalGainsDetails,
  onCapitalGainsDetailsChange,
  otherSourcesDetails,
  onOtherSourcesDetailsChange,
  selectedSources,
  onSourcesChange,
}) => {
  const toggleSource = (id: string) => {
    if (selectedSources.includes(id)) {
      onSourcesChange(selectedSources.filter((s) => s !== id))
    } else {
      onSourcesChange([...selectedSources, id])
    }
  }

  const isSalarySelected = selectedSources.includes('salary')
  const isHousePropertySelected = selectedSources.includes('house_property')
  const isBusinessSelected = selectedSources.includes('business')
  const isCapitalGainsSelected = selectedSources.includes('capital_gains')
  const isOtherSourcesSelected = selectedSources.includes('other_sources')

  const isStep2Valid = Boolean(
    selectedSources.length > 0 &&
    (!selectedSources.includes('salary') ||
      (salaryDetails.employerName?.trim() && salaryDetails.grossSalary?.trim())) &&
    (!selectedSources.includes('house_property') ||
      (housePropertyDetails.propertyType === 'self_occupied' ||
        Boolean(housePropertyDetails.annualRentReceived?.trim()))) &&
    (!selectedSources.includes('business') ||
      (businessDetails.grossTurnover?.trim() && businessDetails.declaredNetProfit?.trim())) &&
    (!selectedSources.includes('capital_gains') ||
      (capitalGainsDetails.assetTypes.length > 0 &&
        (capitalGainsDetails.stcg?.trim() || capitalGainsDetails.ltcg?.trim()))) &&
    (!selectedSources.includes('other_sources') ||
      Boolean(
        otherSourcesDetails.interestIncome?.trim() ||
        otherSourcesDetails.dividendIncome?.trim() ||
        otherSourcesDetails.otherIncome?.trim()
      ))
  )

  return (
    <div className="itr-step-view-container">
      {/* 5-Step Progress Stepper */}
      <div className="itr-personal-header">
        <div className="itr-personal-title-group">
          <h1 className="itr-personal-title">ITR Filing</h1>
        </div>

        <div className="itr-stepper-track" aria-label="Step progress">
          {ITR_STEPS.map((s, idx) => {
            const isDotCompleted = s.id < 2
            const isDotActive = s.id === 2
            const dotClass = isDotCompleted
              ? 'itr-stepper-dot itr-stepper-dot--completed'
              : isDotActive
              ? 'itr-stepper-dot itr-stepper-dot--active'
              : 'itr-stepper-dot itr-stepper-dot--inactive'
            const lineClass = isDotCompleted ? 'itr-stepper-line itr-stepper-line--completed' : 'itr-stepper-line'
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
                  <span className={`itr-stepper-label ${isDotActive ? 'itr-stepper-label--active' : ''}`}>{s.label}</span>
                </div>
                {idx < ITR_STEPS.length - 1 && <div className={lineClass} />}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Applicable Return Form Card */}
      <div className="itr-applicable-card">
        <div className="itr-applicable-card__header">
          <div className="itr-applicable-card__title-wrap">
            <span className="itr-applicable-card__icon">✨</span>
            <h2 className="itr-applicable-card__title">Applicable Return Form</h2>
          </div>
          <span className="itr-badge-itr1">ITR-1</span>
        </div>
        <p className="itr-applicable-card__desc">
          Based on your salary and interest income up to ₹50 Lakhs as a resident, ITR-1 applies.
        </p>
        <div className="itr-applicable-card__checklist">
          {[
            'Salary / Pension income declared',
            'No business or professional income declared',
            'No capital gains or trading declared',
            'Resident individual with income <= ₹50 Lakhs',
          ].map((item) => (
            <div key={item} className="itr-applicable-card__check-item">
              <span className="itr-check-circle-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Income Sources Selector */}
      <div className="itr-step-card">
        <div className="itr-sources-header">
          <h2 className="itr-sources-title">Income Sources & Activity</h2>
          <p className="itr-sources-subtitle">
            Select all sources of income you earned this year. Fields will adjust automatically.
          </p>
          <span className="itr-sources-label">Select your income sources:</span>
        </div>

        <div className="itr-pills-row" role="group" aria-label="Income sources selection">
          {ALL_SOURCES.map((src) => {
            const isSelected = selectedSources.includes(src.id)
            return (
              <button
                key={src.id}
                type="button"
                className={`itr-source-pill ${isSelected ? 'itr-source-pill--active' : ''}`}
                onClick={() => toggleSource(src.id)}
                aria-pressed={isSelected}
              >
                {isSelected ? (
                  <span className="itr-pill-icon-active" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                ) : (
                  <span className="itr-pill-icon-add" aria-hidden="true">+</span>
                )}
                <span>{src.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Income Source Cards */}
      {isSalarySelected && (
        <ItrSalaryIncomeCard
          salaryDetails={salaryDetails}
          onSalaryDetailsChange={onSalaryDetailsChange}
          onToggle={() => toggleSource('salary')}
        />
      )}

      {isHousePropertySelected && (
        <ItrHousePropertyCard
          housePropertyDetails={housePropertyDetails}
          onHousePropertyDetailsChange={onHousePropertyDetailsChange}
          onToggle={() => toggleSource('house_property')}
        />
      )}

      {isBusinessSelected && (
        <ItrBusinessIncomeCard
          businessDetails={businessDetails}
          onBusinessDetailsChange={onBusinessDetailsChange}
          onToggle={() => toggleSource('business')}
        />
      )}

      {isCapitalGainsSelected && (
        <ItrCapitalGainsCard
          capitalGainsDetails={capitalGainsDetails}
          onCapitalGainsDetailsChange={onCapitalGainsDetailsChange}
          onToggle={() => toggleSource('capital_gains')}
        />
      )}

      {isOtherSourcesSelected && (
        <ItrOtherSourcesCard
          otherSourcesDetails={otherSourcesDetails}
          onOtherSourcesDetailsChange={onOtherSourcesDetailsChange}
          onToggle={() => toggleSource('other_sources')}
        />
      )}

      {/* Navigation */}
      <StepActionBar
        onBack={onBack}
        onNext={onNext}
        backLabel="Back"
        nextLabel="Continue"
        nextDisabled={!isStep2Valid}
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

export default ItrStepIncomeSourcesView

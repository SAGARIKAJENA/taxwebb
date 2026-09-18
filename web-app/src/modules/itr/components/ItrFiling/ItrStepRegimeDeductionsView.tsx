import React, { useMemo, useState } from 'react'
import { StepActionBar } from '@shared/components'
import { calculateRegimeTax } from '../FileItr/FileItr'
import type { SalaryDetails } from './ItrStepIncomeSourcesView'
import { ItrStepHeaderStepper } from './ItrStepHeaderStepper'
import { ItrRegimeCompareTable } from './ItrRegimeCompareTable'
import { ItrRegimeCardsSelector } from './ItrRegimeCardsSelector'
import { ItrOldRegimeDeductionsForm, type DeductionsData } from './ItrOldRegimeDeductionsForm'
import './ItrFilingSteps.css'
import './ItrPersonalInfo.css'

export type { DeductionsData }

export interface ItrStepRegimeDeductionsViewProps {
  onBack: () => void
  onNext: () => void
  onSaveDraft?: () => void
  salaryDetails: SalaryDetails
  selectedRegime: 'new' | 'old' | ''
  onRegimeChange: (regime: 'new' | 'old') => void
  deductions: DeductionsData
  onDeductionsChange: (deductions: DeductionsData) => void
}

export const ItrStepRegimeDeductionsView: React.FC<ItrStepRegimeDeductionsViewProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  salaryDetails,
  selectedRegime,
  onRegimeChange,
  deductions,
  onDeductionsChange,
}) => {
  const hasExistingDeductions = Boolean(
    deductions.epf ||
    deductions.ppf ||
    deductions.lic ||
    deductions.elss ||
    deductions.childrenTuition ||
    deductions.housingLoanPrincipal ||
    deductions.selfInsurance ||
    deductions.parentInsurance ||
    deductions.homeLoanInterest24b ||
    deductions.otherDeductions
  )

  const [claimDeductions, setClaimDeductions] = useState<boolean | null>(
    hasExistingDeductions ? true : null
  )

  const parseAmount = (val: string): number => {
    if (!val) return 0
    const clean = val.replace(/[^0-9.]/g, '')
    const parsed = parseFloat(clean)
    return isNaN(parsed) ? 0 : parsed
  }

  const grossIncome = parseAmount(salaryDetails.grossSalary)
  const ded80C =
    parseAmount(deductions.section80C) ||
    parseAmount(deductions.epf) +
      parseAmount(deductions.ppf) +
      parseAmount(deductions.lic) +
      parseAmount(deductions.elss) +
      parseAmount(deductions.childrenTuition) +
      parseAmount(deductions.housingLoanPrincipal)
  const ded80D =
    parseAmount(deductions.section80D) ||
    parseAmount(deductions.selfInsurance) + parseAmount(deductions.parentInsurance)
  const tds = parseAmount(salaryDetails.tdsDeducted)

  const calculation = useMemo(() => {
    return calculateRegimeTax(grossIncome, ded80C, ded80D, tds)
  }, [grossIncome, ded80C, ded80D, tds])

  const handleChange = (field: keyof DeductionsData, val: string | boolean) => {
    onDeductionsChange({ ...deductions, [field]: val })
  }

  const hasDeductionsFilled = Boolean(
    deductions.epf?.trim() ||
    deductions.ppf?.trim() ||
    deductions.lic?.trim() ||
    deductions.elss?.trim() ||
    deductions.childrenTuition?.trim() ||
    deductions.housingLoanPrincipal?.trim() ||
    deductions.selfInsurance?.trim() ||
    deductions.parentInsurance?.trim() ||
    deductions.homeLoanInterest24b?.trim() ||
    deductions.otherDeductions?.trim()
  )

  const isStep3Valid = Boolean(
    selectedRegime === 'new' ||
    (selectedRegime === 'old' &&
      ((claimDeductions === true && hasDeductionsFilled) || claimDeductions === false))
  )

  return (
    <div className="itr-step-view-container">
      <ItrStepHeaderStepper currentStepId={3} />

      <ItrRegimeCompareTable
        calculation={calculation}
        grossIncome={grossIncome}
        ded80C={ded80C}
        ded80D={ded80D}
      />

      <ItrRegimeCardsSelector
        selectedRegime={selectedRegime}
        onRegimeChange={onRegimeChange}
      />

      {selectedRegime === 'old' && (
        <ItrOldRegimeDeductionsForm
          claimDeductions={claimDeductions}
          setClaimDeductions={setClaimDeductions}
          deductions={deductions}
          onChange={handleChange}
        />
      )}

      {selectedRegime === 'new' && (
        <div className="itr-regime-info-box">
          <div className="itr-regime-info-icon" aria-hidden="true">ℹ</div>
          <div className="itr-regime-info-text">
            <strong>Deductions Under New Tax Regime</strong>
            Most Chapter VI-A deductions (Section 80C, 80D, 24b) are not available under the New Tax Regime. Eligible salaried taxpayers receive the applicable standard deduction of ₹75,000 automatically.
          </div>
        </div>
      )}

      <StepActionBar
        onBack={onBack}
        onNext={onNext}
        backLabel="Back"
        nextLabel="Continue"
        nextDisabled={!isStep3Valid}
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

export default ItrStepRegimeDeductionsView

import React, { useMemo, useState } from 'react'
import { StepActionBar } from '@shared/components'
import { calculateRegimeTax } from '../FileItr/FileItr'
import { ItrStepHeaderStepper } from './ItrStepHeaderStepper'
import { ItrOldRegimeDeductionsForm } from './ItrOldRegimeDeductionsForm'
import type { SalaryDetails, DeductionsData } from './itrFiling.constants'
import './ItrStepRegimeDeductionsView.css'

export type { DeductionsData }

export interface ItrRegimeCalculation {
  newRegime: {
    grossTotalIncome: number
    totalDeductions: number
    taxableIncome: number
    taxPayable: number
  }
  oldRegime: {
    grossTotalIncome: number
    totalDeductions: number
    taxableIncome: number
    taxPayable: number
  }
}

/* ==========================================================================
   1. Regime Compare Table
   ========================================================================== */
interface ItrRegimeCompareTableProps {
  calculation: ItrRegimeCalculation
  grossIncome: number
  ded80C: number
  ded80D: number
}

const ItrRegimeCompareTable: React.FC<ItrRegimeCompareTableProps> = ({
  calculation,
  grossIncome,
  ded80C,
  ded80D,
}) => {
  const formatInr = (num: number): string => num.toLocaleString('en-IN')

  return (
    <div className="itr-step-card">
      <div className="itr-compare-header">
        <div className="itr-compare-title-wrap">
          <span className="itr-compare-icon" aria-hidden="true">🔄</span>
          <h2 className="itr-compare-title">Compare Tax Regimes</h2>
        </div>
        <span className="itr-badge-ay">AY 2026-2027</span>
      </div>

      <p className="itr-compare-desc">
        Compare your estimated tax computation between the New and Old Tax Regimes for AY 2026-2027 before finalizing your selection.
      </p>

      <div className="itr-table-container">
        <table className="itr-compare-table" aria-label="Tax Regime Comparison Table">
          <thead>
            <tr>
              <th scope="col">TAX PARAMETER</th>
              <th scope="col" className="itr-table-col-right">NEW REGIME</th>
              <th scope="col" className="itr-table-col-right">OLD REGIME</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gross Total Income</td>
              <td className="itr-table-col-right">₹ {formatInr(calculation.newRegime.grossTotalIncome)}</td>
              <td className="itr-table-col-right">₹ {formatInr(calculation.oldRegime.grossTotalIncome)}</td>
            </tr>
            <tr>
              <td>Standard Deduction</td>
              <td className="itr-table-col-right">
                - ₹ {grossIncome > 0 ? formatInr(calculation.newRegime.totalDeductions) : '0'}
              </td>
              <td className="itr-table-col-right">
                - ₹ {grossIncome > 0 ? '50,000' : '0'}
              </td>
            </tr>
            <tr>
              <td>Chapter VI-A Deductions</td>
              <td className="itr-table-col-right itr-text-not-applicable">Not Applicable</td>
              <td className="itr-table-col-right">- ₹ {formatInr(ded80C + ded80D)}</td>
            </tr>
            <tr>
              <td>Net Taxable Income</td>
              <td className="itr-table-col-right">₹ {formatInr(calculation.newRegime.taxableIncome)}</td>
              <td className="itr-table-col-right">₹ {formatInr(calculation.oldRegime.taxableIncome)}</td>
            </tr>
            <tr>
              <td>Estimated Tax Liability</td>
              <td className="itr-table-col-right">₹ {formatInr(calculation.newRegime.taxPayable)}</td>
              <td className="itr-table-col-right">₹ {formatInr(calculation.oldRegime.taxPayable)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ==========================================================================
   2. Regime Cards Selector
   ========================================================================== */
interface ItrRegimeCardsSelectorProps {
  selectedRegime: 'new' | 'old' | ''
  onRegimeChange: (regime: 'new' | 'old') => void
}

const ItrRegimeCardsSelector: React.FC<ItrRegimeCardsSelectorProps> = ({
  selectedRegime,
  onRegimeChange,
}) => (
  <div className="itr-step-card">
    <div className="itr-sources-header">
      <h2 className="itr-sources-title">Your Regime Selection</h2>
    </div>

    <div className="itr-regime-options" role="radiogroup" aria-label="Tax Regime Selection">
      {/* New Tax Regime */}
      <div
        className={`itr-regime-card ${selectedRegime === 'new' ? 'itr-regime-card--selected' : ''}`}
        onClick={() => onRegimeChange('new')}
        role="radio"
        aria-checked={selectedRegime === 'new'}
        tabIndex={0}
      >
        <div className="itr-regime-card__top">
          <div className="itr-regime-radio-title">
            <div className="itr-radio-outer">
              {selectedRegime === 'new' && <div className="itr-radio-inner" />}
            </div>
            <span className="itr-regime-name">New Tax Regime (Default)</span>
          </div>
          <span className="itr-regime-tag">AY 2026-2027 Slabs</span>
        </div>
        <ul className="itr-regime-bullets">
          <li>Lower tax slab rates across income brackets.</li>
          <li>Standard deduction of ₹75,000 for salaried employees automatically applied.</li>
          <li>Section 87A rebate covers taxable income up to ₹7,00,000 (tax liability is ₹0).</li>
        </ul>
      </div>

      {/* Old Tax Regime */}
      <div
        className={`itr-regime-card ${selectedRegime === 'old' ? 'itr-regime-card--selected' : ''}`}
        onClick={() => onRegimeChange('old')}
        role="radio"
        aria-checked={selectedRegime === 'old'}
        tabIndex={0}
      >
        <div className="itr-regime-card__top">
          <div className="itr-regime-radio-title">
            <div className="itr-radio-outer">
              {selectedRegime === 'old' && <div className="itr-radio-inner" />}
            </div>
            <span className="itr-regime-name">Old Tax Regime</span>
          </div>
          <span className="itr-regime-tag">With Deductions</span>
        </div>
        <ul className="itr-regime-bullets">
          <li>Standard deduction of ₹50,000 for salaried employees.</li>
          <li>Claim 80C deductions (EPF, PPF, LIC, ELSS, Housing loan principal up to ₹1.5L).</li>
          <li>Claim 80D health insurance &amp; 24(b) home loan interest (up to ₹2L).</li>
        </ul>
      </div>
    </div>
  </div>
)

/* ==========================================================================
   3. Main Step 3 View
   ========================================================================== */
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

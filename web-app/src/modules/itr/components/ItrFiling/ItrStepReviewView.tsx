import React, { useState } from 'react'
import { StepActionBar } from '@shared/components'
import { useAuthStore } from '@store/index'
import type { SalaryDetails } from './ItrStepIncomeSourcesView'
import type { HousePropertyDetails, BusinessDetails, CapitalGainsDetails, OtherSourcesDetails } from './ItrStepIncomeSourcesView'
import type { DeductionsData } from './ItrStepRegimeDeductionsView'
import type { UploadedDocInfo } from './ItrStepDocumentsView'
import {
  getStoredTaxpayerProfile,
  type AssessmentYearOption,
  type ResidentialStatusOption,
  type FilingTypeOption,
  type FilingBankAccount,
} from './itrCategories.constants'
import { ItrStepHeaderStepper } from './ItrStepHeaderStepper'
import { ItrReviewLeftColumn } from './ItrReviewLeftColumn'
import { ItrReviewTaxSummaryCard } from './ItrReviewTaxSummaryCard'
import './ItrFilingSteps.css'
import './ItrPersonalInfo.css'

export interface ItrStepReviewViewProps {
  onBack: () => void
  onSubmit: () => void
  onSaveDraft?: () => void
  assessmentYear: AssessmentYearOption
  residentialStatus: ResidentialStatusOption
  filingType: FilingTypeOption
  selectedBank?: FilingBankAccount
  salaryDetails: SalaryDetails
  housePropertyDetails?: HousePropertyDetails
  businessDetails?: BusinessDetails
  capitalGainsDetails?: CapitalGainsDetails
  otherSourcesDetails?: OtherSourcesDetails
  selectedSources?: string[]
  selectedRegime: 'new' | 'old' | ''
  deductions: DeductionsData
  uploadedDocs: Record<string, UploadedDocInfo>
  isSubmitting?: boolean
}

function computeOldRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 250000) return 0
  let tax = 0
  if (taxableIncome > 1000000) { tax += (taxableIncome - 1000000) * 0.3; taxableIncome = 1000000 }
  if (taxableIncome > 500000) { tax += (taxableIncome - 500000) * 0.2; taxableIncome = 500000 }
  if (taxableIncome > 250000) { tax += (taxableIncome - 250000) * 0.05 }
  return Math.round(tax)
}

function computeNewRegimeTax(taxableIncome: number): number {
  if (taxableIncome <= 400000) return 0
  let tax = 0
  const slabs = [
    [400000, 800000, 0.05],
    [800000, 1200000, 0.10],
    [1200000, 1600000, 0.15],
    [1600000, 2000000, 0.20],
    [2000000, 2400000, 0.25],
    [2400000, Infinity, 0.30],
  ]
  for (const [low, high, rate] of slabs) {
    if (taxableIncome > low) {
      tax += (Math.min(taxableIncome, high) - low) * rate
    }
  }
  if (taxableIncome <= 1200000) return 0
  return Math.round(tax)
}

export const ItrStepReviewView: React.FC<ItrStepReviewViewProps> = ({
  onBack,
  onSubmit,
  onSaveDraft,
  assessmentYear,
  residentialStatus,
  filingType,
  selectedBank,
  salaryDetails,
  housePropertyDetails,
  businessDetails,
  capitalGainsDetails,
  otherSourcesDetails,
  selectedSources = [],
  selectedRegime,
  deductions,
  uploadedDocs,
  isSubmitting = false,
}) => {
  const [isDeclared, setIsDeclared] = useState(false)
  const authUser = useAuthStore((state) => state.user)
  const profile = getStoredTaxpayerProfile(authUser)

  // ── Income Computation ───────────────────────────────────────────────────────
  const grossSalary = parseFloat(salaryDetails.grossSalary || '0') || 0
  const hpIncome = housePropertyDetails && selectedSources.includes('house_property')
    ? (parseFloat(housePropertyDetails.annualRentReceived || '0') || 0) -
      (parseFloat(housePropertyDetails.municipalTaxPaid || '0') || 0) -
      (parseFloat(housePropertyDetails.homeLoanInterest || '0') || 0)
    : 0
  const bizIncome = businessDetails && selectedSources.includes('business')
    ? parseFloat(businessDetails.declaredNetProfit || '0') || 0
    : 0
  const stcg = capitalGainsDetails && selectedSources.includes('capital_gains')
    ? parseFloat(capitalGainsDetails.stcg || '0') || 0
    : 0
  const ltcg = capitalGainsDetails && selectedSources.includes('capital_gains')
    ? parseFloat(capitalGainsDetails.ltcg || '0') || 0
    : 0
  const otherIncome = otherSourcesDetails && selectedSources.includes('other_sources')
    ? (parseFloat(otherSourcesDetails.interestIncome || '0') || 0) +
      (parseFloat(otherSourcesDetails.dividendIncome || '0') || 0) +
      (parseFloat(otherSourcesDetails.otherIncome || '0') || 0)
    : 0

  const grossTotalIncome = grossSalary + Math.max(0, hpIncome) + bizIncome + stcg + ltcg + otherIncome

  // ── Deductions Computation ───────────────────────────────────────────────────
  const stdDeduction = selectedRegime === 'new' ? 75000 : 50000
  const section80C = selectedRegime === 'old'
    ? Math.min(
        [deductions.epf, deductions.ppf, deductions.lic, deductions.elss,
         deductions.childrenTuition, deductions.housingLoanPrincipal]
          .reduce((acc, v) => acc + (parseFloat(v || '0') || 0), 0),
        150000
      )
    : 0
  const section80D = selectedRegime === 'old'
    ? Math.min(
        (parseFloat(deductions.selfInsurance || '0') || 0) +
        (parseFloat(deductions.parentInsurance || '0') || 0),
        deductions.parentsSeniorCitizen ? 75000 : 50000
      )
    : 0
  const homeLoan24b = selectedRegime === 'old'
    ? Math.min(parseFloat(deductions.homeLoanInterest24b || '0') || 0, 200000)
    : 0

  const totalChapterVIDeductions = section80C + section80D + homeLoan24b

  // ── Tax Computation ──────────────────────────────────────────────────────────
  const netTaxableIncome = Math.max(0, grossTotalIncome - stdDeduction - totalChapterVIDeductions)
  const grossTax = selectedRegime === 'new'
    ? computeNewRegimeTax(netTaxableIncome)
    : computeOldRegimeTax(netTaxableIncome)
  const cess = Math.round(grossTax * 0.04)
  const totalTaxLiability = grossTax + cess
  const tdsCredits = parseFloat(salaryDetails.tdsDeducted || '0') || 0
  const netTaxPayable = Math.max(0, totalTaxLiability - tdsCredits)
  const refundDue = Math.max(0, tdsCredits - totalTaxLiability)

  const hasCapital = selectedSources.includes('capital_gains')
  const hasBusiness = selectedSources.includes('business')
  const applicableForm = hasBusiness ? 'ITR-3' : hasCapital ? 'ITR-2' : 'ITR-1'

  return (
    <div className="itr-step-view-container">
      <ItrStepHeaderStepper currentStepId={5} />

      {/* Review Alert */}
      <div className="itr-rv2-alert">
        <span className="itr-rv2-alert__icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </span>
        <div className="itr-rv2-alert__content">
          <div className="itr-rv2-alert__title">Review Your ITR Application</div>
          <div className="itr-rv2-alert__desc">Review your declared income, deductions, and tax summary before submitting for CA review.</div>
        </div>
      </div>

      <div className="itr-rv2-desktop-grid">
        <ItrReviewLeftColumn
          profile={profile}
          selectedBank={selectedBank}
          assessmentYear={assessmentYear}
          applicableForm={applicableForm}
          residentialStatus={residentialStatus}
          filingType={filingType}
          uploadedDocs={uploadedDocs}
          onEdit={onBack}
        />

        <ItrReviewTaxSummaryCard
          selectedRegime={selectedRegime}
          grossTotalIncome={grossTotalIncome}
          stdDeduction={stdDeduction}
          totalChapterVIDeductions={totalChapterVIDeductions}
          netTaxableIncome={netTaxableIncome}
          grossTax={grossTax}
          cess={cess}
          totalTaxLiability={totalTaxLiability}
          tdsCredits={tdsCredits}
          netTaxPayable={netTaxPayable}
          refundDue={refundDue}
        />
      </div>

      {/* Declaration Box */}
      <div className="itr-rv2-declaration-wrap">
        <label className="itr-rv2-declaration-label" htmlFor="itr-rv2-declaration">
          <input
            id="itr-rv2-declaration"
            type="checkbox"
            className="itr-declaration-checkbox"
            checked={isDeclared}
            onChange={(e) => setIsDeclared(e.target.checked)}
          />
          <span>
            I confirm that the income details, deductions, bank account, and documents provided are correct
            and complete to the best of my knowledge.
          </span>
        </label>
      </div>

      <StepActionBar
        onBack={onBack}
        onNext={onSubmit}
        backLabel="Back"
        nextLabel={isSubmitting ? 'Submitting…' : 'Submit for CA Review'}
        nextDisabled={!isDeclared || isSubmitting}
        isSubmitting={isSubmitting}
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

export default ItrStepReviewView

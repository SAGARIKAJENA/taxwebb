import React, { useState } from 'react'
import { StepActionBar } from '@shared/components'
import { useAuthStore } from '@store/index'
import {
  getStoredTaxpayerProfile,
  type SalaryDetails,
  type HousePropertyDetails,
  type BusinessDetails,
  type CapitalGainsDetails,
  type OtherSourcesDetails,
  type DeductionsData,
  type UploadedDocInfo,
  type AssessmentYearOption,
  type ResidentialStatusOption,
  type FilingTypeOption,
  type FilingBankAccount,
} from './itrFiling.constants'
import { ItrStepHeaderStepper } from './ItrStepHeaderStepper'
import './ItrStepReviewView.css'

const formatINR = (val: number) =>
  val === 0 ? '₹ 0' : `₹ ${val.toLocaleString('en-IN')}`

/* ==========================================================================
   1. Review Left Column (Summary, Details & Docs)
   ========================================================================== */
interface ItrReviewLeftColumnProps {
  profile: {
    fullName: string
    panNumber: string
  }
  selectedBank?: FilingBankAccount
  assessmentYear: AssessmentYearOption
  applicableForm: string
  residentialStatus: ResidentialStatusOption
  filingType: FilingTypeOption
  uploadedDocs: Record<string, UploadedDocInfo>
  onEdit: () => void
}

const ItrReviewLeftColumn: React.FC<ItrReviewLeftColumnProps> = ({
  profile,
  selectedBank,
  assessmentYear,
  applicableForm,
  residentialStatus,
  filingType,
  uploadedDocs,
  onEdit,
}) => {
  const docCount = Object.keys(uploadedDocs).length

  return (
    <div className="itr-rv2-left-col">
      {/* Summary & Declared Income */}
      <div className="itr-step-card">
        <h3 className="itr-rv2-section-title">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Summary &amp; Declared Income
        </h3>

        {/* Taxpayer Identity Row */}
        <div className="itr-rv2-identity-row">
          <div className="itr-rv2-identity-info">
            <div className="itr-rv2-identity-label">Taxpayer Identity</div>
            <div className="itr-rv2-identity-val">PAN: {profile.panNumber} &middot; Name: {profile.fullName}</div>
          </div>
          <span className="itr-rv2-badge itr-rv2-badge--green">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Profile Verified
          </span>
        </div>

        {/* Refund Bank Row */}
        <div className="itr-rv2-identity-row">
          <div className="itr-rv2-identity-info">
            <div className="itr-rv2-identity-label">Refund Bank Account</div>
            <div className="itr-rv2-identity-val">
              {selectedBank
                ? `${selectedBank.bankName} (·· ${selectedBank.accountNumber.replace(/\s/g, '').slice(-4)})`
                : 'Primary Bank Account'}
            </div>
          </div>
          <span className="itr-rv2-badge itr-rv2-badge--blue">Selected</span>
        </div>
      </div>

      {/* Filing & Taxpayer Details */}
      <div className="itr-step-card">
        <div className="itr-rv2-section-header-row">
          <h3 className="itr-rv2-section-title">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Filing &amp; Taxpayer Details
          </h3>
          <button type="button" className="itr-rv2-edit-btn" onClick={onEdit}>
            Edit
          </button>
        </div>
        <div className="itr-rv2-details-rows">
          {[
            { label: 'Assessment Year', value: assessmentYear },
            { label: 'Applicable Return Form', value: applicableForm },
            { label: 'Full Name', value: profile.fullName },
            { label: 'PAN Number', value: profile.panNumber },
            {
              label: 'Residential Status',
              value: residentialStatus.charAt(0).toUpperCase() + residentialStatus.slice(1),
            },
            {
              label: 'Filing Type',
              value: filingType.charAt(0).toUpperCase() + filingType.slice(1) + ' Return',
            },
          ].map((row) => (
            <div key={row.label} className="itr-rv2-detail-row">
              <span className="itr-rv2-detail-row__label">{row.label}</span>
              <span className="itr-rv2-detail-row__val">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="itr-step-card">
        <div className="itr-rv2-section-header-row">
          <h3 className="itr-rv2-section-title">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Uploaded Documents ({docCount})
          </h3>
          <button type="button" className="itr-rv2-edit-btn" onClick={onEdit}>
            Edit
          </button>
        </div>
        {docCount === 0 ? (
          <p className="itr-rv2-no-docs">No documents uploaded. Your CA will request them separately.</p>
        ) : (
          <div className="itr-rv2-doc-list">
            {Object.entries(uploadedDocs).map(([id, doc]) => (
              <div key={id} className="itr-rv2-doc-row">
                <span className="itr-rv2-doc-check">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className="itr-rv2-doc-info">
                  <span className="itr-rv2-doc-name">{doc.fileName}</span>
                  <span className="itr-rv2-doc-meta">
                    {doc.fileSize} &middot; {doc.uploadedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ==========================================================================
   2. Review Tax Summary Card
   ========================================================================== */
interface ItrReviewTaxSummaryCardProps {
  selectedRegime: 'new' | 'old' | ''
  grossTotalIncome: number
  stdDeduction: number
  totalChapterVIDeductions: number
  netTaxableIncome: number
  grossTax: number
  cess: number
  totalTaxLiability: number
  tdsCredits: number
  netTaxPayable: number
  refundDue: number
}

const ItrReviewTaxSummaryCard: React.FC<ItrReviewTaxSummaryCardProps> = ({
  selectedRegime,
  grossTotalIncome,
  stdDeduction,
  totalChapterVIDeductions,
  netTaxableIncome,
  grossTax,
  cess,
  totalTaxLiability,
  tdsCredits,
  netTaxPayable,
  refundDue,
}) => {
  return (
    <div className="itr-rv2-right-col">
      {/* Estimated Tax Summary */}
      <div className="itr-rv2-tax-card">
        <div className="itr-rv2-tax-card__header">
          <div className="itr-rv2-tax-card__title-row">
            <span className="itr-rv2-tax-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="8" y1="6" x2="16" y2="6" />
                <line x1="8" y1="10" x2="16" y2="10" />
                <line x1="8" y1="14" x2="12" y2="14" />
              </svg>
            </span>
            <h3 className="itr-rv2-tax-card__title">Estimated Tax Summary</h3>
          </div>
          <span className="itr-rv2-regime-badge">
            {selectedRegime === 'new' ? 'New Tax Regime' : 'Old Tax Regime'}
          </span>
        </div>

        <div className="itr-rv2-tax-rows">
          <div className="itr-rv2-tax-row">
            <span className="itr-rv2-tax-row__label">1. Gross Total Income</span>
            <span className="itr-rv2-tax-row__val">{formatINR(grossTotalIncome)}</span>
          </div>
          <div className="itr-rv2-tax-row">
            <span className="itr-rv2-tax-row__label">2. Less: Standard Deduction</span>
            <span className="itr-rv2-tax-row__val itr-rv2-tax-row__val--neg">− {formatINR(stdDeduction)}</span>
          </div>
          {selectedRegime === 'old' && totalChapterVIDeductions > 0 && (
            <div className="itr-rv2-tax-row">
              <span className="itr-rv2-tax-row__label">3. Less: Chapter VI-A Deductions</span>
              <span className="itr-rv2-tax-row__val itr-rv2-tax-row__val--neg">− {formatINR(totalChapterVIDeductions)}</span>
            </div>
          )}
          {selectedRegime === 'new' && (
            <div className="itr-rv2-tax-row">
              <span className="itr-rv2-tax-row__label" style={{ color: '#94a3b8', fontStyle: 'italic' }}>3. Chapter VI-A Deductions</span>
              <span className="itr-rv2-tax-row__val" style={{ color: '#94a3b8' }}>Not Applicable</span>
            </div>
          )}

          {/* Net Taxable Income */}
          <div className="itr-rv2-tax-row itr-rv2-tax-row--bold">
            <span>Net Taxable Income</span>
            <span>{formatINR(netTaxableIncome)}</span>
          </div>

          <div className="itr-rv2-tax-row">
            <span className="itr-rv2-tax-row__label">Gross Income Tax (per Slabs)</span>
            <span className="itr-rv2-tax-row__val">{formatINR(grossTax)}</span>
          </div>
          <div className="itr-rv2-tax-row">
            <span className="itr-rv2-tax-row__label">Health &amp; Education Cess (4%)</span>
            <span className="itr-rv2-tax-row__val">{formatINR(cess)}</span>
          </div>
          <div className="itr-rv2-tax-row">
            <span className="itr-rv2-tax-row__label">Total Tax Liability</span>
            <span className="itr-rv2-tax-row__val">{formatINR(totalTaxLiability)}</span>
          </div>
          <div className="itr-rv2-tax-row">
            <span className="itr-rv2-tax-row__label">Less: Taxes Already Paid (TDS Credits)</span>
            <span className="itr-rv2-tax-row__val itr-rv2-tax-row__val--neg">− {formatINR(tdsCredits)}</span>
          </div>
        </div>

        {/* Net Tax Payable / Refund */}
        <div className={`itr-rv2-net-tax-box ${refundDue > 0 ? 'itr-rv2-net-tax-box--refund' : ''}`}>
          <div className="itr-rv2-net-tax-label">
            {refundDue > 0 ? 'Refund Due' : 'Net Tax Payable'}
            <span className="itr-rv2-net-tax-sub">
              {refundDue > 0 ? 'Expected refund after e-filing' : 'Payable before return filing'}
            </span>
          </div>
          <div className="itr-rv2-net-tax-amount">
            {refundDue > 0 ? `+ ${formatINR(refundDue)}` : formatINR(netTaxPayable)}
          </div>
        </div>

        {/* Info note */}
        <div className="itr-rv2-info-note">
          <span className="itr-rv2-info-note__icon">ℹ️</span>
          <span>
            This is an initial estimation based on your declared figures. Your assigned CA will thoroughly review your documents, verify TDS credits with the Income Tax Department, and prepare the final return for your confirmation before e-filing.
          </span>
        </div>
      </div>

      {/* CA Assigned Trust Box */}
      <div className="itr-rv2-ca-trust-card">
        <div className="itr-rv2-ca-trust-header">
          <div className="itr-rv2-ca-avatar">CA</div>
          <div className="itr-rv2-ca-meta">
            <div className="itr-rv2-ca-name">Senior CA Meera Iyer</div>
            <div className="itr-rv2-ca-title">Dedicated Tax Filing Expert · 12+ Yrs Exp</div>
          </div>
        </div>
        <div className="itr-rv2-ca-badges">
          <span className="itr-rv2-ca-badge">⚡ 4-Hour Review SLA</span>
          <span className="itr-rv2-ca-badge">🛡️ Notice Assistance</span>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   3. Main Step 5 Review View
   ========================================================================== */
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

import React from 'react'
import { TdsCategoryToggles } from './TdsCategoryToggles'

export interface TdsIncomeTaxData {
  taxRegime?: 'new' | 'old' | null
  regime?: string | null
  salaryIncome: string
  grossSalary?: string
  otherIncome: string
  interestIncome: string
  rentalIncome?: boolean | null
  capitalGains?: boolean | null
  businessIncome?: boolean | null
  homeLoanInterest?: boolean | null
  taxDeductions?: boolean | null
  annualRent?: string
  propertyTaxes?: string
  stcg?: string
  ltcg?: string
  turnover?: string
  netProfit?: string
  homeLoanInterestAmount?: string
  deduction80C?: string
  sec80C?: string
  deduction80D?: string
  sec80D?: string
  totalTdsDeducted: string
  tdsDeducted?: string
  tcsAmount: string
  tcsCollected?: string
  advanceTax: string
  selfAssessmentTax: string
}

export interface TdsRefundTaxDetailsSectionProps {
  data: TdsIncomeTaxData
  onChange: (updated: Partial<TdsIncomeTaxData>) => void
}

export const TdsRefundTaxDetailsSection: React.FC<TdsRefundTaxDetailsSectionProps> = ({
  data,
  onChange,
}) => {
  return (
    <>
      {/* Card 3: Income & Tax Information */}
      <div className="tds-card" data-testid="tds-card-income">
        <div className="tds-card-header">
          <div className="tds-card-title-wrap">
            <div className="tds-card-step-circle">3</div>
            <div>
              <h2 className="tds-card-title">Income & Tax Information</h2>
              <span className="tds-card-subtitle">Tax calculation breakdown and additional earnings</span>
            </div>
          </div>
        </div>

        <div className="tds-income-form">
          {/* Tax Regime Selector */}
          <div className="tds-form-group">
            <span className="tds-label">Tax Regime</span>
            <div className="tds-regime-grid">
              <button
                type="button"
                className={`tds-regime-card ${data.taxRegime === 'new' ? 'tds-regime-card--active' : ''}`}
                onClick={() => onChange({ taxRegime: 'new' })}
                data-testid="regime-new-btn"
              >
                <div className="tds-regime-title">New Tax Regime</div>
                <div className="tds-regime-sub">u/s 115BAC • Standard Slab</div>
              </button>

              <button
                type="button"
                className={`tds-regime-card ${data.taxRegime === 'old' ? 'tds-regime-card--active' : ''}`}
                onClick={() => onChange({ taxRegime: 'old' })}
                data-testid="regime-old-btn"
              >
                <div className="tds-regime-title">Old Tax Regime</div>
                <div className="tds-regime-sub">Supports 80C, 80D, Home Loan</div>
              </button>
            </div>
          </div>

          {/* Salaried Gross Income */}
          <div className="tds-form-group">
            <label htmlFor="tds-salary-income" className="tds-label">
              Salaried Gross Income (₹)
            </label>
            <input
              id="tds-salary-income"
              type="text"
              className="tds-input"
              value={data.salaryIncome}
              onChange={(e) => onChange({ salaryIncome: e.target.value })}
              placeholder="Enter salary"
            />
          </div>

          {/* Other & Interest Income in 2 Columns */}
          <div className="tds-form-grid-2">
            <div className="tds-form-group">
              <label htmlFor="tds-other-income" className="tds-label">
                Other Income (₹)
              </label>
              <input
                id="tds-other-income"
                type="text"
                className="tds-input"
                value={data.otherIncome}
                onChange={(e) => onChange({ otherIncome: e.target.value })}
                placeholder="Enter other income"
              />
            </div>
            <div className="tds-form-group">
              <label htmlFor="tds-interest-income" className="tds-label">
                Interest Income (₹)
              </label>
              <input
                id="tds-interest-income"
                type="text"
                className="tds-input"
                value={data.interestIncome}
                onChange={(e) => onChange({ interestIncome: e.target.value })}
                placeholder="Enter interest"
              />
            </div>
          </div>

          {/* 5 Toggle Rows with Expandable Conditional Fields */}
          <TdsCategoryToggles data={data} onChange={onChange} />
        </div>
      </div>

      {/* Card 4: TDS & Taxes Paid */}
      <div className="tds-card" data-testid="tds-card-tds-taxes">
        <div className="tds-card-header">
          <div className="tds-card-title-wrap">
            <div className="tds-card-step-circle">4</div>
            <div>
              <h2 className="tds-card-title">TDS & Taxes Paid</h2>
              <span className="tds-card-subtitle">Verified tax deductions and advance payments</span>
            </div>
          </div>
        </div>

        <div className="tds-bank-form">
          <div className="tds-form-group">
            <label htmlFor="tds-total-deducted" className="tds-label">
              Total TDS Deducted (₹) <span className="tds-required">*</span>
            </label>
            <input
              id="tds-total-deducted"
              type="text"
              className="tds-input"
              value={data.totalTdsDeducted}
              onChange={(e) => onChange({ totalTdsDeducted: e.target.value })}
              placeholder="Enter TDS deducted"
              required
            />
          </div>

          <div className="tds-form-grid-2">
            <div className="tds-form-group">
              <label htmlFor="tds-tcs-amount" className="tds-label">
                TCS Amount (₹)
              </label>
              <input
                id="tds-tcs-amount"
                type="text"
                className="tds-input"
                value={data.tcsAmount}
                onChange={(e) => onChange({ tcsAmount: e.target.value })}
                placeholder="Enter TCS amount"
              />
            </div>
            <div className="tds-form-group">
              <label htmlFor="tds-advance-tax" className="tds-label">
                Advance Tax (₹)
              </label>
              <input
                id="tds-advance-tax"
                type="text"
                className="tds-input"
                value={data.advanceTax}
                onChange={(e) => onChange({ advanceTax: e.target.value })}
                placeholder="Enter advance tax"
              />
            </div>
          </div>

          <div className="tds-form-group">
            <label htmlFor="tds-self-assessment" className="tds-label">
              Self Assessment Tax Paid (₹)
            </label>
            <input
              id="tds-self-assessment"
              type="text"
              className="tds-input"
              value={data.selfAssessmentTax}
              onChange={(e) => onChange({ selfAssessmentTax: e.target.value })}
              placeholder="Enter self assessment tax paid"
            />
          </div>
        </div>
      </div>
    </>
  )
}

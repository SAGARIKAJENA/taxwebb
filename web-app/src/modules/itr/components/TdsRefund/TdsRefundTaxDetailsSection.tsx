import React from 'react'
import './TdsRefundTaxDetailsSection.css'

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

export interface TdsCategoryTogglesProps {
  data: TdsIncomeTaxData
  onChange: (updated: Partial<TdsIncomeTaxData>) => void
}

export const TdsCategoryToggles: React.FC<TdsCategoryTogglesProps> = ({ data, onChange }) => {
  return (
    <div className="tds-toggles-list">
      {/* 1. Rental Income */}
      <div className="tds-toggle-card" data-testid="toggle-row-rentalIncome">
        <div className="tds-toggle-header">
          <div className="tds-toggle-info">
            <span className="tds-toggle-title">Rental Income</span>
            <span className="tds-toggle-subtitle">House property rent</span>
          </div>
          <div className="tds-yes-no-group">
            <button
              type="button"
              className={`tds-yes-no-btn ${data.rentalIncome === true ? 'tds-yes-no-btn--active' : ''}`}
              onClick={() => onChange({ rentalIncome: true })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`tds-yes-no-btn ${data.rentalIncome === false ? 'tds-yes-no-btn--active' : ''}`}
              onClick={() => onChange({ rentalIncome: false })}
            >
              No
            </button>
          </div>
        </div>
        {data.rentalIncome && (
          <div className="tds-toggle-subfields">
            <div className="tds-form-group">
              <label htmlFor="tds-annual-rent" className="tds-label">Annual Rent Received (₹)</label>
              <input
                id="tds-annual-rent"
                type="text"
                className="tds-input"
                value={data.annualRent || ''}
                onChange={(e) => onChange({ annualRent: e.target.value })}
                placeholder="Enter rental income"
              />
            </div>
            <div className="tds-form-group">
              <label htmlFor="tds-property-taxes" className="tds-label">Property Taxes Paid (₹)</label>
              <input
                id="tds-property-taxes"
                type="text"
                className="tds-input"
                value={data.propertyTaxes || ''}
                onChange={(e) => onChange({ propertyTaxes: e.target.value })}
                placeholder="Enter municipal taxes"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Capital Gains */}
      <div className="tds-toggle-card" data-testid="toggle-row-capitalGains">
        <div className="tds-toggle-header">
          <div className="tds-toggle-info">
            <span className="tds-toggle-title">Capital Gains</span>
            <span className="tds-toggle-subtitle">Stocks / MF / Property</span>
          </div>
          <div className="tds-yes-no-group">
            <button
              type="button"
              className={`tds-yes-no-btn ${data.capitalGains === true ? 'tds-yes-no-btn--active' : ''}`}
              onClick={() => onChange({ capitalGains: true })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`tds-yes-no-btn ${data.capitalGains === false ? 'tds-yes-no-btn--active' : ''}`}
              onClick={() => onChange({ capitalGains: false })}
            >
              No
            </button>
          </div>
        </div>
        {data.capitalGains && (
          <div className="tds-toggle-subfields tds-form-grid-2">
            <div className="tds-form-group">
              <label htmlFor="tds-stcg" className="tds-label">Short-Term Gains (₹)</label>
              <input
                id="tds-stcg"
                type="text"
                className="tds-input"
                value={data.stcg || ''}
                onChange={(e) => onChange({ stcg: e.target.value })}
                placeholder="Enter STCG"
              />
            </div>
            <div className="tds-form-group">
              <label htmlFor="tds-ltcg" className="tds-label">Long-Term Gains (₹)</label>
              <input
                id="tds-ltcg"
                type="text"
                className="tds-input"
                value={data.ltcg || ''}
                onChange={(e) => onChange({ ltcg: e.target.value })}
                placeholder="Enter LTCG"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Business / Profession */}
      <div className="tds-toggle-card" data-testid="toggle-row-businessIncome">
        <div className="tds-toggle-header">
          <div className="tds-toggle-info">
            <span className="tds-toggle-title">Business / Profession</span>
            <span className="tds-toggle-subtitle">Freelance or business income</span>
          </div>
          <div className="tds-yes-no-group">
            <button
              type="button"
              className={`tds-yes-no-btn ${data.businessIncome === true ? 'tds-yes-no-btn--active' : ''}`}
              onClick={() => onChange({ businessIncome: true })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`tds-yes-no-btn ${data.businessIncome === false ? 'tds-yes-no-btn--active' : ''}`}
              onClick={() => onChange({ businessIncome: false })}
            >
              No
            </button>
          </div>
        </div>
        {data.businessIncome && (
          <div className="tds-toggle-subfields tds-form-grid-2">
            <div className="tds-form-group">
              <label htmlFor="tds-turnover" className="tds-label">Turnover (₹)</label>
              <input
                id="tds-turnover"
                type="text"
                className="tds-input"
                value={data.turnover || ''}
                onChange={(e) => onChange({ turnover: e.target.value })}
                placeholder="Enter turnover"
              />
            </div>
            <div className="tds-form-group">
              <label htmlFor="tds-net-profit" className="tds-label">Net Profit (₹)</label>
              <input
                id="tds-net-profit"
                type="text"
                className="tds-input"
                value={data.netProfit || ''}
                onChange={(e) => onChange({ netProfit: e.target.value })}
                placeholder="Enter profit"
              />
            </div>
          </div>
        )}
      </div>

      {/* 4. Home Loan Interest */}
      <div className="tds-toggle-card" data-testid="toggle-row-homeLoanInterest">
        <div className="tds-toggle-header">
          <div className="tds-toggle-info">
            <span className="tds-toggle-title">Home Loan Interest</span>
            <span className="tds-toggle-subtitle">Self-occupied house property</span>
          </div>
          <div className="tds-yes-no-group">
            <button
              type="button"
              className={`tds-yes-no-btn ${data.homeLoanInterest === true ? 'tds-yes-no-btn--active' : ''}`}
              onClick={() => onChange({ homeLoanInterest: true })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`tds-yes-no-btn ${data.homeLoanInterest === false ? 'tds-yes-no-btn--active' : ''}`}
              onClick={() => onChange({ homeLoanInterest: false })}
            >
              No
            </button>
          </div>
        </div>
        {data.homeLoanInterest && (
          <div className="tds-toggle-subfields">
            <div className="tds-form-group">
              <label htmlFor="tds-interest-paid" className="tds-label">Interest Paid (Sec 24b) (₹)</label>
              <input
                id="tds-interest-paid"
                type="text"
                className="tds-input"
                value={data.homeLoanInterestAmount || ''}
                onChange={(e) => onChange({ homeLoanInterestAmount: e.target.value })}
                placeholder="Enter interest paid"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Tax Deductions */}
      <div className="tds-toggle-card" data-testid="toggle-row-taxDeductions">
        <div className="tds-toggle-header">
          <div className="tds-toggle-info">
            <span className="tds-toggle-title">Tax Deductions</span>
            <span className="tds-toggle-subtitle">Section 80C, 80D, 80G</span>
          </div>
          <div className="tds-yes-no-group">
            <button
              type="button"
              className={`tds-yes-no-btn ${data.taxDeductions === true ? 'tds-yes-no-btn--active' : ''}`}
              onClick={() => onChange({ taxDeductions: true })}
            >
              Yes
            </button>
            <button
              type="button"
              className={`tds-yes-no-btn ${data.taxDeductions === false ? 'tds-yes-no-btn--active' : ''}`}
              onClick={() => onChange({ taxDeductions: false })}
            >
              No
            </button>
          </div>
        </div>
        {data.taxDeductions && (
          <div className="tds-toggle-subfields tds-form-grid-2">
            <div className="tds-form-group">
              <label htmlFor="tds-deduction-80c" className="tds-label">80C (PPF, ELSS, LIC) (₹)</label>
              <input
                id="tds-deduction-80c"
                type="text"
                className="tds-input"
                value={data.deduction80C || ''}
                onChange={(e) => onChange({ deduction80C: e.target.value })}
                placeholder="Up to ₹1.5L"
              />
            </div>
            <div className="tds-form-group">
              <label htmlFor="tds-deduction-80d" className="tds-label">80D (Health Ins.) (₹)</label>
              <input
                id="tds-deduction-80d"
                type="text"
                className="tds-input"
                value={data.deduction80D || ''}
                onChange={(e) => onChange({ deduction80D: e.target.value })}
                placeholder="Up to ₹75k"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
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
            <label className="tds-label">
              Income Tax Regime <span className="tds-required">*</span>
            </label>
            <div className="tds-regime-grid">
              <button
                type="button"
                className={`tds-regime-card ${data.taxRegime === 'new' ? 'tds-regime-card--active' : ''}`}
                onClick={() => onChange({ taxRegime: 'new', regime: 'New Regime (Sec 115BAC)' })}
                data-testid="regime-new"
              >
                <div className="tds-regime-title">New Tax Regime</div>
                <div className="tds-regime-sub">Default (Lower tax slabs, standard deduction)</div>
              </button>
              <button
                type="button"
                className={`tds-regime-card ${data.taxRegime === 'old' ? 'tds-regime-card--active' : ''}`}
                onClick={() => onChange({ taxRegime: 'old', regime: 'Old Regime' })}
                data-testid="regime-old"
              >
                <div className="tds-regime-title">Old Tax Regime</div>
                <div className="tds-regime-sub">With 80C, 80D, HRA &amp; Home Loan deductions</div>
              </button>
            </div>
          </div>

          {/* Core Income Inputs Grid */}
          <div className="tds-form-grid-2">
            <div className="tds-form-group">
              <label htmlFor="tds-salary-income" className="tds-label">
                Annual Salary Income (₹) <span className="tds-required">*</span>
              </label>
              <input
                id="tds-salary-income"
                type="text"
                className="tds-input"
                value={data.salaryIncome}
                onChange={(e) => onChange({ salaryIncome: e.target.value, grossSalary: e.target.value })}
                placeholder="Gross annual salary"
                required
              />
            </div>

            <div className="tds-form-group">
              <label htmlFor="tds-other-income" className="tds-label">
                Income from Other Sources (₹)
              </label>
              <input
                id="tds-other-income"
                type="text"
                className="tds-input"
                value={data.otherIncome}
                onChange={(e) => onChange({ otherIncome: e.target.value })}
                placeholder="Dividends, commission, etc."
              />
            </div>

            <div className="tds-form-group">
              <label htmlFor="tds-interest-income" className="tds-label">
                Savings &amp; FD Interest Income (₹)
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

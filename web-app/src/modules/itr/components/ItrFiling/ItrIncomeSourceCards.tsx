import React from 'react'
import {
  BUSINESS_METHODS,
  ASSET_TYPE_OPTIONS,
  type SalaryDetails,
  type HousePropertyDetails,
  type BusinessDetails,
  type CapitalGainsDetails,
  type OtherSourcesDetails,
} from './itrFiling.constants'
import './ItrIncomeSourceCards.css'

/* ==========================================================================
   1. Salary Income Card
   ========================================================================== */
export interface ItrSalaryIncomeCardProps {
  salaryDetails: SalaryDetails
  onSalaryDetailsChange: (details: SalaryDetails) => void
  onToggle: () => void
}

export const ItrSalaryIncomeCard: React.FC<ItrSalaryIncomeCardProps> = ({
  salaryDetails,
  onSalaryDetailsChange,
  onToggle,
}) => {
  const handleSalaryChange = (field: keyof SalaryDetails, val: string) => {
    onSalaryDetailsChange({ ...salaryDetails, [field]: val })
  }

  return (
    <div className="itr-salary-card">
      <div className="itr-salary-card__header">
        <div className="itr-salary-card__left">
          <div className="itr-salary-icon-box" aria-hidden="true">💼</div>
          <div className="itr-salary-card__titles">
            <h3 className="itr-salary-card__title">Salary Income</h3>
            <p className="itr-salary-card__sub">Employer Form 16, payslips, TDS credits</p>
          </div>
        </div>
        <div
          className="itr-salary-checkbox-wrap"
          onClick={onToggle}
          title="Toggle Salary Income"
          role="checkbox"
          aria-checked={true}
          tabIndex={0}
        >
          <div className="itr-checkbox-custom">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>

      <div className="itr-form-group">
        <label className="itr-form-label" htmlFor="salary-employer-name">Employer Legal Name</label>
        <input
          id="salary-employer-name"
          type="text"
          className="itr-input-text"
          placeholder="e.g. Acme Technologies Ltd"
          value={salaryDetails.employerName}
          onChange={(e) => handleSalaryChange('employerName', e.target.value)}
        />
      </div>

      <div className="itr-grid-2col">
        <div className="itr-form-group">
          <label className="itr-form-label" htmlFor="salary-gross-amount">Gross Salary (Annual)</label>
          <div className="itr-input-currency-wrap">
            <span className="itr-currency-prefix">₹</span>
            <input
              id="salary-gross-amount"
              type="text"
              className="itr-input-currency"
              placeholder="e.g. 8,50,000"
              value={salaryDetails.grossSalary}
              onChange={(e) => handleSalaryChange('grossSalary', e.target.value)}
            />
          </div>
        </div>
        <div className="itr-form-group">
          <label className="itr-form-label" htmlFor="salary-exempt-amount">Exempt Allowances (HRA, LTA)</label>
          <div className="itr-input-currency-wrap">
            <span className="itr-currency-prefix">₹</span>
            <input
              id="salary-exempt-amount"
              type="text"
              className="itr-input-currency"
              placeholder="e.g. 50,000"
              value={salaryDetails.exemptAllowances}
              onChange={(e) => handleSalaryChange('exemptAllowances', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="itr-form-group">
        <label className="itr-form-label" htmlFor="salary-tds-amount">TDS Deducted by Employer</label>
        <div className="itr-input-currency-wrap">
          <span className="itr-currency-prefix">₹</span>
          <input
            id="salary-tds-amount"
            type="text"
            className="itr-input-currency"
            placeholder="e.g. 45,000"
            value={salaryDetails.tdsDeducted}
            onChange={(e) => handleSalaryChange('tdsDeducted', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   2. House Property Card
   ========================================================================== */
export interface ItrHousePropertyCardProps {
  housePropertyDetails: HousePropertyDetails
  onHousePropertyDetailsChange: (details: HousePropertyDetails) => void
  onToggle: () => void
}

export const ItrHousePropertyCard: React.FC<ItrHousePropertyCardProps> = ({
  housePropertyDetails,
  onHousePropertyDetailsChange,
  onToggle,
}) => {
  const handleHousePropertyChange = (field: keyof HousePropertyDetails, val: string) => {
    onHousePropertyDetailsChange({ ...housePropertyDetails, [field]: val })
  }

  return (
    <div className="itr-salary-card">
      <div className="itr-salary-card__header">
        <div className="itr-salary-card__left">
          <div className="itr-salary-icon-box" aria-hidden="true">🏠</div>
          <div className="itr-salary-card__titles">
            <h3 className="itr-salary-card__title">House Property</h3>
            <p className="itr-salary-card__sub">Self-occupied home loan or rental income</p>
          </div>
        </div>
        <div
          className="itr-salary-checkbox-wrap"
          onClick={onToggle}
          title="Toggle House Property"
          role="checkbox"
          aria-checked={true}
          tabIndex={0}
        >
          <div className="itr-checkbox-custom">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Property Type Toggle */}
      <div className="itr-form-group">
        <label className="itr-form-label">Property Classification</label>
        <div className="itr-toggle-group">
          <button
            type="button"
            className={`itr-toggle-btn ${housePropertyDetails.propertyType === 'self_occupied' ? 'itr-toggle-btn--active' : ''}`}
            onClick={() => handleHousePropertyChange('propertyType', 'self_occupied')}
          >
            Self-Occupied
          </button>
          <button
            type="button"
            className={`itr-toggle-btn ${housePropertyDetails.propertyType === 'let_out' ? 'itr-toggle-btn--active' : ''}`}
            onClick={() => handleHousePropertyChange('propertyType', 'let_out')}
          >
            Let-Out (Rented)
          </button>
        </div>
      </div>

      {/* Home Loan Interest */}
      <div className="itr-form-group">
        <label className="itr-form-label" htmlFor="hp-loan-interest">Home Loan Interest Paid (Sec 24b)</label>
        <div className="itr-input-currency-wrap">
          <span className="itr-currency-prefix">₹</span>
          <input
            id="hp-loan-interest"
            type="text"
            className="itr-input-currency"
            placeholder={housePropertyDetails.propertyType === 'self_occupied' ? 'Max ₹2,00,000 for self-occupied' : 'e.g. 1,50,000'}
            value={housePropertyDetails.homeLoanInterest}
            onChange={(e) => handleHousePropertyChange('homeLoanInterest', e.target.value)}
          />
        </div>
      </div>

      {/* Let-Out specific fields */}
      {housePropertyDetails.propertyType === 'let_out' && (
        <div className="itr-grid-2col">
          <div className="itr-form-group">
            <label className="itr-form-label" htmlFor="hp-rent">Annual Rent Received</label>
            <div className="itr-input-currency-wrap">
              <span className="itr-currency-prefix">₹</span>
              <input
                id="hp-rent"
                type="text"
                className="itr-input-currency"
                placeholder="e.g. 1,20,000"
                value={housePropertyDetails.annualRentReceived}
                onChange={(e) => handleHousePropertyChange('annualRentReceived', e.target.value)}
              />
            </div>
          </div>
          <div className="itr-form-group">
            <label className="itr-form-label" htmlFor="hp-tax">Municipal Tax Paid</label>
            <div className="itr-input-currency-wrap">
              <span className="itr-currency-prefix">₹</span>
              <input
                id="hp-tax"
                type="text"
                className="itr-input-currency"
                placeholder="e.g. 5,000"
                value={housePropertyDetails.municipalTaxPaid}
                onChange={(e) => handleHousePropertyChange('municipalTaxPaid', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ==========================================================================
   3. Business / Profession Card
   ========================================================================== */
export interface ItrBusinessIncomeCardProps {
  businessDetails: BusinessDetails
  onBusinessDetailsChange: (details: BusinessDetails) => void
  onToggle: () => void
}

export const ItrBusinessIncomeCard: React.FC<ItrBusinessIncomeCardProps> = ({
  businessDetails,
  onBusinessDetailsChange,
  onToggle,
}) => {
  const handleBusinessChange = (field: keyof BusinessDetails, val: string) => {
    onBusinessDetailsChange({ ...businessDetails, [field]: val })
  }

  return (
    <div className="itr-salary-card">
      <div className="itr-salary-card__header">
        <div className="itr-salary-card__left">
          <div className="itr-salary-icon-box" aria-hidden="true">🏪</div>
          <div className="itr-salary-card__titles">
            <h3 className="itr-salary-card__title">Business / Profession</h3>
            <p className="itr-salary-card__sub">Presumptive (44AD/ADA) or Regular Books</p>
          </div>
        </div>
        <div
          className="itr-salary-checkbox-wrap"
          onClick={onToggle}
          title="Toggle Business"
          role="checkbox"
          aria-checked={true}
          tabIndex={0}
        >
          <div className="itr-checkbox-custom">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>

      {/* GST Reconciliation Box */}
      <div className="itr-gst-reconcile-box">
        <div className="itr-gst-reconcile-header">
          <div className="itr-gst-reconcile-title-row">
            <span className="itr-gst-icon">🏪</span>
            <span className="itr-gst-reconcile-title">GST ↔ ITR Turnover Reconciliation</span>
            <span className="itr-gst-shield-icon" aria-hidden="true">🛡</span>
          </div>
          <p className="itr-gst-reconcile-desc">
            TaxEdge imported business turnover from your filed GST returns. GST reporting and income tax
            computation can differ due to credit notes or advances.
          </p>
        </div>
        <div className="itr-gst-table">
          <div className="itr-gst-table-header">
            <span>SOURCE / LEDGER</span>
            <span>AMOUNT</span>
          </div>
          {[
            { label: 'GSTR-1 Outward Supplies', sub: 'Invoice-level filed returns (FY 2024-25)', val: '₹ 0' },
            { label: 'GSTR-3B Outward Supplies', sub: 'Monthly summary return filings', val: '₹ 0' },
            { label: 'Books of Account Turnover', sub: 'Audited ledger / sales register', val: '₹ 0' },
            { label: 'Proposed ITR Business Turnover', sub: 'Turnover declared for Income Tax computation', val: '₹ 0' },
          ].map((row) => (
            <div key={row.label} className="itr-gst-table-row">
              <div>
                <div className="itr-gst-row-label">{row.label}</div>
                <div className="itr-gst-row-sub">{row.sub}</div>
              </div>
              <div className="itr-gst-row-val">{row.val}</div>
            </div>
          ))}
        </div>
        <div className="itr-gst-verify-note">
          <span className="itr-gst-verify-icon">✅</span>
          <span>Your Tax Executive will independently cross-verify turnover with GSTR-9 annual return records.</span>
        </div>
      </div>

      {/* Reporting method */}
      <div className="itr-form-group">
        <label className="itr-form-label">How do you report this business?</label>
        <div className="itr-business-method-list">
          {BUSINESS_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              className={`itr-business-method-card ${businessDetails.reportingMethod === method.id ? 'itr-business-method-card--active' : ''}`}
              onClick={() => handleBusinessChange('reportingMethod', method.id)}
            >
              <div className="itr-business-method-radio">
                <div className="itr-radio-outer">
                  {businessDetails.reportingMethod === method.id && <div className="itr-radio-inner" />}
                </div>
              </div>
              <div className="itr-business-method-text">
                <div className="itr-business-method-title">{method.title}</div>
                <div className="itr-business-method-desc">{method.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="itr-grid-2col">
        <div className="itr-form-group">
          <label className="itr-form-label" htmlFor="biz-turnover">Gross Turnover / Receipts</label>
          <div className="itr-input-currency-wrap">
            <span className="itr-currency-prefix">₹</span>
            <input
              id="biz-turnover"
              type="text"
              className="itr-input-currency"
              placeholder="e.g. 25,00,000"
              value={businessDetails.grossTurnover}
              onChange={(e) => handleBusinessChange('grossTurnover', e.target.value)}
            />
          </div>
        </div>
        <div className="itr-form-group">
          <label className="itr-form-label" htmlFor="biz-profit">Declared Net Profit</label>
          <div className="itr-input-currency-wrap">
            <span className="itr-currency-prefix">₹</span>
            <input
              id="biz-profit"
              type="text"
              className="itr-input-currency"
              placeholder="e.g. 2,00,000"
              value={businessDetails.declaredNetProfit}
              onChange={(e) => handleBusinessChange('declaredNetProfit', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   4. Capital Gains Card
   ========================================================================== */
export interface ItrCapitalGainsCardProps {
  capitalGainsDetails: CapitalGainsDetails
  onCapitalGainsDetailsChange: (details: CapitalGainsDetails) => void
  onToggle: () => void
}

export const ItrCapitalGainsCard: React.FC<ItrCapitalGainsCardProps> = ({
  capitalGainsDetails,
  onCapitalGainsDetailsChange,
  onToggle,
}) => {
  const toggleAssetType = (type: string) => {
    const current = capitalGainsDetails.assetTypes
    const updated = current.includes(type) ? current.filter((t) => t !== type) : [...current, type]
    onCapitalGainsDetailsChange({ ...capitalGainsDetails, assetTypes: updated })
  }

  const handleCapitalGainsChange = (field: keyof Omit<CapitalGainsDetails, 'assetTypes'>, val: string) => {
    onCapitalGainsDetailsChange({ ...capitalGainsDetails, [field]: val })
  }

  return (
    <div className="itr-salary-card">
      <div className="itr-salary-card__header">
        <div className="itr-salary-card__left">
          <div className="itr-salary-icon-box" aria-hidden="true">📈</div>
          <div className="itr-salary-card__titles">
            <h3 className="itr-salary-card__title">Capital Gains & Trading</h3>
            <p className="itr-salary-card__sub">Stocks, mutual funds, F&O, crypto, property</p>
          </div>
        </div>
        <div
          className="itr-salary-checkbox-wrap"
          onClick={onToggle}
          title="Toggle Capital Gains"
          role="checkbox"
          aria-checked={true}
          tabIndex={0}
        >
          <div className="itr-checkbox-custom">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>

      <div className="itr-form-group">
        <label className="itr-form-label">Asset Types Traded</label>
        <div className="itr-asset-pills-row">
          {ASSET_TYPE_OPTIONS.map((type) => {
            const isActive = capitalGainsDetails.assetTypes.includes(type)
            return (
              <button
                key={type}
                type="button"
                className={`itr-asset-pill ${isActive ? 'itr-asset-pill--active' : ''}`}
                onClick={() => toggleAssetType(type)}
              >
                {type}
              </button>
            )
          })}
        </div>
      </div>

      <div className="itr-grid-2col">
        <div className="itr-form-group">
          <label className="itr-form-label" htmlFor="cg-stcg">Short-Term Gains (STCG)</label>
          <div className="itr-input-currency-wrap">
            <span className="itr-currency-prefix">₹</span>
            <input
              id="cg-stcg"
              type="text"
              className="itr-input-currency"
              placeholder="e.g. 30,000"
              value={capitalGainsDetails.stcg}
              onChange={(e) => handleCapitalGainsChange('stcg', e.target.value)}
            />
          </div>
        </div>
        <div className="itr-form-group">
          <label className="itr-form-label" htmlFor="cg-ltcg">Long-Term Gains (LTCG)</label>
          <div className="itr-input-currency-wrap">
            <span className="itr-currency-prefix">₹</span>
            <input
              id="cg-ltcg"
              type="text"
              className="itr-input-currency"
              placeholder="e.g. 50,000"
              value={capitalGainsDetails.ltcg}
              onChange={(e) => handleCapitalGainsChange('ltcg', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   5. Other Sources Card
   ========================================================================== */
export interface ItrOtherSourcesCardProps {
  otherSourcesDetails: OtherSourcesDetails
  onOtherSourcesDetailsChange: (details: OtherSourcesDetails) => void
  onToggle: () => void
}

export const ItrOtherSourcesCard: React.FC<ItrOtherSourcesCardProps> = ({
  otherSourcesDetails,
  onOtherSourcesDetailsChange,
  onToggle,
}) => {
  const handleOtherSourcesChange = (field: keyof OtherSourcesDetails, val: string) => {
    onOtherSourcesDetailsChange({ ...otherSourcesDetails, [field]: val })
  }

  return (
    <div className="itr-salary-card">
      <div className="itr-salary-card__header">
        <div className="itr-salary-card__left">
          <div className="itr-salary-icon-box" aria-hidden="true">💰</div>
          <div className="itr-salary-card__titles">
            <h3 className="itr-salary-card__title">Other Sources</h3>
            <p className="itr-salary-card__sub">Interest, dividends, gifts, and more</p>
          </div>
        </div>
        <div
          className="itr-salary-checkbox-wrap"
          onClick={onToggle}
          title="Toggle Other Sources"
          role="checkbox"
          aria-checked={true}
          tabIndex={0}
        >
          <div className="itr-checkbox-custom">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>

      <div className="itr-grid-2col">
        <div className="itr-form-group">
          <label className="itr-form-label" htmlFor="os-interest">Interest Income (FD / Savings)</label>
          <div className="itr-input-currency-wrap">
            <span className="itr-currency-prefix">₹</span>
            <input
              id="os-interest"
              type="text"
              className="itr-input-currency"
              placeholder="e.g. 12,000"
              value={otherSourcesDetails.interestIncome}
              onChange={(e) => handleOtherSourcesChange('interestIncome', e.target.value)}
            />
          </div>
        </div>
        <div className="itr-form-group">
          <label className="itr-form-label" htmlFor="os-dividend">Dividend Income</label>
          <div className="itr-input-currency-wrap">
            <span className="itr-currency-prefix">₹</span>
            <input
              id="os-dividend"
              type="text"
              className="itr-input-currency"
              placeholder="e.g. 5,000"
              value={otherSourcesDetails.dividendIncome}
              onChange={(e) => handleOtherSourcesChange('dividendIncome', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="itr-form-group">
        <label className="itr-form-label" htmlFor="os-other">Any Other Income (Gifts, Lottery, etc.)</label>
        <div className="itr-input-currency-wrap">
          <span className="itr-currency-prefix">₹</span>
          <input
            id="os-other"
            type="text"
            className="itr-input-currency"
            placeholder="e.g. 0"
            value={otherSourcesDetails.otherIncome}
            onChange={(e) => handleOtherSourcesChange('otherIncome', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

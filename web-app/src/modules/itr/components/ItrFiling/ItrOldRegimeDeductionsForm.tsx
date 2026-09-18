import React from 'react'

export interface DeductionsData {
  epf: string
  ppf: string
  lic: string
  elss: string
  childrenTuition: string
  housingLoanPrincipal: string
  selfInsurance: string
  parentInsurance: string
  parentsSeniorCitizen: boolean
  homeLoanInterest24b: string
  section80CTotal: string
  section80D: string
  otherDeductions: string
  section80C: string
  homeLoanInterest: string
}

export interface ItrOldRegimeDeductionsFormProps {
  claimDeductions: boolean | null
  setClaimDeductions: (val: boolean) => void
  deductions: DeductionsData
  onChange: (field: keyof DeductionsData, val: string | boolean) => void
}

export const ItrOldRegimeDeductionsForm: React.FC<ItrOldRegimeDeductionsFormProps> = ({
  claimDeductions,
  setClaimDeductions,
  deductions,
  onChange,
}) => {
  const CurrencyInput = ({
    id,
    placeholder,
    field,
    value,
  }: {
    id: string
    placeholder: string
    field: keyof DeductionsData
    value: string
  }) => (
    <div className="itr-input-currency-wrap">
      <span className="itr-currency-prefix">₹</span>
      <input
        id={id}
        type="text"
        className="itr-input-currency"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
      />
    </div>
  )

  return (
    <>
      <div className="itr-step-card">
        <h3
          className="itr-ded-section-title"
          style={{ margin: 0, color: '#083b75', fontWeight: 800, fontSize: '1rem' }}
        >
          Do you want to claim deductions?
        </h3>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
          Under the Old Tax Regime, you can declare Section 80C, 80D, and 24(b) to reduce your taxable income.
        </p>
        <div className="itr-toggle-group">
          <button
            type="button"
            className={`itr-toggle-btn ${claimDeductions === true ? 'itr-toggle-btn--active' : ''}`}
            onClick={() => setClaimDeductions(true)}
          >
            Yes, Claim Deductions
          </button>
          <button
            type="button"
            className={`itr-toggle-btn ${claimDeductions === false ? 'itr-toggle-btn--active' : ''}`}
            onClick={() => setClaimDeductions(false)}
          >
            No Deductions to Claim
          </button>
        </div>
      </div>

      {claimDeductions === true && (
        <div className="itr-step-card">
          <div className="itr-ded-card-header">
            <div className="itr-ded-card-title-row">
              <span className="itr-ded-shield-icon">🛡</span>
              <h3 className="itr-ded-card-title">Structured Deductions (Old Regime)</h3>
            </div>
            <p className="itr-ded-card-desc">
              Enter eligible investments and insurance expenses to claim tax deductions.
            </p>
          </div>

          {/* Section 80C */}
          <div className="itr-ded-section">
            <div className="itr-ded-section-header">
              <span className="itr-ded-section-label">Section 80C Investments</span>
              <span className="itr-ded-section-cap">Capped at ₹1,50,000</span>
            </div>
            <div className="itr-grid-2col">
              <div className="itr-form-group">
                <label className="itr-form-label" htmlFor="ded-epf">
                  EPF (Employee Provident)
                </label>
                <CurrencyInput
                  id="ded-epf"
                  placeholder="e.g. 45,000"
                  field="epf"
                  value={deductions.epf || ''}
                />
              </div>
              <div className="itr-form-group">
                <label className="itr-form-label" htmlFor="ded-ppf">
                  PPF (Public Provident)
                </label>
                <CurrencyInput
                  id="ded-ppf"
                  placeholder="e.g. 50,000"
                  field="ppf"
                  value={deductions.ppf || ''}
                />
              </div>
              <div className="itr-form-group">
                <label className="itr-form-label" htmlFor="ded-lic">
                  Life Insurance (LIC)
                </label>
                <CurrencyInput
                  id="ded-lic"
                  placeholder="e.g. 25,000"
                  field="lic"
                  value={deductions.lic || ''}
                />
              </div>
              <div className="itr-form-group">
                <label className="itr-form-label" htmlFor="ded-elss">
                  ELSS Tax-Saving Funds
                </label>
                <CurrencyInput
                  id="ded-elss"
                  placeholder="Mutual fund ELSS"
                  field="elss"
                  value={deductions.elss || ''}
                />
              </div>
              <div className="itr-form-group">
                <label className="itr-form-label" htmlFor="ded-tuition">
                  Children Tuition Fees
                </label>
                <CurrencyInput
                  id="ded-tuition"
                  placeholder="School fees"
                  field="childrenTuition"
                  value={deductions.childrenTuition || ''}
                />
              </div>
              <div className="itr-form-group">
                <label className="itr-form-label" htmlFor="ded-hlp">
                  Housing Loan Principal
                </label>
                <CurrencyInput
                  id="ded-hlp"
                  placeholder="Principal repaid"
                  field="housingLoanPrincipal"
                  value={deductions.housingLoanPrincipal || ''}
                />
              </div>
            </div>
          </div>

          {/* Section 80D */}
          <div className="itr-ded-section">
            <div className="itr-ded-section-header">
              <span className="itr-ded-section-label">Section 80D Health Insurance</span>
              <span className="itr-ded-section-cap">Up to ₹25k / ₹50k</span>
            </div>
            <div className="itr-form-group">
              <label className="itr-form-label" htmlFor="ded-self-ins">
                Self, Spouse &amp; Dependent Children
              </label>
              <CurrencyInput
                id="ded-self-ins"
                placeholder="Max 25,000"
                field="selfInsurance"
                value={deductions.selfInsurance || ''}
              />
            </div>
            <div className="itr-form-group">
              <label className="itr-form-label" htmlFor="ded-parent-ins">
                Parents Health Insurance
              </label>
              <CurrencyInput
                id="ded-parent-ins"
                placeholder="Max 25,000 (50k for senior)"
                field="parentInsurance"
                value={deductions.parentInsurance || ''}
              />
            </div>
            <div
              className="itr-ded-toggle-row"
              onClick={() => onChange('parentsSeniorCitizen', !deductions.parentsSeniorCitizen)}
            >
              <span className="itr-ded-toggle-label">Are your parents Senior Citizens (60+)?</span>
              <div
                className={`itr-ded-toggle-switch ${
                  deductions.parentsSeniorCitizen ? 'itr-ded-toggle-switch--on' : ''
                }`}
              >
                <div className="itr-ded-toggle-thumb" />
              </div>
            </div>
          </div>

          {/* Section 24b */}
          <div className="itr-ded-section">
            <div className="itr-ded-section-header">
              <span className="itr-ded-section-label">Section 24(b) Home Loan Interest</span>
              <span className="itr-ded-section-cap">Max ₹2,00,000</span>
            </div>
            <div className="itr-form-group">
              <label className="itr-form-label" htmlFor="ded-hli">
                Home Loan Interest Paid
              </label>
              <CurrencyInput
                id="ded-hli"
                placeholder="Interest paid on self-occupied property"
                field="homeLoanInterest24b"
                value={deductions.homeLoanInterest24b || ''}
              />
            </div>
          </div>

          {/* Add Other Deductions */}
          <button type="button" className="itr-btn-add-other-ded">
            <span>＋</span> Add Other Deduction (80G, 80CCD, 80TTA)
          </button>
        </div>
      )}
    </>
  )
}

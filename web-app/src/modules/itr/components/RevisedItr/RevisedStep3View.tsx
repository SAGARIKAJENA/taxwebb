import React from 'react'

export interface Step3Props {
  salaryIncome: string
  setSalaryIncome: (val: string) => void
  otherIncome: string
  setOtherIncome: (val: string) => void
  deduction80C: string
  setDeduction80C: (val: string) => void
  deduction80D: string
  setDeduction80D: (val: string) => void
  homeLoan: string
  setHomeLoan: (val: string) => void
  bankAccount: string
  setBankAccount: (val: string) => void
  ifscCode: string
  setIfscCode: (val: string) => void
  taxableIncome: string
  setTaxableIncome: (val: string) => void
}

export const RevisedStep3View: React.FC<Step3Props> = ({
  salaryIncome,
  setSalaryIncome,
  otherIncome,
  setOtherIncome,
  deduction80C,
  setDeduction80C,
  deduction80D,
  setDeduction80D,
  homeLoan,
  setHomeLoan,
  bankAccount,
  setBankAccount,
  ifscCode,
  setIfscCode,
  taxableIncome,
  setTaxableIncome,
}) => (
  <>
    <div>
      <h2 className="revised-flow-card-heading">Update only what changed</h2>
      <p className="revised-flow-card-subheading">
        Your original figures are pre-loaded — edit the ones that need correcting.
      </p>
    </div>

    <div className="revised-fields-grid">
      {/* Likely Change Field 1 */}
      <div className="revised-input-group">
        <div className="revised-label-row">
          <label className="revised-input-label">Salary / business income</label>
          <span className="revised-likely-badge">● Likely change</span>
        </div>
        <input
          type="text"
          className="revised-text-input revised-text-input--highlight"
          value={salaryIncome}
          onChange={(e) => setSalaryIncome(e.target.value)}
        />
      </div>

      {/* Likely Change Field 2 */}
      <div className="revised-input-group">
        <div className="revised-label-row">
          <label className="revised-input-label">Other income</label>
          <span className="revised-likely-badge">● Likely change</span>
        </div>
        <input
          type="text"
          className="revised-text-input revised-text-input--highlight"
          value={otherIncome}
          onChange={(e) => setOtherIncome(e.target.value)}
        />
      </div>

      <div className="revised-input-group">
        <label className="revised-input-label">80C deduction</label>
        <input
          type="text"
          className="revised-text-input"
          value={deduction80C}
          onChange={(e) => setDeduction80C(e.target.value)}
        />
      </div>

      <div className="revised-input-group">
        <label className="revised-input-label">80D deduction</label>
        <input
          type="text"
          className="revised-text-input"
          value={deduction80D}
          onChange={(e) => setDeduction80D(e.target.value)}
        />
      </div>

      <div className="revised-input-group">
        <label className="revised-input-label">Home loan interest</label>
        <input
          type="text"
          className="revised-text-input"
          value={homeLoan}
          onChange={(e) => setHomeLoan(e.target.value)}
        />
      </div>

      <div className="revised-input-group">
        <label className="revised-input-label">Bank account for refund</label>
        <input
          type="text"
          className="revised-text-input"
          value={bankAccount}
          onChange={(e) => setBankAccount(e.target.value)}
        />
      </div>

      <div className="revised-input-group">
        <label className="revised-input-label">IFSC</label>
        <input
          type="text"
          className="revised-text-input"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
        />
      </div>

      <div className="revised-input-group">
        <label className="revised-input-label">Taxable income</label>
        <input
          type="text"
          className="revised-text-input"
          value={taxableIncome}
          onChange={(e) => setTaxableIncome(e.target.value)}
        />
      </div>
    </div>

    <div className="revised-notice-box revised-notice-box--blue">
      <div className="revised-notice-title">Nothing re-entered from scratch</div>
      <div className="revised-notice-desc">
        ⓘ Every field is pre-filled from the original return. Highlighted fields are the ones your
        chosen reason — "Missed income" — usually affects.
      </div>
    </div>
  </>
)

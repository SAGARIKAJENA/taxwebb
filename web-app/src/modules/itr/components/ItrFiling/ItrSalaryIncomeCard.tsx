import React from 'react'
import type { SalaryDetails } from './itrIncomeSources.constants'

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

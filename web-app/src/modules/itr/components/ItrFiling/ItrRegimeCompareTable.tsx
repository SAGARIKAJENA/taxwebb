import React from 'react'

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

export interface ItrRegimeCompareTableProps {
  calculation: ItrRegimeCalculation
  grossIncome: number
  ded80C: number
  ded80D: number
}

export const ItrRegimeCompareTable: React.FC<ItrRegimeCompareTableProps> = ({
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

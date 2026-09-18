import React from 'react'
import type { OtherSourcesDetails } from './itrIncomeSources.constants'

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

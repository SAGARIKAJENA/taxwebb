import React from 'react'
import { ASSET_TYPE_OPTIONS, type CapitalGainsDetails } from './itrIncomeSources.constants'

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

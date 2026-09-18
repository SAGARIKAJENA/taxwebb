import React from 'react'

export interface ItrRegimeCardsSelectorProps {
  selectedRegime: 'new' | 'old' | ''
  onRegimeChange: (regime: 'new' | 'old') => void
}

export const ItrRegimeCardsSelector: React.FC<ItrRegimeCardsSelectorProps> = ({
  selectedRegime,
  onRegimeChange,
}) => {
  return (
    <div className="itr-step-card">
      <div className="itr-sources-header">
        <h2 className="itr-sources-title">Your Regime Selection</h2>
      </div>

      <div className="itr-regime-options" role="radiogroup" aria-label="Tax Regime Selection">
        {/* New Tax Regime */}
        <div
          className={`itr-regime-card ${selectedRegime === 'new' ? 'itr-regime-card--selected' : ''}`}
          onClick={() => onRegimeChange('new')}
          role="radio"
          aria-checked={selectedRegime === 'new'}
          tabIndex={0}
        >
          <div className="itr-regime-card__top">
            <div className="itr-regime-radio-title">
              <div className="itr-radio-outer">
                {selectedRegime === 'new' && <div className="itr-radio-inner" />}
              </div>
              <span className="itr-regime-name">New Tax Regime (Default)</span>
            </div>
            <span className="itr-regime-tag">AY 2026-2027 Slabs</span>
          </div>
          <ul className="itr-regime-bullets">
            <li>Lower tax slab rates across income brackets.</li>
            <li>Standard deduction of ₹75,000 for salaried employees automatically applied.</li>
            <li>Section 87A rebate covers taxable income up to ₹7,00,000 (tax liability is ₹0).</li>
          </ul>
        </div>

        {/* Old Tax Regime */}
        <div
          className={`itr-regime-card ${selectedRegime === 'old' ? 'itr-regime-card--selected' : ''}`}
          onClick={() => onRegimeChange('old')}
          role="radio"
          aria-checked={selectedRegime === 'old'}
          tabIndex={0}
        >
          <div className="itr-regime-card__top">
            <div className="itr-regime-radio-title">
              <div className="itr-radio-outer">
                {selectedRegime === 'old' && <div className="itr-radio-inner" />}
              </div>
              <span className="itr-regime-name">Old Tax Regime</span>
            </div>
            <span className="itr-regime-tag">With Deductions</span>
          </div>
          <ul className="itr-regime-bullets">
            <li>Standard deduction of ₹50,000 for salaried employees.</li>
            <li>Claim 80C deductions (EPF, PPF, LIC, ELSS, Housing loan principal up to ₹1.5L).</li>
            <li>Claim 80D health insurance &amp; 24(b) home loan interest (up to ₹2L).</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

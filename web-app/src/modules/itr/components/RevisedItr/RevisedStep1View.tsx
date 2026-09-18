import React from 'react'
import { validateByPlaceholder } from '@shared/utils/inputValidation'

export interface Step1Props {
  ackNumber: string
  setAckNumber: (val: string) => void
  selectedAY: string
  setSelectedAY: (val: string) => void
  onFindReturn: () => void
}

export const RevisedStep1View: React.FC<Step1Props> = ({
  ackNumber,
  setAckNumber,
  selectedAY,
  setSelectedAY,
  onFindReturn,
}) => {
  const ackValidation = validateByPlaceholder(ackNumber, 'e.g. 284419250714208')

  return (
    <>
      <div>
        <h2 className="revised-flow-card-heading">Let’s find your original return</h2>
        <p className="revised-flow-card-subheading">
          The department requires a revision to be linked to the exact original filing.
        </p>
      </div>

      <div className="revised-search-box">
        <div className="revised-form-row-2">
          <div className="revised-input-group">
            <label className="revised-input-label">
              Original ITR Acknowledgement Number <span style={{ color: '#ea580c' }}>*</span>
            </label>
            <input
              type="text"
              className={`revised-text-input ${!ackValidation.isValid && ackNumber ? 'revised-text-input--error' : ''}`}
              value={ackNumber}
              onChange={(e) => setAckNumber(e.target.value)}
              placeholder="e.g. 284419250714208"
            />
            {!ackValidation.isValid && ackNumber && (
              <span className="revised-field-error-text">⚠️ {ackValidation.error}</span>
            )}
          </div>

          <div className="revised-input-group">
            <label className="revised-input-label">
              Assessment Year it was filed for <span style={{ color: '#ea580c' }}>*</span>
            </label>
            <select
              className="revised-text-input"
              value={selectedAY}
              onChange={(e) => setSelectedAY(e.target.value)}
            >
              <option value="AY 2025-26">AY 2025-26</option>
              <option value="AY 2024-25">AY 2024-25</option>
              <option value="AY 2023-24">AY 2023-24</option>
            </select>
          </div>
        </div>

        <div>
          <button type="button" className="revised-find-btn" onClick={onFindReturn}>
            → Find my return
          </button>
        </div>
      </div>

      {/* Result Card: Matched Return */}
      <div className="revised-matched-card">
        <div className="revised-matched-header">
          <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>Original return found</strong>
          <span className="revised-matched-badge">● Matched</span>
        </div>

        <div className="revised-matched-row">
          <span>Filed on</span>
          <strong>14 Jul 2025</strong>
        </div>
        <div className="revised-matched-row">
          <span>Form</span>
          <strong>ITR-3 · {selectedAY}</strong>
        </div>
        <div className="revised-matched-row">
          <span>Gross total income</span>
          <strong>₹8,12,400</strong>
        </div>
        <div className="revised-matched-row">
          <span>Status</span>
          <strong style={{ color: '#1e3a8a' }}>E-verified · processed</strong>
        </div>
      </div>
    </>
  )
}

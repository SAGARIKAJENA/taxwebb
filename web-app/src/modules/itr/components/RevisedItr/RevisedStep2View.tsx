import React from 'react'
import { CORRECTION_REASONS, type CorrectionReasonItem } from './RevisedItr'

export interface Step2Props {
  selectedReason: string
  onSelectReason: (id: string) => void
}

export const RevisedStep2View: React.FC<Step2Props> = ({
  selectedReason,
  onSelectReason,
}) => {
  const activeItem =
    CORRECTION_REASONS.filter((r) => r.id === selectedReason)[0] || CORRECTION_REASONS[0]

  return (
    <>
      <div>
        <h2 className="revised-flow-card-heading">What needs to be corrected?</h2>
        <p className="revised-flow-card-subheading">
          This tells your Tax Executive what changed without a long written explanation.
        </p>
      </div>

      <div className="revised-reasons-grid">
        {CORRECTION_REASONS.map((item: CorrectionReasonItem) => {
          const isSelected = item.id === selectedReason
          return (
            <div
              key={item.id}
              className={`revised-reason-card ${
                isSelected ? 'revised-reason-card--selected' : ''
              }`}
              onClick={() => onSelectReason(item.id)}
            >
              <div className="revised-reason-left">
                <div className="revised-reason-icon">{item.icon}</div>
                <div>
                  <div className="revised-reason-title">{item.title}</div>
                  <div className="revised-reason-desc">{item.description}</div>
                </div>
              </div>
              <div className="revised-reason-radio">
                {isSelected && <div className="revised-reason-radio-dot" />}
              </div>
            </div>
          )
        })}
      </div>

      <div className="revised-notice-box revised-notice-box--blue">
        <div className="revised-notice-title">Currently selected: {activeItem.title}</div>
        <div className="revised-notice-desc">
          The next screen highlights the fields most likely to be affected by this reason.
        </div>
      </div>
    </>
  )
}

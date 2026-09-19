import React from 'react'
import './TdsRefundStepTracker.css'

export interface TdsRefundStepTrackerProps {
  currentStep: number
}

const STEPS = [
  { num: 1, label: 'Customer & Income' },
  { num: 2, label: 'Upload Documents' },
  { num: 3, label: 'CA Verification' },
  { num: 4, label: 'Refund Filing' },
  { num: 5, label: 'Refund Credited' },
]

export const TdsRefundStepTracker: React.FC<TdsRefundStepTrackerProps> = ({ currentStep }) => {
  return (
    <div className="tds-stepper-track" aria-label="Step progress" data-testid="tds-stepper-track">
      {STEPS.map((s, idx) => {
        const isDotCompleted = s.num < currentStep
        const isDotActive = s.num === currentStep
        const dotClass = isDotCompleted
          ? 'tds-stepper-dot tds-stepper-dot--completed'
          : isDotActive
          ? 'tds-stepper-dot tds-stepper-dot--active'
          : 'tds-stepper-dot tds-stepper-dot--inactive'
        const lineClass = isDotCompleted
          ? 'tds-stepper-line tds-stepper-line--completed'
          : 'tds-stepper-line'
        return (
          <React.Fragment key={s.num}>
            <div
              className={dotClass}
              data-testid={`tds-step-${s.num}`}
              title={`Step ${s.num}: ${s.label}`}
            >
              {s.num}
            </div>
            {idx < STEPS.length - 1 && (
              <div className={lineClass} data-testid={`tds-line-${s.num}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

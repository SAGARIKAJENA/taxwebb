import React from 'react'
import './GSTFilingStepper.css'

interface Step {
  id: number
  label: string
}

interface GSTFilingStepperProps {
  currentStep?: number
}

const STEPS: Step[] = [
  { id: 1, label: 'Select Service' },
  { id: 2, label: 'Filing Period' },
  { id: 3, label: 'Documents' },
  { id: 4, label: 'Review & File' },
]

export const GSTFilingStepper: React.FC<GSTFilingStepperProps> = ({ currentStep = 2 }) => {
  return (
    <nav className="gst-filing-stepper" aria-label="Filing Progress">
      {STEPS.map((step, index) => {
        const isCompleted = step.id < currentStep
        const isActive = step.id === currentStep
        const isLast = index === STEPS.length - 1

        let badgeClass = 'gst-filing-stepper__badge--pending'
        let labelClass = 'gst-filing-stepper__label--pending'

        if (isCompleted) {
          badgeClass = 'gst-filing-stepper__badge--completed'
          labelClass = 'gst-filing-stepper__label--completed'
        } else if (isActive) {
          badgeClass = 'gst-filing-stepper__badge--active'
          labelClass = 'gst-filing-stepper__label--active'
        }

        return (
          <React.Fragment key={step.id}>
            <div className="gst-filing-stepper__item" aria-current={isActive ? 'step' : undefined}>
              <div className={`gst-filing-stepper__badge ${badgeClass}`}>
                {isCompleted ? (
                  <svg
                    className="gst-filing-stepper__check-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span className={`gst-filing-stepper__label ${labelClass}`}>{step.label}</span>
            </div>
            {!isLast && <div className="gst-filing-stepper__line" aria-hidden="true" />}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

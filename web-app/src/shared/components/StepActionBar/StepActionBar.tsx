import React from 'react'
import './StepActionBar.css'

export interface StepActionBarProps {
  onBack?: () => void
  onNext?: () => void
  backLabel?: string
  nextLabel?: string
  isSubmitting?: boolean
  nextDisabled?: boolean
  backDisabled?: boolean
  showBack?: boolean
  nextType?: 'button' | 'submit'
  backTestId?: string
  nextTestId?: string
  extraActions?: React.ReactNode
  className?: string
}

export const StepActionBar: React.FC<StepActionBarProps> = ({
  onBack,
  onNext,
  backLabel = 'Back',
  nextLabel = 'Continue',
  isSubmitting = false,
  nextDisabled = false,
  backDisabled = false,
  showBack = true,
  nextType = 'button',
  backTestId = 'step-back-btn',
  nextTestId = 'step-continue-btn',
  extraActions,
  className = '',
}) => {
  return (
    <div className={`step-action-bar ${className}`} data-testid="step-action-bar">
      <div className="step-action-bar__left">
        {showBack && onBack && (
          <button
            type="button"
            className="step-action-bar__btn step-action-bar__btn--back"
            onClick={onBack}
            disabled={backDisabled || isSubmitting}
            data-testid={backTestId}
          >
            <svg
              className="step-action-bar__icon-arrow step-action-bar__icon-arrow--back"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>{backLabel}</span>
          </button>
        )}
      </div>

      <div className="step-action-bar__right">
        {extraActions && <div className="step-action-bar__extra">{extraActions}</div>}

        <button
          type={nextType}
          className="step-action-bar__btn step-action-bar__btn--next"
          onClick={nextType === 'button' ? onNext : undefined}
          disabled={nextDisabled || isSubmitting}
          data-testid={nextTestId}
        >
          {isSubmitting ? (
            <>
              <span className="step-action-bar__spinner" aria-hidden="true" />
              <span>Processing...</span>
            </>
          ) : (
            <span>{nextLabel}</span>
          )}
        </button>
      </div>
    </div>
  )
}

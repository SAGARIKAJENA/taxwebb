import React from 'react'
import { PaymentCheckout } from '@shared/components'
import './TdsRefundPayment.css'

export interface TdsRefundPaymentProps {
  applicantName?: string
  applicationRef?: string
  onBack: () => void
  onNext: () => void
}

const STEPS = [
  { num: 1, label: 'Customer & Income' },
  { num: 2, label: 'Upload Documents' },
  { num: 3, label: 'Review Application' },
  { num: 4, label: 'Pay & Submit' },
  { num: 5, label: 'Refund Credited' },
]

export const TdsRefundPayment: React.FC<TdsRefundPaymentProps> = ({
  applicantName = 'Taxpayer',
  applicationRef = 'TDS-REFUND',
  onBack,
  onNext,
}) => {
  return (
    <div className="tds-payment-page" data-testid="tds-refund-payment-page">
      {/* Stepper Track */}
      <div className="tds-payment-stepper-wrap">
        <div className="tds-stepper-track" aria-label="Step progress" data-testid="tds-stepper-track">
          {STEPS.map((s, idx) => {
            const isCompleted = s.num < 4
            const isActive = s.num === 4
            const dotClass = isCompleted
              ? 'tds-stepper-dot tds-stepper-dot--completed'
              : isActive
              ? 'tds-stepper-dot tds-stepper-dot--active'
              : 'tds-stepper-dot tds-stepper-dot--inactive'
            const lineClass = isCompleted ? 'tds-stepper-line tds-stepper-line--completed' : 'tds-stepper-line'
            return (
              <React.Fragment key={s.num}>
                <div className={dotClass} data-testid={`tds-step-${s.num}`} title={`Step ${s.num}: ${s.label}`}>
                  {s.num}
                </div>
                {idx < STEPS.length - 1 && <div className={lineClass} data-testid={`tds-line-${s.num}`} />}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <PaymentCheckout
        amount={5899}
        serviceTitle="TDS Refund CA E-filing"
        applicationRef={applicationRef}
        applicantName={applicantName}
        onBack={onBack}
        onSuccess={() => onNext()}
      />
    </div>
  )
}

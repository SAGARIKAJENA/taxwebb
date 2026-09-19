import React from 'react'
import type { PaymentMethodType } from './payment.types'

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType
  onSelectMethod: (method: PaymentMethodType) => void
}

const METHODS: { id: PaymentMethodType; title: string; subtitle: string; icon: string }[] = [
  {
    id: 'upi',
    title: 'UPI (Instant & Zero Fee)',
    subtitle: 'Google Pay, PhonePe, Paytm, BHIM or any UPI ID',
    icon: 'upi',
  },
  {
    id: 'card',
    title: 'Debit / Credit Card',
    subtitle: 'Visa, Mastercard, RuPay, Maestro & American Express',
    icon: 'card',
  },
  {
    id: 'netbanking',
    title: 'Net Banking',
    subtitle: 'SBI, HDFC, ICICI, Axis, PNB and 50+ Indian banks',
    icon: 'netbanking',
  },
]

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
}) => {
  return (
    <div className="payment-methods-card" data-testid="payment-methods-card">
      <h3 className="payment-section-title">Select Payment Mode</h3>
      <div className="payment-methods-grid">
        {METHODS.map((m) => {
          const isSelected = selectedMethod === m.id
          return (
            <button
              key={m.id}
              type="button"
              className={`payment-method-card ${isSelected ? 'payment-method-card--active' : ''}`}
              onClick={() => onSelectMethod(m.id)}
              data-testid={`payment-method-${m.id}`}
            >
              <div className="payment-method-radio">
                <span className={`payment-radio-circle ${isSelected ? 'payment-radio-circle--checked' : ''}`} />
              </div>
              <div className="payment-method-info">
                <div className="payment-method-title">{m.title}</div>
                <div className="payment-method-sub">{m.subtitle}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

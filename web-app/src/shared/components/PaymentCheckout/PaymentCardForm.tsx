import React from 'react'
import type { CardDetails } from './payment.types'

interface PaymentCardFormProps {
  cardDetails: CardDetails
  errors: Partial<Record<keyof CardDetails, string>>
  onChange: (updated: Partial<CardDetails>) => void
}

export const PaymentCardForm: React.FC<PaymentCardFormProps> = ({
  cardDetails,
  errors,
  onChange,
}) => {
  const handleCardNumberChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 16)
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ')
    onChange({ cardNumber: formatted })
  }

  const handleExpiryChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 2) {
      onChange({ expiry: `${digits.slice(0, 2)}/${digits.slice(2)}` })
    } else {
      onChange({ expiry: digits })
    }
  }

  const handleCvvChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 4)
    onChange({ cvv: digits })
  }

  return (
    <div className="payment-form-card" data-testid="payment-card-form">
      <div className="payment-form-header">
        <h4 className="payment-form-title">Enter Card Details</h4>
        <div className="payment-card-icons-row">
          <span className="payment-card-chip">VISA</span>
          <span className="payment-card-chip">Mastercard</span>
          <span className="payment-card-chip">RuPay</span>
        </div>
      </div>

      <div className="payment-form-group">
        <label htmlFor="card-number-input" className="payment-input-label">
          Card Number
        </label>
        <input
          id="card-number-input"
          type="text"
          className={`payment-input ${errors.cardNumber ? 'payment-input--error' : ''}`}
          placeholder="XXXX XXXX XXXX XXXX"
          value={cardDetails.cardNumber}
          onChange={(e) => handleCardNumberChange(e.target.value)}
          maxLength={19}
          data-testid="card-number-input"
        />
        {errors.cardNumber && <span className="payment-field-error">{errors.cardNumber}</span>}
      </div>

      <div className="payment-form-grid-2">
        <div className="payment-form-group">
          <label htmlFor="card-expiry-input" className="payment-input-label">
            Valid Thru (MM/YY)
          </label>
          <input
            id="card-expiry-input"
            type="text"
            className={`payment-input ${errors.expiry ? 'payment-input--error' : ''}`}
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={(e) => handleExpiryChange(e.target.value)}
            maxLength={5}
            data-testid="card-expiry-input"
          />
          {errors.expiry && <span className="payment-field-error">{errors.expiry}</span>}
        </div>

        <div className="payment-form-group">
          <label htmlFor="card-cvv-input" className="payment-input-label">
            CVV / CVC
          </label>
          <input
            id="card-cvv-input"
            type="password"
            className={`payment-input ${errors.cvv ? 'payment-input--error' : ''}`}
            placeholder="•••"
            value={cardDetails.cvv}
            onChange={(e) => handleCvvChange(e.target.value)}
            maxLength={4}
            data-testid="card-cvv-input"
          />
          {errors.cvv && <span className="payment-field-error">{errors.cvv}</span>}
        </div>
      </div>

      <div className="payment-form-group">
        <label htmlFor="card-holder-input" className="payment-input-label">
          Cardholder Name
        </label>
        <input
          id="card-holder-input"
          type="text"
          className={`payment-input ${errors.cardHolder ? 'payment-input--error' : ''}`}
          placeholder="Name as printed on card"
          value={cardDetails.cardHolder}
          onChange={(e) => onChange({ cardHolder: e.target.value })}
          data-testid="card-holder-input"
        />
        {errors.cardHolder && <span className="payment-field-error">{errors.cardHolder}</span>}
      </div>
    </div>
  )
}

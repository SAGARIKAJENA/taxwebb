import React from 'react'

interface PaymentUpiFormProps {
  upiId: string
  selectedApp: string
  error?: string | null
  onUpiIdChange: (id: string) => void
  onSelectApp: (app: string) => void
}

const UPI_APPS = [
  { name: 'Google Pay', handle: '@okaxis' },
  { name: 'PhonePe', handle: '@ybl' },
  { name: 'Paytm', handle: '@paytm' },
  { name: 'BHIM', handle: '@upi' },
]

export const PaymentUpiForm: React.FC<PaymentUpiFormProps> = ({
  upiId,
  selectedApp,
  error,
  onUpiIdChange,
  onSelectApp,
}) => {
  return (
    <div className="payment-form-card" data-testid="payment-upi-form">
      <div className="payment-form-header">
        <h4 className="payment-form-title">Pay via UPI</h4>
        <span className="payment-badge-zero-fee">Zero Surcharge</span>
      </div>

      <div className="payment-upi-apps">
        <span className="payment-label-sm">Fast select popular UPI app:</span>
        <div className="payment-upi-apps-row">
          {UPI_APPS.map((app) => {
            const isSelected = selectedApp === app.name
            return (
              <button
                key={app.name}
                type="button"
                className={`payment-upi-app-btn ${isSelected ? 'payment-upi-app-btn--active' : ''}`}
                onClick={() => {
                  onSelectApp(app.name)
                  if (!upiId || upiId.includes('@')) {
                    const prefix = upiId.split('@')[0] || 'user'
                    onUpiIdChange(`${prefix}${app.handle}`)
                  }
                }}
              >
                {app.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="payment-form-group">
        <label htmlFor="upi-id-input" className="payment-input-label">
          Enter Virtual Payment Address (VPA / UPI ID)
        </label>
        <input
          id="upi-id-input"
          type="text"
          className={`payment-input ${error ? 'payment-input--error' : ''}`}
          placeholder="e.g. mobile@upi or username@okhdfcbank"
          value={upiId}
          onChange={(e) => onUpiIdChange(e.target.value.trim().toLowerCase())}
          data-testid="upi-id-input"
        />
        {error && <span className="payment-field-error" role="alert">{error}</span>}
      </div>

      <p className="payment-helper-text">
        A payment request will be securely dispatched to your chosen UPI app. Accept it to complete filing instantly.
      </p>
    </div>
  )
}

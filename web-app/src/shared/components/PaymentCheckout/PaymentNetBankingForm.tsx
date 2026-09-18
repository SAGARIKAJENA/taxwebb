import React from 'react'

interface PaymentNetBankingFormProps {
  selectedBank: string
  error?: string | null
  onSelectBank: (bank: string) => void
}

const POPULAR_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank',
  'Kotak Mahindra Bank',
]

const ALL_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank',
  'Kotak Mahindra Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'IndusInd Bank',
  'Yes Bank',
  'IDFC FIRST Bank',
  'Federal Bank',
  'Central Bank of India',
  'Indian Bank',
]

export const PaymentNetBankingForm: React.FC<PaymentNetBankingFormProps> = ({
  selectedBank,
  error,
  onSelectBank,
}) => {
  return (
    <div className="payment-form-card" data-testid="payment-netbanking-form">
      <div className="payment-form-header">
        <h4 className="payment-form-title">Select Your Bank</h4>
      </div>

      <div className="payment-popular-banks">
        <span className="payment-label-sm">Popular Banks:</span>
        <div className="payment-popular-banks-grid">
          {POPULAR_BANKS.map((b) => {
            const isSelected = selectedBank === b
            return (
              <button
                key={b}
                type="button"
                className={`payment-bank-chip ${isSelected ? 'payment-bank-chip--active' : ''}`}
                onClick={() => onSelectBank(b)}
              >
                {b}
              </button>
            )
          })}
        </div>
      </div>

      <div className="payment-form-group">
        <label htmlFor="all-banks-select" className="payment-input-label">
          Or Choose from All Supported Banks
        </label>
        <select
          id="all-banks-select"
          className={`payment-select ${error ? 'payment-input--error' : ''}`}
          value={selectedBank}
          onChange={(e) => onSelectBank(e.target.value)}
          data-testid="all-banks-select"
        >
          <option value="">-- Select Your Bank --</option>
          {ALL_BANKS.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
        {error && <span className="payment-field-error">{error}</span>}
      </div>

      <p className="payment-helper-text">
        You will be securely routed to your bank's portal to authorize this net banking transaction.
      </p>
    </div>
  )
}

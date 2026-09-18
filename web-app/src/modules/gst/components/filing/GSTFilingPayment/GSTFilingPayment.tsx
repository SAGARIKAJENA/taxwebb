import { useState } from 'react'
import { formatCurrency } from '@shared/utils'
import type { PaymentResult } from '../../registration/GSTStepPayment/GSTStepPayment'
import { GSTFilingStepper } from '../GSTFilingPeriod/GSTFilingStepper'
import { GSTFilingPaymentSidebar } from './GSTFilingPaymentSidebar'
import { GSTCardPaymentFields } from './GSTCardPaymentFields'
import { GSTUpiPaymentFields } from './GSTUpiPaymentFields'
import './GSTFilingPayment.css'

interface GSTFilingPaymentProps {
  amount?: number
  applicationRef?: string
  serviceTitle?: string
  onStepClick?: (step: number) => void
  onBack: () => void
  onSuccess: (details: PaymentResult) => void
}

type PaymentMethodType = 'upi' | 'card' | 'credit' | 'netbank'

export const GSTFilingPayment = ({
  amount = 2950,
  applicationRef = 'GST-2026-00118',
  serviceTitle = 'GST Filing — August 2026',
  onStepClick,
  onBack,
  onSuccess,
}: GSTFilingPaymentProps) => {
  const [method, setMethod] = useState<PaymentMethodType | null>(null)
  const [upiId, setUpiId] = useState('')
  const [mobile, setMobile] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [selectedBank, setSelectedBank] = useState('HDFC Bank')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const effectiveAmount = amount && amount > 0 ? amount : 2950
  const baseFee = Math.round(effectiveAmount / 1.18)
  const gstAmount = effectiveAmount - baseFee
  const totalPayable = effectiveAmount

  const clearErr = (k: string) =>
    setErrors((p) => {
      if (!p[k]) return p
      const { [k]: _, ...rest } = p
      return rest
    })

  const selectMethod = (m: PaymentMethodType) => {
    setMethod((prev) => (prev === m ? null : m))
    clearErr('method')
  }

  const handleMobileChange = (raw: string) => { setMobile(raw.replace(/\D/g, '').slice(0, 10)); clearErr('mobile') }
  const handleCardNumberChange = (raw: string) => { const c = raw.replace(/\D/g, '').slice(0, 16); setCardNumber(c.replace(/(\d{4})(?=\d)/g, '$1 ')); clearErr('cardNumber') }
  const handleExpiryChange = (raw: string) => { const c = raw.replace(/\D/g, '').slice(0, 4); setExpiry(c.length > 2 ? `${c.slice(0, 2)} / ${c.slice(2)}` : c); clearErr('expiry') }
  const handleCvvChange = (raw: string) => { setCvv(raw.replace(/\D/g, '').slice(0, 3)); clearErr('cvv') }
  const handleCardHolderChange = (raw: string) => { setCardHolder(raw.replace(/[^a-zA-Z\s]/g, '')); clearErr('cardHolder') }

  const validateForm = () => {
    const errs: Record<string, string> = {}

    if (!method) {
      errs.method = 'Please select a payment method before proceeding'
      setErrors(errs)
      return false
    }

    if (method === 'upi') {
      const cleanUpi = upiId.trim()
      const cleanMobile = mobile.trim()
      if (!cleanUpi && !cleanMobile) {
        errs.upiId = 'Enter a valid UPI ID (e.g. name@upi) or select a UPI app'
      } else {
        if (cleanUpi && (!cleanUpi.includes('@') || cleanUpi.length < 5)) {
          errs.upiId = 'Enter a valid UPI ID (e.g. name@bank)'
        }
        if (cleanMobile && (cleanMobile.length !== 10 || !/^[6-9]\d{9}$/.test(cleanMobile))) {
          errs.mobile = 'Enter a valid 10-digit Indian mobile number'
        }
      }
    } else if (method === 'card' || method === 'credit') {
      const rawCard = cardNumber.replace(/\s/g, '')
      if (!rawCard) {
        errs.cardNumber = 'Card number is required'
      } else if (rawCard.length !== 16) {
        errs.cardNumber = `Card number must be 16 digits (currently ${rawCard.length}/16)`
      }

      const rawExpiry = expiry.replace(/\s/g, '')
      if (!rawExpiry) {
        errs.expiry = 'Expiry date is required (MM / YY)'
      } else {
        const parts = rawExpiry.split('/')
        const monthNum = parseInt(parts[0], 10)
        if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
          errs.expiry = 'Invalid expiry month (01–12)'
        } else if (parts.length < 2 || parts[1].length < 2) {
          errs.expiry = 'Enter valid 2-digit year (e.g. 28)'
        }
      }

      if (!cvv.trim()) {
        errs.cvv = 'CVV is required'
      } else if (cvv.trim().length !== 3) {
        errs.cvv = 'CVV must be 3 digits'
      }

      if (!cardHolder.trim()) {
        errs.cardHolder = 'Cardholder name is required'
      }
    } else if (method === 'netbank') {
      if (!selectedBank) {
        errs.selectedBank = 'Please select a bank to proceed'
      }
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePay = () => {
    if (!validateForm()) return

    const activeMethod = method!
    const finalUpiId = upiId.trim() || 'payment@upi'

    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      const txnSuffix = Math.floor(10000000 + Math.random() * 90000000)
      const rcptNum = Math.floor(1000 + Math.random() * 9000)
      onSuccess({
        transactionId: `TXN${txnSuffix}`,
        receiptNumber: `TE/26-27/R-0${rcptNum}`,
        method: activeMethod === 'upi' ? `UPI · ${finalUpiId}` : activeMethod === 'netbank' ? `NetBanking · ${selectedBank}` : 'Card Payment',
        dateText: '2 Sep 2026, 10:42 AM',
        applicationRef,
        amount: totalPayable,
      })
    }, 1000)
  }

  return (
    <div className="gst-pay-wrapper">
      {/* Top Bar: Stepper on left, Secure Badge on right */}
      <div className="gst-pay-top-bar">
        <div className="gst-pay-stepper-wrap">
          <GSTFilingStepper currentStep={4} onStepClick={onStepClick} />
        </div>
        <div className="gst-pay-top-secure-badge">
          <div className="gst-pay-top-secure-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0b5ed7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div className="gst-pay-top-secure-text">
            <span className="gst-pay-top-secure-title">Secure &amp; Encrypted</span>
            <span className="gst-pay-top-secure-desc">Your payment information is safe with us.</span>
          </div>
        </div>
      </div>

      <header className="gst-pay-header">
        <h1 className="gst-pay-header__title">Complete your payment</h1>
        <p className="gst-pay-header__subtitle">{serviceTitle} · Application {applicationRef}</p>
      </header>

      <div className="gst-pay-layout">
        <main className="gst-pay-main">
          <section className="gst-pay-card">
            <div className="gst-pay-card__hd">
              <div>
                <h2 className="gst-pay-card__title">Payment method</h2>
                <p className="gst-pay-card__subdesc">Choose a payment method to complete your GST filing.</p>
              </div>
            </div>

            <div className="gst-pay-methods-list">
              <div className={`gst-pay-method-item ${method === 'upi' ? 'gst-pay-method-item--active gst-pay-method-item--expanded' : ''}`}>
                <div className="gst-pay-method-item__header" onClick={() => selectMethod('upi')}>
                  <div className="gst-pay-method-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></div>
                  <div className="gst-pay-method-item__text"><span className="gst-pay-method-item__title">UPI</span><span className="gst-pay-method-item__desc">Google Pay, PhonePe, Paytm or any UPI app</span></div>
                  <span className="gst-pay-method-item__radio" />
                </div>
                {method === 'upi' && (
                  <GSTUpiPaymentFields
                    upiId={upiId} mobile={mobile} upiError={errors.upiId} mobileError={errors.mobile}
                    onUpiIdChange={(val) => { setUpiId(val); clearErr('upiId') }}
                    onMobileChange={handleMobileChange}
                    onSelectApp={(appLower) => {
                      setUpiId((prev) => {
                        const handle = prev.includes('@') ? prev.split('@')[0] : prev
                        return handle ? `${handle}@ok${appLower}` : `@ok${appLower}`
                      })
                      clearErr('upiId')
                    }}
                  />
                )}
              </div>

              <div className={`gst-pay-method-item ${method === 'card' ? 'gst-pay-method-item--active gst-pay-method-item--expanded' : ''}`}>
                <div className="gst-pay-method-item__header" onClick={() => selectMethod('card')}>
                  <div className="gst-pay-method-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg></div>
                  <div className="gst-pay-method-item__text"><span className="gst-pay-method-item__title">Debit card</span><span className="gst-pay-method-item__desc">Visa, Mastercard, RuPay</span></div>
                  <span className="gst-pay-method-item__radio" />
                </div>
                {method === 'card' && (
                  <GSTCardPaymentFields
                    cardNumber={cardNumber} expiry={expiry} cvv={cvv} cardHolder={cardHolder} errors={errors}
                    onCardNumberChange={handleCardNumberChange} onExpiryChange={handleExpiryChange}
                    onCvvChange={handleCvvChange} onCardHolderChange={handleCardHolderChange}
                  />
                )}
              </div>

              <div className={`gst-pay-method-item ${method === 'credit' ? 'gst-pay-method-item--active gst-pay-method-item--expanded' : ''}`}>
                <div className="gst-pay-method-item__header" onClick={() => selectMethod('credit')}>
                  <div className="gst-pay-method-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg></div>
                  <div className="gst-pay-method-item__text"><span className="gst-pay-method-item__title">Credit card</span><span className="gst-pay-method-item__desc">Visa, Mastercard, American Express</span></div>
                  <span className="gst-pay-method-item__radio" />
                </div>
                {method === 'credit' && (
                  <GSTCardPaymentFields
                    cardNumber={cardNumber} expiry={expiry} cvv={cvv} cardHolder={cardHolder} errors={errors}
                    onCardNumberChange={handleCardNumberChange} onExpiryChange={handleExpiryChange}
                    onCvvChange={handleCvvChange} onCardHolderChange={handleCardHolderChange}
                  />
                )}
              </div>

              <div className={`gst-pay-method-item ${method === 'netbank' ? 'gst-pay-method-item--active gst-pay-method-item--expanded' : ''}`}>
                <div className="gst-pay-method-item__header" onClick={() => selectMethod('netbank')}>
                  <div className="gst-pay-method-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="21" x2="21" y2="21" /><line x1="6" y1="18" x2="6" y2="11" /><line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" /><line x1="18" y1="18" x2="18" y2="11" /><polygon points="12 2 20 7 4 7" /></svg></div>
                  <div className="gst-pay-method-item__text"><span className="gst-pay-method-item__title">Net banking</span><span className="gst-pay-method-item__desc">All major Indian banks</span></div>
                  <span className="gst-pay-method-item__radio" />
                </div>
                {method === 'netbank' && (
                  <div className="gst-pay-details-block" onClick={(e) => e.stopPropagation()}>
                    <div className="gst-pay-field">
                      <label className="gst-pay-field-label">Select your bank</label>
                      <select className="gst-pay-inp" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>State Bank of India</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                        <option>Bank of Baroda</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              {errors.method && <p className="gst-pay-field-err" style={{ marginTop: '0.5rem' }}>⚠️ {errors.method}</p>}
            </div>
          </section>

          <div className="gst-pay-actions-box">
            <button type="button" className="gst-pay-btn-cancel" onClick={onBack}>← Back</button>
            <div className="gst-pay-submit-wrap">
              <button type="button" className="gst-pay-btn-submit" disabled={isProcessing} onClick={handlePay}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="gst-pay-lock-ic"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                {isProcessing ? 'Processing…' : `Pay ${formatCurrency(totalPayable)} securely →`}
              </button>
              <p className="gst-pay-terms-note">By proceeding, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</p>
            </div>
          </div>
        </main>

        <GSTFilingPaymentSidebar serviceTitle={serviceTitle} baseFee={baseFee} gstAmount={gstAmount} totalPayable={totalPayable} />
      </div>
    </div>
  )
}

export default GSTFilingPayment

import type { FC } from 'react'
import { PaymentCheckout } from '@shared/components'
import type { GSTStepPaymentProps } from './gstPayment.types'
import './GSTStepPayment.css'

export type { GSTStepPaymentProps, PaymentResult } from './gstPayment.types'

export const GSTStepPayment: FC<GSTStepPaymentProps> = ({
  amount = 1499,
  applicationRef = '',
  serviceTitle = 'GST Registration Filing',
  applicantName = 'Applicant',
  onBack,
  onSuccess,

}: GSTStepPaymentProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('upi')
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>('gpay')
  const [upiId, setUpiId] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const finalPayable = amount

  const paymentMethods = [
    {
      id: 'upi' as PaymentMethodType,
      title: 'UPI',
      description: 'Google Pay, PhonePe, Paytm or any UPI app',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
    },
    {
      id: 'debit' as PaymentMethodType,
      title: 'Debit card',
      description: 'Visa, Mastercard, RuPay',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
    {
      id: 'credit' as PaymentMethodType,
      title: 'Credit card',
      description: 'Visa, Mastercard, Amex · EMI available',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
    {
      id: 'netbanking' as PaymentMethodType,
      title: 'Net banking',
      description: 'All major Indian banks',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4" />
        </svg>
      ),
    },
  ]

  const upiApps = [
    { id: 'gpay', name: 'GPay', color: '#4285F4', letter: 'G' },
    { id: 'phonepe', name: 'PhonePe', color: '#6739B7', letter: 'P' },
    { id: 'paytm', name: 'Paytm', color: '#00BAF2', letter: 'T' },
    { id: 'bhim', name: 'BHIM', color: '#008744', letter: 'B' },
  ]



  const handlePay = (e: FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate immediate, reliable payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onSuccess({
        transactionId: `TXN26090211${Math.floor(100000 + Math.random() * 900000)}`,
        receiptNumber: 'TE/26-27/R-0912',
        method: `UPI · ${upiId}`,
        dateText: '2 Sep 2026, 10:42 AM',
        applicationRef,
        amount: finalPayable,
      })
    }, 600)
  }


}) => {

  return (
    <div className="gst-step-payment-page" data-testid="gst-step-payment">
      <PaymentCheckout
        amount={amount}
        serviceTitle={serviceTitle}
        applicationRef={applicationRef}
        applicantName={applicantName}
        onBack={onBack}
        enablePromoCode={true}
        onSuccess={(res) => {
          onSuccess({
            transactionId: res.paymentId,
            receiptNumber: res.receiptNumber || `REC-${Date.now().toString().slice(-6)}`,
            method: res.method.toUpperCase(),
            dateText: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            applicationRef: res.applicationRef,
            amount: res.amount,
          })
        }}
      />
    </div>
  )
}

export default GSTStepPayment

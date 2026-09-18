import type { FC } from 'react'
import { PaymentCheckout } from '@shared/components'
import { GSTFilingStepper } from '../GSTFilingPeriod/GSTFilingStepper'
import type { PaymentResult } from '../../registration/GSTStepPayment/GSTStepPayment'
import './GSTFilingPayment.css'

interface GSTFilingPaymentProps {
  amount?: number
  applicationRef?: string
  serviceTitle?: string
  onBack: () => void
  onSuccess: (details: PaymentResult) => void
}

export const GSTFilingPayment: FC<GSTFilingPaymentProps> = ({
  amount = 2950,
  applicationRef = 'GST-2026-00118',
  serviceTitle = 'GST Filing — August 2026',
  onBack,
  onSuccess,
}) => {
  return (
    <div className="gst-filing-payment-page" data-testid="gst-filing-payment-page">
      <div className="gst-filing-payment-stepper-wrap" style={{ maxWidth: 840, margin: '0 auto 1.5rem auto' }}>
        <GSTFilingStepper currentStep={4} />
      </div>
      <PaymentCheckout
        amount={amount}
        serviceTitle={serviceTitle}
        applicationRef={applicationRef}
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

export default GSTFilingPayment

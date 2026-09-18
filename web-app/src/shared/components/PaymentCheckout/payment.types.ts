export type PaymentMethodType = 'upi' | 'card' | 'netbanking'

export interface CardDetails {
  cardNumber: string
  expiry: string
  cvv: string
  cardHolder: string
}

export interface PaymentResult {
  paymentId: string
  method: PaymentMethodType
  amount: number
  applicationRef: string
  timestamp: string
  status: 'SUCCESS' | 'FAILED'
  receiptNumber?: string
}

export interface PaymentBreakdown {
  baseAmount: number
  gstAmount: number
  discountAmount: number
  totalAmount: number
}

export interface PaymentCheckoutProps {
  amount: number
  serviceTitle?: string
  applicationRef?: string
  applicantName?: string
  onBack?: () => void
  onSuccess: (result: PaymentResult) => void
  showTrustBadges?: boolean
  enablePromoCode?: boolean
  defaultMethod?: PaymentMethodType
  className?: string
}

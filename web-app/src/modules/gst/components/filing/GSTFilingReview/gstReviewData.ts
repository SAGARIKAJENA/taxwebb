import type { FilingPeriodData } from '../GSTFilingPeriod/GSTFilingPeriod'

export interface TaxComputationItem {
  particulars: string
  amount: number
}

export interface DocumentSummaryItem {
  id: string
  label: string
  completed: number
  total: number
  type: 'required' | 'if_applicable' | 'recommended' | 'optional'
}

export interface ReviewDetailsData {
  gstin: string
  businessName: string
  financialYear: string
  filingPeriod: string
  scheme: string
  frequency: string
  filingType: string
  returnForm: string
  attachedDocsCount: number
}

export const DEFAULT_REVIEW_DETAILS: ReviewDetailsData = {
  gstin: '29AAAAA0000A1Z4',
  businessName: 'Shree Deshmukh Traders',
  financialYear: 'FY 2024–25',
  filingPeriod: 'December 2025',
  scheme: 'Regular Scheme',
  frequency: 'Monthly',
  filingType: 'Regular Return',
  returnForm: 'gstr1_3b_monthly',
  attachedDocsCount: 12,
}

export const DEFAULT_TAX_COMPUTATION: TaxComputationItem[] = [
  { particulars: 'Gross Taxable Turnover', amount: 425000 },
  { particulars: 'Output GST (18%)', amount: 76500 },
  { particulars: 'Eligible ITC (GSTR-2B)', amount: 60750 },
]

export const NET_TAX_LIABILITY = 15750

export const DEFAULT_FILING_FEES: TaxComputationItem[] = [
  { particulars: 'CA Consultancy & Reconciliation', amount: 2500 },
  { particulars: 'Platform GST (18%)', amount: 450 },
]

export const TOTAL_PAYABLE_FEE = 2950

export const DEFAULT_DOC_SUMMARY: DocumentSummaryItem[] = [
  { id: '1', label: 'Required Documents', completed: 8, total: 8, type: 'required' },
  { id: '2', label: 'If Applicable Documents', completed: 3, total: 3, type: 'if_applicable' },
  { id: '3', label: 'Recommended Documents', completed: 1, total: 1, type: 'recommended' },
  { id: '4', label: 'Optional Documents', completed: 0, total: 0, type: 'optional' },
]

export const WHAT_HAPPENS_NEXT_STEPS = [
  { step: 1, text: 'Review your details and tax computation' },
  { step: 2, text: 'Approve and proceed to payment' },
  { step: 3, text: 'We will file your GST return with the government' },
  { step: 4, text: 'You will receive a confirmation and ARN' },
]

export const getResolvedReviewDetails = (filingData?: Partial<FilingPeriodData>): ReviewDetailsData => {
  return {
    gstin: filingData?.gstin?.trim() || DEFAULT_REVIEW_DETAILS.gstin,
    businessName: filingData?.businessName?.trim() || DEFAULT_REVIEW_DETAILS.businessName,
    financialYear: filingData?.financialYear?.trim() || DEFAULT_REVIEW_DETAILS.financialYear,
    filingPeriod: filingData?.selectedMonth?.trim() || DEFAULT_REVIEW_DETAILS.filingPeriod,
    scheme: DEFAULT_REVIEW_DETAILS.scheme,
    frequency: filingData?.frequency?.trim() || DEFAULT_REVIEW_DETAILS.frequency,
    filingType: filingData?.filingType === 'nil' ? 'Nil Return' : DEFAULT_REVIEW_DETAILS.filingType,
    returnForm: filingData?.returnType?.trim() || DEFAULT_REVIEW_DETAILS.returnForm,
    attachedDocsCount: DEFAULT_REVIEW_DETAILS.attachedDocsCount,
  }
}

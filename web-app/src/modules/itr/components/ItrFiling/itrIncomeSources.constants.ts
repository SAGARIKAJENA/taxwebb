export interface SalaryDetails {
  employerName: string
  grossSalary: string
  exemptAllowances: string
  tdsDeducted: string
}

export interface HousePropertyDetails {
  propertyType: 'self_occupied' | 'let_out'
  homeLoanInterest: string
  annualRentReceived: string
  municipalTaxPaid: string
}

export interface BusinessDetails {
  reportingMethod: '44AD' | '44ADA' | 'regular' | 'not_sure'
  grossTurnover: string
  declaredNetProfit: string
}

export interface CapitalGainsDetails {
  assetTypes: string[]
  stcg: string
  ltcg: string
}

export interface OtherSourcesDetails {
  interestIncome: string
  dividendIncome: string
  otherIncome: string
}

export const ALL_SOURCES = [
  { id: 'salary', label: 'Salary / Pension' },
  { id: 'house_property', label: 'House Property' },
  { id: 'business', label: 'Business / Profession' },
  { id: 'capital_gains', label: 'Capital Gains' },
  { id: 'other_sources', label: 'Other Sources' },
]

export const ITR_STEPS = [
  { id: 1, label: 'Personal & Filing' },
  { id: 2, label: 'Income Sources' },
  { id: 3, label: 'Regime & Deductions' },
  { id: 4, label: 'Document Checklist' },
  { id: 5, label: 'Review & File' },
]

export const ASSET_TYPE_OPTIONS = [
  'Equity & Mutual Funds',
  'F&O & Intraday Trading',
  'Crypto / VDA',
  'Real Estate / Land',
]

export const BUSINESS_METHODS = [
  {
    id: '44AD' as const,
    title: 'Presumptive Business (Section 44AD)',
    desc: 'Small traders & retailers (ITR-4 Sugam)',
  },
  {
    id: '44ADA' as const,
    title: 'Presumptive Profession (Section 44ADA)',
    desc: 'Doctors, IT consultants, lawyers (ITR-4 Sugam)',
  },
  {
    id: 'regular' as const,
    title: 'Regular Books of Accounts (ITR-3)',
    desc: 'Maintaining P&L, Balance Sheet, or Audit',
  },
  {
    id: 'not_sure' as const,
    title: "I'm Not Sure",
    desc: 'TaxEdge CA will review and select the best option',
  },
]

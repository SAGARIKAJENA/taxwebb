import React from 'react'
import { authStorage } from '@core/auth/authStorage'
import type { AuthUser } from '@core/auth/authTypes'

/* ==========================================================================
   1. Category Types & Constants
   ========================================================================== */
export type ItrCategoryId =
  | 'salaried'
  | 'business'
  | 'professional'
  | 'freelancer'
  | 'trader'
  | 'rental'
  | 'capital_gains'
  | 'multiple'

export interface ItrCategoryItem {
  id: ItrCategoryId
  title: string
  subtitle: string
  formTag: string
  iconName: string
}

export const ITR_CATEGORIES: ItrCategoryItem[] = [
  { id: 'salaried', title: 'Salaried', subtitle: 'Salary income with Form 16', formTag: 'ITR-1', iconName: 'user' },
  { id: 'business', title: 'Business Income', subtitle: 'Trading, manufacturing & sales', formTag: 'ITR-3/4', iconName: 'store' },
  { id: 'professional', title: 'Professional', subtitle: 'Doctor, Lawyer, Consultant, CA', formTag: 'ITR-3', iconName: 'medical' },
  { id: 'freelancer', title: 'Freelancer', subtitle: 'Independent contractor & gigs', formTag: 'ITR-3/4', iconName: 'laptop' },
  { id: 'trader', title: 'Trader / Investor', subtitle: 'Stocks, F&O & Intraday', formTag: 'ITR-3', iconName: 'trending' },
  { id: 'rental', title: 'Rental Income', subtitle: 'House & commercial property', formTag: 'ITR-1/2', iconName: 'home' },
  { id: 'capital_gains', title: 'Capital Gains', subtitle: 'Property, shares & mutual funds', formTag: 'ITR-2', iconName: 'document' },
  { id: 'multiple', title: 'Multiple Sources', subtitle: 'Combination of income sources', formTag: 'ITR-2/3', iconName: 'link' },
]

/* ==========================================================================
   2. Taxpayer Profile & Personal Info Types
   ========================================================================== */
export interface TaxpayerProfile {
  panNumber: string
  aadhaarNumber: string
  fullName: string
  dob: string
  mobileNumber: string
  emailAddress: string
  registeredAddress: string
}

export const getStoredTaxpayerProfile = (overrideUser?: AuthUser | null): TaxpayerProfile => {
  const user = overrideUser || authStorage.getUser()
  if (!user) {
    return {
      panNumber: '—',
      aadhaarNumber: '—',
      fullName: 'Taxpayer',
      dob: '—',
      mobileNumber: '—',
      emailAddress: '—',
      registeredAddress: '—',
    }
  }

  const rawAadhaar = user.aadhaar?.replace(/\s+/g, '') || ''
  const maskedAadhaar =
    rawAadhaar.length >= 4
      ? `•••• •••• ${rawAadhaar.slice(-4)}`
      : rawAadhaar || '—'

  const formattedMobile = user.mobile
    ? user.mobile.startsWith('+91')
      ? user.mobile
      : `+91 ${user.mobile}`
    : '—'

  const addressParts = [
    user.addressLine1,
    user.addressLine2,
    user.city,
    user.state,
    user.pincode,
  ].filter(Boolean)

  const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : '—'

  return {
    panNumber: user.pan ? user.pan.toUpperCase() : '—',
    aadhaarNumber: maskedAadhaar,
    fullName: user.fullName || '—',
    dob: user.dob || '—',
    mobileNumber: formattedMobile,
    emailAddress: user.email || '—',
    registeredAddress: fullAddress,
  }
}

export const DEFAULT_TAXPAYER_PROFILE: TaxpayerProfile = getStoredTaxpayerProfile()

export type AssessmentYearOption = 'AY 2026-27' | 'AY 2027-28' | 'AY 2025-26' | ''
export type ResidentialStatusOption = 'resident' | 'nri' | 'rnor' | ''
export type FilingTypeOption = 'original' | 'belated' | 'revised' | 'updated' | ''

export interface FilingBankAccount {
  id: string
  bankName: string
  accountNumber: string
  ifsc: string
  accountType: 'savings' | 'current'
  isPrimary: boolean
  isPreValidated: boolean
}

export interface PreviousItrInfo {
  hasPreviousReturn: boolean
  previousAy?: string
  ackNumber?: string
  filingDate?: string
  hasCarryForwardLoss?: boolean
  lossAmount?: string
  importSalary?: boolean
  importDeductions?: boolean
  importLosses?: boolean
  importBankAccounts?: boolean
}

/* ==========================================================================
   3. Income Sources Types & Constants
   ========================================================================== */
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

/* ==========================================================================
   4. Deductions Data Type
   ========================================================================== */
export interface DeductionsData {
  epf: string
  ppf: string
  lic: string
  elss: string
  childrenTuition: string
  housingLoanPrincipal: string
  selfInsurance: string
  parentInsurance: string
  parentsSeniorCitizen: boolean
  homeLoanInterest24b: string
  section80CTotal: string
  section80D: string
  otherDeductions: string
  section80C: string
  homeLoanInterest: string
}

/* ==========================================================================
   5. Documents Types & Constants
   ========================================================================== */
export interface UploadedDocInfo {
  id: string
  fileName: string
  fileSize: string
  uploadedAt: string
}

export interface ChecklistDocConfig {
  id: string
  title: string
  desc: string
  Icon: React.FC
  isMandatory?: boolean
}

export const IconBriefcase = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

export const IconFileText = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

export const IconPaperclip = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
)

export const IconWallet = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    <path d="M14 12h4v4h-4a2 2 0 0 1 0-4z" />
  </svg>
)

export const IconPayslip = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" />
    <path d="M15 18h-5" />
    <path d="M10 6h8v4h-8V6Z" />
  </svg>
)

export const IconUpload = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

export const REQUIRED_DOCS: ChecklistDocConfig[] = [
  {
    id: 'form16',
    title: 'Form 16 (Part A & B) *',
    desc: 'Issued by your employer showing salary breakup & TDS',
    Icon: IconBriefcase,
    isMandatory: true,
  },
]

export const RECOMMENDED_DOCS: ChecklistDocConfig[] = [
  {
    id: 'form26as',
    title: 'Form 26AS Tax Credit Statement',
    desc: 'Helps your CA reconcile TDS credits and advance tax payments',
    Icon: IconFileText,
  },
  {
    id: 'ais_tis',
    title: 'AIS / TIS Statement',
    desc: 'Annual Information Statement for interest, dividends, and transactions',
    Icon: IconPaperclip,
  },
  {
    id: 'bank_statement',
    title: 'Bank Account Statement',
    desc: 'Recent statement for savings or current account',
    Icon: IconWallet,
  },
  {
    id: 'salary_payslips',
    title: 'Salary Payslips',
    desc: 'Recent salary slips to verify allowances and deductions',
    Icon: IconPayslip,
  },
]

export const ALL_DOCS = [...REQUIRED_DOCS, ...RECOMMENDED_DOCS]

/* ==========================================================================
   6. Steps & Progress Stages
   ========================================================================== */
export const ITR_STEPS = [
  { id: 1, label: 'Personal & Filing' },
  { id: 2, label: 'Income Sources' },
  { id: 3, label: 'Regime & Deductions' },
  { id: 4, label: 'Document Checklist' },
  { id: 5, label: 'Review & File' },
]

export const ITR_STEP_LABELS = [
  'Personal & Filing Info',
  'Income Sources',
  'Regime & Deductions',
  'Document Checklist',
  'Review & File',
]

export const PROGRESS_STAGES = [
  {
    id: 1,
    label: 'Application\nReceived',
    done: true,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 2,
    label: 'Documents\nUnder Review',
    active: true,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: 3,
    label: 'CA Preparing\nReturn',
    done: false,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    id: 4,
    label: 'Ready for\nConfirmation',
    done: false,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 5,
    label: 'Return\nFiled',
    done: false,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    id: 6,
    label: 'Processed &\nRefund',
    done: false,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
]

/* ==========================================================================
   7. Defaults
   ========================================================================== */
export const DEFAULT_PREVIOUS_ITR: PreviousItrInfo = {
  hasPreviousReturn: false,
  previousAy: '',
  ackNumber: '',
  filingDate: '',
  hasCarryForwardLoss: false,
  lossAmount: '',
}

export const DEFAULT_SALARY_DETAILS: SalaryDetails = {
  employerName: '',
  grossSalary: '',
  exemptAllowances: '',
  tdsDeducted: '',
}

export const DEFAULT_HOUSE_PROPERTY_DETAILS: HousePropertyDetails = {
  propertyType: 'self_occupied',
  homeLoanInterest: '',
  annualRentReceived: '',
  municipalTaxPaid: '',
}

export const DEFAULT_BUSINESS_DETAILS: BusinessDetails = {
  reportingMethod: '44AD',
  grossTurnover: '',
  declaredNetProfit: '',
}

export const DEFAULT_CAPITAL_GAINS_DETAILS: CapitalGainsDetails = {
  assetTypes: [],
  stcg: '',
  ltcg: '',
}

export const DEFAULT_OTHER_SOURCES_DETAILS: OtherSourcesDetails = {
  interestIncome: '',
  dividendIncome: '',
  otherIncome: '',
}

export const DEFAULT_DEDUCTIONS: DeductionsData = {
  epf: '',
  ppf: '',
  lic: '',
  elss: '',
  childrenTuition: '',
  housingLoanPrincipal: '',
  selfInsurance: '',
  parentInsurance: '',
  parentsSeniorCitizen: false,
  homeLoanInterest24b: '',
  otherDeductions: '',
  section80CTotal: '',
  section80C: '',
  section80D: '',
  homeLoanInterest: '',
}

export interface ItrDraftStateParams {
  isStarted: boolean
  currentStep: number
  selectedCategoryId: ItrCategoryId | null
  assessmentYear: AssessmentYearOption
  residentialStatus: ResidentialStatusOption
  filingType: FilingTypeOption
  bankAccounts: FilingBankAccount[]
  selectedBankId: string
  previousItr: PreviousItrInfo
  selectedSources: string[]
  salaryDetails: SalaryDetails
  housePropertyDetails: HousePropertyDetails
  businessDetails: BusinessDetails
  capitalGainsDetails: CapitalGainsDetails
  otherSourcesDetails: OtherSourcesDetails
  selectedRegime: 'new' | 'old' | ''
  deductions: DeductionsData
  uploadedDocs: Record<string, UploadedDocInfo>
}

/* ==========================================================================
   8. Shared Category & Form Icons
   ========================================================================== */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}

export const CalculatorIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="4" y="2" width="16" height="20" rx="3" />
    <line x1="8" y1="6" x2="16" y2="6" /><line x1="16" y1="14" x2="16" y2="18" />
    <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
  </svg>
)

export const UserCategoryIcon: React.FC<IconProps> = ({ size = 22, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)

export const StoreCategoryIcon: React.FC<IconProps> = ({ size = 22, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />
  </svg>
)

export const MedicalCategoryIcon: React.FC<IconProps> = ({ size = 22, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" />
  </svg>
)

export const LaptopCategoryIcon: React.FC<IconProps> = ({ size = 22, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="3" y="4" width="18" height="12" rx="2" /><line x1="2" y1="20" x2="22" y2="20" />
  </svg>
)

export const TrendingCategoryIcon: React.FC<IconProps> = ({ size = 22, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
)

export const HomeCategoryIcon: React.FC<IconProps> = ({ size = 22, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

export const DocumentCategoryIcon: React.FC<IconProps> = ({ size = 22, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

export const LinkCategoryIcon: React.FC<IconProps> = ({ size = 22, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

export const ShieldCategoryIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

export const CalendarIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

export const GlobeIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

export const BankCardIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export const PlusCircleIcon: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
)

export const HistoryDocIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
)

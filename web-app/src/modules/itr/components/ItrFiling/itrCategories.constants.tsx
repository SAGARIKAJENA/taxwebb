import React from 'react'

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

import { authStorage } from '@core/auth/authStorage'
import type { AuthUser } from '@core/auth/authTypes'

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

/* --- Shared Category & Form Icons --- */
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


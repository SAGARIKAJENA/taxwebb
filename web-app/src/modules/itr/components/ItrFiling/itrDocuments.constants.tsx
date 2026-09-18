import React from 'react'

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

export const ITR_STEPS = [
  { id: 1, label: 'Personal & Filing' },
  { id: 2, label: 'Income Sources' },
  { id: 3, label: 'Regime & Deductions' },
  { id: 4, label: 'Document Checklist' },
  { id: 5, label: 'Review & File' },
]

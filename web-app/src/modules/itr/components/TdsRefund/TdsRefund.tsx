import React, { useState, useEffect, useCallback } from 'react'
import { routePaths } from '@core/config'
import { useAppStore, useAuthStore } from '@store/index'
import { userStorage } from '@core/storage/userStorage'
import { useDraftBlocker } from '@shared/hooks'
import { DraftConfirmModal } from '@shared/components'
import { DEFAULT_TDS_TAXPAYER } from './tdsRefund.constants'
import type { TdsBankDetails } from './TdsRefundBankSection'
import type { TdsIncomeTaxData } from './TdsRefundTaxDetailsSection'
import type { UploadedFileMeta } from './TdsRefundDocuments'
import { TdsRefundOverview } from './TdsRefundOverview'
import { TdsRefundCustomerIncome } from './TdsRefundCustomerIncome'
import { TdsRefundDocuments } from './TdsRefundDocuments'
import { TdsRefundReview } from './TdsRefundReview'
import { TdsRefundPayment } from './TdsRefundPayment'
import { TdsRefundStatus } from './TdsRefundStatus'
import './TdsRefund.css'

const EMPTY_PROFILE = {
  name: '',
  fullName: '',
  pan: '',
  aadhaar: '',
  dob: '',
  mobile: '',
  email: '',
  address: '',
  preliminaryRefund: '₹0',
  assessmentYear: 'AY 2026-27',
  defaultAccountHolder: '',
  defaultAccountNumber: '',
  defaultIfsc: '',
  defaultBankName: '',
}

const EMPTY_BANK_DETAILS: TdsBankDetails = {
  accountHolder: '',
  accountNumber: '',
  confirmAccountNumber: '',
  ifsc: '',
  bankName: '',
  branch: '',
  accountType: null,
}

const EMPTY_TAX_DATA: TdsIncomeTaxData = {
  taxRegime: null,
  salaryIncome: '',
  otherIncome: '',
  interestIncome: '',
  rentalIncome: null,
  capitalGains: null,
  businessIncome: null,
  homeLoanInterest: null,
  taxDeductions: null,
  annualRent: '',
  propertyTaxes: '',
  stcg: '',
  ltcg: '',
  turnover: '',
  netProfit: '',
  homeLoanInterestAmount: '',
  deduction80C: '',
  deduction80D: '',
  totalTdsDeducted: '',
  tcsAmount: '',
  advanceTax: '',
  selfAssessmentTax: '',
}

export const TdsRefund: React.FC = () => {
  const pushToast = useAppStore((state) => state.pushToast)
  const user = useAuthStore((state) => state.user)
  const [existingDraft] = useState(() => userStorage.getDraft('tds-refund'))
  const [tdsRef] = useState(
    () => `TDS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
  )

  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (existingDraft && existingDraft.currentStep >= 1 && existingDraft.currentStep <= 4) {
      return existingDraft.currentStep
    }
    return 0
  })

  const [profile, setProfile] = useState(() => {
    if (existingDraft?.formData?.profile) {
      return existingDraft.formData.profile as typeof DEFAULT_TDS_TAXPAYER
    }
    return { ...EMPTY_PROFILE }
  })

  const [bankDetails, setBankDetails] = useState<TdsBankDetails>(() => {
    if (existingDraft?.formData?.bankDetails) {
      return existingDraft.formData.bankDetails as TdsBankDetails
    }
    return { ...EMPTY_BANK_DETAILS }
  })

  const [taxData, setTaxData] = useState<TdsIncomeTaxData>(() => {
    if (existingDraft?.formData?.taxData) {
      return existingDraft.formData.taxData as TdsIncomeTaxData
    }
    return { ...EMPTY_TAX_DATA }
  })

  const [uploads, setUploads] = useState<Record<string, UploadedFileMeta>>(() => {
    if (existingDraft?.formData?.uploads) {
      return existingDraft.formData.uploads as Record<string, UploadedFileMeta>
    }
    return {}
  })

  const saveCurrentDraft = useCallback(() => {
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    userStorage.saveDraft({
      serviceId: 'tds-refund',
      serviceTitle: 'TDS Refund',
      currentStep,
      totalSteps: 4,
      stepLabel: currentStep === 1 ? 'Customer & Income' : currentStep === 2 ? 'Upload Documents' : currentStep === 3 ? 'Review' : 'Payment',
      formData: { profile, bankDetails, taxData, uploads },
      savedAt: timeStr,
      savedTimestamp: Date.now(),
      resumeRoute: routePaths.itr.tdsRefund,
    })
  }, [currentStep, profile, bankDetails, taxData, uploads])

  useEffect(() => {
    if (currentStep >= 1 && currentStep <= 4) {
      saveCurrentDraft()
    }
  }, [currentStep, profile, bankDetails, taxData, uploads, saveCurrentDraft])


  const {
    isModalOpen,
    openModal,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  } = useDraftBlocker({
    shouldBlock: currentStep >= 1 && currentStep <= 4,
    onSaveDraft: () => {
      saveCurrentDraft()
      pushToast('Application saved as draft', 'success')
    },
    onDiscardDraft: () => {
      userStorage.deleteDraft('tds-refund')
      pushToast('Draft discarded', 'info')
    },
    defaultExitRoute: routePaths.dashboard,
  })

  const handleFinishSubmission = () => {
    userStorage.deleteDraft('tds-refund')
    const refundClaim = Number(taxData.totalTdsDeducted || 0) + Number(taxData.tcsAmount || 0)
    const refundText = refundClaim > 0 ? `₹${refundClaim.toLocaleString('en-IN')}` : 'Refund Claim'
    userStorage.saveUserApplication({
      id: `app-tds-${Date.now()}`,
      code: tdsRef,
      title: 'TDS Refund',
      meta: `${profile.fullName || profile.name || user?.fullName || 'Taxpayer'} · ${refundText}`,
      statusLabel: 'Under Review',
      statusTone: 'info',
      progress: 25,
      icon: '💰',
      to: routePaths.itr.tdsRefund,
    })
    // Reset all form state to empty and unselected after submitting
    setProfile({ ...EMPTY_PROFILE })
    setBankDetails({ ...EMPTY_BANK_DETAILS })
    setTaxData({ ...EMPTY_TAX_DATA })
    setUploads({})
    setCurrentStep(5)
  }

  const renderCurrentStep = () => {
    if (currentStep === 1) {
      return (
        <TdsRefundCustomerIncome
          onBack={() => setCurrentStep(0)}
          onNext={() => setCurrentStep(2)}
          onSaveDraft={openModal}
          currentStep={1}
          initialProfile={profile}
          onProfileChange={setProfile}
          initialBankDetails={bankDetails}
          onBankChange={setBankDetails}
          initialTaxData={taxData}
          onTaxChange={setTaxData}
        />
      )
    }
    if (currentStep === 2) {
      return (
        <TdsRefundDocuments
          onBack={() => setCurrentStep(1)}
          onNext={() => setCurrentStep(3)}
          onSaveDraft={openModal}
          initialUploads={uploads}
          onUploadsChange={setUploads}
        />
      )
    }
    if (currentStep === 3) {
      return (
        <TdsRefundReview
          onBack={() => setCurrentStep(2)}
          onEditStep1={() => setCurrentStep(1)}
          onEditStep2={() => setCurrentStep(2)}
          onNext={() => setCurrentStep(4)}
          onSaveDraft={openModal}
          profile={profile}
          bankDetails={bankDetails}
          taxData={taxData}
          uploads={uploads}
        />
      )
    }
    if (currentStep === 4) {
      return (
        <TdsRefundPayment
          applicantName={profile.fullName || profile.name || user?.fullName || 'Taxpayer'}
          applicationRef={tdsRef}
          onBack={() => setCurrentStep(3)}
          onNext={handleFinishSubmission}
        />
      )
    }
    if (currentStep === 5) {
      return (
        <TdsRefundStatus
          applicationId={tdsRef}
          onBack={() => setCurrentStep(4)}
          onBackToDashboard={() => setCurrentStep(0)}
        />
      )
    }
    return (
      <TdsRefundOverview
        onStart={() => setCurrentStep(1)}
      />
    )
  }

  return (
    <>
      {renderCurrentStep()}
      <DraftConfirmModal
        isOpen={isModalOpen}
        serviceTitle="TDS refund"
        onSaveAndExit={handleSaveAndExit}
        onDiscardAndExit={handleDiscardAndExit}
        onKeepEditing={handleKeepEditing}
      />
    </>
  )
}

export default TdsRefund

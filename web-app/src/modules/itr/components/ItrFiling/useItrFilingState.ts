import { useState, useEffect, useCallback } from 'react'
import { routePaths } from '@core/config'
import { useAppStore } from '@store/index'
import { userStorage } from '@core/storage/userStorage'
import { useDraftBlocker } from '@shared/hooks'
import type {
  ItrCategoryId,
  AssessmentYearOption,
  ResidentialStatusOption,
  FilingTypeOption,
  FilingBankAccount,
  PreviousItrInfo,
} from './itrCategories.constants'
import type {
  SalaryDetails,
  HousePropertyDetails,
  BusinessDetails,
  CapitalGainsDetails,
  OtherSourcesDetails,
} from './ItrStepIncomeSourcesView'
import type { DeductionsData } from './ItrStepRegimeDeductionsView'
import type { UploadedDocInfo } from './ItrStepDocumentsView'
import {
  DEFAULT_PREVIOUS_ITR,
  DEFAULT_SALARY_DETAILS,
  DEFAULT_HOUSE_PROPERTY_DETAILS,
  DEFAULT_BUSINESS_DETAILS,
  DEFAULT_CAPITAL_GAINS_DETAILS,
  DEFAULT_OTHER_SOURCES_DETAILS,
  DEFAULT_DEDUCTIONS,
  ITR_STEP_LABELS,
} from './itrFiling.defaults'

export function useItrFilingState() {
  const pushToast = useAppStore((state) => state.pushToast)
  const [existingDraft] = useState(() => userStorage.getDraft('itr-filing'))

  const [isStarted, setIsStarted] = useState<boolean>(() => Boolean(existingDraft))
  const [currentStep, setCurrentStep] = useState<number>(() => existingDraft?.currentStep || 1)

  // Step 1: Personal & Filing
  const [selectedCategoryId, setSelectedCategoryId] = useState<ItrCategoryId | null>(
    () => (existingDraft?.formData?.selectedCategoryId as ItrCategoryId) || null
  )
  const [assessmentYear, setAssessmentYear] = useState<AssessmentYearOption>(
    () => (existingDraft?.formData?.assessmentYear as AssessmentYearOption) || ''
  )
  const [residentialStatus, setResidentialStatus] = useState<ResidentialStatusOption>(
    () => (existingDraft?.formData?.residentialStatus as ResidentialStatusOption) || ''
  )
  const [filingType, setFilingType] = useState<FilingTypeOption>(
    () => (existingDraft?.formData?.filingType as FilingTypeOption) || ''
  )
  const [bankAccounts, setBankAccounts] = useState<FilingBankAccount[]>(
    () => (existingDraft?.formData?.bankAccounts as FilingBankAccount[]) || []
  )
  const [selectedBankId, setSelectedBankId] = useState<string>(
    () => (existingDraft?.formData?.selectedBankId as string) || ''
  )
  const [previousItr, setPreviousItr] = useState<PreviousItrInfo>(
    () => (existingDraft?.formData?.previousItr as PreviousItrInfo) || DEFAULT_PREVIOUS_ITR
  )

  // Step 2: Income Sources
  const [selectedSources, setSelectedSources] = useState<string[]>(
    () => (existingDraft?.formData?.selectedSources as string[]) || []
  )
  const [salaryDetails, setSalaryDetails] = useState<SalaryDetails>(
    () => (existingDraft?.formData?.salaryDetails as SalaryDetails) || DEFAULT_SALARY_DETAILS
  )
  const [housePropertyDetails, setHousePropertyDetails] = useState<HousePropertyDetails>(
    () => (existingDraft?.formData?.housePropertyDetails as HousePropertyDetails) || DEFAULT_HOUSE_PROPERTY_DETAILS
  )
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>(
    () => (existingDraft?.formData?.businessDetails as BusinessDetails) || DEFAULT_BUSINESS_DETAILS
  )
  const [capitalGainsDetails, setCapitalGainsDetails] = useState<CapitalGainsDetails>(
    () => (existingDraft?.formData?.capitalGainsDetails as CapitalGainsDetails) || DEFAULT_CAPITAL_GAINS_DETAILS
  )
  const [otherSourcesDetails, setOtherSourcesDetails] = useState<OtherSourcesDetails>(
    () => (existingDraft?.formData?.otherSourcesDetails as OtherSourcesDetails) || DEFAULT_OTHER_SOURCES_DETAILS
  )

  // Step 3: Regime & Deductions
  const [selectedRegime, setSelectedRegime] = useState<'new' | 'old' | ''>(
    () => (existingDraft?.formData?.selectedRegime as 'new' | 'old') || ''
  )
  const [deductions, setDeductions] = useState<DeductionsData>(
    () => (existingDraft?.formData?.deductions as DeductionsData) || DEFAULT_DEDUCTIONS
  )

  // Step 4: Documents
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, UploadedDocInfo>>(
    () => (existingDraft?.formData?.uploadedDocs as Record<string, UploadedDocInfo>) || {}
  )

  // Step 5: Final Submission
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedRef, setSubmittedRef] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedBank = bankAccounts.find((b) => b.id === selectedBankId) || bankAccounts[0]

  const saveCurrentDraft = useCallback(() => {
    if (isSubmitted) return
    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })

    userStorage.saveDraft({
      serviceId: 'itr-filing',
      serviceTitle: 'ITR Filing',
      currentStep,
      totalSteps: 5,
      stepLabel: ITR_STEP_LABELS[currentStep - 1] || 'Personal & Filing Info',
      formData: {
        isStarted,
        currentStep,
        selectedCategoryId,
        assessmentYear,
        residentialStatus,
        filingType,
        bankAccounts,
        selectedBankId,
        previousItr,
        selectedSources,
        salaryDetails,
        housePropertyDetails,
        businessDetails,
        capitalGainsDetails,
        otherSourcesDetails,
        selectedRegime,
        deductions,
        uploadedDocs,
      },
      savedAt: timeStr,
      savedTimestamp: Date.now(),
      resumeRoute: routePaths.itr.itrFiling,
    })
  }, [
    isSubmitted,
    currentStep,
    isStarted,
    selectedCategoryId,
    assessmentYear,
    residentialStatus,
    filingType,
    bankAccounts,
    selectedBankId,
    previousItr,
    selectedSources,
    salaryDetails,
    housePropertyDetails,
    businessDetails,
    capitalGainsDetails,
    otherSourcesDetails,
    selectedRegime,
    deductions,
    uploadedDocs,
  ])

  useEffect(() => {
    if (isStarted && !isSubmitted) {
      saveCurrentDraft()
    }
  }, [isStarted, isSubmitted, saveCurrentDraft])

  const {
    isModalOpen,
    openModal,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  } = useDraftBlocker({
    shouldBlock: (isStarted || Boolean(selectedCategoryId)) && !isSubmitted,
    onSaveDraft: () => {
      saveCurrentDraft()
      pushToast('Application saved as draft', 'success')
    },
    onDiscardDraft: () => {
      userStorage.deleteDraft('itr-filing')
      pushToast('Draft discarded', 'info')
    },
    defaultExitRoute: routePaths.dashboard,
  })

  const handleUploadDoc = (docId: string, docInfo: UploadedDocInfo) => {
    setUploadedDocs((prev) => ({ ...prev, [docId]: docInfo }))
  }

  const handleRemoveDoc = (docId: string) => {
    setUploadedDocs((prev) => {
      const next = { ...prev }
      delete next[docId]
      return next
    })
  }

  const handleFinalSubmit = () => {
    setIsSubmitting(true)
    const year = new Date().getFullYear()
    const randomCode = Math.floor(10000 + Math.random() * 90000)
    const generatedRef = `ITR-${year}-${randomCode}`

    setTimeout(() => {
      userStorage.saveUserApplication({
        id: `app-itr-${Date.now()}`,
        code: generatedRef,
        title: `ITR-1 Filing — ${assessmentYear}`,
        meta: `${salaryDetails.employerName || 'Salaried'} · ₹${salaryDetails.grossSalary || '0'}`,
        statusLabel: 'Submitted',
        statusTone: 'info',
        progress: 25,
        icon: '📄',
        to: routePaths.dashboard,
      })

      userStorage.deleteDraft('itr-filing')
      setSubmittedRef(generatedRef)
      setIsSubmitting(false)
      setIsSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 600)
  }

  return {
    isStarted,
    setIsStarted,
    currentStep,
    setCurrentStep,
    selectedCategoryId,
    setSelectedCategoryId,
    assessmentYear,
    setAssessmentYear,
    residentialStatus,
    setResidentialStatus,
    filingType,
    setFilingType,
    bankAccounts,
    setBankAccounts,
    selectedBankId,
    setSelectedBankId,
    selectedBank,
    previousItr,
    setPreviousItr,
    selectedSources,
    setSelectedSources,
    salaryDetails,
    setSalaryDetails,
    housePropertyDetails,
    setHousePropertyDetails,
    businessDetails,
    setBusinessDetails,
    capitalGainsDetails,
    setCapitalGainsDetails,
    otherSourcesDetails,
    setOtherSourcesDetails,
    selectedRegime,
    setSelectedRegime,
    deductions,
    setDeductions,
    uploadedDocs,
    handleUploadDoc,
    handleRemoveDoc,
    isSubmitted,
    submittedRef,
    isSubmitting,
    handleFinalSubmit,
    isModalOpen,
    openModal,
    handleSaveAndExit,
    handleDiscardAndExit,
    handleKeepEditing,
  }
}

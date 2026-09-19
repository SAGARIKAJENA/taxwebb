import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { routePaths } from '@core/config'
import { userStorage } from '@core/storage/userStorage'
import {
  GSTFilingPeriod,
  GSTFilingDocuments,
  GSTFilingReview,
  GSTFilingPayment,
  GSTFilingSuccess,
  GSTFilingReceipt,
  type FilingPeriodData,
  type PaymentResult,
} from '../../components'
import { type UploadedFileInfo } from '../../components/filing/GSTFilingDocuments/gstDocumentsData'
import './GSTFiling.css'

const DEFAULT_FILING_DATA: FilingPeriodData = {
  gstin: '',
  businessName: 'Shree Deshmukh Traders',
  financialYear: 'FY 2026-27',
  frequency: 'Monthly',
  selectedMonth: 'August 2026',
  returnType: 'combo',
  baseFee: 2500,
  filingType: 'regular',
  calculationMethod: 'ca_calculate',
}

export const GSTFiling = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [filingRef] = useState(
    () => `GST-FIL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
  )

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(() => {
    if (location.pathname === routePaths.gst.fileUpload) return 2
    if (location.pathname === routePaths.gst.fileReview) return 3
    if (location.pathname === routePaths.gst.filePayment) return 4
    if (location.pathname === routePaths.gst.fileSuccess) return 5
    if (location.pathname === routePaths.gst.fileReceipt) return 6
    return 1
  })

  const [filingData, setFilingData] = useState<FilingPeriodData>(DEFAULT_FILING_DATA)

  const [paymentResult, setPaymentResult] = useState<PaymentResult>(() => ({
    transactionId: `TXN${Date.now()}`,
    receiptNumber: `TE/${new Date().getFullYear()}/R-${Math.floor(1000 + Math.random() * 9000)}`,
    method: 'UPI',
    dateText: new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date()),
    applicationRef: filingRef,
    amount: 2950,
  }))
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFileInfo>>({})
  const [notApplicableDocs, setNotApplicableDocs] = useState<Record<string, boolean>>({})

  const handleFileUpload = (id: string, file: File) => {
    const mb = file.size / (1024 * 1024)
    const sizeText = mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`
    const fileUrl = URL.createObjectURL(file)
    const fileInfo: UploadedFileInfo = {
      name: file.name,
      sizeText,
      uploadTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fileUrl,
      status: 'verified',
    }
    setUploadedFiles((prev) => ({
      ...prev,
      [id]: fileInfo,
    }))
    setNotApplicableDocs((prev) => {
      if (!prev[id]) return prev
      const copy = { ...prev }
      delete copy[id]
      return copy
    })
  }

  const handleFileRemove = (id: string) => {
    setUploadedFiles((prev) => {
      const copy = { ...prev }
      delete copy[id]
      return copy
    })
  }

  const handleToggleNotApplicable = (id: string) => {
    setNotApplicableDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }


  useEffect(() => {
    if (location.pathname === routePaths.gst.fileUpload) setCurrentStep(2)
    else if (location.pathname === routePaths.gst.fileReview) setCurrentStep(3)
    else if (location.pathname === routePaths.gst.filePayment) setCurrentStep(4)
    else if (location.pathname === routePaths.gst.fileSuccess) setCurrentStep(5)
    else if (location.pathname === routePaths.gst.fileReceipt) setCurrentStep(6)
    else if (location.pathname === routePaths.gst.filing || location.pathname === routePaths.gst.filePeriod) setCurrentStep(1)
  }, [location.pathname])

  const handleStepClick = (stepId: number) => {
    if (stepId === 1) {
      setCurrentStep(1)
      navigate(routePaths.gst.filePeriod)
    } else if (stepId === 2) {
      setCurrentStep(2)
      navigate(routePaths.gst.fileUpload)
    } else if (stepId === 3) {
      setCurrentStep(3)
      navigate(routePaths.gst.fileReview)
    } else if (stepId === 4) {
      setCurrentStep(4)
      navigate(routePaths.gst.filePayment)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep1Continue = (data: FilingPeriodData) => {
    setFilingData(data)
    setCurrentStep(2)
    navigate(routePaths.gst.fileUpload)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep2Next = () => {
    setCurrentStep(3)
    navigate(routePaths.gst.fileReview)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep3Approve = () => {
    setCurrentStep(4)
    navigate(routePaths.gst.filePayment)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStep4Success = (res: PaymentResult) => {
    setPaymentResult(res)
    const finalRef = res.applicationRef || filingRef
    userStorage.saveUserApplication({
      id: `app-gst-filing-${Date.now()}`,
      code: finalRef,
      title: `GST Filing — ${filingData.selectedMonth || 'Return'}`,
      meta: `${filingData.businessName || 'Business'} · ${filingData.returnType || 'GSTR-3B'}`,
      statusLabel: 'Submitted',
      statusTone: 'info',
      progress: 25,
      icon: '📄',
      to: routePaths.gst.detail(finalRef),
    })
    setCurrentStep(5)
    navigate(routePaths.gst.fileSuccess)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="gst-filing-page">
      {/* Step 1: Period Selection */}
      {currentStep === 1 && (
        <GSTFilingPeriod
          initialData={filingData}
          onStepClick={handleStepClick}
          onContinue={handleStep1Continue}
          onCancel={() => navigate(routePaths.gst.root)}
        />
      )}

      {/* Step 2: Upload Documents & Checklist */}
      {currentStep === 2 && (
        <GSTFilingDocuments
          selectedMonth={filingData.selectedMonth}
          baseFee={filingData.baseFee}
          returnType={filingData.returnType}
          frequency={filingData.frequency}
          uploadedFiles={uploadedFiles}
          notApplicableDocs={notApplicableDocs}
          onFileUpload={handleFileUpload}
          onFileRemove={handleFileRemove}
          onToggleNotApplicable={handleToggleNotApplicable}
          onStepClick={handleStepClick}
          onBack={() => {
            setCurrentStep(1)
            navigate(routePaths.gst.filePeriod)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onNext={handleStep2Next}
        />
      )}

      {/* Step 3: Review & Tax Figures */}
      {currentStep === 3 && (
        <GSTFilingReview
          selectedMonth={filingData.selectedMonth}
          baseFee={filingData.baseFee}
          filingData={filingData}
          uploadedFiles={uploadedFiles}
          notApplicableDocs={notApplicableDocs}
          onStepClick={handleStepClick}
          onBack={() => {
            setCurrentStep(2)
            navigate(routePaths.gst.fileUpload)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onRequestChange={() => {
            setCurrentStep(2)
            navigate(routePaths.gst.fileUpload)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onApprove={handleStep3Approve}
        />
      )}

      {/* Step 4: Payment */}
      {currentStep === 4 && (
        <GSTFilingPayment
          amount={
            filingData.baseFee > 0
              ? filingData.baseFee + Math.round(filingData.baseFee * 0.18)
              : 2950
          }
          applicationRef={filingRef}
          serviceTitle={`GST Filing — ${filingData.selectedMonth || 'Return'}`}
          onStepClick={handleStepClick}
          onBack={() => {
            setCurrentStep(3)
            navigate(routePaths.gst.fileReview)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onSuccess={handleStep4Success}
        />
      )}

      {/* Step 5: Success Screen */}
      {currentStep === 5 && (
        <GSTFilingSuccess
          details={paymentResult}
          onViewReceipt={() => {
            setCurrentStep(6)
            navigate(routePaths.gst.fileReceipt)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onTrackApplication={() =>
            navigate(routePaths.gst.detail(paymentResult.applicationRef || filingRef))
          }
          onBackToDashboard={() => navigate(routePaths.gst.root)}
        />
      )}

      {/* Step 6: Receipt Screen */}
      {currentStep === 6 && (
        <GSTFilingReceipt
          details={paymentResult}
          onBack={() => {
            setCurrentStep(5)
            navigate(routePaths.gst.fileSuccess)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}
    </div>
  )
}

export default GSTFiling

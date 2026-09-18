import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { routePaths } from '@core/config'
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
  businessName: '',
  financialYear: '',
  frequency: '',
  selectedMonth: '',
  returnType: '',
  baseFee: 0,
  filingType: '',
  calculationMethod: '',
}

const DEFAULT_PAYMENT_RESULT: PaymentResult = {
  transactionId: 'TXN2609021184402',
  receiptNumber: 'TE/26-27/R-0884',
  method: 'UPI · anjali@okhdfcbank',
  dateText: '2 Sep 2026, 10:42 AM',
  applicationRef: 'GST-2026-00118',
  amount: 2950,
}

export const GSTFiling = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(() => {
    if (location.pathname === routePaths.gst.fileUpload) return 2
    if (location.pathname === routePaths.gst.fileReview) return 3
    if (location.pathname === routePaths.gst.filePayment) return 4
    if (location.pathname === routePaths.gst.fileSuccess) return 5
    if (location.pathname === routePaths.gst.fileReceipt) return 6
    return 1
  })

  const [filingData, setFilingData] = useState<FilingPeriodData>(DEFAULT_FILING_DATA)
  const [paymentResult, setPaymentResult] = useState<PaymentResult>(DEFAULT_PAYMENT_RESULT)
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
            (filingData.baseFee > 0 ? filingData.baseFee : 2500) +
            Math.round((filingData.baseFee > 0 ? filingData.baseFee : 2500) * 0.18)
          }
          applicationRef="GST-2026-00118"
          serviceTitle={`GST Filing Service — ${filingData.selectedMonth || 'August 2026'}`}
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
          onTrackApplication={() => navigate(routePaths.gst.track('GST-2026-00118'))}
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

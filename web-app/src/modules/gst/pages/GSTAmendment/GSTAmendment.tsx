import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import { useAppStore } from '@store/index'
import {
  GSTAmendmentSelection,
  GSTAmendmentDetailForm,
  GSTAmendmentAddressForm,
  GSTBankAccountsForm,
  GSTSignatoriesForm,
  GSTContactDetailsForm,
  GSTAmendmentReview,
  GSTAmendmentSubmitted,
  type AmendmentCardItem,
  type AddressDetailsItem,
} from '../../components'
import { AMENDMENT_CONFIGS } from '../../components/amendment/amendmentConfigs'
import { gstService } from '../../services/gstService'
import type { GstAmendmentPayload, GstAmendmentRecord, GstAmendmentFieldKey } from '../../types/gst.types'
import './GSTAmendment.css'

export const GSTAmendment = () => {
  const navigate = useNavigate()
  const pushToast = useAppStore((state) => state.pushToast)

  const [gstin, setGstin] = useState('')
  const [selectedOption, setSelectedOption] = useState<AmendmentCardItem | null>(null)
  const [formData, setFormData] = useState<{
    newValue: string
    file: File | null
    addressDetails?: AddressDetailsItem
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedRecord, setSubmittedRecord] = useState<GstAmendmentRecord | null>(null)

  const handleDetailFormSubmit = (data: {
    newValue: string
    file: File | null
    addressDetails?: AddressDetailsItem
  }) => {
    setFormData(data)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFinalSubmit = async () => {
    if (!selectedOption || !formData) return

    const config = AMENDMENT_CONFIGS[selectedOption.id] || {
      title: selectedOption.title,
      currentValue: 'Current details',
      inputLabel: 'New Value',
      placeholder: 'Enter new value',
      proofs: [],
    }

    const payload: GstAmendmentPayload = {
      gstin: gstin || '29AAAAA0000A1Z5',
      fieldBeingChanged: config.title,
      fieldKey: (selectedOption.id as GstAmendmentFieldKey) || 'business_name',
      oldValue: config.currentValue,
      newValue: formData.newValue,
      supportingDocumentName: formData.file?.name,
      supportingDocumentFile: formData.file || undefined,
    }

    try {
      setIsSubmitting(true)
      const record = await gstService.submitAmendment(payload)
      setSubmittedRecord(record)
      pushToast(
        `Amendment request for ${config.title} submitted successfully (${record.reference})`,
        'success'
      )
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      pushToast('Failed to submit amendment application. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToDashboard = () => {
    navigate(routePaths.gst.root)
  }

  if (submittedRecord) {
    const sectionTitle = selectedOption
      ? AMENDMENT_CONFIGS[selectedOption.id]?.title || selectedOption.title
      : 'Legal Business Name'

    const isSignatory = selectedOption?.id === 'authorised_signatories'
    const isBank = selectedOption?.id === 'bank_accounts'
    const isAdditional = selectedOption?.id === 'additional_place'

    const defaultArn = isSignatory ? 'AA2993899201' : isBank ? 'AA2993845112' : isAdditional ? 'AA2993724646' : 'AA2993887949'
    const defaultDate = isSignatory ? '16 Sep 2026, 12:40 PM' : isBank ? '16 Sep 2026, 11:48 AM' : isAdditional ? '16 Sep 2026, 10:05 AM' : '15 Sep 2026, 04:38 PM'

    return (
      <GSTAmendmentSubmitted
        arnNumber={submittedRecord.reference || defaultArn}
        submissionDateText={defaultDate}
        requestedSection={sectionTitle}
        onTrackAmendment={() =>
          navigate(routePaths.gst.track(submittedRecord.reference || defaultArn))
        }
        onOpenMyApplications={handleBackToDashboard}
      />
    )
  }

  if (selectedOption && formData) {
    const config = AMENDMENT_CONFIGS[selectedOption.id] || {
      title: selectedOption.title,
      currentValue: 'Current details',
      inputLabel: 'New Value',
      placeholder: 'Enter new value',
      proofs: [],
    }

    const isAddressType =
      selectedOption.id === 'principal_place' || selectedOption.id === 'additional_place'

    const mb = formData.file ? formData.file.size / (1024 * 1024) : 0
    const sizeText = mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round((formData.file?.size || 0) / 1024))} KB`

    const isAdditional = selectedOption.id === 'additional_place'
    const currentAddress = isAdditional
      ? { address: 'Peenya Industrial Area', city: 'Bengaluru', pinCode: '560058', natureOfPremises: 'Warehouse' }
      : { address: 'MG Road, Bengaluru', city: 'Bengaluru', district: 'Bengaluru Urban', state: 'Karnataka', pinCode: '560001', natureOfPremises: '—' }

    const userAddr = formData.addressDetails
    const requestedAddress = userAddr && userAddr.address
      ? {
          address: userAddr.address,
          city: userAddr.city || 'Nellore',
          district: userAddr.district || 'Nellore',
          state: userAddr.state || 'Andhra Pradesh',
          pinCode: userAddr.pinCode || (isAdditional ? '560001' : '560011'),
          natureOfPremises: userAddr.natureOfPremises || (isAdditional ? 'Shared' : 'Warehouse'),
        }
      : (isAdditional
        ? { address: 'Nellore', city: 'Nellore', pinCode: '560001', natureOfPremises: 'Shared' }
        : { address: 'Nellore', city: 'Nellore', district: 'Nellore', state: 'Andhra Pradesh', pinCode: '560011', natureOfPremises: 'Warehouse' })

    const isBankType = selectedOption.id === 'bank_accounts'
    const userBank = (formData as { bankDetails?: Record<string, string> }).bankDetails || {}
    const currentBank = isBankType
      ? { bankName: 'HDFC Bank', accountNumber: 'XXXXX1234', ifscCode: 'HDFC0001234', accountType: 'Current' }
      : undefined

    const requestedBank = isBankType
      ? {
          bankName: userBank.bankName || 'Icic',
          accountNumber: userBank.accountNumber || '33457469933',
          confirmAccountNumber: userBank.accountNumber || '33457469933',
          ifscCode: userBank.ifscCode || 'ICIC0005678',
          accountType: userBank.accountType || 'Current',
        }
      : undefined

    const isSignatoryType = selectedOption.id === 'authorised_signatories'
    const userSig = (formData as { signatoryDetails?: Record<string, string> }).signatoryDetails || {}
    const currentSig = isSignatoryType
      ? {
          name: 'Akhil Kumar',
          pan: 'AKHIL1234K',
          designation: 'Proprietor',
          mobile: '+91 98765 43210',
          email: 'akhil@business.com',
        }
      : undefined

    const requestedSig = isSignatoryType
      ? {
          name: userSig.name || 'Suresh Kumar',
          designation: userSig.designation || 'Director',
          pan: userSig.pan || 'ABCDE1234F',
          mobile: userSig.mobile || '8749594844',
          dob: userSig.dob || '15-08-1990',
          email: userSig.email || 'suresh@business.com',
        }
      : undefined

    const isContactType = selectedOption.id === 'contact_details'
    const userContact = (formData as { contactDetails?: Record<string, string> }).contactDetails || {}
    const currentContact = isContactType
      ? { mobile: '+91 98765 43210', email: 'akhil@business.com' }
      : undefined
    const requestedContact = isContactType
      ? { mobile: userContact.mobile || '+91 98765 43210', email: userContact.email || 'akhil@business.com' }
      : undefined

    return (
      <div className="gst-amendment-page">
        <GSTAmendmentReview
          gstin={gstin || (isBankType || isSignatoryType || isContactType ? '29AAAAA0000A1Z5' : isAdditional ? '29AAAAA0000A1Z6' : '29AAAAA0000A1Z5')}
          sectionTitle={config.title}
          amendmentType={selectedOption.type}
          currentValue={config.currentValue}
          requestedValue={formData.newValue}
          currentAddressDetails={isAddressType ? currentAddress : undefined}
          requestedAddressDetails={isAddressType ? requestedAddress : undefined}
          currentBankDetails={currentBank}
          requestedBankDetails={requestedBank}
          currentSignatoryDetails={currentSig}
          requestedSignatoryDetails={requestedSig}
          currentContactDetails={currentContact}
          requestedContactDetails={requestedContact}
          fileName={formData.file?.name || (isSignatoryType ? 'Screenshot_2026-09-16-12-05-14-30_f7.....png' : isBankType ? 'Screenshot_2026-09-16-11-05-22-60_f7.....png' : isAdditional ? 'Screenshot_2026-09-16-09-49-45-99_f7.png' : 'Screenshot_2026-09-16-14-25-44.png')}
          fileSizeText={sizeText || '0.3 MB'}
          uploadDateText="Uploaded on 16 Sep 2026"
          isSubmitting={isSubmitting}
          onBack={() => setFormData(null)}
          onSubmit={handleFinalSubmit}
        />
      </div>
    )
  }

  if (selectedOption) {
    const config = AMENDMENT_CONFIGS[selectedOption.id] || {
      title: selectedOption.title,
      currentValue: 'Current details',
      inputLabel: 'New Value',
      placeholder: 'Enter new value',
      proofs: [],
    }

    const isAddressType =
      selectedOption.id === 'principal_place' || selectedOption.id === 'additional_place'

    return (
      <div className="gst-amendment-page">
        {selectedOption.id === 'bank_accounts' ? (
          <GSTBankAccountsForm
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
          />
        ) : selectedOption.id === 'authorised_signatories' ? (
          <GSTSignatoriesForm
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
          />
        ) : selectedOption.id === 'contact_details' ? (
          <GSTContactDetailsForm
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
          />
        ) : isAddressType ? (
          <GSTAmendmentAddressForm
            title={config.title}
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
          />
        ) : (
          <GSTAmendmentDetailForm
            title={config.title}
            currentValue={config.currentValue}
            inputLabel={config.inputLabel}
            placeholder={config.placeholder}
            proofs={config.proofs}
            isSubmitting={isSubmitting}
            onBack={() => setSelectedOption(null)}
            onSubmit={handleDetailFormSubmit}
          />
        )}
      </div>
    )
  }

  return (
    <div className="gst-amendment-page">
      <GSTAmendmentSelection
        gstin={gstin}
        onGstinChange={setGstin}
        onSelectOption={(option) => {
          setSelectedOption(option)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />
    </div>
  )
}

export default GSTAmendment

import React from 'react'
import type { GstBusinessFormData } from '../GSTStepBusiness/GSTStepBusiness'
import { GSTBusinessGeneralSection } from './GSTBusinessGeneralSection'
import { GSTBusinessAddressSection } from './GSTBusinessAddressSection'

export * from './gstBusinessDetails.constants'

export interface GSTBusinessDetailsProps {
  data: Pick<
    GstBusinessFormData,
    | 'legalName'
    | 'tradeName'
    | 'constitution'
    | 'natureOfBusiness'
    | 'commencementDate'
    | 'registrationReason'
    | 'compositionScheme'
    | 'placeOfBusiness'
    | 'businessAddress'
    | 'city'
    | 'district'
    | 'state'
    | 'pinCode'
    | 'hsnSacCode'
  >
  onChange: <K extends keyof GstBusinessFormData>(field: K, value: GstBusinessFormData[K]) => void
  errors?: Record<string, string>
  onClearError?: (field: string) => void
}

export const GSTBusinessDetails: React.FC<GSTBusinessDetailsProps> = ({
  data,
  onChange,
  errors = {},
  onClearError,
}) => {
  return (
    <div className="space-y-6">
      <GSTBusinessGeneralSection
        data={data}
        onChange={onChange}
        errors={errors}
        onClearError={onClearError}
      />
      <GSTBusinessAddressSection
        data={data}
        onChange={onChange}
        errors={errors}
        onClearError={onClearError}
      />
    </div>
  )
}

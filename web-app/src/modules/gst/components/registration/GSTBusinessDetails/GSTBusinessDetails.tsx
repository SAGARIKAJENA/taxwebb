import { type ChangeEvent } from 'react'
import type { GstBusinessFormData } from '../GSTStepBusiness/GSTStepBusiness'

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

export const CONSTITUTION_OF_BUSINESS_OPTIONS = [
  'Proprietorship',
  'Partnership',
  'Limited Liability Partnership (LLP)',
  'Private Limited Company',
  'Public Limited Company',
  'Hindu Undivided Family (HUF)',
  'Society / Club / Trust / AOP',
  'Others',
]

export const NATURE_OF_BUSINESS_OPTIONS = [
  'Retail Business',
  'Wholesale Business',
  'Manufacturing',
  'Service Provision',
  'Export of Goods / Services',
  'Import of Goods / Services',
  'E-Commerce Operator / Seller',
  'Works Contract',
  'Others',
]

export const REASON_FOR_REGISTRATION_OPTIONS = [
  'Crossing the Threshold Limit',
  'Inter-State Supply',
  'Voluntary Basis',
  'Transfer of Business',
  'Death of Proprietor',
  'E-Commerce Seller / Operator',
  'Change in Constitution',
  'Others',
]

export const COMPOSITION_SCHEME_OPTIONS = [
  'No',
  'Yes',
]

export const PLACE_OF_BUSINESS_OPTIONS = [
  'Owned',
  'Rented',
  'Leased',
  'Consent',
  'Shared',
  'Principal Place of Business',
  'Additional Place of Business',
  'Others',
]

export const INDIAN_STATES_AND_UTS = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
]

export const GSTBusinessDetails = ({
  data,
  onChange,
  errors = {},
  onClearError,
}: GSTBusinessDetailsProps) => {
  const handleLegalNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    onChange('legalName', cleaned)
    onClearError?.('legalName')
  }

  const handleTradeNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange('tradeName', e.target.value)
    onClearError?.('tradeName')
  }

  const handleConstitutionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange('constitution', e.target.value)
    onClearError?.('constitution')
  }

  const handleNatureOfBusinessChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange('natureOfBusiness', e.target.value)
    onClearError?.('natureOfBusiness')
  }

  const handleCommencementDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange('commencementDate', e.target.value)
    onClearError?.('commencementDate')
  }

  const handleRegistrationReasonChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange('registrationReason', e.target.value)
    onClearError?.('registrationReason')
  }

  const handleCompositionSchemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange('compositionScheme', e.target.value)
    onClearError?.('compositionScheme')
  }

  const handlePlaceOfBusinessChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange('placeOfBusiness', e.target.value)
    onClearError?.('placeOfBusiness')
  }

  const handleBusinessAddressChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange('businessAddress', e.target.value)
    onClearError?.('businessAddress')
  }

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    onChange('city', cleaned)
    onClearError?.('city')
  }

  const handleDistrictChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z\s]/g, '')
    onChange('district', cleaned)
    onClearError?.('district')
  }

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange('state', e.target.value)
    onClearError?.('state')
  }

  const handlePinCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 6)
    onChange('pinCode', cleaned)
    onClearError?.('pinCode')
  }

  const handleHsnSacChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.trim().slice(0, 10)
    onChange('hsnSacCode', cleaned)
    onClearError?.('hsnSacCode')
  }

  return (
    <div className="gst-form-card">
      <div className="gst-form-card__header">
        <div className="gst-form-card__icon-badge gst-form-card__icon-badge--orange">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18" />
            <path d="M5 21V7l8-4v18" />
            <path d="M19 21V11l-6-3" />
            <path d="M9 9h1" />
            <path d="M9 13h1" />
            <path d="M9 17h1" />
          </svg>
        </div>
        <h2 className="gst-form-card__title">Business Details</h2>
      </div>

      <div className="gst-form-card__body">
        {/* Row 1: Legal Name & Trade Name */}
        <div className="gst-form-grid gst-form-grid--2col">
          <div className="gst-form-group">
            <label htmlFor="legalName" className="gst-form-label">
              Legal Name of Business (as per PAN) <span className="gst-required-star">*</span>
            </label>
            <input
              id="legalName"
              type="text"
              className={`gst-form-input ${errors.legalName ? 'gst-input--error' : ''}`}
              placeholder="Exactly as on the PAN card"
              value={data.legalName}
              onChange={handleLegalNameChange}
            />
            {errors.legalName && <span className="gst-field-error">{errors.legalName}</span>}
          </div>

          <div className="gst-form-group">
            <label htmlFor="tradeName" className="gst-form-label">
              Trade Name <span className="gst-required-star">*</span>
            </label>
            <input
              id="tradeName"
              type="text"
              className={`gst-form-input ${errors.tradeName ? 'gst-input--error' : ''}`}
              placeholder="Enter your business / trade name"
              value={data.tradeName}
              onChange={handleTradeNameChange}
            />
            {errors.tradeName && <span className="gst-field-error">{errors.tradeName}</span>}
          </div>
        </div>

        {/* Row 2: Constitution of Business & Nature of Business */}
        <div className="gst-form-grid gst-form-grid--2col">
          <div className="gst-form-group">
            <label htmlFor="constitution" className="gst-form-label">
              Constitution of Business <span className="gst-required-star">*</span>
            </label>
            <div className="gst-select-wrapper">
              <select
                id="constitution"
                className={`gst-form-select ${errors.constitution ? 'gst-input--error' : ''}`}
                value={data.constitution}
                onChange={handleConstitutionChange}
              >
                <option value="">Select business type</option>
                {CONSTITUTION_OF_BUSINESS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="gst-select-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
            {errors.constitution && <span className="gst-field-error">{errors.constitution}</span>}
          </div>

          <div className="gst-form-group">
            <label htmlFor="natureOfBusiness" className="gst-form-label">
              Nature of Business <span className="gst-required-star">*</span>
            </label>
            <div className="gst-select-wrapper">
              <select
                id="natureOfBusiness"
                className={`gst-form-select ${errors.natureOfBusiness ? 'gst-input--error' : ''}`}
                value={data.natureOfBusiness}
                onChange={handleNatureOfBusinessChange}
              >
                <option value="">Select nature of business</option>
                {NATURE_OF_BUSINESS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="gst-select-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
            {errors.natureOfBusiness && <span className="gst-field-error">{errors.natureOfBusiness}</span>}
          </div>
        </div>

        {/* Row 3: Date of Commencement & Reason for Registration */}
        <div className="gst-form-grid gst-form-grid--2col">
          <div className="gst-form-group">
            <label htmlFor="commencementDate" className="gst-form-label">
              Date of Commencement of Business <span className="gst-required-star">*</span>
            </label>
            <div className="gst-date-input-wrapper">
              <input
                id="commencementDate"
                type="date"
                className={`gst-form-input gst-form-input--date ${errors.commencementDate ? 'gst-input--error' : ''}`}
                placeholder="DD-MM-YYYY"
                value={data.commencementDate}
                onChange={handleCommencementDateChange}
              />
            </div>
            {errors.commencementDate && <span className="gst-field-error">{errors.commencementDate}</span>}
          </div>

          <div className="gst-form-group">
            <label htmlFor="registrationReason" className="gst-form-label">
              Reason for Registration <span className="gst-required-star">*</span>
            </label>
            <div className="gst-select-wrapper">
              <select
                id="registrationReason"
                className={`gst-form-select ${errors.registrationReason ? 'gst-input--error' : ''}`}
                value={data.registrationReason}
                onChange={handleRegistrationReasonChange}
              >
                <option value="">Select a reason</option>
                {REASON_FOR_REGISTRATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="gst-select-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
            {errors.registrationReason && <span className="gst-field-error">{errors.registrationReason}</span>}
          </div>
        </div>

        {/* Row 4: Opting for Composition Scheme? & Place of Business */}
        <div className="gst-form-grid gst-form-grid--2col">
          <div className="gst-form-group">
            <label htmlFor="compositionScheme" className="gst-form-label">
              Opting for Composition Scheme? <span className="gst-required-star">*</span>
            </label>
            <div className="gst-select-wrapper">
              <select
                id="compositionScheme"
                className={`gst-form-select ${errors.compositionScheme ? 'gst-input--error' : ''}`}
                value={data.compositionScheme}
                onChange={handleCompositionSchemeChange}
              >
                <option value="">Select yes or no</option>
                {COMPOSITION_SCHEME_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="gst-select-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
            {errors.compositionScheme && <span className="gst-field-error">{errors.compositionScheme}</span>}
          </div>

          <div className="gst-form-group">
            <label htmlFor="placeOfBusiness" className="gst-form-label">
              Place of Business <span className="gst-required-star">*</span>
            </label>
            <div className="gst-select-wrapper">
              <select
                id="placeOfBusiness"
                className={`gst-form-select ${errors.placeOfBusiness ? 'gst-input--error' : ''}`}
                value={data.placeOfBusiness}
                onChange={handlePlaceOfBusinessChange}
              >
                <option value="">Select place type</option>
                {PLACE_OF_BUSINESS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="gst-select-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
            {errors.placeOfBusiness && <span className="gst-field-error">{errors.placeOfBusiness}</span>}
          </div>
        </div>

        {/* Row 5: Business Address */}
        <div className="gst-form-group">
          <label htmlFor="businessAddress" className="gst-form-label">
            Business Address <span className="gst-required-star">*</span>
          </label>
          <input
            id="businessAddress"
            type="text"
            className={`gst-form-input ${errors.businessAddress ? 'gst-input--error' : ''}`}
            placeholder="Building, street, locality"
            value={data.businessAddress}
            onChange={handleBusinessAddressChange}
          />
          {errors.businessAddress && <span className="gst-field-error">{errors.businessAddress}</span>}
        </div>

        {/* Row 6: City & District */}
        <div className="gst-form-grid gst-form-grid--2col">
          <div className="gst-form-group">
            <label htmlFor="city" className="gst-form-label">
              City <span className="gst-required-star">*</span>
            </label>
            <input
              id="city"
              type="text"
              className={`gst-form-input ${errors.city ? 'gst-input--error' : ''}`}
              placeholder="City"
              value={data.city}
              onChange={handleCityChange}
            />
            {errors.city && <span className="gst-field-error">{errors.city}</span>}
          </div>

          <div className="gst-form-group">
            <label htmlFor="district" className="gst-form-label">
              District <span className="gst-required-star">*</span>
            </label>
            <input
              id="district"
              type="text"
              className={`gst-form-input ${errors.district ? 'gst-input--error' : ''}`}
              placeholder="District"
              value={data.district}
              onChange={handleDistrictChange}
            />
            {errors.district && <span className="gst-field-error">{errors.district}</span>}
          </div>
        </div>

        {/* Row 7: State & PIN Code */}
        <div className="gst-form-grid gst-form-grid--2col">
          <div className="gst-form-group">
            <label htmlFor="state" className="gst-form-label">
              State / UT <span className="gst-required-star">*</span>
            </label>
            <div className="gst-select-wrapper">
              <select
                id="state"
                className={`gst-form-select ${errors.state ? 'gst-input--error' : ''}`}
                value={data.state}
                onChange={handleStateChange}
              >
                <option value="">Select</option>
                {INDIAN_STATES_AND_UTS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <span className="gst-select-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
            {errors.state && <span className="gst-field-error">{errors.state}</span>}
          </div>

          <div className="gst-form-group">
            <label htmlFor="pinCode" className="gst-form-label">
              PIN Code <span className="gst-required-star">*</span>
            </label>
            <input
              id="pinCode"
              type="text"
              inputMode="numeric"
              maxLength={6}
              className={`gst-form-input ${errors.pinCode ? 'gst-input--error' : ''}`}
              placeholder="560001"
              value={data.pinCode}
              onChange={handlePinCodeChange}
            />
            {errors.pinCode && <span className="gst-field-error">{errors.pinCode}</span>}
          </div>
        </div>

        {/* Row 8: Primary HSN / SAC Code */}
        <div className="gst-form-group">
          <label htmlFor="hsnSacCode" className="gst-form-label">
            Primary HSN / SAC Code <span className="gst-required-star">*</span>
          </label>
          <input
            id="hsnSacCode"
            type="text"
            className={`gst-form-input ${errors.hsnSacCode ? 'gst-input--error' : ''}`}
            placeholder="e.g. 998311"
            value={data.hsnSacCode}
            onChange={handleHsnSacChange}
          />
          {errors.hsnSacCode && <span className="gst-field-error">{errors.hsnSacCode}</span>}
        </div>
      </div>
    </div>
  )
}

export default GSTBusinessDetails

import React from 'react'
import {
  CalendarIcon,
  GlobeIcon,
  DocumentCategoryIcon,
  type AssessmentYearOption,
  type ResidentialStatusOption,
  type FilingTypeOption,
} from './itrCategories.constants'

export interface ItrFilingOptionsProps {
  assessmentYear: AssessmentYearOption
  onAssessmentYearChange: (ay: AssessmentYearOption) => void
  residentialStatus: ResidentialStatusOption
  onResidentialStatusChange: (status: ResidentialStatusOption) => void
  filingType: FilingTypeOption
  onFilingTypeChange: (ft: FilingTypeOption) => void
}

const AY_OPTIONS: { ay: AssessmentYearOption; fy: string }[] = [
  { ay: 'AY 2026-27', fy: 'FY 2025-2026' },
  { ay: 'AY 2027-28', fy: 'FY 2026-2027' },
  { ay: 'AY 2025-26', fy: 'FY 2024-2025' },
]

const RESIDENTIAL_OPTIONS: {
  id: ResidentialStatusOption
  label: string
  desc: string
}[] = [
  {
    id: 'resident',
    label: 'Resident',
    desc: 'Applicable to individuals residing primarily in India during the financial year.',
  },
  {
    id: 'nri',
    label: 'Non-Resident (NRI)',
    desc: 'Applicable to individuals residing outside India during the financial year.',
  },
  {
    id: 'rnor',
    label: 'Resident but NOR',
    desc: 'Applicable to individuals who are resident in India but Not Ordinarily Resident.',
  },
]

const FILING_OPTIONS: {
  id: FilingTypeOption
  label: string
  subtext: string
}[] = [
  {
    id: 'original',
    label: 'Original Return (u/s 139(1))',
    subtext: 'Filing on or before statutory due date.',
  },
  {
    id: 'belated',
    label: 'Belated Return (u/s 139(4))',
    subtext: 'Filing after statutory due date with applicable late fees.',
  },
  {
    id: 'revised',
    label: 'Revised Return (u/s 139(5))',
    subtext: 'Correct omission or error in previously filed return.',
  },
  {
    id: 'updated',
    label: 'Updated Return (ITR-U) (u/s 139(8A))',
    subtext: 'Filing within 24 months from the end of relevant AY.',
  },
]

export const ItrFilingOptionsCard: React.FC<ItrFilingOptionsProps> = ({
  assessmentYear,
  onAssessmentYearChange,
  residentialStatus,
  onResidentialStatusChange,
  filingType,
  onFilingTypeChange,
}) => {
  const activeResidentialOption =
    RESIDENTIAL_OPTIONS.find((r) => r.id === residentialStatus) || null

  return (
    <>
      {/* Assessment Year Card */}
      <section className="itr-info-card" aria-labelledby="ay-heading">
        <div className="itr-info-card__title-row">
          <div className="itr-info-card__icon-wrap">
            <CalendarIcon size={20} />
          </div>
          <h2 id="ay-heading" className="itr-info-card__title">
            Assessment Year (AY)
          </h2>
        </div>

        <p className="itr-info-card__desc">
          Select the assessment year for which you are filing this income tax return.
        </p>

        <div className="itr-ay-buttons-grid">
          {AY_OPTIONS.map((opt) => (
            <button
              key={opt.ay}
              type="button"
              className={`itr-ay-btn ${assessmentYear === opt.ay ? 'itr-ay-btn--active' : ''}`}
              onClick={() => onAssessmentYearChange(opt.ay)}
            >
              <span className="itr-ay-main">{opt.ay}</span>
              <span className="itr-ay-sub">{opt.fy}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Residential Status Card */}
      <section className="itr-info-card" aria-labelledby="res-heading">
        <div className="itr-info-card__title-row">
          <div className="itr-info-card__icon-wrap">
            <GlobeIcon size={20} />
          </div>
          <h2 id="res-heading" className="itr-info-card__title">
            Residential Status
          </h2>
        </div>

        <p className="itr-info-card__desc">
          Select your residential status in India for the selected financial year.
        </p>

        <div className="itr-status-group">
          <div className="itr-status-buttons">
            {RESIDENTIAL_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`itr-status-btn ${residentialStatus === opt.id ? 'itr-status-btn--active' : ''}`}
                onClick={() => onResidentialStatusChange(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {activeResidentialOption ? (
            <div className="itr-info-callout">
              <span className="itr-info-callout__text">
                Selected Status: <strong>{activeResidentialOption.label}</strong> – {activeResidentialOption.desc}
              </span>
            </div>
          ) : (
            <div className="itr-info-callout">
              <span className="itr-info-callout__text" style={{ fontStyle: 'italic', color: '#64748b' }}>
                Please select your residential status above.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Filing Type Card */}
      <section className="itr-info-card" aria-labelledby="filing-type-heading">
        <div className="itr-info-card__title-row">
          <div className="itr-info-card__icon-wrap">
            <DocumentCategoryIcon size={20} />
          </div>
          <h2 id="filing-type-heading" className="itr-info-card__title">
            Filing Type
          </h2>
        </div>

        <p className="itr-info-card__desc">
          Select your return filing type according to the Income Tax Act, 1961.
        </p>

        <div className="itr-filing-options-list">
          {FILING_OPTIONS.map((f) => {
            const isSelected = filingType === f.id
            return (
              <label
                key={f.id}
                className={`itr-filing-option-card ${isSelected ? 'itr-filing-option-card--active' : ''}`}
              >
                <div className="itr-radio-outer">
                  <input
                    type="radio"
                    name="filingType"
                    value={f.id}
                    checked={isSelected}
                    onChange={() => onFilingTypeChange(f.id)}
                    className="itr-filing-radio-input"
                  />
                  <span className={`itr-custom-radio ${isSelected ? 'itr-custom-radio--checked' : ''}`} />
                </div>
                <div className="itr-filing-option-text">
                  <span className="itr-filing-option-title">{f.label}</span>
                  <span className="itr-filing-option-desc">{f.subtext}</span>
                </div>
              </label>
            )
          })}
        </div>
      </section>
    </>
  )
}

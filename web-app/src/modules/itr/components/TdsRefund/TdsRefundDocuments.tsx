import React, { useState, useRef } from 'react'
import { TDS_DOCUMENTS, DocIcons, type TdsDocumentConfig } from './tdsRefundDocuments.constants'
import { StepActionBar } from '@shared/components'
import { TdsRefundDocumentsSidebar } from './TdsRefundDocumentsSidebar'
import './TdsRefundDocuments.css'

export interface UploadedFileMeta {
  name: string
  size: string
}

export interface TdsRefundDocumentsProps {
  onBack: () => void
  onNext?: () => void
  onSaveDraft?: () => void
  initialUploads?: Record<string, UploadedFileMeta>
  onUploadsChange?: (uploads: Record<string, UploadedFileMeta>) => void
}

const STEPS = [
  { num: 1, label: 'Customer & Income' },
  { num: 2, label: 'Upload Documents' },
  { num: 3, label: 'CA Verification' },
  { num: 4, label: 'Refund Filing' },
  { num: 5, label: 'Refund Credited' },
]

export const TdsRefundDocuments: React.FC<TdsRefundDocumentsProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  initialUploads,
  onUploadsChange,
}) => {
  const [uploads, setUploads] = useState<Record<string, UploadedFileMeta>>(initialUploads || {})
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const totalCount = TDS_DOCUMENTS.length
  const uploadedCount = Object.keys(uploads).length
  const percent = Math.round((uploadedCount / totalCount) * 100)

  const handleFileChange = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1)
    setUploads((prev) => {
      const next = {
        ...prev,
        [docId]: {
          name: file.name,
          size: `${sizeInMb}MB`,
        },
      }
      onUploadsChange?.(next)
      return next
    })
  }

  const handleRemove = (docId: string) => {
    setUploads((prev) => {
      const updated = { ...prev }
      delete updated[docId]
      onUploadsChange?.(updated)
      return updated
    })
    const inputEl = fileInputRefs.current[docId]
    if (inputEl) inputEl.value = ''
  }

  const triggerUpload = (docId: string) => {
    fileInputRefs.current[docId]?.click()
  }

  const isStep2Valid = TDS_DOCUMENTS.every(
    (doc) => !doc.required || Boolean(uploads[doc.id])
  )

  return (
    <div className="tds-docs-page">
      {/* 5-Step Stepper Track Centered at Top */}
      <div className="tds-docs-stepper-wrap">
        <div className="tds-stepper-track" aria-label="Step progress" data-testid="tds-stepper-track">
          {STEPS.map((s, idx) => {
            const isDotCompleted = s.num < 2
            const isDotActive = s.num === 2
            const dotClass = isDotCompleted
              ? 'tds-stepper-dot tds-stepper-dot--completed'
              : isDotActive
              ? 'tds-stepper-dot tds-stepper-dot--active'
              : 'tds-stepper-dot tds-stepper-dot--inactive'
            const lineClass = isDotCompleted ? 'tds-stepper-line tds-stepper-line--completed' : 'tds-stepper-line'
            return (
              <React.Fragment key={s.num}>
                <div className={dotClass} data-testid={`tds-step-${s.num}`} title={`Step ${s.num}: ${s.label}`}>{s.num}</div>
                {idx < STEPS.length - 1 && <div className={lineClass} data-testid={`tds-line-${s.num}`} />}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <div className="tds-docs-layout">
        {/* Left / Main Column */}
        <main className="tds-docs-main">
          {/* Progress Tracker */}
          <div className="tds-docs-progress-card" data-testid="tds-docs-progress">
            <div className="tds-docs-progress-labels">
              <span className="tds-docs-progress-count" data-testid="tds-docs-count">
                {uploadedCount} of {totalCount} uploaded
              </span>
              <span className="tds-docs-progress-percent" data-testid="tds-docs-percent">
                {percent}%
              </span>
            </div>
            <div className="tds-docs-progress-bar-track">
              <div
                className="tds-docs-progress-bar-fill"
                style={{ width: `${percent}%` }}
                data-testid="tds-docs-progress-bar"
              />
            </div>
          </div>

          {/* Document Cards List */}
          <div className="tds-docs-list" role="list">
            {TDS_DOCUMENTS.map((doc: TdsDocumentConfig) => {
              const isUploaded = Boolean(uploads[doc.id])
              const fileData = uploads[doc.id]
              const IconComp = DocIcons[doc.id]

              return (
                <div
                  key={doc.id}
                  className={`tds-doc-card ${isUploaded ? 'tds-doc-card--uploaded' : ''}`}
                  data-testid={`tds-doc-card-${doc.id}`}
                >
                  <input
                    type="file"
                    accept={doc.accept}
                    style={{ display: 'none' }}
                    ref={(el) => {
                      fileInputRefs.current[doc.id] = el
                    }}
                    onChange={(e) => handleFileChange(doc.id, e)}
                    data-testid={`file-input-${doc.id}`}
                  />

                  <div className="tds-doc-info-wrap">
                    <div className="tds-doc-icon-box" style={{ background: doc.bgColor }}>
                      {IconComp ? <IconComp color={doc.iconColor} /> : null}
                    </div>
                    <div className="tds-doc-texts">
                      <div className="tds-doc-title-row">
                        <span className="tds-doc-title">{doc.title}</span>
                        {doc.required ? (
                          <span className="tds-doc-required-star" title="Required">*</span>
                        ) : (
                          <span className="tds-doc-optional-tag">(optional)</span>
                        )}
                      </div>
                      <span className="tds-doc-subtitle" title={doc.subtitle}>
                        {doc.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="tds-doc-action">
                    {isUploaded ? (
                      <div className="tds-doc-uploaded-state">
                        <span className="tds-doc-uploaded-pill" title={fileData?.name}>
                          ✓ {fileData?.name}
                        </span>
                        <button
                          type="button"
                          className="tds-doc-remove-btn"
                          onClick={() => handleRemove(doc.id)}
                          aria-label={`Remove ${doc.title}`}
                          title="Remove file"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="tds-doc-upload-btn"
                        onClick={() => triggerUpload(doc.id)}
                        data-testid={`upload-btn-${doc.id}`}
                      >
                        <span className="tds-doc-upload-arrow">↑</span>
                        <span>Upload</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </main>

        {/* Right Desktop Sidebar */}
        <TdsRefundDocumentsSidebar />
      </div>

      {/* Bottom Action Bar */}
      <StepActionBar
        onBack={onBack}
        onNext={onNext}
        nextLabel="Continue"
        nextDisabled={!isStep2Valid}
        nextTestId="tds-docs-proceed-btn"
        extraActions={
          onSaveDraft ? (
            <button
              type="button"
              className="step-action-bar__btn step-action-bar__btn--save-draft"
              onClick={onSaveDraft}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              <span>Save Draft &amp; Exit</span>
            </button>
          ) : undefined
        }
      />
    </div>
  )
}

export default TdsRefundDocuments

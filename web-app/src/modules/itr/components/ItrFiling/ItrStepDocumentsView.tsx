import React, { useRef } from 'react'
import { StepActionBar } from '@shared/components'
import {
  type UploadedDocInfo,
  REQUIRED_DOCS,
  RECOMMENDED_DOCS,
  ALL_DOCS,
} from './itrDocuments.constants'
import { ItrDocItemRow } from './ItrDocItemRow'
import { ItrStepHeaderStepper } from './ItrStepHeaderStepper'
import './ItrFilingSteps.css'
import './ItrPersonalInfo.css'

export type { UploadedDocInfo }

export interface ItrStepDocumentsViewProps {
  onBack: () => void
  onNext: () => void
  onSaveDraft?: () => void
  uploadedDocs: Record<string, UploadedDocInfo>
  onUploadDoc: (docId: string, doc: UploadedDocInfo) => void
  onRemoveDoc: (docId: string) => void
}

export const ItrStepDocumentsView: React.FC<ItrStepDocumentsViewProps> = ({
  onBack,
  onNext,
  onSaveDraft,
  uploadedDocs,
  onUploadDoc,
  onRemoveDoc,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const currentTargetDocId = useRef<string>('')

  const totalPossible = ALL_DOCS.length
  const uploadedCount = Object.keys(uploadedDocs).length
  const readyPercent = Math.round((uploadedCount / totalPossible) * 100)

  const handleTriggerUpload = (docId: string) => {
    currentTargetDocId.current = docId
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && currentTargetDocId.current) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2)
      onUploadDoc(currentTargetDocId.current, {
        id: currentTargetDocId.current,
        fileName: file.name,
        fileSize: `${sizeMb} MB`,
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const isStep4Valid = REQUIRED_DOCS.every(
    (doc) => !doc.isMandatory || Boolean(uploadedDocs[doc.id])
  )

  return (
    <div className="itr-step-view-container">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* 5-Step Progress Stepper */}
      <ItrStepHeaderStepper currentStepId={4} />

      {/* Status & Shield Card */}
      <div className="itr-step-card">
        <div className="itr-docs-status-bar">
          <span className="itr-docs-count-text">
            Documents Uploaded: {uploadedCount} of {totalPossible}
          </span>
          <span className="itr-badge-ready">{readyPercent}% Ready</span>
        </div>

        <div className="itr-docs-shield-card">
          <div className="itr-docs-shield-icon" aria-hidden="true">🛡️</div>
          <div className="itr-docs-shield-content">
            <h3 className="itr-docs-shield-title">Document Checklist</h3>
            <p className="itr-docs-shield-sub">
              Upload applicable documents for CA review. PAN and Aadhaar identity are pre-verified from your profile.
            </p>
          </div>
        </div>
      </div>

      {/* Required Documents */}
      <div className="itr-step-card">
        <div className="itr-docs-section-title-wrap">
          <h3 className="itr-docs-section-title">Required Documents</h3>
          <span className="itr-badge-mandatory">Mandatory ({REQUIRED_DOCS.length})</span>
        </div>
        <div className="itr-docs-list">
          {REQUIRED_DOCS.map((doc) => (
            <ItrDocItemRow
              key={doc.id}
              doc={doc}
              uploaded={uploadedDocs[doc.id]}
              onTriggerUpload={handleTriggerUpload}
              onRemoveDoc={onRemoveDoc}
            />
          ))}
        </div>
      </div>

      {/* Recommended Documents */}
      <div className="itr-step-card">
        <div className="itr-docs-section-title-wrap">
          <h3 className="itr-docs-section-title">Recommended Documents</h3>
          <span className="itr-badge-recommended">Recommended ({RECOMMENDED_DOCS.length})</span>
        </div>
        <div className="itr-docs-list">
          {RECOMMENDED_DOCS.map((doc) => (
            <ItrDocItemRow
              key={doc.id}
              doc={doc}
              uploaded={uploadedDocs[doc.id]}
              onTriggerUpload={handleTriggerUpload}
              onRemoveDoc={onRemoveDoc}
            />
          ))}
        </div>
      </div>

      <StepActionBar
        onBack={onBack}
        onNext={onNext}
        backLabel="Back"
        nextLabel="Continue"
        nextDisabled={!isStep4Valid}
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

export default ItrStepDocumentsView

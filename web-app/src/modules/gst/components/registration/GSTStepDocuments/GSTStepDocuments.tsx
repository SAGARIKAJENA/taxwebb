import type { FC } from 'react'
import type { GSTStepDocumentsProps, DocumentCategory } from './gstDocuments.types'
import { useGstDocuments } from './useGstDocuments'
import { GSTDocChecklistHeader } from './GSTDocChecklistHeader'
import { GSTDocCard } from './GSTDocCard'
import { GSTDocPreviewModal } from './GSTDocPreviewModal'
import { AlertCircleIcon, SecurityShieldIcon } from './GSTDocIcons'
import { StepActionBar } from '@shared/components'
import './GSTStepDocuments.css'

export type { GSTStepDocumentsProps, UploadedDoc } from './gstDocuments.types'

const SECTION_CONFIG: Array<{ key: DocumentCategory; title: string }> = [
  { key: 'identity', title: 'IDENTITY PROOF' },
  { key: 'business', title: 'BUSINESS PROOF' },
  { key: 'financial', title: 'FINANCIAL & SIGNATORY' },
]

export const GSTStepDocuments: FC<GSTStepDocumentsProps> = ({
  initialDocuments,
  onDocumentsChange,
  onBack,
  onNext,
}) => {
  const {
    groupedDocs,
    completedCount,
    totalCount,
    progressPercent,
    replacingDocId,
    previewDoc,
    validationError,
    fileInputRef,
    cameraInputRef,
    handleTriggerUpload,
    handleTriggerCamera,
    handleFileSelected,
    handleDelete,
    handleStartReplace,
    handleCancelReplace,
    handleView,
    handleClosePreview,
    handleAddressProofTypeChange,
    handleProceed,
  } = useGstDocuments(initialDocuments, onDocumentsChange)

  return (
    <div className="gst-docs-page">
      {/* Hidden inputs for document file picker & mobile camera capture */}
      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept=".pdf,.jpg,.jpeg,.png,.docx"
        onChange={handleFileSelected}
        aria-label="Upload document file"
      />
      <input
        type="file"
        ref={cameraInputRef}
        hidden
        accept="image/*"
        capture="environment"
        onChange={handleFileSelected}
        aria-label="Capture document via camera"
      />

      {/* Checklist Progress Header */}
      <GSTDocChecklistHeader
        completedCount={completedCount}
        totalCount={totalCount}
        progressPercent={progressPercent}
      />

      {/* Validation Alert */}
      {validationError && (
        <div className="gst-docs-validation-alert" role="alert">
          <AlertCircleIcon className="gst-docs-alert-icon" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Categorized Document Proof Sections */}
      {SECTION_CONFIG.map(({ key, title }) => (
        <section key={key} className="gst-docs-section">
          <h3 className="gst-docs-section-heading">{title}</h3>
          <div className="gst-docs-list">
            {groupedDocs[key].map((doc) => (
              <GSTDocCard
                key={doc.id}
                doc={doc}
                isReplacing={replacingDocId === doc.id}
                onTriggerCamera={handleTriggerCamera}
                onTriggerUpload={handleTriggerUpload}
                onStartReplace={handleStartReplace}
                onCancelReplace={handleCancelReplace}
                onDelete={handleDelete}
                onView={handleView}
                onAddressProofChange={handleAddressProofTypeChange}
              />
            ))}
          </div>

        )}

        {/* Dropzone */}
        <div
          className={`gst-dropzone ${isDragging ? 'gst-dropzone--active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.xlsx,.docx"
            className="gst-dropzone__file-input"
            onChange={handleFileInput}
          />

          <div className="gst-dropzone__icon-circle">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="gst-dropzone__icon"
            >
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            </svg>
          </div>

          <p className="gst-dropzone__heading">Drag files here</p>
          <p className="gst-dropzone__sub">
            PDF, JPG, PNG, XLSX or DOCX — up to 10 MB each
          </p>

          <button
            type="button"
            className="gst-btn-browse"
            onClick={(e) => {
              e.stopPropagation()
              fileInputRef.current?.click()
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', marginRight: '6px' }}>
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M12 12v9" />
              <path d="m16 16-4-4-4 4" />
            </svg>
            Upload File
          </button>
        </div>

        {/* Uploaded Documents List */}
        <div className="gst-doc-list">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className={`gst-doc-item gst-doc-item--${doc.status}`}
            >
              <div className="gst-doc-item__main">
                <div className={`gst-doc-item__icon-wrapper gst-doc-item__icon-wrapper--${doc.status}`}>
                  {doc.status === 'verified' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {doc.status === 'uploading' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  )}
                  {doc.status === 'rejected' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="12 2 2 22 22 22 12 2" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  )}
                </div>

                <div className="gst-doc-item__info">
                  <div className="gst-doc-item__name-row">
                    <span className="gst-doc-item__filename">{doc.name}</span>
                  </div>

                  {doc.status === 'rejected' ? (
                    <p className="gst-doc-item__error-text">{doc.errorText}</p>
                  ) : (
                    <p className="gst-doc-item__meta">
                      {doc.sizeText} · {doc.dateText}
                    </p>
                  )}
                </div>

                <div className="gst-doc-item__actions">
                  {doc.status === 'verified' && (
                    <div className="gst-doc-item__action-group">
                      <span className="gst-doc-badge gst-doc-badge--verified">
                        • Verified
                      </span>
                      <button
                        type="button"
                        className="gst-btn-doc-action"
                        onClick={() => handleCancelUpload(doc.id)}
                        title="Remove document"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {doc.status === 'uploading' && (
                    <div className="gst-doc-item__action-group">
                      <span className="gst-doc-badge gst-doc-badge--uploading">
                        • Uploading
                      </span>
                      <button
                        type="button"
                        className="gst-btn-doc-action"
                        onClick={() => handleCancelUpload(doc.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {doc.status === 'rejected' && (
                    <div className="gst-doc-item__action-group">
                      <span className="gst-doc-badge gst-doc-badge--rejected">
                        • Rejected
                      </span>
                      <button
                        type="button"
                        className="gst-btn-doc-action"
                        onClick={() => handleReplace(doc.id)}
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        className="gst-btn-doc-action"
                        onClick={() => handleCancelUpload(doc.id)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Line */}
              {doc.status !== 'rejected' && (
                <div className="gst-doc-item__progress-bar">
                  <div
                    className={`gst-doc-item__progress-fill gst-doc-item__progress-fill--${doc.status}`}
                    style={{ width: `${doc.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="gst-step-actions">
          <button
            type="button"
            className="gst-btn-back"
            onClick={onBack}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="gst-btn-back-arrow"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Business
          </button>

        </section>
      ))}


      {/* Security and Compliance Banner */}
      <aside className="gst-docs-security-banner" aria-label="Security and Compliance">
        <div className="gst-docs-security-icon-circle" aria-hidden="true">
          <SecurityShieldIcon width={18} height={18} />
        </div>
        <p className="gst-docs-security-text">
          Your documents are encrypted and safely stored in compliance with GST data protection standards.
        </p>
      </aside>

      {/* Step Navigation Bar */}
      <StepActionBar
        onBack={onBack}
        onNext={() => handleProceed(onNext)}
        nextDisabled={completedCount < totalCount}
        nextLabel="Continue"
      />

      {/* Document Preview Modal */}
      <GSTDocPreviewModal previewDoc={previewDoc} onClose={handleClosePreview} />
    </div>
  )
}

export default GSTStepDocuments

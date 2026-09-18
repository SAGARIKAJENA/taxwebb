import React, { useRef } from 'react'
import { validateByPlaceholder } from '@shared/utils/inputValidation'
import type { UploadedFileInfo } from './TaxNoticeAssistance'

export interface Step1Props {
  noticeDocUploaded: boolean
  uploadedFile: UploadedFileInfo | null
  onFileSelect: (file: File) => void
  onRemoveFile: () => void
  noticeNumber: string
  setNoticeNumber: (val: string) => void
  noticeDate: string
  setNoticeDate: (val: string) => void
  uploadError?: string
  noticeNumberError?: string
}

export const NoticeStep1View: React.FC<Step1Props> = ({
  noticeDocUploaded,
  uploadedFile,
  onFileSelect,
  onRemoveFile,
  noticeNumber,
  setNoticeNumber,
  noticeDate,
  setNoticeDate,
  uploadError,
  noticeNumberError,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
    e.target.value = ''
  }

  return (
    <>
      <div>
        <h2 className="notice-flow-card-heading">
          Received a notice from the Income Tax Department?
        </h2>
        <p className="notice-flow-card-subheading">
          Upload it here — we need the actual notice to understand what is being asked.
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        aria-label="Upload Notice Document"
      />

      {/* Notice document upload row */}
      <div
        className={`notice-upload-hero-row ${
          uploadError ? 'notice-upload-hero-row--error' : ''
        } ${noticeDocUploaded ? 'notice-upload-hero-row--uploaded' : ''}`}
      >
        <div className="notice-upload-hero-left">
          <div className="notice-upload-hero-icon">
            {noticeDocUploaded ? '✓' : '↑'}
          </div>
          <div>
            <div className="notice-upload-hero-title">Notice document</div>
            {uploadedFile ? (
              <div className="notice-uploaded-file-meta">
                <span className="notice-uploaded-filename">📄 {uploadedFile.name}</span>
                <span className="notice-uploaded-filesize">({uploadedFile.size})</span>
              </div>
            ) : (
              <div className="notice-upload-hero-sub">
                Photo or PDF of the notice · up to 10 MB
              </div>
            )}
          </div>
        </div>

        <div className="notice-upload-actions">
          {uploadedFile && (
            <button
              type="button"
              className="notice-upload-remove-btn"
              onClick={onRemoveFile}
              title="Remove document"
              aria-label="Remove notice file"
            >
              ✕ Remove
            </button>
          )}
          <button
            type="button"
            className={`notice-upload-hero-btn ${
              noticeDocUploaded ? 'notice-upload-hero-btn--done' : ''
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            {noticeDocUploaded ? '✓ Uploaded' : 'Upload'}
          </button>
        </div>
      </div>

      {uploadError && (
        <div className="notice-validation-error-box">
          <span className="notice-validation-error-icon">⚠️</span>
          <span className="notice-validation-error-text">{uploadError}</span>
        </div>
      )}

      <div className="notice-form-row-2">
        <div className="notice-input-group">
          <label className="notice-input-label">
            Notice Number <span style={{ color: '#ea580c' }}>*</span>
          </label>
          <input
            type="text"
            className={`notice-text-input ${
              noticeNumberError ? 'notice-text-input--error' : ''
            }`}
            value={noticeNumber}
            onChange={(e) => setNoticeNumber(e.target.value)}
            placeholder="e.g. CPC/2526/A3/284419260"
          />
          {noticeNumberError && (
            <span className="notice-field-error-text">⚠️ {noticeNumberError}</span>
          )}
        </div>

        <div className="notice-input-group">
          <label className="notice-input-label">Date on the notice</label>
          <input
            type="text"
            className={`notice-text-input ${
              noticeDate && !validateByPlaceholder(noticeDate, 'DD-MM-YYYY').isValid
                ? 'notice-text-input--error'
                : ''
            }`}
            value={noticeDate}
            onChange={(e) => setNoticeDate(e.target.value)}
            placeholder="DD-MM-YYYY"
          />
          {noticeDate && !validateByPlaceholder(noticeDate, 'DD-MM-YYYY').isValid && (
            <span className="notice-field-error-text">
              ⚠️ {validateByPlaceholder(noticeDate, 'DD-MM-YYYY').error}
            </span>
          )}
        </div>
      </div>

      <div className="notice-notice-box notice-notice-box--blue">
        <div className="notice-notice-title">Do not panic about a notice</div>
        <div className="notice-notice-desc">
          ⓘ Most notices are routine — a mismatch with your AIS, or a request for one clarification.
          Upload it and we will tell you exactly what it means.
        </div>
      </div>
    </>
  )
}

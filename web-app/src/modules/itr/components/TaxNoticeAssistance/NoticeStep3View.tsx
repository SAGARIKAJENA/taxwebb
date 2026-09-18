import React, { useRef } from 'react'
import {
  NOTICE_CHECKLIST_DOCS,
  type NoticeUploadItem,
  type UploadedFileInfo,
} from './TaxNoticeAssistance'

interface ChecklistRowProps {
  doc: NoticeUploadItem
  isUploaded: boolean
  fileInfo?: UploadedFileInfo
  onFileSelect: (file: File) => void
  onRemoveDoc: () => void
}

const NoticeChecklistRow: React.FC<ChecklistRowProps> = ({
  doc,
  isUploaded,
  fileInfo,
  onFileSelect,
  onRemoveDoc,
}) => {
  const rowInputRef = useRef<HTMLInputElement>(null)

  const handleRowFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) onFileSelect(f)
    e.target.value = ''
  }

  return (
    <div className={`notice-upload-row ${isUploaded ? 'notice-upload-row--done' : ''}`}>
      <input
        type="file"
        ref={rowInputRef}
        style={{ display: 'none' }}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleRowFileChange}
        aria-label={`Upload ${doc.title}`}
      />
      <div className="notice-upload-row-left">
        <div className="notice-upload-icon">{isUploaded ? '✓' : '↑'}</div>
        <div>
          <div className="notice-upload-name">{doc.title}</div>
          {fileInfo ? (
            <div className="notice-uploaded-file-meta">
              <span className="notice-uploaded-filename">📄 {fileInfo.name}</span>
              <span className="notice-uploaded-filesize">({fileInfo.size})</span>
            </div>
          ) : (
            <div className="notice-upload-formats">{doc.formats}</div>
          )}
        </div>
      </div>
      <div className="notice-upload-actions">
        {fileInfo && (
          <button
            type="button"
            className="notice-upload-remove-btn"
            onClick={onRemoveDoc}
            title="Remove file"
            aria-label={`Remove ${doc.title}`}
          >
            ✕
          </button>
        )}
        <button
          type="button"
          className={`notice-upload-btn ${isUploaded ? 'notice-upload-btn--done' : ''}`}
          onClick={() => rowInputRef.current?.click()}
        >
          {isUploaded ? '✓ Uploaded' : 'Upload'}
        </button>
      </div>
    </div>
  )
}

export interface Step3Props {
  uploadedDocs: Record<string, boolean>
  uploadedFiles: Record<string, UploadedFileInfo>
  onFileSelect: (id: string, file: File) => void
  onRemoveDoc: (id: string) => void
  explanation: string
  setExplanation: (val: string) => void
  checklistError?: string
}

export const NoticeStep3View: React.FC<Step3Props> = ({
  uploadedDocs,
  uploadedFiles,
  onFileSelect,
  onRemoveDoc,
  explanation,
  setExplanation,
  checklistError,
}) => {
  const uploadedCount = NOTICE_CHECKLIST_DOCS.filter((d) => uploadedDocs[d.id]).length

  return (
    <>
      <div>
        <h2 className="notice-flow-card-heading">We need a few more details to respond</h2>
        <p className="notice-flow-card-subheading">
          This checklist is built from what this specific notice asks for — nothing more.
        </p>
      </div>

      <div className="notice-checklist-meta">
        <span className="notice-checklist-count">{uploadedCount} of 4 uploaded</span>
        <span className="notice-checklist-badge">● Dynamic checklist · Section 143(1)(a)</span>
      </div>

      {checklistError && (
        <div className="notice-validation-error-box">
          <span className="notice-validation-error-icon">⚠️</span>
          <span className="notice-validation-error-text">{checklistError}</span>
        </div>
      )}

      <div className="notice-upload-list">
        {NOTICE_CHECKLIST_DOCS.map((doc: NoticeUploadItem) => {
          const isUploaded = Boolean(uploadedDocs[doc.id])
          const fileInfo = uploadedFiles[doc.id]
          return (
            <NoticeChecklistRow
              key={doc.id}
              doc={doc}
              isUploaded={isUploaded}
              fileInfo={fileInfo}
              onFileSelect={(file) => onFileSelect(doc.id, file)}
              onRemoveDoc={() => onRemoveDoc(doc.id)}
            />
          )
        })}
      </div>

      <div className="notice-input-group">
        <label className="notice-input-label">
          Was this interest income reported anywhere else on your return?
        </label>
        <textarea
          className="notice-text-input notice-textarea"
          placeholder="If yes, tell us where — it usually resolves the notice outright"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
      </div>

      <div className="notice-notice-box notice-notice-box--blue">
        <div className="notice-notice-title">Different notice, different list</div>
        <div className="notice-notice-desc">
          ⓘ A 139(9) defective-return notice or a scrutiny notice would generate a completely
          different checklist here.
        </div>
      </div>
    </>
  )
}

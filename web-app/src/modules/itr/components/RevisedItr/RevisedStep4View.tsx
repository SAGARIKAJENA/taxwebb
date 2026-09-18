import React, { useRef } from 'react'
import type { ItrUploadedFile } from '../../validation/itrUploadValidation'
import { REVISED_UPLOAD_ITEMS, type RevisedUploadItem } from './RevisedItr'

interface RevisedUploadRowProps {
  item: RevisedUploadItem
  file?: ItrUploadedFile
  onFileSelect: (id: string, file: File) => void
  onFileRemove: (id: string) => void
}

const RevisedUploadRow: React.FC<RevisedUploadRowProps> = ({
  item,
  file,
  onFileSelect,
  onFileRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  return (
    <div className={`revised-upload-row ${file ? 'revised-upload-row--done' : ''}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        style={{ display: 'none' }}
        onChange={(e) => {
          const picked = e.target.files?.[0]
          if (picked) onFileSelect(item.id, picked)
          e.target.value = ''
        }}
      />
      <div className="revised-upload-row-left">
        <div className="revised-upload-icon">{file ? '✓' : '↑'}</div>
        <div>
          <div className="revised-upload-name">{item.title}</div>
          <div className="revised-upload-formats">
            {file ? (
              <span className="revised-uploaded-file-meta">
                📎 {file.name} ({file.size})
              </span>
            ) : (
              item.sub
            )}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {file && (
          <button
            type="button"
            className="revised-upload-remove-btn"
            onClick={() => onFileRemove(item.id)}
            title="Remove document"
          >
            ✕ Remove
          </button>
        )}
        <button
          type="button"
          className={`revised-upload-btn ${file ? 'revised-upload-btn--done' : ''}`}
          onClick={() => fileInputRef.current?.click()}
        >
          {file ? '✓ Uploaded' : 'Upload'}
        </button>
      </div>
    </div>
  )
}

export interface Step4Props {
  uploadedFiles: Record<string, ItrUploadedFile>
  onFileSelect: (id: string, file: File) => void
  onFileRemove: (id: string) => void
  uploadError: string | null
  notes: string
  setNotes: (val: string) => void
}

export const RevisedStep4View: React.FC<Step4Props> = ({
  uploadedFiles,
  onFileSelect,
  onFileRemove,
  uploadError,
  notes,
  setNotes,
}) => (
  <>
    <div>
      <h2 className="revised-flow-card-heading">Upload anything supporting the correction</h2>
      <p className="revised-flow-card-subheading">
        This gives your Tax Executive proof for the change being made. Max size: 10MB (PDF, JPG, PNG).
      </p>
    </div>

    {uploadError && (
      <div className="revised-validation-error-box">
        ⚠️ {uploadError}
      </div>
    )}

    <div className="revised-upload-list">
      {REVISED_UPLOAD_ITEMS.map((item: RevisedUploadItem) => (
        <RevisedUploadRow
          key={item.id}
          item={item}
          file={uploadedFiles[item.id]}
          onFileSelect={onFileSelect}
          onFileRemove={onFileRemove}
        />
      ))}
    </div>

    <div className="revised-input-group">
      <label className="revised-input-label">Anything else the executive should know</label>
      <textarea
        className="revised-text-input revised-textarea"
        placeholder="Optional note about the correction"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  </>
)

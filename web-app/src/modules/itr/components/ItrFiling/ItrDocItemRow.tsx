import React from 'react'
import {
  type ChecklistDocConfig,
  type UploadedDocInfo,
  IconUpload,
} from './itrDocuments.constants'

export interface ItrDocItemRowProps {
  doc: ChecklistDocConfig
  uploaded?: UploadedDocInfo
  onTriggerUpload: (docId: string) => void
  onRemoveDoc: (docId: string) => void
}

export const ItrDocItemRow: React.FC<ItrDocItemRowProps> = ({
  doc,
  uploaded,
  onTriggerUpload,
  onRemoveDoc,
}) => {
  return (
    <div className={`itr-doc-item ${uploaded ? 'itr-doc-item--uploaded' : ''}`}>
      <div className="itr-doc-item__left">
        <div className="itr-doc-icon-box" aria-hidden="true">
          <doc.Icon />
        </div>
        <div className="itr-doc-item__titles">
          <h4 className="itr-doc-item__title">{doc.title}</h4>
          <p className="itr-doc-item__desc">{doc.desc}</p>
          {uploaded && (
            <div className="itr-doc-uploaded-meta">
              <span>✓ {uploaded.fileName}</span>
              <span>({uploaded.fileSize})</span>
            </div>
          )}
        </div>
      </div>

      <div className="itr-doc-item__actions">
        {uploaded ? (
          <button
            type="button"
            className="itr-btn-remove-doc"
            onClick={() => onRemoveDoc(doc.id)}
            aria-label={`Remove ${doc.title}`}
          >
            Remove
          </button>
        ) : (
          <button
            type="button"
            className="itr-btn-upload"
            onClick={() => onTriggerUpload(doc.id)}
            aria-label={`Upload ${doc.title}`}
          >
            <IconUpload />
            <span>Upload File</span>
          </button>
        )}
      </div>
    </div>
  )
}

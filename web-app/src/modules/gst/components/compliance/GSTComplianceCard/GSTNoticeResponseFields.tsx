import React, { useState, useRef } from 'react'
import './GSTComplianceUploadFields.css'

export const GSTNoticeResponseFields: React.FC = () => {
  const [noticeNumber, setNoticeNumber] = useState('')
  const [issueDate, setIssueDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [noticeFile, setNoticeFile] = useState<File | null>(null)
  const [additionalInfo, setAdditionalInfo] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNoticeFile(e.target.files[0])
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  return (
    <div className="gst-comp-doc-card">
      <div className="gst-comp-doc-header">
        <span className="gst-comp-doc-header-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </span>
        <h3 className="gst-comp-doc-header-title">Notice Response Details</h3>
      </div>

      <div className="gst-comp-doc-body">
        {/* Row 1: Notice Number (Full Width) */}
        <div className="gst-comp-field-group">
          <label className="gst-comp-label">
            Enter notice number <span className="gst-comp-star">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. ZD2908260000123"
            value={noticeNumber}
            onChange={(e) => setNoticeNumber(e.target.value)}
            className="gst-comp-input"
          />
        </div>

        {/* Row 2: 2-Column Row for Notice Issue Date & Reply Due Date */}
        <div className="gst-comp-grid-row">
          <div className="gst-comp-field-group">
            <label className="gst-comp-label">
              Notice Issue Date <span className="gst-comp-star">*</span>
            </label>
            <div className="gst-comp-date-wrapper">
              <span className="gst-comp-date-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="gst-comp-date-input"
              />
            </div>
          </div>

          <div className="gst-comp-field-group">
            <label className="gst-comp-label">
              Reply Due Date <span className="gst-comp-star">*</span>
            </label>
            <div className="gst-comp-date-wrapper">
              <span className="gst-comp-date-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="gst-comp-date-input"
              />
            </div>
          </div>
        </div>

        {/* Row 3: Upload Notice Copy (Horizontal Card Row matching Reconciliation document cards) */}
        <div className="gst-comp-doc-row">
          <div className="gst-comp-doc-info">
            <span className="gst-comp-doc-type-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </span>
            <div className="gst-comp-doc-text">
              <div className="gst-comp-doc-title-wrapper">
                <h4 className="gst-comp-doc-name">Department Notice Copy</h4>
                <span className="gst-comp-req-badge">REQUIRED</span>
              </div>
              <p className="gst-comp-doc-sub">Upload official GST department notice copy (PDF/Image)</p>
            </div>
          </div>

          <div className="gst-comp-doc-actions">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept=".pdf,.png,.jpg,.jpeg"
            />

            {!noticeFile ? (
              <div className="gst-comp-upload-cta">
                <button
                  type="button"
                  className="gst-comp-upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload File
                </button>
                <span className="gst-comp-format-hint">Supported formats: PDF, JPG, PNG (Max 10 MB)</span>
              </div>
            ) : (
              <div className="gst-comp-uploaded-file-bar">
                <div className="gst-comp-file-details">
                  <span className="gst-comp-file-check">✓</span>
                  <span className="gst-comp-file-name">{noticeFile.name}</span>
                  <span className="gst-comp-file-size">({formatFileSize(noticeFile.size)})</span>
                </div>
                <div className="gst-comp-file-controls">
                  <button
                    type="button"
                    className="gst-comp-replace-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                    Replace
                  </button>
                  <button
                    type="button"
                    className="gst-comp-delete-btn"
                    onClick={() => setNoticeFile(null)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Row 4: Additional Information Textarea */}
        <div className="gst-comp-field-group">
          <label className="gst-comp-label">Additional Information</label>
          <div className="gst-comp-textarea-wrapper">
            <textarea
              rows={3}
              maxLength={500}
              placeholder="Add any important information for our CA..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="gst-comp-textarea"
            />
            <span className="gst-comp-char-counter">{additionalInfo.length}/500</span>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { GSTFilingStepper } from '../GSTFilingPeriod/GSTFilingStepper'
import { GSTDocumentRow } from './GSTDocumentRow'
import { GSTDocumentChecklistHeader } from './GSTDocumentChecklistHeader'
import {
  DOCUMENT_CATEGORIES,
  DEFAULT_DOCUMENT_ITEMS,
  type UploadedFileInfo,
} from './gstDocumentsData'
import './GSTFilingDocuments.css'

export interface GSTFilingDocumentsProps {
  selectedMonth?: string
  baseFee?: number
  returnType?: string
  frequency?: string
  onBack: () => void
  onNext: () => void
}

const formatFileSize = (bytes: number): string => {
  const mb = bytes / (1024 * 1024)
  if (mb >= 1) {
    return `${mb.toFixed(1)} MB`
  }
  const kb = Math.round(bytes / 1024)
  return `${Math.max(1, kb)} KB`
}

export const GSTFilingDocuments: React.FC<GSTFilingDocumentsProps> = ({
  selectedMonth,
  returnType,
  frequency = 'Quarterly',
  onBack,
  onNext,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFileInfo>>({})

  // Format return type and period labels to match reference screenshot
  const returnTypeDisplay =
    !returnType || returnType === 'combo'
      ? 'gstr1_3b_monthly'
      : returnType === 'gstr1'
      ? 'gstr1_qrmp'
      : returnType

  const periodDisplay = selectedMonth?.trim()
    ? selectedMonth.includes('(Q')
      ? selectedMonth
      : `${selectedMonth} (Q1)`
    : 'December 2025 (Q1)'

  const periodShort = selectedMonth?.trim() || 'December 2025'

  const completedCount = Object.keys(uploadedFiles).length
  const totalCount = DEFAULT_DOCUMENT_ITEMS.length

  const handleFileUpload = (id: string, file: File) => {
    const sizeText = formatFileSize(file.size)
    const fileUrl = URL.createObjectURL(file)
    const fileInfo: UploadedFileInfo = {
      name: file.name,
      sizeText,
      uploadTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fileUrl,
    }
    setUploadedFiles((prev) => ({
      ...prev,
      [id]: fileInfo,
    }))
  }

  const handleFileRemove = (id: string) => {
    setUploadedFiles((prev) => {
      const copy = { ...prev }
      delete copy[id]
      return copy
    })
  }

  return (
    <div className="gst-docs-page">
      {/* Stepper and Right Meta Badge */}
      <div className="gst-docs-top-bar">
        <div className="gst-docs-stepper-wrap">
          <GSTFilingStepper currentStep={3} />
        </div>
        <div className="gst-docs-top-meta">
          <span className="gst-docs-top-meta__label">GST Return</span>
          <span className="gst-docs-top-meta__return-type">{returnTypeDisplay}</span>
          <span className="gst-docs-top-meta__period">{periodDisplay}</span>
        </div>
      </div>

      {/* Main Page Header */}
      <header className="gst-docs-header">
        <h1 className="gst-docs-title">Filing Documents</h1>
        <p className="gst-docs-subtitle">
          Upload the required documents for your GST return. Clear invoices ensure 100% accurate Input Tax Credit (ITC) claim.
        </p>
      </header>

      {/* Blue Banner & Checklist Progress Header */}
      <GSTDocumentChecklistHeader
        returnLabel={returnTypeDisplay}
        periodLabel={periodShort}
        completedCount={completedCount}
        totalCount={totalCount}
        frequencyLabel={frequency}
      />

      {/* Categorized Document Items */}
      {DOCUMENT_CATEGORIES.map((category) => {
        const items = DEFAULT_DOCUMENT_ITEMS.filter((item) => item.categoryId === category.id)
        if (items.length === 0) return null

        return (
          <section key={category.id} className="gst-docs-category-section" aria-label={category.title}>
            <h3 className="gst-docs-category-title">{category.title}</h3>
            <div className="gst-docs-category-items">
              {items.map((item) => (
                <GSTDocumentRow
                  key={item.id}
                  item={item}
                  uploadedFile={uploadedFiles[item.id]}
                  onFileUpload={handleFileUpload}
                  onFileRemove={handleFileRemove}
                />
              ))}
            </div>
          </section>
        )
      })}

      {/* Security Footer Note */}
      <div className="gst-docs-security-note" role="note">
        <div className="gst-docs-security-note__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        </div>
        <p className="gst-docs-security-note__text">
          TaxEdge uses end-to-end 256-bit encryption for filing proofs. Only certified Chartered Accountants review your books.
        </p>
      </div>

      {/* Bottom Action Buttons */}
      <footer className="gst-docs-actions">
        <button
          type="button"
          className="gst-docs-btn-back"
          onClick={onBack}
        >
          ← Back
        </button>
        <button
          type="button"
          className="gst-docs-btn-continue"
          onClick={onNext}
        >
          Continue to Review →
        </button>
      </footer>
    </div>
  )
}

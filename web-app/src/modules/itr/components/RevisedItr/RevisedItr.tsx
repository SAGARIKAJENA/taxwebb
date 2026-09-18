import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import './RevisedItr.css'

const REASON_OPTIONS = [
  { id: 'missed_income', title: 'Missed Income', desc: 'Income not included in original return', bg: '#fff7ed', color: '#ea580c', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /></svg> },
  { id: 'wrong_deduction', title: 'Wrong Deduction', desc: 'Incorrect or missed deduction', bg: '#eff6ff', color: '#2563eb', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><line x1="16" y1="13" x2="8" y2="13" /></svg> },
  { id: 'bank_details', title: 'Incorrect Bank Details', desc: 'Refund account needs correction', bg: '#f0fdf4', color: '#16a34a', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3L2 10h20L12 3z" /></svg> },
  { id: 'other', title: 'Other', desc: 'Something else', bg: '#faf5ff', color: '#9333ea', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg> }
]



const TAX_SUMMARY_ITEMS = [
  { label: 'Gross total income', orig: '₹8,68,900', rev: '₹8,68,900', change: '+₹56,500', total: '₹8,68,900', isPos: true },
  { label: 'Total deductions', orig: '₹3,20,000', rev: '₹3,20,000', change: '—', total: '₹3,20,000', isPos: false },
  { label: 'Taxable income', orig: '₹4,92,400', rev: '₹5,48,900', change: '+₹56,500', total: '₹5,48,900', isPos: true },
  { label: 'Tax + cess', orig: '₹12,854', rev: '₹18,742', change: '+₹5,888', total: '₹18,742', isPos: true },
  { label: 'Taxes paid', orig: '₹31,200', rev: '₹31,200', change: '—', total: '₹31,200', isPos: false }
]

const TIMELINE_STEPS = [
  { title: 'Application Received', status: 'done', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
  { title: 'Payment Completed', status: 'done', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> },
  { title: 'CA Verification', status: 'active', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> },
  { title: 'Revised ITR Preparation', status: 'pending', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg> },
  { title: 'Return Filed', status: 'pending', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg> },
  { title: 'Completed', status: 'pending', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="20 6 9 17 4 12" /></svg> }
]

export const RevisedItr = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeUploadId, setActiveUploadId] = useState('')
  const [currentStep, setCurrentStep] = useState(1)

  const [ackNumber, setAckNumber] = useState('')
  const [selectedAY, setSelectedAY] = useState('AY 2025–26')
  const [ackError, setAckError] = useState('')
  const [selectedReason, setSelectedReason] = useState('missed_income')
  const [otherReasonText, setOtherReasonText] = useState('')
  const [revisedSalary, setRevisedSalary] = useState('')
  const [revisedOther, setRevisedOther] = useState('')
  const [revisedTaxable, setRevisedTaxable] = useState('')
  const [deduction80C, setDeduction80C] = useState('')
  const [deduction80D, setDeduction80D] = useState('')
  const [homeLoanInterest, setHomeLoanInterest] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [ifscCode, setIfscCode] = useState('')
  const [incomeError, setIncomeError] = useState('')
  const [docError, setDocError] = useState('')
  const [viewingDoc, setViewingDoc] = useState<{ id: string; name: string } | null>(null)
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>({})

  const handleAckChange = (val: string) => { const n = val.replace(/\D/g, '').slice(0, 15); setAckNumber(n); if (n.length === 15) setAckError('') }
  const handleIncomeInput = (val: string, setter: (v: string) => void) => { const n = val.replace(/\D/g, ''); setter(n); if (n) setIncomeError('') }
  const getChangeText = (val: string) => { const c = val.replace(/\D/g, ''); if (!c) return '—'; const num = parseInt(c, 10); return isNaN(num) || num === 0 ? '—' : `+ ₹ ${num.toLocaleString('en-IN')}` }

  const triggerUpload = (id: string) => { setActiveUploadId(id); fileInputRef.current?.click(); }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && activeUploadId) {
      setUploadedDocs(p => ({ ...p, [activeUploadId]: e.target.files![0].name }))
      setDocError('')
    }
  }

  const handleDeleteDoc = (id: string) => {
    setUploadedDocs(p => {
      const copy = { ...p }
      delete copy[id]
      return copy
    })
  }

  const uploadedCount = Object.keys(uploadedDocs).length

  const handleContinue = () => {
    if (currentStep === 1) {
      if (!ackNumber.trim()) { setAckError('Original ITR Acknowledgement Number is required'); return; }
      if (ackNumber.trim().length !== 15) { setAckError(`Must be 15 digits (currently ${ackNumber.trim().length}/15)`); return; }
      setAckError(''); setCurrentStep(2)
    } else if (currentStep === 2) {
      if (!selectedReason || (selectedReason === 'other' && !otherReasonText.trim())) return
      setCurrentStep(3)
    } else if (currentStep === 3) {
      if (selectedReason === 'bank_details') {
        if (!bankAccount.trim()) { setIncomeError('Bank account number for refund is required.'); return; }
        if (bankAccount.trim().length !== 11) { setIncomeError(`Bank account number must be 11 digits (currently ${bankAccount.trim().length}/11).`); return; }
        if (!ifscCode.trim()) { setIncomeError('IFSC code is required.'); return; }
        if (ifscCode.trim().length !== 11) { setIncomeError(`IFSC code must be 11 characters (currently ${ifscCode.trim().length}/11).`); return; }
      } else if (selectedReason === 'wrong_deduction') {
        if (!deduction80C.trim() && !deduction80D.trim() && !homeLoanInterest.trim() && !revisedTaxable.trim()) {
          setIncomeError('Please enter at least one revised deduction amount or taxable income.'); return;
        }
      } else if (selectedReason === 'other') {
        if (bankAccount.trim() && bankAccount.trim().length !== 11) {
          setIncomeError(`Bank account number must be 11 digits (currently ${bankAccount.trim().length}/11).`); return;
        }
        if (ifscCode.trim() && ifscCode.trim().length !== 11) {
          setIncomeError(`IFSC code must be 11 characters (currently ${ifscCode.trim().length}/11).`); return;
        }
        setIncomeError('')
        setCurrentStep(4)
        return
      } else {
        if (!revisedSalary.trim() && !revisedOther.trim() && !revisedTaxable.trim()) { setIncomeError('Please enter at least one revised income amount.'); return; }
      }
      setIncomeError(''); setCurrentStep(4)
    } else if (currentStep === 4) {
      const docs = getDocLists()
      const missing = docs.required.filter(d => !uploadedDocs[d.id])
      if (missing.length > 0) {
        setDocError(`Please upload all required documents (${missing.map(d => d.title).join(', ')}) before proceeding.`)
        return
      }
      setDocError('')
      setCurrentStep(5)
    } else if (currentStep === 5) setCurrentStep(6)
    else navigate(routePaths.itr.root)
  }

  const handleCancel = () => { if (currentStep > 1) setCurrentStep(p => p - 1); else navigate(routePaths.itr.root) }

  const renderEditBtn = (step: number) => (
    <button type="button" className="revised-itr-edit-btn" onClick={() => setCurrentStep(step)}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg> Edit
    </button>
  )

  const renderDocCard = (doc: { id: string; title: string; required: boolean; hasAY?: boolean }) => {
    const isUploaded = !!uploadedDocs[doc.id]
    const fileName = uploadedDocs[doc.id]

    return (
      <div key={doc.id} className="revised-itr-doc-row">
        <div className="revised-itr-doc-info">
          <div className="revised-itr-reason-card__icon-box" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div>
            <h4 className="revised-itr-doc-title">{doc.hasAY ? `${doc.title} (${selectedAY})` : doc.title}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {!isUploaded ? (
                <span className={doc.required ? 'revised-itr-doc-status--req' : 'revised-itr-doc-status--opt'}>
                  {doc.required ? 'Required' : 'Optional'}
                </span>
              ) : (
                <span className="revised-itr-doc-filename">📄 {fileName}</span>
              )}
            </div>
          </div>
        </div>

        {isUploaded ? (
          <div className="revised-itr-doc-actions">
            <button
              type="button"
              className="revised-itr-doc-action-btn revised-itr-doc-action-btn--view"
              onClick={() => setViewingDoc({ id: doc.id, name: fileName })}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              View
            </button>
            <button
              type="button"
              className="revised-itr-doc-action-btn revised-itr-doc-action-btn--replace"
              onClick={() => triggerUpload(doc.id)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              Replace
            </button>
            <button
              type="button"
              className="revised-itr-doc-action-btn revised-itr-doc-action-btn--delete"
              onClick={() => handleDeleteDoc(doc.id)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Delete
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="revised-itr-upload-file-btn"
            onClick={() => triggerUpload(doc.id)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              <path d="M12 13v-5m0 0-2.5 2.5M12 8l2.5 2.5" />
            </svg>
            Upload File
          </button>
        )}
      </div>
    )
  }

  const getDocLists = () => {
    if (selectedReason === 'bank_details') {
      return {
        required: [
          { id: 'pan', title: 'PAN Card', required: true },
          { id: 'aadhaar', title: 'Aadhaar Card', required: true },
          { id: 'bank', title: 'Bank Statements', required: true }
        ],
        additional: [
          { id: 'form16', title: 'Form 16 / Form 16A', required: false, hasAY: true },
          { id: 'ais_tis', title: 'AIS and TIS Statement', required: false },
          { id: 'investments', title: 'Investment Proofs', required: false }
        ]
      }
    }
    if (selectedReason === 'wrong_deduction') {
      return {
        required: [
          { id: 'pan', title: 'PAN Card', required: true },
          { id: 'aadhaar', title: 'Aadhaar Card', required: true },
          { id: 'investments', title: 'Investment Proofs', required: true }
        ],
        additional: [
          { id: 'form16', title: 'Form 16 / Form 16A', required: false, hasAY: true },
          { id: 'ais_tis', title: 'AIS and TIS Statement', required: false },
          { id: 'bank', title: 'Bank Statements', required: false }
        ]
      }
    }
    return {
      required: [
        { id: 'pan', title: 'PAN Card', required: true },
        { id: 'aadhaar', title: 'Aadhaar Card', required: true }
      ],
      additional: [
        { id: 'form16', title: 'Form 16 / Form 16A', required: false, hasAY: true },
        { id: 'ais_tis', title: 'AIS and TIS Statement', required: false },
        { id: 'bank', title: 'Bank Statements', required: false },
        { id: 'investments', title: 'Investment Proofs', required: false }
      ]
    }
  }

  return (
    <div className="revised-itr-container">
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      <header className="revised-itr-header-row">
        <div className="revised-itr-header-left">
          <div>
            <h1 className="revised-itr-title">{currentStep === 6 ? 'Revised ITR' : currentStep === 5 ? 'Review Revised ITR' : 'Revised ITR'}</h1>
            <p className="revised-itr-subtitle">
              {currentStep === 1 && 'Find Original Return'}{currentStep === 2 && 'Reason for Revision'}{currentStep === 3 && 'Update Details'}
              {currentStep === 4 && 'Documents & Submission'}{currentStep === 5 && 'Review your updated details before proceeding to payment.'}{currentStep === 6 && 'Application Received'}
            </p>
          </div>
        </div>
        {currentStep >= 2 && currentStep <= 5 && <div className="revised-itr-ay-badge"><span className="revised-itr-ay-badge__label">Assessment Year</span><span className="revised-itr-ay-badge__val">{selectedAY}</span></div>}
      </header>

      {currentStep < 5 && (
        <div className="revised-itr-card">
          {currentStep === 1 && (
            <div className="revised-itr-form">
              <h2 className="revised-itr-card__title">Find Original Return</h2>
              <div className="revised-itr-field"><label className="revised-itr-label">Original ITR Acknowledgement Number <span className="revised-itr-star">*</span></label><input type="text" inputMode="numeric" maxLength={15} className={`revised-itr-input ${ackError ? 'revised-itr-input--error' : ''}`} placeholder="Enter 15-digit acknowledgement number" value={ackNumber} onChange={(e) => handleAckChange(e.target.value)} />{ackError && <p className="revised-itr-field-error">⚠️ {ackError}</p>}</div>
              <div className="revised-itr-field"><label className="revised-itr-label">Assessment Year <span className="revised-itr-star">*</span></label><div className="revised-itr-select-wrap"><select className="revised-itr-select" value={selectedAY} onChange={(e) => setSelectedAY(e.target.value)}><option value="AY 2025–26">AY 2025–26</option><option value="AY 2024–25">AY 2024–25</option><option value="AY 2023–24">AY 2023–24</option></select><svg className="revised-itr-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></div></div>
              {ackNumber.length === 15 && (
                <div className="revised-itr-found-card">
                  <div className="revised-itr-found-card__header">
                    <h3 className="revised-itr-found-card__title">Original Return Found</h3>
                    <div className="revised-itr-found-card__check-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="14" height="14"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                  </div>
                  <div className="revised-itr-found-card__list">
                    <div className="revised-itr-found-card__row"><span>Filed</span><strong>Verified from IT Portal</strong></div>
                    <div className="revised-itr-found-card__row"><span>Assessment Year</span><strong>{selectedAY}</strong></div>
                    <div className="revised-itr-found-card__row"><span>ITR Form</span><strong>ITR-1</strong></div>
                    <div className="revised-itr-found-card__row"><span>Gross Total Income</span><strong>₹8,12,400</strong></div>
                  </div>
                </div>
              )}
            </div>
          )}
          {currentStep === 2 && (
            <>
              <h2 className="revised-itr-card__title" style={{ marginBottom: '0.35rem' }}>Why are you revising your ITR?</h2>
              <p className="revised-itr-card__desc">Select the reason for revision from the options below.</p>
              <div className="revised-itr-reasons-list">{REASON_OPTIONS.map((opt) => (<div key={opt.id} className={`revised-itr-reason-card ${selectedReason === opt.id ? 'revised-itr-reason-card--selected' : ''}`} onClick={() => setSelectedReason(opt.id)}><div className="revised-itr-reason-card__icon-box" style={{ backgroundColor: opt.bg, color: opt.color }}>{opt.icon}</div><div className="revised-itr-reason-card__info"><h3 className="revised-itr-reason-card__title">{opt.title}</h3><p className="revised-itr-reason-card__subtitle">{opt.desc}</p></div><div className="revised-itr-reason-card__radio">{selectedReason === opt.id ? <div className="revised-itr-radio-checked"><div className="revised-itr-radio-inner" /></div> : <div className="revised-itr-radio-unchecked" />}</div></div>))}</div>
              {selectedReason === 'other' && (<div className="revised-itr-field" style={{ marginTop: '1.25rem' }}><label className="revised-itr-label">Specify your reason for revision <span className="revised-itr-star">*</span></label><textarea className="revised-itr-textarea" placeholder="Enter description" rows={3} value={otherReasonText} onChange={(e) => setOtherReasonText(e.target.value)} /></div>)}
            </>
          )}
          {currentStep === 3 && (
            <div className="revised-itr-update-container">
              <div className="revised-itr-notice-banner">
                <div className="revised-itr-notice-banner__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                </div>
                <div>
                  <h3 className="revised-itr-notice-banner__title">Update only what changed</h3>
                  <p className="revised-itr-notice-banner__desc">Edit only the figures that need correcting.</p>
                </div>
              </div>

              {selectedReason === 'other' ? (
                <>
                  <div className="revised-itr-other-reason-banner">
                    Reason: {otherReasonText || 'Other'}
                  </div>

                  <h3 className="revised-itr-section-heading">Income Correction</h3>
                  <div className="revised-itr-detail-rows" style={{ marginBottom: '1.75rem' }}>
                    {[
                      { title: 'Salary / Business income *', bg: '#eff6ff', color: '#2563eb', placeholder: 'Enter revised income', val: revisedSalary, setVal: setRevisedSalary, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg> },
                      { title: 'Other income', bg: '#f0fdf4', color: '#16a34a', placeholder: 'Enter revised income', val: revisedOther, setVal: setRevisedOther, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg> }
                    ].map((r, i) => (
                      <div key={i} className="revised-itr-detail-row">
                        <div className="revised-itr-detail-row__left">
                          <div className="revised-itr-detail-row__icon-box" style={{ backgroundColor: r.bg, color: r.color }}>{r.icon}</div>
                          <div><h4 className="revised-itr-detail-row__title">{r.title}</h4></div>
                        </div>
                        <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Original</span><div className="revised-itr-col-read-only">₹</div></div>
                        <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Revised</span><input type="text" inputMode="numeric" className="revised-itr-col-input" placeholder={r.placeholder} value={r.val} onChange={(e) => handleIncomeInput(e.target.value, r.setVal)} /></div>
                        <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Change</span><div className="revised-itr-col-read-only">{getChangeText(r.val)}</div></div>
                      </div>
                    ))}
                  </div>


                  <h3 className="revised-itr-section-heading">Deduction Correction</h3>
                  <div className="revised-itr-detail-rows" style={{ marginBottom: '1.75rem' }}>
                    {[
                      { title: '80C deduction', bg: '#e6f4ea', color: '#16a34a', placeholder: 'Enter amount', val: deduction80C, setVal: setDeduction80C, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
                      { title: '80D deduction', bg: '#fff7ed', color: '#ea580c', placeholder: 'Enter amount', val: deduction80D, setVal: setDeduction80D, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><line x1="16" y1="13" x2="8" y2="13" /></svg> },
                      { title: 'Home loan interest', bg: '#faf5ff', color: '#9333ea', placeholder: 'Enter amount', val: homeLoanInterest, setVal: setHomeLoanInterest, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> }
                    ].map((r, i) => (
                      <div key={i} className="revised-itr-detail-row">
                        <div className="revised-itr-detail-row__left">
                          <div className="revised-itr-detail-row__icon-box" style={{ backgroundColor: r.bg, color: r.color }}>{r.icon}</div>
                          <div><h4 className="revised-itr-detail-row__title">{r.title}</h4></div>
                        </div>
                        <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Original</span><div className="revised-itr-col-read-only">₹</div></div>
                        <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Revised</span><input type="text" inputMode="numeric" className="revised-itr-col-input" placeholder={r.placeholder} value={r.val} onChange={(e) => handleIncomeInput(e.target.value, r.setVal)} /></div>
                        <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Change</span><div className="revised-itr-col-read-only">{getChangeText(r.val)}</div></div>
                      </div>
                    ))}
                  </div>

                  <h3 className="revised-itr-section-heading">Bank Details Correction</h3>
                  <div className="revised-itr-bank-fields" style={{ marginBottom: '1.25rem' }}>
                    <div className="revised-itr-bank-card">
                      <label className="revised-itr-label">Bank account for refund <span className="revised-itr-star">*</span></label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={11}
                        className="revised-itr-input"
                        placeholder="Enter 11-digit bank account number"
                        value={bankAccount}
                        onChange={(e) => { setBankAccount(e.target.value.replace(/\D/g, '').slice(0, 11)); if (incomeError) setIncomeError(''); }}
                      />
                    </div>
                    <div className="revised-itr-bank-card">
                      <label className="revised-itr-label">IFSC <span className="revised-itr-star">*</span></label>
                      <input
                        type="text"
                        maxLength={11}
                        className="revised-itr-input"
                        placeholder="Enter 11-digit IFSC"
                        value={ifscCode}
                        onChange={(e) => { setIfscCode(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 11)); if (incomeError) setIncomeError(''); }}
                      />
                    </div>
                  </div>

                  <div className="revised-itr-detail-row">
                    <div className="revised-itr-detail-row__left">
                      <div className="revised-itr-detail-row__icon-box" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><line x1="18" y1="20" x2="18" y2="10" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                      </div>
                      <div><h4 className="revised-itr-detail-row__title">Taxable income <span className="revised-itr-star">*</span></h4></div>
                    </div>
                    <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Original</span><div className="revised-itr-col-read-only">₹</div></div>
                    <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Revised</span><input type="text" inputMode="numeric" className="revised-itr-col-input" placeholder="Enter taxable income" value={revisedTaxable} onChange={(e) => handleIncomeInput(e.target.value, setRevisedTaxable)} /></div>
                    <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Change</span><div className="revised-itr-col-read-only">{getChangeText(revisedTaxable)}</div></div>
                  </div>
                </>
              ) : selectedReason === 'bank_details' ? (
                <>
                  <h3 className="revised-itr-section-heading">Bank Details Correction</h3>
                  <div className="revised-itr-bank-fields">
                    <div className="revised-itr-bank-card">
                      <label className="revised-itr-label">Bank account for refund <span className="revised-itr-star">*</span></label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={11}
                        className="revised-itr-input"
                        placeholder="Enter 11-digit bank account number"
                        value={bankAccount}
                        onChange={(e) => { setBankAccount(e.target.value.replace(/\D/g, '').slice(0, 11)); if (incomeError) setIncomeError(''); }}
                      />
                    </div>
                    <div className="revised-itr-bank-card">
                      <label className="revised-itr-label">IFSC <span className="revised-itr-star">*</span></label>
                      <input
                        type="text"
                        maxLength={11}
                        className="revised-itr-input"
                        placeholder="Enter 11-digit IFSC"
                        value={ifscCode}
                        onChange={(e) => { setIfscCode(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 11)); if (incomeError) setIncomeError(''); }}
                      />
                    </div>
                  </div>
                </>
              ) : selectedReason === 'wrong_deduction' ? (
                <>
                  <h3 className="revised-itr-section-heading">Deduction Correction</h3>
                  <div className="revised-itr-detail-rows">
                    {[
                      { title: '80C deduction', bg: '#e6f4ea', color: '#16a34a', placeholder: 'Enter amount', val: deduction80C, setVal: setDeduction80C, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
                      { title: '80D deduction', bg: '#fff7ed', color: '#ea580c', placeholder: 'Enter amount', val: deduction80D, setVal: setDeduction80D, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><line x1="16" y1="13" x2="8" y2="13" /></svg> },
                      { title: 'Home loan interest', bg: '#faf5ff', color: '#9333ea', placeholder: 'Enter amount', val: homeLoanInterest, setVal: setHomeLoanInterest, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
                      { title: 'Taxable income *', bg: '#eff6ff', color: '#2563eb', placeholder: 'Enter taxable income', val: revisedTaxable, setVal: setRevisedTaxable, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><line x1="18" y1="20" x2="18" y2="10" /><line x1="6" y1="20" x2="6" y2="14" /></svg> }
                    ].map((r, i) => (
                      <div key={i} className="revised-itr-detail-row">
                        <div className="revised-itr-detail-row__left">
                          <div className="revised-itr-detail-row__icon-box" style={{ backgroundColor: r.bg, color: r.color }}>{r.icon}</div>
                          <div><h4 className="revised-itr-detail-row__title">{r.title}</h4></div>
                        </div>
                        <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Original</span><div className="revised-itr-col-read-only">₹</div></div>
                        <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Revised</span><input type="text" inputMode="numeric" className="revised-itr-col-input" placeholder={r.placeholder} value={r.val} onChange={(e) => handleIncomeInput(e.target.value, r.setVal)} /></div>
                        <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Change</span><div className="revised-itr-col-read-only">{getChangeText(r.val)}</div></div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="revised-itr-detail-rows">
                  {[
                    { title: 'Salary / Business income *', desc: 'Update salary or business income', bg: '#eff6ff', color: '#2563eb', placeholder: 'Enter revised income', val: revisedSalary, setVal: setRevisedSalary, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg> },
                    { title: 'Other income', desc: 'Update revised other income', bg: '#f0fdf4', color: '#16a34a', placeholder: 'Enter revised income', val: revisedOther, setVal: setRevisedOther, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg> },
                    { title: 'Taxable income *', desc: 'Enter revised taxable income', bg: '#fff7ed', color: '#ea580c', placeholder: 'Enter income', val: revisedTaxable, setVal: setRevisedTaxable, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg> }
                  ].map((r, i) => (
                    <div key={i} className="revised-itr-detail-row">
                      <div className="revised-itr-detail-row__left">
                        <div className="revised-itr-detail-row__icon-box" style={{ backgroundColor: r.bg, color: r.color }}>{r.icon}</div>
                        <div><h4 className="revised-itr-detail-row__title">{r.title}</h4>{r.desc && <p className="revised-itr-detail-row__desc">{r.desc}</p>}</div>
                      </div>
                      <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Original</span><div className="revised-itr-col-read-only">₹ —</div></div>
                      <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Revised</span><input type="text" inputMode="numeric" className="revised-itr-col-input" placeholder={r.placeholder} value={r.val} onChange={(e) => handleIncomeInput(e.target.value, r.setVal)} /></div>
                      <div className="revised-itr-detail-col"><span className="revised-itr-col-label">Change</span><div className="revised-itr-col-read-only">{getChangeText(r.val)}</div></div>
                    </div>
                  ))}
                </div>
              )}
              {incomeError && <p className="revised-itr-field-error" style={{ marginTop: '1.25rem' }}>⚠️ {incomeError}</p>}
            </div>
          )}
          {currentStep === 4 && (() => {
            const docs = getDocLists()
            return (
              <div className="revised-itr-docs-container">
                <h2 className="revised-itr-card__title" style={{ marginBottom: '0.35rem' }}>Upload Documents</h2>
                <p className="revised-itr-card__desc">Upload proofs for the corrections made in your revised return.</p>
                <div className="revised-itr-docs-header"><span className="revised-itr-docs-count">{uploadedCount} of 6 documents uploaded</span><span className="revised-itr-in-progress-badge">In Progress</span></div>
                <div className="revised-itr-progress-bar"><div className="revised-itr-progress-fill" style={{ width: `${(uploadedCount / 6) * 100}%` }} /></div>
                <h3 className="revised-itr-section-title">Required Documents</h3>{docs.required.map(renderDocCard)}
                <h3 className="revised-itr-section-title">Additional Documents</h3>{docs.additional.map(renderDocCard)}
                {docError && <p className="revised-itr-field-error" style={{ marginTop: '1.25rem' }}>⚠️ {docError}</p>}
              </div>
            )
          })()}
        </div>
      )}

      {viewingDoc && (
        <div className="revised-itr-modal-overlay" onClick={() => setViewingDoc(null)}>
          <div className="revised-itr-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="revised-itr-modal-header">
              <h3 className="revised-itr-modal-title">Document Preview</h3>
              <button type="button" className="revised-itr-modal-close" onClick={() => setViewingDoc(null)}>✕</button>
            </div>
            <div className="revised-itr-modal-body">
              <div className="revised-itr-doc-preview-box">
                <div className="revised-itr-doc-preview-icon">📄</div>
                <h4 style={{ margin: '0.5rem 0', fontSize: '1.1rem', color: '#0f172a' }}>{viewingDoc.name}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#16a34a', fontWeight: 600 }}>✓ Uploaded & Ready for CA Review</p>
              </div>
            </div>
            <div className="revised-itr-modal-footer">
              <button type="button" className="revised-itr-btn-continue" style={{ height: '42px', padding: '0 1.5rem' }} onClick={() => setViewingDoc(null)}>Close Preview</button>
            </div>

          {/* Bottom Action Bar */}
          <div className="revised-flow-bottom-bar">
            <button
              type="button"
              className="revised-bottom-back-btn"
              onClick={handlePrevStep}
            >
              Back
            </button>

            <button
              type="button"
              className="revised-bottom-next-btn"
              onClick={handleNextStep}
            >
              {currentStep < 5 ? 'Continue' : 'Finish'}
            </button>

          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div className="revised-itr-review-container">
          <div className="revised-itr-review-card">
            <div className="revised-itr-review-card__header"><div className="revised-itr-review-card__left"><div className="revised-itr-reason-card__icon-box" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg></div><h3 className="revised-itr-review-card__title">Original Return</h3></div>{renderEditBtn(1)}</div>
            <div className="revised-itr-review-kv-list">
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Ack Number</span><span className="revised-itr-review-v">{ackNumber || '2222222222222252'}</span></div>
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Assessment Year</span><span className="revised-itr-review-v">{selectedAY}</span></div>
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">ITR Form</span><span className="revised-itr-review-v">ITR-1</span></div>
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Gross Total Income</span><span className="revised-itr-review-v">₹8,12,400</span></div>
            </div>
          </div>

          <div className="revised-itr-review-card">
            <div className="revised-itr-review-card__header"><div className="revised-itr-review-card__left"><div className="revised-itr-reason-card__icon-box" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div><h3 className="revised-itr-review-card__title">Personal Information</h3></div>{renderEditBtn(1)}</div>
            <div className="revised-itr-review-kv-list">
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Full Name</span><span className="revised-itr-review-v">Sagarika Jena</span></div>
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">PAN</span><span className="revised-itr-review-v">XXXXX3447E</span></div>
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Date of Birth</span><span className="revised-itr-review-v">02-05-2000</span></div>
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Mobile</span><span className="revised-itr-review-v">7008138785</span></div>
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Email</span><span className="revised-itr-review-v">Jenasagarika211@gmail.com</span></div>
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Address</span><span className="revised-itr-review-v">Vishakh, Hyderabad, Telangana - 500081</span></div>
            </div>
          </div>

          <div className="revised-itr-review-card">
            <div className="revised-itr-review-card__header"><div className="revised-itr-review-card__left"><div className="revised-itr-reason-card__icon-box" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg></div><h3 className="revised-itr-review-card__title">Changes</h3></div>{renderEditBtn(2)}</div>
            <div className="revised-itr-review-kv-list">
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Revision Reason</span><span className="revised-itr-review-v">{selectedReason === 'wrong_deduction' ? 'Wrong Deduction' : selectedReason === 'missed_income' ? 'Missed Income' : selectedReason === 'bank_details' ? 'Incorrect Bank Details' : (otherReasonText || 'Other')}</span></div>
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Revised Salary / Business</span><span className="revised-itr-review-v">{revisedSalary ? `₹${parseInt(revisedSalary, 10).toLocaleString('en-IN')}` : '—'}</span></div>
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Revised Taxable Income</span><span className="revised-itr-review-v">{revisedTaxable ? `₹${parseInt(revisedTaxable, 10).toLocaleString('en-IN')}` : '—'}</span></div>
            </div>
          </div>

          <div className="revised-itr-review-card">
            <div className="revised-itr-review-card__header"><div className="revised-itr-review-card__left"><div className="revised-itr-reason-card__icon-box" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg></div><h3 className="revised-itr-review-card__title">Documents</h3></div>{renderEditBtn(4)}</div>
            <div className="revised-itr-review-kv-list">
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Uploaded Count</span><span className="revised-itr-review-v">{uploadedCount} of 6 documents</span></div>
              <div className="revised-itr-review-kv"><span className="revised-itr-review-k">Verification Status</span><span className="revised-itr-review-v">Ready for CA Review</span></div>
            </div>
          </div>

          <div className="revised-itr-review-card">
            <div className="revised-itr-review-card__header"><div className="revised-itr-review-card__left"><div className="revised-itr-reason-card__icon-box" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /></svg></div><div><h3 className="revised-itr-review-card__title">Tax Summary</h3><p className="revised-itr-card__desc" style={{ margin: 0 }}>Summary of your revised return after changes.</p></div></div></div>
            <div className="revised-itr-tax-summary-rows">
              {TAX_SUMMARY_ITEMS.map((t, idx) => (
                <div key={idx} className="revised-itr-tax-summary-block">
                  <div className="revised-itr-tax-summary-block__title">{t.label}</div>
                  <div className="revised-itr-tax-summary-block__grid">
                    <div className="revised-itr-tax-summary-block__left"><div className="revised-itr-tax-summary-subrow"><span className="revised-itr-subrow-k">Original</span><span className="revised-itr-subrow-v">{t.orig}</span></div></div>
                    <div className="revised-itr-tax-summary-block__mid"><div className="revised-itr-tax-summary-subrow"><span className="revised-itr-subrow-colon">:</span><span className="revised-itr-subrow-k">Revised</span></div><div className="revised-itr-tax-summary-subrow"><span className="revised-itr-subrow-colon">:</span><span className="revised-itr-subrow-k">Change</span></div></div>
                    <div className="revised-itr-tax-summary-block__right"><span className="revised-itr-summary-main-val">{t.total}</span><span className={t.isPos ? 'revised-itr-summary-change-val--pos' : 'revised-itr-summary-change-val--none'}>{t.change}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="revised-itr-refund-card">
            <div className="revised-itr-refund-left">
              <div className="revised-itr-refund-icon">₹</div>
              <div className="revised-itr-refund-info">
                <span className="revised-itr-refund-title">Revised Refund</span>
                <div className="revised-itr-refund-amount">₹12,458</div>
                <p className="revised-itr-refund-note">Preliminary calculation. Final result depends on the filed return and Income Tax Department processing.</p>
              </div>
            </div>
            <div className="revised-itr-refund-divider" />
            <div className="revised-itr-refund-right">
              <div className="revised-itr-refund-row"><span className="revised-itr-refund-lbl">Original Refund</span><span className="revised-itr-refund-val">₹18,346</span></div>
              <div className="revised-itr-refund-row"><span className="revised-itr-refund-lbl">Change</span><span className="revised-itr-refund-val revised-itr-refund-val--neg">-₹5,888</span></div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 6 && (
        <div className="revised-itr-success-container">
          <div className="revised-itr-success-banner">
            <div className="revised-itr-success-circle">
              <div className="revised-itr-confetti c1" />
              <div className="revised-itr-confetti c2" />
              <div className="revised-itr-confetti c3" />
              <div className="revised-itr-confetti c4" />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="28" height="28"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h2 className="revised-itr-success-title">Your Revised ITR application has been received.</h2>
            <p className="revised-itr-success-desc">
              Your documents and revised tax information have been received.<br />A Tax Executive will review them before preparing your return.
            </p>
            <div className="revised-itr-app-id-pill">
              <span>Application ID</span>
              <strong>ITR-2026-22749</strong>
            </div>
          </div>

          <div className="revised-itr-timeline-card">
            <div className="revised-itr-timeline-card__header">
              <h3 className="revised-itr-timeline-card__title">Revised ITR Timeline</h3>
              <span className="revised-itr-stage-badge">Stage 3 of 6</span>
            </div>
            <div className="revised-itr-timeline-stepper">
              {TIMELINE_STEPS.map((step, idx) => (
                <div key={idx} className={`revised-itr-stepper-item revised-itr-stepper-item--${step.status}`}>
                  <div className="revised-itr-stepper-icon">{step.icon}</div>
                  <span className="revised-itr-stepper-label">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="revised-itr-stage-info-box">
              <div className="revised-itr-info-circle-icon">i</div>
              <div>
                <h4 className="revised-itr-stage-info-title">Current Stage 3: CA Verification</h4>
                <p className="revised-itr-stage-info-desc">Certified CA verifying original filing and revised declaration.</p>
              </div>
            </div>
          </div>

          <div className="revised-itr-info-card">
            <div className="revised-itr-info-card__header">
              <div className="revised-itr-reason-card__icon-box" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg>
              </div>
              <h3 className="revised-itr-info-card__title">What we have</h3>
            </div>
            <div className="revised-itr-info-kv-list">
              <div className="revised-itr-info-kv"><span>Assessment Year</span><strong>AY 2025–26</strong></div>
              <div className="revised-itr-info-kv"><span>Return Form</span><strong>Revised ITR</strong></div>
              <div className="revised-itr-info-kv"><span>Income Sources</span><strong>Revised Return Filing</strong></div>
              <div className="revised-itr-info-kv"><span>Tax Regime</span><strong>New Tax Regime</strong></div>
              <div className="revised-itr-info-kv"><span>Documents</span><strong>6 of 6 received</strong></div>
              <div className="revised-itr-info-kv"><span>Refund Bank</span><strong>HDFC Bank ****** 1234</strong></div>
            </div>
          </div>

          <div className="revised-itr-info-card">
            <div className="revised-itr-info-card__header">
              <div className="revised-itr-reason-card__icon-box" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              </div>
              <h3 className="revised-itr-info-card__title">What happens next</h3>
            </div>
            <p className="revised-itr-next-desc">
              A Tax Executive will verify your documents, prepare the return and send you the computation to review and approve. You will get a notification at each stage.
            </p>
          </div>

          <div className="revised-itr-success-actions">
            <button type="button" className="revised-itr-btn-download" onClick={() => alert('Downloading TaxEdge Application Receipt...')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Download TaxEdge Application Receipt
            </button>
            <button type="button" className="revised-itr-btn-status" onClick={() => navigate(routePaths.itr.root)}>
              View Application Status →
            </button>
          </div>
        </div>
      )}

      {currentStep !== 6 && (
        <div className="revised-itr-actions">
          <button type="button" className="revised-itr-btn-cancel" onClick={handleCancel}>{currentStep === 1 ? 'Cancel' : '← Back'}</button>
          <button type="button" className="revised-itr-btn-continue" onClick={handleContinue}>{currentStep === 5 ? 'Proceed to Payment →' : 'Continue →'}</button>
        </div>
      )}
    </div>
  )
}

export default RevisedItr

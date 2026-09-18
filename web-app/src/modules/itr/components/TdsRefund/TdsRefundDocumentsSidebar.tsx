import React from 'react'

export const TdsRefundDocumentsSidebar: React.FC = () => {
  return (
    <aside className="tds-docs-sidebar" aria-label="Document verification and guidelines">
      {/* 1. Stage 2 Progression Card */}
      <div className="tds-progression-card">
        <span className="tds-progression-badge">Stage 2 in Progress</span>
        <h3 className="tds-progression-title">Document Verification</h3>
        <p className="tds-progression-desc">
          Uploaded files are securely scanned and matched with ITD records for refund accuracy.
        </p>

        <div className="tds-progression-checklist">
          <div className="tds-progression-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>256-bit Bank Grade Security</span>
          </div>
          <div className="tds-progression-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Reconciliation with 26AS &amp; AIS</span>
          </div>
          <div className="tds-progression-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Next: Senior CA Review &amp; Filing</span>
          </div>
        </div>

        <div className="tds-progression-security">
          <div className="tds-prog-sec-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>ISO 27001 Certified Vault</span>
          </div>
          <div className="tds-prog-sec-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Instant CA validation upon filing</span>
          </div>
        </div>
      </div>

      {/* 2. Expert CA Review Trust Card */}
      <div className="tds-sidebar-card tds-sidebar-trust-card">
        <div className="tds-trust-icon-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <h4 className="tds-trust-title">Dedicated Tax Expert Review</h4>
          <p className="tds-trust-desc">
            A Senior Chartered Accountant checks all deductions and validates proofs before ITD submission.
          </p>
        </div>
      </div>

      {/* 3. Document Guidelines Checklist Card */}
      <div className="tds-sidebar-card tds-sidebar-tip-card">
        <h4 className="tds-tip-title">Document Guidelines</h4>
        <ul className="tds-tip-list">
          <li>Supported: PDF, JPG, PNG (up to 25MB).</li>
          <li>Password-protected PDFs accepted (standard ITD format).</li>
          <li>Form 16 &amp; AIS can be downloaded from ITD portal.</li>
          <li>Clear scans prevent verification delays.</li>
        </ul>
      </div>
    </aside>
  )
}

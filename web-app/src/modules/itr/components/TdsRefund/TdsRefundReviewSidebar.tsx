import React from 'react'

export const TdsRefundReviewSidebar: React.FC = () => {
  return (
    <aside className="tds-review-sidebar">
      {/* Stage 3 in Progress Card */}
      <div className="tds-sidebar-card">
        <div className="tds-sidebar-progress-badge">Stage 3 in Progress</div>
        <h4 className="tds-sidebar-card-title">Review &amp; Estimate</h4>
        <p className="tds-sidebar-card-desc">
          Please thoroughly verify all your pre-filled and declared details before advancing to CA verification and refund filing.
        </p>
        <div className="tds-sidebar-checklist">
          {[
            { text: 'Step 1: Customer & Income Details', status: 'done', icon: '✓' },
            { text: 'Step 2: Upload Documents', status: 'done', icon: '✓' },
            { text: 'Step 3: Review & Computation', status: 'active', icon: '●', isStrong: true },
            { text: 'Step 4: CA Review & E-filing', status: 'pending', icon: '○' },
            { text: 'Step 5: Direct Bank Credit', status: 'pending', icon: '○' },
          ].map((item, idx) => (
            <div key={idx} className="tds-sidebar-check-item">
              <span className={`tds-sidebar-check-icon tds-sidebar-check-icon--${item.status}`}>{item.icon}</span>
              {item.isStrong ? <strong style={{ color: '#0f172a' }}>{item.text}</strong> : <span>{item.text}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* CA Trust Card */}
      <div className="tds-sidebar-card tds-sidebar-card--navy">
        <div className="tds-sidebar-card-header">
          <svg className="tds-sidebar-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <h4 className="tds-sidebar-card-title" style={{ color: '#ffffff' }}>Chartered Accountant Review</h4>
        </div>
        <p className="tds-sidebar-card-desc" style={{ color: '#94a3b8' }}>
          A senior licensed Chartered Accountant will cross-examine your 26AS, AIS, and TIS before submitting to the IT Department.
        </p>
      </div>

      {/* Bank-Grade Security Card */}
      <div className="tds-sidebar-card">
        <div className="tds-sidebar-card-header">
          <svg className="tds-sidebar-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#16a34a' }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <h4 className="tds-sidebar-card-title">Bank-Grade 256-Bit Security</h4>
        </div>
        <p className="tds-sidebar-card-desc">
          Your financial and personal details are encrypted and securely submitted through authorized ITD e-filing gateways.
        </p>
      </div>
    </aside>
  )
}

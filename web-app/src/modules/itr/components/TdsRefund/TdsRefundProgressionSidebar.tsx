import React from 'react'
import { TdsIcons } from './tdsRefund.constants'

export const TdsRefundProgressionSidebar: React.FC = () => {
  return (
    <aside className="tds-step1-sidebar" aria-label="Claim progression and verification">
      {/* 1. Claim Progression Card */}
      <div className="tds-progression-card">
        <span className="tds-progression-badge">Stage 1 Completed</span>
        <h3 className="tds-progression-title">Claim Progression</h3>
        <p className="tds-progression-desc">
          Review profile details, income information and bank account before proceeding.
        </p>

        <div className="tds-progression-checklist">
          <div className="tds-progression-item">
            <TdsIcons.Checkmark />
            <span>Pre-filled from ITD Portal</span>
          </div>
          <div className="tds-progression-item">
            <TdsIcons.Checkmark />
            <span>Bank verified for direct credit</span>
          </div>
          <div className="tds-progression-item">
            <TdsIcons.Checkmark />
            <span>Next: Upload Form 16 / AIS / Bank Stmt</span>
          </div>
        </div>

        <div className="tds-progression-security">
          <div className="tds-prog-sec-row">
            <TdsIcons.Shield />
            <span>256-bit Bank Grade Security</span>
          </div>
          <div className="tds-prog-sec-row">
            <TdsIcons.Zap />
            <span>Instant CA validation upon filing</span>
          </div>
        </div>
      </div>

      {/* 2. Expert CA Verification & Trust Card */}
      <div className="tds-sidebar-card tds-sidebar-trust-card">
        <div className="tds-trust-icon-box">
          <TdsIcons.Shield />
        </div>
        <div>
          <h4 className="tds-trust-title">Expert CA Verification</h4>
          <p className="tds-trust-desc">
            Your refund claim and bank details are cross-verified by a Senior Chartered Accountant before submission to ITD.
          </p>
        </div>
      </div>
    </aside>
  )
}

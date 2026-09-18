import React from 'react'

export const NoticeStep2View: React.FC = () => (
  <>
    <div>
      <h2 className="notice-flow-card-heading">Here’s what this notice means</h2>
      <p className="notice-flow-card-subheading">
        A plain-language explanation from your Tax Executive — no jargon.
      </p>
    </div>

    <div className="notice-explain-card">
      <div className="notice-explain-header">
        <div className="notice-explain-title-row">
          <span className="notice-explain-icon">📄</span>
          <div>
            <div className="notice-explain-title">
              Section 143(1)(a) — Proposed adjustment
            </div>
            <div className="notice-explain-sub">
              Notice CPC/2526/A3/284419260 · dated 18 Aug 2026
            </div>
          </div>
        </div>
        <span className="notice-explain-badge">● Routine</span>
      </div>

      <div className="notice-explain-body">
        <div className="notice-explain-item">
          <strong>In plain words:</strong> The department's records show ₹42,000 of interest income
          that does not appear on your return. They are proposing to add it to your taxable income
          and are giving you a chance to respond before they do.
        </div>
        <div className="notice-explain-item">
          <strong>What they want:</strong> Either agree with the addition, or explain why the income
          was not reported — for example, it was already included under a different head.
        </div>
        <div className="notice-explain-item">
          <strong>If you ignore it:</strong> The adjustment is made automatically after 30 days and
          your refund is reduced.
        </div>
      </div>
    </div>

    <div className="notice-summary-grid">
      <div className="notice-summary-card">
        <span className="notice-summary-label">Notice type</span>
        <strong className="notice-summary-val">Section 143(1)(a)</strong>
      </div>

      <div className="notice-summary-card">
        <span className="notice-summary-label">Response due</span>
        <strong className="notice-summary-val">17 Sep 2026 · 15 days left</strong>
      </div>

      <div className="notice-summary-card">
        <span className="notice-summary-label">Risk level</span>
        <strong className="notice-summary-val" style={{ color: '#1e3a8a' }}>
          Low — routine mismatch
        </strong>
      </div>
    </div>
  </>
)

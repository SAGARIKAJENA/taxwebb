import React from 'react'

export const NoticeStep5View: React.FC = () => (
  <>
    <div>
      <h2 className="notice-flow-card-heading">Notice response status</h2>
      <p className="notice-flow-card-subheading">
        You are notified when the department closes the notice — no need to follow up.
      </p>
    </div>

    {/* Pipeline */}
    <div className="notice-status-pipeline">
      <span className="notice-pipeline-item notice-pipeline-item--done">● Draft</span>
      <span className="notice-pipeline-divider">—</span>
      <span className="notice-pipeline-item notice-pipeline-item--done">● Under review</span>
      <span className="notice-pipeline-divider">—</span>
      <span className="notice-pipeline-item notice-pipeline-item--active">◉ Response submitted</span>
      <span className="notice-pipeline-divider">—</span>
      <span className="notice-pipeline-item">○ Resolved</span>
    </div>

    {/* Details Box */}
    <div className="notice-status-card">
      <div className="notice-status-row">
        <span>Notice number</span>
        <strong>CPC/2526/A3/284419260</strong>
      </div>
      <div className="notice-status-row">
        <span>Section</span>
        <strong>143(1)(a)</strong>
      </div>
      <div className="notice-status-row">
        <span>Response submitted</span>
        <strong>2 Sep 2026</strong>
      </div>
      <div className="notice-status-row">
        <span>Acknowledgement</span>
        <strong style={{ color: '#ea580c' }}>RSP284419260902</strong>
      </div>
      <div className="notice-status-row">
        <span>Handled by</span>
        <strong style={{ color: '#1e3a8a' }}>Meera Iyer · Tax Executive</strong>
      </div>
    </div>

    {/* 15-30 days notice box */}
    <div className="notice-notice-box notice-notice-box--blue">
      <div className="notice-notice-title">Typically 15–30 days</div>
      <div className="notice-notice-desc">
        ⓘ The department reviews the response and either closes the notice or asks a follow-up
        question. Either way, you get a notification.
      </div>
    </div>
  </>
)

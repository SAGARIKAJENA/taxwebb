import React from 'react'

export interface GSTStatusCardProps {
  applicationRef: string
  businessName?: string
  onDashboard: () => void
  onTrackInApplications: () => void
  onContactSupport: () => void
}

export const GSTStatusCard: React.FC<GSTStatusCardProps> = ({
  applicationRef,
  businessName,
  onDashboard,
  onTrackInApplications,
  onContactSupport,
}) => {
  return (
    <aside className="gst-status-sidebar-col">
      {/* Deep Blue Application Card */}
      <div className="gst-status-card">
        <div className="gst-status-card__top">
          <div className="gst-status-card__app-id-group">
            <div className="gst-status-card__app-id-label">APPLICATION ID</div>
            <div className="gst-status-card__app-id">{applicationRef}</div>
          </div>
          <span className="gst-status-card__badge">Under Verification</span>
        </div>

        <div className="gst-status-card__meta-grid">
          <div className="gst-status-card__meta-col">
            <span className="gst-status-card__meta-label">Business</span>
            <strong
              className="gst-status-card__meta-val"
              title={businessName || 'Your Business'}
            >
              {businessName || 'Your Business'}
            </strong>
          </div>
          <div className="gst-status-card__meta-col">
            <span className="gst-status-card__meta-label">Applied On</span>
            <strong className="gst-status-card__meta-val">Today</strong>
          </div>
          <div className="gst-status-card__meta-col">
            <span className="gst-status-card__meta-label">Est. Completion</span>
            <strong className="gst-status-card__meta-val">3-5 Business Days</strong>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="gst-status-actions">
        {/* Track in My Applications */}
        <button
          type="button"
          className="gst-status-btn gst-status-btn--track"
          onClick={onTrackInApplications}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gst-status-btn-icon"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <span>Track in My Applications</span>
        </button>

        {/* Go to Home Dashboard */}
        <button
          type="button"
          className="gst-status-btn gst-status-btn--dashboard"
          onClick={onDashboard}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="gst-status-btn-icon"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Go to Home Dashboard</span>
        </button>

        {/* Contact Support / CA */}
        <button
          type="button"
          className="gst-status-btn gst-status-btn--support"
          onClick={onContactSupport}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gst-status-btn-icon"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Contact Support / CA</span>
        </button>
      </div>
    </aside>
  )
}

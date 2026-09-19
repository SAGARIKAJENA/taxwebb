import React from 'react'
import { useNavigate } from 'react-router-dom'
import { routePaths } from '@core/config'
import type { PaymentResult } from '../GSTStepPayment/gstPayment.types'
import { GSTStatusTimeline } from './GSTStatusTimeline'
import { GSTStatusCard } from './GSTStatusCard'
import './GSTPaymentSuccess.css'

export interface GSTPaymentSuccessProps {
  details: PaymentResult
  businessName?: string
  onBackToDashboard?: () => void
  onTrackApplications?: () => void
}

export const GSTPaymentSuccess: React.FC<GSTPaymentSuccessProps> = ({
  details,
  businessName,
  onBackToDashboard,
  onTrackApplications,
}) => {
  const navigate = useNavigate()

  const handleDashboard = () => {
    if (onBackToDashboard) {
      onBackToDashboard()
    } else {
      navigate(routePaths.dashboard)
    }
  }

  const handleTrackInApplications = () => {
    if (onTrackApplications) {
      onTrackApplications()
    } else {
      navigate(routePaths.applications)
    }
  }

  const handleContactSupport = () => {
    navigate(routePaths.support)
  }

  const appRef = details.applicationRef || 'GST-Registration'

  return (
    <div className="gst-status-page-container">
      {/* Desktop Top Header Bar */}
      <header className="gst-status-desktop-header">
        <div className="gst-status-header-left">
          <div>
            <h1 className="gst-status-page-title">Application Status</h1>
            <p className="gst-status-page-subtitle">Track your GST registration filing progress</p>
          </div>
        </div>

        <div className="gst-status-header-right">
          <span className="gst-status-ref-badge">
            Ref: {appRef}
          </span>
          <span className="gst-status-pill-badge">
            Active Filing
          </span>
        </div>
      </header>

      {/* Full-Width Success Alert Banner */}
      <div className="gst-status-alert-banner">
        <div className="gst-status-alert__icon-wrap">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gst-status-alert__check"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="gst-status-alert__content">
          <h2 className="gst-status-alert__title">Application Submitted!</h2>
          <p className="gst-status-alert__desc">
            Your GST application has been successfully filed with TaxEdge.
          </p>
        </div>
        <div className="gst-status-alert__tag">
          <span>⚡ Est. Completion: 3-5 Business Days</span>
        </div>
      </div>

      {/* Desktop 2-Column Grid */}
      <div className="gst-status-desktop-grid">
        <GSTStatusTimeline />

        <GSTStatusCard
          applicationRef={appRef}
          businessName={businessName}
          onDashboard={handleDashboard}
          onTrackInApplications={handleTrackInApplications}
          onContactSupport={handleContactSupport}
        />
      </div>
    </div>
  )
}

export default GSTPaymentSuccess

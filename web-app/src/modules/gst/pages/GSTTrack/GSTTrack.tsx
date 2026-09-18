import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { routePaths } from '@core/config'
import GSTTrackHeader from './GSTTrackHeader'
import GSTTrackAppCard from './GSTTrackAppCard'
import GSTTrackTimeline from './GSTTrackTimeline'
import GSTTrackSidebar from './GSTTrackSidebar'
import './GSTTrack.css'

export const GSTTrack: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const currentAppId = id || 'GST-2026-35907'

  const handleBackToApplications = () => {
    navigate(routePaths.gst.root)
  }

  const handleReuploadDocuments = () => {
    navigate(routePaths.gst.fileUpload)
  }

  const handleGoToHome = () => {
    navigate(routePaths.gst.root)
  }

  const handleTrackInApplications = () => {
    navigate(routePaths.gst.root)
  }

  const handleContactSupport = () => {
    navigate(`${routePaths.support}?appId=${encodeURIComponent(currentAppId)}`)
  }

  return (
    <div className="gst-track-page-container">
      {/* Header & Alert */}
      <GSTTrackHeader />

      {/* Navy Application Details Card */}
      <GSTTrackAppCard
        appId={currentAppId}
        statusText="Under Verification"
        businessName="Shree Deshmukh Enterprises"
        appliedOnDate="15 Sep 2026"
        estCompletion="1-2 Business Days"
      />

      {/* Grid: Left Timeline + Right Sidebar */}
      <div className="gst-track-grid-layout">
        <main className="gst-track-main-col">
          <GSTTrackTimeline />
        </main>

        <GSTTrackSidebar
          onReuploadDocuments={handleReuploadDocuments}
          onGoToHome={handleGoToHome}
          onTrackInApplications={handleTrackInApplications}
          onContactSupport={handleContactSupport}
        />
      </div>

      {/* Bottom Back Button Action */}
      <div className="gst-track-footer-actions">
        <button
          type="button"
          onClick={handleBackToApplications}
          className="gst-track-footer-back-btn"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gst-track-footer-back-icon"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Applications
        </button>
      </div>
    </div>
  )
}

export default GSTTrack

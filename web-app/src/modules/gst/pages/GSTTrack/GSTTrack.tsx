import { Link, useNavigate, useParams } from 'react-router-dom'
import { routePaths } from '@core/config'
import { EmptyState, Loader } from '@shared/components'
import { useGstMonthlyFilingDetail } from '../../hooks/useGstMonthlyFilingDetail'
import './GSTTrack.css'

export const GSTTrack = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading } = useGstMonthlyFilingDetail(id)

  if (isLoading) return <Loader label="Loading tracking status" />
  if (!data) return <EmptyState title="Application not found" />

  const handleMessageExecutive = () => {
    navigate(
      `${routePaths.support}?appId=${encodeURIComponent(data.reference)}&executiveId=exec_rohit&executiveName=Rohit%20Kulkarni&serviceName=${encodeURIComponent(data.title)}`,
    )
  }

  const handleDownloadReceipt = () => {
    navigate(
      `${routePaths.paymentReceiptDirect}?id=${encodeURIComponent(data.reference)}&appRef=${encodeURIComponent(data.reference)}`,
    )
  }

  const currentStageIndex = data.tracking?.currentStageIndex ?? 7
  const totalStages = data.tracking?.totalStages ?? (data.timeline ? data.timeline.length : 12)
  const arnNumber = data.tracking?.arnNumber ?? 'ARN AA2708260041926'

  return (
    <div className="gst-track-page">
      {/* Breadcrumb Navigation */}
      <nav className="gst-track-page__breadcrumb" aria-label="Breadcrumb">
        <Link to={routePaths.gst.root} className="gst-track-page__breadcrumb-link">
          Applications
        </Link>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="gst-track-page__breadcrumb-arrow"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
        <Link to={routePaths.gst.detail(id || '1')} className="gst-track-page__breadcrumb-link">
          {data.reference}
        </Link>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="gst-track-page__breadcrumb-arrow"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
        <span className="gst-track-page__breadcrumb-current">Track</span>
      </nav>

      {/* Header Status Card */}
      <div className="gst-track-header-card">
        <div className="gst-track-header-card__top">
          <div className="gst-track-header-card__info">
            <span className="gst-track-header-card__ref">{data.reference}</span>
            <h1 className="gst-track-header-card__title">{data.title}</h1>
            <p className="gst-track-header-card__subtitle">{data.details}</p>
          </div>

          <div className="gst-track-header-card__status-col">
            <span className="gst-track-header-card__badge">
              <span className="gst-track-header-card__badge-dot" />
              {data.application.currentStage}
            </span>
            <span className="gst-track-header-card__arn">{arnNumber}</span>
          </div>
        </div>

        {/* Progress Bar & Sub-indicators */}
        <div className="gst-track-header-card__progress-section">
          <div className="gst-track-header-card__progress-bar">
            <div
              className="gst-track-header-card__progress-fill"
              style={{ width: `${data.progress}%` }}
            />
          </div>

          <div className="gst-track-header-card__progress-labels">
            <span className="gst-track-header-card__stage-text">
              Stage {currentStageIndex} of {totalStages}
            </span>
            <span className="gst-track-header-card__percent-text">
              {data.progress}% complete
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="gst-track-page__grid">
        {/* Left Column: Timeline Tracker */}
        <main className="gst-track-page__main-col">
          <div className="gst-track-header-card" style={{ padding: '2rem' }}>
            <EmptyState title="Application Timeline" description="Stage tracking details will be rendered here." />
          </div>
        </main>

        {/* Right Column: Assigned Executive & Application Details */}
        <aside className="gst-track-page__sidebar-col">
          <div className="gst-track-header-card" style={{ padding: '1.5rem', gap: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#172033' }}>
              Application Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
              <div>Reference: <strong style={{ color: '#172033' }}>{data.reference}</strong></div>
              <div>Stage: <strong style={{ color: '#172033' }}>{data.application.currentStage}</strong></div>
              <div>Opened: <strong style={{ color: '#172033' }}>{data.application.opened}</strong></div>
              <div>Due: <strong style={{ color: '#172033' }}>{data.application.due}</strong></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={handleMessageExecutive}
                style={{ padding: '0.625rem 1rem', borderRadius: '8px', cursor: 'pointer', background: '#f97316', color: '#fff', border: 'none', fontWeight: 600 }}
              >
                Message Executive
              </button>
              <button
                type="button"
                onClick={handleDownloadReceipt}
                style={{ padding: '0.625rem 1rem', borderRadius: '8px', cursor: 'pointer', background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', fontWeight: 500 }}
              >
                View Receipt
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default GSTTrack

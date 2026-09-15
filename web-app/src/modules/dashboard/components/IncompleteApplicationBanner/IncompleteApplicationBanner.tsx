import { useNavigate } from 'react-router-dom'
import type { ApplicationDraft } from '@core/storage/userStorage'
import './IncompleteApplicationBanner.css'

export interface IncompleteApplicationBannerProps {
  draft: ApplicationDraft
  onResume?: () => void
}

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="incomplete-banner__clock-svg">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="incomplete-banner__arrow-svg">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export const IncompleteApplicationBanner = ({
  draft,
  onResume,
}: IncompleteApplicationBannerProps) => {
  const navigate = useNavigate()

  const handleResume = () => {
    if (onResume) {
      onResume()
    } else {
      navigate(draft.resumeRoute, { state: { resumeDraft: true, step: draft.currentStep } })
    }
  }

  return (
    <section className="incomplete-banner" onClick={handleResume} aria-label="Incomplete Application Resume Banner">
      {/* Top Row: Badge & Saved Time */}
      <div className="incomplete-banner__top">
        <div className="incomplete-banner__badge">
          <ClockIcon />
          <span>INCOMPLETE APPLICATION</span>
        </div>
        <span className="incomplete-banner__time">Saved {draft.savedAt}</span>
      </div>

      {/* Middle: Title & Step info */}
      <div className="incomplete-banner__content">
        <h3 className="incomplete-banner__title">{draft.serviceTitle}</h3>
        <p className="incomplete-banner__step-text">
          Step {draft.currentStep} of {draft.totalSteps} &middot; Pick up right where you left off
        </p>
      </div>

      {/* Divider */}
      <div className="incomplete-banner__divider" aria-hidden="true" />

      {/* Bottom: Resume CTA */}
      <div className="incomplete-banner__bottom">
        <span className="incomplete-banner__cta-text">Resume Application</span>
        <div className="incomplete-banner__circle-btn" aria-hidden="true">
          <ArrowRightIcon />
        </div>
      </div>
    </section>
  )
}

export default IncompleteApplicationBanner

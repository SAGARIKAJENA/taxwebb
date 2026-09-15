import type { DashboardBrief } from '../../types/dashboard.types'
import './DashboardHero.css'

export interface DashboardHeroProps {
  userName: string
  brief?: DashboardBrief
}

const getGreeting = (): string => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export const DashboardHero = ({ userName }: DashboardHeroProps) => {
  const firstName = userName ? userName.split(' ')[0] : 'Sagarika'

  return (
    <section className="dashboard-hero" aria-label="TaxEdge Overview Banner">
      {/* Left Column: Greeting & Question */}
      <div className="dashboard-hero__left">
        <h1 className="dashboard-hero__greeting">
          {getGreeting()}, {firstName} <span className="dashboard-hero__wave">👋</span>
        </h1>

        <h2 className="dashboard-hero__question">
          What can we help you with today?
        </h2>
      </div>

      {/* Center Column: High-Res 3D Tax Document & Calculator Illustration */}
      <div className="dashboard-hero__center">
        <img
          src="/assets/images/dashboard/tax-calculator-hero.png"
          alt="Tax Filing & Calculation Illustration"
          className="dashboard-hero__tax-img"
          loading="eager"
        />
      </div>

      {/* Right Column: Slogan Quote with Badge & Underline Accent */}
      <div className="dashboard-hero__right">
        <div className="dashboard-hero__quote-block">
          <p className="dashboard-hero__quote-text">
            &ldquo;Simplifying<br />
            Taxes for a<br />
            Brighter Tomorrow&rdquo;
          </p>
          <span className="dashboard-hero__quote-badge">100% Compliant &bull; Secure</span>
          <div className="dashboard-hero__quote-line" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export default DashboardHero



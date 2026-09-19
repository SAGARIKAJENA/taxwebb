import React from 'react'
import type { ApplicationOverviewFilter, ApplicationOverviewStats } from '../types/applications.types'

interface ApplicationOverviewCardsProps {
  stats: ApplicationOverviewStats
  activeFilter: ApplicationOverviewFilter
  onSelectFilter: (filter: ApplicationOverviewFilter) => void
}

export const ApplicationOverviewCards: React.FC<ApplicationOverviewCardsProps> = ({
  stats,
  activeFilter,
  onSelectFilter,
}) => {
  const statItems: {
    id: ApplicationOverviewFilter
    label: string
    value: number
    colorClass: string
  }[] = [
    {
      id: 'ALL',
      label: 'Total Applications',
      value: stats.total,
      colorClass: 'app-stat-card--total',
    },
    {
      id: 'IN_PROGRESS',
      label: 'In Progress',
      value: stats.inProgress,
      colorClass: 'app-stat-card--in-progress',
    },
    {
      id: 'COMPLETED',
      label: 'Completed',
      value: stats.completed,
      colorClass: 'app-stat-card--completed',
    },
    {
      id: 'UNDER_VERIFICATION',
      label: 'Under Verification',
      value: stats.underVerification,
      colorClass: 'app-stat-card--under-verification',
    },
  ]

  return (
    <section className="app-overview-section" aria-labelledby="overview-heading">
      <h2 id="overview-heading" className="app-section-title">Application Overview</h2>
      <div className="app-overview-grid">
        {statItems.map((item) => {
          const isSelected = activeFilter === item.id

          return (
            <button
              key={item.id}
              type="button"
              className={`app-stat-card ${item.colorClass} ${isSelected ? 'app-stat-card--selected' : ''}`}
              onClick={() => onSelectFilter(item.id)}
            >
              <div className="app-stat-card__content">
                <span className="app-stat-card__value">{item.value}</span>
                <span className="app-stat-card__label">{item.label}</span>
              </div>
              {isSelected && <div className="app-stat-card__bottom-bar" />}
            </button>
          )
        })}
      </div>
    </section>
  )
}

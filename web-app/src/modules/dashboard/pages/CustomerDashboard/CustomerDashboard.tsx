import { useState } from 'react'
import { EmptyState, Loader } from '@shared/components'
import { useAuthStore } from '@store/index'
import { userStorage, type ApplicationDraft } from '@core/storage/userStorage'
import {
  DashboardHero,
  QuickServices,
  FinancialOverview,
  IncompleteApplicationBanner,
  DashboardOverviewGrid,
} from '../../components'
import { useDashboardSummary } from '../../hooks/useDashboardSummary'
import './CustomerDashboard.css'

export const CustomerDashboard = () => {
  const user = useAuthStore((state) => state.user)
  const { data, isLoading, error } = useDashboardSummary()
  const [activeDraft] = useState<ApplicationDraft | null>(() => userStorage.getActiveDraft())

  if (isLoading) return <Loader fullPage label="Loading your dashboard" />
  if (error || !data) {
    return <EmptyState title="We could not load your dashboard" description={error ?? undefined} />
  }

  return (
    <div className="dashboard">
      {/* 1. Hero Banner */}
      <DashboardHero userName={user?.fullName || 'Sagarika'} brief={data.brief} />

      {/* 2. Services Grid */}
      <QuickServices />

      {/* 3. Your Financial Overview */}
      <FinancialOverview
        stats={data.stats}
        activeCount={data.brief?.activeApplications}
        paymentDue={data.brief?.paymentDue}
      />

      {/* 4. Incomplete Application Draft (Reference Image 1) */}
      {activeDraft && (
        <IncompleteApplicationBanner draft={activeDraft} />
      )}

      {/* 5. Overview Grid (Upcoming Deadlines & Applications) */}
      <DashboardOverviewGrid
        applications={data.recentApplications}
        deadlines={data.upcomingDeadlinesList}
      />
    </div>
  )
}

export default CustomerDashboard


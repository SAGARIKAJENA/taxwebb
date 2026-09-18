import { localStore } from './localStorage'
import type { RecentApplication } from '@modules/dashboard/types/dashboard.types'

const USER_APPLICATIONS_KEY = 'taxedge.userApplications'
const APPLICATION_DRAFTS_KEY = 'taxedge.applicationDrafts'

export interface ApplicationDraft {
  serviceId: string
  serviceTitle: string
  currentStep: number
  totalSteps: number
  stepLabel?: string
  formData: Record<string, unknown>
  savedAt: string
  savedTimestamp: number
  resumeRoute: string
}

export const userStorage = {
  getUserApplications(): RecentApplication[] {
    const raw = localStore.get<RecentApplication[]>(USER_APPLICATIONS_KEY) || []

    // Filter out dummy/mock placeholders (e.g. empty 'New Registration · India' default submissions or mock references)
    // and deduplicate by code/service so repeated submissions don't duplicate identical applications
    const seenCodes = new Set<string>()
    const cleaned: RecentApplication[] = []

    for (const app of raw) {
      // Exclude placeholder submissions where no real user details were filled
      const isDummyMeta =
        !app.meta ||
        app.meta.trim() === '' ||
        app.meta === 'New Registration · India' ||
        app.meta === 'New Registration · ' ||
        app.meta.includes('94,53,14,162')

      const isMockId =
        app.id.startsWith('mock-') ||
        app.id.startsWith('default-') ||
        app.id.startsWith('sample-')

      // Exclude legacy hardcoded template mock codes from previous test runs
      const isMockCode =
        app.code === 'GST-2026-00118' ||
        app.code === 'TDS-2026-59303' ||
        app.code === 'AA29944099962' ||
        app.code === 'GST-2026-44191' ||
        app.code === 'ITR-2026-37226' ||
        app.code === 'ITR-2026-00074'

      if (isDummyMeta || isMockId || isMockCode) continue

      const key = app.code || app.id
      if (!seenCodes.has(key)) {
        seenCodes.add(key)
        cleaned.push(app)
      }
    }

    // If cleaned differs from raw (duplicates or mock items removed), sync back to local storage
    if (cleaned.length !== raw.length) {
      localStore.set(USER_APPLICATIONS_KEY, cleaned)
    }

    return cleaned
  },

  saveUserApplication(app: RecentApplication): void {
    const apps = this.getUserApplications()
    const index = apps.findIndex((a) => a.id === app.id || (a.code && a.code === app.code))
    if (index >= 0) {
      apps[index] = { ...apps[index], ...app }
    } else {
      apps.unshift(app)
    }
    localStore.set(USER_APPLICATIONS_KEY, apps)
  },

  clearUserApplications(): void {
    localStore.remove(USER_APPLICATIONS_KEY)
  },

  /* Drafts Management */
  getAllDrafts(): ApplicationDraft[] {
    return localStore.get<ApplicationDraft[]>(APPLICATION_DRAFTS_KEY) || []
  },

  getActiveDraft(): ApplicationDraft | null {
    const drafts = this.getAllDrafts()
    if (drafts.length === 0) {
      return null
    }
    // Sort by most recently saved
    return drafts.sort((a, b) => b.savedTimestamp - a.savedTimestamp)[0] || null
  },

  getDraft(serviceId: string): ApplicationDraft | null {
    const drafts = this.getAllDrafts()
    return drafts.find((d) => d.serviceId === serviceId) || null
  },

  saveDraft(draft: ApplicationDraft): void {
    const drafts = this.getAllDrafts()
    const index = drafts.findIndex((d) => d.serviceId === draft.serviceId)
    if (index >= 0) {
      drafts[index] = draft
    } else {
      drafts.unshift(draft)
    }
    localStore.set(APPLICATION_DRAFTS_KEY, drafts)
  },

  deleteDraft(serviceId: string): void {
    const drafts = this.getAllDrafts().filter((d) => d.serviceId !== serviceId)
    localStore.set(APPLICATION_DRAFTS_KEY, drafts)
  },

  clearAllDrafts(): void {
    localStore.remove(APPLICATION_DRAFTS_KEY)
  },
}


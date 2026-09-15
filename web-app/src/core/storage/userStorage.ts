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
    return localStore.get<RecentApplication[]>(USER_APPLICATIONS_KEY) || []
  },

  saveUserApplication(app: RecentApplication): void {
    const apps = this.getUserApplications()
    const index = apps.findIndex((a) => a.id === app.id)
    if (index >= 0) {
      apps[index] = app
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
      // Default sample draft matching reference Image 1 & 2
      const sampleDraft: ApplicationDraft = {
        serviceId: 'gst-registration',
        serviceTitle: 'GST Registration',
        currentStep: 3,
        totalSteps: 4,
        stepLabel: 'Upload',
        formData: {
          businessData: {
            legalName: 'Sagarika Enterprise',
            tradeName: 'Sagarika',
            pan: 'ABCDE1234F',
            aadhaar: '987654321098',
            mobile: '9876543210',
            email: 'sagarika@example.com',
            constitution: 'proprietorship',
            natureOfBusiness: 'Retail & Services',
            principalActivity: 'retail',
            turnover: '20_to_100',
            compositionScheme: 'no',
          },
          addressBankData: {
            address: 'Plot 42, Hitech City Main Road, Madhapur',
            city: 'Hyderabad',
            pinCode: '500081',
            state: 'Telangana',
            possessionNature: 'rented',
            accountHolderName: 'Sagarika',
            accountNumber: '526978976846709768',
            ifscCode: 'HDFC0000123',
            accountType: 'current',
            additionalPlaces: [],
          },
        },
        savedAt: '12:17 pm',
        savedTimestamp: Date.now() - 1000 * 60 * 30,
        resumeRoute: '/gst/registration',
      }
      this.saveDraft(sampleDraft)
      return sampleDraft
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


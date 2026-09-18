import type { ApplicationsItem, ApplicationCategory } from '../types/applications.types'

export const APPLICATION_CATEGORIES: { id: ApplicationCategory; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'GST', label: 'GST' },
  { id: 'ITR', label: 'ITR' },
  { id: 'Loans', label: 'Loans' },
  { id: 'Business', label: 'Business' },
  { id: 'Insurance', label: 'Insurance' },
]

export const DEFAULT_APPLICATIONS: ApplicationsItem[] = [
  {
    id: 'app-gst-amend-1',
    reference: 'AA29944099962',
    title: 'GST Amendment — Bank Accounts',
    category: 'GST',
    status: 'UNDER_VERIFICATION',
    statusLabel: 'Under Verification',
    date: '9 Sep 2026',
    tag: 'NON-CORE',
    to: '/gst/amendment',
    createdAt: '2026-09-09T10:00:00.000Z',
    updatedAt: '2026-09-09T10:00:00.000Z',
  },
  {
    id: 'app-gst-reg-2',
    reference: 'GST-2026-44191',
    title: 'GST Registration',
    category: 'GST',
    status: 'UNDER_VERIFICATION',
    statusLabel: 'Under Verification',
    date: '17 Sep 2026',
    to: '/gst/registration?step=status',
    createdAt: '2026-09-17T09:30:00.000Z',
    updatedAt: '2026-09-17T09:30:00.000Z',
  },
  {
    id: 'app-itr-filing-3',
    reference: 'ITR-2026-37226',
    title: 'ITR Filing - ITR-1 (Sahaj - Salaried & Simple Income)',
    category: 'ITR',
    status: 'UNDER_VERIFICATION',
    statusLabel: 'Under Verification',
    date: '17 Sep 2026',
    to: '/itr',
    createdAt: '2026-09-17T08:15:00.000Z',
    updatedAt: '2026-09-17T08:15:00.000Z',
  },
]

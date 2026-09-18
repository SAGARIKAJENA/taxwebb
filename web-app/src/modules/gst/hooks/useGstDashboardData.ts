import { useState, useMemo } from 'react';
import { userStorage } from '@core/storage/userStorage';

export interface GstStat {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  iconType: 'status' | 'returns' | 'due' | 'exposure';
}

export interface GstService {
  id: string;
  title: string;
  description: string;
  price: string;
  priceType: string;
  iconType: 'registration' | 'filing' | 'compliance' | 'cancellation' | 'amendment' | 'certificate';
  badge?: string;
  turnaround?: string;
}

export interface GstAppRecord {
  id: string;
  title: string;
  reference: string;
  details: string;
  assignee: string;
  status: string;
  progress: number;
}

export const DEFAULT_GST_SERVICES: GstService[] = [
  { id: '1', title: 'GST Registration', description: 'New GSTIN for your business, end to end with the department.', price: '₹5,000', priceType: 'one time', iconType: 'registration', badge: 'Most Popular', turnaround: '3–5 days' },
  { id: '2', title: 'GST Filing', description: 'Monthly or quarterly GSTR-1 and GSTR-3B preparation and filing.', price: '₹2,500', priceType: 'per period', iconType: 'filing', badge: 'Periodic', turnaround: 'Same Day' },
  { id: '3', title: 'GST Compliance', description: 'Annual return, reconciliation and notice handling.', price: '₹4,000', priceType: 'per year', iconType: 'compliance', badge: 'Annual', turnaround: 'Comprehensive' },
  { id: '4', title: 'GST Amendment', description: 'Change address, business name, or authorised signatory.', price: '₹2,000', priceType: 'per change', iconType: 'amendment', badge: 'Modification', turnaround: '24–48 hrs' },
  { id: '5', title: 'GST Cancellation', description: 'Surrender a GSTIN and close out pending returns.', price: '₹3,500', priceType: 'one time', iconType: 'cancellation', badge: 'Closure', turnaround: '5–7 days' },
  { id: '6', title: 'GST Certificate', description: 'Download a fresh registration certificate copy.', price: '₹750', priceType: 'per copy', iconType: 'certificate', badge: 'Official', turnaround: 'Instant' },
];

export const useGstDashboardData = () => {
  const userApps = useMemo(() => {
    return userStorage.getUserApplications().filter((app) => app.title.toLowerCase().includes('gst'))
  }, []);

  const applications: GstAppRecord[] = useMemo(() => {
    return userApps.map((a) => ({
      id: a.id,
      title: a.title,
      reference: a.code,
      details: a.meta,
      assignee: 'TaxEdge Team',
      status: a.statusLabel,
      progress: a.progress,
    }))
  }, [userApps]);

  const stats: GstStat[] = useMemo(() => {
    const hasApps = applications.length > 0;
    return [
      {
        id: '1',
        title: 'GSTIN status',
        value: hasApps ? 'In Progress' : 'Not Registered',
        subtitle: hasApps ? 'Application submitted' : 'Apply for GST registration',
        iconType: 'status',
      },
      {
        id: '2',
        title: 'Returns filed',
        value: '0',
        subtitle: 'No filings yet',
        iconType: 'returns',
      },
      {
        id: '3',
        title: 'Next due',
        value: '—',
        subtitle: 'No pending returns',
        iconType: 'due',
      },
      {
        id: '4',
        title: 'Late fee exposure',
        value: '₹0',
        subtitle: 'No pending returns',
        iconType: 'exposure',
      },
    ];
  }, [applications]);

  const [services] = useState<GstService[]>(DEFAULT_GST_SERVICES);
  const [isLoading] = useState(false);

  return { stats, services, applications, isLoading };
};

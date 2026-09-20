import type { MetricItem, LeadItem, ContactMessage, ActivityItem, WebsiteStatusInfo } from '../types/admin';

export const DEMO_METRICS: MetricItem[] = [
  {
    id: 'total-leads',
    label: 'Total Leads',
    value: 0,
    change: '0%',
    isPositive: true,
    period: 'All Time Recorded',
    isDemoData: false
  },
  {
    id: 'new-leads',
    label: 'New Leads (7 Days)',
    value: 0,
    change: '0 today',
    isPositive: true,
    period: 'Requires Dispatch Follow-up',
    isDemoData: false
  },
  {
    id: 'contact-messages',
    label: 'Contact Messages',
    value: 0,
    change: '0 unread',
    isPositive: true,
    period: 'Inquiries & Carrier Queries',
    isDemoData: false
  },
  {
    id: 'website-status',
    label: 'Website Status',
    value: '100% Operational',
    change: 'Live on Vercel Edge',
    isPositive: true,
    period: 'dgwsolutionllc.com',
    isDemoData: false
  }
];

export const DEMO_RECENT_LEADS: LeadItem[] = [];

export const DEMO_CONTACT_MESSAGES: ContactMessage[] = [];

export const DEMO_ACTIVITY_LOG: ActivityItem[] = [];

export const DEMO_WEBSITE_STATUS: WebsiteStatusInfo = {
  publicDomain: 'https://dgwsolutionllc.com',
  sslStatus: 'Valid',
  lastDeployTime: 'Sep 20, 2026',
  sitemapIndexed: true,
  robotsTxtStatus: 'Blocking Admin',
  firebaseConfigured: true
};

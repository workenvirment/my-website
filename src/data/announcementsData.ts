import type { AnnouncementItem } from '../types';

export const PLATFORM_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-001',
    title: 'Severe Weather Advisory: I-70 Rocky Mountain Pass Chain Law Active',
    message: 'Colorado Department of Transportation (CDOT) has enacted passenger and commercial vehicle Chain Laws on I-70 between Silverthorne (MM 205) and Vail Pass (MM 190). All DGW carriers dispatched west of Denver (HQ 9057 E 50th Ave) must confirm tire chains and minimum 4/32 inch tread depth.',
    priority: 'urgent',
    category: 'Weather & Road Advisory',
    createdAt: '2026-09-06 08:30 AM',
    author: 'DGW Safety & Compliance Lead (Saad Altaf)',
    targetRole: 'all',
    active: true
  },
  {
    id: 'ann-002',
    title: 'Spot Market RPM Surge: Southeast to Midwest Outbound Reefer',
    message: 'National Reefer average outbound Atlanta (GA) and Savannah port lanes surged +$0.38/mile ($3.22/mi average). Carriers and Owner-Operators staged in the Southeast can contact Dispatch for instant tenders.',
    priority: 'high',
    category: 'Market Rate Alert',
    createdAt: '2026-09-05 02:15 PM',
    author: 'DGW Freight Rate Intelligence Desk',
    targetRole: 'carrier',
    active: true
  },
  {
    id: 'ann-003',
    title: 'FMCSA Broker Bond & Transparency Standard Enacted',
    message: 'All carrier setup packets generated through DGW Solutions LLC automatically cross-verify broker BMC-84 $75,000 surety bonds in real-time before rate confirmation signing.',
    priority: 'normal',
    category: 'Compliance Notice',
    createdAt: '2026-09-01 09:00 AM',
    author: 'DGW Legal Operations',
    targetRole: 'all',
    active: true
  }
];

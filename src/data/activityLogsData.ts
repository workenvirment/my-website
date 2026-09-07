import type { ActivityLogItem } from '../types';

export const INITIAL_ACTIVITY_LOGS: ActivityLogItem[] = [
  {
    id: 'act-01',
    userId: 'usr-saad-01',
    userName: 'Saad Altaf (Sole Member)',
    userRole: 'super-admin',
    action: 'System Policy & EIN CP575G Verification Updated',
    category: 'admin',
    details: 'Verified corporate filing with IRS (EIN 42-4868007) and Denver HQ compliance record.',
    ipAddress: '198.51.100.24',
    timestamp: '2026-09-06 15:40:12'
  },
  {
    id: 'act-02',
    userId: 'usr-vance-101',
    userName: 'Robert Vance (Owner Operator)',
    userRole: 'carrier',
    action: 'Rate Confirmation Executed',
    category: 'load',
    details: 'Tender DGW-TN-9942 accepted at $2.94/mi from Dallas, TX to Nashville, TN (53 Dry Van).',
    ipAddress: '172.56.21.89',
    timestamp: '2026-09-06 14:18:04'
  },
  {
    id: 'act-03',
    userId: 'usr-apex-301',
    userName: 'Marcus Brody (Apex 3PL)',
    userRole: 'broker',
    action: 'Carrier Safety Vetting Query',
    category: 'search',
    details: 'Performed FMCSA safety and BIPD insurance check on MC-984210.',
    ipAddress: '64.233.160.1',
    timestamp: '2026-09-06 13:05:40'
  },
  {
    id: 'act-04',
    userId: 'usr-travis-202',
    userName: 'Travis Cole',
    userRole: 'owner-operator',
    action: 'Staged Location Ping Updated',
    category: 'profile',
    details: 'Updated status to AVAILABLE in Midland, TX with 40ft Hotshot trailer.',
    ipAddress: '166.137.252.14',
    timestamp: '2026-09-06 11:22:19'
  }
];

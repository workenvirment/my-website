export type LeadStatus = 'new' | 'in_review' | 'contacted' | 'onboarded' | 'archived';
export type MessageStatus = 'unread' | 'read' | 'replied' | 'archived';

export interface CarrierLeadDoc {
  id?: string;
  truckerId?: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  mcNumber?: string;
  equipment: string;
  truckCount?: string;
  preferredLanes?: string;
  message?: string;
  status: LeadStatus;
  createdAt: any;
  updatedAt?: any;
  source?: string;
}

export interface ContactMessageDoc {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: any;
  updatedAt?: any;
  source?: string;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  totalTruckers: number;
  totalMessages: number;
  unreadMessages: number;
  websiteStatus: 'Operational' | 'Degraded' | 'Offline';
}

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdminAuthorized?: boolean;
  role?: 'Super Admin' | 'Operations Admin' | 'Dispatcher' | 'Document Manager' | 'Viewer';
}

export interface MetricItem {
  id: string;
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  period: string;
  isDemoData?: boolean;
}

export interface LeadItem {
  id: string;
  truckerId?: string;
  carrierName: string;
  mcNumber: string;
  equipmentType: string;
  phone: string;
  email: string;
  submittedAt: string;
  status: 'New' | 'In Review' | 'Contacted' | 'Onboarded' | 'Archived';
  isDemoData?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  preview: string;
  receivedAt: string;
  isRead: boolean;
  isDemoData?: boolean;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  type: 'lead' | 'system' | 'message' | 'dispatch' | 'auth' | 'load' | 'trucker' | 'broker' | 'doc';
  title: string;
  description: string;
  user: string;
  isDemoData?: boolean;
}

export interface WebsiteStatusInfo {
  publicDomain: string;
  sslStatus: 'Valid' | 'Pending' | 'Error';
  lastDeployTime: string;
  sitemapIndexed: boolean;
  robotsTxtStatus: 'Blocking Admin' | 'Allowing Public';
  firebaseConfigured: boolean;
}

// -------------------------------------------------------------
// Extended Operations Management Types
// -------------------------------------------------------------

export type TruckerStatus = 'Active' | 'Pending' | 'Inactive' | 'Onboarding';
export type LoadStatus = 'Open' | 'Assigned' | 'Booked' | 'In Transit' | 'Delivered' | 'Cancelled';
export type BrokerStatus = 'Active' | 'Pending' | 'Inactive';
export type DocumentStatus = 'Valid' | 'Expiring Soon' | 'Expired' | 'Missing';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface TruckerDoc {
  id?: string;
  leadId?: string;
  name: string;
  company?: string;
  phone: string;
  email?: string;
  mcNumber?: string;
  dotNumber?: string;
  equipment: string;
  truckCount?: string;
  preferredLanes?: string;
  location?: string;
  status: TruckerStatus;
  notes?: string;
  rating?: number;
  createdAt?: any;
  updatedAt?: any;
  source?: string;
}

export interface Trucker {
  id: string;
  leadId?: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  mcNumber: string;
  dotNumber?: string;
  equipment: string;
  location: string;
  status: TruckerStatus;
  lastActive: string;
  truckCount?: string;
  preferredLanes?: string;
  rating?: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  avatarColor?: string;
}

export interface Broker {
  id: string;
  companyName: string;
  contact: string;
  phone: string;
  email: string;
  mcNumber?: string;
  creditScore?: string;
  activeLoadsCount?: number;
  status: BrokerStatus;
  paymentTerms?: string;
  notes?: string;
  createdAt: string;
  avatarInitial?: string;
}

export interface Load {
  id: string;
  loadNumber: string;
  brokerId?: string;
  brokerName: string;
  truckerId?: string;
  assignedTruckerName?: string;
  origin: string;
  destination: string;
  rate: number;
  mileage?: number;
  equipment: string;
  commodity?: string;
  weight?: string;
  pickupDate: string;
  deliveryDate: string;
  status: LoadStatus;
  notes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'admin' | 'trucker' | 'broker';
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  attachmentName?: string;
  attachmentType?: string;
}

export interface MessageThread {
  id: string;
  contactName: string;
  contactRole: 'Trucker' | 'Broker' | 'Dispatcher';
  contactPhone?: string;
  contactEmail?: string;
  contactAvatar: string;
  mcNumber?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'online' | 'offline' | 'away';
  messages: ChatMessage[];
}

export interface OperationTask {
  id: string;
  title: string;
  dueTime: string;
  priority: TaskPriority;
  category: 'message' | 'trucker' | 'load' | 'document' | 'general';
  isCompleted: boolean;
  assignedTo?: string;
  relatedId?: string;
  createdAt: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  type: 'trucker' | 'message' | 'document' | 'broker' | 'load' | 'system';
  isUnread: boolean;
  routeLink?: string;
}

export interface DocumentRecord {
  id: string;
  name: string;
  category: 'MC Authority Letter' | 'W9 Form' | 'COI' | 'Carrier Agreement' | 'Broker Documents' | 'Other Documents';
  ownerName: string;
  mcNumber: string;
  uploadDate: string;
  expirationDate: string;
  status: DocumentStatus;
  fileSize?: string;
  fileUrl?: string;
}

export interface MCLookupRecord {
  mcNumber: string;
  dotNumber: string;
  legalName: string;
  dbaName?: string;
  physicalAddress: string;
  phone: string;
  operatingStatus: 'AUTHORIZED' | 'NOT AUTHORIZED' | 'PENDING';
  carrierOperation: 'Interstate' | 'Intrastate';
  authorityStatus: {
    common: 'ACTIVE' | 'INACTIVE' | 'NONE';
    contract: 'ACTIVE' | 'INACTIVE' | 'NONE';
    broker: 'ACTIVE' | 'INACTIVE' | 'NONE';
  };
  insuranceRequired: {
    bipd: string;
    cargo: string;
    bond: string;
  };
  insuranceOnFile: {
    bipd: string;
    cargo: string;
    carrierName: string;
    policyNumber: string;
    effectiveDate: string;
  };
  safetyRating: 'Satisfactory' | 'Conditional' | 'Unrated';
  inspectionSummary: {
    vehicleInspections: number;
    vehicleOOS: number;
    driverInspections: number;
    driverOOS: number;
  };
  powerUnits: number;
  drivers: number;
  lastUpdated: string;
}

export interface AuditLogEntry {
  id: string;
  adminName: string;
  action: string;
  recordType: 'Trucker' | 'Broker' | 'Load' | 'Document' | 'Message' | 'Settings' | 'Auth';
  recordIdentifier: string;
  timestamp: string;
  ipAddress?: string;
  status: 'Success' | 'Failed' | 'Warning';
}

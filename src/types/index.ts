export type UserRole = 
  | 'super-admin'
  | 'admin'
  | 'carrier'
  | 'owner-operator'
  | 'dispatcher'
  | 'broker'
  | 'standard';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  companyName: string;
  mcNumber?: string;
  dotNumber?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  equipmentType?: string;
  truckCount?: number;
  status?: 'active' | 'pending' | 'suspended';
  createdAt?: string;
  lastLogin?: string;
  loginMethod: 'google' | 'email' | 'demo';
}

export type EquipmentCategory = 
  | 'sprinter'
  | 'box-truck'
  | 'hotshot'
  | 'dry-van'
  | 'reefer'
  | 'flatbed'
  | 'stepdeck'
  | 'rgn'
  | 'power-only';

export interface EquipmentSpec {
  id: string;
  name: string;
  slug: EquipmentCategory;
  tagline: string;
  length: string;
  weightRange: string;
  exampleRpm: string;
  exampleWeeklyGross: string;
  requiredGear: string[];
  typicalLoads: string[];
  description: string;
  cdlGuidance: string;
  cdlClass: 'Class A' | 'Class B' | 'Non-CDL / Class B' | 'Class A Specialized';
  imagePlaceholder: string;
  imageUrl?: string;
  subVariations?: {
    size: string;
    weight: string;
    exampleRpm: string;
    exampleGross: string;
  }[];
  powerOnlyFeatures?: string[];
  interchangeNotice?: string;
}

export interface McCarrierRecord {
  id: string;
  mcNumber: string;
  dotNumber: string;
  legalName: string;
  dbaName?: string;
  companyType: 'Carrier' | 'Broker' | 'Freight Forwarder' | 'Owner Operator';
  operatingStatus: 'AUTHORIZED' | 'ACTIVE' | 'CONDITIONAL' | 'INACTIVE';
  authorityType: 'Common Carrier' | 'Contract Carrier' | 'Broker of Freight' | 'Property';
  authorityGrantedDate: string;
  safetyRating: 'Satisfactory' | 'Conditional' | 'Unrated' | 'Gold Tier Verified';
  ratingDate: string;
  powerUnits: number;
  drivers: number;
  mileageYear: string;
  carrierOperation: 'Interstate' | 'Intrastate Hazmat' | 'Intrastate Non-Hazmat';
  cargoCarried: string[];
  equipmentTypes: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    representative: string;
  };
  insurance: {
    bipdRequired: number;
    bipdOnFile: number;
    cargoRequired: number;
    cargoOnFile: number;
    bondRequired?: number;
    bondOnFile?: number;
    insuranceCompany: string;
    policyNumber: string;
    effectiveDate: string;
    verified: boolean;
  };
  inspections: {
    vehicleInspections: number;
    vehicleOosRate: number; // Percentage
    vehicleNationalAvg: number;
    driverInspections: number;
    driverOosRate: number;
    driverNationalAvg: number;
    totalCrashes: number;
  };
  dgwRating: number; // 1 to 5 stars
  isVerifiedByDgw: boolean;
  notes?: string;
  lastUpdated: string;
}

export type TelematicsStatus = 
  | 'available' 
  | 'in-transit' 
  | 'loading' 
  | 'delayed' 
  | 'issue-reported';

export interface TelemetryTruck {
  id: string;
  truckNumber: string;
  driverName: string;
  driverPhone: string;
  equipment: string;
  carrierName: string;
  mcNumber: string;
  status: TelematicsStatus;
  currentLocation: {
    city: string;
    state: string;
    lat: number;
    lng: number;
    heading: number; // in degrees
    speedMph: number;
  };
  origin: {
    city: string;
    state: string;
  };
  destination: {
    city: string;
    state: string;
  };
  loadId: string;
  commodity: string;
  weightLbs: number;
  reeferTempF?: number;
  eta: string;
  progressPercent: number;
  fuelLevelPercent: number;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  category: 'Platform Update' | 'Weather & Road Advisory' | 'Market Rate Alert' | 'Compliance Notice';
  createdAt: string;
  expiresAt?: string;
  author: string;
  targetRole?: UserRole | 'all';
  active: boolean;
}

export interface ActivityLogItem {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  category: 'auth' | 'search' | 'admin' | 'load' | 'document' | 'profile';
  details: string;
  ipAddress?: string;
  timestamp: string;
}

export interface SavedSearchItem {
  id: string;
  userId: string;
  query: string;
  searchType: 'mc' | 'dot' | 'carrier' | 'broker' | 'load';
  filters?: Record<string, string>;
  createdAt: string;
  label?: string;
}

export interface FavoriteItem {
  id: string;
  type: 'carrier' | 'broker' | 'load';
  itemId: string;
  title: string;
  subtitle: string;
  meta: string;
  savedAt: string;
}

export interface MockLoad {
  id: string;
  loadNumber: string;
  origin: { city: string; state: string; zip?: string };
  destination: { city: string; state: string; zip?: string };
  distanceMiles: number;
  equipment: string;
  weightLbs: number;
  sampleRate: number;
  sampleRpm: number;
  pickupDate: string;
  deliveryDate: string;
  brokerSampleName: string;
  status: 'SAMPLE AVAILABLE' | 'SAMPLE COVERED' | 'SAMPLE IN-TRANSIT';
  commodity: string;
  isSampleOnly: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Carriers' | 'Brokers' | 'Documents' | 'Payments' | 'Equipment';
}

export type DocumentCategory = 'carrier' | 'broker' | 'shipper' | 'payment';
export type DocumentStatus = 'REQUIRED' | 'RECEIVED' | 'PENDING' | 'EXPIRED' | 'REVIEW';

export interface DocumentItem {
  id: string;
  name: string;
  code: string;
  category: DocumentCategory;
  whoProvides: string;
  whoReceives: string;
  purpose: string;
  whenRequired: string;
  status: DocumentStatus;
  description: string;
  sampleSummary: {
    title: string;
    sampleFields: { label: string; value: string }[];
    disclaimer: string;
  };
}

export interface CarrierProfileState {
  equipment: string;
  length: string;
  weightCapacity: string;
  targetRpm: string;
  weeklyGrossTarget: string;
  preferredStates: string[];
  operatingZip: string;
  notes: string;
}

export interface LeadSubmission {
  id: string;
  type: 'carrier' | 'broker' | 'general';
  name: string;
  companyName: string;
  email: string;
  phone: string;
  equipment?: string;
  truckLength?: string;
  currentLocation?: string;
  preferredStates?: string;
  experienceYears?: string;
  mcNumber?: string;
  loadType?: string;
  origin?: string;
  destination?: string;
  message: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Reviewing' | 'Archived';
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  primaryActor: string;
  keyDocument: string;
  actionTag: string;
}

export interface EcosystemNode {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  responsibilities: string[];
  documentsProvided: string[];
  documentsReceived: string[];
  communicationFlow: string;
  informationExchanged: string[];
  dgwRole: string;
  iconName: string;
  nodeColor: 'gold' | 'cyan' | 'blue' | 'emerald' | 'orange' | 'purple';
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  carrierBenefit: string;
  brokerBenefit: string;
  category: string;
}

export interface PaymentOption {
  id: string;
  name: string;
  acronym: string;
  typicalTimingExample: string;
  typicalFeeExample: string;
  description: string;
  howItWorks: string;
  keyPoints: string[];
  disclaimer: string;
}

export interface CarrierChecklistItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  required: boolean;
  notes: string;
}

export interface BrokerChecklistItem {
  id: string;
  title: string;
  category: string;
  description: string;
  checkPoint: string;
}

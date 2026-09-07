export interface PortalLoad {
  id: string;
  loadNumber: string;
  origin: { city: string; state: string; zip: string; lat: number; lng: number };
  destination: { city: string; state: string; zip: string; lat: number; lng: number };
  pickupDate: string;
  deliveryDate: string;
  equipment: string;
  weightLbs: number;
  lengthFt: string;
  distanceMiles: number;
  rate: number;
  rpm: number;
  commodity: string;
  broker: { name: string; mc: string; phone: string; email: string; creditScore: number; daysToPay: number };
  carrierAssigned?: { name: string; mc: string; truckId: string; driverName: string; phone: string };
  status: 'AVAILABLE' | 'REQUESTED' | 'BOOKED' | 'DISPATCHED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED';
  isRecommended?: boolean;
  matchScore?: number;
  notes: string;
  specialRequirements: string[];
  timeline: { title: string; time: string; completed: boolean; current?: boolean }[];
  documents: { name: string; type: string; status: 'VERIFIED' | 'PENDING' | 'SIGNED' }[];
}

export interface MapTruck {
  id: string;
  unitNumber: string;
  carrierName: string;
  driverName: string;
  equipment: string;
  currentLocation: { city: string; state: string; lat: number; lng: number };
  destination: { city: string; state: string; lat: number; lng: number };
  routeProgress: number; // 0 to 100 percentage
  milesRemaining: number;
  eta: string;
  speedMph: number;
  rpm: number;
  status: 'IN TRANSIT' | 'LOADING' | 'UNLOADING' | 'REST / ELD' | 'AVAILABLE';
  activeLoadId: string;
}

export interface PortalCarrier {
  id: string;
  companyName: string;
  mcNumber: string;
  dotNumber: string;
  contactName: string;
  phone: string;
  email: string;
  equipmentTypes: string[];
  fleetSize: number;
  currentLocation: string;
  preferredStates: string[];
  status: 'VERIFIED' | 'PENDING' | 'DOCS_MISSING' | 'ACTIVE';
  safetyRating: 'Satisfactory' | 'Conditional' | 'Exempt';
  ratingScore: number;
  activeUnitDispatched?: string;
  documents: {
    name: string;
    code: string;
    status: 'VERIFIED' | 'PENDING' | 'EXPIRING_SOON' | 'MISSING';
    expiresInDays?: number;
  }[];
  notes: string;
}

export interface PortalBroker {
  id: string;
  name: string;
  mcNumber: string;
  dotNumber: string;
  location: string;
  contactName: string;
  phone: string;
  email: string;
  creditScore: number;
  daysToPay: number;
  bondVerified: boolean;
  bcaStatus: 'SIGNED' | 'PENDING' | 'REVIEW';
  activeLoadsCount: number;
  avgRpm: number;
  status: 'VERIFIED' | 'REVIEW_REQUIRED' | 'PENDING';
}

export interface PortalNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'URGENT' | 'IMPORTANT' | 'INFO';
  read: boolean;
  actionUrl?: string;
  category: 'load' | 'document' | 'broker' | 'compliance' | 'payment';
}

export interface PortalMessage {
  id: string;
  conversationId: string;
  senderName: string;
  senderRole: 'Dispatcher' | 'Carrier' | 'Broker' | 'System';
  senderAvatar: string;
  text: string;
  timestamp: string;
  loadRef?: string;
  attachment?: { name: string; size: string; type: string };
  isCurrentUser?: boolean;
}

export interface PortalConversation {
  id: string;
  title: string;
  subtitle: string;
  type: 'carrier' | 'broker' | 'dispatcher' | 'operations';
  avatarUrl: string;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  online: boolean;
}

export interface DispatchTimelineSlot {
  time: string;
  truckId: string;
  carrierName: string;
  driverName: string;
  loadId: string;
  origin: string;
  destination: string;
  status: 'ON_TIME' | 'DELAYED' | 'CHECKED_IN' | 'LOADED';
  milestone: string;
}

// -----------------------------------------------------------------------------
// SAMPLE PORTAL LOADS
// -----------------------------------------------------------------------------
export const PORTAL_SAMPLE_LOADS: PortalLoad[] = [
  {
    id: 'ld-101',
    loadNumber: 'LD-10482',
    origin: { city: 'Dallas', state: 'TX', zip: '75201', lat: 32.7767, lng: -96.7970 },
    destination: { city: 'Atlanta', state: 'GA', zip: '30301', lat: 33.7490, lng: -84.3880 },
    pickupDate: 'Today, 08:30 EST',
    deliveryDate: 'Tomorrow, 14:00 EST',
    equipment: "53' Dry Van",
    weightLbs: 42000,
    lengthFt: "53 FT",
    distanceMiles: 781,
    rate: 1850,
    rpm: 2.37,
    commodity: 'Packaged Consumer Goods',
    broker: { name: 'Apex 3PL Global', mc: 'MC-894201', phone: '(404) 555-3210', email: 'dispatch@apex3pl.com', creditScore: 96, daysToPay: 21 },
    carrierAssigned: { name: 'Vance Freight Lines LLC', mc: 'MC-994821', truckId: 'UNIT-104', driverName: 'Robert Vance', phone: '(214) 555-8942' },
    status: 'IN_TRANSIT',
    isRecommended: true,
    matchScore: 98,
    notes: 'No-touch freight. Pallet exchange not required. Standard detention after 2 hours ($75/hr).',
    specialRequirements: ['Clean dry trailer', 'Seal intact at delivery', '2 Load locks required'],
    timeline: [
      { title: 'Load Posted to Spot Market', time: 'Yesterday 14:20', completed: true },
      { title: 'Carrier Matched & Dispatched', time: 'Yesterday 17:00', completed: true },
      { title: 'Rate Confirmation Executed', time: 'Yesterday 17:45', completed: true },
      { title: 'Driver Checked-In at Shipper', time: 'Today 08:15', completed: true },
      { title: 'Loaded & Sealed (Seal #884920)', time: 'Today 10:45', completed: true },
      { title: 'In Transit — Passing Jackson, MS', time: 'Today 14:30', completed: true, current: true },
      { title: 'Scheduled Receiver Appointment', time: 'Tomorrow 14:00', completed: false },
      { title: 'Signed POD Upload & Factoring', time: 'Tomorrow 15:30', completed: false }
    ],
    documents: [
      { name: 'Rate Confirmation #RC-10482.pdf', type: 'RateCon', status: 'SIGNED' },
      { name: 'Shipper BOL #BOL-8849.pdf', type: 'BOL', status: 'VERIFIED' },
      { name: 'Carrier COI ($1M Auto).pdf', type: 'COI', status: 'VERIFIED' }
    ]
  },
  {
    id: 'ld-102',
    loadNumber: 'LD-10483',
    origin: { city: 'Chicago', state: 'IL', zip: '60601', lat: 41.8781, lng: -87.6298 },
    destination: { city: 'Dallas', state: 'TX', zip: '75201', lat: 32.7767, lng: -96.7970 },
    pickupDate: 'Tomorrow, 07:00 CST',
    deliveryDate: 'In 2 Days, 11:00 CST',
    equipment: "53' Reefer",
    weightLbs: 43500,
    lengthFt: "53 FT",
    distanceMiles: 924,
    rate: 2450,
    rpm: 2.65,
    commodity: 'Refrigerated Dairy & Yogurt (Maintain +34°F)',
    broker: { name: 'Titan Freight Brokerage Inc', mc: 'MC-773412', phone: '(312) 555-9081', email: 'reefer@titanlogistics.com', creditScore: 92, daysToPay: 24 },
    status: 'AVAILABLE',
    isRecommended: true,
    matchScore: 94,
    notes: 'Pre-cool trailer to 34F before arrival. Continuous temperature logging required.',
    specialRequirements: ['Continuous Temp Monitor', 'Reefer Fuel Full', 'Food Grade Washout Slip'],
    timeline: [
      { title: 'Load Posted by Broker', time: 'Today 09:10', completed: true },
      { title: 'Smart Match Generated', time: 'Today 09:15', completed: true, current: true },
      { title: 'Carrier Request Pending', time: 'Pending Action', completed: false },
      { title: 'Rate Con Execution', time: 'Pending', completed: false },
      { title: 'Shipper Pickup', time: 'Tomorrow 07:00', completed: false }
    ],
    documents: [
      { name: 'Broker Rate Sheet #9931.pdf', type: 'RateCon', status: 'PENDING' }
    ]
  },
  {
    id: 'ld-103',
    loadNumber: 'LD-10484',
    origin: { city: 'Los Angeles', state: 'CA', zip: '90001', lat: 34.0522, lng: -118.2437 },
    destination: { city: 'Phoenix', state: 'AZ', zip: '85001', lat: 33.4484, lng: -112.0740 },
    pickupDate: 'Today, 18:00 PST',
    deliveryDate: 'Tomorrow, 06:00 MST',
    equipment: "48/53' Flatbed",
    weightLbs: 45000,
    lengthFt: "48 FT",
    distanceMiles: 372,
    rate: 1150,
    rpm: 3.09,
    commodity: 'Structural Steel Beams',
    broker: { name: 'Coastline Freight Logistics', mc: 'MC-654120', phone: '(213) 555-4421', email: 'flatbed@coastlinelog.com', creditScore: 95, daysToPay: 15 },
    carrierAssigned: { name: 'Iron Horse Transport LLC', mc: 'MC-881230', truckId: 'UNIT-208', driverName: 'Dave Miller', phone: '(909) 555-1123' },
    status: 'BOOKED',
    isRecommended: true,
    matchScore: 96,
    notes: 'Tarps not required. 8 chains and edge protectors required.',
    specialRequirements: ['8 Chains + Binders', 'Steel edge protectors', 'Hard hat & steel-toed boots at site'],
    timeline: [
      { title: 'Load Booked & Rate Signed', time: 'Today 11:30', completed: true },
      { title: 'Driver Dispatched to Yard', time: 'Today 14:00', completed: true, current: true },
      { title: 'Pickup at LA Mill', time: 'Today 18:00', completed: false }
    ],
    documents: [
      { name: 'Executed Rate Con #RC-6541.pdf', type: 'RateCon', status: 'SIGNED' }
    ]
  },
  {
    id: 'ld-104',
    loadNumber: 'LD-10485',
    origin: { city: 'Houston', state: 'TX', zip: '77001', lat: 29.7604, lng: -95.3698 },
    destination: { city: 'Miami', state: 'FL', zip: '33101', lat: 25.7617, lng: -80.1918 },
    pickupDate: 'In 2 Days, 09:00 CST',
    deliveryDate: 'In 4 Days, 16:00 EST',
    equipment: "53' Dry Van",
    weightLbs: 38000,
    lengthFt: "53 FT",
    distanceMiles: 1188,
    rate: 2850,
    rpm: 2.40,
    commodity: 'Industrial Packaging Supplies',
    broker: { name: 'Gulf Coast Freight Services', mc: 'MC-559021', phone: '(713) 555-7800', email: 'loads@gulfcoastfreight.com', creditScore: 89, daysToPay: 28 },
    status: 'AVAILABLE',
    isRecommended: false,
    matchScore: 88,
    notes: 'Direct transit preferred. Drop & hook on delivery available.',
    specialRequirements: ['53ft Clean van', 'E-track straps'],
    timeline: [
      { title: 'Load Posted', time: 'Today 12:00', completed: true }
    ],
    documents: []
  },
  {
    id: 'ld-105',
    loadNumber: 'LD-10486',
    origin: { city: 'Denver', state: 'CO', zip: '80201', lat: 39.7392, lng: -104.9903 },
    destination: { city: 'Kansas City', state: 'MO', zip: '64101', lat: 39.0997, lng: -94.5786 },
    pickupDate: 'Tomorrow, 13:00 MST',
    deliveryDate: 'In 2 Days, 08:00 CST',
    equipment: "Power Only",
    weightLbs: 34000,
    lengthFt: "Power Only",
    distanceMiles: 604,
    rate: 1450,
    rpm: 2.40,
    commodity: 'Pre-loaded 53ft Utility Dry Van Trailer',
    broker: { name: 'Midwest Intermodal Solutions', mc: 'MC-448102', phone: '(816) 555-3390', email: 'power@midwestintermodal.com', creditScore: 94, daysToPay: 18 },
    carrierAssigned: { name: 'Summit Freight Line LLC', mc: 'MC-779812', truckId: 'UNIT-305', driverName: 'Alex Carter', phone: '(303) 555-9801' },
    status: 'DISPATCHED',
    isRecommended: true,
    matchScore: 91,
    notes: 'Trailer interchange agreement required. Pre-trip inspection of broker trailer mandatory before rolling.',
    specialRequirements: ['Trailer Interchange Insurance', 'Valid CDL-A', 'Pigtail & Glad Hands'],
    timeline: [
      { title: 'Dispatched to Denver Yard', time: 'Today 13:45', completed: true, current: true }
    ],
    documents: [
      { name: 'Trailer Interchange Agreement.pdf', type: 'BCA', status: 'SIGNED' }
    ]
  },
  {
    id: 'ld-106',
    loadNumber: 'LD-10487',
    origin: { city: 'New York', state: 'NY', zip: '10001', lat: 40.7128, lng: -74.0060 },
    destination: { city: 'Charlotte', state: 'NC', zip: '28201', lat: 35.2271, lng: -80.8431 },
    pickupDate: 'Tomorrow, 20:00 EST',
    deliveryDate: 'In 2 Days, 10:00 EST',
    equipment: "26ft Box Truck",
    weightLbs: 9500,
    lengthFt: "26 FT",
    distanceMiles: 628,
    rate: 1650,
    rpm: 2.63,
    commodity: 'Commercial Retail Displays (Liftgate Required)',
    broker: { name: 'Empire Express Logistics', mc: 'MC-902188', phone: '(212) 555-6612', email: 'expedited@empirelogistics.com', creditScore: 91, daysToPay: 20 },
    status: 'AVAILABLE',
    isRecommended: true,
    matchScore: 95,
    notes: 'Liftgate + pallet jack mandatory at delivery store.',
    specialRequirements: ['Liftgate Equipped', 'Pallet Jack', 'E-Tracks'],
    timeline: [
      { title: 'Expedited Tender Created', time: 'Today 15:00', completed: true }
    ],
    documents: []
  },
  {
    id: 'ld-107',
    loadNumber: 'LD-10488',
    origin: { city: 'Atlanta', state: 'GA', zip: '30301', lat: 33.7490, lng: -84.3880 },
    destination: { city: 'Charlotte', state: 'NC', zip: '28201', lat: 35.2271, lng: -80.8431 },
    pickupDate: 'In 2 Days, 09:00 EST',
    deliveryDate: 'In 2 Days, 16:00 EST',
    equipment: "53' Dry Van",
    weightLbs: 36000,
    lengthFt: "53 FT",
    distanceMiles: 245,
    rate: 850,
    rpm: 3.47,
    commodity: 'Beverage Packaging Cartons',
    broker: { name: 'Southern Freight Express', mc: 'MC-812001', phone: '(404) 555-8819', email: 'dispatch@southernfreight.com', creditScore: 97, daysToPay: 14 },
    status: 'REQUESTED',
    isRecommended: true,
    matchScore: 99,
    notes: 'Ideal backhaul connector leg following LD-10482 delivery in Atlanta.',
    specialRequirements: ['Clean dry trailer'],
    timeline: [
      { title: 'Backhaul Sourced by DGW', time: 'Today 14:00', completed: true, current: true }
    ],
    documents: []
  }
];

// -----------------------------------------------------------------------------
// SAMPLE MAP TRUCKS (ANIMATED REAL-TIME TELEMATICS)
// -----------------------------------------------------------------------------
export const PORTAL_MAP_TRUCKS: MapTruck[] = [
  {
    id: 'trk-1',
    unitNumber: 'TRK-204',
    carrierName: 'Vance Freight Lines LLC',
    driverName: 'Robert Vance',
    equipment: "53' Dry Van",
    currentLocation: { city: 'Jackson', state: 'MS', lat: 32.2988, lng: -90.1848 },
    destination: { city: 'Atlanta', state: 'GA', lat: 33.7490, lng: -84.3880 },
    routeProgress: 65,
    milesRemaining: 382,
    eta: 'Tomorrow 14:00 EST',
    speedMph: 64,
    rpm: 2.37,
    status: 'IN TRANSIT',
    activeLoadId: 'ld-101'
  },
  {
    id: 'trk-2',
    unitNumber: 'TRK-108',
    carrierName: 'Iron Horse Transport LLC',
    driverName: 'Dave Miller',
    equipment: "48' Flatbed",
    currentLocation: { city: 'Palm Springs', state: 'CA', lat: 33.8303, lng: -116.5453 },
    destination: { city: 'Phoenix', state: 'AZ', lat: 33.4484, lng: -112.0740 },
    routeProgress: 35,
    milesRemaining: 268,
    eta: 'Tomorrow 06:00 MST',
    speedMph: 62,
    rpm: 3.09,
    status: 'IN TRANSIT',
    activeLoadId: 'ld-103'
  },
  {
    id: 'trk-3',
    unitNumber: 'TRK-305',
    carrierName: 'Summit Freight Line LLC',
    driverName: 'Alex Carter',
    equipment: 'Power Only',
    currentLocation: { city: 'Denver', state: 'CO', lat: 39.7392, lng: -104.9903 },
    destination: { city: 'Kansas City', state: 'MO', lat: 39.0997, lng: -94.5786 },
    routeProgress: 10,
    milesRemaining: 580,
    eta: 'In 2 Days 08:00 CST',
    speedMph: 0,
    rpm: 2.40,
    status: 'LOADING',
    activeLoadId: 'ld-105'
  },
  {
    id: 'trk-4',
    unitNumber: 'TRK-412',
    carrierName: 'Blue Ridge Express',
    driverName: 'Marcus Hall',
    equipment: "53' Reefer",
    currentLocation: { city: 'St. Louis', state: 'MO', lat: 38.6270, lng: -90.1994 },
    destination: { city: 'Dallas', state: 'TX', lat: 32.7767, lng: -96.7970 },
    routeProgress: 45,
    milesRemaining: 510,
    eta: 'Tomorrow 18:00 CST',
    speedMph: 66,
    rpm: 2.65,
    status: 'IN TRANSIT',
    activeLoadId: 'ld-102'
  }
];

// -----------------------------------------------------------------------------
// SAMPLE CARRIERS DIRECTORY
// -----------------------------------------------------------------------------
export const PORTAL_SAMPLE_CARRIERS: PortalCarrier[] = [
  {
    id: 'car-1',
    companyName: 'Vance Freight Lines LLC',
    mcNumber: 'MC-994821',
    dotNumber: 'DOT-3489201',
    contactName: 'Robert Vance',
    phone: '(214) 555-8942',
    email: 'dispatch@vancefreight.com',
    equipmentTypes: ['53ft Dry Van'],
    fleetSize: 3,
    currentLocation: 'Dallas, TX',
    preferredStates: ['TX', 'OK', 'AR', 'GA', 'NC', 'TN'],
    status: 'VERIFIED',
    safetyRating: 'Satisfactory',
    ratingScore: 98,
    activeUnitDispatched: 'UNIT-104 (In Transit: LD-10482)',
    documents: [
      { name: 'MC Operating Authority', code: 'MC-AUTH', status: 'VERIFIED' },
      { name: 'W-9 Form (Updated)', code: 'W9', status: 'VERIFIED' },
      { name: 'Certificate of Insurance ($1M Auto Liability)', code: 'COI-AUTO', status: 'VERIFIED', expiresInDays: 240 },
      { name: 'Cargo Insurance ($100k)', code: 'COI-CARGO', status: 'VERIFIED', expiresInDays: 240 },
      { name: 'Notice of Assignment (Triumph Factoring)', code: 'NOA', status: 'VERIFIED' },
      { name: 'CDL Class A Credentials', code: 'CDL', status: 'VERIFIED' }
    ],
    notes: 'Reliable owner-operator. No-touch dry freight preferred. Always maintains updated logs.'
  },
  {
    id: 'car-2',
    companyName: 'Iron Horse Transport LLC',
    mcNumber: 'MC-881230',
    dotNumber: 'DOT-2901844',
    contactName: 'Dave Miller',
    phone: '(909) 555-1123',
    email: 'ironhorse@freightops.com',
    equipmentTypes: ['48ft Flatbed', '53ft Stepdeck'],
    fleetSize: 5,
    currentLocation: 'Los Angeles, CA',
    preferredStates: ['CA', 'AZ', 'NV', 'UT', 'TX'],
    status: 'VERIFIED',
    safetyRating: 'Satisfactory',
    ratingScore: 96,
    activeUnitDispatched: 'UNIT-208 (En Route: LD-10484)',
    documents: [
      { name: 'MC Operating Authority', code: 'MC-AUTH', status: 'VERIFIED' },
      { name: 'W-9 Form', code: 'W9', status: 'VERIFIED' },
      { name: 'COI Auto & Cargo ($1M/$250k)', code: 'COI', status: 'VERIFIED', expiresInDays: 120 }
    ],
    notes: 'Heavy machinery and open-deck specialist. Carries full chain and binder sets.'
  },
  {
    id: 'car-3',
    companyName: 'Apex Eagle Logistics LLC',
    mcNumber: 'MC-761902',
    dotNumber: 'DOT-3118940',
    contactName: 'Elena Rostova',
    phone: '(773) 555-4091',
    email: 'elena@apexeagle.com',
    equipmentTypes: ['53ft Reefer'],
    fleetSize: 2,
    currentLocation: 'Chicago, IL',
    preferredStates: ['IL', 'IN', 'OH', 'PA', 'TX'],
    status: 'DOCS_MISSING',
    safetyRating: 'Satisfactory',
    ratingScore: 90,
    documents: [
      { name: 'MC Operating Authority', code: 'MC-AUTH', status: 'VERIFIED' },
      { name: 'W-9 Form', code: 'W9', status: 'VERIFIED' },
      { name: 'Certificate of Insurance', code: 'COI-AUTO', status: 'EXPIRING_SOON', expiresInDays: 12 },
      { name: 'Updated Factoring NOA', code: 'NOA', status: 'MISSING' }
    ],
    notes: 'Need updated NOA from factoring company before next reefer booking.'
  },
  {
    id: 'car-4',
    companyName: 'Lone Star Power Transport',
    mcNumber: 'MC-910244',
    dotNumber: 'DOT-3890122',
    contactName: 'Carlos Ramirez',
    phone: '(832) 555-7719',
    email: 'carlos@lonestarpower.com',
    equipmentTypes: ['Power Only', 'Hotshot 40ft'],
    fleetSize: 4,
    currentLocation: 'Houston, TX',
    preferredStates: ['TX', 'LA', 'MS', 'AL', 'FL'],
    status: 'ACTIVE',
    safetyRating: 'Satisfactory',
    ratingScore: 94,
    documents: [
      { name: 'MC Operating Authority', code: 'MC-AUTH', status: 'VERIFIED' },
      { name: 'W-9 Form', code: 'W9', status: 'VERIFIED' },
      { name: 'Trailer Interchange Coverage ($50K)', code: 'COI-INTERCHANGE', status: 'VERIFIED', expiresInDays: 180 }
    ],
    notes: 'Equipped with trailer interchange endorsement for drop-and-hook port operations.'
  }
];

// -----------------------------------------------------------------------------
// SAMPLE BROKERS DIRECTORY
// -----------------------------------------------------------------------------
export const PORTAL_SAMPLE_BROKERS: PortalBroker[] = [
  {
    id: 'brk-1',
    name: 'Apex 3PL Global',
    mcNumber: 'MC-894201',
    dotNumber: 'DOT-2184910',
    location: 'Atlanta, GA',
    contactName: 'Marcus Brody',
    phone: '(404) 555-3210',
    email: 'dispatch@apex3pl.com',
    creditScore: 96,
    daysToPay: 21,
    bondVerified: true,
    bcaStatus: 'SIGNED',
    activeLoadsCount: 42,
    avgRpm: 2.45,
    status: 'VERIFIED'
  },
  {
    id: 'brk-2',
    name: 'Titan Freight Brokerage Inc',
    mcNumber: 'MC-773412',
    dotNumber: 'DOT-1984201',
    location: 'Chicago, IL',
    contactName: 'Sarah Jenkins',
    phone: '(312) 555-9081',
    email: 'reefer@titanlogistics.com',
    creditScore: 92,
    daysToPay: 24,
    bondVerified: true,
    bcaStatus: 'SIGNED',
    activeLoadsCount: 28,
    avgRpm: 2.65,
    status: 'VERIFIED'
  },
  {
    id: 'brk-3',
    name: 'Coastline Freight Logistics',
    mcNumber: 'MC-654120',
    dotNumber: 'DOT-1849204',
    location: 'Los Angeles, CA',
    contactName: 'David Zhang',
    phone: '(213) 555-4421',
    email: 'flatbed@coastlinelog.com',
    creditScore: 95,
    daysToPay: 15,
    bondVerified: true,
    bcaStatus: 'SIGNED',
    activeLoadsCount: 19,
    avgRpm: 3.10,
    status: 'VERIFIED'
  },
  {
    id: 'brk-4',
    name: 'Midwest Intermodal Solutions',
    mcNumber: 'MC-448102',
    dotNumber: 'DOT-1654921',
    location: 'Kansas City, MO',
    contactName: 'Brian Foster',
    phone: '(816) 555-3390',
    email: 'power@midwestintermodal.com',
    creditScore: 94,
    daysToPay: 18,
    bondVerified: true,
    bcaStatus: 'SIGNED',
    activeLoadsCount: 14,
    avgRpm: 2.40,
    status: 'VERIFIED'
  }
];

// -----------------------------------------------------------------------------
// SAMPLE NOTIFICATIONS
// -----------------------------------------------------------------------------
export const PORTAL_SAMPLE_NOTIFICATIONS: PortalNotification[] = [
  {
    id: 'notif-1',
    title: 'New High-Paying Backhaul Matched',
    message: 'LD-10488 (Atlanta → Charlotte, $3.47 RPM) matches Vance Freight schedule.',
    timestamp: '12 min ago',
    type: 'IMPORTANT',
    read: false,
    category: 'load',
    actionUrl: '/load-board'
  },
  {
    id: 'notif-2',
    title: 'COI Expiration Alert (12 Days Remaining)',
    message: 'Apex Eagle Logistics LLC COI expires on Sep 15. Upload updated policy.',
    timestamp: '45 min ago',
    type: 'URGENT',
    read: false,
    category: 'compliance',
    actionUrl: '/documents'
  },
  {
    id: 'notif-3',
    title: 'Broker Signed Rate Confirmation',
    message: 'Apex 3PL Global approved Rate Con #RC-10482 for $1,850.00.',
    timestamp: '2 hours ago',
    type: 'INFO',
    read: true,
    category: 'load'
  },
  {
    id: 'notif-4',
    title: 'Factoring Invoice Advance Disbursed',
    message: 'Triumph Factoring funded Invoice #INV-9842 (~24h settlement confirmed).',
    timestamp: '5 hours ago',
    type: 'INFO',
    read: true,
    category: 'payment',
    actionUrl: '/payments'
  }
];

// -----------------------------------------------------------------------------
// SAMPLE CHAT CONVERSATIONS & MESSAGES
// -----------------------------------------------------------------------------
export const PORTAL_SAMPLE_CONVERSATIONS: PortalConversation[] = [
  {
    id: 'conv-1',
    title: 'Robert Vance (Driver #104)',
    subtitle: 'Re: Load LD-10482 Dallas → Atlanta',
    type: 'carrier',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    unreadCount: 1,
    lastMessage: 'Passing Jackson MS now. Everything rolling smooth.',
    lastTimestamp: '14:30',
    online: true
  },
  {
    id: 'conv-2',
    title: 'Marcus Brody (Apex 3PL)',
    subtitle: 'Re: Check-Call & Gate Confirmation',
    type: 'broker',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    unreadCount: 0,
    lastMessage: 'Rate confirmation received with thanks. Have driver send signed BOL on delivery.',
    lastTimestamp: '11:15',
    online: true
  },
  {
    id: 'conv-3',
    title: 'DGW Operations Desk',
    subtitle: 'Backhaul Sourcing & Daily Dispatch Log',
    type: 'dispatcher',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    unreadCount: 0,
    lastMessage: 'Backhaul LD-10488 queued for review for tomorrow morning.',
    lastTimestamp: '09:00',
    online: true
  }
];

export const PORTAL_SAMPLE_MESSAGES: Record<string, PortalMessage[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderName: 'DGW Dispatcher (Alex)',
      senderRole: 'Dispatcher',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      text: 'Good morning Robert! You are all set for pickup at Dallas shipper gate #4. Rate Con #RC-10482 confirmed for $1,850.',
      timestamp: '08:00 AM',
      loadRef: 'LD-10482'
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      senderName: 'Robert Vance',
      senderRole: 'Carrier',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      text: 'Checked in at the gate. Loading 24 pallets now. Will send seal number once trailer doors are locked.',
      timestamp: '08:20 AM'
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      senderName: 'Robert Vance',
      senderRole: 'Carrier',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      text: 'Loaded and rolling on I-20 East. Seal #884920 attached. Passing Jackson MS now. Everything rolling smooth.',
      timestamp: '02:30 PM',
      isCurrentUser: false
    }
  ],
  'conv-2': [
    {
      id: 'msg-201',
      conversationId: 'conv-2',
      senderName: 'Marcus Brody',
      senderRole: 'Broker',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      text: 'Hi Alex! Checking on Unit #104 for the Dallas → Atlanta run. Has driver loaded yet?',
      timestamp: '10:50 AM'
    },
    {
      id: 'msg-202',
      conversationId: 'conv-2',
      senderName: 'DGW Dispatcher (Alex)',
      senderRole: 'Dispatcher',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
      text: 'Yes Marcus! Loaded at 10:45 AM. 24 pallets, Seal #884920 verified. Estimated arrival tomorrow 14:00 EST on schedule.',
      timestamp: '11:00 AM',
      loadRef: 'LD-10482'
    },
    {
      id: 'msg-203',
      conversationId: 'conv-2',
      senderName: 'Marcus Brody',
      senderRole: 'Broker',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      text: 'Rate confirmation received with thanks. Have driver send signed BOL on delivery.',
      timestamp: '11:15 AM'
    }
  ]
};

// -----------------------------------------------------------------------------
// SAMPLE HOURLY DISPATCH SCHEDULE
// -----------------------------------------------------------------------------
export const PORTAL_DISPATCH_SCHEDULE: DispatchTimelineSlot[] = [
  { time: '08:00 EST', truckId: 'UNIT-104', carrierName: 'Vance Freight Lines', driverName: 'Robert Vance', loadId: 'LD-10482', origin: 'Dallas, TX', destination: 'Atlanta, GA', status: 'LOADED', milestone: 'Shipper gate check-in & BOL signed' },
  { time: '10:30 EST', truckId: 'UNIT-208', carrierName: 'Iron Horse Transport', driverName: 'Dave Miller', loadId: 'LD-10484', origin: 'Los Angeles, CA', destination: 'Phoenix, AZ', status: 'ON_TIME', milestone: 'Pre-trip & chain inspection' },
  { time: '12:00 CST', truckId: 'UNIT-305', carrierName: 'Summit Freight Line', driverName: 'Alex Carter', loadId: 'LD-10485', origin: 'Denver, CO', destination: 'Kansas City, MO', status: 'CHECKED_IN', milestone: 'Trailer interchange inspection' },
  { time: '15:30 EST', truckId: 'UNIT-412', carrierName: 'Blue Ridge Express', driverName: 'Marcus Hall', loadId: 'LD-10483', origin: 'Chicago, IL', destination: 'Dallas, TX', status: 'ON_TIME', milestone: 'Reefer pre-cool +34°F check' },
  { time: '18:00 PST', truckId: 'UNIT-501', carrierName: 'Lone Star Power', driverName: 'Carlos Ramirez', loadId: 'LD-10486', origin: 'New York, NY', destination: 'Charlotte, NC', status: 'DELAYED', milestone: 'Traffic delay on I-95 South (+30m)' }
];

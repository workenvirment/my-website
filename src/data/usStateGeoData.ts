// Standardized DAT Freight Zones and 50-State Vector Geometries (Albers USA 960x600 coordinate space)

export interface USStateGeo {
  id: string; // 2-letter postal code
  name: string;
  datZone: number; // 0 - 9
  zoneName: string;
  path: string;
  labelX: number;
  labelY: number;
  outboundLoads: number;
  inboundLoads: number;
  avgOutboundRpm: number;
  loadToTruckRatio: number;
  marketStatus: 'VERY_HIGH' | 'HIGH' | 'BALANCED' | 'LOOSE';
  primaryHubs: string[];
}

export interface DATZoneInfo {
  zone: number;
  name: string;
  region: string;
  states: string[];
  color: string;
  bgFill: string;
  borderStroke: string;
  avgRegionalRpm: number;
  activeLoadsTotal: number;
}

export const DAT_ZONES_INFO: DATZoneInfo[] = [
  {
    zone: 0,
    name: 'Zone 0: New England & NY/NJ',
    region: 'Northeast',
    states: ['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'NJ'],
    color: '#3B82F6',
    bgFill: '#EFF6FF',
    borderStroke: '#2563EB',
    avgRegionalRpm: 2.45,
    activeLoadsTotal: 342,
  },
  {
    zone: 1,
    name: 'Zone 1: Mid-Atlantic',
    region: 'East Coast',
    states: ['PA', 'DE', 'MD', 'VA', 'WV', 'DC'],
    color: '#6366F1',
    bgFill: '#EEF2FF',
    borderStroke: '#4F46E5',
    avgRegionalRpm: 2.38,
    activeLoadsTotal: 298,
  },
  {
    zone: 2,
    name: 'Zone 2: Southeast',
    region: 'Southeast',
    states: ['NC', 'SC', 'GA', 'FL'],
    color: '#0EA5E9',
    bgFill: '#F0F9FF',
    borderStroke: '#0284C7',
    avgRegionalRpm: 2.52,
    activeLoadsTotal: 480,
  },
  {
    zone: 3,
    name: 'Zone 3: Deep South & Mid-South',
    region: 'South',
    states: ['AL', 'MS', 'TN'],
    color: '#10B981',
    bgFill: '#ECFDF5',
    borderStroke: '#059669',
    avgRegionalRpm: 2.48,
    activeLoadsTotal: 310,
  },
  {
    zone: 4,
    name: 'Zone 4: Great Lakes & Ohio Valley',
    region: 'Midwest East',
    states: ['OH', 'IN', 'MI', 'KY'],
    color: '#F59E0B',
    bgFill: '#FFFBEB',
    borderStroke: '#D97706',
    avgRegionalRpm: 2.58,
    activeLoadsTotal: 520,
  },
  {
    zone: 5,
    name: 'Zone 5: Upper Midwest',
    region: 'Midwest Central',
    states: ['IL', 'WI', 'MN', 'IA'],
    color: '#EC4899',
    bgFill: '#FDF2F8',
    borderStroke: '#DB2777',
    avgRegionalRpm: 2.62,
    activeLoadsTotal: 590,
  },
  {
    zone: 6,
    name: 'Zone 6: Great Plains & Central',
    region: 'Central Plains',
    states: ['MO', 'KS', 'NE', 'SD', 'ND'],
    color: '#8B5CF6',
    bgFill: '#F5F3FF',
    borderStroke: '#7C3AED',
    avgRegionalRpm: 2.35,
    activeLoadsTotal: 275,
  },
  {
    zone: 7,
    name: 'Zone 7: South Central & Gulf Coast',
    region: 'South Central',
    states: ['TX', 'OK', 'AR', 'LA'],
    color: '#FF5722',
    bgFill: '#FFF7ED',
    borderStroke: '#EA580C',
    avgRegionalRpm: 2.46,
    activeLoadsTotal: 680,
  },
  {
    zone: 8,
    name: 'Zone 8: Mountain West',
    region: 'Mountain',
    states: ['CO', 'UT', 'WY', 'MT', 'ID', 'NV', 'AZ', 'NM'],
    color: '#14B8A6',
    bgFill: '#F0FDFA',
    borderStroke: '#0D9488',
    avgRegionalRpm: 2.28,
    activeLoadsTotal: 315,
  },
  {
    zone: 9,
    name: 'Zone 9: Pacific West & Northwest',
    region: 'West Coast',
    states: ['CA', 'OR', 'WA', 'AK', 'HI'],
    color: '#06B6D4',
    bgFill: '#ECFEFF',
    borderStroke: '#0891B2',
    avgRegionalRpm: 2.68,
    activeLoadsTotal: 740,
  },
];

// High-fidelity polygon boundaries for all US contiguous states + Alaska + Hawaii
// Generated on standard 960x600 Albers Projection bounds
export const US_STATES_GEO: USStateGeo[] = [
  // ==========================================
  // PACIFIC / NORTHWEST (Zone 9)
  // ==========================================
  {
    id: 'WA',
    name: 'Washington',
    datZone: 9,
    zoneName: 'Pacific West',
    path: 'M 105 45 L 195 58 L 195 105 L 180 125 L 155 125 L 135 130 L 105 130 L 95 110 L 100 80 Z',
    labelX: 145,
    labelY: 90,
    outboundLoads: 184,
    inboundLoads: 142,
    avgOutboundRpm: 2.58,
    loadToTruckRatio: 5.2,
    marketStatus: 'HIGH',
    primaryHubs: ['Seattle, WA', 'Spokane, WA', 'Tacoma, WA']
  },
  {
    id: 'OR',
    name: 'Oregon',
    datZone: 9,
    zoneName: 'Pacific West',
    path: 'M 95 130 L 195 130 L 195 210 L 90 205 L 85 160 Z',
    labelX: 142,
    labelY: 170,
    outboundLoads: 146,
    inboundLoads: 120,
    avgOutboundRpm: 2.45,
    loadToTruckRatio: 4.6,
    marketStatus: 'BALANCED',
    primaryHubs: ['Portland, OR', 'Eugene, OR', 'Medford, OR']
  },
  {
    id: 'CA',
    name: 'California',
    datZone: 9,
    zoneName: 'Pacific West',
    path: 'M 90 205 L 175 215 L 160 300 L 220 405 L 180 435 L 140 400 L 110 330 L 80 250 Z',
    labelX: 130,
    labelY: 310,
    outboundLoads: 410,
    inboundLoads: 320,
    avgOutboundRpm: 2.85,
    loadToTruckRatio: 7.4,
    marketStatus: 'VERY_HIGH',
    primaryHubs: ['Los Angeles, CA', 'Ontario, CA', 'Fresno, CA', 'Stockton, CA']
  },
  {
    id: 'AK',
    name: 'Alaska',
    datZone: 9,
    zoneName: 'Pacific West',
    path: 'M 80 470 L 145 470 L 145 530 L 120 545 L 80 520 L 70 490 Z',
    labelX: 110,
    labelY: 505,
    outboundLoads: 28,
    inboundLoads: 45,
    avgOutboundRpm: 3.10,
    loadToTruckRatio: 3.1,
    marketStatus: 'BALANCED',
    primaryHubs: ['Anchorage, AK', 'Fairbanks, AK']
  },
  {
    id: 'HI',
    name: 'Hawaii',
    datZone: 9,
    zoneName: 'Pacific West',
    path: 'M 220 520 L 250 515 L 260 535 L 230 540 Z',
    labelX: 240,
    labelY: 530,
    outboundLoads: 14,
    inboundLoads: 32,
    avgOutboundRpm: 2.95,
    loadToTruckRatio: 2.4,
    marketStatus: 'LOOSE',
    primaryHubs: ['Honolulu, HI', 'Hilo, HI']
  },

  // ==========================================
  // MOUNTAIN WEST (Zone 8)
  // ==========================================
  {
    id: 'ID',
    name: 'Idaho',
    datZone: 8,
    zoneName: 'Mountain West',
    path: 'M 195 58 L 220 62 L 230 145 L 265 175 L 255 210 L 195 210 L 195 105 Z',
    labelX: 220,
    labelY: 135,
    outboundLoads: 88,
    inboundLoads: 94,
    avgOutboundRpm: 2.22,
    loadToTruckRatio: 3.8,
    marketStatus: 'BALANCED',
    primaryHubs: ['Boise, ID', 'Twin Falls, ID', 'Idaho Falls, ID']
  },
  {
    id: 'NV',
    name: 'Nevada',
    datZone: 8,
    zoneName: 'Mountain West',
    path: 'M 175 215 L 245 220 L 235 345 L 205 380 L 160 300 Z',
    labelX: 198,
    labelY: 290,
    outboundLoads: 92,
    inboundLoads: 110,
    avgOutboundRpm: 2.15,
    loadToTruckRatio: 3.2,
    marketStatus: 'LOOSE',
    primaryHubs: ['Las Vegas, NV', 'Reno, NV']
  },
  {
    id: 'UT',
    name: 'Utah',
    datZone: 8,
    zoneName: 'Mountain West',
    path: 'M 245 220 L 305 228 L 300 330 L 235 320 Z',
    labelX: 270,
    labelY: 275,
    outboundLoads: 112,
    inboundLoads: 98,
    avgOutboundRpm: 2.28,
    loadToTruckRatio: 4.1,
    marketStatus: 'BALANCED',
    primaryHubs: ['Salt Lake City, UT', 'Provo, UT', 'Ogden, UT']
  },
  {
    id: 'AZ',
    name: 'Arizona',
    datZone: 8,
    zoneName: 'Mountain West',
    path: 'M 205 380 L 235 345 L 295 350 L 285 450 L 225 435 L 220 405 Z',
    labelX: 250,
    labelY: 395,
    outboundLoads: 165,
    inboundLoads: 178,
    avgOutboundRpm: 2.32,
    loadToTruckRatio: 4.5,
    marketStatus: 'BALANCED',
    primaryHubs: ['Phoenix, AZ', 'Tucson, AZ', 'Yuma, AZ']
  },
  {
    id: 'MT',
    name: 'Montana',
    datZone: 8,
    zoneName: 'Mountain West',
    path: 'M 220 62 L 380 80 L 375 160 L 265 150 L 230 145 Z',
    labelX: 300,
    labelY: 110,
    outboundLoads: 64,
    inboundLoads: 72,
    avgOutboundRpm: 2.18,
    loadToTruckRatio: 2.9,
    marketStatus: 'LOOSE',
    primaryHubs: ['Billings, MT', 'Missoula, MT', 'Great Falls, MT']
  },
  {
    id: 'WY',
    name: 'Wyoming',
    datZone: 8,
    zoneName: 'Mountain West',
    path: 'M 265 150 L 375 160 L 365 240 L 255 228 Z',
    labelX: 315,
    labelY: 195,
    outboundLoads: 55,
    inboundLoads: 60,
    avgOutboundRpm: 2.12,
    loadToTruckRatio: 2.7,
    marketStatus: 'LOOSE',
    primaryHubs: ['Cheyenne, WY', 'Casper, WY']
  },
  {
    id: 'CO',
    name: 'Colorado',
    datZone: 8,
    zoneName: 'Mountain West',
    path: 'M 305 228 L 415 242 L 410 330 L 300 320 Z',
    labelX: 355,
    labelY: 280,
    outboundLoads: 172,
    inboundLoads: 195,
    avgOutboundRpm: 2.38,
    loadToTruckRatio: 4.8,
    marketStatus: 'BALANCED',
    primaryHubs: ['Denver, CO', 'Colorado Springs, CO', 'Pueblo, CO']
  },
  {
    id: 'NM',
    name: 'New Mexico',
    datZone: 8,
    zoneName: 'Mountain West',
    path: 'M 295 350 L 395 355 L 390 455 L 315 450 L 285 450 Z',
    labelX: 345,
    labelY: 405,
    outboundLoads: 88,
    inboundLoads: 104,
    avgOutboundRpm: 2.20,
    loadToTruckRatio: 3.4,
    marketStatus: 'BALANCED',
    primaryHubs: ['Albuquerque, NM', 'Las Cruces, NM', 'Santa Fe, NM']
  },

  // ==========================================
  // GREAT PLAINS & CENTRAL (Zone 6)
  // ==========================================
  {
    id: 'ND',
    name: 'North Dakota',
    datZone: 6,
    zoneName: 'Great Plains',
    path: 'M 380 80 L 475 88 L 470 155 L 375 150 Z',
    labelX: 425,
    labelY: 118,
    outboundLoads: 62,
    inboundLoads: 58,
    avgOutboundRpm: 2.24,
    loadToTruckRatio: 3.1,
    marketStatus: 'BALANCED',
    primaryHubs: ['Fargo, ND', 'Bismarck, ND', 'Grand Forks, ND']
  },
  {
    id: 'SD',
    name: 'South Dakota',
    datZone: 6,
    zoneName: 'Great Plains',
    path: 'M 375 150 L 470 155 L 465 225 L 365 218 Z',
    labelX: 420,
    labelY: 185,
    outboundLoads: 70,
    inboundLoads: 65,
    avgOutboundRpm: 2.26,
    loadToTruckRatio: 3.3,
    marketStatus: 'BALANCED',
    primaryHubs: ['Sioux Falls, SD', 'Rapid City, SD']
  },
  {
    id: 'NE',
    name: 'Nebraska',
    datZone: 6,
    zoneName: 'Great Plains',
    path: 'M 365 218 L 475 225 L 485 285 L 415 280 L 365 240 Z',
    labelX: 420,
    labelY: 252,
    outboundLoads: 135,
    inboundLoads: 110,
    avgOutboundRpm: 2.42,
    loadToTruckRatio: 4.7,
    marketStatus: 'HIGH',
    primaryHubs: ['Omaha, NE', 'Lincoln, NE', 'Grand Island, NE']
  },
  {
    id: 'KS',
    name: 'Kansas',
    datZone: 6,
    zoneName: 'Great Plains',
    path: 'M 415 280 L 515 285 L 510 345 L 410 340 Z',
    labelX: 462,
    labelY: 312,
    outboundLoads: 148,
    inboundLoads: 125,
    avgOutboundRpm: 2.39,
    loadToTruckRatio: 4.9,
    marketStatus: 'HIGH',
    primaryHubs: ['Wichita, KS', 'Kansas City, KS', 'Topeka, KS']
  },
  {
    id: 'MO',
    name: 'Missouri',
    datZone: 6,
    zoneName: 'Great Plains',
    path: 'M 515 285 L 585 288 L 575 375 L 510 365 Z',
    labelX: 545,
    labelY: 330,
    outboundLoads: 220,
    inboundLoads: 195,
    avgOutboundRpm: 2.50,
    loadToTruckRatio: 5.6,
    marketStatus: 'HIGH',
    primaryHubs: ['St. Louis, MO', 'Kansas City, MO', 'Springfield, MO']
  },

  // ==========================================
  // UPPER MIDWEST (Zone 5)
  // ==========================================
  {
    id: 'MN',
    name: 'Minnesota',
    datZone: 5,
    zoneName: 'Upper Midwest',
    path: 'M 475 88 L 545 105 L 530 195 L 465 190 Z',
    labelX: 505,
    labelY: 145,
    outboundLoads: 195,
    inboundLoads: 165,
    avgOutboundRpm: 2.55,
    loadToTruckRatio: 5.4,
    marketStatus: 'HIGH',
    primaryHubs: ['Minneapolis, MN', 'St. Paul, MN', 'Duluth, MN']
  },
  {
    id: 'IA',
    name: 'Iowa',
    datZone: 5,
    zoneName: 'Upper Midwest',
    path: 'M 470 195 L 555 200 L 550 265 L 475 260 Z',
    labelX: 512,
    labelY: 230,
    outboundLoads: 165,
    inboundLoads: 140,
    avgOutboundRpm: 2.52,
    loadToTruckRatio: 5.1,
    marketStatus: 'HIGH',
    primaryHubs: ['Des Moines, IA', 'Cedar Rapids, IA', 'Davenport, IA']
  },
  {
    id: 'WI',
    name: 'Wisconsin',
    datZone: 5,
    zoneName: 'Upper Midwest',
    path: 'M 535 125 L 595 135 L 590 220 L 540 215 Z',
    labelX: 565,
    labelY: 175,
    outboundLoads: 190,
    inboundLoads: 160,
    avgOutboundRpm: 2.58,
    loadToTruckRatio: 5.5,
    marketStatus: 'HIGH',
    primaryHubs: ['Milwaukee, WI', 'Madison, WI', 'Green Bay, WI']
  },
  {
    id: 'IL',
    name: 'Illinois',
    datZone: 5,
    zoneName: 'Upper Midwest',
    path: 'M 550 215 L 595 220 L 585 320 L 545 305 Z',
    labelX: 570,
    labelY: 265,
    outboundLoads: 340,
    inboundLoads: 280,
    avgOutboundRpm: 2.72,
    loadToTruckRatio: 6.8,
    marketStatus: 'VERY_HIGH',
    primaryHubs: ['Chicago, IL', 'Joliet, IL', 'Peoria, IL', 'Rockford, IL']
  },

  // ==========================================
  // GREAT LAKES & OHIO VALLEY (Zone 4)
  // ==========================================
  {
    id: 'MI',
    name: 'Michigan',
    datZone: 4,
    zoneName: 'Great Lakes',
    path: 'M 590 145 L 650 155 L 640 230 L 590 225 Z',
    labelX: 620,
    labelY: 185,
    outboundLoads: 198,
    inboundLoads: 180,
    avgOutboundRpm: 2.54,
    loadToTruckRatio: 5.3,
    marketStatus: 'HIGH',
    primaryHubs: ['Detroit, MI', 'Grand Rapids, MI', 'Flint, MI']
  },
  {
    id: 'IN',
    name: 'Indiana',
    datZone: 4,
    zoneName: 'Great Lakes',
    path: 'M 595 220 L 635 225 L 625 310 L 590 305 Z',
    labelX: 612,
    labelY: 265,
    outboundLoads: 245,
    inboundLoads: 215,
    avgOutboundRpm: 2.64,
    loadToTruckRatio: 5.9,
    marketStatus: 'VERY_HIGH',
    primaryHubs: ['Indianapolis, IN', 'Fort Wayne, IN', 'Gary, IN']
  },
  {
    id: 'OH',
    name: 'Ohio',
    datZone: 4,
    zoneName: 'Great Lakes',
    path: 'M 635 225 L 685 225 L 675 305 L 625 300 Z',
    labelX: 655,
    labelY: 265,
    outboundLoads: 280,
    inboundLoads: 250,
    avgOutboundRpm: 2.68,
    loadToTruckRatio: 6.2,
    marketStatus: 'VERY_HIGH',
    primaryHubs: ['Columbus, OH', 'Cleveland, OH', 'Cincinnati, OH']
  },
  {
    id: 'KY',
    name: 'Kentucky',
    datZone: 4,
    zoneName: 'Great Lakes',
    path: 'M 590 305 L 680 305 L 660 355 L 580 345 Z',
    labelX: 630,
    labelY: 330,
    outboundLoads: 175,
    inboundLoads: 160,
    avgOutboundRpm: 2.48,
    loadToTruckRatio: 4.8,
    marketStatus: 'BALANCED',
    primaryHubs: ['Louisville, KY', 'Lexington, KY', 'Bowling Green, KY']
  },

  // ==========================================
  // SOUTH CENTRAL & GULF (Zone 7)
  // ==========================================
  {
    id: 'OK',
    name: 'Oklahoma',
    datZone: 7,
    zoneName: 'South Central',
    path: 'M 410 340 L 510 345 L 505 410 L 410 395 Z',
    labelX: 460,
    labelY: 375,
    outboundLoads: 145,
    inboundLoads: 130,
    avgOutboundRpm: 2.38,
    loadToTruckRatio: 4.6,
    marketStatus: 'BALANCED',
    primaryHubs: ['Oklahoma City, OK', 'Tulsa, OK']
  },
  {
    id: 'TX',
    name: 'Texas',
    datZone: 7,
    zoneName: 'South Central',
    path: 'M 390 410 L 515 415 L 530 470 L 480 545 L 430 500 L 375 440 Z',
    labelX: 450,
    labelY: 470,
    outboundLoads: 520,
    inboundLoads: 440,
    avgOutboundRpm: 2.65,
    loadToTruckRatio: 7.2,
    marketStatus: 'VERY_HIGH',
    primaryHubs: ['Dallas, TX', 'Houston, TX', 'San Antonio, TX', 'Laredo, TX', 'El Paso, TX']
  },
  {
    id: 'AR',
    name: 'Arkansas',
    datZone: 7,
    zoneName: 'South Central',
    path: 'M 510 365 L 565 370 L 555 435 L 505 430 Z',
    labelX: 535,
    labelY: 400,
    outboundLoads: 130,
    inboundLoads: 115,
    avgOutboundRpm: 2.42,
    loadToTruckRatio: 4.4,
    marketStatus: 'BALANCED',
    primaryHubs: ['Little Rock, AR', 'Fort Smith, AR', 'Bentonville, AR']
  },
  {
    id: 'LA',
    name: 'Louisiana',
    datZone: 7,
    zoneName: 'South Central',
    path: 'M 505 430 L 560 435 L 550 495 L 500 485 Z',
    labelX: 532,
    labelY: 462,
    outboundLoads: 160,
    inboundLoads: 155,
    avgOutboundRpm: 2.40,
    loadToTruckRatio: 4.5,
    marketStatus: 'BALANCED',
    primaryHubs: ['New Orleans, LA', 'Baton Rouge, LA', 'Shreveport, LA']
  },

  // ==========================================
  // DEEP SOUTH & MID-SOUTH (Zone 3)
  // ==========================================
  {
    id: 'TN',
    name: 'Tennessee',
    datZone: 3,
    zoneName: 'Deep South',
    path: 'M 570 345 L 680 350 L 665 385 L 560 380 Z',
    labelX: 620,
    labelY: 365,
    outboundLoads: 230,
    inboundLoads: 205,
    avgOutboundRpm: 2.58,
    loadToTruckRatio: 5.7,
    marketStatus: 'HIGH',
    primaryHubs: ['Memphis, TN', 'Nashville, TN', 'Chattanooga, TN', 'Knoxville, TN']
  },
  {
    id: 'MS',
    name: 'Mississippi',
    datZone: 3,
    zoneName: 'Deep South',
    path: 'M 560 385 L 600 388 L 590 475 L 555 470 Z',
    labelX: 578,
    labelY: 430,
    outboundLoads: 98,
    inboundLoads: 90,
    avgOutboundRpm: 2.34,
    loadToTruckRatio: 3.9,
    marketStatus: 'BALANCED',
    primaryHubs: ['Jackson, MS', 'Gulfport, MS', 'Tupelo, MS']
  },
  {
    id: 'AL',
    name: 'Alabama',
    datZone: 3,
    zoneName: 'Deep South',
    path: 'M 600 388 L 645 390 L 635 480 L 590 475 Z',
    labelX: 618,
    labelY: 435,
    outboundLoads: 145,
    inboundLoads: 135,
    avgOutboundRpm: 2.45,
    loadToTruckRatio: 4.8,
    marketStatus: 'BALANCED',
    primaryHubs: ['Birmingham, AL', 'Mobile, AL', 'Montgomery, AL']
  },

  // ==========================================
  // SOUTHEAST (Zone 2)
  // ==========================================
  {
    id: 'GA',
    name: 'Georgia',
    datZone: 2,
    zoneName: 'Southeast',
    path: 'M 645 390 L 705 395 L 690 480 L 635 475 Z',
    labelX: 668,
    labelY: 435,
    outboundLoads: 320,
    inboundLoads: 275,
    avgOutboundRpm: 2.70,
    loadToTruckRatio: 6.9,
    marketStatus: 'VERY_HIGH',
    primaryHubs: ['Atlanta, GA', 'Savannah, GA', 'Macon, GA', 'Augusta, GA']
  },
  {
    id: 'FL',
    name: 'Florida',
    datZone: 2,
    zoneName: 'Southeast',
    path: 'M 635 475 L 725 480 L 745 560 L 710 570 L 685 500 L 610 495 Z',
    labelX: 690,
    labelY: 525,
    outboundLoads: 210,
    inboundLoads: 310,
    avgOutboundRpm: 2.18,
    loadToTruckRatio: 3.2,
    marketStatus: 'LOOSE',
    primaryHubs: ['Miami, FL', 'Orlando, FL', 'Jacksonville, FL', 'Tampa, FL']
  },
  {
    id: 'SC',
    name: 'South Carolina',
    datZone: 2,
    zoneName: 'Southeast',
    path: 'M 675 365 L 735 375 L 715 425 L 665 415 Z',
    labelX: 700,
    labelY: 395,
    outboundLoads: 135,
    inboundLoads: 120,
    avgOutboundRpm: 2.48,
    loadToTruckRatio: 4.7,
    marketStatus: 'BALANCED',
    primaryHubs: ['Columbia, SC', 'Charleston, SC', 'Greenville, SC']
  },
  {
    id: 'NC',
    name: 'North Carolina',
    datZone: 2,
    zoneName: 'Southeast',
    path: 'M 670 335 L 775 345 L 745 385 L 665 375 Z',
    labelX: 720,
    labelY: 358,
    outboundLoads: 240,
    inboundLoads: 215,
    avgOutboundRpm: 2.62,
    loadToTruckRatio: 5.8,
    marketStatus: 'HIGH',
    primaryHubs: ['Charlotte, NC', 'Raleigh, NC', 'Greensboro, NC']
  },

  // ==========================================
  // MID-ATLANTIC (Zone 1)
  // ==========================================
  {
    id: 'VA',
    name: 'Virginia',
    datZone: 1,
    zoneName: 'Mid-Atlantic',
    path: 'M 665 305 L 765 315 L 755 350 L 665 340 Z',
    labelX: 715,
    labelY: 325,
    outboundLoads: 185,
    inboundLoads: 170,
    avgOutboundRpm: 2.50,
    loadToTruckRatio: 5.1,
    marketStatus: 'HIGH',
    primaryHubs: ['Richmond, VA', 'Norfolk, VA', 'Roanoke, VA']
  },
  {
    id: 'WV',
    name: 'West Virginia',
    datZone: 1,
    zoneName: 'Mid-Atlantic',
    path: 'M 670 270 L 715 275 L 705 320 L 665 310 Z',
    labelX: 688,
    labelY: 295,
    outboundLoads: 72,
    inboundLoads: 78,
    avgOutboundRpm: 2.30,
    loadToTruckRatio: 3.5,
    marketStatus: 'BALANCED',
    primaryHubs: ['Charleston, WV', 'Morgantown, WV']
  },
  {
    id: 'PA',
    name: 'Pennsylvania',
    datZone: 1,
    zoneName: 'Mid-Atlantic',
    path: 'M 685 215 L 775 225 L 765 275 L 675 265 Z',
    labelX: 725,
    labelY: 245,
    outboundLoads: 295,
    inboundLoads: 260,
    avgOutboundRpm: 2.66,
    loadToTruckRatio: 6.3,
    marketStatus: 'VERY_HIGH',
    primaryHubs: ['Harrisburg, PA', 'Philadelphia, PA', 'Pittsburgh, PA', 'Allentown, PA']
  },
  {
    id: 'MD',
    name: 'Maryland',
    datZone: 1,
    zoneName: 'Mid-Atlantic',
    path: 'M 720 275 L 770 280 L 760 305 L 715 300 Z',
    labelX: 742,
    labelY: 290,
    outboundLoads: 110,
    inboundLoads: 125,
    avgOutboundRpm: 2.44,
    loadToTruckRatio: 4.2,
    marketStatus: 'BALANCED',
    primaryHubs: ['Baltimore, MD', 'Hagerstown, MD']
  },
  {
    id: 'DE',
    name: 'Delaware',
    datZone: 1,
    zoneName: 'Mid-Atlantic',
    path: 'M 765 275 L 780 278 L 775 300 L 760 298 Z',
    labelX: 770,
    labelY: 288,
    outboundLoads: 32,
    inboundLoads: 36,
    avgOutboundRpm: 2.35,
    loadToTruckRatio: 3.6,
    marketStatus: 'BALANCED',
    primaryHubs: ['Wilmington, DE', 'Dover, DE']
  },

  // ==========================================
  // NORTHEAST & NY/NJ (Zone 0)
  // ==========================================
  {
    id: 'NY',
    name: 'New York',
    datZone: 0,
    zoneName: 'Northeast',
    path: 'M 715 155 L 795 165 L 785 240 L 725 230 Z',
    labelX: 755,
    labelY: 195,
    outboundLoads: 260,
    inboundLoads: 290,
    avgOutboundRpm: 2.60,
    loadToTruckRatio: 5.7,
    marketStatus: 'HIGH',
    primaryHubs: ['Buffalo, NY', 'Albany, NY', 'New York City, NY', 'Syracuse, NY']
  },
  {
    id: 'NJ',
    name: 'New Jersey',
    datZone: 0,
    zoneName: 'Northeast',
    path: 'M 765 235 L 785 240 L 775 285 L 760 280 Z',
    labelX: 772,
    labelY: 260,
    outboundLoads: 190,
    inboundLoads: 210,
    avgOutboundRpm: 2.68,
    loadToTruckRatio: 6.1,
    marketStatus: 'VERY_HIGH',
    primaryHubs: ['Newark, NJ', 'Jersey City, NJ', 'Camden, NJ']
  },
  {
    id: 'CT',
    name: 'Connecticut',
    datZone: 0,
    zoneName: 'Northeast',
    path: 'M 785 210 L 810 212 L 805 232 L 780 230 Z',
    labelX: 795,
    labelY: 222,
    outboundLoads: 65,
    inboundLoads: 75,
    avgOutboundRpm: 2.46,
    loadToTruckRatio: 4.1,
    marketStatus: 'BALANCED',
    primaryHubs: ['Hartford, CT', 'New Haven, CT']
  },
  {
    id: 'RI',
    name: 'Rhode Island',
    datZone: 0,
    zoneName: 'Northeast',
    path: 'M 810 215 L 825 216 L 820 232 L 808 230 Z',
    labelX: 818,
    labelY: 224,
    outboundLoads: 24,
    inboundLoads: 28,
    avgOutboundRpm: 2.40,
    loadToTruckRatio: 3.8,
    marketStatus: 'BALANCED',
    primaryHubs: ['Providence, RI']
  },
  {
    id: 'MA',
    name: 'Massachusetts',
    datZone: 0,
    zoneName: 'Northeast',
    path: 'M 785 190 L 835 195 L 825 215 L 780 210 Z',
    labelX: 805,
    labelY: 202,
    outboundLoads: 115,
    inboundLoads: 135,
    avgOutboundRpm: 2.52,
    loadToTruckRatio: 4.9,
    marketStatus: 'HIGH',
    primaryHubs: ['Boston, MA', 'Worcester, MA', 'Springfield, MA']
  },
  {
    id: 'VT',
    name: 'Vermont',
    datZone: 0,
    zoneName: 'Northeast',
    path: 'M 775 145 L 795 148 L 790 190 L 770 188 Z',
    labelX: 782,
    labelY: 168,
    outboundLoads: 32,
    inboundLoads: 38,
    avgOutboundRpm: 2.30,
    loadToTruckRatio: 3.4,
    marketStatus: 'BALANCED',
    primaryHubs: ['Burlington, VT']
  },
  {
    id: 'NH',
    name: 'New Hampshire',
    datZone: 0,
    zoneName: 'Northeast',
    path: 'M 795 145 L 815 148 L 810 195 L 790 190 Z',
    labelX: 802,
    labelY: 168,
    outboundLoads: 38,
    inboundLoads: 42,
    avgOutboundRpm: 2.32,
    loadToTruckRatio: 3.6,
    marketStatus: 'BALANCED',
    primaryHubs: ['Manchester, NH', 'Nashua, NH']
  },
  {
    id: 'ME',
    name: 'Maine',
    datZone: 0,
    zoneName: 'Northeast',
    path: 'M 810 100 L 855 125 L 840 180 L 805 160 Z',
    labelX: 830,
    labelY: 140,
    outboundLoads: 54,
    inboundLoads: 62,
    avgOutboundRpm: 2.36,
    loadToTruckRatio: 3.5,
    marketStatus: 'BALANCED',
    primaryHubs: ['Portland, ME', 'Bangor, ME']
  }
];

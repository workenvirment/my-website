import type { McCarrierRecord } from '../types';

export const MC_DATABASE_RECORDS: McCarrierRecord[] = [
  {
    id: 'mc-984210',
    mcNumber: 'MC-984210',
    dotNumber: 'DOT-3891024',
    legalName: 'VANCE FREIGHT LOGISTICS LLC',
    dbaName: 'Vance Lines Express',
    companyType: 'Carrier',
    operatingStatus: 'AUTHORIZED',
    authorityType: 'Common Carrier',
    authorityGrantedDate: '2019-04-12',
    safetyRating: 'Gold Tier Verified',
    ratingDate: '2025-11-18',
    powerUnits: 14,
    drivers: 16,
    mileageYear: '1,420,000 miles (2025)',
    carrierOperation: 'Interstate',
    cargoCarried: ['General Freight', 'Refrigerated Food', 'Consumer Goods', 'Paper Products'],
    equipmentTypes: ['53 FT Dry Van', '53 FT Reefer'],
    address: {
      street: '1402 Commerce Way Ste 400',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      country: 'USA'
    },
    contact: {
      phone: '(214) 555-8942',
      email: 'dispatch@vancefreight.com',
      representative: 'Robert Vance (Managing Director)'
    },
    insurance: {
      bipdRequired: 1000000,
      bipdOnFile: 1000000,
      cargoRequired: 100000,
      cargoOnFile: 250000,
      insuranceCompany: 'Great West Casualty Company',
      policyNumber: 'GWC-TX-994821',
      effectiveDate: '2026-01-01',
      verified: true
    },
    inspections: {
      vehicleInspections: 42,
      vehicleOosRate: 4.8,
      vehicleNationalAvg: 20.7,
      driverInspections: 48,
      driverOosRate: 0.0,
      driverNationalAvg: 5.5,
      totalCrashes: 0
    },
    dgwRating: 4.9,
    isVerifiedByDgw: true,
    notes: 'Premium carrier in DGW Network. 100% on-time delivery record across Texas, Midwest, and Southeast corridors.',
    lastUpdated: '2026-09-02'
  },
  {
    id: 'mc-894201',
    mcNumber: 'MC-894201',
    dotNumber: 'DOT-3104928',
    legalName: 'APEX 3PL GLOBAL LOGISTICS INC',
    dbaName: 'Apex Freight Brokerage',
    companyType: 'Broker',
    operatingStatus: 'AUTHORIZED',
    authorityType: 'Broker of Freight',
    authorityGrantedDate: '2016-08-20',
    safetyRating: 'Satisfactory',
    ratingDate: '2025-09-14',
    powerUnits: 0,
    drivers: 0,
    mileageYear: 'N/A (Property Broker)',
    carrierOperation: 'Interstate',
    cargoCarried: ['Building Materials', 'General Freight', 'Automotive Parts', 'Industrial Machinery'],
    equipmentTypes: ['Flatbed', 'Stepdeck', 'Dry Van', 'RGN'],
    address: {
      street: '780 Peachtree St NE Ste 1100',
      city: 'Atlanta',
      state: 'GA',
      zip: '30309',
      country: 'USA'
    },
    contact: {
      phone: '(404) 555-3210',
      email: 'tenders@apex3pl.com',
      representative: 'Marcus Brody (Director of Carrier Relations)'
    },
    insurance: {
      bipdRequired: 0,
      bipdOnFile: 0,
      cargoRequired: 0,
      cargoOnFile: 100000,
      bondRequired: 75000,
      bondOnFile: 75000,
      insuranceCompany: 'Travelers Casualty & Surety',
      policyNumber: 'BMC-84-APEX3910',
      effectiveDate: '2025-10-01',
      verified: true
    },
    inspections: {
      vehicleInspections: 0,
      vehicleOosRate: 0,
      vehicleNationalAvg: 20.7,
      driverInspections: 0,
      driverOosRate: 0,
      driverNationalAvg: 5.5,
      totalCrashes: 0
    },
    dgwRating: 4.8,
    isVerifiedByDgw: true,
    notes: 'A+ credit rated broker with 24-hour QuickPay and automated direct deposit. High volume outbound GA/SC/NC/TN loads.',
    lastUpdated: '2026-08-28'
  },
  {
    id: 'mc-1049281',
    mcNumber: 'MC-1049281',
    dotNumber: 'DOT-4019283',
    legalName: 'ROCKY MOUNTAIN EXPRESS HAULING LLC',
    dbaName: 'RME Transport Denver',
    companyType: 'Carrier',
    operatingStatus: 'AUTHORIZED',
    authorityType: 'Common Carrier',
    authorityGrantedDate: '2020-02-14',
    safetyRating: 'Gold Tier Verified',
    ratingDate: '2025-12-01',
    powerUnits: 8,
    drivers: 9,
    mileageYear: '890,000 miles (2025)',
    carrierOperation: 'Interstate',
    cargoCarried: ['Heavy Machinery', 'Lumber', 'Steel Coils', 'Overdimensional Cargo'],
    equipmentTypes: ['48 FT Flatbed', '53 FT Stepdeck', 'RGN / Lowboy'],
    address: {
      street: '9057 E 50th Ave Ste 18B',
      city: 'Denver',
      state: 'CO',
      zip: '80238',
      country: 'USA'
    },
    contact: {
      phone: '(303) 555-7194',
      email: 'ops@rmexpresshauling.com',
      representative: 'Saad Altaf (Regional Dispatch Director)'
    },
    insurance: {
      bipdRequired: 1000000,
      bipdOnFile: 1000000,
      cargoRequired: 100000,
      cargoOnFile: 350000,
      insuranceCompany: 'Northland Insurance Company',
      policyNumber: 'NL-CO-883910',
      effectiveDate: '2026-02-01',
      verified: true
    },
    inspections: {
      vehicleInspections: 28,
      vehicleOosRate: 3.5,
      vehicleNationalAvg: 20.7,
      driverInspections: 32,
      driverOosRate: 0.0,
      driverNationalAvg: 5.5,
      totalCrashes: 0
    },
    dgwRating: 5.0,
    isVerifiedByDgw: true,
    notes: 'Denver-based heavy specialized fleet partner. Specialized in Rocky Mountain mountain passes, I-70 corridor and Midwest lanes.',
    lastUpdated: '2026-09-04'
  },
  {
    id: 'mc-1198302',
    mcNumber: 'MC-1198302',
    dotNumber: 'DOT-4182901',
    legalName: 'LONE STAR HOTSHOT EXPRESS LLC',
    dbaName: 'Lone Star Hotshot',
    companyType: 'Owner Operator',
    operatingStatus: 'AUTHORIZED',
    authorityType: 'Common Carrier',
    authorityGrantedDate: '2021-06-19',
    safetyRating: 'Satisfactory',
    ratingDate: '2025-10-10',
    powerUnits: 2,
    drivers: 2,
    mileageYear: '240,000 miles (2025)',
    carrierOperation: 'Interstate',
    cargoCarried: ['Oilfield Equipment', 'Pipes & Tubing', 'Expedited Freight', 'Building Supplies'],
    equipmentTypes: ['40 FT Hotshot Gooseneck', 'RAM 3500 Dually'],
    address: {
      street: '310 West Loop 250 N',
      city: 'Midland',
      state: 'TX',
      zip: '79707',
      country: 'USA'
    },
    contact: {
      phone: '(432) 555-8910',
      email: 'driver@lonestarhotshot.com',
      representative: 'Travis Cole (Owner-Operator)'
    },
    insurance: {
      bipdRequired: 1000000,
      bipdOnFile: 1000000,
      cargoRequired: 100000,
      cargoOnFile: 150000,
      insuranceCompany: 'Progressive Commercial',
      policyNumber: 'PRG-9842104-TX',
      effectiveDate: '2026-03-15',
      verified: true
    },
    inspections: {
      vehicleInspections: 14,
      vehicleOosRate: 0.0,
      vehicleNationalAvg: 20.7,
      driverInspections: 14,
      driverOosRate: 0.0,
      driverNationalAvg: 5.5,
      totalCrashes: 0
    },
    dgwRating: 4.8,
    isVerifiedByDgw: true,
    notes: 'Top tier hotshot operator with 40ft air-ride trailer, mega ramps, tarping gear, and 16,500 lbs payload capacity.',
    lastUpdated: '2026-08-30'
  },
  {
    id: 'mc-772910',
    mcNumber: 'MC-772910',
    dotNumber: 'DOT-2994812',
    legalName: 'MIDWEST COLD CHAIN LOGISTICS LLC',
    dbaName: 'Midwest Reefer Solutions',
    companyType: 'Carrier',
    operatingStatus: 'AUTHORIZED',
    authorityType: 'Contract Carrier',
    authorityGrantedDate: '2015-03-10',
    safetyRating: 'Satisfactory',
    ratingDate: '2025-08-20',
    powerUnits: 22,
    drivers: 24,
    mileageYear: '2,650,000 miles (2025)',
    carrierOperation: 'Interstate',
    cargoCarried: ['Fresh Produce', 'Frozen Meat', 'Pharmaceuticals', 'Dairy & Beverages'],
    equipmentTypes: ['53 FT Reefer (Thermo King S-600)'],
    address: {
      street: '450 Logistics Blvd Ste 200',
      city: 'Chicago',
      state: 'IL',
      zip: '60607',
      country: 'USA'
    },
    contact: {
      phone: '(312) 555-4019',
      email: 'reefer.dispatch@midwestcold.com',
      representative: 'Elena Rostova (Fleet Operations)'
    },
    insurance: {
      bipdRequired: 1000000,
      bipdOnFile: 1000000,
      cargoRequired: 100000,
      cargoOnFile: 250000,
      insuranceCompany: 'Sentry Insurance',
      policyNumber: 'ST-IL-4910284',
      effectiveDate: '2026-01-10',
      verified: true
    },
    inspections: {
      vehicleInspections: 58,
      vehicleOosRate: 6.2,
      vehicleNationalAvg: 20.7,
      driverInspections: 64,
      driverOosRate: 1.5,
      driverNationalAvg: 5.5,
      totalCrashes: 0
    },
    dgwRating: 4.9,
    isVerifiedByDgw: true,
    notes: 'FSMA certified cold chain carrier. Continuous temp download data with continuous air recording for meat/produce.',
    lastUpdated: '2026-09-01'
  },
  {
    id: 'mc-1349028',
    mcNumber: 'MC-1349028',
    dotNumber: 'DOT-4392018',
    legalName: 'SUNBELT SPRINTER & BOX TRUCK EXPEDITE LLC',
    dbaName: 'Sunbelt Expedited',
    companyType: 'Carrier',
    operatingStatus: 'AUTHORIZED',
    authorityType: 'Common Carrier',
    authorityGrantedDate: '2022-11-04',
    safetyRating: 'Satisfactory',
    ratingDate: '2025-07-22',
    powerUnits: 6,
    drivers: 6,
    mileageYear: '520,000 miles (2025)',
    carrierOperation: 'Interstate',
    cargoCarried: ['E-Commerce Pallets', 'Medical Equipment', 'Auto Parts', 'High Value Electronics'],
    equipmentTypes: ['26 FT Box Truck (Liftgate)', 'High Roof Sprinter Van'],
    address: {
      street: '1200 Orange Blossom Trail',
      city: 'Orlando',
      state: 'FL',
      zip: '32805',
      country: 'USA'
    },
    contact: {
      phone: '(407) 555-6621',
      email: 'dispatch@sunbeltexpedite.com',
      representative: 'Carlos Mendez (Owner)'
    },
    insurance: {
      bipdRequired: 1000000,
      bipdOnFile: 1000000,
      cargoRequired: 100000,
      cargoOnFile: 150000,
      insuranceCompany: 'Canal Insurance Company',
      policyNumber: 'CNL-FL-839102',
      effectiveDate: '2026-04-01',
      verified: true
    },
    inspections: {
      vehicleInspections: 18,
      vehicleOosRate: 0.0,
      vehicleNationalAvg: 20.7,
      driverInspections: 20,
      driverOosRate: 0.0,
      driverNationalAvg: 5.5,
      totalCrashes: 0
    },
    dgwRating: 4.7,
    isVerifiedByDgw: true,
    notes: 'Equipped with 3,000 lbs tuckaway liftgates, pallet jacks, e-track bars, and moving blankets for white glove dock/ground deliveries.',
    lastUpdated: '2026-08-15'
  },
  {
    id: 'mc-604921',
    mcNumber: 'MC-604921',
    dotNumber: 'DOT-2194820',
    legalName: 'PACIFIC COAST FREIGHTWAYS INC',
    dbaName: 'PCF Logistics Seattle',
    companyType: 'Carrier',
    operatingStatus: 'AUTHORIZED',
    authorityType: 'Common Carrier',
    authorityGrantedDate: '2012-05-18',
    safetyRating: 'Gold Tier Verified',
    ratingDate: '2025-10-30',
    powerUnits: 34,
    drivers: 36,
    mileageYear: '3,800,000 miles (2025)',
    carrierOperation: 'Interstate',
    cargoCarried: ['Aerospace Components', 'General Freight', 'Paper & Packaging', 'Consumer Tech'],
    equipmentTypes: ['53 FT Dry Van (Air Ride)', '53 FT Reefer', 'Power Only Tractors'],
    address: {
      street: '2200 Airport Way S',
      city: 'Seattle',
      state: 'WA',
      zip: '98134',
      country: 'USA'
    },
    contact: {
      phone: '(206) 555-9014',
      email: 'ops@pcfseattle.com',
      representative: 'David Kim (Vice President Operations)'
    },
    insurance: {
      bipdRequired: 1000000,
      bipdOnFile: 2000000,
      cargoRequired: 100000,
      cargoOnFile: 500000,
      insuranceCompany: 'Zurich American Insurance',
      policyNumber: 'ZUR-WA-992014',
      effectiveDate: '2026-01-01',
      verified: true
    },
    inspections: {
      vehicleInspections: 82,
      vehicleOosRate: 4.1,
      vehicleNationalAvg: 20.7,
      driverInspections: 90,
      driverOosRate: 1.1,
      driverNationalAvg: 5.5,
      totalCrashes: 0
    },
    dgwRating: 5.0,
    isVerifiedByDgw: true,
    notes: 'TSA certified air-cargo authorized carrier. Dedicated Pacific Northwest running lanes to CA, NV, UT, and ID.',
    lastUpdated: '2026-09-03'
  },
  {
    id: 'mc-1409284',
    mcNumber: 'MC-1409284',
    dotNumber: 'DOT-4491028',
    legalName: 'TRI-STATE POWER ONLY HAULERS LLC',
    dbaName: 'Tri-State Power',
    companyType: 'Owner Operator',
    operatingStatus: 'AUTHORIZED',
    authorityType: 'Common Carrier',
    authorityGrantedDate: '2023-01-15',
    safetyRating: 'Satisfactory',
    ratingDate: '2025-11-04',
    powerUnits: 3,
    drivers: 3,
    mileageYear: '360,000 miles (2025)',
    carrierOperation: 'Interstate',
    cargoCarried: ['Pre-Loaded Trailers', 'Container Chassis', 'Drop & Hook Freight'],
    equipmentTypes: ['Power Only Sleeper Tractors', 'Volvo VNL 860', 'Freightliner Cascadia'],
    address: {
      street: '890 Industrial Pkwy',
      city: 'Columbus',
      state: 'OH',
      zip: '43215',
      country: 'USA'
    },
    contact: {
      phone: '(614) 555-3819',
      email: 'dispatch@tristatepoweronly.com',
      representative: 'Jason Miller (Lead Owner-Op)'
    },
    insurance: {
      bipdRequired: 1000000,
      bipdOnFile: 1000000,
      cargoRequired: 100000,
      cargoOnFile: 250000,
      insuranceCompany: 'Berkshire Hathaway GUARD',
      policyNumber: 'BH-OH-391028',
      effectiveDate: '2026-01-15',
      verified: true
    },
    inspections: {
      vehicleInspections: 12,
      vehicleOosRate: 0.0,
      vehicleNationalAvg: 20.7,
      driverInspections: 12,
      driverOosRate: 0.0,
      driverNationalAvg: 5.5,
      totalCrashes: 0
    },
    dgwRating: 4.8,
    isVerifiedByDgw: true,
    notes: 'Equipped with heavy wet kits, dual line hydraulics, universal interchange agreements (UIIA active), and electronic logging (ELD).',
    lastUpdated: '2026-08-25'
  }
];

export function searchMcDatabase(query: string, filters?: {
  companyType?: string;
  safetyRating?: string;
  equipmentType?: string;
  state?: string;
  verifiedOnly?: boolean;
}): McCarrierRecord[] {
  const cleanQuery = query.trim().toLowerCase();

  return MC_DATABASE_RECORDS.filter((record) => {
    // Text search matching
    const matchesQuery = !cleanQuery || 
      record.mcNumber.toLowerCase().includes(cleanQuery) ||
      record.dotNumber.toLowerCase().includes(cleanQuery) ||
      record.legalName.toLowerCase().includes(cleanQuery) ||
      (record.dbaName && record.dbaName.toLowerCase().includes(cleanQuery)) ||
      record.address.city.toLowerCase().includes(cleanQuery) ||
      record.address.state.toLowerCase().includes(cleanQuery);

    if (!matchesQuery) return false;

    // Filter checks
    if (filters?.companyType && filters.companyType !== 'All') {
      if (record.companyType !== filters.companyType) return false;
    }

    if (filters?.safetyRating && filters.safetyRating !== 'All') {
      if (record.safetyRating !== filters.safetyRating) return false;
    }

    if (filters?.state && filters.state !== 'All') {
      if (record.address.state !== filters.state) return false;
    }

    if (filters?.verifiedOnly) {
      if (!record.isVerifiedByDgw) return false;
    }

    if (filters?.equipmentType && filters.equipmentType !== 'All') {
      const hasEq = record.equipmentTypes.some(e => e.toLowerCase().includes(filters.equipmentType!.toLowerCase()));
      if (!hasEq) return false;
    }

    return true;
  });
}

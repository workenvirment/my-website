import type { TelemetryTruck } from '../types';

export const TELEMETRY_FLEET_DATA: TelemetryTruck[] = [
  {
    id: 'trk-101',
    truckNumber: 'UNIT #204',
    driverName: 'Robert Vance',
    driverPhone: '(214) 555-8942',
    equipment: '53 FT Dry Van',
    carrierName: 'Vance Freight Logistics LLC',
    mcNumber: 'MC-984210',
    status: 'in-transit',
    currentLocation: {
      city: 'Little Rock',
      state: 'AR',
      lat: 34.7465,
      lng: -92.2896,
      heading: 75,
      speedMph: 64
    },
    origin: {
      city: 'Dallas',
      state: 'TX'
    },
    destination: {
      city: 'Nashville',
      state: 'TN'
    },
    loadId: 'DGW-TN-9942',
    commodity: 'Automotive Components (Palletized)',
    weightLbs: 38500,
    eta: 'Today, 8:30 PM CST',
    progressPercent: 68,
    fuelLevelPercent: 78
  },
  {
    id: 'trk-102',
    truckNumber: 'UNIT #118',
    driverName: 'Travis Cole',
    driverPhone: '(432) 555-8910',
    equipment: '40 FT Hotshot Gooseneck',
    carrierName: 'Lone Star Hotshot Express LLC',
    mcNumber: 'MC-1198302',
    status: 'available',
    currentLocation: {
      city: 'Midland',
      state: 'TX',
      lat: 31.9974,
      lng: -102.0779,
      heading: 0,
      speedMph: 0
    },
    origin: {
      city: 'Houston',
      state: 'TX'
    },
    destination: {
      city: 'Midland',
      state: 'TX'
    },
    loadId: 'DGW-TX-8831',
    commodity: 'Oilfield Drilling Valves (Delivered)',
    weightLbs: 14200,
    eta: 'Staged / Ready for Tender',
    progressPercent: 100,
    fuelLevelPercent: 92
  },
  {
    id: 'trk-103',
    truckNumber: 'UNIT #307',
    driverName: 'Elena Rostova',
    driverPhone: '(312) 555-4019',
    equipment: '53 FT Reefer',
    carrierName: 'Midwest Cold Chain Logistics LLC',
    mcNumber: 'MC-772910',
    status: 'in-transit',
    currentLocation: {
      city: 'Indianapolis',
      state: 'IN',
      lat: 39.7684,
      lng: -86.1581,
      heading: 120,
      speedMph: 67
    },
    origin: {
      city: 'Chicago',
      state: 'IL'
    },
    destination: {
      city: 'Atlanta',
      state: 'GA'
    },
    loadId: 'DGW-GA-4419',
    commodity: 'Fresh Organic Produce (Continuous Air)',
    weightLbs: 41800,
    reeferTempF: 34.2,
    eta: 'Tomorrow, 6:00 AM EST',
    progressPercent: 42,
    fuelLevelPercent: 85
  },
  {
    id: 'trk-104',
    truckNumber: 'UNIT #512',
    driverName: 'Saad Altaf (Fleet Lead)',
    driverPhone: '(303) 555-7194',
    equipment: '53 FT Stepdeck',
    carrierName: 'Rocky Mountain Express Hauling LLC',
    mcNumber: 'MC-1049281',
    status: 'loading',
    currentLocation: {
      city: 'Denver',
      state: 'CO',
      lat: 39.7392,
      lng: -104.9903,
      heading: 0,
      speedMph: 0
    },
    origin: {
      city: 'Denver (9057 E 50th Ave)',
      state: 'CO'
    },
    destination: {
      city: 'Salt Lake City',
      state: 'UT'
    },
    loadId: 'DGW-UT-7720',
    commodity: 'CAT 320 Excavator Boom Attachment',
    weightLbs: 44600,
    eta: 'Tomorrow, 4:00 PM MST',
    progressPercent: 12,
    fuelLevelPercent: 95
  },
  {
    id: 'trk-105',
    truckNumber: 'UNIT #109',
    driverName: 'Carlos Mendez',
    driverPhone: '(407) 555-6621',
    equipment: '26 FT Box Truck (Liftgate)',
    carrierName: 'Sunbelt Expedited LLC',
    mcNumber: 'MC-1349028',
    status: 'delayed',
    currentLocation: {
      city: 'Savannah',
      state: 'GA',
      lat: 32.0809,
      lng: -81.0912,
      heading: 180,
      speedMph: 24
    },
    origin: {
      city: 'Charlotte',
      state: 'NC'
    },
    destination: {
      city: 'Orlando',
      state: 'FL'
    },
    loadId: 'DGW-FL-3301',
    commodity: 'Hospital Diagnostic Ultrasound Units',
    weightLbs: 8900,
    eta: 'Today, 11:15 PM EST (I-95 Roadwork Delay)',
    progressPercent: 55,
    fuelLevelPercent: 44
  },
  {
    id: 'trk-106',
    truckNumber: 'UNIT #884',
    driverName: 'David Kim',
    driverPhone: '(206) 555-9014',
    equipment: '53 FT Air-Ride Dry Van',
    carrierName: 'Pacific Coast Freightways Inc',
    mcNumber: 'MC-604921',
    status: 'in-transit',
    currentLocation: {
      city: 'Boise',
      state: 'ID',
      lat: 43.6150,
      lng: -116.2023,
      heading: 140,
      speedMph: 65
    },
    origin: {
      city: 'Seattle',
      state: 'WA'
    },
    destination: {
      city: 'Phoenix',
      state: 'AZ'
    },
    loadId: 'DGW-AZ-9014',
    commodity: 'Aerospace Fasteners & Avionics Assemblies',
    weightLbs: 32000,
    eta: 'Thursday, 9:00 AM MST',
    progressPercent: 38,
    fuelLevelPercent: 62
  },
  {
    id: 'trk-107',
    truckNumber: 'UNIT #419',
    driverName: 'Jason Miller',
    driverPhone: '(614) 555-3819',
    equipment: 'Power Only Sleeper Tractor',
    carrierName: 'Tri-State Power Only Haulers LLC',
    mcNumber: 'MC-1409284',
    status: 'in-transit',
    currentLocation: {
      city: 'Dayton',
      state: 'OH',
      lat: 39.7589,
      lng: -84.1916,
      heading: 260,
      speedMph: 63
    },
    origin: {
      city: 'Columbus',
      state: 'OH'
    },
    destination: {
      city: 'St. Louis',
      state: 'MO'
    },
    loadId: 'DGW-MO-5521',
    commodity: 'Target Distribution Center Empty Return 53ft',
    weightLbs: 15400,
    eta: 'Tonight, 10:45 PM CST',
    progressPercent: 48,
    fuelLevelPercent: 71
  }
];

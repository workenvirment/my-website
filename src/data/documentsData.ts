import type { DocumentItem } from '../types';

export const DOCUMENTS_LIST: DocumentItem[] = [
  {
    id: 'doc-mc-authority',
    name: 'FMCSA Operating Authority Certificate',
    code: 'MC AUTHORITY',
    category: 'carrier',
    whoProvides: 'Carrier (issued by FMCSA)',
    whoReceives: 'Broker / DGW Dispatch',
    purpose: 'Legally authorizes the motor carrier to conduct interstate commerce for-hire.',
    whenRequired: 'Initial carrier onboarding packet before any load booking.',
    status: 'REQUIRED',
    description: 'The official federal certificate from the Federal Motor Carrier Safety Administration containing the active MC/FF/MX docket number authorizing transportation of regulated property.',
    sampleSummary: {
      title: 'FEDERAL MOTOR CARRIER SAFETY ADMINISTRATION — CERTIFICATE OF AUTHORITY',
      sampleFields: [
        { label: 'Docket No.', value: 'MC-XXXXXX (Sample Docket)' },
        { label: 'Legal Name', value: 'SAMPLE CARRIER LOGISTICS LLC' },
        { label: 'Authority Type', value: 'Common / Contract Carrier of Property (Except Household Goods)' },
        { label: 'Status', value: 'ACTIVE INTERSTATE PROPERTY' },
        { label: 'Issue Date', value: 'EDUCATIONAL SAMPLE TEMPLATE' },
      ],
      disclaimer: 'SAMPLE DOCUMENT FOR EDUCATIONAL & ONBOARDING GUIDANCE ONLY.'
    }
  },
  {
    id: 'doc-w9',
    name: 'IRS Form W-9 (Taxpayer Identification)',
    code: 'W-9 FORM',
    category: 'carrier',
    whoProvides: 'Carrier',
    whoReceives: 'Freight Broker / Factoring Company',
    purpose: 'Provides verified Employer Identification Number (EIN) or SSN for tax reporting (Form 1099-NEC).',
    whenRequired: 'Required for broker setup packets and yearly tax compliance.',
    status: 'REQUIRED',
    description: 'Standard IRS Form W-9 certifying the carrier’s legal taxpayer identification number and federal tax classification (LLC, S-Corp, C-Corp, Sole Proprietorship).',
    sampleSummary: {
      title: 'DEPARTMENT OF THE TREASURY — INTERNAL REVENUE SERVICE FORM W-9',
      sampleFields: [
        { label: 'Name on Return', value: 'SAMPLE CARRIER TRANSPORT LLC' },
        { label: 'Federal Tax Classification', value: 'Limited Liability Company (LLC - Single Member/Corp)' },
        { label: 'Employer Identification No. (EIN)', value: 'XX-XXXXXXX (Sample Tax ID)' },
        { label: 'Address', value: '123 Logistics Parkway, Suite 400' },
        { label: 'Certification', value: 'Signed & Certified for Current Tax Year' },
      ],
      disclaimer: 'SAMPLE TAX FORM PREVIEW — NOT AN EXECUTED TAX DOCUMENT.'
    }
  },
  {
    id: 'doc-coi-auto',
    name: 'Certificate of Insurance (COI) — Auto Liability',
    code: 'COI AUTO ($1M)',
    category: 'carrier',
    whoProvides: 'Carrier Insurance Agent',
    whoReceives: 'Broker (Certificate Holder)',
    purpose: 'Verifies required commercial automobile liability insurance protecting against third-party bodily injury and property damage.',
    whenRequired: 'Mandatory prior to signing any Broker-Carrier agreement; must be unexpired.',
    status: 'REQUIRED',
    description: 'ACORD 25 Certificate of Liability Insurance documenting the insurer name, policy number, effective dates, and $1,000,000 Combined Single Limit (CSL) with the broker listed as certificate holder.',
    sampleSummary: {
      title: 'ACORD 25 — CERTIFICATE OF LIABILITY INSURANCE (AUTO)',
      sampleFields: [
        { label: 'Producer / Agent', value: 'Commercial Truck Insurance Services (Sample)' },
        { label: 'Insured Entity', value: 'SAMPLE CARRIER FLEET LLC' },
        { label: 'Coverage Type', value: 'Commercial Auto Liability — Any Auto' },
        { label: 'Combined Single Limit (CSL)', value: '$1,000,000 Each Occurrence' },
        { label: 'Certificate Holder', value: 'SAMPLE FREIGHT BROKERAGE INC (Holder Listed)' },
      ],
      disclaimer: 'SAMPLE ACORD FORM PREVIEW — NOT VALID PROOF OF ACTIVE COVERAGE.'
    }
  },
  {
    id: 'doc-coi-cargo',
    name: 'Certificate of Insurance (COI) — Motor Truck Cargo',
    code: 'COI CARGO ($100K–$250K)',
    category: 'carrier',
    whoProvides: 'Carrier Insurance Agent',
    whoReceives: 'Broker & Shipper',
    purpose: 'Guarantees coverage for physical loss or damage to freight being transported on the carrier trailer.',
    whenRequired: 'Mandatory for all freight loads (minimum $100,000; high-value loads require $250,000+).',
    status: 'REQUIRED',
    description: 'Verifies active cargo insurance policy limits, deductibles, and verifies that temperature breakdown or theft exclusions do not violate shipper requirements.',
    sampleSummary: {
      title: 'ACORD 25 — CERTIFICATE OF LIABILITY INSURANCE (CARGO)',
      sampleFields: [
        { label: 'Policy Type', value: 'Motor Truck Cargo Legal Liability' },
        { label: 'Limit per Vehicle', value: '$100,000 – $250,000 Standard Minimum' },
        { label: 'Deductible', value: '$1,000 – $2,500 (Sample)' },
        { label: 'Reefer Breakdown', value: 'Included / Specified for Refrigerated Freight' },
      ],
      disclaimer: 'SAMPLE INSURANCE PREVIEW — VERIFY ALL POLICIES DIRECTLY WITH PRODUCER.'
    }
  },
  {
    id: 'doc-factoring-noa',
    name: 'Notice of Assignment (NOA)',
    code: 'NOA / FACTORING',
    category: 'payment',
    whoProvides: 'Carrier Factoring Company',
    whoReceives: 'Broker Accounting Department',
    purpose: 'Legally notifies the broker that the carrier’s freight invoices have been assigned to a factoring institution for financing.',
    whenRequired: 'Required if the carrier factors loads to ensure the broker pays the factoring company lockbox.',
    status: 'RECEIVED',
    description: 'Official letter signed by both carrier and factoring institution containing banking instructions and legal notification under UCC Article 9.',
    sampleSummary: {
      title: 'OFFICIAL NOTICE OF ASSIGNMENT & PAYMENT INSTRUCTIONS',
      sampleFields: [
        { label: 'Factoring Institution', value: 'Sample Capital Logistics Factoring Corp.' },
        { label: 'Assignor (Carrier)', value: 'SAMPLE CARRIER LOGISTICS LLC' },
        { label: 'Remit-To Lockbox', value: 'PO Box 8940, Bank Lockbox Department' },
        { label: 'ACH / Wire Routing', value: 'ABA: 123456789 | Account: XXXXXXXXX' },
        { label: 'Release of Assignment', value: 'Requires formal written release from Factor' },
      ],
      disclaimer: 'SAMPLE NOTICE OF ASSIGNMENT FOR INSTRUCTIONAL USE ONLY.'
    }
  },
  {
    id: 'doc-bca',
    name: 'Broker-Carrier Agreement (BCA)',
    code: 'BROKER AGREEMENT',
    category: 'broker',
    whoProvides: 'Freight Broker',
    whoReceives: 'Carrier / DGW Dispatch Support',
    purpose: 'Governs the legal terms, payment terms, insurance maintenance, and operational rules between broker and motor carrier.',
    whenRequired: 'Completed once per broker before booking the first load with that brokerage.',
    status: 'REVIEW',
    description: 'Master contract defining independent contractor status, payment terms (e.g. Net 30), insurance obligations, claims handling, non-solicitation, and accessorial procedures.',
    sampleSummary: {
      title: 'MASTER BROKER-CARRIER TRANSPORTATION AGREEMENT',
      sampleFields: [
        { label: 'Broker Entity', value: 'SAMPLE 3PL LOGISTICS WORLDWIDE LLC' },
        { label: 'Carrier Entity', value: 'SAMPLE MOTOR CARRIER LLC' },
        { label: 'Independent Contractor', value: 'Carrier operates as independent motor carrier' },
        { label: 'Payment Terms', value: 'Standard Net 30 / QuickPay options available' },
        { label: 'Detention Policy', value: 'Standard 2 hours free time at loading/unloading' },
      ],
      disclaimer: 'SAMPLE CONTRACT OUTLINE — NOT AN EXECUTED LEGAL AGREEMENT.'
    }
  },
  {
    id: 'doc-rc',
    name: 'Rate Confirmation (RC)',
    code: 'RATE CON (RC)',
    category: 'broker',
    whoProvides: 'Freight Broker',
    whoReceives: 'Carrier & DGW Dispatch',
    purpose: 'Legally binding load-specific contract confirming the agreed rate, pickup/delivery addresses, dates, and handling terms.',
    whenRequired: 'Mandatory before dispatching the driver to pickup.',
    status: 'REQUIRED',
    description: 'The primary operational document containing load reference numbers, origin/destination coordinates, appointment times, commodity weight, agreed linehaul rate, fuel surcharge, and detention rules.',
    sampleSummary: {
      title: 'LOAD CONFIRMATION & RATE AGREEMENT',
      sampleFields: [
        { label: 'Load / Order No.', value: 'DGW-RC-9842 (Sample)' },
        { label: 'Agreed Total Rate', value: '$2,850.00 USD (Sample Target Rate)' },
        { label: 'Origin Facility', value: 'Dallas Distribution Center, Dallas TX (08:00 Appt)' },
        { label: 'Destination Facility', value: 'Atlanta Logistics Hub, Atlanta GA (Next Day 14:00)' },
        { label: 'Trailer / Commodity', value: '53ft Dry Van | 42,000 LBS Palletized General Freight' },
      ],
      disclaimer: 'SAMPLE RATE CONFIRMATION PREVIEW — ALL RATES ARE DEMO EXAMPLES.'
    }
  },
  {
    id: 'doc-bol',
    name: 'Bill of Lading (BOL)',
    code: 'BOL',
    category: 'shipper',
    whoProvides: 'Shipper at Origin Facility',
    whoReceives: 'Driver / Carrier',
    purpose: 'Acts as receipt of goods, document of title, and defines the cargo piece count, weight, and condition at origin.',
    whenRequired: 'Issued at shipper dock when freight is loaded onto the trailer.',
    status: 'REQUIRED',
    description: 'Physical or electronic shipping manifest detailing itemized pallet counts, seal numbers, special handling instructions, hazardous materials declarations, and origin signatures.',
    sampleSummary: {
      title: 'STANDARD STRAIGHT BILL OF LADING — SHORT FORM',
      sampleFields: [
        { label: 'BOL / Pro No.', value: 'BOL-773129 (Sample)' },
        { label: 'Shipper / Origin', value: 'Apex Industrial Manufacturing, Fort Worth TX' },
        { label: 'Consignee / Destination', value: 'East Coast Distribution Center, Atlanta GA' },
        { label: 'Piece Count / Weight', value: '24 Pallets | 41,850 LBS' },
        { label: 'Trailer Seal Number', value: 'SEAL # 884920 (Verified Intact)' },
      ],
      disclaimer: 'SAMPLE BILL OF LADING PREVIEW FOR EDUCATIONAL USE.'
    }
  },
  {
    id: 'doc-pod',
    name: 'Proof of Delivery (POD)',
    code: 'POD',
    category: 'shipper',
    whoProvides: 'Receiver / Consignee (Signed by Dock Clerk)',
    whoReceives: 'Driver → DGW Dispatch → Broker → Factoring',
    purpose: 'Proves that the cargo was delivered complete, undamaged, and on-time to the designated consignee.',
    whenRequired: 'Immediately upon completing the unload at the destination dock.',
    status: 'REQUIRED',
    description: 'The signed and stamped delivery receipt (often the stamped original BOL) containing receiver signature, date, time, piece count verification, and notation of zero OS&D (Over, Short, or Damaged).',
    sampleSummary: {
      title: 'DELIVERY RECEIPT & PROOF OF DELIVERY (POD)',
      sampleFields: [
        { label: 'Received By', value: 'Dock Receiver: J. Smith (Consignee Clerk)' },
        { label: 'Delivery Date & Time', value: '14:35 EST (Signed Stamped)' },
        { label: 'Condition of Freight', value: '24 Pallets Received In Good Order — 0 OS&D' },
        { label: 'Seal Verification', value: 'Seal # 884920 Verified Intact Before Breaking' },
      ],
      disclaimer: 'SAMPLE PROOF OF DELIVERY PREVIEW — DEMONSTRATION RECORD ONLY.'
    }
  },
  {
    id: 'doc-cdl-guide',
    name: 'Commercial Driver’s License (CDL Guide)',
    code: 'CDL (CLASS A / B)',
    category: 'carrier',
    whoProvides: 'Driver (State DMV / DPS)',
    whoReceives: 'Carrier & Broker Safety Compliance',
    purpose: 'Verifies the driver’s legal qualification to operate commercial motor vehicles of specified weight classes.',
    whenRequired: 'Required for all drivers operating commercial equipment.',
    status: 'REQUIRED',
    description: 'Official state-issued commercial driver credentials indicating Class A (combination >26k lbs), Class B (single >26k lbs), medical certificate validity, and specific endorsements.',
    sampleSummary: {
      title: 'COMMERCIAL DRIVER LICENSE QUALIFICATION OVERVIEW',
      sampleFields: [
        { label: 'Class A Scope', value: 'Generally: Combinations GVWR 26,001+ lbs with trailer >10,000 lbs' },
        { label: 'Class B Scope', value: 'Generally: Single vehicle GVWR 26,001+ lbs or towing trailer ≤10,000 lbs' },
        { label: 'Medical Card', value: 'DOT FMCSA Medical Examiner Certificate Current' },
        { label: 'Regulatory Note', value: 'Requirements vary by state & vehicle setup; verify with authority' },
      ],
      disclaimer: 'INFORMATIONAL CDL GUIDE — CONSULT STATE DMV & FMCSA REGULATIONS FOR LEGAL CRITERIA.'
    }
  },
];

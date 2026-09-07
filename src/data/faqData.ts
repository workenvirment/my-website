import type { FaqItem } from '../types';

export const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What does a professional freight dispatcher do?',
    answer: 'A freight dispatcher acts as an operational back-office partner for independent motor carriers and owner-operators. We search for suitable freight across multiple broker networks, negotiate linehaul rates, handle broker communications and check-calls, coordinate setup paperwork (W-9, COI, MC Authority), manage signed Rate Confirmations, and assist with immediate POD submission upon delivery so drivers can stay focused solely on safe driving.'
  },
  {
    id: 'faq-2',
    category: 'Carriers',
    question: 'What documents does a carrier need to start dispatch service with DGW?',
    answer: 'To establish your carrier dispatch profile, we require: (1) Active FMCSA MC Authority Certificate, (2) Signed W-9 form for the current year, (3) Certificate of Insurance (COI) with $1,000,000 Auto Liability and $100,000+ Cargo coverage listing the broker as certificate holder, (4) Vehicle Identification Number (VIN) & tractor/trailer specs, (5) Notice of Assignment (NOA) if you use a factoring company or voided check for direct QuickPay/ACH, (6) Working dispatch phone and email, (7) Clear photos of your equipment, and (8) Valid Commercial Driver’s License (CDL) for the operating driver.'
  },
  {
    id: 'faq-3',
    category: 'Documents',
    question: 'What is an MC number and why is it important?',
    answer: 'An MC (Motor Carrier) number is a unique docket identifier assigned by the Federal Motor Carrier Safety Administration (FMCSA) granting operating authority to transport regulated commodities interstate for-hire. Freight brokers and shippers verify your MC number to review safety ratings, insurance filings, operating authority status, and inspection history before issuing load contracts.'
  },
  {
    id: 'faq-4',
    category: 'Payments',
    question: 'What is an NOA (Notice of Assignment)?',
    answer: 'A Notice of Assignment (NOA) is an official legal letter issued by your freight factoring company instructing brokers and shippers that your company’s accounts receivable and freight invoices have been sold/assigned to the factoring institution. It directs the broker to deposit payment exclusively into the factoring company’s bank lockbox.'
  },
  {
    id: 'faq-5',
    category: 'Payments',
    question: 'How does freight factoring work for carriers?',
    answer: 'Freight factoring allows carriers to receive cash within ~24 hours of load delivery instead of waiting 30+ days for broker payment. You submit your signed Rate Confirmation and delivery POD to your factor; they advance approximately 97%–99% of the invoice face value immediately, charging a small factoring fee (typically 1%–3% depending on your volume and contract), then collect payment directly from the broker.'
  },
  {
    id: 'faq-6',
    category: 'Payments',
    question: 'What is QuickPay and how is it different from factoring?',
    answer: 'QuickPay is an expedited direct payment option offered by individual freight brokerages. Instead of waiting the standard Net 30 terms, the broker pays the carrier directly in 1 to 5 business days via ACH or fuel card in exchange for a small deduction (commonly 4%–5%). Unlike factoring, QuickPay is arranged on a load-by-load basis directly with participating brokers without requiring a third-party financing contract.'
  },
  {
    id: 'faq-7',
    category: 'Documents',
    question: 'What is a Rate Confirmation (RC)?',
    answer: 'A Rate Confirmation (RC) is a legally binding contract issued by a freight broker for a specific load. It details the agreed financial rate, pickup and delivery facility addresses, appointment dates and times, piece counts, total weight, commodity description, driver contact numbers, and specific accessorial clauses (such as detention rates, layover policies, and TONU fees).'
  },
  {
    id: 'faq-8',
    category: 'Documents',
    question: 'What is the difference between a BOL (Bill of Lading) and a POD (Proof of Delivery)?',
    answer: 'A Bill of Lading (BOL) is issued at origin by the shipper when cargo is loaded, acting as a contract and shipping receipt detailing pieces, weight, and seal number. A Proof of Delivery (POD) is the verified document (often the shipper’s original BOL) signed and stamped by the consignee (receiver) at the destination dock upon delivery, confirming all goods arrived complete and undamaged.'
  },
  {
    id: 'faq-9',
    category: 'Equipment',
    question: 'What equipment types does DGW Solutions LLC support?',
    answer: 'We support all major North American freight equipment categories: (1) Dry Van (48–53 FT), (2) Reefer / Refrigerated (48–53 FT), (3) Flatbed (48–53 FT), (4) Hotshot Flatbed (30–48 FT), (5) Straight Box Trucks (10–28 FT), (6) Sprinter & Cargo Vans (10–16 FT), (7) Stepdeck / Single Drop, (8) RGN (Removable Gooseneck) heavy haul, and (9) Power Only (including loadout, trailer interchange, hook & drop, pick & drop, and towaway).'
  },
  {
    id: 'faq-10',
    category: 'Brokers',
    question: 'Why do freight brokers appreciate working with DGW-connected carriers?',
    answer: 'Brokers prefer working with professional dispatchers because we provide prompt, verified carrier packets (active COI, W-9, authority), verify equipment specifications before booking, maintain accurate check-calls and GPS tracking, handle gate and dock coordination professionally, and deliver clean, legible signed PODs immediately upon delivery.'
  },
  {
    id: 'faq-11',
    category: 'Carriers',
    question: 'Do carriers have the final say on load acceptance?',
    answer: 'Absolutely. As an independent motor carrier, you maintain 100% final authority on all load bookings. DGW presents thoroughly vetted load options (rate, miles, lane, appointment windows, weight, and broker credit rating), but we never book or commit your truck to any load without your explicit verbal or written authorization.'
  },
  {
    id: 'faq-12',
    category: 'Carriers',
    question: 'What does "Advance Load Planning" mean?',
    answer: 'Advance Load Planning ("We Look Ahead") means we actively search and plan your subsequent backhaul loads before your current load is even unloaded. By lining up consecutive freight (Current Load → Next Load → Following Load), we minimize expensive unpaid layovers, reduce deadhead miles, and keep your truck moving consistently.'
  },
  {
    id: 'faq-13',
    category: 'Equipment',
    question: 'What are the trailer interchange requirements for Power Only?',
    answer: 'Power Only operations involve hauling third-party trailers. Requirements such as physical damage insurance limits (e.g. $20,000–$75,000+), trailer interchange agreements, and security deposits vary depending on the broker, leasing company, and trailer owner. We verify all specific interchange terms with the broker before booking any Power Only dispatch.'
  },
  {
    id: 'faq-14',
    category: 'Payments',
    question: 'Are weekly revenue numbers and RPM rates guaranteed?',
    answer: 'No. All rates per mile (RPM) and weekly revenue targets presented on our platform and in industry discussions are illustrative operational targets and historical market examples. Actual earnings depend entirely on dynamic market conditions, freight lanes, seasonal demand, equipment specifications, carrier operating hours, fuel costs, and broker agreements.'
  },
];

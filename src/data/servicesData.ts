import type { ServiceItem } from '../types';

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'dispatch-services',
    title: 'Dedicated Dispatch Services',
    shortDesc: 'Single point of contact for daily load planning, route guidance, and continuous driver coordination.',
    fullDesc: 'We provide focused, one-on-one dispatch support tailored to your equipment type and revenue goals. Your assigned dispatcher handles daily operational planning, broker updates, and road issues so you never drive alone.',
    iconName: 'Headphones',
    carrierBenefit: 'Keep your focus 100% on the highway while having a dedicated back-office professional managing your schedule.',
    brokerBenefit: 'Direct, professional contact who knows exactly where the truck is and ensures appointments are met on time.',
    category: 'Core Operations'
  },
  {
    id: 'route-planning',
    title: 'Intelligent Route Planning',
    shortDesc: 'Multi-leg scheduling, mileage minimization, weather monitoring, and toll route optimization.',
    fullDesc: 'Rather than booking one load and waiting until you unload to find the next, we map out consecutive backhauls (Current Load → Next Load → Following Load) to minimize unpaid empty miles and maximize weekly gross.',
    iconName: 'GitMerge',
    carrierBenefit: 'Pre-planned multi-leg routes keep your wheels turning and drastically reduce unpaid deadhead.',
    brokerBenefit: 'Carriers arriving on-time with clear next-destination commitments and zero schedule ambiguity.',
    category: 'Route Planning'
  },
  {
    id: 'load-optimization',
    title: 'Load Optimization & Market Sourcing',
    shortDesc: 'Continuous scanning of premium spot market freight, direct shipper tenders, and private load networks.',
    fullDesc: 'We scan live freight boards, direct broker portals, and established industry relationships to find loads that match your specific trailer specs, target lanes, weight limits, and desired rate per mile.',
    iconName: 'Search',
    carrierBenefit: 'Eliminate hours spent staring at load boards while parked at rest stops. We keep your queue moving.',
    brokerBenefit: 'Access to available, qualified capacity ready to roll on specific lanes with zero deadhead delay.',
    category: 'Load Optimization'
  },
  {
    id: 'rate-negotiation',
    title: 'High-Yield Rate Negotiation',
    shortDesc: 'Advocating for top-of-market linehaul rates, fuel adjustments, and verified detention terms.',
    fullDesc: 'Using real-time lane rate indexes and volume analytics, we negotiate directly with brokers to secure fair, market-tested compensation for every mile, plus clear reimbursement terms for detention and layover.',
    iconName: 'TrendingUp',
    carrierBenefit: 'Maximize your revenue potential with professional negotiation backing every load tender.',
    brokerBenefit: 'Fair, transparent market pricing aligned with real capacity and reliable service commitment.',
    category: 'Rate Negotiation'
  },
  {
    id: 'driver-support',
    title: 'Driver Support & Back-Office Care',
    shortDesc: 'Live assistance for check-calls, lumper receipts, emergency routing, and facility escalations.',
    fullDesc: 'Brokers require regular status updates, location checks, and appointment confirmations. We handle all broker check-calls, rate negotiations, tracking app setups, and facility check-ins so drivers can drive safely.',
    iconName: 'PhoneCall',
    carrierBenefit: 'No unsafe phone calls while driving in heavy traffic. Your dispatcher handles all broker calls.',
    brokerBenefit: 'Prompt, accurate status updates, automated tracking compliance, and proactive problem resolution.',
    category: 'Driver Support'
  },
  {
    id: 'fleet-tracking',
    title: 'Fleet Tracking & Telematics Coordination',
    shortDesc: 'Automated ELD tracking compliance, real-time GPS ETA updates, and delivery confirmations.',
    fullDesc: 'We integrate with leading ELD telematics and broker tracking protocols (MacroPoint, FourKites, Trucker Tools) ensuring 100% tracking compliance scores without interrupting driver rest cycles.',
    iconName: 'MapPin',
    carrierBenefit: 'Maintain Tier-1 broker ratings with frictionless automated check-ins and zero distraction.',
    brokerBenefit: 'Real-time visibility into truck location, accurate geofence timestamps, and proactive delay mitigation.',
    category: 'Fleet Tracking'
  },
  {
    id: 'logistics-assistance-247',
    title: '24/7 Logistics & Emergency Assistance',
    shortDesc: 'Round-the-clock weekend dispatch, breakdown coordination, and late-night gate access support.',
    fullDesc: 'Freight moves 24/7/365. When shippers reschedule midnight appointments or road conditions force an emergency reroute, our 24/7 logistics desk is standing by to resolve issues immediately.',
    iconName: 'ShieldCheck',
    carrierBenefit: 'Never get stranded at a receiver gate after hours without a dispatcher to unlock appointment access.',
    brokerBenefit: 'Round-the-clock emergency escalation contact to handle after-hours logistics challenges.',
    category: '24/7 Assistance'
  },
  {
    id: 'document-coordination',
    title: 'Document & Broker Packet Coordination',
    shortDesc: 'Instant broker setup packets, COI distribution, W-9 submissions, and Rate Confirmation audits.',
    fullDesc: 'We manage your carrier packet library—submitting active W-9, Certificate of Insurance, and MC Authority to new brokers within minutes so you never lose high-paying loads to setup delays.',
    iconName: 'FileText',
    carrierBenefit: 'Fast broker packet setup ensures you lock in hot loads before competitors can submit paperwork.',
    brokerBenefit: 'Complete, error-free carrier documentation delivered in one clean digital packet.',
    category: 'Compliance'
  },
  {
    id: 'delivery-documentation',
    title: 'Delivery Documentation (BOL / POD)',
    shortDesc: 'Immediate review, verification, and broker submission of signed delivery receipts.',
    fullDesc: 'Once the load is unloaded, we inspect the driver’s signed POD/BOL for clean signatures and receiver stamps, then submit it immediately to the broker and factoring company.',
    iconName: 'CheckCircle2',
    carrierBenefit: 'Immediate POD submission initiates your payment clock without unnecessary billing delays.',
    brokerBenefit: 'Instant delivery confirmation and clean PODs to close out shipper files and customer invoices.',
    category: 'Billing'
  },
  {
    id: 'payment-workflow-support',
    title: 'Payment & Settlement Workflow Support',
    shortDesc: 'Organizing invoices, NOA verification, QuickPay packets, and detention compensation.',
    fullDesc: 'We help track delivered loads, assist with submitting rate confirmations and PODs to factoring companies or broker QuickPay departments, and advocate for verified detention payouts.',
    iconName: 'CreditCard',
    carrierBenefit: 'Clean billing coordination minimizes rejected factoring schedules and unpaid accessorials.',
    brokerBenefit: 'Accurate billing packets matching agreed Rate Confirmations with clear backup documentation.',
    category: 'Billing'
  }
];

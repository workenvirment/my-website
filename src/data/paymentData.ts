import type { PaymentOption } from '../types';

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'factoring',
    name: 'Factoring / Notice of Assignment (NOA)',
    acronym: 'FACTORING (NOA)',
    typicalTimingExample: 'Around 24 Hours (Example)',
    typicalFeeExample: 'Approx. 1% – 3% Fee (Example Range)',
    description: 'The carrier sells their completed freight invoices to a professional third-party freight factoring company for immediate working capital rather than waiting 30+ days for broker payment.',
    howItWorks: 'Upon delivery, the signed POD and Rate Confirmation are submitted directly to the factor. The factoring institution advances approximately 97%–99% of the invoice balance to the carrier within 24 hours, subsequently collecting the full amount from the broker under the executed Notice of Assignment.',
    keyPoints: [
      'Rapid cash flow turnaround within ~24 hours',
      'Factoring company handles broker credit checks & collections',
      'Requires active Notice of Assignment (NOA) filed with brokers',
      'Recourse vs. Non-Recourse terms depend on carrier factoring agreement',
    ],
    disclaimer: 'Example timing and fee range for illustrative comparison. Exact advance rates, reserve holdbacks, and discount fees depend strictly on your contract with your selected factoring provider.'
  },
  {
    id: 'quickpay',
    name: 'Broker QuickPay Settlement',
    acronym: 'QUICKPAY',
    typicalTimingExample: 'Approx. 4 – 5 Days (Example)',
    typicalFeeExample: 'Approx. 4% – 5% Deduction (Example)',
    description: 'An expedited direct payment program offered by many large freight brokerages to pay carriers significantly faster than standard Net 30 terms in exchange for a small percentage discount fee.',
    howItWorks: 'The broker processes the invoice directly after receiving verified clean PODs and pays the carrier via direct ACH deposit, electronic wire, or fuel card credit within 1 to 5 business days, deducting a pre-agreed service discount.',
    keyPoints: [
      'No third-party factoring contract required',
      'Direct ACH transfer into carrier bank account',
      'Available on a load-by-load basis with participating brokers',
      'Carrier remains responsible for tracking individual broker remittances',
    ],
    disclaimer: 'Example timing (4–5 days) and fee deduction (4–5%) are illustrative examples. Actual QuickPay availability, processing days, and discount percentages vary across individual broker programs.'
  },
  {
    id: 'ach-standard',
    name: 'Standard ACH / Direct Check (Net 30)',
    acronym: 'ACH / CHECK (NET 30)',
    typicalTimingExample: 'Around 30 Days (Standard Terms)',
    typicalFeeExample: '0% Fee (Standard Linehaul Amount)',
    description: 'The traditional standard billing arrangement in freight transportation where the broker pays the carrier the full invoiced amount without discount fees under conventional Net 30 payment terms.',
    howItWorks: 'After delivery receipt verification, the broker’s accounts payable department enters the invoice into their standard billing cycle and issues an electronic ACH transfer or physical business check after 21 to 30 days.',
    keyPoints: [
      'Maximum payout: 0% factoring or QuickPay discount deduction',
      'Standard corporate commercial payment terms',
      'Requires adequate carrier operational reserves to float 30 days of fuel & payroll',
      'Invoices tracked directly through broker accounting portal',
    ],
    disclaimer: 'Actual payment schedule and settlement terms depend entirely on the specific Broker-Carrier Agreement executed for the load.'
  },
  {
    id: 'cod',
    name: 'Cash on Delivery / Direct Shipper Settlement',
    acronym: 'COD / DIRECT',
    typicalTimingExample: 'Upon Delivery / Loading Dock Arrival',
    typicalFeeExample: '0% Standard Terms (Agreed Cash/Draft)',
    description: 'Payment terms where settlement is made directly upon unloading at the destination facility or directly from shipper to carrier under pre-arranged commercial terms.',
    howItWorks: 'The driver or carrier receives certified company check, cashier’s check, wire confirmation, or electronic settlement directly upon arrival or physical sign-off at the delivery facility.',
    keyPoints: [
      'Immediate settlement at point of destination',
      'Common in direct shipper contracts and specialized spot loads',
      'Requires verified payment method authorization before release of cargo',
      'Subject to carrier and customer credit agreement',
    ],
    disclaimer: 'Cash on delivery arrangements depend entirely on the specific commercial contract and verified payment instruments agreed upon by all parties prior to dispatch.'
  },
];

export const PAYMENT_CHANNELS_INFO = {
  title: 'Payment & Settlement Informational Channels',
  description: 'In modern logistics and dispatch workflows, settlements and communications may interface with various commercial and banking channels depending on provider, factoring partner, and carrier setup.',
  channels: [
    { name: 'Direct Commercial ACH', desc: 'Direct corporate checking transfer via federal automated clearing house' },
    { name: 'Wire Transfer / Fedwire', desc: 'Same-day bank wire for high-value or expedited freight releases' },
    { name: 'Factoring Fuel Cards / Comdata / EFS', desc: 'Direct fuel advance loading onto carrier fleet debit cards' },
    { name: 'Corporate Banking (e.g. Bank of America)', desc: 'Standard business checking deposit and online lockbox processing' },
    { name: 'Electronic Transfers (e.g. Zelle, Cash App)', desc: 'Used for certain authorized accessorial or emergency reimbursements where configured' },
    { name: 'Global Wire Systems (e.g. Western Union, Remitly, Taptap, WebMoney)', desc: 'Informational note: International carriers or cross-border partners utilize specialized cross-border payment gateways subject to applicable local banking regulations' },
  ],
  importantDisclaimer: 'Payment methods vary depending on individual agreements, providers, geographic location, and applicable banking rules. DGW Solutions LLC does not act as a banking institution or licensed money transmitter. All settlement arrangements are executed between the authorized carrier, broker, and their chosen financial institutions.'
};

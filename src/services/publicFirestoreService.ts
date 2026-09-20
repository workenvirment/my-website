import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface PublicCarrierLeadInput {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  mcNumber?: string;
  equipment: string;
  truckCount?: string;
  preferredLanes?: string;
  message?: string;
  source?: string;
}

export interface PublicContactMessageInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source?: string;
}

export interface SubmitResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Submits a public carrier inquiry / onboarding lead to Firestore `carrierLeads` collection.
 * Strictly enforces payload validation, allowed keys, server timestamps, and fixed 'new' status.
 */
export async function submitPublicCarrierLead(input: PublicCarrierLeadInput): Promise<SubmitResult> {
  if (!db) {
    console.error('[Firestore Lead Submission]: Firestore is not initialized.');
    return {
      success: false,
      error: 'Unable to connect to the dispatch system. Please try calling or messaging us on WhatsApp directly.'
    };
  }

  const name = (input.name || '').trim().slice(0, 100);
  const phone = (input.phone || '').trim().slice(0, 30);
  const equipment = (input.equipment || 'Dry Van (53ft)').trim().slice(0, 100);

  if (!name) {
    return { success: false, error: 'Please enter your full name.' };
  }
  if (!phone) {
    return { success: false, error: 'Please enter a valid phone or WhatsApp number.' };
  }
  if (!equipment) {
    return { success: false, error: 'Please select your equipment type.' };
  }

  // Construct payload with ONLY allowed schema keys matching firestore.rules
  const payload: Record<string, any> = {
    name,
    phone,
    equipment,
    status: 'new', // Enforced fixed initial status for public submissions
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (input.email && input.email.trim()) {
    payload.email = input.email.trim().slice(0, 100);
  }
  if (input.company && input.company.trim()) {
    payload.company = input.company.trim().slice(0, 150);
  }
  if (input.mcNumber && input.mcNumber.trim()) {
    payload.mcNumber = input.mcNumber.trim().slice(0, 50);
  }
  if (input.truckCount && input.truckCount.trim()) {
    payload.truckCount = input.truckCount.trim().slice(0, 20);
  }
  if (input.preferredLanes && input.preferredLanes.trim()) {
    payload.preferredLanes = input.preferredLanes.trim().slice(0, 300);
  }
  if (input.message && input.message.trim()) {
    payload.message = input.message.trim().slice(0, 2000);
  }
  if (input.source && input.source.trim()) {
    payload.source = input.source.trim().slice(0, 100);
  } else {
    payload.source = 'public_website';
  }

  try {
    const docRef = await addDoc(collection(db, 'carrierLeads'), payload);
    return { success: true, id: docRef.id };
  } catch (err: unknown) {
    console.error('[Firestore Lead Submission Error]:', err);
    return {
      success: false,
      error: 'An unexpected network error occurred while submitting your inquiry. Please try again or contact us via WhatsApp.'
    };
  }
}

/**
 * Submits a public contact message / broker capacity inquiry to Firestore `contactMessages` collection.
 * Strictly enforces payload validation, allowed keys, server timestamps, and fixed 'unread' status.
 */
export async function submitPublicContactMessage(input: PublicContactMessageInput): Promise<SubmitResult> {
  if (!db) {
    console.error('[Firestore Message Submission]: Firestore is not initialized.');
    return {
      success: false,
      error: 'Unable to connect to the messaging desk. Please try emailing or messaging us on WhatsApp directly.'
    };
  }

  const name = (input.name || '').trim().slice(0, 100);
  const email = (input.email || '').trim().slice(0, 100);
  const message = (input.message || '').trim().slice(0, 3000);

  if (!name) {
    return { success: false, error: 'Please enter your contact name.' };
  }
  if (!email) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (!message) {
    return { success: false, error: 'Please enter your message or inquiry details.' };
  }

  // Construct payload with ONLY allowed schema keys matching firestore.rules
  const payload: Record<string, any> = {
    name,
    email,
    message,
    status: 'unread', // Enforced fixed initial status for public submissions
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (input.phone && input.phone.trim()) {
    payload.phone = input.phone.trim().slice(0, 30);
  }
  if (input.subject && input.subject.trim()) {
    payload.subject = input.subject.trim().slice(0, 200);
  }
  if (input.source && input.source.trim()) {
    payload.source = input.source.trim().slice(0, 100);
  } else {
    payload.source = 'public_website';
  }

  try {
    const docRef = await addDoc(collection(db, 'contactMessages'), payload);
    return { success: true, id: docRef.id };
  } catch (err: unknown) {
    console.error('[Firestore Message Submission Error]:', err);
    return {
      success: false,
      error: 'An unexpected network error occurred while sending your message. Please try again or reach out to our team directly.'
    };
  }
}

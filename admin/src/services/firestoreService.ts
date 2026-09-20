import { 
  collection, 
  doc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  type Unsubscribe,
  type DocumentData,
  type QuerySnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { 
  CarrierLeadDoc, 
  TruckerDoc,
  TruckerStatus,
  ContactMessageDoc, 
  LeadStatus, 
  MessageStatus,
  DashboardStats 
} from '../types/admin';

// Safe date formatter for Firestore Timestamp, string, or Date
export const formatFirestoreDate = (timestamp: any): string => {
  if (!timestamp) return 'Just now';
  
  try {
    let date: Date;
    if (typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === 'string' || typeof timestamp === 'number') {
      date = new Date(timestamp);
    } else if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000);
    } else {
      return 'Recent';
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Recent';
  }
};

// ============================================================================
// CARRIER LEADS SERVICE
// ============================================================================

export const subscribeToCarrierLeads = (
  callback: (leads: CarrierLeadDoc[]) => void,
  onError?: (error: Error) => void,
  limitCount: number = 100
): Unsubscribe => {
  if (!db) {
    callback([]);
    return () => {};
  }

  try {
    const leadsRef = collection(db, 'carrierLeads');
    const q = query(leadsRef, orderBy('createdAt', 'desc'), limit(limitCount));

    return onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const leads: CarrierLeadDoc[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            truckerId: data.truckerId || '',
            name: data.name || 'Unnamed Carrier',
            company: data.company || '',
            email: data.email || '',
            phone: data.phone || '',
            mcNumber: data.mcNumber || '',
            equipment: data.equipment || data.truckType || 'Dry Van (53ft)',
            truckCount: data.truckCount || '1',
            preferredLanes: data.preferredLanes || '',
            message: data.message || data.notes || '',
            status: (data.status as LeadStatus) || 'new',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            source: data.source || 'Website'
          };
        });
        callback(leads);
      },
      (error) => {
        console.error('[Firestore Carrier Leads Listener Error]:', error);
        if (onError) onError(error);
        callback([]);
      }
    );
  } catch (err) {
    console.error('[subscribeToCarrierLeads Error]:', err);
    callback([]);
    return () => {};
  }
};

export const fetchCarrierLeads = async (limitCount: number = 100): Promise<CarrierLeadDoc[]> => {
  if (!db) return [];

  try {
    const leadsRef = collection(db, 'carrierLeads');
    const q = query(leadsRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        truckerId: data.truckerId || '',
        name: data.name || 'Unnamed Carrier',
        company: data.company || '',
        email: data.email || '',
        phone: data.phone || '',
        mcNumber: data.mcNumber || '',
        equipment: data.equipment || data.truckType || 'Dry Van (53ft)',
        truckCount: data.truckCount || '1',
        preferredLanes: data.preferredLanes || '',
        message: data.message || data.notes || '',
        status: (data.status as LeadStatus) || 'new',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        source: data.source || 'Website'
      };
    });
  } catch (error) {
    console.error('[fetchCarrierLeads Error]:', error);
    return [];
  }
};

export const updateCarrierLeadStatus = async (
  leadId: string, 
  status: LeadStatus
): Promise<{ success: boolean; error?: string }> => {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const docRef = doc(db, 'carrierLeads', leadId);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (err: any) {
    console.error('[updateCarrierLeadStatus Error]:', err);
    return { success: false, error: err?.message || 'Failed to update lead status' };
  }
};

export const updateCarrierLead = async (
  leadId: string,
  updates: Partial<CarrierLeadDoc>
): Promise<{ success: boolean; error?: string }> => {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const docRef = doc(db, 'carrierLeads', leadId);
    const cleanedUpdates: Record<string, any> = { ...updates };
    delete cleanedUpdates.id;
    delete cleanedUpdates.createdAt;
    cleanedUpdates.updatedAt = serverTimestamp();

    await updateDoc(docRef, cleanedUpdates);
    return { success: true };
  } catch (err: any) {
    console.error('[updateCarrierLead Error]:', err);
    return { success: false, error: err?.message || 'Failed to update carrier lead' };
  }
};

export const deleteCarrierLead = async (
  leadId: string
): Promise<{ success: boolean; error?: string }> => {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const docRef = doc(db, 'carrierLeads', leadId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (err: any) {
    console.error('[deleteCarrierLead Error]:', err);
    return { success: false, error: err?.message || 'Failed to delete carrier lead' };
  }
};

export const exportCarrierLeadsToCSV = (
  leads: CarrierLeadDoc[], 
  filename: string = `dgw_carrier_leads_${new Date().toISOString().slice(0, 10)}.csv`
): void => {
  if (!leads || leads.length === 0) return;

  const headers = [
    'ID',
    'Name',
    'Company',
    'Phone',
    'Email',
    'MC Number',
    'Equipment',
    'Truck Count',
    'Preferred Lanes',
    'Status',
    'Trucker ID',
    'Source',
    'Created At',
    'Notes / Inquiry'
  ];

  const escapeCSV = (val: any): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = leads.map((lead) => {
    let createdStr = '';
    if (lead.createdAt) {
      if (typeof lead.createdAt.toDate === 'function') {
        createdStr = lead.createdAt.toDate().toISOString();
      } else if (lead.createdAt.seconds) {
        createdStr = new Date(lead.createdAt.seconds * 1000).toISOString();
      } else {
        createdStr = String(lead.createdAt);
      }
    }

    return [
      escapeCSV(lead.id || ''),
      escapeCSV(lead.name || ''),
      escapeCSV(lead.company || ''),
      escapeCSV(lead.phone || ''),
      escapeCSV(lead.email || ''),
      escapeCSV(lead.mcNumber || ''),
      escapeCSV(lead.equipment || ''),
      escapeCSV(lead.truckCount || ''),
      escapeCSV(lead.preferredLanes || ''),
      escapeCSV(lead.status || 'new'),
      escapeCSV(lead.truckerId || ''),
      escapeCSV(lead.source || ''),
      escapeCSV(createdStr),
      escapeCSV(lead.message || '')
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const createCarrierLead = async (
  leadData: Omit<CarrierLeadDoc, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<{ success: boolean; id?: string; error?: string }> => {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const leadsRef = collection(db, 'carrierLeads');
    const docRef = await addDoc(leadsRef, {
      ...leadData,
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (err: any) {
    console.error('[createCarrierLead Error]:', err);
    return { success: false, error: err?.message || 'Failed to create carrier lead' };
  }
};

// ============================================================================
// TRUCKERS / CARRIERS SERVICE (Real Onboarded Fleet)
// ============================================================================

export const subscribeToTruckers = (
  callback: (truckers: TruckerDoc[]) => void,
  onError?: (error: Error) => void,
  limitCount: number = 200
): Unsubscribe => {
  if (!db) {
    callback([]);
    return () => {};
  }

  try {
    const truckersRef = collection(db, 'truckers');
    const q = query(truckersRef, orderBy('createdAt', 'desc'), limit(limitCount));

    return onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const truckers: TruckerDoc[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            leadId: data.leadId || '',
            name: data.name || 'Unnamed Carrier',
            company: data.company || '',
            phone: data.phone || '',
            email: data.email || '',
            mcNumber: data.mcNumber || '',
            dotNumber: data.dotNumber || '',
            equipment: data.equipment || '53ft Dry Van',
            truckCount: data.truckCount || '1',
            preferredLanes: data.preferredLanes || '',
            location: data.location || 'United States',
            status: (data.status as TruckerStatus) || 'Pending',
            notes: data.notes || '',
            rating: data.rating || 5.0,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            source: data.source || 'Admin Onboarding'
          };
        });
        callback(truckers);
      },
      (error) => {
        console.error('[Firestore Truckers Listener Error]:', error);
        if (onError) onError(error);
        callback([]);
      }
    );
  } catch (err) {
    console.error('[subscribeToTruckers Error]:', err);
    callback([]);
    return () => {};
  }
};

export const fetchTruckers = async (limitCount: number = 200): Promise<TruckerDoc[]> => {
  if (!db) return [];

  try {
    const truckersRef = collection(db, 'truckers');
    const q = query(truckersRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        leadId: data.leadId || '',
        name: data.name || 'Unnamed Carrier',
        company: data.company || '',
        phone: data.phone || '',
        email: data.email || '',
        mcNumber: data.mcNumber || '',
        dotNumber: data.dotNumber || '',
        equipment: data.equipment || '53ft Dry Van',
        truckCount: data.truckCount || '1',
        preferredLanes: data.preferredLanes || '',
        location: data.location || 'United States',
        status: (data.status as TruckerStatus) || 'Pending',
        notes: data.notes || '',
        rating: data.rating || 5.0,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        source: data.source || 'Admin Onboarding'
      };
    });
  } catch (error) {
    console.error('[fetchTruckers Error]:', error);
    return [];
  }
};

export const createTrucker = async (
  truckerData: Omit<TruckerDoc, 'id' | 'createdAt' | 'updatedAt'>
): Promise<{ success: boolean; id?: string; error?: string }> => {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const truckersRef = collection(db, 'truckers');
    const docRef = await addDoc(truckersRef, {
      ...truckerData,
      status: truckerData.status || 'Pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (err: any) {
    console.error('[createTrucker Error]:', err);
    return { success: false, error: err?.message || 'Failed to create trucker record' };
  }
};

export const updateTrucker = async (
  truckerId: string,
  updates: Partial<TruckerDoc>
): Promise<{ success: boolean; error?: string }> => {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const docRef = doc(db, 'truckers', truckerId);
    const cleanedUpdates: Record<string, any> = { ...updates };
    delete cleanedUpdates.id;
    delete cleanedUpdates.createdAt;
    cleanedUpdates.updatedAt = serverTimestamp();

    await updateDoc(docRef, cleanedUpdates);
    return { success: true };
  } catch (err: any) {
    console.error('[updateTrucker Error]:', err);
    return { success: false, error: err?.message || 'Failed to update trucker record' };
  }
};

export const deleteTrucker = async (
  truckerId: string
): Promise<{ success: boolean; error?: string }> => {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const docRef = doc(db, 'truckers', truckerId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (err: any) {
    console.error('[deleteTrucker Error]:', err);
    return { success: false, error: err?.message || 'Failed to delete trucker record' };
  }
};

export const convertLeadToTrucker = async (
  leadId: string,
  leadData: CarrierLeadDoc,
  overrides?: Partial<TruckerDoc>
): Promise<{ success: boolean; truckerId?: string; error?: string }> => {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    // 1. Prevent duplicate conversion
    if (leadData.truckerId || leadData.status === 'onboarded') {
      return { 
        success: false, 
        error: 'This lead has already been converted and onboarded.' 
      };
    }

    // 2. Create the real Trucker document in `truckers` collection
    const truckersRef = collection(db, 'truckers');
    const newTruckerPayload = {
      leadId: leadId,
      name: overrides?.name || leadData.name || 'Unnamed Carrier',
      company: overrides?.company || leadData.company || '',
      phone: overrides?.phone || leadData.phone || '',
      email: overrides?.email || leadData.email || '',
      mcNumber: overrides?.mcNumber || leadData.mcNumber || '',
      dotNumber: overrides?.dotNumber || '',
      equipment: overrides?.equipment || leadData.equipment || '53ft Dry Van',
      truckCount: overrides?.truckCount || leadData.truckCount || '1',
      preferredLanes: overrides?.preferredLanes || leadData.preferredLanes || '',
      location: overrides?.location || (leadData.preferredLanes ? leadData.preferredLanes.split(',')[0].trim() : ''),
      status: overrides?.status || 'Pending',
      notes: overrides?.notes !== undefined ? overrides.notes : (leadData.message || ''),
      rating: 5.0,
      source: 'Converted from Website Lead',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const newTruckerDoc = await addDoc(truckersRef, newTruckerPayload);

    // 3. Update original carrierLeads document with status 'onboarded' and reference to truckerId
    const leadDocRef = doc(db, 'carrierLeads', leadId);
    await updateDoc(leadDocRef, {
      status: 'onboarded',
      truckerId: newTruckerDoc.id,
      updatedAt: serverTimestamp()
    });

    return { success: true, truckerId: newTruckerDoc.id };
  } catch (err: any) {
    console.error('[convertLeadToTrucker Error]:', err);
    return { success: false, error: err?.message || 'Failed to convert lead to trucker' };
  }
};

// ============================================================================
// CONTACT MESSAGES SERVICE
// ============================================================================

export const subscribeToContactMessages = (
  callback: (messages: ContactMessageDoc[]) => void,
  onError?: (error: Error) => void,
  limitCount: number = 20
): Unsubscribe => {
  if (!db) {
    callback([]);
    return () => {};
  }

  try {
    const messagesRef = collection(db, 'contactMessages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(limitCount));

    return onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const messages: ContactMessageDoc[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.name || 'Anonymous',
            email: data.email || '',
            phone: data.phone || '',
            subject: data.subject || 'General Inquiry',
            message: data.message || '',
            status: (data.status as MessageStatus) || 'unread',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            source: data.source || 'Contact Form'
          };
        });
        callback(messages);
      },
      (error) => {
        console.error('[Firestore Contact Messages Listener Error]:', error);
        if (onError) onError(error);
        callback([]);
      }
    );
  } catch (err) {
    console.error('[subscribeToContactMessages Error]:', err);
    callback([]);
    return () => {};
  }
};

export const fetchContactMessages = async (limitCount: number = 20): Promise<ContactMessageDoc[]> => {
  if (!db) return [];

  try {
    const messagesRef = collection(db, 'contactMessages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || 'Anonymous',
        email: data.email || '',
        phone: data.phone || '',
        subject: data.subject || 'General Inquiry',
        message: data.message || '',
        status: (data.status as MessageStatus) || 'unread',
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        source: data.source || 'Contact Form'
      };
    });
  } catch (error) {
    console.error('[fetchContactMessages Error]:', error);
    return [];
  }
};

export const updateContactMessageStatus = async (
  messageId: string, 
  status: MessageStatus
): Promise<{ success: boolean; error?: string }> => {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const docRef = doc(db, 'contactMessages', messageId);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (err: any) {
    console.error('[updateContactMessageStatus Error]:', err);
    return { success: false, error: err?.message || 'Failed to update message status' };
  }
};

export const createContactMessage = async (
  messageData: Omit<ContactMessageDoc, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<{ success: boolean; id?: string; error?: string }> => {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const messagesRef = collection(db, 'contactMessages');
    const docRef = await addDoc(messagesRef, {
      ...messageData,
      status: 'unread',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (err: any) {
    console.error('[createContactMessage Error]:', err);
    return { success: false, error: err?.message || 'Failed to create contact message' };
  }
};

// ============================================================================
// DASHBOARD STATS AGGREGATION
// ============================================================================

export const subscribeToDashboardMetrics = (
  callback: (stats: DashboardStats) => void
): Unsubscribe => {
  if (!db) {
    callback({
      totalLeads: 0,
      newLeads: 0,
      totalTruckers: 0,
      totalMessages: 0,
      unreadMessages: 0,
      websiteStatus: 'Operational'
    });
    return () => {};
  }

  let leadsData: CarrierLeadDoc[] = [];
  let truckersData: TruckerDoc[] = [];
  let messagesData: ContactMessageDoc[] = [];

  const updateAggregates = () => {
    const totalLeads = leadsData.length;
    const newLeads = leadsData.filter((l) => l.status === 'new').length;
    const totalTruckers = truckersData.length;
    const totalMessages = messagesData.length;
    const unreadMessages = messagesData.filter((m) => m.status === 'unread').length;

    callback({
      totalLeads,
      newLeads,
      totalTruckers,
      totalMessages,
      unreadMessages,
      websiteStatus: 'Operational'
    });
  };

  const unsubLeads = subscribeToCarrierLeads((leads) => {
    leadsData = leads;
    updateAggregates();
  });

  const unsubTruckers = subscribeToTruckers((truckers) => {
    truckersData = truckers;
    updateAggregates();
  });

  const unsubMessages = subscribeToContactMessages((messages) => {
    messagesData = messages;
    updateAggregates();
  });

  return () => {
    unsubLeads();
    unsubTruckers();
    unsubMessages();
  };
};

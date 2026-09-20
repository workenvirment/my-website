import type {
  Trucker,
  TruckerDoc,
  Broker,
  Load,
  MessageThread,
  OperationTask,
  SystemNotification,
  DocumentRecord,
  AuditLogEntry,
  ContactMessageDoc
} from '../types/admin';

// Initial dynamic state arrays (All initialize empty and populate from real Firestore & user operations)
const INITIAL_TRUCKERS: Trucker[] = [];
const INITIAL_BROKERS: Broker[] = [];
const INITIAL_LOADS: Load[] = [];
const INITIAL_MESSAGE_THREADS: MessageThread[] = [];
const INITIAL_TASKS: OperationTask[] = [];
const INITIAL_NOTIFICATIONS: SystemNotification[] = [];
const INITIAL_DOCUMENTS: DocumentRecord[] = [];
const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [];

// Storage Keys
const STORAGE_KEYS = {
  TRUCKERS: 'dgw_ops_truckers',
  BROKERS: 'dgw_ops_brokers',
  LOADS: 'dgw_ops_loads',
  THREADS: 'dgw_ops_threads',
  TASKS: 'dgw_ops_tasks',
  NOTIFICATIONS: 'dgw_ops_notifications',
  DOCUMENTS: 'dgw_ops_documents',
  AUDIT_LOGS: 'dgw_ops_audit_logs'
};

// Safe storage getter
const getStored = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn(`[OperationsStore] Read error for ${key}:`, err);
  }
  return fallback;
};

// Safe storage setter
const setStored = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[OperationsStore] Write error for ${key}:`, err);
  }
};

// Listeners
type Listener = () => void;
const listeners: Set<Listener> = new Set();

const notifyListeners = () => {
  listeners.forEach((l) => {
    try {
      l();
    } catch (err) {
      console.error('[OperationsStore] Listener error:', err);
    }
  });
};

export const operationsStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // ----------------- TRUCKERS -----------------
  getTruckers(): Trucker[] {
    const stored = getStored<Trucker[]>(STORAGE_KEYS.TRUCKERS, INITIAL_TRUCKERS);
    // Filter out old demo dummy IDs and legacy mock lead IDs from storage
    const clean = stored.filter((t) => !['trk-1', 'trk-2', 'trk-3', 'trk-4', 'trk-5'].includes(t.id) && !t.id.startsWith('lead-'));
    if (clean.length !== stored.length) {
      setStored(STORAGE_KEYS.TRUCKERS, clean);
    }
    return clean;
  },
  addTrucker(trucker: Omit<Trucker, 'id' | 'createdAt'>): Trucker {
    const truckers = this.getTruckers();
    const newTrucker: Trucker = {
      ...trucker,
      id: `trk-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newTrucker, ...truckers];
    setStored(STORAGE_KEYS.TRUCKERS, updated);
    this.addAuditLog('Added new trucker profile', 'Trucker', newTrucker.name);
    this.addNotification('New trucker registration', `${newTrucker.name} (${newTrucker.company}) added to network.`, 'trucker', '/truckers');
    notifyListeners();
    return newTrucker;
  },
  updateTrucker(id: string, updates: Partial<Trucker>): boolean {
    const truckers = this.getTruckers();
    const idx = truckers.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    truckers[idx] = { ...truckers[idx], ...updates };
    setStored(STORAGE_KEYS.TRUCKERS, truckers);
    this.addAuditLog(`Updated trucker details for ${truckers[idx].name}`, 'Trucker', truckers[idx].name);
    notifyListeners();
    return true;
  },
  deleteTrucker(id: string): boolean {
    const truckers = this.getTruckers();
    const target = truckers.find((t) => t.id === id);
    const filtered = truckers.filter((t) => t.id !== id);
    setStored(STORAGE_KEYS.TRUCKERS, filtered);
    if (target) {
      this.addAuditLog(`Deleted trucker record ${target.name}`, 'Trucker', target.name);
    }
    notifyListeners();
    return true;
  },

  // ----------------- BROKERS -----------------
  getBrokers(): Broker[] {
    const stored = getStored<Broker[]>(STORAGE_KEYS.BROKERS, INITIAL_BROKERS);
    const clean = stored.filter((b) => !['brk-1', 'brk-2', 'brk-3', 'brk-4', 'brk-5'].includes(b.id));
    if (clean.length !== stored.length) {
      setStored(STORAGE_KEYS.BROKERS, clean);
    }
    return clean;
  },
  addBroker(broker: Omit<Broker, 'id' | 'createdAt'>): Broker {
    const brokers = this.getBrokers();
    const newBroker: Broker = {
      ...broker,
      id: `brk-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newBroker, ...brokers];
    setStored(STORAGE_KEYS.BROKERS, updated);
    this.addAuditLog('Added new broker partner', 'Broker', newBroker.companyName);
    this.addNotification('New broker added', `${newBroker.companyName} added to dispatch network.`, 'broker', '/brokers');
    notifyListeners();
    return newBroker;
  },
  updateBroker(id: string, updates: Partial<Broker>): boolean {
    const brokers = this.getBrokers();
    const idx = brokers.findIndex((b) => b.id === id);
    if (idx === -1) return false;
    brokers[idx] = { ...brokers[idx], ...updates };
    setStored(STORAGE_KEYS.BROKERS, brokers);
    notifyListeners();
    return true;
  },
  deleteBroker(id: string): boolean {
    const brokers = this.getBrokers();
    const target = brokers.find((b) => b.id === id);
    const filtered = brokers.filter((b) => b.id !== id);
    setStored(STORAGE_KEYS.BROKERS, filtered);
    if (target) {
      this.addAuditLog(`Removed broker ${target.companyName}`, 'Broker', target.companyName);
    }
    notifyListeners();
    return true;
  },

  // ----------------- LOADS -----------------
  getLoads(): Load[] {
    const stored = getStored<Load[]>(STORAGE_KEYS.LOADS, INITIAL_LOADS);
    const clean = stored.filter((l) => !['ld-1', 'ld-2', 'ld-3', 'ld-4', 'ld-5'].includes(l.id));
    if (clean.length !== stored.length) {
      setStored(STORAGE_KEYS.LOADS, clean);
    }
    return clean;
  },
  addLoad(load: Omit<Load, 'id' | 'createdAt'>): Load {
    const loads = this.getLoads();
    const newLoad: Load = {
      ...load,
      id: `ld-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newLoad, ...loads];
    setStored(STORAGE_KEYS.LOADS, updated);
    this.addAuditLog(`Posted load #${newLoad.loadNumber} (${newLoad.origin} → ${newLoad.destination})`, 'Load', newLoad.loadNumber);
    this.addNotification('New load posted', `Load #${newLoad.loadNumber}: ${newLoad.origin} → ${newLoad.destination} ($${newLoad.rate.toLocaleString()})`, 'load', '/loads');
    notifyListeners();
    return newLoad;
  },
  updateLoad(id: string, updates: Partial<Load>): boolean {
    const loads = this.getLoads();
    const idx = loads.findIndex((l) => l.id === id);
    if (idx === -1) return false;
    loads[idx] = { ...loads[idx], ...updates };
    setStored(STORAGE_KEYS.LOADS, loads);
    this.addAuditLog(`Updated load #${loads[idx].loadNumber} status to ${loads[idx].status}`, 'Load', loads[idx].loadNumber);
    notifyListeners();
    return true;
  },
  deleteLoad(id: string): boolean {
    const loads = this.getLoads();
    const filtered = loads.filter((l) => l.id !== id);
    setStored(STORAGE_KEYS.LOADS, filtered);
    notifyListeners();
    return true;
  },

  // ----------------- MESSAGES -----------------
  getMessageThreads(): MessageThread[] {
    const stored = getStored<MessageThread[]>(STORAGE_KEYS.THREADS, INITIAL_MESSAGE_THREADS);
    const clean = stored.filter((t) => !['thr-1', 'thr-2', 'thr-3', 'thr-4', 'thr-5'].includes(t.id));
    if (clean.length !== stored.length) {
      setStored(STORAGE_KEYS.THREADS, clean);
    }
    return clean;
  },
  sendMessage(threadId: string, text: string, attachmentName?: string): boolean {
    const threads = this.getMessageThreads();
    const idx = threads.findIndex((t) => t.id === threadId);
    if (idx === -1) return false;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'admin' as const,
      senderName: 'DGW Dispatch',
      text,
      timestamp: 'Just now',
      isRead: true,
      attachmentName
    };

    threads[idx].messages.push(newMsg);
    threads[idx].lastMessage = text;
    threads[idx].lastMessageTime = 'Just now';
    threads[idx].unreadCount = 0;

    setStored(STORAGE_KEYS.THREADS, threads);
    this.addAuditLog(`Sent dispatch message to ${threads[idx].contactName}`, 'Message', threads[idx].contactName);
    notifyListeners();
    return true;
  },
  sendBulkMessage(recipients: string[], templateText: string): number {
    const threads = this.getMessageThreads();
    let sentCount = 0;
    threads.forEach((t) => {
      if (recipients.includes(t.id) || recipients.includes('all')) {
        t.messages.push({
          id: `msg-bulk-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          sender: 'admin',
          senderName: 'DGW Dispatch Broadcast',
          text: templateText,
          timestamp: 'Just now',
          isRead: true
        });
        t.lastMessage = templateText;
        t.lastMessageTime = 'Just now';
        sentCount++;
      }
    });
    setStored(STORAGE_KEYS.THREADS, threads);
    this.addAuditLog(`Sent bulk broadcast message to ${sentCount} carriers`, 'Message', 'Bulk Dispatch');
    notifyListeners();
    return sentCount;
  },
  markThreadRead(threadId: string) {
    const threads = this.getMessageThreads();
    const target = threads.find((t) => t.id === threadId);
    if (target) {
      target.unreadCount = 0;
      target.messages.forEach((m) => (m.isRead = true));
      setStored(STORAGE_KEYS.THREADS, threads);
      notifyListeners();
    }
  },

  // ----------------- UPCOMING ACTIONS (TASKS) -----------------
  getTasks(): OperationTask[] {
    const stored = getStored<OperationTask[]>(STORAGE_KEYS.TASKS, INITIAL_TASKS);
    const clean = stored.filter((t) => !['tsk-1', 'tsk-2', 'tsk-3', 'tsk-4'].includes(t.id));
    if (clean.length !== stored.length) {
      setStored(STORAGE_KEYS.TASKS, clean);
    }
    return clean;
  },
  addTask(title: string, dueTime: string, priority: 'High' | 'Medium' | 'Low', category: OperationTask['category']): OperationTask {
    const tasks = this.getTasks();
    const newTask: OperationTask = {
      id: `tsk-${Date.now()}`,
      title,
      dueTime,
      priority,
      category,
      isCompleted: false,
      createdAt: new Date().toISOString()
    };
    setStored(STORAGE_KEYS.TASKS, [newTask, ...tasks]);
    notifyListeners();
    return newTask;
  },
  toggleTask(id: string): boolean {
    const tasks = this.getTasks();
    const target = tasks.find((t) => t.id === id);
    if (target) {
      target.isCompleted = !target.isCompleted;
      setStored(STORAGE_KEYS.TASKS, tasks);
      notifyListeners();
      return true;
    }
    return false;
  },
  deleteTask(id: string): boolean {
    const tasks = this.getTasks();
    const filtered = tasks.filter((t) => t.id !== id);
    setStored(STORAGE_KEYS.TASKS, filtered);
    notifyListeners();
    return true;
  },

  // ----------------- NOTIFICATIONS -----------------
  getNotifications(): SystemNotification[] {
    const stored = getStored<SystemNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const clean = stored.filter((n) => !['notif-1', 'notif-2', 'notif-3', 'notif-4'].includes(n.id));
    if (clean.length !== stored.length) {
      setStored(STORAGE_KEYS.NOTIFICATIONS, clean);
    }
    return clean;
  },
  addNotification(title: string, description: string, type: SystemNotification['type'], routeLink?: string) {
    const notifs = this.getNotifications();
    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      title,
      description,
      timestamp: new Date().toISOString(),
      timeAgo: 'Just now',
      type,
      isUnread: true,
      routeLink
    };
    setStored(STORAGE_KEYS.NOTIFICATIONS, [newNotif, ...notifs.slice(0, 30)]);
    notifyListeners();
  },
  markNotificationRead(id: string) {
    const notifs = this.getNotifications();
    const target = notifs.find((n) => n.id === id);
    if (target) {
      target.isUnread = false;
      setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);
      notifyListeners();
    }
  },
  markAllNotificationsRead() {
    const notifs = this.getNotifications();
    notifs.forEach((n) => (n.isUnread = false));
    setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);
    notifyListeners();
  },

  // ----------------- DOCUMENTS -----------------
  getDocuments(): DocumentRecord[] {
    const stored = getStored<DocumentRecord[]>(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
    const clean = stored.filter((d) => !['doc-1', 'doc-2', 'doc-3', 'doc-4', 'doc-5', 'doc-6'].includes(d.id));
    if (clean.length !== stored.length) {
      setStored(STORAGE_KEYS.DOCUMENTS, clean);
    }
    return clean;
  },
  addDocument(doc: Omit<DocumentRecord, 'id' | 'uploadDate'>): DocumentRecord {
    const docs = this.getDocuments();
    const newDoc: DocumentRecord = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    setStored(STORAGE_KEYS.DOCUMENTS, [newDoc, ...docs]);
    this.addAuditLog(`Uploaded document ${newDoc.name} for ${newDoc.ownerName}`, 'Document', newDoc.name);
    notifyListeners();
    return newDoc;
  },
  deleteDocument(id: string): boolean {
    const docs = this.getDocuments();
    const filtered = docs.filter((d) => d.id !== id);
    setStored(STORAGE_KEYS.DOCUMENTS, filtered);
    notifyListeners();
    return true;
  },

  // ----------------- AUDIT LOGS -----------------
  getAuditLogs(): AuditLogEntry[] {
    const stored = getStored<AuditLogEntry[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    const clean = stored.filter((a) => !['aud-1', 'aud-2', 'aud-3', 'aud-4'].includes(a.id));
    if (clean.length !== stored.length) {
      setStored(STORAGE_KEYS.AUDIT_LOGS, clean);
    }
    return clean;
  },
  addAuditLog(action: string, recordType: AuditLogEntry['recordType'], recordIdentifier: string) {
    const logs = this.getAuditLogs();
    const newLog: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      adminName: 'Admin (System Administrator)',
      action,
      recordType,
      recordIdentifier,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      ipAddress: '192.168.1.104',
      status: 'Success'
    };
    setStored(STORAGE_KEYS.AUDIT_LOGS, [newLog, ...logs.slice(0, 100)]);
  },

  // ----------------- REAL-TIME FIRESTORE SYNC -----------------
  syncFirestoreTruckers(truckers: TruckerDoc[]) {
    if (!truckers) return;
    const mapped: Trucker[] = truckers.map((t) => {
      let createdStr = new Date().toISOString();
      if (t.createdAt) {
        if (typeof t.createdAt.toDate === 'function') {
          createdStr = t.createdAt.toDate().toISOString();
        } else if (t.createdAt.seconds) {
          createdStr = new Date(t.createdAt.seconds * 1000).toISOString();
        } else if (typeof t.createdAt === 'string') {
          createdStr = t.createdAt;
        }
      }
      return {
        id: t.id || `trk-${Date.now()}`,
        leadId: t.leadId,
        name: t.name || 'Unnamed Carrier',
        company: t.company || '',
        phone: t.phone || '',
        email: t.email || '',
        mcNumber: t.mcNumber || '',
        dotNumber: t.dotNumber || '',
        equipment: t.equipment || '53ft Dry Van',
        truckCount: t.truckCount || '1',
        preferredLanes: t.preferredLanes || '',
        location: t.location || 'United States',
        status: t.status || 'Pending',
        lastActive: 'Active',
        rating: t.rating || 5.0,
        notes: t.notes || '',
        createdAt: createdStr,
        avatarColor: 'bg-blue-600'
      };
    });
    setStored(STORAGE_KEYS.TRUCKERS, mapped);
    notifyListeners();
  },

  syncFirestoreMessages(messages: ContactMessageDoc[]) {
    if (!messages) return;
    const currentThreads = this.getMessageThreads();
    let updated = false;

    messages.forEach((msg) => {
      if (!msg.name) return;
      const threadId = `fs-msg-${msg.id || msg.email}`;
      const exists = currentThreads.some((t) => t.id === threadId);
      if (!exists) {
        currentThreads.unshift({
          id: threadId,
          contactName: msg.name,
          contactRole: 'Broker',
          contactPhone: msg.phone,
          contactEmail: msg.email,
          contactAvatar: msg.name.substring(0, 2).toUpperCase(),
          lastMessage: msg.message.slice(0, 60),
          lastMessageTime: 'Recent',
          unreadCount: msg.status === 'unread' ? 1 : 0,
          status: 'online',
          messages: [
            {
              id: `msg-${Date.now()}`,
              sender: 'broker',
              senderName: msg.name,
              text: `[Subject: ${msg.subject}]\n\n${msg.message}`,
              timestamp: 'Recent',
              isRead: msg.status !== 'unread'
            }
          ]
        });
        updated = true;
      }
    });

    if (updated) {
      setStored(STORAGE_KEYS.THREADS, currentThreads);
      notifyListeners();
    }
  }
};

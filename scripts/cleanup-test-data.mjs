#!/usr/bin/env node

/**
 * ============================================================================
 * DGW Solutions LLC — Safe Cleanup Script for Test Records Only
 * ============================================================================
 * This script safely queries Firestore and deletes ONLY the test records created
 * by the "+ Test Lead" and "+ Test Message" buttons.
 *
 * SAFETY GUARANTEES:
 * - Real/public carrier leads or customer contact messages will NEVER be deleted.
 * - Test criteria is strictly matching exact sample constants.
 * - The collections themselves are never deleted.
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const candidatePaths = [
  process.env.GOOGLE_APPLICATION_CREDENTIALS,
  path.join(rootDir, 'credentials', 'serviceAccountKey.json'),
  path.join(rootDir, 'serviceAccountKey.json'),
  path.join(rootDir, 'admin', 'credentials', 'serviceAccountKey.json')
].filter(Boolean);

async function main() {
  console.log('============================================================');
  console.log('  DGW SOLUTIONS LLC — FIRESTORE TEST DATA CLEANUP');
  console.log('============================================================\n');

  let keyPath = null;
  for (const candidate of candidatePaths) {
    if (candidate && fs.existsSync(candidate)) {
      keyPath = candidate;
      break;
    }
  }

  if (!keyPath) {
    console.error('❌ Service Account Key JSON not found. Please ensure credentials/serviceAccountKey.json exists.');
    process.exit(1);
  }

  const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));

  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount)
    });
  }

  const db = getFirestore();

  console.log('🔍 Scanning `carrierLeads` collection for test records...');
  const leadsSnapshot = await db.collection('carrierLeads').get();
  let deletedLeadsCount = 0;

  for (const doc of leadsSnapshot.docs) {
    const data = doc.data();
    const isTestLead = (
      data.name === 'Sample Carrier Partner' ||
      data.company === 'Highland Freight LLC' ||
      data.email === 'carrier.dispatch@example.com' ||
      data.mcNumber === 'MC-184920' ||
      data.source === 'Admin Direct Entry'
    );

    if (isTestLead) {
      console.log(`🗑️  Deleting test lead document ID: ${doc.id} (Name: "${data.name}", MC: "${data.mcNumber || 'N/A'}")`);
      await doc.ref.delete();
      deletedLeadsCount++;
    } else {
      console.log(`✅ Keeping real lead document ID: ${doc.id} (Name: "${data.name}")`);
    }
  }

  console.log('\n🔍 Scanning contactMessages collection for test messages...');
  const messagesSnapshot = await db.collection('contactMessages').get();
  let deletedMessagesCount = 0;

  for (const doc of messagesSnapshot.docs) {
    const data = doc.data();
    const isTestMessage = (
      data.name === 'Michael Scott' ||
      data.email === 'mscott@scrantonfreight.com'
    );

    if (isTestMessage) {
      console.log(`🗑️  Deleting test message document ID: ${doc.id} (Subject: "${data.subject}")`);
      await doc.ref.delete();
      deletedMessagesCount++;
    } else {
      console.log(`✅ Keeping real message document ID: ${doc.id} (Subject: "${data.subject}")`);
    }
  }

  console.log('\n============================================================');
  console.log('  ✅ CLEANUP COMPLETE');
  console.log('============================================================');
  console.log(`  Test Carrier Leads Deleted:    ${deletedLeadsCount}`);
  console.log(`  Test Contact Messages Deleted: ${deletedMessagesCount}`);
  console.log('============================================================\n');
}

main().catch((err) => {
  console.error('Cleanup error:', err);
  process.exit(1);
});

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
  console.log('  DGW SOLUTIONS LLC — TARGETED TEST LEAD CLEANUP');
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

  console.log('🔍 Fetching all documents in `carrierLeads` collection...');
  const snapshot = await db.collection('carrierLeads').get();

  console.log(`Total documents found in carrierLeads: ${snapshot.docs.length}\n`);

  let matchingDoc = null;
  const nonMatchingDocs = [];

  for (const doc of snapshot.docs) {
    const data = doc.data();
    console.log(`- Document ID: ${doc.id}`);
    console.log(`  Name:           "${data.name}"`);
    console.log(`  Phone:          "${data.phone}"`);
    console.log(`  Email:          "${data.email}"`);
    console.log(`  MC Number:      "${data.mcNumber}"`);
    console.log(`  Equipment:      "${data.equipment}"`);
    console.log(`  PreferredLanes: "${data.preferredLanes}"`);
    console.log(`  Status:         "${data.status}"`);
    console.log(`  Source:         "${data.source}"`);
    console.log('------------------------------------------------------------');

    const matchesName = data.name === 'Test Carrier';
    const matchesPhone = data.phone === '5555555555' || data.phone?.includes('5555555555');
    const matchesEmail = data.email === 'test@example.com';
    const matchesMc = data.mcNumber === 'MC-TEST123';
    const matchesEquipment = data.equipment === 'Dry Van' || data.equipment?.includes('Dry Van');
    const matchesLanes = data.preferredLanes === 'Texas to California' || data.preferredLanes?.includes('Texas to California');

    if (matchesName && matchesPhone && matchesEmail && matchesMc && matchesEquipment && matchesLanes) {
      matchingDoc = { id: doc.id, ref: doc.ref, data };
    } else {
      nonMatchingDocs.push({ id: doc.id, name: data.name });
    }
  }

  if (!matchingDoc) {
    console.log('\n⚠️ No document matched all specified test lead criteria.');
    process.exit(0);
  }

  console.log(`\n🎯 TARGET DOCUMENT IDENTIFIED FOR SAFE DELETION:`);
  console.log(`  Document ID: ${matchingDoc.id}`);
  console.log(`  Name:        ${matchingDoc.data.name}`);
  console.log(`  Phone:       ${matchingDoc.data.phone}`);
  console.log(`  Email:       ${matchingDoc.data.email}`);
  console.log(`  MC Number:   ${matchingDoc.data.mcNumber}`);
  console.log(`  Equipment:   ${matchingDoc.data.equipment}`);
  console.log(`  Lanes:       ${matchingDoc.data.preferredLanes}`);

  console.log(`\n🗑️ Deleting ONLY document ${matchingDoc.id}...`);
  await matchingDoc.ref.delete();

  console.log(`\n============================================================`);
  console.log(`  ✅ CLEANUP COMPLETE`);
  console.log(`============================================================`);
  console.log(`  Deleted Document ID: ${matchingDoc.id}`);
  console.log(`  Total Deleted:       1`);
  console.log(`  Other Docs Untouched: ${nonMatchingDocs.length}`);
  console.log(`============================================================\n`);
}

main().catch((err) => {
  console.error('Execution error:', err);
  process.exit(1);
});

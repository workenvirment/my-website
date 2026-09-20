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
  let keyPath = null;
  for (const candidate of candidatePaths) {
    if (candidate && fs.existsSync(candidate)) {
      keyPath = candidate;
      break;
    }
  }

  const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));
  if (getApps().length === 0) {
    initializeApp({ credential: cert(serviceAccount) });
  }

  const db = getFirestore();

  console.log('=== COLLECTIONS LIST ===');
  const collections = await db.listCollections();
  for (const col of collections) {
    console.log(`\nCollection: [${col.id}]`);
    const docs = await col.get();
    console.log(`  Count: ${docs.docs.length}`);
    for (const d of docs.docs) {
      console.log(`  - Doc ID: ${d.id}, Data:`, JSON.stringify(d.data()));
    }
  }
}

main().catch(console.error);

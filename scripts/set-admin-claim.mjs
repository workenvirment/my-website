#!/usr/bin/env node

/**
 * ============================================================================
 * DGW Solutions LLC — Secure One-Time Administrator Custom Claim Setup
 * ============================================================================
 * This script runs locally in a Node.js server environment using the Firebase Admin SDK.
 * It assigns the custom user claim { admin: true } to the designated Firebase Auth user UID.
 *
 * SAFETY GUARANTEES:
 * - Service account private keys are NEVER bundled into client-side Vite builds.
 * - Credentials files are strictly ignored by .gitignore (credentials/ and *serviceAccountKey*.json).
 * - No secrets or keys are hardcoded in source code or printed to the console.
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// TARGET ADMINISTRATOR CONFIGURATION
const TARGET_ADMIN_UID = 'Kgroook0oPcGICsbMQ7eVzdJY543';
const TARGET_ADMIN_EMAIL = 'farhanbutt00088888@gmail.com';

// Potential local paths where the service account JSON may be stored
const candidatePaths = [
  process.env.GOOGLE_APPLICATION_CREDENTIALS,
  path.join(rootDir, 'credentials', 'serviceAccountKey.json'),
  path.join(rootDir, 'serviceAccountKey.json'),
  path.join(rootDir, 'admin', 'credentials', 'serviceAccountKey.json')
].filter(Boolean);

async function main() {
  console.log('============================================================');
  console.log('  DGW SOLUTIONS LLC — ONE-TIME ADMIN CLAIM SETUP');
  console.log('============================================================\n');

  // 1. Locate the Service Account Key JSON
  let keyPath = null;
  for (const candidate of candidatePaths) {
    if (candidate && fs.existsSync(candidate)) {
      keyPath = candidate;
      break;
    }
  }

  if (!keyPath) {
    console.error('❌ ERROR: Firebase Service Account Key JSON not found.\n');
    console.error('To run this one-time setup, follow these steps:');
    console.error('1. Go to your Firebase Console: https://console.firebase.google.com/');
    console.error('2. Navigate to: Project Settings -> Service Accounts');
    console.error('3. Click "Generate new private key" and download the JSON file.');
    console.error('4. Create a folder named "credentials" in the project root:');
    console.error('     d:\\new site DGW\\credentials\\');
    console.error('5. Rename your downloaded file to "serviceAccountKey.json" and place it at:');
    console.error('     d:\\new site DGW\\credentials\\serviceAccountKey.json');
    console.error('\nNOTE: The "credentials/" folder is protected by .gitignore and will NEVER be committed to Git.\n');
    process.exit(1);
  }

  console.log(`🔒 Found service account credential at: ${path.relative(rootDir, keyPath)}`);

  // 2. Read and parse the service account JSON
  let serviceAccount;
  try {
    const rawData = fs.readFileSync(keyPath, 'utf-8');
    serviceAccount = JSON.parse(rawData);
  } catch (err) {
    console.error('❌ Failed to read or parse serviceAccountKey.json:', err.message);
    process.exit(1);
  }

  // 3. Initialize Firebase Admin SDK
  try {
    if (getApps().length === 0) {
      initializeApp({
        credential: cert(serviceAccount)
      });
    }
  } catch (err) {
    console.error('❌ Failed to initialize Firebase Admin SDK:', err.message);
    process.exit(1);
  }

  const auth = getAuth();

  // 4. Verify target user exists in Firebase Auth
  console.log(`\n🔍 Looking up user UID: ${TARGET_ADMIN_UID}...`);
  let userRecord;
  try {
    userRecord = await auth.getUser(TARGET_ADMIN_UID);
    console.log(`   User Found: ${userRecord.email || 'No email set'} (UID: ${userRecord.uid})`);
  } catch (err) {
    console.error(`❌ User lookup failed: ${err.message}`);
    console.error('   Please verify that the user has already been created in Firebase Authentication.');
    process.exit(1);
  }

  // 5. Assign Custom Claim { admin: true }
  console.log(`\n⚙️  Assigning custom claim { admin: true }...`);
  try {
    await auth.setCustomUserClaims(TARGET_ADMIN_UID, { admin: true });
    
    // 6. Verify claim persistence
    const updatedUser = await auth.getUser(TARGET_ADMIN_UID);
    const claims = updatedUser.customClaims || {};

    if (claims.admin === true) {
      console.log('\n============================================================');
      console.log('  ✅ SUCCESS: ADMINISTRATOR CUSTOM CLAIM GRANTED');
      console.log('============================================================');
      console.log(`  User Email:    ${updatedUser.email}`);
      console.log(`  User UID:      ${updatedUser.uid}`);
      console.log(`  Custom Claims: ${JSON.stringify(claims)}`);
      console.log('============================================================\n');
      console.log('👉 NEXT STEPS FOR ADMINISTRATOR:');
      console.log('1. If you are currently logged in to http://localhost:5174, click "Sign Out Admin".');
      console.log('2. Sign in again with your email and password.');
      console.log('3. Firebase will issue a fresh JWT token containing "admin: true".');
      console.log('4. Firestore Security Rules will now grant you full read/write access to carrierLeads & contactMessages!\n');
    } else {
      console.error('⚠️ Warning: Claims verification returned unexpected result:', claims);
    }
  } catch (err) {
    console.error('❌ Failed to set custom user claims:', err.message);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});

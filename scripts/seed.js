#!/usr/bin/env node

// Load environment variables from .env file
import dotenv from 'dotenv';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Load .env file from project root
dotenv.config({ path: path.join(projectRoot, '.env') });

// Verify DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment variables.');
  console.error('Please ensure you have a .env file with DATABASE_URL set.');
  process.exit(1);
}

console.log('✅ Environment loaded, running seed script...');

try {
  // Run the seed script with tsx
  execSync('npx tsx server/seed.ts', { 
    stdio: 'inherit', 
    cwd: projectRoot,
    env: { ...process.env }
  });
} catch (error) {
  console.error('❌ Seed script failed:', error.message);
  process.exit(1);
}
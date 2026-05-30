import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { hashPassword } from './auth';

// Load env first so DB module reads MONGODB_URI correctly
dotenv.config();

// Dynamic import of db after env is loaded
const dbMod = await import('./db');
const connectDB = dbMod.connectDB;
const UserModel = dbMod.UserModel;

async function migrate() {
  const USERS_FILE = path.join(process.cwd(), 'users.json');
  if (!fs.existsSync(USERS_FILE)) {
    console.error('users.json not found at', USERS_FILE);
    process.exit(1);
  }

  const raw = fs.readFileSync(USERS_FILE, 'utf-8');
  const usersArray = JSON.parse(raw);

  const conn = await connectDB();
  if (!conn) {
    console.error('MongoDB not configured. Set MONGODB_URI in your .env');
    process.exit(1);
  }

  console.log('Beginning migration of', usersArray.length, 'users');

  for (const [email, user] of usersArray) {
    try {
      const normalizedEmail = String(email).trim().toLowerCase();
      const toSave = { ...user, email: normalizedEmail };

      // Ensure password is hashed
      if (toSave.password && !toSave.password.startsWith('$2')) {
        toSave.password = await hashPassword(toSave.password);
      }

      await UserModel.updateOne({ email: normalizedEmail }, toSave, { upsert: true });
      console.log('Migrated', normalizedEmail);
    } catch (e: any) {
      console.error('Failed to migrate user', email, e?.message || e);
    }
  }

  console.log('Migration completed');
  process.exit(0);
}

migrate();

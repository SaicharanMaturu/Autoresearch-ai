import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

export async function connectDB() {
  if (!MONGODB_URI) {
    process.stdout.write('\n⚠️  MONGODB_URI not set - DB disabled (running in file-backed/demo mode)\n');
    return null;
  }

  try {
    await mongoose.connect(MONGODB_URI, { dbName: process.env.MONGODB_DB || undefined });
    process.stdout.write('\n✅ Connected to MongoDB\n');
    return mongoose.connection;
  } catch (err: any) {
    process.stdout.write('\n❌ MongoDB connection error: ' + (err.message || err) + '\n');
    return null;
  }
}

// Minimal User schema for migration/phase 2
export const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  fullName: String,
  email: { type: String, required: true, unique: true },
  password: String,
  verified: { type: Boolean, default: false },
  verificationToken: String,
  verificationExpiresAt: Date,
  provider: String,
  createdAt: String,
});

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export const RefreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
  expiresAt: { type: Date },
  revoked: { type: Boolean, default: false },
});

export const RefreshTokenModel = mongoose.models.RefreshToken || mongoose.model('RefreshToken', RefreshTokenSchema);

export const FileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true, index: true },
  name: String,
  path: String,
  size: Number,
  type: String,
  uploadedAt: String,
  status: String,
});

export const SessionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true, index: true },
  userAgent: String,
  ip: String,
  createdAt: { type: Date, default: () => new Date() },
  revoked: { type: Boolean, default: false },
});

export const SessionModel = mongoose.models.Session || mongoose.model('Session', SessionSchema);

export const FileModel = mongoose.models.File || mongoose.model('File', FileSchema);

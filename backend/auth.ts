import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'dev_refresh_secret';
const ACCESS_EXPIRES = process.env.JWT_EXPIRES_IN || '1h';
const REFRESH_EXPIRES = process.env.REFRESH_EXPIRES_IN || '7d';

export async function hashPassword(plain: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export function signAccessToken(payload: object) {
  return jwt.sign(payload as any, JWT_SECRET as any, { expiresIn: ACCESS_EXPIRES as any } as any);
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload as any, REFRESH_SECRET as any, { expiresIn: REFRESH_EXPIRES as any } as any);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as any;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as any;
}

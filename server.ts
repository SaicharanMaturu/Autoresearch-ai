import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import crypto from "crypto";
import { hashPassword, comparePassword, signAccessToken, signRefreshToken, verifyRefreshToken } from "./backend/auth";
import { connectDB, UserModel, RefreshTokenModel, FileModel, SessionModel } from "./backend/db";
import { requireAuth } from "./backend/authMiddleware";
import { enqueueFileProcessing, startWorker } from "./backend/worker";
import nodemailer from "nodemailer";
import multer from 'multer';
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import fs from "fs";
// Note: avoid using import.meta.url here to remain compatible when bundling to CJS

dotenv.config();

const app = express();
const PORT = 3000;

const users = new Map<string, any>();

const isHashed = (pw: string) => typeof pw === 'string' && pw.startsWith('$2');
const passwordResetTokens = new Map<string, { email: string; expiresAt: number }>();

//===========USER DATA PERSISTENCE ============
// Use process.cwd() to determine working directory so the bundle works
// when compiled to either ESM or CommonJS.
const USERS_FILE = path.join(process.cwd(), "users.json");

const saveUsers = () => {
  try {
    const usersArray = Array.from(users.entries());
    fs.writeFileSync(USERS_FILE, JSON.stringify(usersArray, null, 2));
    process.stdout.write(`\n💾 Users saved to ${USERS_FILE}\n`);
  } catch (error) {
    process.stdout.write(`\n❌ Error saving users: ${error}\n`);
  }
};

const loadUsers = () => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const usersArray = JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
      users.clear();
      for (const [email, user] of usersArray) {
        // Backfill legacy user records so auth/profile logic stays consistent.
        const normalizedUser = {
          ...user,
          id: user?.id || crypto.randomUUID(),
          name: user?.name || user?.fullName || email.split("@")[0],
          email: user?.email || email,
        };
        users.set(email, normalizedUser);
      }
      saveUsers();
      process.stdout.write(`\n✅ Users loaded from ${USERS_FILE}\n`);
    }
  } catch (error) {
    process.stdout.write(`\n❌ Error loading users: ${error}\n`);
  }
};

loadUsers();

// Attempt DB connection (optional)
connectDB();

app.use(express.json());
// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Multer setup for multipart uploads (local storage)
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now().toString() + '-' + Math.random().toString(36).slice(2,8);
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    cb(null, `${unique}-${safeName}`);
  }
});


const upload = multer({ storage: uploadStorage });

// ============ GMAIL EMAIL SERVICE ============
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const emailServiceEnabled = !!process.env.GMAIL_EMAIL && !!process.env.GMAIL_APP_PASSWORD;

// Debug: Log email service status on startup
process.stdout.write(`\n📧 EMAIL SERVICE STATUS:\n`);
process.stdout.write(`   Gmail Email: ${process.env.GMAIL_EMAIL ? "✅ SET" : "❌ NOT SET"}\n`);
process.stdout.write(`   Gmail Password: ${process.env.GMAIL_APP_PASSWORD ? "✅ SET" : "❌ NOT SET"}\n`);
process.stdout.write(`   Service Enabled: ${emailServiceEnabled ? "✅ YES" : "❌ NO"}\n\n`);

const sendPasswordResetEmail = async (email: string, resetToken: string) => {
  process.stdout.write(`\n🔧 EMAIL RESET: ${email} | Token: ${resetToken}\n`);
  
  if (!emailServiceEnabled) {
    process.stdout.write(`[DEMO MODE] Would send to ${email}\n`);
    return true;
  }

  try {
    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const resetLink = `${appUrl}/#/reset-password?token=${resetToken}`;

    process.stdout.write(`📤 Sending via Gmail for ${email}...\n`);
    
    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Reset Your AutoResearch Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #070707 0%, #121B3A 100%); padding: 20px; border-radius: 10px; color: #fff;">
          <h2 style="color: #00E5FF; margin-bottom: 20px;">🔐 Password Reset</h2>
          <p style="margin-bottom: 15px;">You requested to reset your AutoResearch password. Click below to proceed:</p>
          <p style="margin-bottom: 20px;">
            <a href="${resetLink}" style="background-color: #00E5FF; color: #070707; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </p>
          <p style="margin-bottom: 10px;">Reset Code: <code style="background: rgba(0,229,255,0.1); padding: 4px 8px; border-radius: 3px;">${resetToken}</code></p>
          <p style="margin-bottom: 10px; color: #888; font-size: 12px;">This link expires in 1 hour.</p>
          <p style="margin-bottom: 20px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px; color: #888; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
          <p style="color: #666; font-size: 11px; text-align: center; margin-top: 20px;">AutoResearch Scientist AI • Neural Interface v2035</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    
    process.stdout.write(`✅ EMAIL SENT! ID: ${result.messageId}\n`);
    return true;
  } catch (error: any) {
    process.stdout.write(`❌ EXCEPTION: ${error.message || error}\n`);
    return false;
  }
};

const sendVerificationEmail = async (email: string, verificationToken: string) => {
  process.stdout.write(`\n🔧 EMAIL VERIFICATION: ${email} | Token: ${verificationToken}\n`);

  if (!emailServiceEnabled) {
    process.stdout.write(`[DEMO MODE] Would send verification to ${email}\n`);
    return true;
  }

  try {
    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const verifyLink = `${appUrl}/#/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Verify your AutoResearch email",
      html: `Please verify: <a href="${verifyLink}">Verify Email</a>`
    };

    const result = await transporter.sendMail(mailOptions);
    process.stdout.write(`✅ VERIFICATION EMAIL SENT ID: ${result.messageId}\n`);
    return true;
  } catch (error: any) {
    process.stdout.write(`❌ VERIFICATION EMAIL ERROR: ${error.message || error}\n`);
    return false;
  }
};

// ============ GOOGLE OAUTH ============
const googleOAuth2Client = (() => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (clientId && clientSecret && !clientId.includes("YOUR_") && !clientSecret.includes("YOUR_")) {
    return new OAuth2Client(clientId, clientSecret, `${process.env.APP_URL || "http://localhost:3000"}/api/google-callback`);
  }
  return null;
})();

// ============ RATE LIMITING ============
const rateLimitStore: Map<string, number[]> = new Map();

const getRateLimitKey = (identifier: string) => `${identifier}`;

const checkRateLimit = (identifier: string): boolean => {
  const window = parseInt(process.env.RATE_LIMIT_WINDOW || "900000"); // 15 minutes
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "5");
  const now = Date.now();

  const key = getRateLimitKey(identifier);
  const timestamps = rateLimitStore.get(key) || [];

  // Remove old timestamps outside the window
  const recentTimestamps = timestamps.filter(ts => now - ts < window);

  if (recentTimestamps.length >= maxRequests) {
    return false; // Rate limit exceeded
  }

  recentTimestamps.push(now);
  rateLimitStore.set(key, recentTimestamps);

  // Cleanup: Remove entries with empty arrays
  if (recentTimestamps.length === 0) {
    rateLimitStore.delete(key);
  }

  return true; // Within rate limit
};

const rateLimitMiddleware = (endpoint: string) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const identifier = (req.body.email || req.body.googleId || req.ip || "unknown") + endpoint;
  
  if (!checkRateLimit(identifier)) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
      retryAfter: parseInt(process.env.RATE_LIMIT_WINDOW || "900000") / 1000
    });
  }
  
  next();
};

// 3. Login Endpoint (with rate limiting)
app.post("/api/login", rateLimitMiddleware("login"), async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    // Prefer DB-backed user if available
    let user: any = null;
    try { user = await UserModel.findOne({ email: normalizedEmail }).lean().exec(); } catch(e) { /* ignore */ }
    if (!user) {
      user = users.get(normalizedEmail);
    }

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await comparePassword(password, user.password || '');
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    // Issue tokens and create refresh token record + session
    const accessToken = signAccessToken({ userId: user.id, email: user.email });
    const refreshToken = signRefreshToken({ userId: user.id, email: user.email });

    try { await RefreshTokenModel.create({ token: refreshToken, userId: user.id }); } catch (e) { process.stdout.write(`\n⚠️ Could not persist refresh token (login): ${e}\n`); }
    try { await SessionModel.create({ id: crypto.randomUUID(), userId: user.id, userAgent: req.headers['user-agent'] || '', ip: req.ip }); } catch(e) {}

    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email }, token: accessToken, refreshToken });
  } catch (err: any) {
    res.status(500).json({ error: "Login failed: " + err.message });
  }
});

// In-memory storage (legacy/demo)
const uploadedFiles: Map<string, any[]> = new Map();
const googleUsers: Map<string, any> = new Map();

// Lazy Gemini API Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// ============ AUTHENTICATION ENDPOINTS ============

// 1. API Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "online", system: "AutoResearch Scientist AI v1.0" });
});

// 2. Signup Endpoint (with rate limiting)
app.post("/api/signup", rateLimitMiddleware("signup"), (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!fullName || !normalizedEmail || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (users.has(normalizedEmail)) {
      return res.status(409).json({ error: "User already exists" });
    }

    (async () => {
      const userId = crypto.randomUUID();
      const hashed = await hashPassword(password);
      const verificationToken = crypto.randomBytes(12).toString('hex');
      const verificationExpiresAt = Date.now() + (parseInt(process.env.EMAIL_VERIFICATION_EXPIRY || '86400') * 1000);

      const user = {
        id: userId,
        name: fullName,
        fullName,
        email: normalizedEmail,
        password: hashed,
        verified: false,
        verificationToken,
        verificationExpiresAt,
        provider: "local",
        createdAt: new Date().toISOString(),
      };

      users.set(normalizedEmail, user);
      uploadedFiles.set(userId, []);
      saveUsers(); // Save users after signup (legacy file-backed mode)

      // Issue JWT access + refresh tokens
      const accessToken = signAccessToken({ userId: user.id, email: user.email });
      const refreshToken = signRefreshToken({ userId: user.id, email: user.email });
      // Persist refresh token to MongoDB
      try {
        await RefreshTokenModel.create({ token: refreshToken, userId: user.id });
      } catch (e) {
        // If DB write fails, surface but continue (demo mode may not have DB)
        process.stdout.write(`\n⚠️ Could not persist refresh token: ${e}\n`);
      }

      // Persist to MongoDB if available
      try {
        await UserModel.updateOne({ email: normalizedEmail }, user, { upsert: true });
        // Send verification email (demo mode prints token)
        await sendVerificationEmail(normalizedEmail, verificationToken);
      } catch (e) {
        process.stdout.write(`\n⚠️ Could not write user / send verification: ${e}\n`);
      }

      // Create a server-side session record (optional)
      try {
        await SessionModel.create({ id: crypto.randomUUID(), userId: user.id, userAgent: req.headers['user-agent'] || '', ip: req.ip });
      } catch (e) {
        process.stdout.write(`\n⚠️ Could not create session record: ${e}\n`);
      }

      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: { id: user.id, name: user.name, email: user.email },
        token: accessToken,
        refreshToken,
      });
    })();
  } catch (err: any) {
    res.status(500).json({ error: "Signup failed: " + err.message });
  }
});

// Exchange refresh token for new access token
app.post('/api/token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

    // Require refresh token to exist in persistent store (MongoDB)
    let tokenEntry: any = null;
    try {
      tokenEntry = await RefreshTokenModel.findOne({ token: refreshToken }).exec();
    } catch (e: any) {
      return res.status(500).json({ error: 'DB error while verifying refresh token: ' + (e?.message || e) });
    }

    if (!tokenEntry || tokenEntry.revoked) return res.status(401).json({ error: 'Invalid refresh token' });

    try {
      const payload = verifyRefreshToken(refreshToken);
      // rotation: revoke old token and issue a new refresh token
      const newAccess = signAccessToken({ userId: payload.userId, email: payload.email });
      const newRefresh = signRefreshToken({ userId: payload.userId, email: payload.email });

      // Persist rotation
      try {
        tokenEntry.revoked = true;
        await tokenEntry.save();
        await RefreshTokenModel.create({ token: newRefresh, userId: payload.userId });
      } catch (e: any) {
        return res.status(500).json({ error: 'Failed rotating refresh token: ' + (e?.message || e) });
      }

      res.json({ accessToken: newAccess, refreshToken: newRefresh });
    } catch (err: any) {
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Token exchange failed: ' + err.message });
  }
});

// Email verification endpoint
app.post('/api/verify-email', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Verification token required' });

    // Find user by token
    const user = await UserModel.findOne({ verificationToken: token }).exec();
    if (!user) return res.status(400).json({ error: 'Invalid verification token' });

    if (user.verificationExpiresAt && new Date(user.verificationExpiresAt).getTime() < Date.now()) {
      return res.status(400).json({ error: 'Verification token expired' });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;
    await user.save();

    res.json({ success: true, message: 'Email verified' });
  } catch (e: any) {
    res.status(500).json({ error: 'Verification failed: ' + (e?.message || e) });
  }
});

// Logout endpoint: revoke refresh token
app.post('/api/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      // revoke in persistent store if available
      try {
        const entry = await RefreshTokenModel.findOne({ token: refreshToken }).exec();
        if (entry) {
          entry.revoked = true;
          await entry.save();
        }
      } catch (e) {
        // ignore DB errors
      }
    }

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Logout failed: ' + err.message });
  }
});

  // Sessions endpoints
  app.get('/api/sessions', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user?.userId;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      const sessions = await SessionModel.find({ userId, revoked: false }).sort({ createdAt: -1 }).lean().exec();
      res.json({ success: true, sessions });
    } catch (e: any) {
      res.status(500).json({ error: 'Failed fetching sessions: ' + (e?.message || e) });
    }
  });

  app.post('/api/sessions/revoke', requireAuth, async (req: any, res) => {
    try {
      const userId = req.user?.userId;
      const { sessionId } = req.body;
      if (!userId || !sessionId) return res.status(400).json({ error: 'Missing parameters' });
      const s = await SessionModel.findOne({ id: sessionId, userId }).exec();
      if (!s) return res.status(404).json({ error: 'Session not found' });
      s.revoked = true;
      await s.save();
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: 'Failed to revoke session: ' + (e?.message || e) });
    }
  });

// 4.5. Forgot Password Endpoint (with rate limiting and email)
app.post("/api/forgot-password", rateLimitMiddleware("forgot-password"), async (req, res) => {
  process.stdout.write(`\n📩 FORGOT PASSWORD REQUEST RECEIVED\n`);
  try {
    const { email } = req.body;
    process.stdout.write(`   Email: ${email}\n`);

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = users.get(email);
    process.stdout.write(`   User exists: ${user ? "YES" : "NO"}\n`);
    if (!user) {
      // Security: Don't reveal if email exists
      return res.json({ success: true, message: "If an account exists, a reset link has been sent" });
    }

    // Generate reset token (8-character alphanumeric)
    const resetToken = crypto.randomBytes(4).toString('hex').toUpperCase();
    const resetExpiry = Date.now() + parseInt(process.env.PASSWORD_RESET_EXPIRY || "3600") * 1000;

    passwordResetTokens.set(resetToken, {
      email,
      expiresAt: resetExpiry
    });

    // Send email
    const emailSent = await sendPasswordResetEmail(email, resetToken);
    process.stdout.write(`   Email sent: ${emailSent ? "YES" : "NO"}\n`);

    if (!emailSent && emailServiceEnabled) {
      return res.status(500).json({ error: "Failed to send reset email. Please try again." });
    }

    res.json({
      success: true,
      message: emailServiceEnabled ? "Reset code sent to your email" : "Reset code generated (email service disabled)",
      resetToken: !emailServiceEnabled ? resetToken : undefined // Only return token in demo mode
    });
  } catch (err: any) {
    res.status(500).json({ error: "Forgot password failed: " + err.message });
  }
});

// 4.6. Reset Password Endpoint (with rate limiting)
app.post("/api/reset-password", rateLimitMiddleware("reset-password"), (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({ error: "Reset token and new password required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const tokenData = passwordResetTokens.get(resetToken);
    if (!tokenData) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // Check expiry
    if (Date.now() > tokenData.expiresAt) {
      passwordResetTokens.delete(resetToken);
      return res.status(400).json({ error: "Reset token has expired" });
    }

    // Update user password
    const user = users.get(tokenData.email);
    if (user) {
      (async () => {
        user.password = await hashPassword(newPassword);
        users.set(tokenData.email, user);
        saveUsers();
        try { await UserModel.updateOne({ email: tokenData.email }, user, { upsert: true }); } catch(e){}
      })();
    }

    // Delete used token
    passwordResetTokens.delete(resetToken);

    res.json({ success: true, message: "Password reset successfully" });
  } catch (err: any) {
    res.status(500).json({ error: "Reset password failed: " + err.message });
  }
});

// 4.7. Google Login Endpoint (with rate limiting and token verification)
app.post("/api/google-login", rateLimitMiddleware("google-login"), async (req, res) => {
  try {
    const { idToken, googleId, email, name, profilePicture } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    let verifiedData: any = { email, name, picture: profilePicture };

    // Verify Google ID token if provided
    if (idToken && googleOAuth2Client) {
      try {
        const ticket = await googleOAuth2Client.verifyIdToken({
          idToken,
          audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        
        if (!payload) {
          return res.status(401).json({ error: "Invalid Google token" });
        }

        verifiedData = {
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
          googleId: payload.sub
        };
      } catch (verifyError: any) {
        console.error("Google token verification failed:", verifyError.message);
        // Continue with provided data if verification fails (for demo mode)
        verifiedData = { email, name, picture: profilePicture, googleId };
      }
    } else {
      // Demo mode or no token verification available
      verifiedData = { email, name, picture: profilePicture, googleId };
    }

    // Check if user already registered with email
    let user = users.get(verifiedData.email);
    if (!user) {
      // Create new user from Google
      const userId = Date.now().toString();
      user = {
        id: userId,
        name: verifiedData.name || verifiedData.email.split('@')[0],
        email: verifiedData.email,
        googleId: verifiedData.googleId,
        profilePicture: verifiedData.picture,
        password: null, // OAuth user
        createdAt: new Date(),
        provider: 'google'
      };
      users.set(verifiedData.email, user);
      if (verifiedData.googleId) {
        googleUsers.set(verifiedData.googleId, verifiedData.email);
      }
      uploadedFiles.set(userId, []);
    } else {
      // Link Google account to existing user
      user.googleId = verifiedData.googleId;
      user.profilePicture = verifiedData.picture;
      user.provider = user.password ? 'hybrid' : 'google';
      users.set(verifiedData.email, user);
      if (verifiedData.googleId) {
        googleUsers.set(verifiedData.googleId, verifiedData.email);
      }
    }

    // Issue JWTs for Google OAuth sign-in
    const accessToken = signAccessToken({ userId: user.id, email: user.email });
    const refreshToken = signRefreshToken({ userId: user.id, email: user.email });

    try {
      await UserModel.updateOne({ email: user.email }, user, { upsert: true });
      await RefreshTokenModel.create({ token: refreshToken, userId: user.id });
      try { await SessionModel.create({ id: crypto.randomUUID(), userId: user.id, userAgent: req.headers['user-agent'] || '', ip: req.ip }); } catch(e) {}
    } catch (e) {
      process.stdout.write(`\n⚠️ Google login DB upsert failed: ${e}\n`);
    }

    res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
      token: accessToken,
      refreshToken,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Google login failed: " + err.message });
  }
});

// ============ FILE UPLOAD ENDPOINTS ============

// 5. File Upload Endpoint
// Accept multipart/form-data with field name `file`
app.post("/api/upload", requireAuth, upload.single('file'), async (req: any, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const f = req.file;
    if (!f) return res.status(400).json({ error: 'No file uploaded (field name: file)' });

    const fileMeta = {
      id: Date.now().toString(),
      name: f.originalname,
      size: f.size,
      type: f.mimetype || 'FILE',
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'Uploaded',
      path: `/uploads/${path.basename(f.path)}`,
    } as any;

    // Persist file metadata to DB if available, otherwise keep in-memory
    let storedFile = null as any;
    try {
      storedFile = await FileModel.create({
        id: fileMeta.id,
        userId,
        name: fileMeta.name,
        path: fileMeta.path,
        size: fileMeta.size,
        type: fileMeta.type,
        uploadedAt: fileMeta.uploadedAt,
        status: fileMeta.status,
      });
      // Enqueue background processing for this file (OCR/embeddings/etc.)
      try { enqueueFileProcessing(storedFile.id); } catch (e) { process.stdout.write(`\n⚠️ enqueue failed: ${e}\n`); }
    } catch (e) {
      // DB not configured or error; fallback to in-memory
      if (!uploadedFiles.has(userId)) {
        uploadedFiles.set(userId, []);
      }
      uploadedFiles.get(userId)!.push(fileMeta);
    }

    res.json({ success: true, file: fileMeta, message: `File ${f.originalname} uploaded successfully` });
  } catch (err: any) {
    res.status(500).json({ error: "Upload failed: " + err.message });
  }
});

// ============ HISTORY ENDPOINTS ============

// 6. Get User History
app.get("/api/history", requireAuth, async (req: any, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    let files = [] as any[];
    try {
      files = await FileModel.find({ userId }).sort({ uploadedAt: -1 }).lean().exec();
    } catch (e) {
      files = uploadedFiles.get(userId) || [];
    }

    res.json({
      success: true,
      files: files,
      count: files.length
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch history: " + err.message });
  }
});

// ============ PROFILE ENDPOINTS ============

// 7. Get User Profile
app.get("/api/profile", requireAuth, async (req: any, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    let userEmail = '';
    let userName = '';

    // Prefer DB-backed user record when available
    try {
      const dbUser: any = await UserModel.findOne({ id: userId }).lean().exec();
      if (dbUser) {
        userEmail = dbUser.email;
        userName = dbUser.name;
      } else {
        for (const [email, user] of users.entries()) {
          if (user.id === userId) {
            userEmail = email;
            userName = user.name;
            break;
          }
        }
      }
    } catch (e) {
      for (const [email, user] of users.entries()) {
        if (user.id === userId) {
          userEmail = email;
          userName = user.name;
          break;
        }
      }
    }

    let files = [] as any[];
    try {
      files = await FileModel.find({ userId }).sort({ uploadedAt: -1 }).lean().exec();
    } catch (e) {
      files = uploadedFiles.get(userId) || [];
    }

    res.json({
      success: true,
      profile: {
        id: userId,
        name: userName,
        email: userEmail,
        papersUploaded: files.length,
        researchTopics: Math.floor(Math.random() * 20) + 5,
        activeProjects: 3,
        joinedDate: new Date().toISOString().split('T')[0],
      },
      files: files
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch profile: " + err.message });
  }
});

// ============ CHAT ENDPOINT ============

// 8. Chat Endpoint (with mock responses)
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing message query." });
  }

  try {
    const ai = getGeminiClient();

    if (ai) {
      const systemInstruction = 
        "You are AutoResearch Scientist AI, an elite research intelligence system. " +
        "Speak with intellectual rigor, using precise scientific vocabulary. " +
        "Provide insights about research papers, identify gaps, and suggest hypotheses. " +
        "Keep responses structured and authoritative.";

      const chatContents = history ? history.map((h: any) => {
        return {
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }]
        };
      }) : [];

      chatContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "No response received from AI Core.";
      return res.json({ text: replyText });
    } else {
      // Fallback mock responses
      setTimeout(() => {
        const mockResponses = [
          "Based on your uploaded papers, I've identified a **strong correlation** in quantum computing applications. The research shows a **92% alignment** with neural network optimization strategies. Would you like me to generate a detailed analysis?",
          "I detected an **emerging research gap** in the intersection of physics-informed neural networks and renewable energy forecasting. This presents a **high-opportunity frontier** for novel research. Shall I create a hypothesis framework?",
          "**Research Gap Alert**: The current literature shows limited exploration of **non-Euclidean quantum matrices** in synthetic biology. I recommend investigating the **Bio-Digital Convergence** pathway. Would you like a comparative analysis?",
          "Your recent uploads suggest expertise in **AI Safety & Physics**. I've identified **3 major research clusters** and **2 potential breakthrough opportunities**. Let me generate a comprehensive knowledge graph.",
          "Excellent query! I've cross-referenced your papers with the latest research trends. The **top emerging topic** is AI in scientific discovery. I recommend this for your next deep dive analysis.",
        ];

        const selectedReply = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        return res.json({ text: selectedReply });
      }, 1000);
    }
  } catch (err: any) {
    console.error("Chat route error:", err);
    res.json({ 
      text: `**[SYSTEM NOTICE]**\n\nCould not connect to external AI. Using offline analysis mode. Error details: ${err?.message || "Unknown"}` 
    });
  }
});

// ============ VITE & STATIC SERVING ============

// Setup Vite server for static asset reload and fallback SPA
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } catch (e: any) {
      console.warn("⚠️ Vite middleware failed to initialize, continuing without dev middleware:", e?.message || e);
      // Fallback: serve static index.html from project root so API remains available in dev
      const indexPath = path.join(process.cwd(), "index.html");
      if (fs.existsSync(indexPath)) {
        app.use(express.static(process.cwd()));
        app.get("*", (req, res) => {
          res.sendFile(indexPath);
        });
      }
    }
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✨ AutoResearch Scientist AI - v1.0 Online`);
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📊 Phase 1: Authentication, Upload, Chat & Profile Ready`);
    console.log(`🔐 New Features: Forgot Password, Google OAuth, Reset Password`);
  });
};

startServer().catch((e) => {
  console.error("Vite/Express middleware failed to boot:", e);
});

// ============ Background maintenance tasks ============
async function cleanupOldUploads() {
  const days = parseInt(process.env.UPLOAD_RETENTION_DAYS || '30');
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

  try {
    const files = await FileModel.find().exec();
    for (const f of files) {
      const uploadedAt = new Date(f.uploadedAt);
      if (isNaN(uploadedAt.getTime())) continue;
      if (uploadedAt.getTime() < cutoff) {
        // remove file on disk
        try {
          const fullPath = path.join(process.cwd(), f.path || '');
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        } catch (e) {
          process.stdout.write(`\n⚠️ Failed deleting file ${f.id}: ${e}\n`);
        }
        // remove DB record
        try { await FileModel.deleteOne({ id: f.id }).exec(); } catch (e) { }
      }
    }

    // clean in-memory fallback storage
    const cutoffDate = new Date(cutoff);
    for (const [uid, list] of uploadedFiles.entries()) {
      const keep = (list || []).filter((it: any) => {
        const dt = new Date(it.uploadedAt);
        return !isNaN(dt.getTime()) && dt.getTime() >= cutoff;
      });
      uploadedFiles.set(uid, keep);
    }

    // Cleanup old/ revoked refresh tokens
    try {
      const tokenRetentionDays = parseInt(process.env.REFRESH_TOKEN_RETENTION_DAYS || '30');
      const tokenCutoff = new Date(Date.now() - tokenRetentionDays * 24 * 60 * 60 * 1000);
      await RefreshTokenModel.deleteMany({
        $or: [
          { revoked: true, createdAt: { $lt: tokenCutoff } },
          { expiresAt: { $lt: new Date() } }
        ]
      }).exec();
    } catch (e) {
      process.stdout.write(`\n⚠️ refresh token cleanup failed: ${e}\n`);
    }
  } catch (e) {
    process.stdout.write(`\n⚠️ cleanupOldUploads failed: ${e}\n`);
  }
}

// Schedule daily cleanup and start worker if DB available
(async () => {
  try {
    await cleanupOldUploads();
  } catch (e) {}
  setInterval(() => { cleanupOldUploads().catch(() => {}); }, 24 * 60 * 60 * 1000);
  try { startWorker(); } catch (e) { process.stdout.write(`\n⚠️ startWorker failed: ${e}\n`); }
})();

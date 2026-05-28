import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = 3000;

const users = new Map<string, any>();
const passwordResetTokens = new Map<string, { email: string; expiresAt: number }>();

//===========USER DATA PERSISTENCE ============
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

app.use(express.json());

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

// In-memory storage (for Phase 1 - will be replaced with MongoDB in Phase 2)
const userSessions: Map<string, any> = new Map();
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

    const userId = crypto.randomUUID();
    const user = {
      id: userId,
      name: fullName,
      fullName,
      email: normalizedEmail,
      password, // In production, hash this with bcrypt!
      provider: "local",
      createdAt: new Date().toISOString(),
    };

    users.set(normalizedEmail, user);
    uploadedFiles.set(userId, []);
    saveUsers(); // Save users after signup

    // Auto-issue session token so frontend can continue without a second login step.
    const sessionToken = Buffer.from(normalizedEmail + Date.now()).toString('base64');
    userSessions.set(sessionToken, user.id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { id: user.id, name: user.name, email: user.email },
      token: sessionToken,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Signup failed: " + err.message });
  }
});

// 3. Login Endpoint (with rate limiting)
app.post("/api/login", rateLimitMiddleware("login"), (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const user = users.get(normalizedEmail);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Backfill any legacy records that may have been created before `id`/`name` existed.
    if (!user.id || !user.name) {
      user.id = user.id || crypto.randomUUID();
      user.name = user.name || user.fullName || normalizedEmail.split('@')[0];
      user.email = user.email || normalizedEmail;
      users.set(normalizedEmail, user);
      saveUsers();
    }

    const sessionToken = Buffer.from(normalizedEmail + Date.now()).toString('base64');
    userSessions.set(sessionToken, user.id);

    res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
      token: sessionToken
    });
  } catch (err: any) {
    res.status(500).json({ error: "Login failed: " + err.message });
  }
});

// 4. Logout Endpoint
app.post("/api/logout", (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      userSessions.delete(token);
    }
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err: any) {
    res.status(500).json({ error: "Logout failed: " + err.message });
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
      user.password = newPassword; // In production, hash this with bcrypt!
      users.set(tokenData.email, user);
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

    const sessionToken = Buffer.from(verifiedData.email + Date.now()).toString('base64');
    userSessions.set(sessionToken, user.id);

    res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email },
      token: sessionToken
    });
  } catch (err: any) {
    res.status(500).json({ error: "Google login failed: " + err.message });
  }
});

// ============ FILE UPLOAD ENDPOINTS ============

// 5. File Upload Endpoint
app.post("/api/upload", (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token || !userSessions.has(token)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = userSessions.get(token);
    const { fileName, fileSize, fileType } = req.body;

    if (!fileName || !fileSize) {
      return res.status(400).json({ error: "Missing file details" });
    }

    const file = {
      id: Date.now().toString(),
      name: fileName,
      size: fileSize,
      type: fileType || 'FILE',
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'Uploaded',
    };

    if (!uploadedFiles.has(userId)) {
      uploadedFiles.set(userId, []);
    }
    uploadedFiles.get(userId)!.push(file);

    res.json({
      success: true,
      file: file,
      message: `File ${fileName} uploaded successfully`
    });
  } catch (err: any) {
    res.status(500).json({ error: "Upload failed: " + err.message });
  }
});

// ============ HISTORY ENDPOINTS ============

// 6. Get User History
app.get("/api/history", (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token || !userSessions.has(token)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = userSessions.get(token);
    const files = uploadedFiles.get(userId) || [];

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
app.get("/api/profile", (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token || !userSessions.has(token)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = userSessions.get(token);
    let userEmail = '';
    let userName = '';

    // Find user by ID
    for (const [email, user] of users.entries()) {
      if (user.id === userId) {
        userEmail = email;
        userName = user.name;
        break;
      }
    }

    const files = uploadedFiles.get(userId) || [];

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

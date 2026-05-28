# AutoResearch Project Documentation

Comprehensive, professional reference for developers and collaborators. This document summarizes the system, how to set up and run it, the available APIs, and the current feature set. Keep this file high-level and update it for major architectural or operational changes only.

---

## Project Overview

AutoResearch is an AI-powered research assistant platform that helps researchers upload and organize papers, chat with an AI assistant for analysis, visualize research landscapes, and manage profiles and history. The frontend is a React SPA and the backend is an Express server with TypeScript.

Current focus: backend integration and security hardening following frontend stabilization.

---

## Tech Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS
- Backend: Node.js (v24+), Express, tsx for development runtime
- AI: Google Gemini (@google/genai) integration (optional; demo mode available)
- Auth: Google OAuth (client + server verification), email/password local auth (demo)
- Email: nodemailer (Gmail demo); can be switched to SendGrid/Resend
- Persistence: In-memory Maps + users.json (development); MongoDB planned for production

---

## System Requirements

- Node.js: v24.16.0+ (minimum v20.19.0)
- npm: 10.8.0+
- Recommended: VS Code, Prettier, TypeScript tooling

---

## Quick Start

1. Install dependencies

   Windows (PowerShell):
   ```powershell
   npm.cmd install
   ```

   macOS/Linux:
   ```bash
   npm install
   ```

2. Create environment files from `.env.example` and fill required keys for production (optional for demo).

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open the app at:

   ```
   http://localhost:3000
   ```

---

## Environment Configuration

See `.env.example` for all supported environment variables. Important variables include `GEMINI_API_KEY`, `GMAIL_EMAIL`, `GMAIL_APP_PASSWORD`, and `GOOGLE_CLIENT_ID`. By default, empty keys enable demo mode (no external API calls).

Security note: Never commit `.env` or `.env.local` to source control. They are included in `.gitignore`.

---

## Project Structure (High Level)

```
Autoresearch-ai/
├─ src/
│  ├─ components/      # React pages and UI primitives
│  ├─ App.tsx           # App routing and central state
│  ├─ main.tsx          # App entry (GoogleOAuthProvider)
│  └─ index.css         # Tailwind + custom styles
├─ server.ts            # Express backend (APIs, auth, email)
├─ users.json           # Local user store (development)
├─ .env.example         # Reference env vars
├─ package.json
└─ README.md
```

---

## How It Works (Summary)

- Frontend: SPA that renders authenticated and unauthenticated pages. Uses local state (App.tsx) and localStorage for demo session persistence.
- Backend: Express server exposes REST endpoints for auth, uploads, chat, and profile. Uses in-memory Maps and writes `users.json` for simple persistence.
- AI: If `GEMINI_API_KEY` is set, server will call Gemini for chat responses; otherwise it returns demo responses.
- Email: Reset emails are sent via nodemailer when SMTP credentials are configured; otherwise the server logs tokens in demo mode.

---

## API Reference (Canonical)

Authentication
- POST `/api/signup` — Create new user. Body: `{ fullName, email, password }`.
- POST `/api/login` — Login with email/password. Body: `{ email, password }`.
- POST `/api/google-login` — Login with Google ID token. Body: `{ idToken }`.
- POST `/api/logout` — Invalidate session (demo behavior).

Password Reset
- POST `/api/forgot-password` — Request reset; returns demo token or sends email.
- POST `/api/reset-password` — Reset password using token.

Content
- POST `/api/upload` — Register an uploaded file (demo stores metadata).
- GET `/api/history` — Returns user's upload history.
- GET `/api/profile` — Returns profile info for authenticated user.
- POST `/api/chat` — Send message + history to AI assistant.

Error handling: The server returns standard HTTP status codes and JSON `{ success: boolean, message?: string, ... }`.

---

## Features (Current)

- Complete frontend UI: authentication pages, dashboard, upload, chat, profile, history, and several placeholder modules for future features.
- Backend skeleton: authentication endpoints, upload/history endpoints, password reset flow, Google OAuth verification, demo-mode fallbacks for AI and email.
- Demo mode: safe defaults that log sensitive actions instead of performing them when env keys are not provided.

---

## Planned & Next Steps (Short Term)

1. Backend security hardening: password hashing (bcrypt), JWT-based sessions, and input validation.
2. Migrate persistence to MongoDB for production readiness.
3. Integrate production email provider (SendGrid/Resend) if required.
4. Replace demo mocks with real AI integration (Gemini) when API key available.

---

## Development Guide (Concise)

- Run dev: `npm run dev`  
- Build production bundle: `npm run build`  
- Run server (prod): configure `.env` and start via `node dist/server.js` or preferred process manager.

When making changes: update `IMPLEMENTATION_SUMMARY.md` and `PHASE1_GUIDE.md` for feature-level notes. Keep `PROJECT_DOCS.md` concise and professional — reserve deep technical notes, debugging transcripts, and issue lists for separate developer notes or `docs/` entries.

---

## Where to Document Issues

Operational details, debugging logs, or in-progress TODOs should go into:
- `IMPLEMENTATION_SUMMARY.md` (feature-level notes)
- `PHASE1_GUIDE.md` (setup and phase-specific instructions)
- `docs/` (if you add a docs folder for developer-level investigations)

`PROJECT_DOCS.md` is the public-facing, professional summary for contributors and stakeholders.

---

Last updated: 2026-05-28

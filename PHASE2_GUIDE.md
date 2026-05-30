Phase 2 Backend Guide
======================

Top: Complete Phase 2 Task Checklist

The following is a comprehensive checklist of Phase 2 backend tasks discussed in the chat. Place this at the top so collaborators (and Copilot) can immediately see remaining work and what's done.

- Authentication & Identity
  - [x] Replace legacy base64/session tokens with JWT access + refresh tokens
  - [x] Migrate plaintext passwords to bcrypt and enforce hashing on signup/login
  - [x] Implement refresh token rotation, revocation, and DB persistence
  - [x] Add access token verification middleware (`requireAuth`)
  - [x] Add email verification flow (token send + verify endpoint)
  - [x] Add password reset flow (forgot/reset) with demo and real email support

- Persistence & Data Models
  - [x] Add MongoDB connection (`connectDB`) and `UserModel`
  - [x] Add `RefreshTokenModel` with `revoked` and expiry support
  - [x] Add `FileModel` to persist uploaded file metadata
  - [x] Add `SessionModel` for server-side session records
  - [x] Provide fallback file-backed mode (`users.json`) when DB not configured

- File Uploads & Processing
  - [x] Accept multipart uploads with `multer` and store in `uploads/`
  - [x] Persist file metadata and serve `/uploads` statically
  - [x] Enqueue uploaded files for asynchronous processing
  - [x] Add background worker scaffold to poll DB and process files

- Token & Session Lifecycle
  - [x] Enforce DB-only refresh token validation (remove in-memory fallbacks)
  - [x] Implement `/api/token` refresh exchange with rotation
  - [x] Implement `/api/logout` to revoke refresh token
  - [x] Add background cleanup job to remove revoked/expired refresh tokens
  - [x] Add endpoints to list and revoke sessions (`/api/sessions`, `/api/sessions/revoke`)

- Processing Pipeline & Retrieval
  - [ ] Integrate OCR/PDF parsing (Tesseract / PyMuPDF / external tool)
  - [ ] Extract text, chunk it, and compute embeddings
  - [ ] Store embeddings in a vector DB or indexed store for retrieval
  - [ ] Implement RAG (retrieval-augmented generation) for chat and search

- LLM Integration
  - [ ] Add LLM client wrapper (support for Google Gemini / OpenAI / other)
  - [ ] Support streaming LLM responses to the frontend
  - [ ] Add system instruction and temperature controls for experiments

- Infrastructure & Scale (optional / when ready)
  - [ ] Add Redis for session storage, job queue (BullMQ / Bee-Queue / BullMQ), and rate limiting
  - [ ] Add S3 (or similar) for persistent object storage of uploads
  - [ ] Implement virus scanning and file validation before processing
  - [ ] Add worker autoscaling and concurrency controls

- Security, Observability & Ops
  - [ ] Harden rate limiting, IP protections and abuse monitoring
  - [ ] Add MFA, RBAC, and stronger password rules for production
  - [ ] Configure logging, metrics, tracing, and alerts (Prometheus/Grafana/Datadog)
  - [ ] Add CI/CD checks, test suites, and pre-deploy verifications

- Frontend / UX integration
  - [ ] Update `src/utils/api.ts` to implement automatic token refresh + retry logic
  - [ ] Add verified-email onboarding flow and session management UI
  - [ ] Show upload processing status (Queued, Processing, Processed) in History/Dashboard

---

Detailed work completed so far (backend)
---------------------------------------

Purpose: This document explains what has been implemented in Phase 2 so far, where to find the code, how it works, and how to continue work. It's written for a developer (or Copilot) who will inspect the repo on another machine.

File locations and major artifacts (paths relative to repo root):

- `server.ts` — main Express server (TypeScript). Key responsibilities implemented:
  - Loads `dotenv` and tries connecting to MongoDB via `connectDB()` (from `backend/db.ts`).
  - Provides auth endpoints: `/api/signup`, `/api/login`, `/api/google-login`, `/api/token`, `/api/logout`, `/api/forgot-password`, `/api/reset-password`, `/api/verify-email`.
  - Upload endpoints: `/api/upload` (multipart `multer`), `/api/history`, `/api/profile`, `/api/chat` (mock + Gemini fallback).
  - Background tasks startup: schedules daily cleanup and starts `backend/worker`.
  - Implements rate-limiting middleware `rateLimitMiddleware(endpoint)`.

- `backend/db.ts` — Mongoose connection and schemas:
  - Exports `connectDB()` which reads `MONGODB_URI` and `MONGODB_DB` from `.env`.
  - `UserSchema` / `UserModel` with fields: `id`, `name`, `fullName`, `email`, `password`, `verified`, `verificationToken`, `verificationExpiresAt`, `provider`, `createdAt`.
  - `RefreshTokenSchema` / `RefreshTokenModel` with fields: `token`, `userId`, `createdAt`, `expiresAt`, `revoked`.
  - `FileSchema` / `FileModel` with file metadata: `id`, `userId`, `name`, `path`, `size`, `type`, `uploadedAt`, `status`.
  - `SessionSchema` / `SessionModel` for server-side session records: `id`, `userId`, `userAgent`, `ip`, `createdAt`, `revoked`.

- `backend/auth.ts` — auth helpers (hashing and JWT handling).
  - Exports functions: `hashPassword(password)`, `comparePassword(plain, hash)`, `signAccessToken(payload)`, `signRefreshToken(payload)`, `verifyRefreshToken(token)`.
  - Uses `bcryptjs` and `jsonwebtoken` with secrets from `.env` (`JWT_SECRET`, `REFRESH_TOKEN_SECRET`).

- `backend/authMiddleware.ts` — `requireAuth` middleware.
  - Verifies access token (JWT) from `Authorization: Bearer <token>` header and attaches `req.user` with `userId` and `email`.

- `backend/migrate_users.ts` — one-off migration script.
  - Reads local `users.json`, hashes plaintext passwords, and upserts records into `UserModel`.
  - Command added to `package.json`: `npm run migrate:users`.

- `backend/worker.ts` — lightweight background worker scaffold.
  - Exports `enqueueFileProcessing(fileId)` that marks the DB record `status: 'Queued'`.
  - Exports `startWorker()` that polls the DB, picks queued files, marks them `Processing`, simulates processing (placeholder), then marks `Processed`.

- `uploads/` — directory created to store uploaded files when DB or S3 not configured.

What each endpoint does (summary):

- `POST /api/signup`:
  - Validates input, hashes password, creates a user object with `verified: false` and `verificationToken`.
  - Persists user to `UserModel` (if DB available).
  - Issues JWT access token and a refresh token (persisted to `RefreshTokenModel`).
  - Sends verification email (demo mode prints token to stdout if Gmail not configured).
  - Creates a `SessionModel` record for this signup.

- `POST /api/login`:
  - Validates credentials, prefers DB `UserModel` but falls back to `users.json` map.
  - Uses `comparePassword()` (bcrypt) to verify password.
  - Issues JWT access token (`token`) and refresh token (persisted in `RefreshTokenModel`).
  - Creates a `SessionModel` record.

- `POST /api/google-login`:
  - Verifies Google ID token if available; otherwise uses provided payload for demo.
  - Creates / upserts user and issues JWT access + refresh tokens and persists refresh token.
  - Creates a `SessionModel` record.

- `POST /api/token`:
  - Accepts `refreshToken` and requires it to be present in `RefreshTokenModel` (DB-only).
  - Verifies token signature with `verifyRefreshToken()`.
  - Revokes the old token (set `revoked=true`) and creates a new refresh token record.
  - Returns a new access token and new refresh token.

- `POST /api/logout`:
  - Accepts `refreshToken` and sets `revoked=true` in `RefreshTokenModel`.

- `POST /api/upload`:
  - `requireAuth` middleware required (valid JWT access token).
  - Accepts multipart `file` via `multer`, stores file under `uploads/`.
  - Persists file metadata to `FileModel` and calls `enqueueFileProcessing(fileId)`.
  - If DB not available, falls back to in-memory `uploadedFiles` map.

- `GET /api/history` and `GET /api/profile`:
  - Read files via `FileModel.find({ userId })` or fallback to in-memory store.
  - `profile` endpoint prefers DB user record (reads `UserModel` by `id`).

- `POST /api/forgot-password` and `POST /api/reset-password`:
  - Basic reset-code generation stored in a runtime map (demo mode) and email sending via Gmail when configured.

- `POST /api/verify-email`:
  - Accepts `token`, finds user by `verificationToken`, validates expiry, and marks user `verified=true`.

Admin/maintenance automation added:

- Daily cleanup job (scheduled at server start) that:
  - Deletes files older than `UPLOAD_RETENTION_DAYS` (default 30) from disk and DB.
  - Cleans fallback in-memory uploadedFiles map.
  - Deletes revoked or expired refresh tokens older than `REFRESH_TOKEN_RETENTION_DAYS` (default 30).

Notes on fallback/demo behavior
------------------------------
- If `MONGODB_URI` is not set, the server prints a warning and runs in file-backed demo mode using `users.json` and in-memory maps for uploaded files.
- Email sending requires `GMAIL_EMAIL` and `GMAIL_APP_PASSWORD`. If not present, verification and reset tokens are printed to stdout for demo flows.
- The code avoids `import.meta.url` to remain compatible when bundling to CommonJS.

Environment variables (important)
---------------------------------
- `MONGODB_URI` — MongoDB connection string (e.g. `mongodb://localhost:27017`).
- `MONGODB_DB` — optional DB name (default from URI).
- `JWT_SECRET` — secret for signing access tokens.
- `REFRESH_TOKEN_SECRET` — secret for signing refresh tokens.
- `GMAIL_EMAIL` and `GMAIL_APP_PASSWORD` — for sending emails (verification / reset).
- `APP_URL` — used to construct email links (e.g. `http://localhost:3000`).
- `UPLOAD_RETENTION_DAYS`, `REFRESH_TOKEN_RETENTION_DAYS`, `PASSWORD_RESET_EXPIRY` — numeric retention/expiry days/seconds.
- `GEMINI_API_KEY` — optional external LLM key for chat.

Developer commands
------------------

- Install dependencies:

```bash
npm install
```

- Type-check the codebase:

```bash
npm run lint
# runs: tsc --noEmit
```

- Migrate users (one-off migration from `users.json` to MongoDB):

```bash
npm run migrate:users
```

- Run dev server:

```bash
npm run dev
# or node/ts-node/tsx start script depending on package.json
```

Where to look when debugging
----------------------------
- Start with `server.ts` for request routing and top-level orchestration.
- `backend/db.ts` for Mongoose connection and schema definitions; Copilot can search by schema names (UserModel, RefreshTokenModel, FileModel, SessionModel).
- `backend/auth.ts` for JWT and password helpers (hash/compare/sign/verify).
- `backend/worker.ts` to understand the polling loop and where to plug OCR/embedding logic (`enqueueFileProcessing` and `startWorker`).

Suggested next tasks (for whoever picks up work)
------------------------------------------------
- Wire `backend/worker.ts` to a real OCR and embedding pipeline (Tesseract, PyMuPDF, LangChain + OpenAI embeddings, or Google Vertex embeddings). Add rate-limiting and concurrency controls.
- Add S3 (or other object store) support and move file storage off local disk.
- Add Redis and use it for session storage and a proper job queue (BullMQ or Bee-Queue) for the worker.
- Improve token expiry semantics: set `expiresAt` on refresh tokens and run stricter rotation.
- Update frontend `src/utils/api.ts` to automatically call `/api/token` when access token expires and retry requests.
- Add tests and CI to validate login/signup flows and file processing.

Quick notes for Copilot analysis on another laptop
-------------------------------------------------
- Copilot (or any code-search tool) should scan for:
  - `UserModel`, `RefreshTokenModel`, `FileModel`, `SessionModel` in `backend/db.ts`.
  - `signAccessToken`, `signRefreshToken`, `verifyRefreshToken`, `hashPassword`, `comparePassword` in `backend/auth.ts`.
  - `requireAuth` in `backend/authMiddleware.ts` — used by protected endpoints.
  - Endpoint handlers in `server.ts`: search for `app.post('/api/signup'`, `app.post('/api/login'`, `app.post('/api/token'`, `app.post('/api/upload'` etc.
- The code intentionally supports a demo-file-backed mode when `MONGODB_URI` is missing; Copilot should surface all fallback branches (look for `try/catch` blocks that `/* ignore */` DB errors and the `users` Map usage).

Contact & Handoff
-----------------
- If you push this repo to a remote and your teammate runs it, they should set `MONGODB_URI` and `JWT_SECRET` before running `npm run migrate:users`.
- For email flows, provide `GMAIL_EMAIL` and `GMAIL_APP_PASSWORD` or keep demo mode (tokens printed to stdout).

End of guide.

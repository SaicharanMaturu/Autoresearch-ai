# Developer Notes — AutoResearch (Internal)

Purpose: internal developer notes for continued implementation, debugging, and deployment.

Status (May 28, 2026)
- Frontend: SPA with React + Vite, Tailwind. Routing migrated to `react-router-dom`. ErrorBoundary and protected routes in place.
- Backend: single-file `server.ts` Express demo server with in-memory `users` and `userSessions` maps. Auth endpoints (`/api/signup`, `/api/login`, `/api/google-login`, `/api/profile`) implemented but using base64 session tokens and plaintext passwords — TODO: migrate to JWT + bcrypt.

Quick start (dev)
- Install:

  ```bash
  npm install
  ```

- Start dev server (frontend + backend):

  ```bash
  # in repo root
  npm run dev
  # or run the backend separately if needed
  node server.ts
  ```

Key files (where to change things)
- Frontend
  - `src/App.tsx` — routing, protected route wrapper, initial profile fetch.
  - `src/utils/api.ts` — `apiFetch()` helper that attaches `Authorization` header and handles 401s.
  - `src/components/LoginPage.tsx`, `src/components/SignupPage.tsx` — auth form validation, token-only storage now.
  - `src/components/*` — other pages (ResearchUpload, ResearchChat, HistoryPage) currently use local/mock data. Convert to API-backed using `apiFetch`.

- Backend
  - `server.ts` — Express routes and in-memory stores, rate limiter, email helpers. Replace session handling here during JWT migration.

Environment / secrets
- Add these env vars (recommended):
  - `JWT_SECRET` — secret for signing JWTs (strong random string).
  - `NODE_ENV` — `development` or `production`.
  - `PORT` — server port (default used in `server.ts`).
  - `EMAIL_SMTP_*` — nodemailer SMTP credentials if using real email sending.

Planned migrations / high-priority tasks
1. Migrate sessions to JWTs (server-side)
   - Replace base64 token generation and `userSessions` map with JWT issuance on login/signup.
   - Use `bcrypt` for password hashing when storing passwords (`npm install bcrypt` or `bcryptjs` for pure JS).
   - Add middleware that verifies `Authorization: Bearer <token>` and sets `req.userId`.
   - Update `/api/profile` to read user id from JWT payload rather than `userSessions`.

2. Secure storage & client behavior
   - Client should continue storing only `token` in `localStorage` but consider `httpOnly` cookies for increased security in production.
   - Add token refresh flow (refresh token rotation) if long-lived sessions are required.

3. API hardening & validation
   - Add input validation on server with `express-validator` or `zod`.
   - Sanitize file uploads and enforce size/type limits on `/api/upload`.

4. Persistence & scaling
   - Replace in-memory `users` / `userSessions` with a real DB (Postgres, MongoDB). Migrate `users.json` data into DB.
   - Replace rate limiting memory map with Redis for distributed rate-limits.

5. E2E & unit tests
   - Add Jest + React Testing Library for frontend unit tests.
   - Add supertest + Jest for backend route tests.

Developer workflows & tips
- When changing auth flow, update both client `src/utils/api.ts` and server `server.ts`.
- To run server-only during frontend dev, use `node server.ts` or `ts-node` if preferred.
- To avoid accidentally committing local artifacts, update `.gitignore` to include `users.json`, `.env`, `node_modules/`, and Vite build outputs. (Check current `.gitignore` and append as needed.)

Short-term action items (next)
- Convert `ResearchUpload` to call `/api/upload` with `apiFetch` + `FormData` (include token header). — helpful for end-to-end testing.
- Implement server JWT issuance and update `/api/login`, `/api/signup`, `/api/google-login`.
- Update remaining pages to use `apiFetch` where network behavior is needed.

Contact / ownership
- Repo owner: primary maintainer — follow commit conventions and open PRs for backend-sensitive changes.

Appendix: API endpoints (current)
- `POST /api/signup` — body: { fullName, email, password } -> returns { success, token?, user? }
- `POST /api/login` — body: { email, password } -> returns { success, token, user }
- `POST /api/google-login` — body: { token } -> returns { success, token, user }
- `GET /api/profile` — headers: `Authorization: Bearer <token>` -> returns { profile }
- `POST /api/upload` — file uploads (demo) — server handles in-memory for now
- `GET /api/history` — returns user history (demo)

---

Created by internal tooling on May 28, 2026.

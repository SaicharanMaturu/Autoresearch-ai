# Google OAuth Setup Guide

## Quick Start (5 minutes)

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" at the top
3. Click "NEW PROJECT"
4. Enter name: `AutoResearch-Dev` (or your preferred name)
5. Click "CREATE"
6. Wait for project to be created (1-2 minutes)

### Step 2: Enable Google+ API
1. In the Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click "Google+ API"
4. Click "ENABLE"

### Step 3: Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "CREATE CREDENTIALS" → "OAuth client ID"
3. Choose "Web application"
4. Configure the following:
   - **Name**: `AutoResearch Local Dev`
   - **Authorized JavaScript origins**: Add `http://localhost:3000`
   - **Authorized redirect URIs**: Add `http://localhost:3000/api/google-callback`
5. Click "CREATE"

### Step 4: Copy Your Credentials
1. Your OAuth 2.0 Client ID will be displayed (looks like: `xxxxxx.apps.googleusercontent.com`)
2. Keep this page open, you need two values:
   - **Client ID** (shown in the popup)
   - **Client Secret** (click to reveal)

### Step 5: Update Environment Files

**In `.env.local` (Frontend):**
```bash
VITE_GOOGLE_CLIENT_ID="your_client_id_here.apps.googleusercontent.com"
```

**In `.env` (Backend):**
```bash
GOOGLE_CLIENT_ID="your_client_id_here.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_client_secret_here"
```

### Step 6: Restart Development Server
```bash
npm run dev
```

The Google Sign-In button should now work!

---

## Troubleshooting

### Error: "OAuth client was not found"
- **Cause**: Client ID is not configured or is incorrect
- **Fix**: Double-check `.env.local` has the correct `VITE_GOOGLE_CLIENT_ID`

### Error: "redirect_uri_mismatch"
- **Cause**: Redirect URI in Google Console doesn't match
- **Fix**: Make sure `http://localhost:3000/api/google-callback` is added in Google Console Credentials

### Error: "access_denied"
- **Cause**: User denied permission or credentials expired
- **Fix**: Clear cookies for localhost:3000 and try again

### Button shows "Setup Required" message
- **Cause**: `.env.local` still has placeholder values
- **Fix**: Replace `YOUR_GOOGLE_CLIENT_ID` with actual Client ID from Google Console

---

## Security Notes

- **Never commit `.env` files** - Add to `.gitignore`
- **Client Secret should be secret** - Only use in backend (server.ts), never in frontend
- **Redirect URIs must match exactly** - Include protocol and port

---

## For Production Deployment

When deploying to production:

1. Create a new OAuth app in Google Console for production
2. Use production domain instead of `localhost:3000`
3. Add production redirect URI: `https://yourdomain.com/api/google-callback`
4. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in production environment variables
5. Update `.env.local` with production `VITE_GOOGLE_CLIENT_ID`

---

## Testing

After setup, you should be able to:
1. Click "Sign in with Google" button
2. Authenticate with your Google account
3. Get redirected to dashboard
4. Session token stored in localStorage

✅ All done!

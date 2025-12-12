# Google OAuth Setup Guide

## Prerequisites

Before you can use Google Sign-In, you need to set up OAuth credentials from Google Cloud Console.

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter project name: "Nana Daily" (or your preferred name)
5. Click "Create"

## Step 2: Enable Google+ API

1. In your project,  go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in app name: "Nana Daily"
   - Add your email as support email
   - Click "Save and Continue"
   - Skip scopes (click "Save and Continue")
   - Add test users if needed (your email)
   - Click "Save and Continue"

4. Back to Create OAuth client ID:
   - Application type: "Web application"
   - Name: "Nana Daily Web Client"
   - Authorized redirect URIs:
     - Add: `http://localhost:3000/api/auth/callback/google`
     - For production, add your production URL too
   - Click "Create"

5. Copy the **Client ID** and **Client Secret** (you'll need these!)

## Step 4: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Fill in the values:

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
NEXTAUTH_SECRET=generate-a-random-secret
NEXTAUTH_URL=http://localhost:3000
```

### Generate NEXTAUTH_SECRET

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Or use an online generator and paste the result.

## Step 5: Restart Development Server

1. Stop the current dev server (Ctrl+C)
2. Restart it:
```bash
npm run dev
```

## Step 6: Test Google Sign-In

1. Open `http://localhost:3000`
2. Click "Get Started"
3. Click "Sign in with Google"
4. You should be redirected to Google's login page
5. Login with your Google account
6. You'll be redirected back to the dashboard!

## Troubleshooting

### "Redirect URI mismatch" error
- Make sure you added `http://localhost:3000/api/auth/callback/google` exactly in Google Cloud Console
- Check that NEXTAUTH_URL in `.env.local` is `http://localhost:3000` (no trailing slash)

### "Access blocked" or "This app hasn't been verified"
- During development, you can click "Continue" (as a test user)
- For production, you'll need to verify your app with Google

### Google button does nothing
- Check browser console for errors
- Make sure `.env.local` has all required variables filled
- Restart the dev server after changing environment variables

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add production URL to Google Cloud Console authorized redirect URIs:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```

2. Set environment variables in your hosting platform:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)

3. Consider verifying your app with Google for production use

## Demo Login

If you don't want to set up Google OAuth, you can still use the "Demo Login" button which works without any configuration!

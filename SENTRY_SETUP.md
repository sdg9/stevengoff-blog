# Sentry Setup Guide

This guide walks you through setting up Sentry error tracking for the Murren Properties application.

## ✅ Already Completed

The following has been pre-configured:

- ✓ `@sentry/astro` package installed
- ✓ Sentry integration added to `astro.config.ts`
- ✓ Client config created (`sentry.client.config.js`)
- ✓ Server config created (`sentry.server.config.js`)
- ✓ Scheduled worker updated with Sentry error logging
- ✓ DSN configured in config files

## 🔧 Setup Steps

### 1. Generate Sentry Auth Token

The auth token is used to upload source maps during builds for better error stack traces.

1. Go to: https://sentry.io/settings/account/api/auth-tokens/
2. Click **"Create New Token"**
3. Give it a name: `Murren Properties - CI/CD`
4. Select these scopes:
   - `project:releases`
   - `project:write`
   - `org:read`
5. Click **"Create Token"**
6. Copy the token (you won't see it again!)

### 2. Add Environment Variables

#### Local Development (.env)

Create/update your `.env` file:

```bash
# Sentry DSN (already configured)
SENTRY_DSN=https://196ee5bd6859e424ffccb90fcde71fb3@o4510112500285440.ingest.us.sentry.io/4510112501661696

# Sentry Auth Token (from step 1)
SENTRY_AUTH_TOKEN=sntrys_YOUR_TOKEN_HERE

# Environment identifier
ENVIRONMENT=development
```

#### Cloudflare Pages (Production)

Add these environment variables in the Cloudflare Pages dashboard:

1. Go to: https://dash.cloudflare.com → Your Pages project → Settings → Environment variables

2. Add **Production** variables:
   ```
   SENTRY_DSN=https://196ee5bd6859e424ffccb90fcde71fb3@o4510112500285440.ingest.us.sentry.io/4510112501661696
   SENTRY_AUTH_TOKEN=<your-token-from-step-1>
   ENVIRONMENT=production
   ```

3. Add **Preview** variables (same as production but with different environment):
   ```
   SENTRY_DSN=https://196ee5bd6859e424ffccb90fcde71fb3@o4510112500285440.ingest.us.sentry.io/4510112501661696
   SENTRY_AUTH_TOKEN=<your-token-from-step-1>
   ENVIRONMENT=preview
   ```

#### GitHub Secrets (for Actions)

1. Go to: Repository → Settings → Secrets and variables → Actions
2. Add repository secret:
   ```
   Name: SENTRY_AUTH_TOKEN
   Value: <your-token-from-step-1>
   ```

### 3. Test Sentry Integration

#### Test in Browser

1. Start dev server: `pnpm dev`
2. Visit: http://localhost:4321/test-sentry
3. Click **"Throw Test Error"** button
4. Go to Sentry dashboard: https://sentry.io/organizations/web-town-hero-llc/projects/javascript-astro/
5. Verify the error appears within ~30 seconds
6. **Delete `src/pages/test-sentry.astro` after successful test**

#### Test Scheduled Worker

The scheduled worker will automatically log errors to Sentry when sync failures occur.

To manually test:
```bash
# Set env vars in .env first
pnpm sync-properties
```

If sync fails, check Sentry for the error event.

### 4. Configure Alerts (Optional)

Set up email/Slack alerts for errors:

1. Go to: https://sentry.io/organizations/web-town-hero-llc/projects/javascript-astro/alerts/
2. Click **"Create Alert Rule"**
3. Configure based on your preferences

## 📊 Monitoring

### Sentry Dashboard

Access your project dashboard:
https://sentry.io/organizations/web-town-hero-llc/projects/javascript-astro/

### Key Features

- **Error Tracking**: All uncaught errors from client and server
- **Performance Monitoring**: Response times and transaction tracking
- **Source Maps**: Uploaded automatically during builds for readable stack traces
- **Environment Separation**: Errors tagged by environment (development/preview/production)
- **Worker Errors**: Property sync failures logged with context (property count, duration, etc.)

## 🎯 What Gets Tracked

### Client-Side (Browser)
- Uncaught JavaScript errors
- Unhandled promise rejections
- Network errors
- Custom error boundaries in React components

### Server-Side (Astro SSR)
- API endpoint errors
- Server-side rendering errors
- Database/KV operation failures

### Workers (Cloudflare Functions)
- Property sync failures
- OwnerRez API errors
- KV write failures
- Rate limit violations

## 🔧 Configuration

### Sample Rates

Current configuration (in `sentry.*.config.js`):

```javascript
tracesSampleRate: 1.0  // 100% of transactions (good for development)
profilesSampleRate: 1.0  // 100% profiling
```

**For production**, consider lowering these to reduce costs:
```javascript
tracesSampleRate: 0.1  // 10% of transactions
profilesSampleRate: 0.1  // 10% profiling
```

### Environment Detection

Errors are automatically tagged with the environment:
- `development` - local dev server
- `preview` - Cloudflare Pages preview deployments
- `production` - production deployment

## 🗑️ Cleanup

After confirming Sentry works:

1. Delete test page: `src/pages/test-sentry.astro`
2. Delete this guide (optional): `SENTRY_SETUP.md`

## 📚 Resources

- [Sentry Astro Docs](https://docs.sentry.io/platforms/javascript/guides/astro/)
- [Sentry Dashboard](https://sentry.io/organizations/web-town-hero-llc/)
- [Source Maps Guide](https://docs.sentry.io/platforms/javascript/sourcemaps/)

## 🐛 Troubleshooting

### Errors not appearing in Sentry

1. **Check DSN**: Ensure `SENTRY_DSN` is set correctly
2. **Check network**: Open browser DevTools → Network tab, look for requests to `sentry.io`
3. **Check console**: Look for Sentry init errors in browser console
4. **Verify integration**: Ensure Sentry is in `astro.config.ts` integrations array

### Source maps not uploaded

1. **Check auth token**: Ensure `SENTRY_AUTH_TOKEN` is set during build
2. **Check build logs**: Look for "Sentry" or "source maps" in build output
3. **Verify permissions**: Auth token needs `project:releases` and `project:write` scopes

### Worker errors not appearing

1. **Check env vars**: Ensure `SENTRY_DSN` is set in Cloudflare Pages
2. **Check logs**: Use `wrangler tail` to see worker logs
3. **Test manually**: Trigger sync with `pnpm sync-properties` and verify console output

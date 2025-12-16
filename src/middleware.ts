import type { MiddlewareHandler } from 'astro';

/**
 * Geo-location Middleware for Cookie Consent
 *
 * This middleware detects if a user is in the EU/UK/Switzerland and sets a
 * `needs_consent` flag for GDPR compliance. The cookie banner will only show
 * to users in these regions when `useCookieConsent: 'eu-only'` is configured.
 *
 * ## REQUIREMENTS
 *
 * This middleware requires Cloudflare Pages/Workers with SSR to function:
 *
 * 1. **Enable SSR in astro.config.ts:**
 *    ```ts
 *    import cloudflare from '@astrojs/cloudflare';
 *
 *    export default defineConfig({
 *      output: 'server',  // or 'hybrid' for selective SSR
 *      adapter: cloudflare(),
 *      // ... rest of config
 *    });
 *    ```
 *
 * 2. **Install the Cloudflare adapter:**
 *    ```bash
 *    pnpm add @astrojs/cloudflare
 *    ```
 *
 * 3. **Deploy to Cloudflare Pages**
 *
 * ## FALLBACK FOR STATIC SITES
 *
 * If you're using `output: 'static'` or deploying to Netlify/Vercel:
 * - This middleware will NOT work (no access to Cloudflare's geo-location)
 * - Set `useCookieConsent: true` in config.yaml to show the banner to ALL users
 * - You can safely delete this middleware file for static deployments
 *
 * @see https://docs.astro.build/en/guides/integrations-guide/cloudflare/
 */

export const onRequest: MiddlewareHandler = async (context, next) => {
  const pathname = new URL(context.request.url).pathname;

  // Skip middleware for static assets and API endpoints that have immutable headers
  const skipPaths = ['/_image', '/_astro'];

  const staticExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
    '.svg',
    '.ico',
    '.woff',
    '.woff2',
    '.ttf',
    '.eot',
    '.css',
    '.js',
    '.json',
    '.xml',
  ];

  const shouldSkip =
    skipPaths.some((path) => pathname.startsWith(path)) || staticExtensions.some((ext) => pathname.endsWith(ext));

  if (shouldSkip) {
    return next();
  }

  // Access Cloudflare's request metadata
  const cf = (context.request as RequestInit<IncomingRequestCfProperties>).cf;
  const country = cf?.country as string | undefined;
  const isEU = cf?.isEUCountry === '1';

  // Google EU User Consent Policy: EEA + UK + Switzerland
  const needsConsent = isEU || country === 'GB' || country === 'UK' || country === 'CH';

  // Store in context.locals for use in Astro pages/components
  context.locals.needsConsent = needsConsent;
  context.locals.country = country;

  const response = await next();

  // Set cookie for client-side JavaScript access
  response.headers.append(
    'Set-Cookie',
    `needs_consent=${needsConsent ? '1' : '0'}; Path=/; SameSite=Lax; Secure; HttpOnly=false`
  );

  return response;
};

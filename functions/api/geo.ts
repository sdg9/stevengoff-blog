/// <reference types="@cloudflare/workers-types" />

/**
 * Geo-detection API endpoint for cookie consent
 *
 * Returns whether the user needs GDPR consent based on their location.
 * Called by client-side JS when useCookieConsent is 'eu-only'.
 * Result is cached in localStorage for 24 hours.
 *
 * @example Response: { "needsConsent": true, "country": "DE" }
 *
 * This is a Cloudflare Pages Function. Place in /functions/api/geo.ts
 * and it will be available at /api/geo when deployed to Cloudflare Pages.
 */
export const onRequest: PagesFunction<Env> = async (context) => {
  const cf = context.request.cf;
  const country = (cf?.country as string) || undefined;
  const isEU = cf?.isEUCountry === '1';

  // Google EU User Consent Policy: EEA + UK + Switzerland
  const needsConsent = isEU || country === 'GB' || country === 'UK' || country === 'CH';

  return new Response(JSON.stringify({ needsConsent, country }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, max-age=3600', // Cache for 1 hour
    },
  });
};

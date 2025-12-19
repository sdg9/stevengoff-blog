/**
 * Shared geo-location check utility with singleton promise pattern.
 * Ensures only one API call is made even if multiple components
 * request the geo check simultaneously.
 */

interface GeoResult {
  needsConsent: boolean;
  country?: string;
}

// Singleton promise - if a fetch is in flight, reuse it
let inflightPromise: Promise<GeoResult> | null = null;

const CACHE_KEY = 'geo_consent_check';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Check if user needs GDPR consent based on geo-location.
 * Results are cached in localStorage for 24 hours.
 * Uses singleton pattern to prevent duplicate API calls.
 */
export async function checkGeoConsent(): Promise<GeoResult> {
  // Check localStorage cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const { needsConsent, country, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        return { needsConsent, country };
      }
    } catch (e) {
      // Invalid cache, continue
    }
  }

  // If a request is already in flight, reuse it
  if (inflightPromise) {
    return inflightPromise;
  }

  // Make the API call
  inflightPromise = (async () => {
    try {
      const response = await fetch('/api/geo');
      const data = await response.json();

      // Cache result
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          needsConsent: data.needsConsent,
          country: data.country,
          timestamp: Date.now(),
        })
      );

      return { needsConsent: data.needsConsent, country: data.country };
    } finally {
      // Clear the inflight promise so future calls can make fresh requests if needed
      inflightPromise = null;
    }
  })();

  return inflightPromise;
}

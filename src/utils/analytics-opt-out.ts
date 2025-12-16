/**
 * Analytics Opt-Out Utility
 * Manages user preference for analytics tracking opt-out
 */

const OPT_OUT_KEY = 'analytics-opt-out';

/**
 * Check if user has opted out of analytics tracking
 * @returns {boolean} True if user has opted out
 */
export function hasOptedOutOfAnalytics(): boolean {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return false;
  }
  return localStorage.getItem(OPT_OUT_KEY) === 'true';
}

/**
 * Set analytics opt-out preference
 * @param {boolean} optOut - Whether to opt out of analytics
 */
export function setAnalyticsOptOut(optOut: boolean): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }
  localStorage.setItem(OPT_OUT_KEY, optOut ? 'true' : 'false');

  // Dispatch custom event so analytics can react to changes
  window.dispatchEvent(new CustomEvent('analytics-opt-out-changed', {
    detail: { optedOut: optOut }
  }));
}

/**
 * Get current opt-out status
 * @returns {boolean} True if opted out, false otherwise
 */
export function getAnalyticsOptOutStatus(): boolean {
  return hasOptedOutOfAnalytics();
}

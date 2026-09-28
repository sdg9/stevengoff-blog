/** The preference applies to Google Analytics in this browser. */
const OPT_OUT_KEY = 'analytics-opt-out';
let sessionOptOut = false;

export function hasOptedOutOfAnalytics(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return sessionOptOut || localStorage.getItem(OPT_OUT_KEY) === 'true';
  } catch {
    return true;
  }
}

export function setAnalyticsOptOut(optOut: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(OPT_OUT_KEY, String(optOut));
  } catch {
    // A failed write must never grant tracking or prevent immediate withdrawal.
    optOut = true;
  }
  sessionOptOut = optOut;
  window.dispatchEvent(new CustomEvent('analytics-opt-out-changed', { detail: { optedOut: optOut } }));
}

export function getAnalyticsOptOutStatus(): boolean {
  return hasOptedOutOfAnalytics();
}

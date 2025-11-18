import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: import.meta.env.PUBLIC_SENTRY_DSN || import.meta.env.SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
  // Adjust this value in production
  tracesSampleRate: 1.0,

  // Set sample rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,

  // Adds request headers and IP for users
  sendDefaultPii: true,

  // Environment detection
  // In browser, detect based on hostname
  environment:
    typeof window !== 'undefined'
      ? window.location.hostname === 'yoursite.com'
        ? 'production'
        : 'development'
      : 'development',
});

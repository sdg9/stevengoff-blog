import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: '',

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring
  // Adjust this value in production
  tracesSampleRate: 1.0,

  // Set sample rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,

  // Adds request headers and IP for users
  sendDefaultPii: true,

  // Environment detection
  environment: process.env.ENVIRONMENT || 'development',
});

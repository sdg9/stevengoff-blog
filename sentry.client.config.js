import * as Sentry from '@sentry/astro';

const productionHost = ['stevengoff.dev', 'www.stevengoff.dev'].includes(window.location.hostname);

// This public DSN identifies the project; the build auth token must never reach the browser.
Sentry.init({
  dsn:
    import.meta.env.PUBLIC_SENTRY_DSN ||
    'https://e1478a8f4cde83c2c251241f230cd8b1@o4510112500285440.ingest.us.sentry.io/4512161840037888',
  enabled: import.meta.env.PROD && productionHost,
  environment: productionHost ? 'production' : 'development',
  sendDefaultPii: false,
  tracesSampleRate: 0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
  // Avoid recording clicks, form fields, navigation URLs, and console contents.
  integrations: (defaults) => defaults.filter((integration) => integration.name !== 'Breadcrumbs'),
});

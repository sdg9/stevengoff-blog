# Blog analytics and error reporting

## Accounts

- Google Analytics: personal Google login `steveng9@gmail.com`. Dedicated `Steven Goff` account / `stevengoff.dev` property. Terms accepted with explicit authorization. Web stream `Steven’s Dev Blog` (15856339010), measurement ID `G-3K648FWVN0`, configured in `src/config.yaml`.
- Sentry: `steven@webtownhero.com`, organization `web-town-hero-llc`, project `stevengoff-blog` (4512161840037888).
- Cloudflare: account `Steveng9@gmail.com` (ff25abd80e7d45c49774b3797b4a724d), currently accessible in the work Chrome profile. Web Analytics already automatically injects its beacon for `stevengoff.dev`, excluding EU visitors. Do not add another beacon.

GA4 dashboard: https://analytics.google.com/analytics/web/#/a409692245p556108239/reports/intelligenthome (account `409692245`, property `556108239`).

Deployment: Cloudflare Pages project `stevengoff-blog`, automatically built from GitHub `sdg9/stevengoff-blog` branch `main` using `pnpm run build` and output `dist`. The Cloudflare build environment currently has no Sentry upload token, so automated builds skip source-map upload; error capture still works.

## GA4 stream settings

The web stream uses `https://stevengoff.dev`. Enhanced measurement's browser-history page views are disabled: the site sends one explicit `page_view` on each `astro:page-load`, including initial load. Advertising consent, Google signals, and ad personalization stay disabled. Optional account data sharing, site-search capture, and form-interaction capture are disabled. Scroll, outbound-click, video, and file-download measurement remain enabled.

The existing no-banner setting is retained. `/privacy` explains the services and provides Google Analytics opt-out. Only `stevengoff.dev` and `www.stevengoff.dev` load GA; localhost and preview hostnames do not. Missing IDs or blocked storage fail closed. Tests cover navigation, opt-out, and storage failures.

## Sentry

The public DSN is configured in `sentry.client.config.js` with an optional `PUBLIC_SENTRY_DSN` override. Only production builds on the two production hostnames send events. Default PII, tracing, replay, and automatic breadcrumbs are disabled. Static build/server instrumentation is disabled; Cloudflare Functions require separate runtime instrumentation if used.

Supply `SENTRY_AUTH_TOKEN` only in the build environment for private source map uploads. The token is never public configuration. The Astro integration selects the dedicated project and deletes generated `.map` files after upload. Additional post-build JavaScript compression is disabled to preserve source map correspondence. Local builds without the token skip uploads.

## Verification

- `node --test tests/*.test.mjs`
- `pnpm run build` (with a build token and network access for source map upload)
- Confirm no `.map` files remain in `dist`.
- Preview `/blog`, all seven new article routes, and `/privacy`.
- After deploying: verify a visit in GA Realtime; verify initial and subsequent Astro navigation do not double-count. Send a clearly labeled synthetic error through the browser SDK and confirm it reaches the dedicated Sentry project with a readable stack.

A successful build/upload is not proof of production event ingestion. Full `pnpm run check:astro` currently reports existing template type errors in unrelated components and the unused geo-consent path; targeted changed-file lint and analytics regression tests should be evaluated separately.

const initialized = new WeakSet();
const productionHosts = new Set(['stevengoff.dev', 'www.stevengoff.dev']);
const deniedAds = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };

/** One controller per browser lifetime; Astro owns the initial and subsequent page-load events. */
export function initializeGoogleAnalytics(config, win = window, doc = document) {
  if (initialized.has(win) || !/^G-[A-Z0-9]+$/.test(config.id || '') || !productionHosts.has(win.location.hostname))
    return;
  initialized.add(win);
  const disableKey = `ga-disable-${config.id}`;
  let loaded = false;
  let withdrawn = false;
  win.dataLayer = win.dataLayer || [];
  win.gtag = function () {
    // Google expects an Arguments object in its command queue.
    win.dataLayer.push(arguments);
  };
  win.gtag('consent', 'default', { ...deniedAds, analytics_storage: 'denied' });

  function allowed() {
    try {
      return (
        config.useCookieConsent === false && !withdrawn && win.localStorage.getItem('analytics-opt-out') !== 'true'
      );
    } catch {
      return false;
    }
  }

  function updateConsent() {
    const enabled = allowed();
    win[disableKey] = !enabled;
    win.gtag('consent', 'update', { ...deniedAds, analytics_storage: enabled ? 'granted' : 'denied' });
    return enabled;
  }

  function pageLoad() {
    if (!updateConsent()) return;
    if (!loaded) {
      loaded = true;
      win.gtag('js', new Date());
      win.gtag('config', config.id, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      const script = doc.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.id)}`;
      doc.head.appendChild(script);
    }
    win.gtag('event', 'page_view', {
      page_location: `https://${win.location.hostname}${win.location.pathname}`,
      page_title: doc.title,
    });
  }

  updateConsent();
  doc.addEventListener('astro:page-load', pageLoad);
  win.addEventListener('storage', (event) => {
    if (event.key === 'analytics-opt-out' || event.key === null) updateConsent();
  });
  win.addEventListener('analytics-opt-out-changed', (event) => {
    withdrawn = event.detail?.optedOut !== false;
    updateConsent();
  });
}

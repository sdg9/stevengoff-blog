import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initializeGoogleAnalytics } from '../src/utils/google-analytics.js';

function browser({ hostname = 'stevengoff.dev', optedOut = false, storageFails = false } = {}) {
  const win = new EventTarget();
  const doc = new EventTarget();
  const scripts = [];
  win.location = { hostname, href: `https://${hostname}/`, pathname: '/' };
  win.localStorage = {
    getItem() {
      if (storageFails) throw Error('blocked');
      return String(optedOut);
    },
  };
  doc.title = 'Home';
  doc.createElement = () => ({});
  doc.head = { appendChild: (script) => scripts.push(script) };
  return {
    win,
    doc,
    scripts,
    page(path = '/') {
      win.location.pathname = path;
      win.location.href = `https://${hostname}${path}?private=value#fragment`;
      doc.dispatchEvent(new Event('astro:page-load'));
    },
    optout(value) {
      optedOut = value;
      win.dispatchEvent(new CustomEvent('analytics-opt-out-changed', { detail: { optedOut: value } }));
    },
  };
}
const config = { id: 'G-TEST123', useCookieConsent: false };
const commands = (b, name) =>
  (b.win.dataLayer || []).map((args) => Array.from(args)).filter((args) => args[0] === name);
const views = (b) => commands(b, 'event').filter((args) => args[1] === 'page_view');

test('one loader/config and one manual view per Astro navigation, even if initialized twice', () => {
  const b = browser();
  initializeGoogleAnalytics(config, b.win, b.doc);
  initializeGoogleAnalytics(config, b.win, b.doc);
  assert.equal(views(b).length, 0);
  b.page();
  b.page('/about');
  b.page('/');
  assert.equal(b.scripts.length, 1);
  assert.equal(commands(b, 'config').length, 1);
  assert.equal(commands(b, 'config')[0][2].send_page_view, false);
  assert.equal(views(b).length, 3);
  assert.equal(views(b)[1][2].page_location, 'https://stevengoff.dev/about');
  for (const [, , consent] of commands(b, 'consent')) {
    assert.equal(consent.ad_storage, 'denied');
    assert.equal(consent.ad_user_data, 'denied');
    assert.equal(consent.ad_personalization, 'denied');
  }
});

test('stored opt-out and unreadable storage prevent loading and pageviews', () => {
  for (const options of [{ optedOut: true }, { storageFails: true }]) {
    const b = browser(options);
    initializeGoogleAnalytics(config, b.win, b.doc);
    b.page();
    assert.equal(b.scripts.length, 0);
    assert.equal(views(b).length, 0);
    assert.equal(b.win['ga-disable-G-TEST123'], true);
  }
});

test('withdrawal immediately disables GA and denies consent without another pageview', () => {
  const b = browser();
  initializeGoogleAnalytics(config, b.win, b.doc);
  b.page();
  b.optout(true);
  b.page('/about');
  assert.equal(b.win['ga-disable-G-TEST123'], true);
  assert.equal(commands(b, 'consent').at(-1)[2].analytics_storage, 'denied');
  assert.equal(views(b).length, 1);
  b.optout(false);
  b.page('/privacy');
  assert.equal(b.win['ga-disable-G-TEST123'], false);
  assert.equal(b.scripts.length, 1);
  assert.equal(views(b).length, 2);
});

test('only configured production hosts collect, and consent-required configs fail closed', () => {
  for (const hostname of ['localhost', 'preview.pages.dev', 'stevengoff.dev.evil.example']) {
    const b = browser({ hostname });
    initializeGoogleAnalytics(config, b.win, b.doc);
    b.page();
    assert.equal(b.scripts.length, 0);
    assert.equal(views(b).length, 0);
  }
  for (const cfg of [
    { ...config, id: '' },
    { ...config, useCookieConsent: true },
    { ...config, useCookieConsent: 'eu-only' },
  ]) {
    const b = browser();
    initializeGoogleAnalytics(cfg, b.win, b.doc);
    b.page();
    assert.equal(b.scripts.length, 0);
  }
  const b = browser({ hostname: 'www.stevengoff.dev' });
  initializeGoogleAnalytics(config, b.win, b.doc);
  b.page();
  assert.equal(views(b).length, 1);
});

test('a preference changed in another tab immediately withdraws consent', () => {
  const b = browser();
  initializeGoogleAnalytics(config, b.win, b.doc);
  b.page();
  b.win.localStorage.getItem = () => 'true';
  const event = new Event('storage');
  event.key = 'analytics-opt-out';
  b.win.dispatchEvent(event);
  assert.equal(b.win['ga-disable-G-TEST123'], true);
  assert.equal(commands(b, 'consent').at(-1)[2].analytics_storage, 'denied');
});

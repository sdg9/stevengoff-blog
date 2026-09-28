import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hasOptedOutOfAnalytics, setAnalyticsOptOut } from '../src/utils/analytics-opt-out.ts';

test('blocked storage fails closed and withdrawal still dispatches immediately', () => {
  const originalWindow = globalThis.window;
  const originalStorage = globalThis.localStorage;
  const win = new EventTarget();
  globalThis.window = win;
  globalThis.localStorage = {
    getItem() {
      throw Error('blocked');
    },
    setItem() {
      throw Error('blocked');
    },
  };
  const events = [];
  win.addEventListener('analytics-opt-out-changed', (event) => events.push(event.detail));
  try {
    assert.equal(hasOptedOutOfAnalytics(), true);
    setAnalyticsOptOut(true);
    assert.deepEqual(events, [{ optedOut: true }]);
    setAnalyticsOptOut(false);
    assert.deepEqual(events.at(-1), { optedOut: true });
  } finally {
    globalThis.window = originalWindow;
    globalThis.localStorage = originalStorage;
  }
});

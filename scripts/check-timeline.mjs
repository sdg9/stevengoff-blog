import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const html = readFileSync('dist/timeline/index.html', 'utf8');
const dates = new Set();
const posts = readdirSync('src/data/post').filter((file) => file.endsWith('.md'));
for (const file of posts) {
  const source = readFileSync(`src/data/post/${file}`, 'utf8');
  const date = source.match(/^publishDate: (\S+)/m)?.[1].slice(0, 10);
  assert.ok(date, `Missing date: ${file}`);
  assert.ok(!dates.has(date), `Duplicate publication date: ${date}`);
  dates.add(date);
  const slug = file.replace(/\.md$/, '');
  assert.ok(html.includes(`href="/${slug}"`), `Timeline must link to ${slug}`);
  assert.ok(html.includes(`id="preview-${slug}"`), `Missing desktop preview: ${slug}`);
  assert.ok(html.includes(`data-preview="preview-${slug}"`), `Missing focusable marker: ${slug}`);
  assert.ok(readFileSync(`dist/${slug}/index.html`, 'utf8').includes('<h1'), `Broken article: ${slug}`);
}
assert.ok(html.includes('timeline-mobile'), 'Provide a touch-friendly article list');
assert.ok(html.includes('id="year-2012"'), 'Include the newly recovered Bitbucket history');
console.log(`Verified timeline coverage, article routes, and unique dates for ${posts.length} posts.`);

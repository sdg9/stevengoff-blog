---
project: Steven Dev Blog
state: active
milestone: Branded social sharing images delivered
updated: 2026-10-08
verify: npm run build
---

## Next actions
- none

## Needs Steven
- none

## Builds
| Where | Build | Date |
|---|---|---|
| Production | Cloudflare Pages 9877fe40 (https://9877fe40.stevengoff-blog.pages.dev) | 2026-10-08 |

## Evidence
- Implemented: original 1200x630 typography card, editable SVG source, production Open Graph metadata. Removed blog template Twitter attribution; added Caribou large-image Twitter metadata.
- Verified: successful Astro builds; all built HTML checked for stock Open Graph image references; both images visually inspected. Caribou contact tests 11/11 and Wrangler dry run pass.
- Delivered: live HTML advertises new absolute HTTPS images; downloaded production images confirmed 1200x630 JPEG (blog) / PNG (Caribou).
- Launch S4: metadata, image response and legibility pass; third-party social platform cache/share-preview refresh not tested.
- Launch D3/D7: Blog apex and www now pass HTTPS; article-specific artwork retained. See hostname repair below.
- Forms, DNS, icons and indexing unchanged; unrelated launch checks not applicable.

## Hostname repair — verified 2026-10-08
- User confirmed www.stevengoff.dev (.com was a typo).
- Added Pages domain b364e97d-8061-4473-8f81-bbc8a281335d, then corrected existing www CNAME from pixie.porkbun.com to stevengoff-blog.pages.dev using personal Chrome; Proxied/Auto TTL preserved.
- Pages API and dashboard: Active, SSL enabled. Apex and www HTTPS return 200 with blog title and branded OG image; canonical remains https://stevengoff.dev.
- HTTP www /blog?source=www-check redirects to HTTPS and retains path/query (trailing slash normalized); final 200.
- DNS record ID ad60246a105b8343f850841616691970. Previous target recorded for audit; restoring it would restore the broken parking route.
- All thread changes pushed to main; unrelated Caribou catalog edits preserved.

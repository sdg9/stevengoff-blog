---
project: Steven Dev Blog
state: active
milestone: Branded social sharing images delivered
updated: 2026-10-08
verify: npm run build
---

## Next actions
- Finish www DNS repair after Cloudflare dashboard sign-in: CNAME www must point to stevengoff-blog.pages.dev; verify existing record before editing.

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
- Launch D3/D7: Blog apex and image pass. www.stevengoff.dev returns HTTP 525 (existing hostname/TLS issue; not changed). Article-specific artwork retained.
- Forms, DNS, icons and indexing unchanged; unrelated launch checks not applicable.

## Hostname follow-up
- 2026-10-08: added www.stevengoff.dev to the existing personal-account Pages project (domain ID b364e97d-8061-4473-8f81-bbc8a281335d). Status pending: CNAME record not set. HTTPS still 525; not claimed fixed.
- Wrangler OAuth can manage Pages but DNS access returns code 10000. Shared dashboard requires sign-in. No DNS records changed.
- stevengoff.com and www.stevengoff.com return NXDOMAIN; no matching zone in available account. Awaiting spelling/ownership clarification.
- Social-sharing changes verified on origin/main in both blog and Caribou repos. Unrelated Caribou catalog edits remain untouched.

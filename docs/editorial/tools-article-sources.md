# Tools and everyday apps: editorial sources

Prepared September 27, 2026. Sources were inspected read-only. Paths below are repository-relative identifiers, not public download links. No application was deployed, installed, or exercised for this editorial task.

## 09-ai-development-tools.md

- Voice and context: blog `src/data/post/04-developer-tools-gaming-tools.md` and `05-ai-acceleration-era.md`. Continued the first-person tinkering theme without repeating private anecdotes or historical metrics.
- Baton: `baton/README.md`, `packages/harness/README.md`, and `packages/workbench/README.md`. Support the phased harness, frozen holdout contract, tier-dependent checks, structured handoff, OpenSpec cards, and tmux-backed sessions. GitHub link is documented in the harness README. No external registry publication or adoption claim was independently verified or included.
- Agent Workbench: `agent-workbench/README.md` plus source inventory under `src/client/` and `src/server/`. Its README still calls the project scaffolded despite implementation files. Article deliberately describes its explored design, and attributes concrete companion-workbench behavior to Baton's documentation. No claim that every planned adapter is implemented.
- iTerm signal: `claude-iterm-signal/README.md`. Supports colors, native unread indicator, parent/subagent guards, shared-tab limitation, and interrupted-turn caveat. No terminal installation or live hook test performed.
- Review Desk: `games/review-desk/README.md` and `src/collect.js`. Supports repository-derived items, executable/Markdown input, inline media, answer writeback, and agent-independent CLI. Avoided README's absolute assertion that data can never become stale: refresh reads what the repositories currently expose, which still depends on their correctness.
- First-person lessons are editorial interpretation of the documented designs. No invented conversations, productivity measurements, user counts, or specific historical incidents.

## 10-everyday-apps.md

- Stroller Light: `stroller-light/README.md`, `src/lib/rotation.ts`, and `src/components/HoldToUnlock.tsx`. Support local settings, colors/names/countdown, per-child durations, controls, press-and-hold unlock, and timestamp-based cycle calculation. No claims of public store availability or observed family outcomes.
- StickerApp: `sticker-app/README.md` and `db/schemas/07b-policies-fixed.sql`. Support family-owned data, sticker rewards, invitations, and database access rules. The README's early email-invitation wording conflicts with its detailed current invitation section; article uses shared links. Distribution/channel instructions also conflict internally, so no release-channel or public-release claim appears. No private family details or backend endpoints are reproduced.
- Aloud: `aloud/README.md` and `modules/expo-aloud-tts/android/src/main/java/expo/modules/aloudtts/TtsPlaybackService.kt`. Support device TTS, Readability extraction, Markdown handling, per-sentence controls, saved position, and native MediaSessionService ownership. Background playback is presented as architecture/intent, not a newly verified device result. README explicitly separates deterministic tests from hardware verification.
- Doodle: `doodle/README.md` and token/claim code in `worker/api.ts`. Support anonymous-by-default participation, optional sign-in, three response choices, hashed management tokens, and account claiming. Calendar integration requires configuration and is omitted. No account identifiers, private links, or secrets copied.
- Stays by Owner: `roses-cabin/README.md` and `db/001_init.sql`. Support request/approval flow, separate payments, private booking identity, checkout boundary, and exclusion constraint for approved stays. Omitted listing address, host details, and private guest data. No payment-processing or booking-volume claim.

## Validation

Both articles use the existing blog frontmatter shape, author Steven Goff, and the requested timestamp. Body word counts before formatting: 866 and 874. No images added. Source review supports feature descriptions; it is not a fresh functional verification of the applications. Blog formatting/schema/build checks should be recorded by the integrating task.

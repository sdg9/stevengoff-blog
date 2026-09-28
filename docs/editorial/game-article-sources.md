# Game article source notes

Reviewed September 27, 2026. These are editorial evidence notes, not new runtime verification. Repository reads only; no games, servers, or Steam settings changed.

## 06-arcward-toward-steam.md

- Earlier personal history: `/Users/steven/dev/stevengoff-blog/src/data/post/03-game-dev-deep-dive.md`.
- Premise, pure Rust simulation, Bevy shell, progression, co-op draft, browser touch/tilt, focus behavior: `/Users/steven/dev/games/arcward/README.md`.
- Browser deployment and balance evidence: `/Users/steven/dev/games/arcward/docs/implementation/progress.md`. Public browser availability is supported by recorded deployment receipts, not a fresh live-site check in this editorial task.
- Steam status: `/Users/steven/dev/games/arcward/docs/steam-native-validation.md`, especially “Default branch approved and activated” and “Corrected default build 25509641 activated” (September 24). This supersedes older private-beta plans. Default activation is NOT public release or store publication. Recorded Mac download/hash checks do NOT establish Library launch or real multi-account multiplayer acceptance.
- Deck D-pad fix and outstanding physical check: `/Users/steven/dev/games/arcward/docs/implementation/progress.md`, September 23 section.
- Save/device separation and Cloud gates: `/Users/steven/dev/games/arcward/deploy/steam/README.md`.
- Avoided numerical weapon roster claims: top-level README's four-weapon summary does not fully describe later implementation notes referring to additional weapon names.

## 07-family-games.md

- Skyward Family modes, assistance, color ownership, Linux install, host menu policy, explicit five-controller hardware gap: `/Users/steven/dev/games/tower-of-babel/README.md`. Described as a feasibility prototype, not a production release. README has conflicting broad statements about controller coverage; article avoids claiming every setting is verified controller-accessible.
- Lantern & Leaves modes, shared-screen concealment limits, controllers and disconnect handling: `/Users/steven/dev/games/hide-and-seek-bevy/README.md`.
- Current camp title, asymmetric vision, authoritative filtered snapshots, bots and local two-client verification: `/Users/steven/dev/games/dead-by-daylight-topdown/README.md`. Current title is **Lights Out, Campers!**; Camp Catch remains in crate names and earlier history. Public internet room-server deployment explicitly remains undone. README conflicts on hold-versus-toggle interaction, so that control detail is omitted.
- Family motivation is editorial framing aligned with these projects and the approved article direction; no specific family session, reaction, age, quote or outcome is invented.

## 08-shared-bevy-foundation.md

- Package responsibilities, immutable dependency revisions, provenance, consumer boundaries, unpublished/internal status: `/Users/steven/dev/games/bevy-game-foundation/README.md`.
- Shared input contract, consumer-owned joining/reconnect/pause decisions, browser percent-decoding discovery and validation boundaries: `/Users/steven/dev/games/bevy-game-foundation/docs/STATUS.md`. Browser evidence is for the named netkit example; article does not transfer that proof to netkit-session, other games, or public infrastructure.
- Card Room authoritative protocol, hidden views and limited Steam transport adoption: `/Users/steven/dev/games/card-game-bevy/README.md`. No LAN IPs or access details reproduced.
- Simulation separation: `/Users/steven/dev/games/arcward/README.md`, `/Users/steven/dev/games/fire-spread-game/README.md`, `/Users/steven/dev/games/dead-by-daylight-topdown/README.md`.
- Shared delivery checklist and recorded missing-logo failure: `/Users/steven/dev/games/STEAM-DELIVERY-CHECKLIST.md`. Article discusses the existing checklist; this writing task performs no installation or delivery checks.

## Editorial checks

- Frontmatter matches existing article conventions: publishDate, author, title, excerpt, category, tags; image intentionally omitted.
- No public Steam launch, blanket controller acceptance, completed family playtest, open-source publication, or performance metrics claimed.
- Article word counts checked separately at handoff. Main project build/content validation belongs to the integrating task.

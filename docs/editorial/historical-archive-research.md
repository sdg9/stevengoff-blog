# Historical archive research

Researched September 28, 2026. Added 35 short retrospective posts, each dated to a verified project milestone before December 2025. All new posts state that they were written retrospectively.

## Evidence and limits

- Used the existing 2015–2025 GitHub contribution export as a discovery index, then checked authored commits, project documentation, and selected source inventories through the GitHub API. The export alone was not treated as evidence that a feature shipped.
- Commit queries were filtered to `sdg9` and to dates before December 2025. Large repositories also received quarter-specific queries. These are selected milestones, not exhaustive commit counts or a complete account of every branch.
- Earliest verified owned work found: HotPotato, December 18, 2014. A search for earlier attributed commits returned no results. The 2013 open-nutrition-database history is authored by another person; angularFire is a fork without returned sdg9 commits. Neither was credited to Steven.
- No original 2013 project or continuous coverage of every quarter is claimed. Low-information training/scaffold commits and quarters without a substantial sourced story were omitted.
- Marlin entries describe configuration of upstream firmware, not authorship of Marlin. Rackstack and The Boardgame Insert Toolkit are upstream forks with no returned attributed commits; no OpenSCAD design history was invented from their creation dates. Local OpenSCAD files had no Git repository to establish a historical milestone.
- Verified Kotlin/libGDX and Unity card-game attempts, CardCoalition, and the 2025 browser implementation. Godot sources support action/roguelike projects. The specifically remembered Godot co-op card-game repository remains unidentified and was not invented.
- Current READMEs were used as architectural context, with dated commits anchoring milestones. New posts avoid unsupported sales, adoption, playtest, deployment, or completed-device-verification claims.
- Public repositories are linked from posts; private repositories are described without exposing credentials, personal records, network addresses, or private document links.
- Source identifiers and selected commit subjects are in historical-post-sources.json. Full API responses remain outside the repository. Generated covers are conceptual illustrations, not screenshots or evidence of historical visuals.
- Ten additional articles arrived in concurrent commit 75d5a9e during this work; they were preserved, and the timeline automatically includes them.

## Selected quarterly coverage

- 2014-Q4: `2014-hot-potato`
- 2016-Q3: `2016-payday-mobile`
- 2017-Q1: `2017-git-stats`
- 2017-Q3: `2017-home-assistant`
- 2017-Q4: `2017-trivia`
- 2018-Q1: `2018-rewards-points`
- 2018-Q2: `2018-review-stats`
- 2018-Q3: `2018-laser-sensor`
- 2018-Q4: `2018-tax-dashboard`
- 2019-Q1: `2019-watchface`
- 2019-Q2: `2019-codenames`
- 2019-Q3: `2019-coop-deckbuilder`
- 2019-Q4: `2019-printer-firmware`
- 2020-Q1: `2020-pi-scanner`
- 2020-Q3: `2020-pathogenesis`
- 2020-Q4: `2020-game-matchmaking`
- 2021-Q1: `2021-ecs-card-game`
- 2021-Q2: `2021-gpu-crawler`
- 2021-Q3: `2021-algorithm-practice`
- 2021-Q4: `2021-printer-calibration`
- 2022-Q2: `2022-mezzo`
- 2022-Q3: `2022-versioned-components`
- 2022-Q4: `2022-celsius-data`
- 2023-Q1: `2023-mezzo-maintenance`
- 2023-Q2: `2023-card-coalition`
- 2023-Q3: `2023-diablo-inventory`, `2023-payday3-skills`
- 2023-Q4: `2023-godot-experiments`
- 2024-Q1: `2024-sticker-app`
- 2024-Q2: `2024-tax-return`
- 2024-Q4: `2024-nodebuster`
- 2025-Q1: `2025-godot-workshop`
- 2025-Q2: `2025-do-more`
- 2025-Q3: `2025-browser-deckbuilder`
- 2025-Q4: `2025-white-label`

## Printer configuration cross-check

Inspected the actual Configuration.h diffs: c607c78d changes GRID_MAX_POINTS_X from 3 to 5 with Y matching X; 9efa8232b changes it from 5 to 6. The articles therefore say 5×5 and 6×6 grids, rather than relying on shorthand commit subjects.

## Artwork

Generated with the built-in image tool. Optimized WebP assets live in src/assets/images/posts, one per post. historical-art-prompts.json records every final prompt and asset path. Styles vary across watercolor, printmaking, collage, concept painting, pixel art, technical drawing, and photographic-style illustration.

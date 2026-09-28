---
publishDate: 2025-09-29T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'The Co-op Deckbuilder Moves into the Browser'
excerpt: 'The recurring card-game idea reached a TypeScript browser implementation, with elemental effects and a very practical targeting problem.'
image: ~/assets/images/posts/2025-browser-deckbuilder.webp
category: Project Archive
tags:
  - project-archive
  - game-development
  - typescript
  - deckbuilders
---

By late summer 2025, another co-op card-game repository was active: **html5-coop-digital-card-game**.

The tools had changed again. This version used TypeScript, and the September history includes work on a Pixi UI renderer, combat-screen refactoring, elemental symbols, and enemy targeting.

The recurring idea was still there, but the browser brought a different presentation layer to work through.

## The target has to be the target

Several September 29 commits focus on enemy hit detection and intermittent drag-and-drop targeting failures. Nearby work changes enemy symbol types from geometric shapes to elements and corrects an array-mutation problem in the symbol matcher.

Those details connect the visual and rules sides of a card game. A player has to understand what the symbols mean, and dragging a card toward an enemy has to select the intended target reliably.

A combat system can compute the right effect while the interface sends it the wrong selection. Fixing that gap is part of implementing the game, not a final cosmetic pass.

The history makes a useful companion to the [2019 Kotlin attempt](/2019-coop-deckbuilder), [Unity ECS version](/2021-ecs-card-game), and [CardCoalition](/2023-card-coalition). These are separate implementations, not a claim that one uninterrupted codebase migrated through every engine.

What carried across was the design interest. The browser version gave me another way to explore it—and another set of very concrete details to get right.

---

_From the project archive · Q3 2025. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

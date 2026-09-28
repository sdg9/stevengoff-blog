---
publishDate: 2019-07-14T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'The First Co-op Deckbuilder: Kotlin, Cards, and Monster Intent'
excerpt: 'The libGDX-era prototype was already wrestling with turn boundaries, visible intent, and the difference between displaying an effect and implementing it.'
image: ~/assets/images/posts/2019-coop-deckbuilder.webp
category: Project Archive
tags:
  - project-archive
  - game-development
  - kotlin
  - deckbuilders
---

The summer-2019 **Coop-Deckbuilder** is the first substantial card-game attempt in this archive. Its own description is wonderfully direct: a cooperative roguelike deckbuilder, currently without a theme.

The Kotlin/libGDX project had desktop and mobile build paths, client/server network events, and a growing collection of combat effects. By July, the commits were working through the rules that make a card game understandable.

## Showing a rule isn't implementing it

One July 3 message explicitly says the weakness debuff has a UI but not yet the damage-reduction logic. I appreciate that specificity. A symbol appearing above a character and the simulation applying its effect are separate milestones.

Other changes add a repeated attack, a draw-card buff, and a test that shield degrades at the start of a turn. On July 9, monster movesets and intent change after the turn.

Those details belong together. Players need to predict consequences, but the game also needs consistent timing for when those consequences happen.

## The platform work followed me

The build notes include switching between desktop and Android, plus an iOS simulator path with unresolved networking problems. That is a more useful historical picture than simply calling it cross-platform.

I had a prototype with rules, presentation, and networked execution growing at different speeds. Later attempts changed the engine and architecture. The central ambition stayed recognizable: take the deliberate choices of a solo deckbuilder and make them something people could work through together.

---

_From the project archive · Q3 2019. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

---
publishDate: 2021-02-02T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Rebuilding the Co-op Card Game around Unity ECS'
excerpt: 'Cards, powers, and network events came together in a Unity prototype where even solo play used the client/server path.'
image: ~/assets/images/posts/2021-ecs-card-game.webp
category: Project Archive
tags:
  - project-archive
  - game-development
  - unity
  - deckbuilders
---

By early 2021, the co-op card-game idea had moved into **ECSNetworkingCardGame**, a Unity project using DOTSNET and a card-game foundation.

The architecture notes describe ECS largely as an event system. Some entities represented short-lived events rather than long-lived objects. Broadcast and receive systems carried those events between client and server worlds.

Even solo play used a client connected to a local server. That kept the execution model consistent instead of maintaining a separate single-player version of the rules.

## The architecture had to carry actual cards

January's history is full of concrete mechanics: powers that react to status changes, effects that upgrade cards, variable-cost cards, and tests for relic behavior. By February 2, I was implementing card levels, keyword-colored text, and working through an Assassin and invisibility-related power.

Those details matter because an elegant event architecture isn't the end goal. It has to express the rules that make a deck interesting, and it has to do so without losing track of when effects fire.

The history also contains migration fixes and broken intermediate states. This was a prototype evolving while its underlying model changed.

Compared with the Kotlin attempt, the tools were different, but the recurring question was familiar: how do I make a card effect happen once, at the right time, with every player seeing a consistent result?

---

_From the project archive · Q1 2021. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

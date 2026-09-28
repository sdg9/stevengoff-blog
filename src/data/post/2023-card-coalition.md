---
publishDate: 2023-06-06T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'CardCoalition: Another Run at the Co-op Deckbuilder'
excerpt: 'Unity lobbies, relay connections, card effects, and deck selection brought the recurring card-game idea into another prototype.'
image: ~/assets/images/posts/2023-card-coalition.webp
category: Project Archive
tags:
  - project-archive
  - game-development
  - unity
  - deckbuilders
---

In spring 2023, the card-game idea returned as **CardCoalition**.

This was another Unity implementation, with a documented model for players, enemies, persistent decks, and the draw, hand, and discard piles used during combat. Cards were represented as data, while server-side helpers coordinated the characters involved in the game.

## The connections and the cards both need work

The May 25 history moves from relay access through a console to a working lobby-and-relay milestone. Around the same period, the game gains work on chain lightning, replaying a card effect, card glow, rarities, and rewards.

Those are two very different kinds of progress. Joining a session makes the game reachable. Interesting, understandable card effects make the session worth joining.

The later commits show the rough edges too. June includes an enemy-turn issue that drew cards twice, deck-view work, and a work-in-progress grid selection. That is a prototype still being shaped, not a finished release.

What makes this more than a repeat of the [Unity ECS attempt](/2021-ecs-card-game) is the new implementation history. The familiar design problem is being approached again with different networking and application pieces.

I keep returning to cooperative deckbuilders because the shared decisions are appealing. The archive shows the other half of that attraction: each attempt exposes another set of details between the idea and a game people can comfortably play.

---

_From the project archive · Q2 2023. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

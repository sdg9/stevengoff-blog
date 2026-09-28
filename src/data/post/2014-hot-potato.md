---
publishDate: 2014-12-18T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Hot Potato: My Earliest Surviving Multiplayer Experiment'
excerpt: 'A tiny Unity LAN game from 2014 reveals that the urge to build something people could play together was already there.'
image: ~/assets/images/posts/2014-hot-potato.webp
category: Project Archive
tags:
  - project-archive
  - game-development
  - unity
  - multiplayer
---

The oldest project in this archive that I can confidently connect to my own commits is a game about passing a potato.

**Hot Potato** appears in December 2014 as a small Unity 3D LAN game, with Bolt handling the networking. The README describes exactly that: a digital version of the children's game. No sprawling progression system. No elaborate world. Just a familiar activity moved onto connected computers.

The source tree has the beginnings of the machinery that makes even a simple multiplayer idea possible: player and server callbacks, a player registry, camera setup, and a potato controller. There is also a wall-teleport script. The premise fits in a sentence; the implementation already needs to care about who exists, where they are, and which machine knows about it.

## A smaller starting point than I remembered

My later projects make it easy to tell the story as though multiplayer arrived with the co-op deckbuilders or Pathogenesis. This repository pushes that interest several years further back.

The surviving history is only a handful of initial check-ins. It doesn't tell me how many rounds anyone played or whether the project reached a polished state. What it does preserve is an early choice: use game development to make a shared activity.

Looking back, that is the recognizable part. Different engines and much larger systems came later. The basic question was already here: can I turn this thing we know how to play into something that works across a network?

---

_From the project archive · Q4 2014. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration. Source: [HotPotato](https://github.com/sdg9/HotPotato)._

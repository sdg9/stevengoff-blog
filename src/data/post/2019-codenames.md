---
publishDate: 2019-06-02T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Codenames Was My Kotlin Game-Development Classroom'
excerpt: 'A couch-friendly board-game adaptation became a practical tour of libGDX, ECS, and several approaches to networking.'
image: ~/assets/images/posts/2019-codenames.webp
category: Project Archive
tags:
  - project-archive
  - game-development
  - kotlin
  - libgdx
---

Before the co-op deckbuilder, there was **CodenamesGame**.

The README is unusually candid about its purpose: I was a web and mobile developer learning game technology, and a multiplayer version of a familiar board game looked like a manageable place to start. The goal was couch play through devices instead of a physical board.

The chosen tools included Kotlin, libGDX, Artemis-ODB for entity-component organization, and KryoNet for networking.

## Familiar patterns meet a different environment

The development notes trace an earlier approach through Colyseus and Redux-like state management. That makes sense coming from web applications. It also exposed a cost: client logic in Kotlin and server logic in Node meant maintaining behavior across two languages.

The notes describe experiments with serialization and a Java implementation before the move toward KryoNet. These weren't just interchangeable dependencies. They changed where rules lived and how the clients agreed about state.

By June 2, the history includes getting Android running and correcting server behavior. Those are concrete steps toward the original couch-play idea, even though they don't establish a polished release.

This project helps explain the deckbuilder that followed. I was learning the language, the rendering framework, and the networking model through a game whose basic rules I already understood. Familiar gameplay gave me something stable while almost everything underneath it was new.

---

_From the project archive · Q2 2019. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration. Source: [CodenamesGame](https://github.com/sdg9/CodenamesGame)._

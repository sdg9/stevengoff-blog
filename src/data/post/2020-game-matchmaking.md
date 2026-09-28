---
publishDate: 2020-11-08T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Pathogenesis Needed a Room Code—and a Server Behind It'
excerpt: 'The Go matchmaker turned “join a game” into an allocation problem involving Agones, room codes, containers, and cluster setup.'
image: ~/assets/images/posts/2020-game-matchmaking.webp
category: Project Archive
tags:
  - project-archive
  - game-development
  - kubernetes
  - go
---

A room code is a tiny interface to a surprisingly large amount of machinery.

The Go matchmaker for **Pathogenesis** was responsible for receiving room requests and working with Agones to allocate a game server. The client could deal with a room code instead of asking players to handle an address and port directly.

The October 4 history includes a multistage Docker build and an early milestone for allocating a server and obtaining its connection information. By November 8, the commits are working on certificates, builds, and creating the cluster from scratch.

## A game has an operational side

This is the part of the project where “make a multiplayer game” became “understand the environment that runs the multiplayer game.”

The Unity client was only one piece. A server build needed packaging. Allocation needed to find a place for a session. The matchmaker needed a dependable way to talk to the hosting system.

The broader [game-development retrospective](/03-game-dev-deep-dive) describes why this became such a learning project. The dated commits provide a more specific picture of the work: repeated attempts to make the hosting setup reproducible, rather than a claim that a large public service was operating.

I still like the contrast. The player-facing goal was to type a few characters and join friends. Underneath, I was learning containers, certificates, and Kubernetes because that simple action needed something on the other end.

---

_From the project archive · Q4 2020. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

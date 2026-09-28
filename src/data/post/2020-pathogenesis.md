---
publishDate: 2020-09-30T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Pathogenesis: What If the Infected Team Could Grow?'
excerpt: 'The September 2020 Unity prototype combined social deduction with conversion, then immediately brought dedicated-server questions along with it.'
image: ~/assets/images/posts/2020-pathogenesis.webp
category: Project Archive
tags:
  - project-archive
  - game-development
  - unity
  - multiplayer
---

**Pathogenesis** began with a change to a familiar social-deduction setup. Instead of keeping the hidden enemy team fixed, infected players could convert other crewmembers during the game.

The README places the idea between Among Us and the board game Panic Station: a crew wakes from hypersleep, something extraterrestrial is spreading, and cooperation becomes harder as trust becomes less reliable.

That is enough of a rules change to affect the whole experience. A player isn't simply asking who started on the other team. They also have to consider whether an earlier ally is still an ally.

## The prototype and the server grew together

The September 18 commits establish the Unity project and tilemap. By the end of the month, the history includes dedicated-server work, Agones health checks, and a correction involving UDP versus TCP configuration.

Those infrastructure changes are part of the same story. A shared game needs somewhere for its shared state to live, and a server process that starts is only useful if clients can actually reach it.

This wasn't my only game experiment that summer. The separate CoopRPGDeckbuilder history includes movement-range, pathfinding, initiative selection, and combat-flow work in July. I was exploring both tactical cooperation and suspicious cooperation, with very different rules around each.

Pathogenesis is the branch where the social design pulled me deepest into hosting. The premise was about uncertainty between players; the implementation needed the network and server behavior to be much less uncertain.

---

_From the project archive · Q3 2020. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

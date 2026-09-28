---
publishDate: 2015-04-25T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Drawing Games and the Trouble with Leaving the Room'
excerpt: 'A spring 2015 Unity drawing-game experiment was already teaching me about multiplayer state, reconnects, and starting another round.'
image: ~/assets/images/posts/2015-telestrations.webp
category: Project Archive
tags:
  - project-archive
  - unity
  - multiplayer
  - party-games
---

There was a drawing-game project before the Halloween party that later sent me toward React.

My Telestrations repository contains Unity project assets, design notes, and a run of spring 2015 commits. By April, I was working on the problems that appear once a multiplayer game has to handle more than the first happy-path round.

## The next round is a feature too

One April 19 fix clears old images and drawings when creating another game without restarting the application. Another addresses players' items getting out of sync when a game completes.

Those are easy details to overlook when you are focused on getting a drawing onto the screen. But the game is not only the drawing. It is also the shared agreement about whose drawing this is, where it goes next, and what gets cleared when everyone plays again.

That same day, I added an API to simplify client logic that might or might not involve networking. On April 25, the history records a Bolt 0.4.3 update, compatibility work, and changes to disconnect handling.

## A different starting point for the Halloween story

This matters to the chronology. I was already experimenting with digital party games in the spring. The [Halloween Jackbox party](/2015-halloween-react) later that year inspired a new attempt and a new learning direction: React, Redis, and eventually React Native.

The surviving commits do not tell me how a particular play session went. They do show that I was already discovering how much of multiplayer development happens around the edges of the game: leaving, finishing, resetting, and keeping everybody in the same state.

---

_From the Bitbucket archive. Written in September 2026 from private repository history and recollection; the date above marks project work, not original publication. Cover art is a conceptual illustration. Private source code is not reproduced._

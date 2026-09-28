---
publishDate: 2023-12-05T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Trying Godot Together: Sprites, Multiplayer, and One More Run'
excerpt: 'A small game jam led into a Godot action-roguelike project, with animation tooling and multiplayer work along the way.'
image: ~/assets/images/posts/2023-godot-experiments.webp
category: Project Archive
tags:
  - project-archive
  - game-development
  - godot
  - co-op
---

The late-2023 Godot work is a distinct branch of the game history.

The October game-jam repository contains player and enemy movement, facing and animation changes, a join/leave header, and Blender scripts for turning animation into images. Later that month, **One More Run** begins as a 2.5D roguelike project using Godot and C#.

These were shared projects. The commits discussed here are my contributions, not a claim that I made every part of them.

## A different engine, familiar boundaries

By early December, the One More Run history includes multiplayer basics, fixes, and reward selection with persistence. The surrounding notes also record the Godot version and test setup.

The shape of the work is familiar even though the engine changed. Characters need to face the right direction. Animation needs to fit the movement. A reward needs to survive the transition out of the screen where it was selected.

The Blender-to-image script is a nice connection between asset work and runtime presentation. The visual pipeline can be a project of its own before an animation becomes useful inside the game.

This source supports a Godot action-game chapter. It does not establish that One More Run was another Slay the Spire clone. Keeping those branches separate makes the history easier to follow: I was returning to cooperative games, but not always to the same genre.

---

_From the project archive · Q4 2023. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

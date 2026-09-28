---
publishDate: 2015-01-31T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Teaching a Card Game to Take Turns'
excerpt: 'The January 2015 Spades history records bidding, scoring, AI work, and a shift from frame-by-frame updates to explicit game state.'
image: ~/assets/images/posts/2015-spades.webp
category: Project Archive
tags:
  - project-archive
  - card-games
  - game-development
  - unity
---

Spades looks straightforward when people play it. Everyone knows whose turn it is, what counts as a legal play, and when to collect a trick. Programming it means making all of that explicit.

My January 2015 Bitbucket project captures that work in unusually helpful commit messages: AI updates, bidding and scoring, a fix to trick order, restoring the human player, and finally a scoreboard laid out as a grid.

## A card game does not need to think every frame

One January 26 commit is the part I most want to preserve. I restructured the game manager to use **coroutines and game state instead of `Update`**, because the game did not need updates every frame.

That is a useful little design lesson. The engine offers a continuous loop, but a turn-based game progresses through decisions and events. Modeling the turn directly can be easier to reason about than repeatedly asking whether something should happen.

The archive also includes a test project. There is a collaborator's commit in the history, so this was not exclusively my work; the milestones described here are from commits attributed to me.

## Before the deckbuilders

This project predates the later experiments with [co-op deckbuilding](/2019-coop-deckbuilder) and [Unity ECS card-game code](/2021-ecs-card-game). It is an earlier encounter with the same underlying challenge: translating familiar tabletop behavior into precise software state.

The January 31 scoreboard commit anchors this entry. It is evidence of development progress, not a claim that I shipped a finished Spades game.

---

_From the Bitbucket archive. Written in September 2026 from private repository history and recollection; the date above marks project work, not original publication. Cover art is a conceptual illustration. Private source code is not reproduced._

---
publishDate: 2026-05-27T12:00:00Z
updateDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'One Must Draw: Studying a Game I Love So I Could Build My Own'
excerpt: 'Seven weeks, about 3,600 commits, and a spec-driven AI harness later, my latest attempt at a co-op deckbuilder finally had a baseline I trusted, heroes of its own, and a working title.'
image: ~/assets/images/posts/one-must-draw-sts2-baseline.webp
category: Game Development
tags:
  - game-development
  - deckbuilder
  - phaser
  - multiplayer
  - ai-workflow
---

I've wanted to build a co-op Slay the Spire since 2019.

The first attempt was `Coop-Deckbuilder`, written while I was learning Kotlin. In between there was an ECS networking card game, and in 2023 CardCoalition took the same idea from a fresh start. All of them taught me a lot. None turned into a game I wanted to keep playing.

On April 12, 2026, I made a first commit in a new repository and tried again. This is a personal fan and learning project. It isn't affiliated with Mega Crit, it isn't released, and it will never ship with their content. It also became the busiest thing I worked on this spring: 849 Claude Code prompts in April and 1,789 in May.

## Specs first, code second

The stack is Phaser 4, strict TypeScript, Vite, and Colyseus 0.17 for authoritative multiplayer. The more interesting part is how the code gets written.

Before any game code existed, I spent the first day building an autonomous harness around OpenSpec. Every feature starts as a spec with GIVEN/WHEN/THEN scenarios. I refine it with Claude until it says what I actually mean, then approve it. From there the harness:

1. Creates a git worktree for the story.
2. Has one agent write **frozen holdout tests** from the spec before any implementation exists.
3. Has another agent plan, and another implement.
4. Refuses to continue if the implementer touched a holdout.
5. Sends the diff to four reviewers in parallel: code quality, architecture, security, and spec compliance. The spec reviewer never sees the implementer's reasoning.

The first story was a seeded random number generator. Boring, but everything after it depended on determinism. Then came a hook dispatcher, action queue, card piles, energy, damage, status effects, and targeting. By April 27 I had a low-fidelity vertical slice where I could actually play a fight.

By the end of May, 304 specs had been implemented and archived. The repository had around 1,860 test files, and roughly 1,430 of them were frozen holdouts.

The harness wasn't free. Early on it generated an HTML review page with per-file diff summaries, and I noticed I was reading those less and less, so I asked whether a shorter summary would do. I ran several stories at once in separate sessions and spent real time merging worktrees back to `main`.

## Using a game I know as a yardstick

On April 24, I made the decision that shaped the rest of the project.

Balancing a deckbuilder by feel is hard. I didn't know whether a new hero with a 30% win rate was too hard, too easy, or fine. So I looked closely at how Slay the Spire 2's starting characters, the Ironclad and the Silent, stack up against its early acts, and set up reference versions to benchmark against. Not as part of the game, just as a measuring stick for a difficulty curve I already knew in my bones.

Getting a trustworthy reference took longer than I expected. Small rules details, like exactly when a debuff wears off or when block clears, change win rates more than you'd think, and I spent a lot of evenings checking my assumptions.

I wrote the rule down in May so no future session could get it wrong: **the reference heroes exist only for balance tuning and will never ship.** Everything players see has to be my own, and an automated check keeps names from the original game from leaking into my content.

## Teaching the game to play itself

With a baseline in place, I built a headless balance simulator. It runs seeded games through the engine without rendering anything and reports win rate, turn counts, and HP at the boss.

Then I asked the obvious question: how smart is the bot? A 25% win rate means nothing if the bot plays like a toddler. So the sim got a ladder of policies. Here's one Act 1 report for the Ironclad reference over 1,000 seeds:

| Policy                  | Win rate |
| ----------------------- | -------- |
| Random                  | 1.1%     |
| Greedy damage           | 41.9%    |
| Expert heuristic        | 54.3%    |
| Monte Carlo tree search | 92.5%    |

That spread was useful. It showed skill mattered, and it gave me a ceiling. It also broke in instructive ways. One parallel MCTS run was still going after 11 hours because a single seed got stuck. A 1,000-run MCTS report took about 43 minutes of wall time. I had to remind myself that one act wasn't a real run, which pushed the simulator toward full three-act runs.

## Co-op, one wire at a time

Co-op was the whole point, but I didn't start there. The engine was designed with JSON-serializable snapshots and JSON commands, and on April 29 a spectator-only MVP proved that shape could travel over Colyseus. Two-player simultaneous combat followed on May 4. Then came lobbies with class selection, per-player rewards, map voting, ally animations, and disconnect/reconnect handling by May 18.

Real bugs showed up the moment two browsers were involved. Two players who picked the same hero drew the exact same hand because they shared a seed. Three enemies resolved attacks in an order that didn't match what the screen showed. Cards visually stayed in my hand after a reshuffle. For that one, the game could dump a hand-diagnostics file, so I handed Claude the exact state instead of trying to describe it.

## Heroes of its own

Once the baseline was trustworthy, the fun part started: new heroes.

The **Chronomancer** plays with time. Some cards Await, getting stronger the longer they sit in your hand, which is a strange and satisfying thing to plan around. The **Mariachi** got a second resource called Canción, shown in a hexagon next to energy with no cap. I had design docs for others too, including a Joker built around poker-like hands, and a hero design framework to keep their roles from overlapping.

The simulator paid off right away. I ran MCTS on the Chronomancer to see how he performed, fed what it learned back into the expert heuristic, and then worried that he fell flat in Act 3. That led to a pass on stronger, rarer cards for later in a run.

I also tried something that wasn't Slay the Spire at all: a "royale" map where a storm circle collapses across the nodes, the boss appears after turn 15, a treasure chest unlocks after turn 7, and you can sketch plans directly on the map with a quill. It was rough. The storm didn't shrink at first, visited nodes could be fought again, and drawings didn't scroll with the map. But it felt like the game starting to become its own thing.

## A name, finally

On May 27, I decided the project needed a working title that wasn't borrowed. "Final Draw" lasted about two hours. The splash screen and main menu now say **One Must Draw**, over a menu illustration generated for this project.

It isn't done, and it's not public. But after seven years and several attempts, I have something I didn't have before: a baseline I trust, a way to measure whether a new idea makes the game better, and co-op that actually works across two browsers.

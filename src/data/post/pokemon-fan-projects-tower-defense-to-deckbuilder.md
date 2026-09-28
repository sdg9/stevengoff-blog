---
publishDate: 2026-03-14T12:00:00Z
updateDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'Two Pokémon Fan Games in Three Weeks: A Tower Defense and a Co-op Deckbuilder'
excerpt: 'A two-day Bloons-style tower defense turned into a three-week co-op roguelite deckbuilder, and the biggest lesson was that the combat I actually wanted came from Slay the Spire, not the games I grew up with.'
category: Game Development
tags:
  - fan-project
  - phaser
  - multiplayer
  - deckbuilder
  - game-design
  - ai-assisted-development
---

Between late February and mid-March I built two Pokémon fan games back to back. Neither one is a product. They're personal projects that use characters I don't own, made for playing at home and for figuring out what kind of co-op game my family would actually come back to.

The first was a two-day tower defense. The second grew into something much bigger: a cooperative roguelite deckbuilder with an overworld, gym bosses, online rooms, and about 370 commits in two and a half weeks.

## A Bloons clone for a six-year-old

On the evening of February 22 I asked Claude Code to help me make "a game heavily inspired from Bloons TD6 for my son and I that we can play over the LAN." I reused the stack from an earlier kids' game: Phaser 4, bitECS, and a small WebSocket server running the simulation at 20 ticks a second, all in a pnpm monorepo.

The first real bug was a good one. Pikachu's shots hit their targets, but Lapras and Alakazam fired straight through the balloons. It made me wonder whether Bloons simulates projectile physics at all or decides the hit at spawn and just animates the travel. Either way, I wanted proof instead of eyeballing it, so I asked for headless simulations in Vitest that confirm a tower in range of a balloon actually applies its effect. That habit of testing game rules without rendering them followed me into the next project.

Within about a day the prototype had:

- **Evolution as the upgrade system.** A six-year-old doesn't need Bloons-level depth, but evolving a tower was the natural Pokémon version of an upgrade path.
- **Up to four players.** By late morning on the 23rd a three-player game was working. Joining from another machine used a LAN IP that the game remembers for next time.
- **A shared play button.** Speed and auto-start weren't syncing between clients, so they became one server-owned control with pause, play, and auto states.
- **Typed energy instead of cash.** Each player picks a type deck in the lobby, and towers cost energy, closer to the Pokémon trading card game than to Bloons money. That immediately made upgrades far too cheap, which led to a Monte Carlo balance pass.

The repo ended at 17 commits, plus a 25-item backlog. That included 17 ideas from a brainstorm about how to make it different from Bloons, like a story-mode campaign, tag-team towers, and an undo button. All I really cared about was co-op with my son, and maybe my wife.

## Starting over with a design session

Five days later, on February 28, I started the bigger project with a structured brainstorming workflow instead of code. The pitch was a cross between the Red/Blue games I played as a kid, multiplayer, and a roguelite you can finish in about 30 minutes.

The brainstorming session produced 100 ideas, and roughly 65 survived. The most useful decision came from thinking about who would play it. I wanted combat to be either all Vampire Survivors-style action or all cards, not a hybrid. I chose cards because my wife would enjoy something slower-paced that she could look away from. I wrote the MVP success criterion as plainly as I could: *"wife and/or son want to play again."*

The plan was cards, then simulation, then a combat prototype, then the full build. Early on I had a plain JavaScript combat simulator running 22 scenarios at 5,000 simulations each. Its numbers set the first gym boss's HP and how it scales with each extra player.

## Building fast, then building a factory

The first two weeks were a sprint:

- **Multiplayer on day two.** Colyseus rooms with four-letter codes, a shared overworld, and server-authoritative combat. The first two-player tests found the obvious bugs: a broken combat screen, a reward screen stuck on "waiting," and players out of sync on the overworld after battle. On March 3 I migrated from Colyseus 0.15 to 0.17.
- **Epics as commands.** I wrote custom slash commands to turn an epic into specs and behavioral tests and then implement it story by story in parallel git worktrees. March 8 alone produced 97 commits.
- **Generated art and audio.** PixelLab made tiles, characters, NPCs, and backgrounds. ElevenLabs voiced the NPC dialogue lines, which led straight to a mixing problem: the voices were hard to hear until the music ducked under them. Lazy-loading the music cut the initial download from 61 MB to 6 MB.

My first wind animation for tall grass rotated the whole tile, so the *roots* swayed along with the tips. Around 11 p.m. that night it became a frame-based animation generated with PixelLab instead.

## The pivot: it wanted to be Slay the Spire

On March 7 I admitted something to myself: the emergent combat in Slay the Spire 2 was more interesting to me than 90s Pokémon moves or even the trading card game. What I wanted from Pokémon was the journey: catching, collecting, and evolving.

So combat got rewritten. In the new design:

- **The player is the trainer** with the HP. Creatures don't have health bars; they're pools of cards you bring into your deck.
- **Mid-combat swapping and type effectiveness are gone.** You pick up to two creatures at campfire rest stops.
- **Catching uses a permanent Poké Ball** with one attempt per fight and a cooldown after a success. Bosses drop eggs that hatch at rest stops.
- **Co-op means shared problems.** Debuffs you put on an enemy help everyone, and I decided enemies should simply hit every player.

By March 11 the project had 1,942 passing tests across 108 files.

The last few days were spent on how the cards *felt*: drag arrows that start from the card, targetless cards that need a higher drag to play, pixel fonts, 9-slice frames, and a shuffle animation that briefly drew far more than five cards.

## What didn't get done

- **The original-creature version is only names.** There's a build-time switch between Pokémon names and original ones, and production builds default to the original set, but I never made the original creature art.
- **It never faced its own success test.** My playtest runs found bugs like a caught Geodude not ending the fight, but this stretch of work didn't answer whether my wife or son would want to play again.
- **The architecture needed rethinking.** On April 12 I wrote a 25-item action list for the next version. At the top were a hook system for relics and powers, replacing inline checks in the combat engine, and separate random number streams, since using a consumable could change your future card rewards.

That same evening I started a fresh deckbuilder project to explore those ideas instead of retrofitting them here. The tower defense taught me to test game rules headlessly. The roguelite taught me that a family game still has to be built around the moment-to-moment fun, not just the characters on the screen.

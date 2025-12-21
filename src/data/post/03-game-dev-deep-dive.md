---
publishDate: 2025-12-17T00:00:00Z
author: Steven Goff
title: "The Game Dev Deep Dive: Slay the Spire, Among Us, and Learning Kubernetes for Fun"
excerpt: 698 commits in a single quarter. Proximity-based chat, spreading alien viruses, and finally answering a question I'd wondered about since childhood—how do games actually work?
image: https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
category: Retrospective
tags:
  - game-development
  - multiplayer
  - kubernetes
  - networking
  - side-projects
---

## A Childhood Question Finally Answered (2019-2021)

My fascination with computers started as a young child with video games. Not playing them—wondering *how they worked*.

I vividly remember playing Mario and clicking jump, thinking: "Okay, in the computer system, I'm saying I want to jump. Is it pre-programmed at every possible spot in the game that if I click jump, I'll move a certain height?" That seemed impossibly complex. There had to be some logic that would work no matter where I was, as long as I was on the ground.

That question—*how does this actually work?*—never really left me. It just evolved. How does Mario Kart give last-place players a boost? Why does the last bullet in some games' clips deal extra damage? These invisible mechanics fascinated me.

Building my own games, decades later, was finally paying homage to my younger self.

### The Slay the Spire Inspiration

I was obsessed with Slay the Spire. Deck-building roguelike mechanics, meaningful choices, that one-more-run addiction. I noticed it was built with a framework similar to libGDX, and I thought: *What if I made a co-op version?*

Thus began `Coop-Deckbuilder`.

The plan was to learn Kotlin while building it. Two birds, one stone. The numbers tell the story:
- **Q2 2019**: 194 commits on Coop-Deckbuilder
- **Q3 2019**: 114 more commits
- **Q2 2023**: CardCoalition (385 commits)—same concept, fresh restart years later

That's the thing about game development as a hobby. You never really finish. You just come back to the same ideas with more experience.

### The Among Us Moment

Then Among Us happened.

Like everyone else in 2020, I was hooked. But unlike most players, I was hooked on the *mechanics*. The social deduction. The spreading paranoia. The proximity chat that some lobbies used.

I wanted to build my own version. A spin-off with an alien virus that would spread—so the infected team would *grow* as the game played. Paranoia would compound as more and more players switched sides.

This became **Pathogenesis**.

### Learning Kubernetes the Hard Way

Pathogenesis needed multiplayer. Not just any multiplayer—I wanted lobby systems, matchmaking, auto-scaling based on player count.

I discovered Agones, a framework for hosting game servers on Kubernetes. It could keep warm game instances ready and scale up as players connected.

Now, my entire career has been frontend development. React Native, mostly. Backend infrastructure? Kubernetes? That was firmly outside my comfort zone.

So naturally, I dove in headfirst.

I spent months learning Kubernetes specifically so I could run game servers properly. Setting up `pathogenesis-matchmaker`, configuring auto-scaling, keeping warm instances available. All for a side project that maybe a dozen people would ever play.

Was it overkill? Absolutely. Was it worth it? Every second.

### The Playtest

I managed to get one proper playtest together. Twelve people. Friends, coworkers, anyone I could convince to download the game and join at a specific time.

It was... buggy.

Things didn't work the way they expected. Features I thought were intuitive weren't. The game crashed. The virus spreading mechanic needed work. A dozen small issues that only surface when real humans touch your code.

The feedback was valuable, but it also taught me something important: **starting with a multiplayer game that requires 8-12 players is brutally hard.**

Every playtest required coordinating a small crowd. Getting quality feedback meant scheduling around a dozen people's availability. If you want to iterate quickly on a game, you need something that works solo or with 2-4 people.

Lesson learned. Eventually.

### The Peak Quarter

Q4 2020 was insane.

**698 commits in a single quarter.** My most active period until 2025's AI explosion.

The repos tell the story:
- `ECSNetworkingCardGame`: 273 commits—rebuilding the card game with an Entity Component System architecture
- `pathogenesis`: 251 commits—still grinding on the Among Us inspired game
- `AdventOfCode`: 112 commits—because apparently I needed a break from games to solve puzzles

I was working full-time, had a growing family, and still finding hours to pour into these projects. Looking back, I'm not sure how I did it. Coffee, probably.

### ECS Networking

The `ECSNetworkingCardGame` project was fascinating. Entity Component Systems are a game development pattern where you separate data (components) from logic (systems). It's particularly powerful for multiplayer because you can easily serialize and sync entity state.

I was building a co-op card game—think Slay the Spire meets Pandemic—and wanted the networking to be solid from the start. The architecture took forever to get right, but when it clicked? *Chef's kiss.*

You could play on phones. On Linux. The netcode actually worked (most of the time).

### Why This Era Mattered

This period was the most technically challenging of my side project career. I wasn't just building apps or websites—I was learning:
- Game development patterns (ECS, game loops, state machines)
- Multiplayer networking (latency compensation, state synchronization)
- DevOps and infrastructure (Kubernetes, container orchestration)
- How to organize 12-person playtests (social engineering, basically)

None of this was directly applicable to my React Native day job. But all of it made me a better engineer.

And honestly? It was the most fun I'd had programming in years.

### The Quiet After

By mid-2021, the intensity dropped off. Q2 2021 shows just 4 commits—a `BestBuyCrawler` because (yes) I was trying to snag a GPU during the great shortage.

Q3 2021? Seventeen commits on `AlgorithmPrep`. Classic "maybe I should get better at interviews" energy.

The game dev obsession had run its course. Not because I was tired of games, but because life has seasons, and I was entering a new one.

### The Games I Never Shipped

I should be honest: none of these games shipped. Not really. They worked. You could play them. But they never got a Steam page, never got a proper release.

That used to bother me. Now? I see it differently.

These projects were never about shipping. They were about answering that childhood question. About understanding how games *actually work*. About playing with technology because it's fun, not because it'll make money.

Every hour I spent on Pathogenesis taught me something. Every line of code in ECSNetworkingCardGame made me better. The journey *was* the destination.

---

*This is Part 3 of my retrospective series. Next up: The Developer Tools Era, where I built an open-source mocking framework that everyone at work loved.*

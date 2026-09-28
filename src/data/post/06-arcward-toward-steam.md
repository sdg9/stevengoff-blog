---
publishDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'From Prototypes to Steam: Building Arcward'
excerpt: 'Arcward started with a cursor and a reactor. Getting it ready for Steam means thinking about saves, controllers, packaging, and what a successful test actually proves.'
image: ~/assets/images/posts/06-arcward-toward-steam.webp
category: Game Development
tags:
  - arcward
  - bevy
  - rust
  - steam
  - multiplayer
---

In my earlier game development retrospective, I wrote about the games I never really shipped. They answered questions I had carried around since childhood, taught me networking, and gave me an excuse to learn Kubernetes. A proper release was usually somewhere beyond the next interesting technical problem.

Arcward is making me spend more time in that territory beyond the prototype.

The premise is simple: protect a reactor in the center of the screen. Your cursor is your weapon. Moving it over enemies attacks automatically, and between encounters you choose upgrades. There's no separate fire button to hold down. The interesting decisions are where to aim, which threat deserves attention, and how to build a weapon that can survive the next wave.

That's a small enough idea to explain quickly. Turning it into something people can reliably launch, understand, and return to is a much larger project.

## A small action with room to grow

Arcward is built in Rust and Bevy. The underlying game rules live in a separate Rust simulation, while the client handles presentation, input, and the surrounding application. That separation lets me exercise the rules without opening a game window.

The game has grown to include a three-act run, upgrade drafts, different weapon choices, persistent progression, and co-op around a shared reactor. The browser version also has touch controls and optional calibrated tilt input. Underneath those additions, I want the central action to stay understandable: move your weapon where it matters.

Co-op adds a useful complication. Everyone is defending the same thing, but everyone still needs to understand their own contribution. Upgrade choices have to finish before the crew moves on. Menus, focus changes, and disconnected players all have consequences for other people.

Even pausing needs a clear rule. Solo play can pause when its window loses focus. An online session can't simply stop whenever one person changes windows; that player's weapon becomes inactive instead. It's a tiny behavior in a feature list and a very real part of playing together.

## The Steam build is a different milestone

As of September 27, Arcward has a public [browser version](https://arc.stevengoff.dev/) and native builds moving through Steam preparation. Windows, Linux, and macOS packages were uploaded and activated on the app's default Steam branch in September. The app itself remains unreleased.

That distinction matters. Uploading a build doesn't publish a store page or establish that every supported device works. Access to an unreleased app is still separate from a public launch.

The release records include a macOS download round trip through Steam, with the downloaded files checked against the package. That's useful evidence: the files that came back were the files intended for delivery. It doesn't prove someone can launch from their Library, invite a friend on another account, and complete an entire run together.

Those are their own checks. I want to keep that boundary visible while the project moves toward release.

## All the things surrounding the game

A prototype can make generous assumptions about its environment. A packaged game needs its fonts, audio, and runtime libraries in the right place. A save needs to survive an interrupted write. Controller focus needs to agree with the control that looks selected.

One recent Deck menu issue was exactly that last kind of problem. After touch or trackpad input, D-pad navigation could continue from a stale position. Pressing right from New run could land on Settings. The correction ties navigation to visible focus and keeps horizontal movement within the row. The candidate build still needs its physical device check.

Save synchronization has similar details hiding inside an apparently small feature. Account progression and device settings have different jobs. Moving a player's progress between computers shouldn't silently move every device preference with it. Arcward's Steam Cloud preparation separates those concerns and calls for cross-machine conflict and account-switching checks before treating the integration as complete.

This is release work, even when it doesn't produce a new enemy or a flashier attack.

## Tests help me ask better questions

The simulation makes automated balance experiments possible. I can run repeatable scenarios, compare changes, and investigate a particular setup without manually replaying everything from the beginning.

But a bot's results are evidence about that bot. They don't establish how a person understands a weapon or how a crew coordinates under pressure. Arcward's balance records explicitly distinguish automated comparisons from human feedback, and some adjustments remain provisional because the two don't tell the same story.

I like having both. Reproduction helps narrow down what changed. Play feedback helps identify what deserves attention.

The work now is to connect those layers: a game with a clear central action, rules I can inspect, and a delivery process that makes the actual experience dependable. Steam is giving that work a concrete destination. There's still a difference between a build being there and the game being ready, and finishing that distance is part of building Arcward.

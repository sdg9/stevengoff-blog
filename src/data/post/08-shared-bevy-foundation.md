---
publishDate: 2026-09-27T12:02:00Z
author: Steven Goff
title: 'The Infrastructure Behind My Growing Game Collection'
excerpt: "Shared input, networking, saves, and delivery checks help my Bevy projects benefit from each other's fixes without turning every game into the same application."
category: Development
tags:
  - rust
  - bevy
  - architecture
  - developer-tools
  - game-development
---

Once I have several games in progress, the recurring problems become hard to ignore.

A stick needs a dead zone. A menu needs to recognize one press instead of repeating it every frame. A package needs all its assets. A network connection needs to clean up after it ends. Solving those problems is useful; rediscovering them independently in every project is less appealing.

My **Game Foundation** repository is an attempt to give that work a shared home. It contains reusable Rust and Bevy pieces for networking, input, persistence, feedback, capture, and related tooling. The games adopt the pieces they need, at explicit versions.

The important design question is where the common behavior ends and the individual game begins.

## Share the mechanics, keep the decisions local

Controller input is a good example. Turning raw stick values into usable movement belongs in a shared utility. So does detecting a button edge or translating a D-pad press into a menu intent.

Deciding who may pause a round belongs to the game.

Skyward Family and Lantern & Leaves both need to associate controllers with players, but their lobbies and round structures are different. Arcward has its own concerns around local seats and online crews. Sharing the low-level mechanics doesn't remove those differences, and I don't want it to.

The foundation's input contract leaves joining, reconnect selection, pause policy, and Steam backend handling with the consumer. That boundary makes adoption smaller and gives each game room to evolve.

Networking has the same issue. A real-time movement game may need prediction and interpolation. A turn-based card game needs an authoritative sequence of legal actions and carefully filtered views of hidden cards. Making both import the entire same stack would add complexity without making their rules clearer.

The foundation therefore offers separate layers. The Card Room uses the smaller session layer for its optional Steam transport without importing the real-time movement and prediction stack.

## A shared dependency should be a deliberate change

Sharing source through a neighboring checkout is convenient until that checkout changes underneath another project.

The games use fixed Git revisions with committed lockfiles. A shared fix can be tested in the foundation, tried in an affected game, and then adopted explicitly. Moving one project forward doesn't silently move the others.

That matters because “works in the shared crate” and “works in this game” are different claims. An adapter might compile correctly while a game's menu assumptions are wrong. A save-writing helper might safely replace bytes while the game still needs its own recovery rules and file format.

The networking extraction also retains provenance: the source revision and file hashes record where the original code came from. It's a practical way to inspect what was copied and what changed afterward.

This is internal infrastructure for my projects. Having a GitHub remote doesn't mean the first-party packages are published or open source.

## Let the rules run without the window

Another recurring pattern lives inside the games themselves. Arcward separates its deterministic simulation from the Bevy client. Emberling separates fire spread, heat, and map rules from rendering and menus. Lights Out, Campers! has a pure Rust core for its rules and visibility calculations.

That makes it possible to ask focused questions without launching the whole application. Does the same seed reproduce the same scenario? Can an attack pass through a wall? Does an upgrade change the intended value?

It also supports automated runs that expose behaviors worth investigating. Those runs don't establish that a game feels good. They give me a repeatable place to start looking.

The browser networking work showed why the other kind of testing still matters. An actual browser run exposed an encoded server URL being read without decoding it. The networking code could compile for the browser while the connection never opened. Running the example uncovered a failure that compilation couldn't.

## Delivery has its own shared knowledge

Some reuse belongs in a checklist rather than a Rust crate.

My Steam Machine delivery checklist covers bundles, controller navigation, and the artwork Steam expects. A portrait cover alone isn't sufficient. The Library hero, transparent title logo, landscape image, and shortcut icon each have their own place.

That logo requirement came from a concrete failure: some installed games had covers but no logo for the Steam-button menu. Recording the fix once makes it available to the next delivery.

The foundation also has tooling to inspect staged bundle files and artwork. These checks help catch missing pieces before installation, but they don't establish that a menu is readable on the television or that a controller reconnects correctly. The delivery record still needs to say what actually ran.

That's the infrastructure I want behind this collection: small shared pieces, deliberate updates, and evidence attached to the claim it supports. Every game can keep its own rules and personality while benefiting from the work already done around it. The next prototype then starts a little closer to something someone else can comfortably play.

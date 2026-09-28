---
publishDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'My VR and Animation Workshop'
excerpt: 'VR tabletops, shared-room creatures, superhero traversal, and phone-based motion capture are different experiments with a common problem: making digital things feel right when people interact with them.'
image: ~/assets/images/posts/12-vr-animation-workshop.webp
category: Game Development
tags:
  - virtual-reality
  - mixed-reality
  - animation
  - game-development
  - side-projects
---

Some of my game projects begin with a rules question. Others begin with a movement question: what would it feel like to grab that card, swing between those buildings, or have a creature standing in the room?

Lately, the second group has grown into a small workshop of related experiments. There is a VR tabletop engine, a mixed-reality creature game, superhero traversal, an asset catalog, an animation lab, and an Android recording app.

They are at different stages, and this is a tour of work in progress. What connects them is the gap between getting something to run and making it feel convincing.

## A Tabletop Without the Fiddly Physics

My VR tabletop project takes a deliberately constrained approach: pieces snap into place instead of behaving like loose objects in a physics sandbox.

That choice fits the thing I want to explore. Picking up a card should help me play the game. It should not introduce a separate challenge of positioning it perfectly or recovering it from under the table.

The engine separates game rules from the shared tabletop, with an authoritative server coordinating play. Seven Wonders Duel was the first proof game. There is also Lanternwatch, an original two-player cooperative boss deckbuilder.

The client supports touch and desktop use alongside VR. A player in a headset and a player on a tablet can use the same game session. I like that flexibility: an experiment with VR does not have to require everyone to participate through the same device.

There is still a difference between verifying the rules and verifying the interaction. Automated clients can establish that a move reaches the server and produces the right state. They cannot tell me whether a pinch feels reliable inside a headset. That part needs actual device review.

## Creatures in a Shared Room

The mixed-reality experiment takes the opposite spatial approach. Instead of entering a virtual tabletop, players see their real room through Quest passthrough, with creatures placed into that space.

The Pokémon-themed prototype is designed around two Quest 3 headsets in the same room. Catching leads into menu-driven battles, while shared spatial alignment is supposed to put a creature in the same physical place for both players.

That last requirement is the interesting one. Agreeing on game state over a network is only part of the problem. Both headsets also need to agree about where the room is.

The project has automated coverage for parts of catching and battling, but shared-space alignment and in-headset interaction still require manual checks. It is a personal prototype, not an announced Pokémon product or a claim that the full two-headset experience is finished.

## Superhero Movement Is a Collection of Problems

The superhero experiment includes a playable Chicago traversal and cooperative-combat candidate built with Bevy. Earlier graybox work isolates running, jumping, swinging, reeling, and landing with a placeholder character.

Even that stripped-down version has a lot going on. The camera needs to remain useful near walls. A swing needs an anchor. Releasing the swing needs to preserve a sensible trajectory. Landing needs to agree with the building beneath the character.

Then animation adds another layer. A character can follow the correct route while its arms look wrong. A web can attach to the intended point while the hand fails to look like it is holding anything.

Those are separate problems, and they are easier to reason about when I can inspect them separately.

## Meshforge and Motion Lab

Meshforge gives me a local catalog for generated assets, including their provenance, metadata, and animation clips. I can orbit a model, choose a standard view, freeze an animation frame, and inspect its bones.

That is useful before an asset gets buried inside a larger game. It also keeps a record of where a model came from and which artifact I am actually reviewing.

Motion Lab goes further into behavior. It is a Bevy workshop where I can describe an outcome, have AI agents prepare a candidate, and then watch or play it. The scenarios include locomotion, web traversal, powered flight, casting, and combat motion. A small cooperative arena provides a two-controller reference as well.

It is still a workshop. A valid model file does not prove that the feet stay planted or that a transition looks good. Acceptance belongs to the particular character and scenario being reviewed. That makes the saved captures and repeatable reviews valuable: they give feedback a specific target.

## Starting with Phone Video

The Android motion-capture project starts at an earlier stage: recording real movement.

The app records front-camera takes, saves them on the phone, and uploads them to a local receiver. Device labels keep recordings organized for the downstream retargeting workflow.

The current version does not synchronize the phones automatically. Recording starts and stops separately, with a clap available as a reference for alignment afterward. It is a capture tool, not a complete motion-capture studio in an app.

I like how these projects fit together without needing to become one giant system. The tabletop asks whether an interaction is comfortable. The shared-room prototype asks whether space lines up. The animation tools let me inspect what a character is actually doing.

Each gives me a smaller question I can work on, play with, and improve. That is enough reason to keep the workshop going.

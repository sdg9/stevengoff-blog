---
publishDate: 2026-09-27T12:01:00Z
author: Steven Goff
title: 'Building Games My Family Can Actually Play'
excerpt: 'A one-button tower, a moonlit game of hide-and-seek, and a camp full of butterfly nets are changing how I think about controls, assistance, and getting everyone into a game.'
image: ~/assets/images/posts/07-family-games.webp
category: Game Development
tags:
  - family
  - game-development
  - controllers
  - bevy
  - accessibility
---

A game can run perfectly on my development machine and still be awkward to play from a couch.

Maybe starting requires a keyboard. Maybe the controller works during a round but can't close the results screen. Maybe the person learning the controls has to compete under exactly the same conditions as the person who wrote them.

Building games for my family makes those details part of the design. I want the path from picking up a controller to doing something fun to be short. Several of my current projects explore that idea in different ways, from dropping a house onto a tower to sneaking through a moonlit garden.

They're at different stages, and there's still physical hardware testing to do. But together they're giving me a much more concrete definition of “playable.”

## One button, different amounts of help

**Skyward Family** is a tower-stacking prototype. A house swings above the tower, and the current builder presses a button to release it. In Together mode, everyone contributes to one tower. Team race gives two teams their own stacks.

The basic action is easy to explain, but timing a landing still takes practice. Each builder can have a different assistance level, ranging from no help to a magnet that guarantees alignment. Assistance also reduces the demands of swing speed and wind.

That gives me a way to put different abilities in the same round without requiring everyone to meet the same threshold first. Someone can concentrate on recognizing their turn and pressing the button while another player concentrates on precision.

The houses keep their builder's color, so the tower also records who contributed each piece. Small rooftop residents and landing effects give the result some personality without changing the scoring rules.

It's still a feasibility prototype. The game supports five controller bindings in its code, and there's a native Linux installation on the Steam Machine. The actual five-controller setup remains an explicit test to perform. I can't infer that Bluetooth, Steam Input, and every controller will cooperate just because the lobby has five slots.

## Hiding when everyone can see the screen

**Lantern & Leaves** starts with another familiar action: hide from the person who is it. Two to five players share a garden, and one woodland character carries a lantern.

Sharing a screen creates an obvious design constraint. Everyone can remember where everyone else went. The game uses bushes, solid cover, quiet movement, and temporary reveals to create concealment, but it doesn't promise secret information.

That honesty helps define the game. It's a chase with opportunities to disappear and change direction. Running reveals you. Sneaking helps you stay hidden. The lantern creates pressure without requiring a separate display for every player.

Its modes also change what happens after a catch. Lantern Hunt has caught players sit out the rest of a short round. Freeze & Rescue lets a teammate free them. Firefly Heist sends them back after a brief delay and makes collecting and banking fireflies the shared objective.

Those are different answers to an important question for a family game: how long does someone wait before they can do something again?

## A separate screen changes the rules

The camp chase project, now called **Lights Out, Campers!**, explores the other side of that decision. Campers repair fuse boxes and try to escape, while Counselors chase them with butterfly nets.

Each player sees their own view. Counselors have a forward-facing vision cone; campers can see around themselves. The room server sends each player only the information their character is permitted to see. Here, limited information is part of the rules, rather than an agreement between people looking at one television.

Bots fill empty seats, which makes solo practice possible without assembling a group first. Online room behavior has been checked with two clients on one machine. Public internet hosting is still a separate deployment step, so I wouldn't describe it as a finished online service.

The project is a useful reminder that a playful theme doesn't automatically make a game simple to deliver. Separate screens bring room joining, connection handling, and server operation along with them.

## The menus count too

Across these projects, I'm treating controller navigation as part of the game itself. Joining, choosing settings, pausing, replaying, and quitting all need attention.

Shared screens also need rules about who controls shared menus. Skyward Family defaults to host-only menu access, while allowing that policy to change. Lantern & Leaves marks its host and pauses when a controller disconnects. These decisions keep one player's input from unexpectedly changing everyone else's experience.

There's still plenty to tune, and automated checks can't tell me whether a turn cue is obvious across the room. That's why the next useful test for a couch game can be very ordinary: put it on the television, connect the actual controllers, and see whether everyone can get through a round.

I still enjoy the technical puzzle. Building for my family gives the puzzle a clear purpose: make the software get out of the way quickly enough that we can play.

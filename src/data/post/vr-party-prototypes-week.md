---
publishDate: 2026-07-30T12:00:00Z
updateDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'Lava, a River Raft, and a Squirt Gun: A Week of VR Party Prototypes'
excerpt: 'In one week at the end of July I started three quick WebXR party games for the Quest 3. A headless, emulated headset did a lot of the testing. It still could not tell me whether any of them were fun.'
image: ~/assets/images/posts/vr-party-prototypes-week.webp
category: Game Development
tags:
  - virtual-reality
  - webxr
  - testing
  - prototypes
  - game-development
---

At the end of July I went on a small VR binge. In six days I started three party-game prototypes for the Quest 3: the floor is lava in your actual living room, a river raft you stand on, and a hide-and-seek game where one person wears the headset and everyone else plays on their phones.

None of them is finished. All three run in the Quest browser over WebXR, share most of a stack, and taught me the same lesson three ways.

## The Floor Is Lava

I started on the evening of July 25 with a PRD. The pitch: your real room becomes stepping stones over lava, and you physically hop, stretch, and balance your way across. Journey mode is a route to a gold goal stone; Zen Splash is a no-fail field of stones to stomp on.

The PRD made one thing non-negotiable: the game had to run on a desktop without a headset, so agents could test it themselves. That meant Playwright driving headless Chromium, with Meta's IWER runtime standing in for `navigator.xr`. Tests enter a real XR session and move a fake head and hands around. The first gameplay tests driven that way landed less than 90 minutes after the first commit.

Before bed I left an overnight run going. The next morning, its self-playtest log opened with this:

> It cannot tell you whether the game is fun.

What it could tell me was arithmetic. Across 1,240 generated stone pairs, there was never lava underfoot between one stone and the next: the "still standing" radii bridged any gap under 0.96 m, and the longest route gap was 0.95 m. In the smallest room the game accepted, 86% of the floor was safe. The lava was basically decoration.

The log didn't change any constants. It added a tuning-panel readout so I could watch the game cross into "real gaps" while turning knobs. The machine measures; I decide what feels generous.

The overnight run also found that hazards from the Saboteur, a phone companion for people outside the headset, never reached the game at all. Every piece looked fine on its own; nothing had checked the whole path.

### The room is the hard part

Then I put on the headset, and the problems stopped being arithmetic.

My Quest boundary spanned more than one room and a hallway, and the game used only a rectangle in the biggest area. The fixes came in layers: a probe that asks the device what it knows, routes that follow the room's shape, then a playfield built from the Quest's scanned scene model. Then the scan and the boundary disagreed, and the game routed me outside my own safe area. The last commit, on July 27, logs one against the other before building any rule on it. That's where I left it.

## The River Raft

On July 27, I started a raft game. You stand on a virtual raft in passthrough while a river flows past. The design had one gate on everything else: a comfort spike. If a six-year-old couldn't stand on the raft for ten minutes without feeling sick, the idea would be retired cheaply, before any gameplay existed.

One decision from the spec stuck with me: the fade between the virtual river and the real room is anchored to the deck, not your head. A head-anchored seam would slide across your vision with every step, causing the very sickness the test was trying to measure.

The spike had three dials, a ramp, and a run recorder with voice notes. Honestly? The recorder logged 14 runs, and most are me stopping a few seconds in with "bored." The next morning I asked for obstacles. By that evening the raft had branches to duck under, a sandbar, gems to grab, and a river that moved on a beat.

### Tests that measured nothing

The raft also made me look harder at the tests. One render-order test for the raft's rim still passed after the setting was deleted, because the WebXR library's own pointer rays sat at the same render levels. It was the fifth assertion in that build that didn't measure what its name claimed.

Two rules came out of it. Every spec fails on any uncaught page error. Scene assertions find objects by name, not by value. I'd rather have fewer tests I trust than a big green number that's lying.

## Chameleon Party

On July 28, I started the third, inspired by MECCHA CHAMELEON, where hiders paint plain white bodies to blend in. In my version, hiders use their phones to place, pose, and paint a white doll to match the scenery. The seeker hunts them in VR with a squirt gun, and one hit washes the paint off.

The painting code came from the miniature-painting feature in my VR tabletop, multiplayer is Colyseus 0.17, and the IWER harness came across on the first afternoon. Phone hiders, flat seekers, and VR seekers all had automated specs against a live game server before I tried it on a real device.

Then came the playtest notes. Painting an arm painted the entire arm. Eyedropped colors didn't match the wall. The auto-camouflage "magic skin" looked, in my words, "more like you're drawing a mirror than a chameleon": it painted what reflected off the doll, not what was behind it. That took three passes, ending with a flat decal baked from the surface's actual color instead of a lit render.

The maps grew fast: a den, a house, a museum hung with famous paintings to hide in front of, and Blockville, a voxel village. Hiders got a taunt whistle. Joining by room code from a second device didn't work until it got its own tests. By July 30, the lobby, round flow, and a "play again or back to lobby" choice were merged into main.

## What Carried Across

The three repos grew into a toolkit I now expect in every VR project:

- **Hold both thumbsticks to file a ticket** with a screenshot, console, scene state, and voice note.
- **Wireless adb** to pull headset photos and logs without a cable.
- **Tuning panels** so I can adjust feel while standing in the game.
- **The IWER + Playwright harness,** plus its traps. `@pmndrs/xr`, for example, fetches controller profiles from a CDN and injects its own emulator; both have to be switched off before the fake headset behaves.

The harness turned "does this even load in XR?" from a trip into the headset into a command. But every repo ended in the same place. The automated tier can say whether the lava is there. Only a person on one foot in the living room can say whether it's any fun.

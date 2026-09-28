---
publishDate: 2026-04-12T12:00:00Z
updateDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'Hide-and-Seek, Crayons, and Monsters: Small Games for My Kids'
excerpt: 'A spotlight that hunts for hiding Pokémon, a coloring app for the Steam Deck, and a phone-based monster drawing party game. Small games for my kids taught me more about controllers and playtesting than I expected.'
category: Game Development
tags:
  - family
  - game-development
  - phaser
  - controllers
  - steam-deck
---

Last December I wrote about making a Pokémon survivors game with my kids in an afternoon. That one didn't end the streak. Over the next few months, the living room kept turning into a place to test tiny games.

None of these were meant to be products. They were built for three kids, six and under, a TV, a Steam Deck, and a few controllers. Three of them belong together: a hide-and-seek game, a coloring app, and a monster drawing party game.

## Hide-and-seek with a spotlight

On December 26, I started a new Phaser project with a simple pitch: couch co-op hide-and-seek for one to four players on a shared screen.

The map has trees, bushes, and rocks. Players walk behind them to hide. Someone presses Start, a five-second countdown runs, and then a spotlight begins wandering the map. It slowly grows until it finds someone. Keep a player in the light for a second and that player becomes "it," with a smaller spotlight of their own to help find everyone else. When the last player is found, the round ends and Start begins another one.

The first day was mostly about making hiding actually work. My notes include "I'm hiding behind a tree, yet the spotlight beelines right to me." After collision and terrain fixes, the spotlight got a little smarter: if you're mostly exposed, it paths toward you; if you're hidden, it keeps searching in the direction it was already going.

Then came the small giveaways. A player label floating over a bush reveals the hiding spot, so labels disappear while you're hidden. An invisibility dash was fun until its cooldown indicator drew *above* the trees. I fixed that on New Year's Day.

## The controller detour

My kids play with 8BitDo controllers connected to the Steam Deck, and the Deck plugs into the TV. In a browser, those controllers didn't report the buttons I expected. At one point, pressing Start on the controller registered as RT.

When I came back in March, I stopped patching it per game. I planned to build a lot of quick couch co-op prototypes for my kids, and I didn't want to troubleshoot controllers every time.

So I made a separate controller-test project that shows every button press, maps each button one at a time, and saves the result as a reference for other games. It answered questions I had been guessing about: these controllers report a non-standard layout over Bluetooth, the D-pad shows up as axes instead of buttons, and extra back buttons shift the numbering of everything after them. Switching the controller's input mode didn't change any of it.

There was also a Steam-side problem. Steam created a virtual controller for every physical one, and Chrome only allows four gamepads. Each real controller took two slots.

## Making getting caught less final

By April, the hide-and-seek game had a problem: once you were found, there wasn't much you could do. The spotlight and the new "it" could corner you.

On April 12 I replaced the colored circles with Pokémon sprites and wrote a design spec for character abilities. Each of the five characters now has a passive plus one ability on A. Pikachu can teleport to nearby cover. Squirtle drops a smokescreen. Bulbasaur fades out while standing still. Jigglypuff can leave a decoy for the spotlight to investigate. Once the first player becomes "it," the spotlight disappears and the game becomes a chase. That player's A button switches to a hunter ability, like Squirtle's slowing puddle or Pikachu's sonar ping.

One feature came straight from a bug. Jigglypuff's sprite was tiny compared to Squirtle. The kids thought it was hilarious that they were babies, so I kept the joke and turned it into a map pickup: a tiny mushroom that shrinks whoever grabs it for the rest of the round, a bit like the mini mushroom in Mario. A berry, a pepper, and a skunk joined it as pickups.

It all landed as one commit touching 27 files while I playtested. One of the last fixes that day removed a cooldown dot above each player because it revealed positions. Same lesson as December.

## A coloring app for the Deck

A week earlier, on April 4, I built a kids' drawing app. It was a Phaser canvas meant to run on the Steam Deck, with crayon, marker, and pencil tools and a color palette.

The first hour was humbling: clicking left a single dot, and dragging drew nothing. Once a team of agents tracked that down, the requests became much more kid-shaped. Hide the mouse cursor while drawing. Don't wipe the picture when the page reloads. Add coloring pages with a fill tool.

Fill was the interesting problem. Coloring-page lines have tiny gaps, so filling a rocket wing green flooded the whole page. After a few rounds, fill respected small gaps, colored right up to the lines, and could replace an existing fill. Saturated reds were briefly mistaken for outlines, too.

The app ended the day with 21 commits and 79 coloring pages, including a unicorn, mermaids, and two Minecraft pages. It also had LB/RB undo and redo, button animations, and an Electron build with a fallback: load the dev server from my laptop when it's reachable, and the bundled copy when it isn't.

## Monsters drawn by committee

That afternoon I briefly asked how something like *Harold and the Purple Crayon* could work: a kid draws something, and it comes to life to fight an enemy. I didn't build that one.

What I did build that evening was **monster-draw**, a Jackbox-style party game. The TV shows a four-letter room code and a QR code. Players join from phones, and each draws one part of a creature, like the head, body, or legs, without seeing the others. When the timer ends, the TV reveals the stitched-together creature with a silly generated name.

The first test rounds found the usual bugs. Drawings didn't show up in the reveal, there was no Play Again button, and a drawing disappeared if the player didn't press Submit before time ran out. Those were fixed that night.

The next day brought design feedback. Always getting legs wasn't fun for a kid, so part assignments now rotate and shuffle between rounds. Parts also didn't line up well, so each theme now shows faint neck and waist guides on the seams. With those guides, a knight's head and body have a better chance of meeting in the middle.

## What stuck

The details that took the most time weren't the headline features. They were controller mappings, hidden labels, auto-submitted drawings, and reloads that don't erase anything. That's where a kid's game is won or lost. If a reload wipes a picture, the game broke a promise. If an indicator shows where someone is hiding, the hiding game stops working.

Hide-and-seek came back later in a different form, which I've written about with my current family games. The controller lesson carried forward too. I don't want every new prototype to begin with finding out which button is Start.

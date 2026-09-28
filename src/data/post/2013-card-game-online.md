---
publishDate: 2013-11-27T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'An Online Card Table for Any Game'
excerpt: 'Before the later co-op deckbuilders, a 2013 project aimed to let friends bring their own card images to a shared virtual table.'
image: ~/assets/images/posts/2013-card-game-online.webp
category: Project Archive
tags:
  - project-archive
  - angular
  - firebase
  - card-games
---

Long before my later co-op deckbuilding attempts, I had a broader idea: **let people bring their own cards and play together online**.

The description of my 2013 Bitbucket repository, Card Game Online, says it plainly: play any card game with friends by uploading your own card images to a virtual table.

## A table before a rules engine

That is a different starting point from implementing a particular game. A virtual table gives people objects to move around; the players can supply the rules. It is an appealing way to approach all the card games you might want to play without writing a separate engine for each one.

The surviving source is more than an empty README. There are game and container views, dialogs, a canvas experiment, and a stage directive. The games module uses AngularJS and brings in Firebase, a drag-and-drop directive, local storage, and UI components.

Those files show the shape of the experiment. They do not establish that every promised feature worked, or that I launched a service people used. The repository preserves three Steven Goff commits on November 27, 2013: an initial README, the project files, and a follow-up README change.

## A surprisingly persistent interest

Looking back from the [later co-op deckbuilder](/2019-coop-deckbuilder), the familiar part is the desire to put friends around a shared game. The technology and the amount of custom game logic changed; the attraction of making a table people could gather around was already there.

This is one of the reasons the Bitbucket archive matters. Without it, I would have dated that thread of my work several years too late.

---

_From the Bitbucket archive. Written in September 2026 from private repository history and recollection; the date above marks project work, not original publication. Cover art is a conceptual illustration. Private source code is not reproduced._

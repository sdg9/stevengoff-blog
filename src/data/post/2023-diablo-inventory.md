---
publishDate: 2023-07-02T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Reading Loot Tooltips So I Could Read Fewer Loot Tooltips'
excerpt: 'The Diablo 4 inventory experiment combined OCR, item rules, and tests to help sort the aftermath of a run.'
image: ~/assets/images/posts/2023-diablo-inventory.webp
category: Project Archive
tags:
  - project-archive
  - gaming
  - python
  - ocr
---

The goal in the **diablo4-inventory** README is delightfully specific: spend less time reading items after a run.

The project used OCR and item-desirability rules. One script watched hovered inventory, stash, or vendor items and reported whether an item looked worth keeping. Another worked through inventory slots to mark items as junk.

This wasn't a general-purpose vision system. It was a tool aimed at a particular repetitive part of a game.

## Reading the words isn't enough

The notes identify a good example of the problem: swords naturally display critical-strike damage, so simply finding that text could be misleading. The tool needed to distinguish the inherent property from another occurrence of the affix.

A July 2 commit explicitly works on sword matching and OCR sanitization. Nearby changes update tests and handle situations where moving to another item didn't refresh the displayed information as expected.

That is the interesting engineering here. The program needs both a usable reading of the screen and rules that interpret the reading correctly.

The README also limits its own claims: early-stage scripts, resolution assumptions, and known bugs. Those constraints are part of the historical project, not setup advice for running it against today's game.

As a side project, it fits a recurring pattern: notice an activity I keep doing, describe the decision behind it, then discover how many exceptions the description left out.

---

_From the project archive · Q3 2023. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

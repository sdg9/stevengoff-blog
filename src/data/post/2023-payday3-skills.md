---
publishDate: 2023-09-19T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Payday 3: Returning to the Skill-Calculator Idea'
excerpt: 'The sequel brought new skill data, point limits, and shareable builds—and another chance to apply an old project pattern.'
image: ~/assets/images/posts/2023-payday3-skills.webp
category: Project Archive
tags:
  - project-archive
  - gaming
  - web-development
  - side-projects
---

September 2023 brought another skill calculator, this time for **Payday 3**.

The concept was familiar from Payday 2, but the implementation still had a new set of details to settle. The history starts with sample skill data and placeholder buttons, then moves through build serialization, point limits, and updates to match the game's launch data.

## A build needs to survive a link

The September 18 URL-serialization fix is a useful detail. Selecting skills is only one part of a calculator. Being able to send that selection to someone else makes it a much more useful companion tool.

The next day's commits work on the skill-point UI and allow the maximum point count to be edited. Those changes make the rules around the selection explicit rather than leaving them as an invisible assumption.

The repository also documents separate deployment branches for testing and production. Even a familiar side-project idea needs a way to inspect a change before everyone receives it.

The [earlier retrospective](/04-developer-tools-gaming-tools) talks about trying to repeat the Payday 2 experience. These commits don't establish that the new calculator had the same audience. They show the part I could directly work on: turn the new game's data into something understandable, navigable, and shareable.

Returning to an old idea doesn't remove the work. It gives that work a familiar starting point.

---

_From the project archive · Q3 2023. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

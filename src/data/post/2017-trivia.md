---
publishDate: 2017-12-04T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'A Trivia Game Is Also an Argument about Answers'
excerpt: 'A React and Firebase trivia project turned small rules about numbers, short answers, and final scores into real implementation work.'
image: ~/assets/images/posts/2017-trivia.webp
category: Project Archive
tags:
  - project-archive
  - web-development
  - games
  - firebase
---

The late-2017 **TriviaWeb** history has the shape of a game becoming more specific.

The project used React and Firebase. By early December, my commits included final scores, answer persistence fixes, exact matching for numbers, and exact matching for answers three characters long or shorter.

Those are small rules with a large effect on whether a trivia game feels fair.

## What counts as correct?

A short answer gives a matching system very little room for interpretation. A number often needs to mean exactly the number entered. Persisting an answer at the wrong time can be just as confusing as grading it incorrectly.

The commit messages don't describe a sophisticated language-understanding system, and I don't need one to find the work interesting. They show a more practical problem: take a familiar game and make its rules precise enough for software to apply them consistently.

The final-score change on December 4 adds another important boundary. A game needs to communicate its ending, not merely accept answers while a round is active.

This was a shared project, and these are the changes attributed to me rather than a claim to everyone else's work. Looking back, it sits neatly between the app experiments and the later multiplayer games. React and Firebase were the tools, but the underlying questions were game-design questions: what does the player enter, when does it count, and how do they know what happened?

---

_From the project archive · Q4 2017. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration. Source: [TriviaWeb](https://github.com/BMBros/TriviaWeb)._

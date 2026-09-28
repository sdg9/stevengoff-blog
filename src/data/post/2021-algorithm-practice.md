---
publishDate: 2021-09-28T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'A Few Evenings with Trees, Lists, and Sorting'
excerpt: 'AlgorithmPrep traded game infrastructure for small TypeScript problems with clear inputs and checkable results.'
image: ~/assets/images/posts/2021-algorithm-practice.webp
category: Project Archive
tags:
  - project-archive
  - typescript
  - learning
  - algorithms
---

The September 2021 **AlgorithmPrep** commits are a change of scale.

Instead of a lobby, a renderer, and a server, the work is about binary search, linked lists, binary trees, and sorting. The repository starts with TypeScript tooling, Jest, and linting, then adds implementations and exercises over the next few days.

That is a very different feedback loop from building a multiplayer game. A problem can fit in one file, and a test can describe exactly what result is expected.

## Small problems expose assumptions

One September 28 commit fixes sorting in a rotary-lock exercise “on some machines.” It is a useful reminder that even a compact algorithm can carry an environmental assumption.

Writing down the expected ordering and checking edge cases makes those assumptions easier to see. The setup work around the exercises—tests, formatting, and a quick run loop—helps keep attention on the actual problem.

I don't need to attach an invented career milestone to this repository. The visible story is practice: implement familiar structures, work through problems, and correct the behavior when a case disagrees with the first attempt.

The appeal is easy to understand alongside the larger projects. Sometimes it is satisfying to close the loop on a small, well-defined question before returning to software where the boundaries are much less tidy.

---

_From the project archive · Q3 2021. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration. Source: [AlgorithmPrep](https://github.com/sdg9/AlgorithmPrep)._

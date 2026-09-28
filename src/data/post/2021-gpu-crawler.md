---
publishDate: 2021-06-10T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'A Tiny Crawler during the GPU Shortage'
excerpt: 'A stock-checking script reduced one repetitive task to a periodic check and an email notification.'
image: ~/assets/images/posts/2021-gpu-crawler.webp
category: Project Archive
tags:
  - project-archive
  - typescript
  - automation
  - personal-software
---

Not every project in the archive wanted to become a game or an application. **BestBuyCrawler**, from June 2021, wanted to notice when a product's availability changed.

The README describes checking a configured product page every minute and sending an email when the item was no longer marked “Coming Soon.” The same day's commits record a working crawler with notification behavior, then an idea for checking a list of cards instead of only one.

## One signal was enough

The wider [retrospective](/03-game-dev-deep-dive) places this in the GPU-shortage period. The code history gives the idea a very small shape: periodically ask the same question, then interrupt me when the answer changes.

That is a useful kind of automation. It doesn't need a polished dashboard if the whole point is to stop looking at a page repeatedly.

The repository doesn't establish that I bought a card because of it. It also contains older boilerplate history, which shouldn't be confused with the crawler starting in 2020. The project-specific work is the June 10 sequence.

Looking back, this is a good counterweight to the ambitious multiplayer projects. Sometimes the right size for a side project is one script and one notification. The interesting design decision is knowing when that is enough.

---

_From the project archive · Q2 2021. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

---
publishDate: 2025-12-16T00:00:00Z
author: Steven Goff
title: "Smart Homes & Tax Crusades: When Side Projects Meet Real-World Impact"
excerpt: 3D-printed sensor cases, Home Assistant automations, and going door-to-door helping strangers win property tax appeals. The story of when my tinkering habit actually started solving real problems.
image: https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
category: Retrospective
tags:
  - home-automation
  - iot
  - tax-tools
  - side-projects
  - nodejs
---

## The Tinker Phase (2017-2019)

After the Payday 2 success, something shifted. I wasn't just building apps for games anymore—I was looking around at the real world and thinking, *"How can I automate this? How can I solve this?"*

My GitHub from this era reads like an ADHD fever dream: `Home-AssistantConfig`, `NodeMCU`, `tax-api`, `tax-web-client`, `tax-monorepo`. I was bouncing between smart home sensors and property tax software like they were equally interesting problems.

Because to me, they were.

### The Smart Home Deep Dive

Home Assistant had just started gaining traction, and I was hooked. But I wasn't satisfied with buying commercial sensors—they were expensive, limited, and frankly, not as fun as building my own.

So I started building multi-purpose sensors using NodeMCU boards. Each one packed:
- Temperature sensors
- Light sensors
- Motion detection
- All in a 3D-printed case I designed myself

The cost? A fraction of what commercial sensors would run. The satisfaction? Immense.

My favorite automation was simple but effective: detect motion, check the ambient light level, and decide whether to turn on the lights. No apps, no voice commands—just the house responding to you being there.

Looking at the commits:
- **Q3 2017**: 14 commits on Home-AssistantConfig, 6 on NodeMCU
- **Q1-Q2 2018**: Still iterating, plus experimenting with `git-review-stats` and `RewardsPoints`
- **Q3 2018**: 5 commits on the tax API, and the pivot begins

The smart home stuff never became a product. It was pure hobby—building for the joy of having a house that felt slightly magical.

### Rich Dad Poor Dad and the Tax Crusade

Then I read Rich Dad Poor Dad.

Say what you will about the book, but it lit a fire under me. Suddenly I wasn't content just building things for fun—I wanted to build something that would make a real difference. Something that could generate actual income.

I started looking at property taxes.

### The Data Pattern

I live in Lake County, and property taxes here are... complicated. But I noticed something while poking around the data: there were patterns. Assessments that didn't make sense. Properties that were clearly overvalued compared to similar homes.

So I built a system to find them.

`tax-api`, `tax-web-client`, `tax-monorepo`—these repos consumed hundreds of commits across 2018 and 2019. At the peak (Q2 2019), I had **725 commits in a single quarter**. I was possessed.

The software could analyze property data for Lake County and identify homes that had strong cases for appeal. Not gut feelings—actual data-driven comparisons to similar properties.

### Door to Door

Here's where it gets real.

I didn't just build the software. I went door-to-door, helping people appeal their property taxes. Strangers. Neighbors. Anyone who would listen.

Out of the dozens of people I helped, **only one lost their appeal.** The rest won. People were saving hundreds, sometimes thousands of dollars on their property taxes because of software I'd built in my spare time.

It felt incredible.

### The Attorneys and the Fizzle

I tried to scale it. The idea was to license the software to attorneys who specialize in property tax appeals. There's a lot of red tape around non-attorneys appealing on behalf of homeowners, but attorneys could use the tool and take it to a much larger scale.

I had meetings. I made pitches. And then...

It fizzled.

The deals didn't materialize. The momentum slowed. And eventually, I found myself drawn to the next shiny project.

That's the honest truth of side projects: most of them end not with a bang, but with your attention drifting elsewhere. And that's okay. The tax project taught me more about real-world data analysis, about building full-stack applications, about actually helping people—than any tutorial ever could.

### The Commit Pattern

The data tells the story better than I can:

| Quarter | Commits | What Was Happening |
|---------|---------|-------------------|
| Q3 2018 | 15 | Tax API prototype |
| Q4 2018 | 224 | Full steam on tax-web-client and tax-api |
| Q1 2019 | 122 | Refinement phase |
| Q2 2019 | 725 | Tax monorepo explosion, plus early game dev |
| Q3 2019 | 340 | nxtax (rewrite), still going strong |
| Q4 2019 | 52 | Winding down, Advent of Code distraction |

You can literally see the arc of a project in those numbers. The spark, the obsession, the plateau, and the gradual handoff to the next thing.

### What Carried Forward

Even though the tax project didn't become a business, it wasn't a failure. I learned:
- How to build full-stack applications with real users
- How to analyze large datasets for patterns
- That going door-to-door and talking to real people is scary but rewarding
- That motivation fades if you're building for money instead of curiosity

That last one stuck with me. The further I got from reading Rich Dad Poor Dad, the less motivated I was to grind on tax software. My natural motivation is learning new things, not making money. And that's fine—I have a stable day job. These side projects are supposed to be fun.

### The Transition

By late 2019, I was already splitting my attention. `AdventOfCodeTS` shows up in Q4 2019—my first foray into coding challenges. And lurking in the background, `Coop-Deckbuilder` had started getting commits.

Game development was calling again. This time, I'd answer differently.

---

*This is Part 2 of my retrospective series. Next up: The Game Dev Deep Dive, where Among Us inspiration led to Kubernetes clusters and proximity-based chat systems.*

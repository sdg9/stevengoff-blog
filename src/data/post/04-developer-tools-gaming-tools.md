---
publishDate: 2025-12-18T00:00:00Z
author: Steven Goff
title: "Developer Tools & Gaming Utilities: Open Source, Inventory Managers, and Another Payday Sequel"
excerpt: Building Mezzo (a mocking framework everyone at work loved), OCR inventory sorting for Diablo 4, and trying to recreate Payday 2 magic with Payday 3. Some projects succeed, some flop hard. Here's both.
image: ~/assets/images/posts/04-developer-tools-gaming-tools.webp
category: Retrospective
tags:
  - developer-tools
  - open-source
  - gaming-utilities
  - react-native
  - ocr
---

## When Side Projects Meet Day Job (2022-2023)

The game dev intensity had faded. I was in a different headspace, less about building worlds and more about building tools. The kind of projects that scratch very specific itches.

This era split neatly into two streams: developer tools that actually helped my team at work, and gaming utilities that helped me optimize my hobbies.

### Mezzo: The Mocking Framework Nobody Asked For

Let me tell you about Mezzo.

At Walmart Labs, there was this mocking framework called Midway, part of their Test Armada suite. When I joined my current company, I missed having something like it. Mobile development (especially React Native) desperately needs good API mocking. Testing against real backends is slow, flaky, and often impossible when the backend team is two sprints behind you.

So I built Mezzo.

`caribou-crew/mezzo` was an open-source mocking framework with a visual interface tuned specifically for mobile development. You could:
- Define mock responses declaratively
- Switch between scenarios with a UI
- Record and replay actual API traffic
- Run it locally or in CI pipelines

I open-sourced it. I wrote documentation. I gave it a real shot.

The commits tell the story:
- **Q2 2022**: 179 commits on Mezzo (the big push)
- **Q3 2022**: 18 commits (versioned components experiments)
- **Q1 2023**: 8 more commits (maintenance mode)

### The Adoption Problem

Mezzo never gained external momentum. Open source is brutal that way. You can build the best tool in the world, but if nobody knows it exists, it might as well not.

But here's the thing: my team at work *loved* it.

I brought Mezzo to my day job. Everyone was impressed. It solved real problems we faced daily with React Native testing. People actually used it.

Then I had to rewrite it.

Performance issues. Architectural decisions I'd made early on that didn't scale. The kind of technical debt that accumulates when you're building fast and learning as you go.

The rewrite happened at work, on work time. The open source version stayed frozen. It never became a widely-used project, but it made my team's lives better. Sometimes that's enough.

### The Versioned Components Rabbit Hole

Q3 2022 shows a weird side quest: `react-native-versioned-components-yarn1`, `node-versioned-components`, `react-native-versioned-components`.

I was obsessed with solving the problem of maintaining components across multiple versions of React Native. When you support old app versions, you need component code that works on old RN versions *and* new ones. It's a nightmare.

I explored several approaches. None of them were particularly clean. The problem might be fundamentally unsolvable without ugly trade-offs.

The commits exist. The solution... I'm still looking for it.

### The Celsius Incident

Q4 2022 is dark comedy: `celsius-pdf-data`, `celsius-stats`.

For those who don't remember, Celsius Network was a crypto lending platform that famously went bankrupt in 2022. I had funds there. When they released PDF statements, I wrote scripts to parse them and understand what I'd lost.

Sometimes side projects aren't fun. They're just necessary.

### Payday 3: Lightning Doesn't Strike Twice

Then Payday 3 was announced.

I'd struck gold with Payday 2: millions of visitors, an NDA with the studio, actual revenue. The formula seemed repeatable. Make a skill calculator before anyone else, be the go-to resource, profit.

I even rallied a team this time. Four developers total, coworkers and gaming friends. `caribou-crew/pd3skills` started taking shape. We were organized. We had meetings. This was going to be bigger than the original.

Then Payday 3 launched.

And flopped. Hard.

The game had issues. Players weren't happy. The community fractured instead of growing. And there was another skills website that had beaten us to market.

We abandoned the project. There was no point competing for users who weren't there.

Looking back, I'm philosophical about it. You can't control whether a game succeeds. You can only control whether you're ready if it does. We were ready. The game wasn't.

### Diablo 4: When OCR Meets Loot

2023's summer release was Diablo 4, and I was *deep* in it. Dungeon runs, loot grinding, the whole loop.

Here's my problem: after each run, I had to manually check each item in my inventory to see if it was better than what I had or on my list of items I wanted. With Diablo's complex affixes, this was tedious and error-prone.

So I automated it.

`overwolf-diablo4` and `overwolf-diablo4-dll` were my attempts at building an inventory manager. The workflow:
1. Finish a dungeon run
2. Click a button that runs my script
3. Walk away, grab a drink
4. Come back to a sorted inventory with items flagged for keeping or salvaging

The implementation was... creative. OCR to read item stats from screenshots. Fuzzy matching for item names (fonts are not OCR-friendly). Custom scoring logic for which affixes I valued.

I tried integrating with Overwolf's overlay system to avoid the OCR jank, but that had its own complications.

Did it work? Mostly. Was it worth the engineering time? Probably not. But I learned OCR patterns, wrote some gnarly image processing code, and enjoyed Diablo 4 more because of it.

### The CardCoalition Resurgence

Q2 2023 shows **385 commits** on `CardCoalition`. The co-op Slay the Spire dream was back.

This was my third (fourth?) attempt at the same core idea, but with fresh eyes. Years of game dev experience. Better understanding of ECS and networking. A cleaner slate.

I still didn't ship it. But the codebase was the best I'd ever written for a game. Sometimes you have to build the same thing multiple times before you truly understand how to build it.

### Game Jams and One More Run

Q4 2023 got fun: `caribou-crew/one-more-run` and `caribou-crew/game-jam-1`.

Game jams! Timed constraints. Forced completion. Actually shipping *something*, even if it's rough.

The commit data (48 and 17 commits respectively) shows focused bursts. These weren't my normal meander-until-bored approach. They were deadline-driven sprints with a finish line.

I highly recommend game jams for anyone who struggles to finish projects. The constraint is liberating.

### The Through-Line

This era was scattered. Developer tools. Gaming utilities. Failed sequels. Crypto bankruptcy scripts. OCR inventory management.

But there's a through-line: **I build what I need.**

Mezzo? I needed better mocking at work. Payday 3 skills? I wanted to recreate a success. Diablo 4 inventory? I needed to stop manually comparing items. CardCoalition? I still want to play a co-op Slay the Spire with my friends.

The motivation isn't about launching products or gaining users. It's about solving problems that personally annoy me. Sometimes those solutions help others. Sometimes they just help me.

Both are valid.

---

*This is Part 4 of my retrospective series. Final chapter coming up: The AI Acceleration Era, where everything changed and I started a web agency while making games with my kids.*

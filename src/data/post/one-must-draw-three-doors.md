---
publishDate: 2026-07-28T12:00:00Z
updateDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'Three Doors and a Fun Scorecard: Letting My Deckbuilder Stop Imitating'
excerpt: 'In July I cut my co-op deckbuilder loose from its reference game: a new hero roster, a bot that finally shopped properly, an attempt to measure fun, and a map replaced by three doors.'
image: ~/assets/images/posts/one-must-draw-three-doors.webp
category: Game Development
tags:
  - game-development
  - deckbuilder
  - game-design
  - balance
  - ai-workflow
---

By the end of May, my co-op deckbuilder, working title **One Must Draw**, had a Slay the Spire 2 reference point for balance testing, two original heroes in progress, and co-op that worked across browsers. Then June happened. I sent 14 prompts to the project all month.

When I came back on July 2, the first thing I wrote was a reminder of what the game is supposed to be: a one-to-four player cooperative roguelike deckbuilder, heavily inspired by Slay the Spire 2. I had looked at the Ironclad and Silent closely as reference points to calibrate against. They were never meant to be the game.

July was about acting like I meant that. It's still a personal project with no public release, and it has no affiliation with Mega Crit.

## A roster that isn't a replica

On July 9 I asked for help designing a roster of five heroes I could actually ship. The rule was simple: none could be a replica of a Slay the Spire character. Inspiration from Slay the Spire 1 and 2, mods, and my own hero docs was fair game. Copying wasn't.

The result reframed what co-op should mean. In Slay the Spire, combos mostly happen inside one player's deck. The roster pitch flips that: combo windows live on the **enemy**, the one board everybody sees. One hero opens a window, and the party cashes it in.

- **The Vanguard** is the onboarding hero. It builds Temper when enemies hit it and can Goad enemies into attacking it instead of allies.
- **The Wrecker** fills an enemy's Poise meter to cancel its next move and open an Exposed window for the whole party.
- **El Cantor de la Muerte**, the evolved Mariachi, stacks Despair and cashes it out with performed Finale cards.
- **The Sharper** banks suits and cashes out before the turn ends. It started as my Joker hero. The plan keeps the mechanics, drops the poker skin, and rebuilds its hands around shapes poker doesn't have.
- **The Chronomancer** stayed nearly unchanged: cards that cook in your hand and resolve on a schedule.

Some ideas didn't survive. A dice hero was cut because it needed the deepest engine changes and duplicated the Sharper's randomness. Days later a sixth class, the Grovekeeper, arrived with plants to tend.

Claude spun up teams of agents to playtest each hero's starting hand headlessly. I still found plenty by hand. I added a bug-report overlay on the **H** key that captures a screenshot and session metadata to disk, the same pattern I use in other games, and filed 15 tickets that way in a few evenings. A reward that said "lose 10 HP" without showing what you got in return. A Grovekeeper plant card that refused to be played.

## When the bot is the bug

My balance simulator had become the backbone of the project, which made this one hurt.

On July 12 I measured what looked like an Act 3 "cliff" and shipped an HP multiplier for Act 3 enemies to smooth it out. Then we found the simulator's shop policy was buying the **cheapest** card on offer. It had no concept of card value. Runs were dying with 280 to 350 unspent gold. The earlier analysis had even noticed the gold and misread it.

We built a card-value scorer, fixed its own calibration mistake, and re-ran everything on July 14. With a bot that shopped competently, about half the runs that reached Act 3 cleared it. That's a hard final act, not a wall. The HP multiplier was deleted. My two reference heroes re-baselined at 40.5% and 28.1% over 1,000 full three-act runs on the expert policy.

The lesson wasn't new, but it landed harder with numbers attached: a simulator is only as good as its worst decision-maker. I'd been tuning content to compensate for a bot that couldn't shop.

## Trying to score fun

On July 20 I asked a question I half expected to be silly: can we score the fun factor programmatically?

Not directly. But we could build proxies. The fun scorecard runs 8 classes against 5 play policies, from random to expert, over 500 seeds each: 20,000 runs per sweep. It doesn't produce a single fun number. It checks metrics against target bands:

- **Agency spread:** does playing well actually beat playing badly?
- **Monotonicity:** does each smarter policy win at least as often as the one below it?
- **Challenge:** does the expert win somewhere between 40% and 60%?
- **Comeback rate:** how often does a win come back from real danger?

The first comeback metric counted wins that ended at low HP. We replaced it with the lowest HP reached during a run, reasoning that it would be independent of difficulty. Then we measured, and that reasoning was wrong. The new version was even *more* tied to difficulty. Raising the ascension level pushed every run's low point down, so the metric mostly measured how hard the game was.

The fix was to score each class relative to the median of the roster in the same sweep. A global difficulty change moves everyone together, so it cancels out. On July 21 we ran the same test against all nine banded metrics to see which ones had the same problem.

I like this workflow a lot. The value isn't that a spreadsheet tells me what's fun. It's that my assumptions about fun get tested with the same rigor as the damage math.

## Shared decisions are the slow part

The biggest change came from asking what made co-op drag.

The answer we landed on: **shared decisions are the slow part of co-op.** Slay the Spire's map routing and shop math are deep solo planning systems. With two to four players, they become committee meetings. Card decisions happen in parallel for free. Route choices don't.

So the map is gone as the default. After each room, the party sees **three doors**: fight, elite, event, campfire, or merchant, each with a reward preview. One short majority vote, with a timer that picks for you. On July 21 it became the default for solo runs too, along with follow-ups for rows of identical doors, early-row options, and a co-op vote reveal. The plan demotes the royale map to an optional mode.

The target is a 25 to 35 minute run across two acts instead of three. That means about a third fewer card rewards, so synergies have to come online sooner.

Not every simplification stuck. We planned to remove gold and turn the merchant into a free pick. The next day I reversed it. With three mutually exclusive doors, every door needs a cost relative to the others. Gold is what makes the merchant cost anything. A free merchant would simply beat the fight door next to it.

## The harness got cheaper, too

I also audited the harness that had built most of this. Across 431 reviewer dispatches, a third were re-runs of reviewers that had already approved. Those almost never changed a verdict. Now only the reviewers that blocked get re-run, and the loop exits early when rounds stop finding anything new.

By July 28, the first Sharper engine primitives had landed: rank and suit identity, hand detection, and the Cashout keyword, still under the Joker name in the commit history.

July added 404 commits. The Sharper still needs content, and three doors need a lot more playtesting. But it's the first month the game felt like it was designed for co-op instead of adapted to it.

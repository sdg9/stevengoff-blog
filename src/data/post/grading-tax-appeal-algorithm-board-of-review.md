---
publishDate: 2026-07-01T12:00:00Z
updateDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'My Tax Appeal Score Was Worse Than a Coin Flip'
excerpt: 'I finally checked my property tax appeal scores against three years of real Board of Review decisions. The first result was humbling. What came after changed what the tool is actually for.'
category: Development
tags:
  - tax-tools
  - data-analysis
  - machine-learning
  - backtesting
  - ai-assisted-development
---

By spring 2026 I had a working tool for tax attorneys. You searched a property in Lake County, Illinois, and it gave you a score, a verdict, comparable sales, and a suggested target value.

It looked convincing. I had no idea if it was right.

## The Backtest

Lake County's Board of Review decides every assessment appeal, and I had the outcomes for tax years 2023 and 2024 as spreadsheets from a public records request: roughly 12,000 and 9,700 appeals, each with the grounds claimed and the board's decision.

So on May 29 I asked the obvious question. If I run my scoring on the properties that actually appealed, do the high scores win?

No. Across about 8,500 matched appeals, the score's AUC was 0.46. That's worse than guessing. Properties I labeled "high confidence" won about 20% of the time. The ones I labeled "low" won about 30%.

The score was upside down.

## Why It Was Wrong

Once I broke the outcomes down by the grounds people filed on, the picture got clearer. Residential appeals win roughly a quarter of the time overall, but that varies a lot by argument:

- **Recent purchase** (you bought it recently for less than the assessment): about 59–72% win
- **Recent sales of comparable homes:** about 22–26%
- **Equity** (neighbors are assessed lower): about 11–15%

My algorithm was built almost entirely around the two weakest arguments. It compared a home to neighborhood sales, and when there weren't enough, it fell back to equity. It basically ignored the strongest signal: the home's own recent sale.

There was also a plain data bug. I was using the wrong square footage field, one that could include space the board doesn't count. Lake County compares price per square foot of above-grade living area, so the comparisons were off before any logic ran.

## Precision, Not Prophecy

My first instinct was "get to 90% agreement with the board." Claude pushed back on that, correctly. Most winners win on grounds I can't see from the outside, like appraisals or errors in the record. Predicting every outcome well isn't possible with this data.

What an attorney needs is narrower: **of the properties the tool tells me to file, how many win?** That's precision, and that became the goal.

The following two days were a rebuild. I anchored the score on the subject property's own sale, graded that sale by how trustworthy the deed type is, and fixed the square footage. On May 31 I replaced the hand-written rules with a small gradient-boosted model trained on 2023 outcomes and tested on 2024. On the held-out year:

- AUC went from 0.49 to about 0.70
- The top 100 recommendations won **92%** of the time
- Predictions of 80–90% really did win about 90% of the time

That calibration is the part I care about most. A score of 85 now means roughly what it says.

## Crawling for the Board's Evidence

The spreadsheets tell you who won, not what they submitted. The county's website does show the comparable sales grid behind each appeal, one page at a time. So I had Claude crawl those pages, starting with 591 winners and 730 losers. Later I made every crawl keep a snapshot of each page it fetched, because crawls are slow and I'd surely want another field later.

The comps were humbling in a different way. Arguments based only on neighborhood comps topped out around 40–50% even among my highest scores. The board just doesn't reward that argument often, and no amount of tuning changed that.

## An "Ask AI" Button

One experiment from that week was a lot of fun. Since the app runs on a Mac mini at home, I added an **Ask AI** button to each property. Clicking it adds a job to a queue. A small daemon on the mini picks it up, starts a real Claude Code session in tmux, and has it research the property: fill in missing data from the county site, rescore it, and write a markdown note that appears back in the app with a little notification badge.

It was built for a pilot with one attorney, not for paying users. Still, having a coding agent do my manual research from a button in the app was a lot of fun.

## Demo Prep and Real Feedback

On June 4 I cleaned up the UI ahead of a demo scheduled with an attorney. There was a lot of noise, so I made a simpler **Appeals** tab with a global tax year picker at the top, the score, the evidence, and links to the assessor, Street View, and Zillow. That was it.

Feedback from real cases around that time led straight to a code change. Two real appeals that won used comparable sales my tool would have thrown out because they were too old. The board's rules turned out to have two different clocks. The home's own sale has to be within about a year of the assessment date. Comparable sales don't have a hard cutoff, just "as close as possible." I rebuilt comp selection to look back three years and weight sales by recency, size, and deed type.

Did the new comps improve the score? No. The backtest got slightly worse because the model had learned its thresholds on the old, narrower comps. So the wider comps shipped as **display only**: a better evidence table, with the score left on the version that tested better.

## Year Three Broke the Model

On June 30 I got the 2025 outcomes, about 8,500 more appeals. My scores had been computed before these results existed, so this was a true out-of-sample test.

Precision had slid from 74% in 2023 to 70% in 2024 to about 63% in 2025. The reason was that 2025 was a reassessment year. The assessor had already priced recent sales into new values, so "you sold for less than your assessment" meant something different. In some cases, being assessed well above your own sale meant the assessor had rejected that sale as not reflecting market value, and the board agreed.

I also noticed people who won one year tended to win again the next. I wondered if something shady was going on. The data said no. It's mostly legal carryforward arguments, plus cases where the assessor agreed the request was correct.

## What Shipped on July 1

July 1 was the biggest day since January. Version 3.4 of the scoring:

- Knows whether the tax year is a reassessment year and whether the parcel appealed or won last year
- Adds a **filing-strategy simulator**: for a given parcel, it estimates the chances under each set of grounds and lists the evidence each one needs
- Scores **residential property only**, since the appeals this is for are all residential
- Adds a **2026 pipeline** with projected assessments, clearly labeled as projected, plus an appeal deadline calendar for each township

Later in July, a crawl of about 86,000 property pages backfilled more than 870,000 missing attributes such as bedrooms, condition, and basements. The scores changed by exactly zero. The model had hit the limit of what this data can tell it. When the first official 2026 assessment lists came out for two townships, I loaded the real numbers in place of the projections.

## Where It Stands

I haven't signed customers or launched anything publicly. It's a private pilot built around one attorney's workflow. But it's a very different tool than the one I had in March. It now says how often its recommendations have actually won, it shows its evidence, and it's honest about the kinds of appeals it can't predict.

My 2019 version never checked itself against real board decisions. This one does, and the first result was bad enough that I rebuilt the score from scratch.

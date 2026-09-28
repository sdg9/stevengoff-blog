---
publishDate: 2026-01-23T12:00:00Z
updateDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'Round Two of the Tax Crusade: Building an Appeal Tool for Attorneys'
excerpt: 'Seven years after going door-to-door with property tax appeals, I pulled the old data out of a backup, pointed it at a different customer, and planned and built an MVP for tax attorneys in a single day.'
category: Entrepreneurship
tags:
  - tax-tools
  - b2b
  - side-projects
  - nextjs
  - supabase
  - ai-assisted-development
---

Back in 2018 and 2019 I built software to find overassessed homes in Lake County, Illinois, then went door-to-door helping people appeal their property taxes. It worked. Nearly everyone I helped won.

Trying to scale it is where things fizzled. I pitched the idea of licensing the tool to attorneys, the meetings didn't turn into anything, and my attention drifted to games.

I never really stopped thinking about it, though. In January 2026 I picked it back up with a different plan.

## Why B2B This Time

The problem with the original approach was always me. A homeowner can appeal their own assessment, but a non-attorney doing it *on behalf of* lots of homeowners runs into real red tape. Attorneys don't have that problem. They already file these appeals. What they don't have is a fast way to figure out which properties are worth filing.

So I flipped the customer. Instead of a consumer site, I'd build a tool for a tax attorney or someone in their office who reviews properties before handing them off.

I kept the scope deliberately small. For the first year I'd work with a single attorney who wears every hat. No roles, no permissions matrix, no billing. Lake County only, to prove it out. The product plan I wrote that day summarized the pitch in one line: turn a 20 to 30 minute manual research job per property into an answer in under five seconds, with the reasoning, the comparable properties, and a suggested target value.

That boiled down to two flows I had to nail:

1. **Search and verdict.** Type a parcel number, address, or owner name and immediately see whether this property has a real case and why.
2. **The bulk list.** Show the most promising appeals across the county, filterable, so someone can review a batch, star the good ones, and ignore the rest for the year.

## One Very Long Day

January 23 was a lot. The repo has 59 commits with that date.

I started from a paid Next.js and Supabase SaaS starter kit I'd bought a while back, which gave me auth, admin, and a lot of dashboard plumbing for free. On top of it I tried the BMAD method, a structured workflow where AI agents walk you through a product requirements doc, an architecture doc, a UX spec, then break everything into epics and stories.

The planning phase was mostly me answering questions. Who's the user? Do they need to be licensed? Are saved searches personal or shared? What's the acceptable response time? (Five seconds.) Who's writing the code? My answer to that last one was honest: me plus Claude, and Claude would do about 99% of it.

By the afternoon I had six epics:

- Secure, invite-only access
- Property lookup and appeal analysis
- Batch filtering and list management
- CSV export and saved filters
- Feedback on bad data
- Admin tools and data loading

Then I let the stories run. Invite-only signup. Parcel search that accepts a PIN with or without the dashes. Property detail with assessment history. Comparable properties. Township, score, and value filters. Pagination, sorting, CSV export, saved presets, an admin feedback queue. Each epic got a review pass afterward, and I wrote the findings to a file and fixed the critical ones before moving on.

It was the fastest I've ever gone from "idea" to "thing I can click through." It also wasn't magic. The review files are full of problems the stories introduced, and I spent a good chunk of the evening fixing them.

## Digging Up the Old Data

The best part of this restart was that I didn't begin from zero. The old consumer version had a database backup from December 2025, and it held a lot of work:

- ~252,000 parcels
- ~382,000 assessment records
- ~208,000 sales
- ~130,000 appeal scores

I added a story just to migrate it into the new schema. Then, a few hours later, I ran a database reset command that was a lot more thorough than I expected and wiped all of it.

Lesson relearned. Fortunately the migration was a script, so I re-ran it against the backup and got everything back.

## Small Things That Made It Feel Real

A few details from that first day stuck with me because they came from how the work actually happens.

**Getting to the county's record.** Attorneys want to see the official county page for a parcel. I wanted a link straight to it. The county's search doesn't support deep links, so I tried proxying the search request through my server. It technically worked, but it wasn't the experience I wanted, so I dropped it. The compromise: one click copies the parcel ID *and* opens the county search in a new tab. Paste, done.

**The data looked off.** The first property I spot-checked listed some comparables that clearly weren't comparable. That became a quick spec to fix inconsistencies between the written summary and the comps table. It wouldn't be the last time the numbers made me nervous.

## Hosting It on a Mac Mini

I didn't want to pay for hosting a pilot with one user, so I moved the whole thing onto the Mac mini in my house. Supabase runs in Docker, the app runs in Docker, and a Cloudflare Tunnel puts it on a real domain so sign-in works like it would in production. I had to migrate the data again, this time from my laptop's local database to the mini, with my NAS as the stopover.

## March: Learning What an Attorney Actually Needs

The project went quiet for a few weeks, then came back in March, this time focused on how an attorney actually builds an appeal.

That changed a lot of assumptions. I downloaded the county Board of Review's written rules and had them checked against my logic. My comparable sales had to fall within the right window for the tax year, not just "the last 14 months." Comps needed to come from the same assessment neighborhood, within about 15% of the subject property's above-grade living area. Sales with no square footage couldn't be scored. Unqualified sales needed to be excluded.

I also loaded a full county data extract, which brought neighborhood codes, bedrooms and bathrooms, and market values. The UI changed too: a table instead of a pointless two-bar chart, the subject property pinned above its comps so you can compare them line by line, an estimated tax savings column, and a print layout that doesn't cut off after page one.

None of that was in the original six epics. The planning got me moving fast, but the stuff that made it useful came from someone who files these appeals for a living telling me where it was wrong.

By late March I had a tool I could put in front of an attorney. The next question was harder: when my tool says a property will win, does it?

That turned out to be a much bigger project.

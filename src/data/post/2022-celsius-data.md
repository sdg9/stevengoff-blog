---
publishDate: 2022-10-09T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Turning a Huge Filing into Queryable Data'
excerpt: 'A small Celsius-data project used extracted spreadsheets as the bridge between a long public filing and database queries.'
image: ~/assets/images/posts/2022-celsius-data.webp
category: Project Archive
tags:
  - project-archive
  - data
  - typescript
  - side-projects
---

The **celsius-pdf-data** repository has a plain purpose: take data from the Celsius bankruptcy filing and put it into a database.

The README explains that the PDF tables had already been extracted to spreadsheets. The code then worked from that tabular form, with MySQL as the documented database option.

That intermediate step is the interesting part. A document can contain structured information without being a convenient structure to query.

## Choose a workable intermediate format

The project didn't need to pretend that a long PDF was a database. It used extracted tables as a bridge, then handled the import in code.

The notes also discuss token-price data as a separate input. That separation matters: the values in a filing and a later market-price lookup describe different things and should not quietly become interchangeable.

I had intended to do more analysis, but the README says someone else had already published useful statistics. The project remained a way to make the underlying information queryable rather than an excuse to claim an original financial conclusion.

This entry is about the data-processing workflow, not about individual people named in the filing. The useful general lesson is familiar from the property projects: before asking a clever question, get the information into a form where the question can be checked.

---

_From the project archive · Q4 2022. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration. Source: [celsius-pdf-data](https://github.com/sdg9/celsius-pdf-data)._

---
publishDate: 2018-04-25T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Giving Code Review a Dashboard'
excerpt: 'Git-review-stats moved from gathering GitHub data to a small website and CSV export, with a revealing pagination problem along the way.'
image: ~/assets/images/posts/2018-review-stats.webp
category: Project Archive
tags:
  - project-archive
  - developer-tools
  - github
  - data
---

By April 2018, the interest behind git-stats had turned into **git-review-stats**: a small website built around collected review data.

The surviving sequence is unusually clear. April 19 introduces the website, April 20 adds enhancements, and April 25 adds CSV export. The README describes a pipeline from a GraphQL query to JSON and then into the web view.

That is a useful progression: first gather information, then make it inspectable, then let it leave the application in a familiar format.

## The query is part of the product

The project's TODO list also records a subtle issue. The query gathered merged pull requests, but its cursor could advance too far when an older pull request hadn't merged yet.

A dashboard can look perfectly reasonable while the selection logic underneath it leaves things out. This note is a reminder that the reliability of the picture depends on how the data arrived.

There were smaller questions too, such as whether emoji should count toward comment interactions. Even a simple activity report has to decide what an interaction means.

The archive doesn't prove those TODOs were all resolved. It preserves a useful stage of the project: the report had become a website and an export, while the definitions and data-fetching boundaries still needed care. That combination feels familiar in almost every dashboard I've built since.

---

_From the project archive · Q2 2018. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration. Source: [git-review-stats](https://github.com/sdg9/git-review-stats)._

---
publishDate: 2017-01-28T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Looking Beyond the Commit Count'
excerpt: 'A small GitHub reporting script tracked reviews, comments, and approvals—an early attempt to make development work easier to see.'
image: ~/assets/images/posts/2017-git-stats.webp
category: Project Archive
tags:
  - project-archive
  - developer-tools
  - github
  - workflow
---

In January 2017, I checked in a small tool called **git-stats**. Its configuration tells the story more clearly than its name.

It could point at a repository, choose how far back to inspect pull requests, and highlight counts for comments, approvals, requested changes, and time open. A mapping connected GitHub handles to display names for the report.

That is a broader view of development than counting commits. Reviewing a change, asking a useful question, or helping a pull request move forward can matter without producing another line in the contribution graph.

## Useful signals, imperfect measurements

Looking at the configuration now, I can also see the limitations. A threshold can make a low count stand out, but it can't explain whether that number represents a problem. Five comments might be thoughtful review or a conversation about a typo. A long-open pull request might be neglected or deliberately waiting on another decision.

The interesting part is the attempt to gather those signals in one place. Before the later agent dashboards and review tools, I was already building small utilities to understand the work around the code.

This is a compact project with a compact surviving history. I wouldn't inflate it into a management system. It is an early example of a recurring habit: if I keep wanting a particular view of information, eventually I try writing the view myself.

---

_From the project archive · Q1 2017. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration. Source: [git-stats](https://github.com/sdg9/git-stats)._

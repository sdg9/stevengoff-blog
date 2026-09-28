---
publishDate: 2024-03-31T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'The First StickerApp: Rewards, Persistence, and Screen Size'
excerpt: 'The March 2024 app began with stickers and rewards, then quickly reached the practical details of saving selections and fitting tablets.'
image: ~/assets/images/posts/2024-sticker-app.webp
category: Project Archive
tags:
  - project-archive
  - react-native
  - family
  - personal-software
---

The earlier **StickerApp** repository starts in March 2024 with an Ignite-based React Native app.

Within the first few days, the commits move from screens and sticker experiments to persisted selection and basic functionality. March 11 adds sticker and reward selection. By the end of the month, the work includes tablet-versus-handset presentation, allowing duplicate stickers, and replacing fixed widths with flex layout.

## Cheerful software still has rules

A sticker board sounds simple until the application has to decide what a selection means. Can the same sticker appear twice? Does the choice survive reopening the app? How should the board fit a different screen?

Those aren't secondary questions. They determine whether the playful part of the app is easy to use.

I like that the history contains both the fun surface and the ordinary implementation details. Adding more artwork helps the collection feel lively, but persistence and layout give that artwork somewhere dependable to live.

This is the 2024 version of the project. The later family-sharing architecture described in the [everyday-apps roundup](/10-everyday-apps) belongs to a different stage and shouldn't be read back into these first commits.

At this point, the useful milestone was smaller: a personal reward-board idea had become an app with saved choices and a layout being adjusted for real device sizes.

---

_From the project archive · Q1 2024. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

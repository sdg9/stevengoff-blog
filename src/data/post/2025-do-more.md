---
publishDate: 2025-06-14T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Do More, Live More: Getting the Card Interaction Right'
excerpt: 'A mobile card app accumulated the small gesture, scrolling, and sharing changes that make a simple interaction feel usable.'
image: ~/assets/images/posts/2025-do-more.webp
category: Project Archive
tags:
  - project-archive
  - react-native
  - app-development
  - side-projects
---

The spring-2025 **Do More, Live More** work is full of the details that surround a card-based mobile interface.

The commits include deck-screen animation, card art, swipe behavior, scrolling long card text, and sharing. By June, I was adjusting when a watermark appears, simplifying card-rendering components, and changing the share icon.

It is an interesting contrast with the combat-card projects. Here the engineering is concentrated around reading and interacting with a card on a phone.

## Gestures can compete with each other

The June 10 sequence includes disabling vertical swipe while allowing card text to scroll. That is a concrete interface boundary: the user needs a gesture to do the thing they intended, rather than triggering a neighboring interaction.

Sharing introduces another boundary. The in-app view and the exported image have different jobs. A watermark that belongs on a shared image doesn't necessarily belong on every screen inside the app.

The history also includes changes around font scaling for captures. I wouldn't generalize those commits into accessibility claims; they record a specific effort to control the generated visual result.

What stands out is how much work lives around a small premise. A card can be easy to describe while still needing careful decisions about scrolling, swiping, rendering, and leaving the app as an image someone else can see.

---

_From the project archive · Q2 2025. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

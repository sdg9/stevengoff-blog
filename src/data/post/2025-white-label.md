---
publishDate: 2025-11-30T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'One Mobile Foundation, Different Product Faces'
excerpt: 'A late-November React Native demo explored reusable navigation, shared components, and distinct visual presentations.'
image: ~/assets/images/posts/2025-white-label.webp
category: Project Archive
tags:
  - project-archive
  - react-native
  - architecture
  - developer-tools
---

The November 2025 **white-label-app** history captures a mobile architecture experiment: how much of an app can stay shared while the presentation changes?

The commits include navigation refactoring, wallet and card-detail screens, a reusable program badge, and consistency work between dashboard and detail headers.

Those are useful places to test the boundary. A screen can look different while still depending on the same navigation behavior and reusable interface pieces.

## Reuse has to survive the visible differences

A white-label demo isn't just one screen with several colors. If each variant needs different layout decisions, the shared structure has to leave room for those differences without turning every component into an unreadable collection of conditions.

The late-November sequence shows work on both sides: extracting reusable pieces while continuing to adjust individual screen presentation.

It also includes adding Claude-assisted pull-request and review workflows. That is evidence of how I was arranging the development process, not proof that automated review could replace checking the resulting app.

This entry stops at November 30, before the December retrospective series. It describes a demo and its implementation work, not a shipped financial product or a client deployment.

It is a fitting final stop before those retrospectives: mobile development, reusable tooling, and AI-assisted workflow experiments were all present in the same repository, alongside the ordinary work of making headers and navigation behave consistently.

---

_From the project archive · Q4 2025. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

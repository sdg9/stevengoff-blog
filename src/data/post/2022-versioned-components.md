---
publishDate: 2022-09-20T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Which Version of That Component Is the App Actually Using?'
excerpt: 'A React Native monorepo experiment explored published packages, local work in progress, and Yarn workspace resolution.'
image: ~/assets/images/posts/2022-versioned-components.webp
category: Project Archive
tags:
  - project-archive
  - react-native
  - monorepos
  - developer-tools
---

The purpose of this September 2022 experiment was quite specific: understand how a React Native app in a monorepo could use either a local component package or a published version.

The demo had an app and three small component packages. The components mainly displayed which version they were running. That deliberately small behavior made the dependency-resolution question easier to inspect.

## Keeping unfinished work in the repository

The README connects the idea to trunk-based development. A released app could point at a published package while newer, unfinished component code remained local in the same repository.

That is a different way to separate work in progress from what a consumer uses. It also depends on the package manager doing what I think it is doing.

Early commits describe the wrong local-versus-remote behavior. Later ones move to Yarn 1 and record different remote versions working, followed by documentation updates through September 20.

The repository presents one demonstrated approach, with Android called out as the tested platform. It doesn't establish a universal workflow for every React Native monorepo.

I like projects this small. A component that only prints its version can answer a serious architectural question. Adding a realistic product around it would have made the result harder to see.

---

_From the project archive · Q3 2022. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration. Source: [react-native-versioned-components-yarn1](https://github.com/sdg9/react-native-versioned-components-yarn1)._

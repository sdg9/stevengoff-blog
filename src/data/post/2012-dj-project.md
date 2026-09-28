---
publishDate: 2012-12-30T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'A Song Catalog Before the Side-Project Archive'
excerpt: 'A 2012 Java and MongoDB experiment brings the archive back to song metadata, Spring Roo, and an earlier generation of web tooling.'
image: ~/assets/images/posts/2012-dj-project.webp
category: Project Archive
tags:
  - project-archive
  - java
  - mongodb
  - music
---

The oldest project I could confidently attribute to myself in this pass through Bitbucket was a music project. On December 30, 2012, I committed **DJ Project**, a Java application with a MongoDB-backed song model.

It is a small repository, but it fills a large hole in the story. My side projects did not begin when my GitHub contribution graph started getting interesting. Some of the earlier work was sitting in Bitbucket, where I kept private repositories before GitHub made those free.

## Songs, services, and scaffolding

The preserved Spring Roo log describes a `Song` with a name, artist, album, genre, and release year. It generates a MongoDB repository and service, then adds a JSON web controller. There is also a song spreadsheet alongside the project.

That gives a more useful picture than the repository name alone: this was an experiment in representing a music collection and exposing it through a web application. The tooling did a lot of the scaffolding. I still had to decide what the data meant and how the pieces fit together.

The Roo log contains December 8–10 timestamps, earlier than the Git check-in. I have used the December 30 commit as this entry's date rather than treating every timestamp inside a checked-in file as a separate verified milestone.

## The archive behind the archive

There is an older DJ repository too, with September 30, 2012 commits under the name `StevenI7`. That is an earlier lead; the December repository is the one whose commit explicitly identifies me as Steven Goff.

I cannot turn this surviving code into a claim about a finished product or how many people used it. What it does establish is that, by the end of 2012, I was already using a personal interest as a reason to explore a different stack.

That pattern would outlast Spring Roo by quite a while.

---

_From the Bitbucket archive. Written in September 2026 from private repository history and recollection; the date above marks project work, not original publication. Cover art is a conceptual illustration. Private source code is not reproduced._

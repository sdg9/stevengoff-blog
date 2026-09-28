---
publishDate: 2018-12-15T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Property Data Becomes a Searchable Application'
excerpt: 'Late-2018 tax-tool commits added township filters, linkable searches, and map views—the interface around the property data.'
image: ~/assets/images/posts/2018-tax-dashboard.webp
category: Project Archive
tags:
  - project-archive
  - web-development
  - tax-tools
  - data
---

The [tax-project retrospective](/02-smart-home-tax-crusader) covers the larger motivation. The late-2018 frontend history shows how the idea started becoming something someone could navigate.

November includes a filterable township table. In December, the search page gains owner and label searches, then starts reflecting its state in the browser URL. Map work follows, including property popups, alongside continuing table and visual refinements.

That is a recognizable transition from having data to having an application.

## A search should be something you can return to

The URL change on December 8 is my favorite detail in this slice of history. A query hidden inside a component is temporary. A query represented in the address bar can be revisited or shared.

For a property tool, that matters because finding a useful group of records is only the beginning. The user needs to inspect it, move between views, and get back to the same question later.

The map adds another way to understand the results. Tables organize values; a map supplies spatial context. Neither view automatically proves that properties are comparable, but both can help someone inspect the underlying information.

By December 15, the commits are still full of UI adjustments. I read that as the ordinary work of making a data-heavy tool usable. The analysis may be the reason to build it, but search, navigation, and presentation determine whether anyone can work with the result.

---

_From the project archive · Q4 2018. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

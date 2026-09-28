---
publishDate: 2024-06-25T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Returning to Property Data, One Neighborhood at a Time'
excerpt: 'The 2024 tax rewrite revisited parsing, missing records, tests, and neighborhood information.'
image: ~/assets/images/posts/2024-tax-return.webp
category: Project Archive
tags:
  - project-archive
  - tax-tools
  - data
  - typescript
---

The property-tax work wasn't entirely a closed chapter after the original project. In 2024, it reappeared in **tax2024-mono**.

The May commits describe an application being moved into a running state. By June, the work is back in the data: assessment queries, records missing local HTML, parser cases where values couldn't be found, and neighborhood fields carried into the database.

## The messy part comes back too

A rewrite can give a project a fresh structure, but it doesn't make the source information cleaner.

The June 25 sequence includes a new test for data that failed to yield values, test updates, and changes to parse and store neighborhoods. That is useful evidence of where the effort was going: making the pipeline account for the records it actually encountered.

Neighborhood information can provide context for property analysis, but adding a field doesn't by itself establish a good comparison or a successful appeal. This entry is about the engineering work visible in the repository.

The connection to the earlier [searchable tax application](/2018-tax-dashboard) is still clear. Before a user can inspect a useful view, the system needs to collect and represent the information consistently.

Some projects return because the original question is still interesting. This one brought the same practical question back with another round of parsing, tests, and data-model decisions.

---

_From the project archive · Q2 2024. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

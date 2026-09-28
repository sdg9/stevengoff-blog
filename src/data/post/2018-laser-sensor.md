---
publishDate: 2018-09-22T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Another Sensor on the Workbench'
excerpt: 'A September 2018 laser-sensor sketch captures the hardware experiments growing alongside the home-automation configuration.'
image: ~/assets/images/posts/2018-laser-sensor.webp
category: Project Archive
tags:
  - project-archive
  - hardware
  - iot
  - experiments
---

Not every quarter needs a large application to explain what I was exploring. In September 2018, one of the clearest hardware markers is a NodeMCU commit called “Add laser sensor example.”

The repository had already collected motion and radio experiments, and earlier that year the history included a servo plus Wi-Fi and MQTT work. The laser sketch was another small way of connecting software to something happening outside the computer.

## Smaller experiments have their own value

A sketch is a useful unit of exploration. It can answer a narrow question about a component without first requiring a finished enclosure, an app, or a complete automation.

That doesn't make it a deployed product. The commit supports the existence of an example, not a claim that I installed a laser-based system around the house. Keeping that scale in view makes the history more interesting, not less: some projects were building blocks I was collecting.

The connection to the broader smart-home phase is straightforward. Motion, light, radio, and simple actuators give software different ways to observe or affect a room. Each introduces its own timing and wiring concerns.

This entry is a snapshot of that workbench stage. The code was still small enough to sit in a sketch folder, while the space of things I could try kept getting larger.

---

_From the project archive · Q3 2018. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration. Source: [NodeMCU](https://github.com/sdg9/NodeMCU)._

---
publishDate: 2017-08-27T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Teaching the House to Notice Motion'
excerpt: 'Home Assistant configuration and NodeMCU sketches came together in August 2017 around a wonderfully concrete interface: walking into a room.'
image: ~/assets/images/posts/2017-home-assistant.webp
category: Project Archive
tags:
  - project-archive
  - home-automation
  - iot
  - hardware
---

August 2017 is where the smart-home work becomes visible in the repositories. Home Assistant configuration appears on August 13, followed by a new sensor and changes to motion logic. The NodeMCU project arrives later that month with a motion-sensor sketch and several refinements to its behavior.

This was a different sort of interface from the mobile apps. The input could be a person moving through a room. The output could be a light.

## Code with a physical consequence

The larger [smart-home retrospective](/02-smart-home-tax-crusader) describes the sensor-building phase. These commits put a narrower date on the motion work: August 27 includes changes on both the microcontroller and Home Assistant sides.

That pairing is the useful detail. A sensor reading and an automation are related, but they are separate pieces. The device has to notice something; the house configuration has to decide what that observation means.

A good result is almost invisible to the person using it. They shouldn't need to understand a microcontroller sketch to walk into a room. All the tinkering happens behind that very ordinary action.

The repositories don't establish that every automation was reliable. They do show the feedback loop starting: configure a device, change the motion logic, and adjust the system that responds to it. Programming had become a way to experiment with the house itself.

---

_From the project archive · Q3 2017. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration. Source: [NodeMCU](https://github.com/sdg9/NodeMCU)._

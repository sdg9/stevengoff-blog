---
publishDate: 2019-10-24T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'When the Side Project Was the 3D Printer'
excerpt: 'Two Marlin changes record a very physical kind of programming: configuring an Ender 3 and changing its BLTouch probing grid.'
image: ~/assets/images/posts/2019-printer-firmware.webp
category: Project Archive
tags:
  - project-archive
  - 3d-printing
  - hardware
  - firmware
---

October 2019 has a small but concrete maker milestone: my own Marlin commits configure BLTouch for an Ender 3 and change the probing setup to a 5×5 grid.

Marlin itself is an existing open-source firmware project. My work here was configuration on top of it, not writing a printer firmware from scratch.

That distinction is part of what makes the project a good fit for this archive. A lot of useful tinkering is adapting a substantial existing system to one particular machine.

## Software meets the print bed

A bed-leveling probe gives the printer information about the surface it is about to print on. The firmware configuration connects that physical measurement to the machine's behavior.

The two dated changes don't tell me how every print turned out. They do show a practical focus: get the probe configured, then adjust the sampling grid.

This sits alongside the sensor and home-automation projects, but with a different feedback loop. Instead of a screen or a light switching on, the result ultimately has to exist as a physical object. Mechanical setup and software settings both matter.

The history is brief enough that I don't want to turn it into an invented saga of failed prints. It is a useful marker of something simpler: by late 2019, programming was also part of maintaining and adapting the tools I used to make things.

---

_From the project archive · Q4 2019. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration._

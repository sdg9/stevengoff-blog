---
publishDate: 2021-10-29T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'Back to the Ender 3: Probe Offsets and a Denser Leveling Grid'
excerpt: 'The printer firmware history resumed with build-size fixes, probe adjustments, and a revised leveling setup.'
image: ~/assets/images/posts/2021-printer-calibration.webp
category: Project Archive
tags:
  - project-archive
  - 3d-printing
  - firmware
  - hardware
---

The Ender 3 work returned in October 2021, this time on a Marlin fork branch with another set of my configuration changes.

The commits include bringing in the printer configuration, getting the firmware to build at the required size, adjusting the BLTouch probe offset, and speeding up leveling. On October 29, the grid changes from 5×5 to 6×6 points.

It is a small sequence, but it records several different constraints meeting in one device.

## Configuration is real engineering work

A probe has a physical position relative to the nozzle. Firmware has to fit the target board. Leveling takes time, and the sampling configuration affects how the machine measures its bed.

None of those concerns is solved by a prettier interface. They are the details that connect software settings to a particular piece of hardware.

As with the [2019 printer entry](/2019-printer-firmware), this was adaptation of Marlin, not authorship of the firmware project. The useful historical evidence is in my changes to the existing system.

I like having both dates in the archive. They show that a maker project doesn't have to be a single burst followed by abandonment. Sometimes it becomes a tool I return to, adjust, and keep trying to make fit the job a little better.

---

_From the project archive · Q4 2021. Written in September 2026 from repository history; the date above marks the project work, not the original publication of this retrospective. Cover art is an illustration. Source: [Marlin-1](https://github.com/sdg9/Marlin-1)._

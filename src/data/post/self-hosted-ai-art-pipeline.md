---
publishDate: 2026-06-10T12:00:00Z
updateDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'Rented GPUs, a Sleepy Desktop, and Paying Per Image'
excerpt: 'Between March and June I ran image, video, and 3D models three different ways: on a rented cloud GPU, on my own desktop with ComfyUI, and through paid APIs. Each one earned a place, for different reasons.'
image: ~/assets/images/posts/self-hosted-ai-art-pipeline.webp
category: AI
tags:
  - ai
  - comfyui
  - game-art
  - 3d
  - self-hosting
  - side-projects
---

Every game prototype eventually hits the same wall: the code works, and everything on screen is a grey box.

This spring I spent a lot of evenings on AI image, video, and 3D generation, and kept circling one question: where should the model actually run? The answer turned out to be "it depends on what I'm making."

## March: Renting a GPU by the Hour

My first real attempt was on RunPod. I picked a ComfyUI pod template built for the RTX 5090 and started experimenting with Wan 2.2 image-to-video: give it a still image and a prompt, get back a few seconds of motion.

The first lesson was that "one-click template" is optimistic. The ComfyUI folder was empty on my pod, so my setup script grew a fallback that shallow-clones ComfyUI if it is missing, then pulls the models. A 14B video model is around 28GB on its own, and every fresh pod meant downloading it all again.

The most useful thing I built that week was a batch runner: a Python script walks a folder of images, queues each one on the remote ComfyUI, and downloads the results. It reads the API key from an environment variable, which I added after a few minutes of staring at 403 errors.

Renting worked, and a 5090 is a lot of GPU. But the meter runs the whole time, including the time I spent learning what a LoRA's two strength sliders do.

## May: ComfyUI on My Own Desktop

In May the driving problem got concrete: card art for my Slay the Spire–style deckbuilder. The card list has 309 entries, so this was never going to be a hand-drawn project.

This time ComfyUI ran on a Windows desktop I already own, with an RTX 3070. My Mac became the control plane: workflows, prompts, scripts, and outputs live in a repo there, and Claude drives the desktop over ComfyUI's HTTP API.

On May 13 we locked a style I really liked. The recipe was Flux dev in fp8 with two comic LoRAs stacked on top: one for an atmospheric inked mood, one for clean cel-shaded rendering. At about 85 seconds per image on the 3070, it was slow but free.

Then I read the license. FLUX.1 [dev] is non-commercial, and a LoRA trained on it inherits that restriction. My rule for this project is that anything that ships in the game has to come from a commercially licensed model, so the look I loved was, strictly speaking, reference material.

I went through the alternatives in one sitting. Flux schnell with the same LoRAs was still legally murky and noticeably less skilled. Schnell alone was commercial but lost confidence in the linework. SDXL with Arthemy Comics was the best commercial-safe local match, at around 18 seconds an image.

### The 8GB Wall

The 3070 has 8GB of VRAM, and Flux dev does not fit. ComfyUI streams part of the weights from system RAM, and over a long batch that caught up with me. One 56-card run ran out of memory at card 10. Calling ComfyUI's memory-free endpoint between cards made it worse, not better.

What held was boring: a freshly started server reliably handled nine or more cards. So the batch runner now works in chunks of six or seven and fully restarts ComfyUI over SSH between them. Not elegant, but on May 19 it got all 56 Chronomancer cards through with zero failures, and then 44 cards for a second class, the Mariachi. Because that recipe is the non-commercial one, those decks count as prototype art under my own rule.

The desktop also likes to sleep, so by June I had a small wake-on-LAN helper that sends the magic packet and waits until ComfyUI answers. Waking the PC does not start ComfyUI, though; that is a separate step.

## Paying Per Image

Later on May 13 I pivoted to fal.ai for the higher-quality work. Flux pro 1.1 and the Ultra variant are API-only, commercially usable, and a few cents per image. At that price the risk is not one image; it is 309 cards times three seeds in a style I haven't validated. So the rule became: spot-test one to three images, get my reaction, then batch.

Two practical things came out of that phase:

- **A local image viewer.** I kept losing track of which image Claude was talking about, so we built a small React and Vite viewer I start with `pnpm dev`, like everything else I work on.
- **An escalation ladder.** For character pose, try prompt changes first, then a Kontext edit, then ControlNet. For my Chronomancer hero, nine rounds of prompt work got the full-body framing, and one Kontext pass got the three-quarter turn. Kontext insisted on rotating him the same way every time, so heroes simply get flipped horizontally afterward.

Local didn't disappear. On May 23 I went back to SDXL on the desktop for potion icons with transparent backgrounds, plus a script that composites each cutout over the game's real UI colors at 32, 64, and 200 pixels to catch halos.

## June: From Pictures to Meshes

In June the same question moved into 3D for my superhero city game.

On June 8 the desktop started running Hunyuan3D-2 through ComfyUI, turning a full-body character image into a complete mesh. The winning recipe was counterintuitive: a white background, generous margins, and no background removal. A grey background extruded into a flat slab behind the character, and a tight crop cost me heads and feet. A Blender script trims whatever slab and floating fragments remain.

Forcing a T-pose in the source image turned out to be what made automatic rigging work at all. Texturing was the step I couldn't solve reliably on the local path.

On June 10 I added Meshy as a cloud alternative: concept image to textured, T-posed mesh, no desktop required. With a budget of about 50 models a month, my plan spends it on things seen up close, like distinct character body types, water towers, lamps, and benches, and leaves thousands of tiny rooftop details as primitives.

The cloud path had its own trap. Early parallel jobs shared temporary file paths, so different concepts could come back as the same model. Now every run gets its own temp directory, and I hash the downloaded models after a batch to confirm they are actually different.

## Where I Landed

None of these is the winner. A rented GPU is great for a focused session on hardware I don't own. The desktop is free per image and good for iteration, as long as I respect 8GB and wake it up first. Paid APIs win when licensing or quality matters more than a few cents.

The part I would repeat is keeping one Mac-side repo as the control plane. Prompts, style rules, licensing notes, and every output with its metadata live in one place, whichever GPU drew the picture.

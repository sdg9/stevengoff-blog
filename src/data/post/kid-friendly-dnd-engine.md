---
publishDate: 2026-07-20T12:00:00Z
updateDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'An AI Narrator for Game Night with My Kids'
excerpt: 'I built a D&D session engine that narrates, voices the NPCs, and tracks the party while I run short adventures for my kids. Playing with it taught me more than building it did.'
image: ~/assets/images/posts/kid-friendly-dnd-engine.webp
category: Game Development
tags:
  - tabletop
  - dungeons-and-dragons
  - family
  - ai
  - voice
  - testing
---

Running D&D for young kids is a lot of plates to spin. Someone wants to cast a spell on the spider. Someone else wants to ask the baby dragon for help. I'm tracking hit points, doing voices, remembering what the troll said two scenes ago, and trying to keep the story moving before attention runs out.

In March I started building a tool to take some of those plates off my hands. I call it the **DnD Adventure Engine**: an AI-assisted session runner that generates adventures, narrates them with voice acting, keeps the party's stats, and gives me a control surface to steer from. I'm still the Game Master. It's more like a co-GM that never loses its notes.

## Spec first, then a very long evening

I began with a written spec rather than code. Before anything was built, I asked Claude to review it with team agents, find the gaps, and ask me ten clarifying questions.

The key question for me was whether the system could follow real table talk. If I type that one hero casts a warlock spell and rolls a 12, while another sends her bats and rolls an 8, can it apply those results, narrate what happened, and then take the monster's turn?

That led to a hybrid design. The model uses tool calls for anything that changes game state, like HP, conditions, and items, and writes the story as ordinary prose. The rules stay structured, and the storytelling can stay loose.

The stack is a pnpm monorepo: Fastify with WebSockets and SQLite on the server, React on the client, and shared Zod schemas between them. Voice comes from ElevenLabs, and images from DALL·E. Printable character sheets and sticker sheets use plain CSS print styles. The sticker rewards were inspired by the cooperative kids' game *Zombie Kidz*.

On the evening of March 15, parallel agents worked through the first seven milestones. The initial scaffold commit and the “polish” commit are about eighty minutes apart. The next morning went to the unglamorous fixes: `.env` loading, database paths, and a page reload that returned a 500.

## The table is the real test suite

The first week of actual use was a steady stream of “that's not what I expected.” Most of the problems were audio problems, and it's hard to overstate how much the voices matter to kids.

- Clicking one play button didn't pause the others, so narration played over itself.
- After a reload, only the first paragraph of a beat had a working play button.
- A dialogue line landed at the end of the paragraph instead of in the middle where the character said it.
- In one session, the audio files for two paragraphs were swapped, so each button read the other paragraph's text.
- A mermaid kept coming out in a man's voice, no matter which voice I picked for her.

I asked for Playwright tests with mocked AI and placeholder audio, so I could pin those bugs down without paying for a model call every run. I asked for the fixes to be pinned down as explicit assertions: only the selected clip plays, and every paragraph keeps its play button after a reload.

Other features came straight from sitting at the table. I added automatically assigned, distinct ElevenLabs voices for NPCs, voice prep so narration can be generated and auditioned before game night, and a global character roster so heroes can move from one campaign to the next. Character sheets can be imported from PDF, generated from a prompt, or filled in by hand.

My favorite small feature is `/btw`. If I start a message with it, I can talk privately with the AI narrator while the kids are busy.

The commit from March 21 is simply titled “First gameplay, decent.” That's about right.

## An audit after a break

After a month or so away, I only remembered the overall feel: sound sometimes didn't play, and voice generation was flaky. In June, instead of chasing those symptoms one at a time, I asked for a full audit with file and line references that another agent could execute.

The main finding explained a lot. The client waited for three decoded audio chunks before starting playback, but it never received the “stream ended” signal during live play. Any short line, like an NPC saying “Welcome, travelers!”, could end up waiting in the queue forever. The bug didn't come from the model or the voice service; it was in the glue between them.

## Rebuilding around how we actually play

In July I came back with clearer opinions. The app had been built around continuous, numbered campaign arcs with automatic recaps and story forks. It was a lot of machinery, and I hadn't fully tested it. We actually play one isolated session at a time.

So the model changed. A **session** is now the top-level unit. When it ends, the AI drafts a summary, I edit it, and I can attach it to a future session as context. The old path to start playing was, in the design doc's words, a “5-page-deep maze.” It became one New Session flow, a Home page organized around sessions, and a single **Begin the Adventure** button instead of narration starting automatically when the page loaded.

The next request came from how kids really behave. Someone gets tired and drops out, someone shows up late, or a friend wants to join halfway through. Now an **Add player** button can bring in a returning hero, clone a ready-made guest, or create a new character without stopping the game. Each hero can also be marked Away.

## Testing the glue without a story budget

The last piece was a headless simulation suite. It runs randomized sessions with one to five party members, people dropping in and out, and heroes carrying over between sessions. A scripted fake narrator keeps voice, image, and OpenRouter spend at zero. Only a small opt-in smoke test calls the real Anthropic API. Story quality was explicitly out of scope. I only wanted to know whether the bones held together.

It turned up a real bug. Heroes from the global roster weren't included when the server loaded session state, so the narrator's HP and condition updates quietly did nothing for them. It's now documented in the backlog and still needs a fix.

I also added tooltips across the GM dashboard, color-coded heroes, NPCs, and enemies in the party panel, and added a short illustrated GM tutorial with screenshots. It includes a plain explanation that the Combat/Explore toggle only changes the layout, not what the narrator does.

## Where it stands

It isn't finished. The mid-session hot-swap has automated coverage but hasn't been tested live at the table yet. There's no UI yet for marking a hero as a reusable guest, and the roster HP bug is still open.

It already does what I wanted most, though. I can spend less time managing notes and more time watching my kids decide what their heroes do next.

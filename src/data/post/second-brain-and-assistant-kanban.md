---
publishDate: 2026-02-11T12:00:00Z
updateDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'A Second Brain, Then a Board for My Assistant'
excerpt: 'In January I built a chat-driven second brain that filed my notes into Obsidian. Three days later I found an assistant with a better front door, turned my work into a skill for it, and then built the assistant a kanban board.'
category: Development
tags:
  - ai
  - personal-software
  - workflow
  - side-projects
---

Before I built the tools from my [AI development tools post](/09-ai-development-tools), I spent a few weeks at the start of 2026 building something more personal: a place for my own thoughts and tasks that an AI could help manage.

It went through two shapes in about a month. First it was a second brain I wrote myself. Then it became a skill for an assistant someone else wrote, plus a kanban board that the assistant and I both use.

## One Behavior: Post a Message

The idea behind the second brain was to require exactly one habit from me. I post a thought into a chat channel, and the system does the rest.

The PRD spells that out. A message comes in, Claude classifies it, and a Markdown note with YAML frontmatter lands in my Obsidian vault. The bot replies in the thread to say what it did. A daily digest and a weekly review come back as direct messages.

No UI beyond chat and Obsidian, and no cloud automation services in the middle. Just a local Node service with PostgreSQL as an audit log, and Claude Code's CLI running as a subprocess to do the thinking.

Most of the design went into trust rather than cleverness. Every classification gets a confidence score. Below a threshold, the bot asks me to clarify instead of guessing. If it guessed wrong anyway, replying `fix: idea` reclassifies the note. Notes fall into seven types (action, project, reference, idea, meeting, person, or other), and actions get a date prefix in their filenames so they can be archived later.

### An afternoon of stories

I built the first version on January 17, and it's the most process-heavy afternoon in my commit history.

I'd already had a basic Slack listener working. Then I added the BMAD method, generated the planning documents, and ran sprint planning. The Git log from there alternates between "define story" and "implement story" for five epics and 22 stories, from project scaffolding through fix-command parsing to digest delivery. All of it happened between lunch and dinner.

That same night I added a graph memory layer: Neo4j for entities and relationships, local Ollama embeddings, and a hybrid search that blends keyword, vector, and graph results.

The PRD itself is a little funny in hindsight. It opens with a chatbot's "Perfect." because I pasted it straight in from a conversation. The structure was still worth it. Having every story written down made the pace possible.

## Real Use Finds the Real Problems

On January 18 I added Discord alongside Slack, selected with a `PLATFORM` environment variable, so I could run a personal instance on my Mac mini. I also made it index my wider Obsidian vault for queries, not just the notes it filed, and I added archiving.

The bugs were the ordinary kind. Passing prompts through a shell broke on special characters like arrows and URLs, so the prompt now goes over stdin. Sometimes Claude echoed the prompt back instead of answering, so the code checks for that.

The bigger problem showed up on January 20. A Claude call could take up to 30 seconds, and I was running it with `execSync`, which blocked Node's event loop. While Claude was thinking, new messages weren't being received. What I asked for was simple: acknowledge messages immediately, queue them, retry failures, and survive restarts. That became a BullMQ queue on Redis.

The same day I added a small localhost web app that streams replies over server-sent events, and made sure it didn't lock up after one message.

## Then I Found a Better Front Door

That evening I cloned clawdbot, the open-source assistant now called OpenClaw, and asked Claude whether it did what my second brain did.

My prompt was blunt: I liked that its "front door" was more polished, and I'd rather piggyback on it than keep fixing bugs on my end. I'd only worked on the second brain for a couple of days, all through AI. The queue existed only because I was handling intake myself.

So I asked for an analysis of the plugin route. By the end of the night, the second brain was a skill: a `SKILL.md` describing the same seven note types, confidence rules, filename conventions, and append-on-conflict behavior, plus a small Python script for searching the vault.

Three days of code became mostly instructions. The thinking I'd done about classification and trust carried over. The chat plumbing didn't need to.

## A Kanban Board the Assistant Can Use

A week later, on January 27, I started what the first commit calls "Jarvis Kanban." Jarvis was what I called the assistant.

The architecture is plain. A Node server serves the board and a REST API, and stores everything in a single `tasks.json` file in a synced cloud folder. The assistant gets a skill that works through a CLI, which reads and writes that file directly, or through the API. It can add tasks, move them between columns, sort by priority, and show a focus view.

Sharing a board with an agent created problems I wouldn't have had alone. Early on, saving a task could overwrite comments, and there was a comment race. The fix was to exclude comments from task updates, fetch fresh data before changing anything, and add a dedicated comment endpoint that defaults its author to Jarvis.

The rest was me tuning it to how I actually work:

- **Vim-style navigation**, where `m` plus a number moves a card to that column. At first `m4` always meant done, no matter how many columns a board had.
- **Today's Focus**, a star for up to three tasks a day. Starred cards get a golden background and rise to the top of their column.
- **Priority and urgency as separate fields.** A due date adds urgency without changing how important I said a task was, and I can filter on either one.
- **One filter box** in place of a wall of tag chips. It works like Datadog's: plain text searches, and `tag:` autocompletes.

On February 11 I asked whether anything in the repo was too personal to publish. The answer was yes: labels for parts of my life, names, and hard-coded paths. Instead of rewriting history, I made a clean copy with generic labels, relative paths, and the bot renamed Kanban_Bot.

## What Carried Forward

As of this September update, that assistant still runs on my Mac mini. And several things I now care about in my tools showed up first in this little experiment.

Capture should cost almost nothing. Any AI decision should come with a confidence I can see and a cheap way to correct it. And a board is most useful when the agent doing the work can read and write it, not only me.

The biggest lesson was about sunk cost, or the lack of it. When code takes an afternoon to write, it's much easier to see that someone else's version is the better foundation and keep only the ideas.

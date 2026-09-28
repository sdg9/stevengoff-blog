---
publishDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'AI Made More Code—Then I Needed Better Tools'
excerpt: 'Faster implementation created a different problem: keeping track of work, preserving the spec, and reviewing what actually changed. Baton, terminal signals, and Review Desk are my attempts to make that manageable.'
image: ~/assets/images/posts/09-ai-development-tools.webp
category: Development
tags:
  - ai
  - developer-tools
  - side-projects
  - workflow
---

In my last retrospective, I wrote about how AI made it easier to start things. An idea could become a playable prototype before I had time to talk myself out of it.

That is still exciting. But starting more things creates another kind of work.

Which session needs an answer? What was this branch supposed to accomplish? Did the implementation satisfy the original requirement, or did the requirement quietly change along the way? Where are the screenshots I need to review?

Those questions explain a whole category of my recent projects. Alongside the games and apps, I've been building tools for managing the work around them.

Apparently, making software faster is also an excellent way to discover how much software development happens outside the code editor.

## Baton: Keep the Contract Still

[Baton](https://github.com/sdg9/baton) brings a specification, an implementation loop, and review into one workflow. The harness works through test generation, planning, implementation, verification, and adversarial review. If the work cannot get through that process within its attempt limit, it produces a structured handoff.

The detail I find most useful is the frozen holdout test.

For the tier that uses holdouts, a separate step creates tests before implementation begins. Once committed as the contract for that story, those files are protected from later changes by the workflow's checks.

Why bother? Because a passing test is less reassuring if the same implementation pass can redefine what passing means.

A holdout doesn't prove that the specification was good. It doesn't catch every bug, either. It gives the work a fixed reference point. If something needs to change, that becomes a visible decision instead of an incidental edit buried in a large diff.

Baton also varies the process by the kind of work. Its tiers don't all run the same review machinery. Core behavior gets more scrutiny; other changes use a lighter path.

I like that distinction. Adding process to every task is easy. Making the process proportional to the change takes more thought.

## A Board for the Work Already Happening

Agent Workbench explores the other half of the problem: seeing and controlling multiple sessions. The same idea also appears in Baton's companion workbench package.

The basic shape is a local browser board connected to terminal sessions and a defined set of project workspaces. In Baton's workbench, cards come from OpenSpec changes. A card can connect to a terminal session, and tmux keeps that session around across browser restarts.

That last part matters. Closing a browser tab shouldn't be the same thing as throwing away the work behind it.

What appeals to me about this approach is the connection between the task and its execution. A board is much more useful when it can lead directly to the session doing the work. Otherwise, it's another place where I have to copy status updates.

## Sometimes the Tool Is Just a Color

Not everything needs a dashboard.

`claude-iterm-signal` gives Claude Code sessions colored tabs in iTerm2. Blue means working, green means done, amber means input is needed, and red means an API error.

The interesting decision is what it leaves to the terminal. iTerm2 already has an unread-output indicator. The script controls the work state; the terminal controls whether I've seen the output.

Those are different questions. A session can be finished and unread, or finished and already checked. One color alone can't express both reliably.

There's also some unglamorous plumbing underneath. Subagent activity needs guards so it doesn't repaint a finished parent session as working. Multiple sessions sharing one tab compete for the same color slot. An interrupted turn has a known signaling gap.

Small tool, real constraints. I like projects where the useful result is something I can understand at a glance, even if getting there required a surprisingly careful state machine.

## Review Desk: Put the Evidence Beside the Question

Review Desk addresses a more human bottleneck: decisions waiting for me across game repositories.

It gathers review items into a local dashboard with screenshots and clips inline. A repository can expose its current items through a small executable or supply Markdown files. Answers go back into that repository for the agent to read.

The dashboard doesn't maintain a separate copy of the item content. On refresh, it reads what the repositories expose.

That makes completion meaningful. The agent fixes the issue and updates the project's own record; the item stops appearing. Checking a box in another app isn't enough.

I also appreciate that the shared interface is a command-line tool. Claude and Codex can both participate without the review process depending on one particular harness.

## More Output Still Needs My Judgment

These tools all address different parts of the same problem. Baton preserves a contract. The workbench connects tasks to sessions. Terminal colors direct attention. Review Desk brings decisions and evidence together.

None of that removes my responsibility to understand the result.

It does give me better places to apply that understanding. The more implementation I can delegate, the more I care about a clear specification, an honest status signal, and a review I can actually follow.

That's become another kind of tinkering: building the tools that help me keep up with the things I'm building.

---
publishDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'Small Apps I Keep Building for Everyday Life'
excerpt: A stroller timer, a sticker board, a reader, a scheduling poll, and a stay-request calendar. Small apps keep reminding me that useful software starts with an ordinary problem and a few decisions made carefully.
category: Side Projects
tags:
  - personal-software
  - react-native
  - side-projects
  - app-development
---

Some of my favorite project ideas fit in a sentence.

Show whose turn it is. Keep the sticker board in one place. Read this article aloud. Find a date that works. Tell me whether a place is available.

None of those descriptions sounds like a big software project. That's part of the appeal. I can see the useful thing before I start thinking about the framework, the database, or all the features I could eventually add.

The simple sentence always hides a few complications. That's usually where the interesting engineering lives.

## Stroller Light: Make the Answer Obvious

Stroller Light answers one question: whose turn is it to ride?

It fills the screen with a color, a name, and a countdown. Each child can have a different turn duration. The app rotates through the turns and offers controls to pause, skip, or choose who starts.

The answer should be readable without navigating anywhere.

A lock mode hides the controls, with a press-and-hold gesture to bring them back. Settings stay on the device. There's no account or server required to remember a few names, colors, and durations.

Even a timer has an architectural choice hiding inside it. The rotation logic computes the current turn from timestamps and the full cycle of durations. That gives it a way to determine where the schedule belongs when asked, instead of treating every individual countdown tick as the source of truth.

I like how much of this app's design follows from its setting. Big visual signal. Few controls. Local settings. A deliberate gesture before changing things.

## StickerApp: The Shared Part Is the Hard Part

I've written about StickerApp before. The basic idea remains a digital reward board: award stickers, show progress, and make the collection fun to look at.

The more interesting part is ownership. The current app organizes children, sticker collections, custom stickers, and pack unlocks around a family. That gives the data a shared home instead of tying everything to whichever person created it first.

Family invitations use shared links. Access rules are enforced in the database, so the distinction between families isn't just something the interface promises to respect.

It's easy to describe this as a sticker app and imagine that choosing the stickers is most of the work. But making shared state behave consistently is a substantial part of the product. Who can see it? Who can change it? What happens when another person joins?

A cheerful interface still needs clear answers underneath.

## Aloud: The Screen Isn't the Player

Aloud is an Android text-to-speech reader built around a direct interaction: share text or a link, then listen.

It uses the device's speech engine. Shared web pages go through article extraction, and Markdown is converted into readable text so the spoken version doesn't recite formatting characters. Documents retain their playback position.

The useful detail is sentence-level playback. Sentences become units the app can highlight, jump to, and skip between.

The important implementation decision is that playback lives in a native Kotlin service. The React Native interface displays the state and sends controls; it doesn't own the ongoing speech session. Android's media system supplies the surrounding controls and notification behavior.

That's the kind of distinction I enjoy discovering in a small app. Reading a string aloud is straightforward. Building something intended to keep reading when the screen is off requires thinking about the phone as a phone, including its background lifecycle.

And actual audio behavior needs device testing. A unit test can check sentence boundaries; it can't tell me what came out of the speaker.

## Scheduling Without Making Everyone Join First

My scheduling app, Doodle, starts with proposed dates and a shared link. People can mark an option as working, possible if needed, or unavailable.

Participation is anonymous by default, with optional sign-in. That choice keeps the basic interaction small: someone receives a link and answers a question.

Underneath, organizers and participants have separate private tokens for managing their own contributions. The app stores hashes of those tokens. Optional identity can attach anonymous activity to an account later.

Those permissions need to work without making account creation the first task.

## A Calendar With Real Boundaries

Stays by Owner, in the Rose's Cabin project, applies the same small-app instinct to stay requests. Guests choose dates; hosts approve or decline; the calendar reflects the result. Payments are handled separately.

A pending request differs from a confirmed stay, and guests see availability without seeing who booked.

The database prevents overlapping approved stays. Checkout dates are available for the next arrival. Those sound like small details until two people want adjacent dates, or two approvals happen close together.

This is where I want the strongest rule: in the data layer that every approval has to pass through.

## Small Is a Useful Constraint

These projects don't all need the same architecture. A turn timer can stay entirely local. A shared sticker board needs shared ownership. Audio needs native lifecycle handling. Booking needs a firm rule about overlapping dates.

What connects them is a specific, ordinary job.

That's still my favorite starting point for a side project. Find something concrete, make the central action easy, and spend the engineering effort on the details that let it stay easy.

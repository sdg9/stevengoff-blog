---
publishDate: 2015-11-07T12:00:00Z
updateDate: 2026-09-28T12:00:00Z
author: Steven Goff
title: 'The Halloween Party That Changed My Career'
excerpt: 'Jackbox at a 2015 Halloween party led to a homemade party game, React and Redis, an interview, and eventually a very different day job.'
image: ~/assets/images/posts/2015-halloween-react.webp
category: Project Archive
tags:
  - project-archive
  - react
  - redux
  - redis
  - party-games
  - career
---

The thread that led me to React Native began at a Halloween party in 2015.

I remember playing Jackbox and thinking: **I want to try making something like this.** Not because I had a business plan. I wanted to understand how a roomful of people, their phones, and a shared game could fit together.

A fun detail: some Volition employees from Champaign, Illinois, were at the party. I was surrounded by people who made games for a living, playing a game that would quietly redirect what I did for mine.

## The experiment after the party

I had already tried a [Unity drawing game earlier that year](/2015-telestrations). This time, making a party game became my reason to learn React and Redis.

The Bitbucket archive gives that memory a concrete trail. **StevenTV starts with commits on November 7, 2015.** Its README preserves my React and Babel setup notes. Later November commits mention client-side work and WebSockets; December brings drawing-game page passing, player handshakes, lobbies, game completion, and players readying up.

The separate StevenTVClient package includes React 0.14, React Redux, Redux middleware, and WebSocket-related dependencies. StevenTVUniversal preserves Redis notes for game rooms, players, host handoff, and disconnects. By January 2016, its commits also show experiments moving parts of the backend to MongoDB.

It was clearly a learning project in motion. I was trying approaches, discovering problems, and changing the implementation as I understood more.

## An interview opened another door

After that party, I applied to Jellyvision, following my interest in the people and history behind Jackbox. During that process, I learned about Redux and React Native.

My memory that Android support was brand new checks out: the official [React Native for Android announcement](https://reactnative.dev/blog/2015/09/14/react-native-for-android) was published on September 14, 2015, only weeks before Halloween.

The idea of using this way of building interfaces on both mobile platforms was compelling. A project that started as a way to entertain friends was turning into something I wanted to try at work.

That led to the [early-2016 pitch and summer pilot](/2016-react-native-pilot), then a larger team rollout. Years later, I remember the eventual savings at Discover as upwards of $10 million a year. The surprising part is still the beginning: none of this started with a corporate technology strategy. It started with going to a party and wanting to build the game.

---

_The party, Volition attendees, application process, and career connection are my recollections, recorded in September 2026. The November 7 date marks the first surviving StevenTV commits; it is not a claim that the Halloween party happened on that day._

---

_From the Bitbucket archive. Written in September 2026 from private repository history and recollection; the date above marks project work, not original publication. Cover art is a conceptual illustration. Private source code is not reproduced._

---
publishDate: 2026-09-27T12:00:00Z
author: Steven Goff
title: 'Web Town Hero: Beyond Websites'
excerpt: Building a small-business website is only part of the work. Parent portals, booking integrations, contact forms, and ongoing maintenance have made Web Town Hero a broader engineering project.
category: Entrepreneurship
tags:
  - web-town-hero
  - web-development
  - entrepreneurship
  - integrations
---

In my last retrospective, I wrote about starting Web Town Hero. The idea was straightforward: build useful websites for small businesses and support them through a monthly subscription.

That is still recognizable in the work. But looking at the projects now, “building websites” leaves out quite a bit.

A property website needs availability from another system. A school portal needs information that staff can keep current. A contact form needs to get a message to someone who can answer it. Those details turn a collection of pages into something a business or organization actually depends on.

That is where more of my attention has gone.

## Different Sites, Different Jobs

There is no single version of a small website that fits every project.

The Legacy Physical Therapy starter has a relatively focused job: explain the practice and give visitors a way to request contact. The implementation separates the presentation from its form, analytics, and monitoring integrations. That matters because changing the design should not require rebuilding the way messages are collected.

A working page is only one milestone. Its contact flow and maintenance tools also need to hold up when people use them.

Murren Properties has a different set of needs. Property information, availability, pricing, and reviews connect to outside services, including OwnerRez and PriceLabs. A beautiful property page with stale information would miss the point.

One concrete detail captures the maintenance problem: descriptions for properties managed in OwnerRez should come from OwnerRez. A local copy can quietly override the owner's newer description. That is a small implementation choice with an obvious consequence for the person trying to keep a listing accurate.

Caribou Crew Games is different again. Its studio site is organized around a game catalog, with public titles and projects still in development clearly distinguished. Promotional artwork and actual gameplay images serve different purposes, so the site labels them accordingly.

These sites share tools and patterns. The decisions come from what each site needs to do.

## The Parent Portal Is an Application

The North Star parent portal work pushes that distinction further.

A family portal can bring together a bulletin, calendar, faculty directory, onboarding resources, volunteer hours, apparel orders, and learning materials. Calling all of that a website is technically correct, but it does not describe the underlying coordination.

Some content begins in documents. Some comes from spreadsheets that staff already use. Other information belongs in a database because people submit it through the application.

The Polaris work makes those boundaries explicit. The migration design keeps useful staff authoring workflows while moving transactional records toward a database. A spreadsheet can be a source for a validated import without also becoming a second, competing version of every record.

That sounds less exciting than a redesigned homepage. It is also the kind of decision that determines whether a system stays understandable after the redesign.

This work includes migration and cutover planning, so I would not describe every planned workflow as already live. Building the replacement is one part. Moving an organization onto it without losing the useful parts of its existing process is another.

## The Work After the Page Loads

The agency repository includes production infrastructure for uptime monitoring, analytics, and forms. That is a useful reminder of what ongoing support actually contains.

A page loading successfully does not prove that all its integrations are working. Murren's health reporting tracks external service results, which gives maintenance work something more specific to investigate than “the site seems wrong.”

Contact forms have a similar second half. On the Caribou site, a submission can be emailed and recorded through a separate form-backed path. The page visitors see is only the beginning of that flow. Delivery and a recoverable record are part of the feature.

I find this work interesting because the engineering has an immediate purpose. The point of monitoring is to notice a problem. The point of separating content sources is to let the right person update the right thing. The point of a deployment process is to make a change without guessing what will happen next.

## What I Want to Keep Building

I still like the original Web Town Hero idea: useful websites with ongoing support. The newer work gives “support” a much more concrete meaning.

There are also experiments around automating site migrations and inspecting older sites. Those remain experiments. Speeding up a first pass is useful, but it does not settle content ownership, integration behavior, or whether a replacement is ready for people to use.

The common thread with my other projects is still there. I like taking a messy practical problem and building something that makes it easier to handle.

Sometimes that is a game. Sometimes it is a property listing that stays current when its owner makes an edit. Sometimes it is a parent finding the school information they need.

Web Town Hero has become a place to do more of that practical work, including the quieter engineering that keeps a website useful after launch.
